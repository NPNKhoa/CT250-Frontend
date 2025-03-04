import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import orderService from '@services/order.service';
import PaginationComponent from '@components/common/PaginationComponent';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import orderStatusService from '@services/orderStatus.service';

import { ToVietnamCurrencyFormat } from '../../helpers/ConvertCurrency';

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const page = parseInt(query.get('page') || '1', 10);
  const [totalPage, setTotalPage] = useState(0);

  const [orderStatus, setOrderStatus] = useState('');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');

  const [isLatestOrder, setIsLatestOrder] = useState('latest');

  const handleChangeFilter = statusId => {
    setSelectedOrderStatus(statusId);
  };

  const handleChangeOrdering = e => {
    setIsLatestOrder(e.target.value);
  };

  const fetchOrderStatus = async () => {
    const res = await orderStatusService.getAllOrderStatus();

    setOrderStatus(res.data);
  };

  console.log(orderStatus);

  useEffect(() => {
    fetchOrderStatus();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrderByUser(
          page,
          5,
          selectedOrderStatus,
          isLatestOrder
        );
        setTotalPage(response.meta.totalPages); // Cập nhật tổng số trang
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };
    fetchOrders();
  }, [page, selectedOrderStatus, isLatestOrder, orderStatus]);

  const handleViewDetails = async order => {
    try {
      const orderDetails = await orderService.getOrderById(order._id);
      setSelectedOrder(orderDetails.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const totalPriceItems = selectedOrder?.orderDetail.reduce((total, item) => {
    return (
      total +
      item.itemPrice *
        item.quantity *
        (1 - item.product.discount.discountPercent / 100)
    );
  }, 0);

  const getStatusClass = status => {
    switch (status) {
      case 'Đã giao hàng':
        return 'text-green-600';
      case 'Chờ xử lý':
        return 'text-yellow-600';
      case 'Đã hủy':
        return 'text-red-600';
      case 'Đang vận chuyển':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusButton = statusId => {
    switch (statusId) {
      case '6710b30f130cc0804e87c9a7': // Trạng thái "Đã giao hàng"
        return 'bg-green-500 text-white'; // Màu xanh lá
      case '66e0bf5b97d3d40c4f0fb70a': // Trạng thái "Chờ xử lý"
        return 'bg-yellow-400 text-white'; // Màu vàng
      case '6710fb3cfdd96181597b2b6a': // Trạng thái "Đã hủy"
        return 'bg-red-600 text-white'; // Màu đỏ
      case '66e0bf2997d3d40c4f0fb706': // Trạng thái "Đang vận chuyển"
        return 'bg-blue-600 text-white'; // Màu xanh dương
      default:
        return 'bg-gray-200 text-gray-600'; // Mặc định là màu xám
    }
  };

  const handleCancelOrder = async orderId => {
    try {
      await orderService.updateOrderStatus({
        id: orderId,
        orderStatus: '6710fb3cfdd96181597b2b6a',
      });
      toast.success('Đơn hàng đã được hủy thành công!');
    } catch (error) {
      console.error('Đã có lỗi xảy ra khi hủy đơn hàng:', error);
      toast.error('Đã có lỗi xảy ra khi hủy đơn hàng!');
    }
  };

  const maxPriceDiscount = selectedOrder?.voucher
    ? Math.min(
        totalPriceItems * (selectedOrder?.voucher?.discountPercent / 100),
        selectedOrder?.voucher?.maxPriceDiscount * 1000
      )
    : 0;

  return (
    <>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
          {/* Lọc trạng thái đơn hàng */}
          <div className='flex items-center mb-4 md:mb-0'>
            <div className='flex space-x-2 overflow-x-auto'>
              <button
                onClick={() => handleChangeFilter('')}
                className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                  selectedOrderStatus === ''
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              {Array.isArray(orderStatus) &&
                orderStatus.map(({ _id, orderStatus }) => (
                  <button
                    key={_id}
                    onClick={() => handleChangeFilter(_id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                      selectedOrderStatus === _id
                        ? getStatusButton(_id)
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {orderStatus}
                  </button>
                ))}
            </div>
          </div>

          {/* Phần sắp xếp */}
          <div className='flex justify-between'>
            <div className=''></div>
            <div className='flex items-center'>
              <h3 className='inline-block mr-2'>Sắp xếp:</h3>
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                <InputLabel>Ngày đặt</InputLabel>
                <Select
                  value={isLatestOrder}
                  label='Ngày đặt'
                  onChange={handleChangeOrdering}
                >
                  <MenuItem value='latest'>Mới nhất</MenuItem>
                  <MenuItem value='oldest'>Cũ nhất</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

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
          <div className='overflow-x-auto no-scrollbar'>
            <table className='min-w-full bg-white border mx-auto'>
              <thead className='hidden md:table-header-group'>
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
                {Array.isArray(orders) &&
                  orders.map(order => (
                    <tr
                      key={order._id}
                      className='md:table-row flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-0 hover:bg-gray-50'
                    >
                      {/* Mã đơn hàng */}
                      <td className='py-2 px-4 border-b md:border-0 text-left md:text-center'>
                        <span className='block md:hidden font-semibold'>
                          Mã đơn hàng:
                        </span>
                        #{order._id}
                      </td>
                      {/* Ngày đặt */}
                      <td className='py-2 px-4 border-b md:border-0 text-left md:text-center'>
                        <span className='block md:hidden font-semibold'>
                          Ngày đặt:
                        </span>
                        {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                      </td>
                      {/* Tổng tiền */}
                      <td className='py-2 px-4 border-b md:border-0 text-left md:text-center'>
                        <span className='block md:hidden font-semibold'>
                          Tổng tiền:
                        </span>
                        {ToVietnamCurrencyFormat(order.totalPrice)}
                      </td>
                      {/* Trạng thái */}
                      <td
                        className={`py-2 px-4 border-b md:border-0 text-left md:text-center ${getStatusClass(
                          order.orderStatus?.orderStatus
                        )}`}
                      >
                        <span className='block md:hidden font-semibold'>
                          Trạng thái:
                        </span>
                        {order.orderStatus?.orderStatus}
                      </td>
                      {/* Hành động */}
                      <td className='py-2 px-4 border-b md:border-0 text-left md:text-center'>
                        <button
                          onClick={() => handleViewDetails(order)}
                          className='px-3 py-1 bg-primary text-white rounded hover:bg-hover-primary'
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

        <div className='col-span-4 mt-6 flex justify-center'>
          <PaginationComponent
            path={`${location.pathname}`}
            totalPages={totalPage}
            currentPage={page}
          />
        </div>
      </div>

      {selectedOrder && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 p-4'>
          <div className='container mx-auto h-[90%] w-full sm:w-[80%] overflow-y-auto rounded-xl bg-white p-4'>
            {/* Header */}
            <div className='mb-4 flex items-center justify-between'>
              <h1 className='text-lg font-semibold md:text-2xl'>
                Đơn hàng #{selectedOrder._id}
              </h1>

              <div className='flex gap-6'>
                {selectedOrder.orderStatus?.orderStatus === 'Chờ xử lý' && (
                  <button
                    onClick={() => handleCancelOrder(selectedOrder._id)} // Truyền id của đơn hàng vào hàm
                    className='px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700'
                  >
                    Hủy đơn hàng
                  </button>
                )}
                <button
                  onClick={handleCloseModal}
                  className='px-4 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold shadow-md hover:bg-gray-300'
                >
                  X
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
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

            {/* Customer & Address */}
            <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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

            {/* Ordered Products */}
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
                        src={item.product.productImagePath?.[0]}
                        alt={item.product.productName}
                        className='h-20 w-20 rounded-md object-cover'
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
                                (item.product.discount?.discountPercent || 0) /
                                  100)
                          )}
                        </p>
                        {/* Thêm phần quà tặng kèm */}
                        {item.product.promotion?.productIds?.length > 0 ? (
                          <div className='mt-2'>
                            <h4 className='text-lg font-semibold text-gray-800'>
                              Quà tặng kèm:
                            </h4>
                            <ul className='list-disc pl-2'>
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
                                        gift.productName || 'Quà tặng không tên'
                                      }
                                      className='w-10 h-10 object-cover rounded-md mr-2'
                                    />
                                    <span>
                                      {gift.productName || 'Không có tên'} (trị
                                      giá:{' '}
                                      {ToVietnamCurrencyFormat(gift.price || 0)}
                                      )
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ) : (
                          <div className='mt-2'>
                            <h4 className='text-lg font-semibold text-gray-800'>
                              Quà tặng kèm:
                            </h4>
                            <p className='text-gray-600'>
                              Không có quà tặng kèm
                            </p>
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
    </>
  );
}

export default OrderHistory;
