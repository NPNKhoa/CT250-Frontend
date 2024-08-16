import { Link } from "react-router-dom";

const NavBar = () => {
  const arr = [
    {
      value: "trangchu",
      label: "Trang chủ",
    },
    {
      value: "sanpham",
      label: "Sản phẩm",
    },
    {
      value: "saleoff",
      label: "Sale off",
    },
    {
      value: "tintuc",
      label: "Tin tức",
    },
    {
      value: "chinhsach",
      label: "Chính sách",
    },
    {
      value: "huongdan",
      label: "Hướng dẫn",
    },
    {
      value: "gioithieu",
      label: "Giới thiệu",
    },
    {
      value: "lienhe",
      label: "Liên hệ",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center gap-24 py-1 px-20 bg-red-500">
      {arr.map((item, index) => (
        <Link
          key={index}
          to={`/products/${item.value}`}
          className={`py-2 text-white uppercase font-bold  text-sm {
            productType === item.label.toLowerCase() && selectedTab
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
