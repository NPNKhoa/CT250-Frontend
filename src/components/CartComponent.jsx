import { useEffect, useState } from 'react';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCartByUser,
  updateQuantity,
  deleteItem,
} from '@redux/thunk/cartThunk';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];
  const accessToken = localStorage.getItem('accessToken');

  const [selectedItems, setSelectedItems] = useState([]);
  const allItemsSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  useEffect(() => {
    dispatch(getCartByUser(accessToken));
  }, [dispatch, accessToken]);

  const handleRemove = id => {
    dispatch(
      deleteItem({
        accessToken: accessToken,
        id: id,
      })
    );
  };

  const handleQuantityChange = (id, delta) => {
    if (delta <= 0) {
      handleRemove(id); // Xóa sản phẩm nếu số lượng bằng 0
    } else {
      dispatch(
        updateQuantity({
          accessToken: accessToken,
          data: { productId: id, quantity: delta },
        })
      );
    }
  };

  const handleCheckboxChange = id => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleSelectAll = () => {
    if (allItemsSelected) {
      setSelectedItems([]); // Bỏ chọn tất cả
    } else {
      const allIds = cartItems.map(item => item._id);
      setSelectedItems(allIds); // Chọn tất cả
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item._id))
      .reduce((total, item) => total + item.itemPrice * item.quantity, 0);
  };

  const handleOrderNow = () => {
    localStorage.setItem('selectedProductIds', JSON.stringify(selectedItems));
    setTimeout(() => navigate('/order'), 1000);
  };

  return (
    <div className=''>
      <h2 className='text-2xl font-bold text-white mb-4 bg-primary sm:rounded-t-lg '>
        Giỏ hàng
      </h2>
      <div className='flex items-center justify-between mb-4 px-5'>
        <div className=''></div>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={allItemsSelected}
            onChange={handleSelectAll}
            className='form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out'
          />
          <span className='ml-2 text-sm text-gray-700'>Chọn tất cả</span>
        </label>
      </div>
      <div className='w-full px-5'>
        <div>
          {cartItems.map(item => (
            <div key={item._id} className='flex items-center mb-4'>
              <input
                type='checkbox'
                checked={selectedItems.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
                className='form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-4'
              />
              <img
                src={item.product?.productImagePath?.[0] || ''}
                alt={item.product?.productName}
                className='w-20 mr-2'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-medium'>
                    {item.product?.productName}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <DeleteForeverSharpIcon />
                  </button>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <div className='flex items-center'>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-l-full'
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-r-full'
                    >
                      +
                    </button>
                  </div>
                  <div className='text-right font-bold text-primary'>
                    {(item.itemPrice * item.quantity).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center px-5'>
        <p className='font-bold'>Tổng tiền: </p>
        <p className='font-bold text-primary'>
          {calculateTotal().toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <button
        className='bg-primary hover:bg-hover-primary w-full text-white font-bold mt-2 py-2 px-4 rounded'
        onClick={handleOrderNow}
        disabled={selectedItems.length === 0}
      >
        Đặt hàng ngay
      </button>
    </div>
  );
}

export default Cart;
