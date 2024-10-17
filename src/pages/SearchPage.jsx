import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbsComponent from '@components/common/Breadcrumb';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import PaginationComponent from '@components/common/PaginationComponent';

const SearchPage = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('searchString');
  // const page = parseInt(searchParams.get('page') || '', 10);
  // const [products, setProducts] = useState([]);
  // const [totalPage, setTotalPage] = useState(0);

  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const searchString = query.get('searchString');
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    {
      label: `Tìm kiếm sản phẩm: ${searchString}`, // Sử dụng searchString
      href: `/search?query=${encodeURIComponent(searchString)}`,
    },
  ];

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

  const handleSortChange = e => {
    const value = e.target.value;
    setSortOption(value);
    setIsDesc(value === 'desc' ? 'true' : 'false');
  };

  // useEffect(() => {
  //   const fetchProductTypes = async () => {
  //     try {
  //       setProducts([]);
  //       const responseProduct = await productService.getAll(
  //         searchParams,
  //         page,
  //         10
  //       );
  //       setProducts(responseProduct.data);
  //       setTotalPage(responseProduct.meta.totalPages);
  //     } catch (error) {
  //       console.error('Error fetching product types:', error);
  //     }
  //   };

  //   fetchProductTypes();
  // }, [query, page]);

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='flex justify-end p-4'>
        <div className='flex items-center space-x-2'>
          <span className='font-semibold text-sm sm:text-lg'>Sắp xếp:</span>
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

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-1 m-6'>
        {Array.isArray(products) &&
          products.map((product, index) => (
            <ProductItem
              key={index}
              imageUrl={product.productImagePath[0]}
              name={product.productName}
              price={
                (product.price *
                  (100 - product.discountDetails?.discountPercent)) /
                100
              }
              productLink={`products/detail/${product._id}`}
              discount={product.discountDetails?.discountPercent}
            />
          ))}
        <div className='col-span-2 sm:col-span-3 md:col-span-4 mt-4 flex justify-center'>
          <PaginationComponent
            path={`${location.pathname}`}
            totalPages={totalPage}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
