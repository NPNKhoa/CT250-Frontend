import { useState } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';

const SearchPage = () => {
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
  ];
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
    </>
  );
};

export default SearchPage;
