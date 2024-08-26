import { Link } from 'react-router-dom';

function ProfilePage() {
  const user = {
    name: 'Nguyễn Minh Tử',
    phone: '0845969757',
    address: '',
  };

  const orders = [
    {
      id: '001',
      date: '2024-08-25',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      value: '1,000,000 VND',
      status: 'Đang xử lý',
    },
    {
      id: '002',
      date: '2024-08-20',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      value: '2,500,000 VND',
      status: 'Đã giao hàng',
    },
  ];

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-2xl font-bold mb-6'>Thông tin tài khoản</h1>
      <p className='text-gray-700 mb-5 italic'>
        Xin chào, <span className='text-primary font-bold '> {user.name}</span>
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md md:col-span-1'>
          <h2 className='text-2xl font-bold mb-4'>Thông tin khách hàng</h2>
          <ul className='space-y-2'>
            <li>
              <span className='font-medium'>Họ tên:</span> {user.name}
            </li>
            <li>
              <span className='font-medium'>Số điện thoại:</span> {user.phone}
            </li>
            <li>
              <span className='font-medium'>Địa chỉ:</span>{' '}
              {user.address || 'Chưa cập nhật'}
            </li>
          </ul>
          <button className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-4 rounded mt-6 transition-colors duration-200'>
            <Link to='/accountinfo'>Sửa thông tin</Link>
          </button>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md md:col-span-2'>
          <h2 className='text-2xl font-bold mb-4'>Đơn hàng của bạn</h2>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-gray-700 border-b'>
                <th className='text-left py-2'>Đơn hàng</th>
                <th className='text-center py-2'>Ngày</th>
                <th className='text-center py-2'>Địa chỉ</th>
                <th className='text-right py-2'>Giá trị</th>
                <th className='text-center py-2'>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center py-4'>
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                // Hiển thị danh sách đơn hàng ở đây
                orders.map(order => (
                  <tr key={order.id} className='border-b'>
                    <td className='py-2'>{order.id}</td>
                    <td className='text-center py-2'>{order.date}</td>
                    <td className='text-center py-2'>{order.address}</td>
                    <td className='text-right py-2'>{order.value}</td>
                    <td className='text-center py-2'>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
