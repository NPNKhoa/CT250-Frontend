import MinhTu from '@assets/co-founder/minhtu.jpg';
import NguyenKhoa from '@assets/co-founder/nguyenkhoa.jpg';
import HoaiBao from '@assets/co-founder/hoaibao.jpg';

const AboutUsPage = () => {
  return (
    <div className='px-8 py-2 min-h-screen bg-gray-100'>
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Giới Thiệu
          </h2>
          <p className='text-gray-600 text-lg text-justify'>
            Chúng tôi bắt đầu hành trình của mình với một niềm đam mê mãnh liệt
            về việc cung cấp sản phẩm chất lượng cao và dịch vụ khách hàng xuất
            sắc. Được thành lập vào năm 2024, chúng tôi đã không ngừng mở rộng
            và đổi mới để đáp ứng nhu cầu của khách hàng.
          </p>
          <br />
          <p className='text-gray-600 text-lg text-justify'>
            Hiện nay, Hệ thống cửa hàng cầu lông VNB đã có hơn 50 chi nhánh trải
            dài trên khắp mọi miền Đất nước. Với tiêu chí luôn đảm bảo cung cấp
            đầy đủ các mặt hàng chuyên dụng dành riêng cho bộ môn cầu lông như
            giày, vợt cầu lông, túi vợt, balo, quần áo, phụ kiện,... nổi trội
            với nhiều phân khúc giá trải dài từ thấp đến cao nên các lông thủ
            cần mua gì cứ đến ngay với ShopVNB, chắc chắn sẽ làm các bạn vô cùng
            hài lòng.
          </p>
          <br />
          <p className='text-gray-600 text-lg text-justify'>
            ShopVNB luôn là nơi cung cấp nhanh nhất các mặt hàng hot đến từ
            những thương hiệu top đầu thế giới như Yonex, Lining, Victor,
            Mizuno,... Không những vậy các sản phẩm đến từ các hãng tầm trung và
            giá rẻ như Adidas, Forza, Apacs, VNB, Kamito,... Shop cầu lông VNB
            cũng luôn cung cấp đầy đủ và mẫu mã rất đa dạng.
          </p>
        </div>
      </section>

      <section className='py-12 bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl rounded-xl font-bold text-gray-800 mb-8 text-center'>
            Giá Trị Cốt Lõi
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Chất lượng</h3>
              <p className='text-gray-600  text-justify'>
                Chúng tôi cam kết cung cấp sản phẩm với chất lượng tốt nhất và
                dịch vụ khách hàng tận tâm.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Đổi mới</h3>
              <p className='text-gray-600 text-justify'>
                Chúng tôi không ngừng đổi mới và cải tiến để mang lại những sản
                phẩm và dịch vụ tốt nhất cho khách hàng.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Tin cậy</h3>
              <p className='text-gray-600 text-justify'>
                Khách hàng có thể hoàn toàn yên tâm khi mua sắm tại cửa hàng của
                chúng tôi với sự tin cậy tuyệt đối.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Đội Ngũ Điều Hành
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md text-center'>
              <img
                src={NguyenKhoa}
                alt='images'
                className='w-32 h-32 mx-auto rounded-full'
              />
              <h3 className='text-xl font-semibold mt-4'>
                Nguyễn Phúc Nguyên Khoa
              </h3>
              <p className='text-gray-600'>Co-founder</p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md text-center'>
              <img
                src={MinhTu}
                alt='images'
                className='w-32 h-32 mx-auto rounded-full'
              />
              <h3 className='text-xl font-semibold mt-4'>Nguyễn Minh Tứ</h3>
              <p className='text-gray-600'>Co-founder</p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md text-center'>
              <img
                src={HoaiBao}
                alt='images'
                className='w-32 h-32 mx-auto rounded-full'
              />
              <h3 className='text-xl font-semibold mt-4'>Dương Hoài Bảo</h3>
              <p className='text-gray-600'>Co-founder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
