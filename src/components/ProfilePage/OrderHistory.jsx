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

  const handleChangeFilter = e => {
    setSelectedOrderStatus(e.target.value);
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

  return (
    <>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <h3 className='inline-block'>Lọc đơn hàng:</h3>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={selectedOrderStatus}
                label='Trạng thái'
                onChange={handleChangeFilter}
              >
                <MenuItem value=''>
                  <em>Tất cả</em>
                </MenuItem>
                {Array.isArray(orderStatus) &&
                  orderStatus.map(({ _id, orderStatus }) => (
                    <MenuItem key={_id} value={_id}>
                      {orderStatus}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

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
                          order.orderStatus.orderStatus
                        )}`}
                      >
                        {order.orderStatus.orderStatus}
                      </td>
                      <td className='py-2 px-4 border-b text-center'>
                        <button
                          onClick={() => handleViewDetails(order)}
                          className='px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700'
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
            currentPage={page} // Thêm tham số trang hiện tại
          />
        </div>
      </div>

      {selectedOrder && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
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
              {ToVietnamCurrencyFormat(selectedOrder.totalPrice)}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder.shippingAddress.detail},{' '}
              {selectedOrder.shippingAddress.commune},{' '}
              {selectedOrder.shippingAddress.district},{' '}
              {selectedOrder.shippingAddress.province}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              {selectedOrder.orderStatus.orderStatus}
            </p>

            <div className='border-t border-gray-200 my-2 pt-4'>
              <p>
                <strong>Phí vận chuyển:</strong>{' '}
                {ToVietnamCurrencyFormat(selectedOrder.shippingFee)}
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
                      // src={item.product.productImagePath?.[0] || ''}
                      src={
                        String(item.product.productImagePath?.[0]).startsWith('http')
                          ? item.product.productImagePath?.[0]
                          : `http://localhost:5000/${String(item.product.productImagePath?.[0]).replace(
                              /\\/g,
                              '/'
                            )}`
                      }
                      alt={item.product.productName}
                      className='w-16 h-16 object-cover rounded-md'
                    />
                    <div>
                      <h3 className='text-gray-900'>
                        {item.product.productName}
                      </h3>
                      <p className='text-gray-500'>Số lượng: {item.quantity}</p>
                      <p>
                        {ToVietnamCurrencyFormat(
                          item.itemPrice * ((100 - 15) / 100) * item.quantity
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
    </>
  );
}

export default OrderHistory;
