import { useSelector } from 'react-redux';

const AboutUsPage = () => {
  const systemConfigs = useSelector(
    state => state.systemConfigs.currentConfigs
  );
  const shopIntroduction = systemConfigs?.shopIntroduction;
  const coreValues = systemConfigs?.coreValue;
  const founders = systemConfigs?.founders;

  return (
    <div className='px-8 py-2 min-h-screen bg-gray-100'>
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Giới Thiệu
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: shopIntroduction }}
            className='text-gray-600 text-lg text-justify'
          ></div>
        </div>
      </section>

      <section className='py-12 bg-gray-200'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl rounded-xl font-bold text-gray-800 mb-8 text-center'>
            Giá Trị Cốt Lõi
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.isArray(coreValues) &&
              coreValues.map(item => (
                <div
                  key={item?._id}
                  className='bg-white p-6 rounded-lg shadow-md'
                >
                  <h3 className='text-xl font-semibold mb-4'>{item?.title}</h3>
                  <p className='text-gray-600  text-justify'>{item?.content}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Đội Ngũ Điều Hành
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.isArray(founders) &&
              founders.map(item => (
                <div
                  key={item._id}
                  className='bg-gray-100 p-6 rounded-lg shadow-md text-center'
                >
                  <img
                    src={`http://localhost:5000/${item?.founderAvatarPath}`}
                    alt='images'
                    className='w-32 h-32 mx-auto rounded-full object-cover'
                  />
                  <h3 className='text-xl font-semibold mt-4'>
                    {item?.founderName}
                  </h3>
                  <p className='text-gray-600'>Co-founder</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
