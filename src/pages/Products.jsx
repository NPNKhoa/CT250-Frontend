import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import PaginationComponent from '@components/common/PaginationComponent';

const Products = () => {
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const sortOption = 'price';
  const [isDesc, setIsDesc] = useState('false');
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const page = parseInt(query.get('page') || '1', 10);
  const brand = query.get('brand') || '';

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
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
          sortOption,
          isDesc
        );
        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
      } catch (error) {
        console.error('Error fetching product types:', error);
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
        <div className='w-1/5 m-1'>
          <Filter
            onPriceChange={handlePriceChange}
            onBrandChange={handleBrandChange}
          />
        </div>
        <div className='w-4/5 ml-2'>
          <div className='container mx-auto flex justify-between px-5 border bg-gray-50 rounded-lg'>
            <h1 className='text-xl font-bold my-4'>
              {products && products.length > 0
                ? `${products[0].productTypeDetails?.productTypeName} ${brand}`
                : 'Loading ...'}
            </h1>
            <div className='flex items-center space-x-2'>
              <span className='font-semibold'>Sắp xếp:</span>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className='border border-gray-300 py-1 px-3 rounded-md focus:outline-none'
              >
                <option value='default'>Mặc định</option>
                <option value='asc'>Giá tăng dần</option>
                <option value='desc'>Giá giảm dần</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-1'>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <ProductItem
                  key={index}
                  imageUrl={product.productImagePath[0]}
                  name={product.productName}
                  price={product.price}
                  productLink={`products/detail/${product._id}`}
                />
              ))}
          </div>

          <div className='col-span-4 mt-4 flex justify-center'>
            <PaginationComponent
              path={`${location.pathname}`}
              totalPages={totalPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
