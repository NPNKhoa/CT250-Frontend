import { useState } from 'react';
import BreadcrumbsComponent from '@components/common/Breadcrumb';

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
      <div className='pb-10 container mx-auto px-4'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4 mb-6 text-left'>
          Kiểm tra đơn hàng
        </h1>
        <div className='mb-4 text-left'>
          <p className='font-medium text-base sm:text-lg'>
            Mã đơn hàng/Số điện thoại*
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-4 w-full'
        >
          <input
            type='text'
            className='bg-gray-100 w-full sm:max-w-md lg:max-w-lg rounded-lg p-3 outline-none border border-gray-300 focus:ring-2 focus:ring-primary transition duration-200'
            placeholder='Nhập mã đơn hàng hoặc số điện thoại...'
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
      </div>
    </>
  );
};

export default CheckOrder;
