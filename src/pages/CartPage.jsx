import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import CartIcon from '@assets/cart-icon.png';

import { useDispatch, useSelector } from 'react-redux';
import {
  getCartByUser,
  updateQuantity,
  deleteItem,
} from '@redux/thunk/cartThunk';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartByUser(accessToken));
  }, [dispatch, accessToken]);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
  ];

  const handleRemove = id => {
    dispatch(
      deleteItem({
        accessToken: accessToken,
        id: id,
      })
    );
  };

  const handleQuantityChange = (id, delta) => {
    dispatch(
      updateQuantity({
        accessToken: accessToken,
        data: { productId: id, quantity: delta },
      })
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  };

  const handleOrderNow = () => {
    setTimeout(() => navigate('/order'), 1000);
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container mx-auto px-4 py-5'>
        <h2 className='text-2xl font-bold mb-4'>Giỏ hàng của bạn</h2>
        {cartItems.length === 0 ? (
          <div className='flex flex-col items-center'>
            <img src={CartIcon} alt='' className='w-32 sm:w-48' />
            <p className='text-center text-sm sm:text-lg text-gray-500'>
              Không có sản phẩm nào trong giỏ hàng của bạn
            </p>
          </div>
        ) : (
          <>
            <div className='hidden lg:block'>
              <table className='w-full bg-white rounded-lg shadow text-sm sm:text-base'>
                <thead className='bg-primary'>
                  <tr className='border-b text-white'>
                    <th className='text-left py-2 px-4'>Sản phẩm</th>
                    <th className='text-center py-2 px-4'>Số lượng</th>
                    <th className='text-right py-2 px-4'>Đơn giá</th>
                    <th className='text-center py-2 px-4'></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id} className='border-b'>
                      <td className='flex items-center py-2 px-4'>
                        <img
                          src={item.product.productImagePath?.[0] || ''}
                          alt={item.product.productName}
                          className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded mr-4'
                        />
                        <div>
                          <Link to={`/products/detail/${item.product._id}`}>
                            <p className='font-medium'>
                              {item.product.productName}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='text-center py-2 px-4'>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l-full'
                        >
                          <span>-</span>
                        </button>
                        <span className='mx-2 sm:mx-3'>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r-full'
                        >
                          <span>+</span>
                        </button>
                      </td>
                      <td className='text-right py-2 px-4 text-primary font-semibold'>
                        {item.itemPrice.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td className='text-center py-2 px-4'>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className='text-primary hover:text-hover-primary'
                        >
                          <DeleteForeverSharpIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className='block lg:hidden'>
              {cartItems.map(item => (
                <div
                  key={item._id}
                  className='flex flex-col border-b py-4 mb-4'
                >
                  {/* Product Image */}
                  <div className='flex items-center mb-4'>
                    <img
                      src={item.product.productImagePath?.[0] || ''}
                      alt={item.product.productName}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='ml-4'>
                      <Link to={`/products/detail/${item.product._id}`}>
                        <p className='font-medium text-base'>
                          {item.product.productName}
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Product Details and Quantity */}
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center'>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l-full'
                      >
                        <span>-</span>
                      </button>
                      <span className='mx-2'>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r-full'
                      >
                        <span>+</span>
                      </button>
                    </div>
                    <p className='text-primary font-semibold'>
                      {item.itemPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className='text-primary hover:text-hover-primary'
                    >
                      <DeleteForeverSharpIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price and Order Button */}
            <div className='flex flex-col items-end mt-6'>
              <div className='text-lg sm:text-xl font-semibold mb-4'>
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
                className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded'
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
