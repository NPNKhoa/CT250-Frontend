import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/Breadcrumb';
import PaginationComponent from '@components/PaginationComponent';

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '', 10);
  const brand = query.get('brand') || '';
  const type = query.get('type') || '';

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setProducts([]);
        const responseProduct = await productService.getByName(brand, page, 12);
        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
        console.log(responseProduct.meta.totalPages);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, [brand, page]);

  return (
    <>
      {products.length > 0 && (
        <BreadcrumbsComponent
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            {
              label: `${products[0].productType?.productTypeName}`,
              href: `/products/${type}`,
            },
            { label: `${products[0].productType?.productTypeName} ${brand}` },
          ]}
        />
      )}
      <div className='flex p-4'>
        <div className='w-1/5 m-1'>
          <Filter />
        </div>
        <div className='w-4/5 grid grid-cols-4 gap-1 ml-2'>
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
          <div className='col-span-4 mt-4 flex justify-center'>
            <PaginationComponent
              path={`${location.pathname}?brand=${brand}`}
              totalPages={totalPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
