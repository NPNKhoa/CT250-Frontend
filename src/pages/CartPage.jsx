import { useState } from 'react';
import BreadcrumbsComponent from '@components/Breadcrumb';

const CartPage = () => {
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng', href: '/cart' },
  ];
  return (
    <>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      CartPage
    </>
  );
};

export default CartPage;
