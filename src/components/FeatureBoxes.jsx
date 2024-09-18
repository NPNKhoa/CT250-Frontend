import {
  LocalShipping,
  VerifiedUser,
  CreditCard,
  Refresh,
} from '@mui/icons-material';

const FeatureBoxes = () => {
  const features = [
    {
      icon: <LocalShipping className='text-4xl text-primary' />,
      title: 'Vận chuyển TOÀN QUỐC',
      description:
        'Chúng tôi cung cấp dịch vụ vận chuyển toàn quốc với giao hàng tận nơi và thanh toán khi nhận hàng.',
    },
    {
      icon: <VerifiedUser className='text-4xl text-primary' />,
      title: 'Bảo đảm chất lượng',
      description:
        'Sản phẩm của chúng tôi được kiểm tra kỹ lưỡng để đảm bảo chất lượng tốt nhất trước khi đến tay bạn.',
    },
    {
      icon: <CreditCard className='text-4xl text-primary' />,
      title: 'Tiến hành THANH TOÁN',
      description:
        'Chúng tôi hỗ trợ nhiều phương thức thanh toán để bạn dễ dàng lựa chọn cách thanh toán phù hợp.',
    },
    {
      icon: <Refresh className='text-4xl text-primary' />,
      title: 'Đổi sản phẩm mới',
      description:
        'Nếu sản phẩm bạn nhận được có vấn đề, chúng tôi sẵn sàng đổi mới hoặc hoàn tiền.',
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-white shadow-md rounded-lg p-2 sm:p-5 flex flex-col items-center space-y-2 border border-gray-200 transition-transform transform hover:scale-105'
          >
            <div>{feature.icon}</div>
            <div className='text-center cursor-default'>
              <h3 className='sm:text-lg text-xs font-semibold text-primary mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600 sm:text-sm text-xs'>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxes;
