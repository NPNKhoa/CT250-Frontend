import { useState } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import CartIcon from '@assets/cart-icon.png';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt cầu lông Yonex NanoFlare 370 Speed (Blue) chính hãng',
      quantity: 1,
      price: 1919000,
    },
    {
      id: 2,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt Cầu Lông Apacs Power Concept 500 chính hãng',
      quantity: 2,
      price: 687000,
    },
    {
      id: 3,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt Cầu Lông Apacs Power Concept 500 chính hãng',
      quantity: 2,
      price: 687000,
    },
  ]);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
  ];

  const handleRemove = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    const orderDetails = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
    }));

    alert(
      `Thông tin đơn hàng:\n${JSON.stringify(
        orderDetails,
        null,
        2
      )}\n\nTổng cộng: ${calculateTotal().toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })}`
    );
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container mx-auto px-4 py-5'>
        <h2 className='text-2xl font-bold mb-4'>Giỏ hàng của bạn</h2>
        {cartItems.length === 0 ? (
          <div className='flex flex-col items-center'>
            <img src={CartIcon} alt='' className='w-48      ' />
            <p className='text-center text-lg text-gray-500'>
              Không có sản phẩm nào trong giỏ hàng của bạn
            </p>
          </div>
        ) : (
          <>
            <table className='w-full bg-white rounded-lg shadow'>
              <thead className='bg-primary'>
                <tr className='border-b text-white'>
                  <th className='text-left py-2 px-4'>Sản phẩm</th>
                  <th className='text-right py-2 px-4'>Đơn giá</th>
                  <th className='text-center py-2 px-4'>Số lượng</th>
                  <th className='text-right py-2 px-4'>Giá</th>
                  <th className='text-center py-2 px-4'></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className='border-b'>
                    <td className='flex items-center py-2 px-4'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-24 h-24 object-cover rounded mr-4'
                      />
                      <div>
                        <p className='font-medium'>{item.name}</p>
                      </div>
                    </td>
                    <td className='text-right py-2 px-4'>
                      {item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className='text-center py-2 px-4'>
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l-full'
                      >
                        -
                      </button>
                      <span className='mx-3'>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r-full'
                      >
                        +
                      </button>
                    </td>
                    <td className='text-right py-2 px-4 text-primary font-semibold'>
                      {(item.price * item.quantity).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className='text-center py-2 px-4'>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className='text-primary hover:text-hover-primary'
                      >
                        <DeleteForeverSharpIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Price and Order Button */}
            <div className='flex flex-col items-end mt-6'>
              <div className='text-lg font-semibold mb-4'>
                Tổng cộng:{' '}
                <span className='text-primary'>
                  {calculateTotal().toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </div>
              <button
                onClick={handleOrderNow}
                className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-6 rounded'
              >
                Đặt hàng ngay
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
