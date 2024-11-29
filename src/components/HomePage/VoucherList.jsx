import Voucher from './Voucher';
import { useEffect, useState } from 'react';
import voucherService from '@services/voucher.service';

const VoucherList = () => {
  const [publishingVouchers, setPublishingVouchers] = useState([]);

  useEffect(() => {
    const fetchPublishingVouchers = async () => {
      try {
        const response = await voucherService.getPublishing();
        setPublishingVouchers(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPublishingVouchers();
  }, []);

  console.log(publishingVouchers);

  return (
    <div className='p-4 md:p-8'>
      {publishingVouchers?.length !== 0 ? (
        <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
          {publishingVouchers.map(voucher => {
            const usedPercent = Math.ceil(
              (voucher.collectedCount / voucher.maxUsage) * 100
            );

            return (
              <div
                key={voucher._id}
                className='w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] flex-shrink-0'
              >
                <Voucher
                  voucherId={voucher._id}
                  voucherName={voucher.voucherName}
                  discountPercent={voucher.discountPercent}
                  usedPercent={usedPercent}
                  maxPriceDiscount={voucher.maxPriceDiscount}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className='text-2xl font-semibold text-primary italic text-center'>
          Hiện chưa có voucher khả dụng
        </h2>
      )}
    </div>
  );
};

export default VoucherList;
