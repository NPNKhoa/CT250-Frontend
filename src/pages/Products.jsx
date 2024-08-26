import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import brandService from '@services/brand.service';
import productTypeService from '@services/productType.service';
import productService from '@services/product.service';

import ProductItem from '@components/ProductItem';
import Filter from '@components/Filter';
import BreadcrumbsComponent from '@components/Breadcrumb';

const Products = () => {
  const capitalizeFirstLetter = str => {
    // In hoa chữ cái đầu tiên
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const normalizeString = str => {
    // Chuyển chuỗi thành chuỗi không dấu
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const { id } = useParams();
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const parts = id.split('-');
  const type = parts.slice(0, -1).join('-');
  const brand = capitalizeFirstLetter(parts[parts.length - 1]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setProducts([]);

        const responseType = await productTypeService.getAll();
        setProductTypes(responseType.data);
        const responsebrand = await brandService.getAll();
        setBrands(responsebrand.data);

        if (id === '') {
          const responseProduct = await productService.getAll();
          setProducts(responseProduct.data);
        } else {
          const responseProduct = await productService.getByName(brand, 1, 10);
          setProducts(responseProduct.data);
        }
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
  }, [id, brand]);

  console.log(products);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Vợt cầu lông', href: '/products/' },
    { label: `Vợt cầu lông ${brand}` },
  ];

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
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
        </div>
      </div>
    </>
  );
};

export default Products;
