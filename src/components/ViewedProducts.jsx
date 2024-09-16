import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang_1709061799.webp',
    name: 'Vợt Tennis Babolat Pure Drive Junior 26 Gen 4 Chính Hãng',
    price: '2.699.000 ₫',
    link: '#',
  },
  {
    id: 2,
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang_1709061799.webp',
    name: 'Vợt Pickleball Joola Ben Johns Perseus 3 14mm Chính Hãng',
    price: '6.990.000 ₫',
    link: '#',
  },
  {
    id: 3,
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang_1709061799.webp',
    name: 'Vợt Tennis Babolat Pure Drive Junior 26 Gen 4 Chính Hãng',
    price: '2.699.000 ₫',
    link: '#',
  },
  {
    id: 4,
    image:
      'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-honor-pro-new-chinh-hang_1709061799.webp',
    name: 'Vợt Pickleball Joola Ben Johns Perseus 3 14mm Chính Hãng',
    price: '6.990.000 ₫',
    link: '#',
  },
];

function ViewedProducts() {
  return (
    <div className='container mx-auto px-4 border p-5 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Sản phẩm đã xem</h2>
      <div className='flex flex-col gap-4'>
        {products.map(product => (
          <Link
            key={product.id}
            to={product.link}
            className='bg-white shadow-md rounded-lg overflow-hidden flex items-center gap-4 no-underline'
          >
            <img
              src={product.image}
              alt={product.name}
              className='w-24 h-24 object-cover'
            />
            <div className='p-4'>
              <h3 className='sm:text-base text-sm font-medium'>
                {product.name}
              </h3>
              <p className='text-primary font-semibold'>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ViewedProducts;
