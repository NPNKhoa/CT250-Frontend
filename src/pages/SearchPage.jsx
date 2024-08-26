import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbsComponent from '@components/Breadcrumb';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query'); // Lấy giá trị của query từ URL

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    {
      label: `Tìm kiếm sản phẩm [${query}]`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  React.useEffect(() => {
    // Thực hiện tìm kiếm với giá trị query
    console.log('Tìm kiếm cho:', query);
  }, [query]);
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <div className='container px-4 mx-auto'>
        <h1 className='mt-5 text-3xl font-bold'>Tìm kiếm sản phẩm [{query}]</h1>
      </div>
    </>
  );
};

export default SearchPage;
