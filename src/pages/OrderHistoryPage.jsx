import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbsComponent from '@components/common/Breadcrumb';

function OrderHistoryPage() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD001',
      orderDate: '2023-10-01T10:00:00Z',
      totalAmount: 1500000,
      status: 'Đã giao hàng',
      items: [
        { name: 'Sản phẩm A', quantity: 1, price: 500000 },
        { name: 'Sản phẩm B', quantity: 2, price: 500000 },
      ],
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      orderDate: '2023-09-15T14:30:00Z',
      totalAmount: 2500000,
      status: 'Đang xử lý',
      items: [
        { name: 'Sản phẩm C', quantity: 1, price: 2500000 },
      ],
    },
    {
      id: 3,
      orderNumber: 'ORD003',
      orderDate: '2023-08-20T09:45:00Z',
      totalAmount: 3500000,
      status: 'Đã hủy',
      items: [
        { name: 'Sản phẩm D', quantity: 1, price: 3500000 },
      ],
    },
  ];

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Lịch sử đơn hàng' },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã giao hàng':
        return 'text-green-600';
      case 'Đang xử lý':
        return 'text-yellow-600';
      case 'Đã hủy':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
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
                  <th className='py-2 px-4 border-b text-center'>Mã đơn hàng</th>
                  <th className='py-2 px-4 border-b text-center'>Ngày đặt</th>
                  <th className='py-2 px-4 border-b text-center'>Tổng tiền</th>
                  <th className='py-2 px-4 border-b text-center'>Trạng thái</th>
                  <th className='py-2 px-4 border-b text-center'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className='hover:bg-gray-50'>
                    <td className='py-2 px-4 border-b text-center'>{order.orderNumber}</td>
                    <td className='py-2 px-4 border-b text-center'>
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='py-2 px-4 border-b text-center'>
                      {order.totalAmount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className={`py-2 px-4 border-b text-center ${getStatusClass(order.status)}`}>
                      {order.status}
                    </td>
                    <td className='py-2 px-4 border-b text-center'>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-bule-700'
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
          <div className='bg-white rounded-lg p-6 w-1/2 max-h-1/2 overflow-y-auto shadow-xl'>
            <h3 className='text-xl font-semibold mb-4 text-gray-800'>Chi tiết đơn hàng</h3>
            <p><strong>Mã đơn hàng:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString('vi-VN')}</p>
            <p><strong>Tổng tiền:</strong> {selectedOrder.totalAmount.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}</p>
            <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            <h4 className='text-lg font-semibold mt-4'>Sản phẩm:</h4>
            <ul className='list-disc list-inside'>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Số lượng: {item.quantity} - Giá: {item.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </li>
              ))}
            </ul>
            <div className='flex justify-end mt-4'>
              <button
                onClick={handleCloseModal}
                className='px-4 py-2 bg-primary text-white rounded hover:bg-hover-primary'
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

export default OrderHistoryPage;