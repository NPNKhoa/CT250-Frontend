import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbsComponent from '@components/Breadcrumb';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import PaginationComponent from '@components/PaginationComponent';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
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
        const responseProduct = await productService.getByName(query, page, 10);
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
      <div className='grid grid-cols-5 gap-1 m-6'>
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
          <div className='col-span-5 mt-4 flex justify-center'>
            <PaginationComponent
              path={`${location.pathname}?query=${query}`}
              totalPages={totalPage}
            />
          </div>
        </div>
    </>
  );
};

export default SearchPage;
