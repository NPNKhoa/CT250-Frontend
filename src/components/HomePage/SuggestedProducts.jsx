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
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 justify-items-center'>
      {Array.isArray(suggestedProducts) &&
        suggestedProducts.map(
          (product, index) => (
            console.log(product),
            (
              <ProductItem
                key={index}
                imageUrl={product?.productImagePath[0]}
                name={product?.productName}
                price={
                  product?.price *
                  ((100 - (product?.discount?.discountPercent || 0)) / 100)
                }
                productLink={`products/detail/${product._id}`}
                discount={product?.discount?.discountPercent}
              />
            )
          )
        )}
    </div>
  );
};

export default SuggestedProducts;
