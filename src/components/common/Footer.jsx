import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import Divider from "@mui/material/Divider";

import FooterImg from "../../assets/BoCongThuong.png";

const Footer = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-4 bg-black gap-8 px-28">
        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Thông tin chung
          </h2>
          <p className="text-white text-justify text-sm pb-2">
            <span className="text-primary font-semibold ">VNB Sports</span> là
            hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung
            cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên
            nghiệp
          </p>
          <p className="text-white  text-justify text-sm pb-2 italic ">
            <span className="text-primary font-semibold  not-italic">
              Với sứ mệnh:{" "}
            </span>
            &quot;VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt
            nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính
            mình.&quot;
          </p>
          <p className="text-white italic text-justify text-sm pb-2">
            <span className="text-primary not-italic">Tầm nhìn: </span>{" "}
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
              <span className="text-primary">
                5 shop Premium và 63 cửa hàng
              </span>{" "}
              trên toàn quốc
            </p>
            <Link to="/">
              <p className="text-primary font-bold mt-2">
                Xem tất cả các cửa hàng VNB
              </p>
            </Link>
          </div>

          <div className="">
            <ul className="">
              <li className="text-white pb-2">
                Hotline:{" "}
                <span className="text-primary"> 0977508430 | 0792677415</span>
              </li>
              <li className="text-white pb-2">
                Email:{" "}
                <span className="text-primary"> minhtu15112k3gmail.com</span>
              </li>
              <li className="text-white pb-2">
                Hợp tác kinh doanh:{" "}
                <span className="text-primary"> 012345789 (Mr. Tu)</span>
              </li>
              <li className="text-white pb-2">
                Hotline bán sỉ:{" "}
                <span className="text-primary"> 0977508430</span>
              </li>
              <li className="text-white pb-2">
                Nhượng quyền thương hiệu:{" "}
                <span className="text-primary">012345789 (Mr. Tu)</span>
              </li>
              <li className="text-white pb-2">
                Than phiền dịch vụ:{" "}
                <span className="text-primary">012345789 (Mr. Tu)</span>
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
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Chính sách đổi trả,hoàn tiền</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Chính sách bảo hành</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Chính sách xử lý khiếu nại</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Chính sách vận chuyển</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Điều khoản sử dụng</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Chính Sách Bảo Mật Thông Tin</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          <h2 className="text-white uppercase text-base font-bold py-2">
            Hướng dẫn
          </h2>
          <div className="">
            <ul>
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">
                  Tìm hiểu công việc tập huấn tennis trước khi tổ chức giải đấu
                </Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">
                  Bảng size Lining - Cách chọn size quần áo lining, giày cầu
                  lông Lining
                </Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Hướng dẫn cách tập tennis cho người mới chơi</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">
                  Hướng dẫn cách chọn vợt cầu lông cho người mới chơi
                </Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Hướng dẫn thanh toán</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Kiểm tra bảo hành</Link>
              </li>
              <li className="text-white pb-2 text-sm hover:text-primary">
                <Link to="/">Kiểm tra đơn hàng</Link>
              </li>{" "}
              <li className="text-white pb-2 text-sm hover:text-primary uppercase">
                <Link to="/">HƯỚNG DẪN MUA HÀNG</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-primary ">
        <div className="py-5 text-white flex flex-col items-center text-center">
          <p>© CÔNG TY TNHH VNB SPORTS</p>
          <p>
            GPKD số 0314496879 do Sở KH và ĐT TP Hồ Chí Minh cấp ngày 05/07/2017
          </p>
          <p>GĐ/Sở hữu website: Phan Lê Chi</p>
          <img src={FooterImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
