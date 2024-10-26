import { useEffect, useMemo, useState } from 'react';
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
  }, [page, selectedOrderStatus, isLatestOrder]);

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
      default:
        return 'text-gray-600';
    }
  };

  const maxPriceDiscount = selectedOrder?.voucher
    ? Math.min(
        totalPriceItems * (selectedOrder.voucher.discountPercent / 100),
        selectedOrder.voucher.maxPriceDiscount * 1000
      )
    : 0;

  return (
    <>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <div className='flex space-x-2'>
              <button
                onClick={() => handleChangeFilter('')}
                className={`px-4 py-2 rounded-lg ${
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
                    className={`px-4 py-2 rounded-lg ${
                      selectedOrderStatus === _id
                        ? 'bg-primary text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {orderStatus}
                  </button>
                ))}
            </div>
          </div>

          {/* Phần sắp xếp giữ nguyên */}
          <div className='flex items-center'>
            <h3 className='inline-block'>Sắp xếp:</h3>
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
                {Array.isArray(orders) &&
                  orders.map(order => (
                    <tr key={order._id} className='hover:bg-gray-50'>
                      <td className='py-2 px-4 border-b text-center'>
                        #{order._id}
                      </td>
                      <td className='py-2 px-4 border-b text-center'>
                        {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className='py-2 px-4 border-b text-center'>
                        {ToVietnamCurrencyFormat(order.totalPrice)}
                      </td>
                      <td
                        className={`py-2 px-4 border-b text-center ${getStatusClass(
                          order.orderStatus?.orderStatus
                        )}`}
                      >
                        {order.orderStatus?.orderStatus}
                      </td>
                      <td className='py-2 px-4 border-b text-center'>
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
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50'>
          <div className='container mx-auto h-[90%] w-[80%] overflow-y-auto rounded-xl bg-white p-4'>
            {/* Header */}
            <div className='mb-4 flex items-center justify-between'>
              <h1 className='text-2xl font-semibold'>
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

            <div className='mb-6 grid grid-cols-4 gap-4'>
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

            <div className='mb-6 grid grid-cols-3 gap-4'>
              {/* Customer & Order */}
              <div className='rounded-lg border p-4'>
                <div className='mb-2 flex justify-between'>
                  <h2 className='font-semibold'>THÔNG TIN ĐẶT HÀNG</h2>
                </div>
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
                <div className='mb-2 flex justify-between'>
                  <h2 className='font-semibold'>ĐỊA CHỈ GIAO HÀNG</h2>
                </div>
                <p>{selectedOrder?.shippingAddress.detail}</p>
                <p>
                  {selectedOrder?.shippingAddress.commune},{' '}
                  {selectedOrder?.shippingAddress.district},{' '}
                  {selectedOrder?.shippingAddress.province}
                </p>
              </div>

              <div className='rounded-lg border p-4'>
                <div className='mb-2 flex justify-between'>
                  <h2 className='font-semibold'>THANH TOÁN</h2>
                </div>
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

            <div className='mb-6'>
              <h2 className='mb-2 font-semibold'>SẢN PHẨM ĐÃ ĐẶT</h2>
              <div className='rounded-lg border p-4'>
                <div className='no-scrollbar mb-4 max-h-64 overflow-y-auto'>
                  {selectedOrder.orderDetail?.map(item => (
                    <Link
                      to={`/products/detail/${item.product._id}`}
                      key={item._id}
                      className='flex items-center space-x-4 py-2'
                    >
                      <img
                        src={
                          String(item.product.productImagePath?.[0]).startsWith(
                            'http'
                          )
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
                        <p className='text-sm text-gray-400 line-through sm:text-base'>
                          {item?.product.discount && (
                            <>
                              {ToVietnamCurrencyFormat(
                                item.itemPrice * item.quantity
                              )}
                            </>
                          )}
                        </p>
                        <p className='text-primary font-bold'>
                          {ToVietnamCurrencyFormat(
                            item.itemPrice *
                              item.quantity *
                              (1 - item.product.discount.discountPercent / 100)
                          )}
                        </p>
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
