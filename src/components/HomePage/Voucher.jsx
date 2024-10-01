import PropTypes from 'prop-types';

import { Button, Box, Typography, LinearProgress } from '@mui/material';
import voucherService from '@services/voucher.service';
import { toast } from 'react-toastify';

const Voucher = ({
  voucherId,
  voucherName,
  discountPercent,
  usedPercent,
  maxPriceDiscount,
}) => {
  const collectVoucher = async () => {
    try {
      const response = await voucherService.collect(voucherId);

      if (!response.error) {
        toast.success(`Thu thập ${response?.data?.voucherId?.voucherName}`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Voucher đã hết lượt thu thập');
      throw new Error(error);
    }
  };

  return (
    <Box className='flex border rounded-xl shadow-lg overflow-hidden w-full max-w-md'>
      <Box className='bg-primary flex flex-col items-center justify-center p-3 text-white w-1/3'>
        <Typography variant='h8' className='font-bold text-center'>
          {voucherName}
        </Typography>
      </Box>

      <Box className='flex flex-col justify-between p-3 w-3/4'>
        <Box>
          <Typography
            variant='h6'
            className='font-bold text-2xl text-wrap'
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Giảm {discountPercent}% Giảm tối đa {maxPriceDiscount}K
          </Typography>
          <Typography className='text-xs text-gray-400 mt-1'>
            Đã dùng {usedPercent}%
          </Typography>
          <LinearProgress variant='determinate' value={usedPercent} />
        </Box>

        <Box className='flex justify-between items-center mt-2'>
          <Button
            variant='contained'
            color='error'
            className='w-16'
            onClick={() => collectVoucher()}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Voucher.propTypes = {
  voucherId: PropTypes.string.isRequired,
  voucherName: PropTypes.string.isRequired,
  discountPercent: PropTypes.number.isRequired,
  usedPercent: PropTypes.number.isRequired,
  maxPriceDiscount: PropTypes.number.isRequired,
};

export default Voucher;
