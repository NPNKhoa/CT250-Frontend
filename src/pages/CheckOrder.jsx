import { useState } from 'react';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import orderService from '@services/order.service'; // Import dịch vụ API
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CheckOrder = () => {
  const [orderCode, setOrderCode] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Kiểm tra đơn hàng', href: '/checkorder' },
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    if (orderCode.trim() === '') {
      toast.error('Vui lòng nhập mã đơn hàng hoặc số điện thoại');
      return;
    }

    try {
      const orderDetails = await orderService.getOrderById(orderCode);

      if (orderDetails) {
        setSelectedOrder(orderDetails.data);
        toast.success('Tra cứu đơn hàng thành công');
        setOrderCode('');
      }
    } catch (error) {
      console.error(error);
      setSelectedOrder(null);
      toast.error('Không tìm thấy đơn hàng');
    }
  };

  const handleViewDetails = order => {
    setOrderDetail(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderDetail(null);
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='pb-10 container mx-auto px-4'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4 mb-6 text-left'>
          Kiểm tra đơn hàng
        </h1>
        <div className='mb-4 text-left'>
          <p className='font-medium text-base sm:text-lg'>
            Mã đơn hàng <span className='text-primary'>*</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-4 w-full'
        >
          <input
            type='text'
            className='bg-gray-100 w-full sm:max-w-md lg:max-w-lg rounded-lg p-3 outline-none border border-gray-300 focus:ring-2 focus:ring-primary transition duration-200'
            placeholder='Nhập mã đơn hàng...'
            value={orderCode}
            onChange={e => setOrderCode(e.target.value)}
          />
          <button
            type='submit'
            className='bg-primary text-white py-2 px-4 sm:py-3 sm:px-4 rounded-lg hover:bg-primary-hover transition-colors w-full sm:w-4/12 lg:w-3/12'
          >
            Tra cứu
          </button>
        </form>

        {selectedOrder && (
          <div className='mt-6'>
            <h2 className='text-xl font-semibold mb-4'>Thông tin đơn hàng</h2>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Mã đơn hàng
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Ngày đặt
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Tiền hàng
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Trạng thái
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {selectedOrder._id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {new Date(selectedOrder.orderDate).toLocaleDateString(
                      'vi-VN'
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {selectedOrder.totalPrice?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {selectedOrder.orderStatus.orderStatus}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button
                      onClick={() => handleViewDetails(selectedOrder)}
                      className='bg-primary text-white py-1 px-2 rounded hover:bg-primary-hover transition-colors'
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {isModalOpen && orderDetail && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-lg p-6 w-1/2 max-h-[90vh] shadow-2xl'>
              <div className='flex justify-between my-2 item-center'>
                <h3 className='text-2xl font-semibold text-center text-gray-800'>
                  Chi tiết đơn hàng
                </h3>
                <button
                  onClick={handleCloseModal}
                  className='px-4 py-2 bottom-0 bg-orange-500 text-white rounded hover:bg-orange-600 transition ease-in-out duration-300'
                >
                  Đóng
                </button>
              </div>

              <p>
                <strong>Mã đơn hàng:</strong> #{selectedOrder._id}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{' '}
                {new Date(selectedOrder.orderDate).toLocaleDateString('vi-VN')}
              </p>
              <p>
                <strong>Tiền hàng:</strong>{' '}
                {selectedOrder.totalPrice.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
              <p>
                <strong>Trạng thái:</strong>{' '}
                {selectedOrder.orderStatus.orderStatus}
              </p>

              <div className='border-t border-gray-200 my-2 pt-4'>
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

                <div className='mt-4 max-h-64 overflow-y-auto no-scrollbar'>
                  {selectedOrder.orderDetail?.map(item => (
                    <Link
                      to={`/products/detail/${item.product._id}`}
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
                        <p className='text-gray-500'>
                          Số lượng: {item.quantity}
                        </p>
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
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOrder;
