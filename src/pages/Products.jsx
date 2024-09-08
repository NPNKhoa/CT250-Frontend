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
  const page = parseInt(query.get('page') || '1', 10);
  const brand = query.get('brand') || '';

  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setProducts([]);
        if (selectedBrand.length > 0)
          query.set('brand', selectedBrand.join(','));

        if (selectedMinPrice !== null) query.set('minPrice', selectedMinPrice);

        if (selectedMaxPrice !== null) query.set('maxPrice', selectedMaxPrice);

        const responseProduct = await productService.getAll(query, page, 12);
        setProducts(responseProduct.data);
        setTotalPage(responseProduct.meta.totalPages);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, [page, query, selectedBrand, selectedMinPrice, selectedMaxPrice]);

  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  const handleBrandChange = brands => {
    setSelectedBrand(brands);
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
