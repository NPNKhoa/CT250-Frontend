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
      {publishingVouchers?.length !== 0 ? (
        publishingVouchers.map(voucher => {
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
        })
      ) : (
        <h2 className='text-2xl font-semibold text-primary italic'>
          Hiện chưa có voucher khả dụng
        </h2>
      )}
    </div>
  );
};

export default VoucherList;
