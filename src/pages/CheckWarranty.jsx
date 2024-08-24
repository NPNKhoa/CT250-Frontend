import { useState } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';

const CheckWarranty = () => {
  const [warrantyCode, setWarrantyCode] = useState('');

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Kiểm tra bảo hành', href: '/checkwarranty' },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const phoneNumberPattern = /^[0-9]{10,11}$/;

    if (warrantyCode.trim() === '') {
      alert('Vui lòng nhập số điện thoại.');
    } else if (!phoneNumberPattern.test(warrantyCode)) {
      alert(
        'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại từ 10 đến 11 chữ số.'
      );
    } else {
      alert(`Số điện thoại đã nhập: ${warrantyCode}`);
    }
  };
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='pb-10 container mx-auto px-4'>
        <h1 className='text-4xl font-semibold mt-4 mb-6 text-left'>
          Kiểm tra bảo hành
        </h1>
        <div className='mb-4 text-left'>
          <p className='font-medium text-lg'>Số điện thoại*</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-4'
        >
          <input
            type='text'
            className='bg-gray-100 w-full max-w-lg rounded-lg p-3 outline-none bwarranty bwarranty-gray-300 focus:ring-2 focus:ring-primary transition duration-200'
            placeholder='Nhập số điện thoại...'
            value={warrantyCode}
            onChange={e => setWarrantyCode(e.target.value)}
          />
          <button
            type='submit'
            className='bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors w-3/12'
          >
            Tra cứu thông tin bảo hành
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckWarranty;
