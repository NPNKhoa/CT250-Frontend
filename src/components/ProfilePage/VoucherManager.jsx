import voucherService from '@services/voucher.service';
import { Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VoucherManager = () => {
  const [loading, setLoading] = useState(false);
  const [ownVouchers, setOwnVouchers] = useState([]);
  const navigate = useNavigate();

  // Fetch danh sách vouchers của người dùng
  useEffect(() => {
    const fetchUserVouchers = async () => {
      try {
        setLoading(true);
        const response = await voucherService.getUserVouchers();
        setOwnVouchers(response.data);
      } catch (error) {
        console.error('Error fetching user vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVouchers();
  }, []);

  // Hiển thị loading
  if (loading) {
    return <div className='p-6 bg-white rounded-lg shadow-md'>Loading...</div>;
  }

  console.log(ownVouchers);

  // Hiển thị nếu không có voucher
  if (!loading && ownVouchers.length === 0) {
    return (
      <div className='p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Kho Vouchers của bạn</h1>
        <p className='text-gray-500'>Bạn chưa có voucher nào.</p>
        <div className=' flex justify-center my-3 '>
          <button
            className='p-2 border bg-primary text-white w-[20%] rounded-xl'
            onClick={() => navigate('/')}
          >
            Thu thập ngay
          </button>
        </div>
      </div>
    );
  }
  //   const usedPercent = Math.ceil(voucher.collectedCount / voucher.maxUsage);
  return (
    <div className=''>
      <h1 className='text-2xl font-bold mb-4'>Kho Vouchers của bạn</h1>

      {/* Danh sách voucher */}
      <ul className='  grid grid-cols-2 gap-5'>
        {ownVouchers.map(voucher => (
          <div
            key={voucher._id}
            className='cursor-pointer transition-all duration-300 rounded-lg border p-5 flex items-center gap-4 bg-gray-50 hover:bg-gray-100 shadow-md hover:shadow-lg w-full'
          >
            <div className='bg-primary p-3 rounded-full'>
              <Gift className='text-white text-xl' />
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold text-gray-800'>
                  {voucher.voucherId?.voucherName || 'Tên voucher không có'}
                </p>
                <p className='text-sm text-gray-400'>
                  Thu thập:{' '}
                  {voucher.collectedAt
                    ? format(new Date(voucher.collectedAt), 'dd/MM/yyyy')
                    : 'Không có thông tin'}
                </p>
              </div>
              <p className='text-sm text-gray-500'>
                Giảm {voucher.voucherId?.discountPercent || 0}%{' '}
              </p>
              <p className='text-sm text-gray-500'>
                Hạn sử dụng:{' '}
                {voucher.voucherId?.expiredDate
                  ? format(
                      new Date(voucher.voucherId.expiredDate),
                      'dd/MM/yyyy'
                    )
                  : 'Không có thông tin'}
              </p>

              <Typography className='text-xs text-gray-400 mt-1'>
                Đã dùng {voucher.voucherId.usedPercent}%
              </Typography>
              <LinearProgress variant='determinate' value={1} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default VoucherManager;
