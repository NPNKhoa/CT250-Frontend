import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import PaginationComponent from '@components/common/PaginationComponent';
import { CircularProgress } from '@mui/material';

const Products = () => {
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const sortBy = 'price';
  const [sortOption, setSortOption] = useState(query.get('sortBy'));
  const [isDesc, setIsDesc] = useState('false');
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const page = parseInt(query.get('page') || '1', 10);
  const brand = query.get('brand') || '';

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoading(true);
        const updatedQuery = new URLSearchParams(location.search);

        if (selectedBrand.length > 0)
          updatedQuery.set('brand', selectedBrand.join(','));
        if (selectedMinPrice !== null)
          updatedQuery.set('minPrice', selectedMinPrice);
        if (selectedMaxPrice !== null)
          updatedQuery.set('maxPrice', selectedMaxPrice);

        // Cập nhật tham số sắp xếp
        updatedQuery.set('sortBy', sortOption);
        updatedQuery.set('isDesc', isDesc);

        const responseProduct = await productService.getAll(
          updatedQuery,
          page,
          12,
          sortBy,
          isDesc
        );

        console.log('hehehehehhehehehehhe' + responseProduct);

        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
      } catch (error) {
        setLoading(false);
        setProducts([]);
        console.error('Error fetching product types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, [
    location.search,
    selectedBrand,
    selectedMinPrice,
    selectedMaxPrice,
    sortOption,
    isDesc,
    page,
  ]);

  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  const handleBrandChange = brands => {
    setSelectedBrand(brands);
  };

  const handleSortChange = e => {
    const value = e.target.value;
    setSortOption(value);
    setIsDesc(value === 'desc' ? 'true' : 'false');
  };

  return (
    <>
      {products.length > 0 && (
        <BreadcrumbsComponent
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            {
              label: `${products[0].productTypeDetails?.productTypeName}`,
              href: `/products?productType=${products[0].productTypeDetails?.productTypeName}`,
            },
            ...(brand
              ? [
                  {
                    label: `${products[0].productTypeDetails?.productTypeName} ${brand}`,
                  },
                ]
              : []),
          ]}
        />
      )}
      <div className='flex p-4'>
        <div className='hidden lg:block w-1/5 m-1'>
          {/* Filter sẽ bị ẩn khi màn hình nhỏ hơn lg */}
          <Filter
            onPriceChange={handlePriceChange}
            onBrandChange={handleBrandChange}
          />
        </div>
        <div className='w-full lg:w-4/5 ml-2'>
          {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className='container mx-auto flex justify-between px-5 border bg-gray-50 rounded-lg'>
                <h1 className='text-sm sm:text-xl font-bold my-4'>
                  {products.length !== 0 &&
                    `${products[0]?.productTypeDetails?.productTypeName} ${brand}`}
                </h1>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold text-sm sm:text-lg'>
                    Sắp xếp:
                  </span>
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className='border text-xs sm:text-base border-gray-300 py-1 px-3 rounded-md focus:outline-none '
                  >
                    <option value='default'>Mặc định</option>
                    <option value='asc'>Giá tăng dần</option>
                    <option value='desc'>Giá giảm dần</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1'>
                {/* Ẩn sản phẩm theo số cột khi kích thước màn hình thay đổi */}

                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductItem
                      key={index}
                      imageUrl={product.productImagePath[0]}
                      name={product.productName}
                      price={product.price}
                      productLink={`products/detail/${product._id}`}
                    />
                  ))
                ) : (
                  <h2 className='font-semibold text-2xl'>
                    Không tìm thấy sản phẩm
                  </h2>
                )}
              </div>

              <div className='col-span-4 mt-4 flex justify-center'>
                <PaginationComponent
                  path={`${location.pathname}`}
                  totalPages={totalPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
