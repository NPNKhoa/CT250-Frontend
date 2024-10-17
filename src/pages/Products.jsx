import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import PaginationComponent from '@components/common/PaginationComponent';
import { useSelector } from 'react-redux';

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

  const currentConfigsData = useSelector(state => state.systemConfigs);

  const PriceOptions = currentConfigsData?.currentConfigs?.shopPriceFilter?.map(
    filter => {
      let label = '';
      if (filter.toPrice === null) {
        label = `Giá trên ${filter.fromPrice.toLocaleString('vi-VN')}đ`;
      } else if (filter.fromPrice === 0 || filter.fromPrice === null) {
        label = `Giá dưới ${filter.toPrice.toLocaleString('vi-VN')}đ`;
      } else {
        label = `${filter.fromPrice.toLocaleString(
          'vi-VN'
        )}đ - ${filter.toPrice.toLocaleString('vi-VN')}đ`;
      }

      return {
        label: label,
        value: `${filter.fromPrice}-${filter.toPrice || 'above'}`,
        min: filter.fromPrice,
        max: filter.toPrice,
      };
    }
  );

  // const PriceOptions = [
  //   { label: 'Giá dưới 500.000đ', value: 'under-500k', min: 0, max: 500000 },
  //   {
  //     label: '500.000đ - 1 triệu',
  //     value: '500k-1m',
  //     min: 500000,
  //     max: 1000000,
  //   },
  //   { label: '1 - 2 triệu', value: '1m-2m', min: 1000000, max: 2000000 },
  //   { label: '2 - 3 triệu', value: '2m-3m', min: 2000000, max: 3000000 },
  //   { label: 'Giá trên 3 triệu', value: 'above-3m', min: 3000000, max: null },
  // ];

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
          <Filter
            onPriceChange={handlePriceChange}
            onBrandChange={handleBrandChange}
            priceOptions={PriceOptions} // Truyền PriceOptions vào đây
          />
        </div>
        <div className='w-full lg:w-4/5 ml-2'>
          {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <div className='w-24 h-24 border-8 border-primary border-dotted rounded-full animate-spin'></div>
            </div>
          ) : (
            <>
              {Array.isArray(products) && products.length !== 0 ? (
                <div className='container mx-auto px-5'>
                  <div className='flex justify-between border bg-gray-50 rounded-lg px-4'>
                    <h1 className='text-sm sm:text-xl font-bold my-4'>
                      {`${products[0]?.productTypeDetails?.productTypeName} ${brand}`}
                    </h1>
                    <div className='flex items-center space-x-2'>
                      <span className='font-semibold text-sm sm:text-lg'>
                        Sắp xếp:
                      </span>
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className='border text-xs sm:text-base border-gray-300 py-1 px-3 rounded-md focus:outline-none bg-white text-gray-700 hover:border-[#EA580C] focus:ring-[#EA580C] focus:border-[#EA580C] focus-visible:ring-[#EA580C]'
                      >
                        <option value='default'>Mặc định</option>
                        <option value='asc'>Giá tăng dần</option>
                        <option value='desc'>Giá giảm dần</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid để chứa các product items */}
                  <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1'>
                    {products.map((product, index) => (
                      <ProductItem
                        key={index}
                        imageUrl={product.productImagePath[0]}
                        name={product.productName}
                        price={
                          new Date(
                            product?.discountDetails?.discountExpiredDate
                          ) > new Date()
                            ? product.price *
                              ((100 - product?.discountDetails?.discountPercent) /
                                100) // Hiển thị giá đã giảm nếu chưa hết hạn
                            : product.price // Hiển thị giá gốc nếu đã hết hạn
                        }
                        productLink={`products/detail/${product._id}`}
                        discount={
                          new Date(
                            product?.discountDetails?.discountExpiredDate
                          ) > new Date()
                            ? product?.discountDetails?.discountPercent
                            : null // Không hiển thị phần trăm giảm giá nếu đã hết hạn
                        }
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className='col-span-4 mt-4 flex justify-center'>
                    <PaginationComponent
                      path={`${location.pathname}`}
                      totalPages={totalPage}
                    />
                  </div>
                </div>
              ) : (
                <div className='w-full h-full flex justify-center items-center'>
                  <h2 className='font-semibold text-3xl'>
                    Không tìm thấy sản phẩm
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
