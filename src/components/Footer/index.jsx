import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import Divider from "@mui/material/Divider";

const Footer = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-4 bg-black gap-8 px-28">
        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Thông tin chung
          </h2>
          <p className="text-white text-justify text-sm pb-2">
            <span className="text-red-500 font-semibold ">VNB Sports</span> là
            hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung
            cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên
            nghiệp
          </p>
          <p className="text-white  text-justify text-sm pb-2 italic ">
            <span className="text-red-500 font-semibold  not-italic">
              Với sứ mệnh:{" "}
            </span>
            &quot;VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt
            nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính
            mình.&quot;
          </p>
          <p className="text-white italic text-justify text-sm pb-2">
            <span className="text-red-500 not-italic">Tầm nhìn: </span>{" "}
            &quot;Trở thành nhà phân phối và sản xuất thể thao lớn nhất Việt
            Nam&quot;
          </p>
        </div>

        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Thông tin liên hệ
          </h2>
          <div className="pb-5">
            <p className=" text-white text-sm">
              <span className="uppercase">Hệ thống cửa hàng: </span>{" "}
              <span className="text-red-500">
                5 shop Premium và 63 cửa hàng
              </span>{" "}
              trên toàn quốc
            </p>
            <Link to="/">
              <p className="text-red-500 font-bold mt-2">
                Xem tất cả các cửa hàng VNB
              </p>
            </Link>
          </div>

          <div className="">
            <ul className="">
              <li className="text-white pb-2">
                Hotline:{" "}
                <span className="text-red-500"> 0977508430 | 0792677415</span>
              </li>
              <li className="text-white pb-2">
                Email:{" "}
                <span className="text-red-500"> minhtu15112k3gmail.com</span>
              </li>
              <li className="text-white pb-2">
                Hợp tác kinh doanh:{" "}
                <span className="text-red-500"> 012345789 (Mr. Tu)</span>
              </li>
              <li className="text-white pb-2">
                Hotline bán sỉ:{" "}
                <span className="text-red-500"> 0977508430</span>
              </li>
              <li className="text-white pb-2">
                Nhượng quyền thương hiệu:{" "}
                <span className="text-red-500">012345789 (Mr. Tu)</span>
              </li>
              <li className="text-white pb-2">
                Than phiền dịch vụ:{" "}
                <span className="text-red-500">012345789 (Mr. Tu)</span>
              </li>
            </ul>
          </div>

          <div className="">
            <ul className="flex gap-4 py-3 mb-2">
              <li className="">
                <FacebookIcon className="text-white" />
              </li>
              <li>
                <InstagramIcon className="text-white" />
              </li>
              <li>
                <XIcon className="text-white" />
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Chính sách
          </h2>

          <div className="">
            <ul>
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Hướng dẫn
          </h2>
          <p className="text-white">
            <span className="text-red-500">VNB Sports</span> là hệ thống cửa
            hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ
            các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp
          </p>
          <p className="text-white">
            <span className="text-red-500">VNB Sports</span> là hệ thống cửa
            hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ
            các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp
          </p>
          <p className="text-white">
            <span className="text-red-500">VNB Sports</span> là hệ thống cửa
            hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ
            các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
