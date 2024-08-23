import { useState } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';

const CheckOrder = () => {
  const [orderCode, setOrderCode] = useState('');

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Kiểm tra đơn hàng', href: '/checkorder' },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (orderCode.trim() === '') {
      alert('Vui lòng nhập mã đơn hàng hoặc số điện thoại.');
    } else {
      alert(`Nội dung đã nhập: ${orderCode}`);
    }
  };

  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='pb-10 container px-10'>
        <h1 className='text-4xl font-semibold mt-4 mb-6 text-left'>
          Kiểm tra đơn hàng
        </h1>
        <div className='mb-4 text-left'>
          <p className='font-medium text-lg'>Mã đơn hàng/Số điện thoại*</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-4'
        >
          <input
            type='text'
            className='bg-gray-100 w-full max-w-lg rounded-lg p-3 outline-none border border-gray-300 focus:ring-2 focus:ring-primary transition duration-200'
            placeholder='Nhập mã đơn hàng hoặc số điện thoại...'
            value={orderCode}
            onChange={e => setOrderCode(e.target.value)}
          />
          <button
            type='submit'
            className='bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors w-[250px]'
          >
            Tra cứu
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckOrder;
