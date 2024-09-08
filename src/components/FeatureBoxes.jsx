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
    <div className='flex flex-wrap justify-center gap-4 p-4 my-6'>
      {features.map((feature, index) => (
        <div
          key={index}
          className='bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 border border-gray-200 transition-transform transform hover:scale-105 max-w-xs w-full'
        >
          <div>{feature.icon}</div>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-primary mb-2'>
              {feature.title}
            </h3>
            <p className='text-gray-600 text-sm'>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBoxes;
