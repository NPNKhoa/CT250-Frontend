import { Link } from "react-router-dom";

const NavBar = () => {
  const arr = [
    {
      value: "",
      label: "Trang chủ",
    },
    {
      value: "products",
      label: "Sản phẩm",
    },
    {
      value: "saleoff",
      label: "Sale off",
    },
    {
      value: "about",
      label: "Giới thiệu",
    },
    {
      value: "contact",
      label: "Liên hệ",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center gap-24 py-1 px-20 bg-primary">
      {arr.map((item, index) => (
        <Link
          key={index}
          to={`/${item.value}`}
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
