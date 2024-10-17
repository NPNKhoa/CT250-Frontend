import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbsComponent from '@components/common/Breadcrumb';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import PaginationComponent from '@components/common/PaginationComponent';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('searchString');
  const page = parseInt(searchParams.get('page') || '', 10);

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    {
      label: `Tìm kiếm sản phẩm: ${query}`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setProducts([]);
        const responseProduct = await productService.getAll(
          searchParams,
          page,
          10
        );
        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, [query, page]);

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 m-6'>
        {Array.isArray(products) &&
          products.map((product, index) => (
            <ProductItem
              key={index}
              imageUrl={product.productImagePath[0]}
              name={product.productName}
              price={
                new Date(product.discountDetails.discountExpiredDate) >
                new Date()
                  ? product.price *
                    ((100 - product.discountDetails.discountPercent) / 100) // Hiển thị giá đã giảm nếu chưa hết hạn
                  : product.price // Hiển thị giá gốc nếu đã hết hạn
              }
              productLink={`products/detail/${product._id}`}
              discount={
                new Date(product.discountDetails.discountExpiredDate) >
                new Date()
                  ? product.discountDetails.discountPercent
                  : null // Không hiển thị phần trăm giảm giá nếu đã hết hạn
              }
            />
          ))}
        <div className='col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 mt-4 flex justify-center'>
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
