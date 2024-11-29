import { useState } from 'react';
import BreadcrumbsComponent from '@components/common/Breadcrumb';
import orderService from '@services/order.service'; // Import dịch vụ API
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { ToVietnamCurrencyFormat } from '../helpers/ConvertCurrency';

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

  const totalPriceItems = selectedOrder?.orderDetail.reduce((total, item) => {
    return (
      total +
      item.itemPrice *
        item.quantity *
        (1 - item.product.discount.discountPercent / 100)
    );
  }, 0);

  const maxPriceDiscount = selectedOrder?.voucher
    ? Math.min(
        totalPriceItems * (selectedOrder.voucher.discountPercent / 100),
        selectedOrder.voucher.maxPriceDiscount * 1000
      )
    : 0;

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

            {/* Wrapper div for responsiveness */}
            <div className='block md:hidden'>
              {/* Hiển thị thông tin dọc trên điện thoại */}
              <div className='space-y-4'>
                <div>
                  <strong>Mã đơn hàng:</strong> #{selectedOrder._id}
                </div>
                <div>
                  <strong>Ngày đặt:</strong>{' '}
                  {new Date(selectedOrder.orderDate).toLocaleDateString(
                    'vi-VN'
                  )}
                </div>
                <div>
                  <strong>Tiền hàng:</strong>{' '}
                  {ToVietnamCurrencyFormat(selectedOrder.totalPrice)}
                </div>
                <div>
                  <strong>Trạng thái:</strong>{' '}
                  {selectedOrder.orderStatus.orderStatus}
                </div>
                <div>
                  <button
                    onClick={() => handleViewDetails(selectedOrder)}
                    className='bg-primary text-white py-1 px-2 rounded hover:bg-primary-hover transition-colors'
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>

            {/* Hiển thị thông tin bảng trên laptop */}
            <div className='hidden md:block'>
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
                    <td className='px-6 py-4 whitespace-nowrap'>{`#${selectedOrder._id}`}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(selectedOrder.orderDate).toLocaleDateString(
                        'vi-VN'
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {ToVietnamCurrencyFormat(selectedOrder.totalPrice)}
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
          </div>
        )}
        {isModalOpen && orderDetail && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50'>
            <div className='container mx-auto h-[90%] w-full sm:w-[80%] overflow-y-auto rounded-xl bg-white p-4'>
              {/* Header */}
              <div className='mb-4 flex items-center justify-between'>
                <h1 className='text-xl lg:text-2xl font-semibold'>
                  Đơn hàng #{selectedOrder._id}
                </h1>
                <div className='flex space-x-2'>
                  <button
                    onClick={handleCloseModal}
                    className='rounded-xl bg-gray-200 px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300'
                  >
                    X
                  </button>
                </div>
              </div>

              {/* Thông tin đơn hàng */}
              <div className='mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <div className='rounded-lg bg-gray-100 p-2 text-center'>
                  <p>Ngày đặt:</p>
                  <p className='font-semibold text-orange-700'>
                    {new Date(selectedOrder.orderDate).toLocaleDateString(
                      'vi-VN'
                    )}
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-2 text-center'>
                  <p>Phí vận chuyển:</p>
                  <p className='font-semibold text-green-700'>
                    {ToVietnamCurrencyFormat(selectedOrder.shippingFee)}
                  </p>
                  <p className='text-sm'>
                    ({selectedOrder.shippingMethod.shippingMethod})
                  </p>
                </div>
                <div className='rounded-lg bg-gray-100 p-2 text-center'>
                  <p>Voucher:</p>
                  {selectedOrder?.voucher?.discountPercent ? (
                    <div>
                      <p className='font-semibold text-red-700'>
                        - {ToVietnamCurrencyFormat(maxPriceDiscount)}
                      </p>
                      <p className='text-sm'>
                        (Giảm {selectedOrder?.voucher?.discountPercent}%{' '}
                        <span className='text-primary'>
                          tối đa{' '}
                          {ToVietnamCurrencyFormat(
                            selectedOrder?.voucher?.maxPriceDiscount * 1000
                          )}
                        </span>
                        )
                      </p>
                    </div>
                  ) : (
                    <p className='font-semibold'>Không có voucher</p>
                  )}
                </div>
                <div className='rounded-lg bg-gray-100 p-2 text-center'>
                  <p>Tổng tiền:</p>
                  <p className='font-semibold text-blue-700'>
                    {ToVietnamCurrencyFormat(selectedOrder.totalPrice)}
                  </p>
                  <p className='text-sm'>(Đã bao gồm phí vận chuyển)</p>
                </div>
              </div>

              {/* Customer, Address, Payment */}
              <div className='mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='rounded-lg border p-4'>
                  <h2 className='font-semibold'>THÔNG TIN ĐẶT HÀNG</h2>
                  <p>
                    <span className='font-semibold'>Tên:</span>{' '}
                    {selectedOrder.user.fullname}
                  </p>
                  <p>
                    <span className='font-semibold'>Email:</span>{' '}
                    {selectedOrder.user.email}
                  </p>
                  <p>
                    <span className='font-semibold'>Số điện thoại:</span>{' '}
                    {selectedOrder.user.phone}
                  </p>
                </div>

                <div className='rounded-lg border p-4'>
                  <h2 className='font-semibold'>ĐỊA CHỈ GIAO HÀNG</h2>
                  <p>{selectedOrder?.shippingAddress.detail}</p>
                  <p>
                    {selectedOrder?.shippingAddress.commune},{' '}
                    {selectedOrder?.shippingAddress.district},{' '}
                    {selectedOrder?.shippingAddress.province}
                  </p>
                </div>

                <div className='rounded-lg border p-4'>
                  <h2 className='font-semibold'>THANH TOÁN</h2>
                  <p>
                    <span className='font-semibold'>Trạng thái:</span>{' '}
                    {selectedOrder?.paymentStatus
                      ? 'Đã thanh toán'
                      : 'Chờ thanh toán'}
                  </p>
                  <p>
                    <span className='font-semibold'>Phương thức:</span>{' '}
                    {selectedOrder.paymentMethod.paymentMethodName}
                  </p>
                </div>
              </div>

              {/* Product List */}
              <div className='mb-6'>
                <h2 className='mb-2 font-semibold'>SẢN PHẨM ĐÃ ĐẶT</h2>
                <div className='rounded-lg border p-4'>
                  <div className='no-scrollbar mb-4 max-h-64 overflow-y-auto'>
                    {selectedOrder.orderDetail?.map(item => (
                      <Link
                        to={`/products/detail/${item.product._id}`}
                        key={item._id}
                        className='flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 py-2'
                      >
                        <img
                          src={
                            String(
                              item.product.productImagePath?.[0]
                            ).startsWith('http')
                              ? item.product.productImagePath?.[0]
                              : `http://localhost:5000/${String(
                                  item.product.productImagePath?.[0]
                                ).replace(/\\/g, '/')}`
                          }
                          alt={item.product.productName}
                          className='h-16 w-16 rounded-md object-cover'
                        />
                        <div>
                          <h3 className='text-gray-900'>
                            {item.product.productName}
                          </h3>
                          <p className='text-gray-500'>
                            Số lượng: {item.quantity}
                          </p>
                          {item?.product.discount && (
                            <p className='text-sm text-gray-400 line-through sm:text-base'>
                              {ToVietnamCurrencyFormat(
                                item.itemPrice * item.quantity
                              )}
                            </p>
                          )}
                          <p className='text-primary font-bold'>
                            {ToVietnamCurrencyFormat(
                              item.itemPrice *
                                item.quantity *
                                (1 -
                                  (item.product.discount?.discountPercent ||
                                    0) /
                                    100)
                            )}
                          </p>
                          {/* Thêm phần hiển thị quà tặng kèm */}
                          {item.product.promotion?.productIds?.length > 0 && (
                            <div className='mt-2'>
                              <h4 className='text-lg font-semibold text-gray-800'>
                                Quà tặng kèm:
                              </h4>
                              <ul className='list-disc pl-5'>
                                {item.product.promotion.productIds.map(
                                  (gift, index) => (
                                    <li
                                      key={index}
                                      className='flex items-center text-gray-600'
                                    >
                                      <img
                                        src={
                                          String(
                                            gift.productImagePath?.[0]
                                          ).startsWith('http')
                                            ? gift.productImagePath?.[0]
                                            : `http://localhost:5000/${String(
                                                gift.productImagePath?.[0]
                                              ).replace(/\\/g, '/')}`
                                        }
                                        alt={
                                          gift.productName ||
                                          'Quà tặng không tên'
                                        }
                                        className='w-10 h-10 object-cover rounded-md mr-2'
                                      />
                                      <span>
                                        {gift.productName || 'Không có tên'}{' '}
                                        (trị giá:{' '}
                                        {ToVietnamCurrencyFormat(
                                          gift.price || 0
                                        )}
                                        )
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}

                    <p className='text-right font-semibold'>
                      Tổng: {ToVietnamCurrencyFormat(totalPriceItems)}
                    </p>
                  </div>
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
