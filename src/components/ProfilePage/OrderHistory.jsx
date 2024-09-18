import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '@services/order.service';

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrderByUser();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = order => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const getStatusClass = status => {
    switch (status) {
      case 'Đã giao hàng':
        return 'text-green-600';
      case 'Đang đóng gói':
        return 'text-yellow-600';
      case 'Đã hủy':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <div className='container mx-auto py-8 px-4'>
        {orders.length === 0 ? (
          <div className='text-center'>
            <p className='text-lg'>Bạn chưa có đơn hàng nào.</p>
            <button
              onClick={() => navigate('/')}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border mx-auto'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b text-center'>
                    Mã đơn hàng
                  </th>
                  <th className='py-2 px-4 border-b text-center'>Ngày đặt</th>
                  <th className='py-2 px-4 border-b text-center'>Tổng tiền</th>
                  <th className='py-2 px-4 border-b text-center'>Trạng thái</th>
                  <th className='py-2 px-4 border-b text-center'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className='hover:bg-gray-50'>
                    <td className='py-2 px-4 border-b text-center'>
                      #{index + 1}
                    </td>
                    <td className='py-2 px-4 border-b text-center'>
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='py-2 px-4 border-b text-center'>
                      {order.totalPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td
                      className={`py-2 px-4 border-b text-center ${getStatusClass(
                        order.orderStatus.orderStatus
                      )}`}
                    >
                      {order.orderStatus.orderStatus}
                    </td>
                    <td className='py-2 px-4 border-b text-center'>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700'
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className=' relative bg-white rounded-lg p-6 w-1/2 max-h-[90vh] overflow-y-auto shadow-2xl'>
            <h3 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
              Chi tiết đơn hàng
            </h3>
            <p>
              <strong>Mã đơn hàng:</strong> #
              {orders.findIndex(order => order._id === selectedOrder._id) + 1}
            </p>
            <p>
              <strong>Ngày đặt:</strong>{' '}
              {new Date(selectedOrder.orderDate).toLocaleDateString('vi-VN')}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{' '}
              {selectedOrder.totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              {selectedOrder.orderStatus.orderStatus}
            </p>

            <div className='border-t border-gray-200 mt-4 pt-4'>
              <p>
                <strong>Phí vận chuyển:</strong>{' '}
                {selectedOrder.shippingFee.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
              <p>
                <strong>Phương thức vận chuyển:</strong>{' '}
                {selectedOrder.shippingMethod.shippingMethod}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{' '}
                {selectedOrder.paymentMethod.paymentMethodName}
              </p>
            </div>

            <div className='border-t'>
              <h2 className='text-lg font-semibold text-gray-900 mt-4'>
                Sản phẩm
              </h2>
              <div className='mt-4'>
                {selectedOrder.orderDetail?.map(item => (
                  <div
                    key={item.id}
                    className='flex items-center space-x-4 py-2'
                  >
                    <img
                      src={item.product.productImagePath?.[0] || ''}
                      alt={item.product.productName}
                      className='w-16 h-16 object-cover rounded-md'
                    />
                    <div>
                      <h3 className='text-gray-900'>
                        {item.product.productName}
                      </h3>
                      <p className='text-gray-500'>Số lượng: {item.quantity}</p>
                      <p>
                        {(item.itemPrice * item.quantity).toLocaleString(
                          'vi-VN',
                          {
                            style: 'currency',
                            currency: 'VND',
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-end mt-6'>
              <button
                onClick={handleCloseModal}
                className='aso px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition ease-in-out duration-300'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderHistory;
