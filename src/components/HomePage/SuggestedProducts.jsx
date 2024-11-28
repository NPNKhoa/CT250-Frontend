import ProductItem from '@components/ProductItem';
import recommendationService from '@services/recommendation.service';
import { useEffect, useState } from 'react';

const SuggestedProducts = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const getSuggestedProducts = async () => {
      const data = await recommendationService.getSuggestedProducts();

      console.log(data);

      setSuggestedProducts(data.data);
    };

    getSuggestedProducts();
  }, []);

  return (
    <div className='flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide'>
      {Array.isArray(suggestedProducts) &&
        suggestedProducts.map((product, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-[calc(80vw/2)] sm:w-[calc(90vw/2)] md:w-auto'
          >
            <ProductItem
              imageUrl={product?.productImagePath[0]}
              name={product?.productName}
              price={
                product?.price *
                ((100 - (product?.discount?.discountPercent || 0)) / 100)
              }
              productLink={`products/detail/${product._id}`}
              discount={product?.discount?.discountPercent}
            />
          </div>
        ))}
    </div>
  );
};

export default SuggestedProducts;
