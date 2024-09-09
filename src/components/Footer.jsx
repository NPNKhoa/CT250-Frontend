import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
import FooterImg from '@assets/BoCongThuong.png';

const Footer = () => {
  const infoList = [
    {
      title: 'Thông tin chung',
      content: [
        'VNB Sports là hệ thống cửa hàng thể thao chuyên cung cấp sỉ và lẻ các mặt hàng dụng cụ thể thao từ phong trào tới chuyên nghiệp.',
        'Với sứ mệnh: "VNB cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình."',
        'Tầm nhìn: "Trở thành nhà phân phối và sản xuất thể thao lớn nhất Việt Nam."',
      ],
    },
    {
      title: 'Chính sách',
      links: [
        { label: 'Chính sách đổi trả, hoàn tiền', link: '#' },
        { label: 'Chính sách bảo hành', link: '#' },
        { label: 'Chính sách xử lý khiếu nại', link: '#' },
        { label: 'Chính sách vận chuyển', link: '#' },
        { label: 'Điều khoản sử dụng', link: '#' },
        { label: 'Chính Sách Bảo Mật Thông Tin', link: '#' },
      ],
    },
    {
      title: 'Hướng dẫn',
      links: [
        { label: 'Hướng dẫn thanh toán', link: '#' },
        { label: 'Kiểm tra bảo hành', link: '#' },
        { label: 'Kiểm tra đơn hàng', link: '#' },
        { label: 'HƯỚNG DẪN MUA HÀNG', link: '#' },
      ],
    },
    {
      title: 'Thông tin liên hệ',
      links: [
        {
          label: '8:00 - 22:00',
          link: '#',
          icon: <AccessTimeIcon className='text-white mr-2' />,
        },
        {
          label: '3/2, Xuân Khánh, Ninh Kiều, Cần Thơ',
          link: '#',
          icon: <LocationOnIcon className='text-white mr-2' />,
        },
        {
          label: 'minhtu15112k3gmail.com',
          link: '#',
          icon: <MailIcon className='text-white mr-2' />,
        },
        {
          label: '0977508430 | 0792677415',
          link: '#',
          icon: <PhoneIcon className='text-white mr-2' />,
        },
      ],
    },
  ];

  const socialIcons = [
    {
      icon: <FacebookIcon className='text-white hover:text-primary' />,
      link: '#',
    },
    {
      icon: <InstagramIcon className='text-white hover:text-primary' />,
      link: '#',
    },
    { icon: <XIcon className='text-white hover:text-primary' />, link: '#' },
  ];

  return (
    <div className='bg-black/90'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12 lg:px-28 py-8'>
        {infoList.map((section, index) => (
          <div key={index}>
            <h2 className='text-white uppercase text-base font-bold py-2'>
              {section.title}
            </h2>
            {section.content && (
              <div>
                {section.content.map((paragraph, i) => (
                  <p key={i} className='text-white text-sm pb-2 text-justify'>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {section.links && (
              <ul>
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className='text-white pb-2 text-sm flex items-center hover:text-primary'
                  >
                    {link.icon && link.icon}
                    <Link to={link.link}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}

            {section.title === 'Hướng dẫn' && (
              <img src={FooterImg} alt='Bộ Công Thương' className='mt-4 h-18' />
            )}
            {section.title === 'Thông tin liên hệ' && (
              <div className=''>
                <h2 className='text-white uppercase text-sm font-bold py-2'>
                  Kết nối với chúng tôi
                </h2>
                <div className=' space-x-4 mt-1'>
                  {socialIcons.map((icon, index) => (
                    <a key={index} href={icon.link} className='text-white '>
                      {icon.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='py-3 bg-black text-center'>
        <p className='text-white text-sm'>
          © Copyright {new Date().getFullYear()} By BaKaTu | GĐ/Sở hữu website:
          Nguyễn Minh Tứ
        </p>
      </div>
    </div>
  );
};

export default Footer;
