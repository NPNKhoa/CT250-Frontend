import Voucher from './Voucher';
import { useEffect, useState } from 'react';
import voucherService from '@services/voucher.service';

const VoucherList = () => {
  const [publishingVouchers, setPublishingVouchers] = useState([]);

  useEffect(() => {
    const fetchPublishingVouchers = async () => {
      const response = await voucherService.getPublishing();

      setPublishingVouchers(response.data);
    };

    try {
      fetchPublishingVouchers();
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }, []);

  return (
    <div className='p-8 flex justify-around items-center'>
      {publishingVouchers.map(voucher => {
        const usedPercent = Math.ceil(
          voucher.collectedCount / voucher.maxUsage
        );

        return (
          <Voucher
            key={voucher._id}
            voucherId={voucher._id}
            voucherName={voucher.voucherName}
            discountPercent={voucher.discountPercent}
            usedPercent={usedPercent}
            maxPriceDiscount={voucher.maxPriceDiscount}
          />
        );
      })}
    </div>
  );
};

export default VoucherList;
