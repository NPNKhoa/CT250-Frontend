import ViewedProducts from '@components/ViewedProducts';
import { Rating } from '@mui/material';
import React, { useState } from 'react';

function RatingSection() {
  const ratingsData = [1, 0, 0, 0, 0]; // Example data for ratings
  const totalRatings = ratingsData.reduce((acc, cur) => acc + cur, 0);
  const averageRating = (
    totalRatings > 0
      ? (5 * ratingsData[0] +
          4 * ratingsData[1] +
          3 * ratingsData[2] +
          2 * ratingsData[3] +
          1 * ratingsData[4]) /
        totalRatings
      : 5
  ).toFixed(1);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = event => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Đánh giá: ${rating} sao\nNhận xét: ${review}`);
  };

  return (
    <div className='grid grid-cols-[2fr_1fr] mt-5 gap-3'>
      <div className='container mx-auto p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>
          Đánh giá & nhận xét Vợt Cầu Lông Apacs Power Concept 500 chính hãng
        </h2>
        <div className='flex items-center mb-6 gap-10'>
          {/* rating */}
          <div className=' text-center'>
            <span className='text-4xl font-bold'>{averageRating}/5</span>
            <div className='flex justify-center mt-2'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-6 w-6 ${
                    i < Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.042 3.209a1 1 0 00.95.69h3.362c.969 0 1.371 1.24.588 1.81l-2.72 1.977a1 1 0 00-.364 1.118l1.042 3.209c.3.921-.755 1.688-1.54 1.118l-2.72-1.977a1 1 0 00-1.176 0l-2.72 1.977c-.785.57-1.84-.197-1.54-1.118l1.042-3.209a1 1 0 00-.364-1.118L2.545 8.636c-.783-.57-.381-1.81.588-1.81h3.362a1 1 0 00.95-.69l1.042-3.209z' />
                </svg>
              ))}
            </div>
            <span className='text-sm text-gray-500'>
              {totalRatings} đánh giá và nhận xét
            </span>
          </div>

          {/* total rating */}
          <div className='w-3/4'>
            {ratingsData.map((count, index) => {
              const starLevel = 5 - index;
              const percentage = totalRatings
                ? (count / totalRatings) * 100
                : 0;

              return (
                <div key={starLevel} className='flex items-center mb-2'>
                  <span className='text-sm'>{starLevel} sao</span>
                  <div className='flex-1 mx-2 bg-gray-200 rounded h-4'>
                    <div
                      className='bg-yellow-400 h-4 rounded'
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className='text-sm'>{count} đánh giá</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col items-start p-6 bg-white rounded-lg shadow-md w-full mx-auto'>
          <p className='text-lg font-semibold mb-4'>
            Bạn đánh giá sản phẩm này?
          </p>
          <Rating
            name='product-rating'
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
            size='large'
            className='mb-4'
          />
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder='Nhập nhận xét của bạn ở đây...'
            rows='4'
            className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-primary focus:border-primary resize-none mb-4'
          />
          <button
            onClick={handleSubmit}
            className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out'
          >
            Đánh giá ngay
          </button>
        </div>

        {/* comment rating */}
        <div className='bg-gray-50 p-4 rounded-lg shadow-md my-4'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg'>A Dũng</h3>
            <span className='text-sm text-gray-500'>2 năm trước</span>
          </div>
          <div className='mt-2'>
            <p className='font-semibold flex items-center'>
              Đánh giá:
              <span className='inline-flex ml-2'>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-yellow-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.042 3.209a1 1 0 00.95.69h3.362c.969 0 1.371 1.24.588 1.81l-2.72 1.977a1 1 0 00-.364 1.118l1.042 3.209c.3.921-.755 1.688-1.54 1.118l-2.72-1.977a1 1 0 00-1.176 0l-2.72 1.977c-.785.57-1.84-.197-1.54-1.118l1.042-3.209a1 1 0 00-.364-1.118L2.545 8.636c-.783-.57-.381-1.81.588-1.81h3.362a1 1 0 00.95-.69l1.042-3.209z' />
                  </svg>
                ))}
              </span>
            </p>
            <div className='text-sm'></div>
            <p className='mt-1 font-semibold '>
              Nhận xét:{' '}
              <span className='text-gray-700  font-thin '>
                Nếu anh em nào chưa biết thì ShopVNB có kênh Youtube là Cộng
                đồng Cầu lông Việt Nam – VN Badminton chuyên review vợt và nhiều
                thể loại khác đấy nhé! Lên đây được xem test vợt, đo thông số
                đảm bảo anh em sẽ chọn được một cây vợt phù hợp với bản thân
                giống như mình luôn.
              </span>
            </p>
          </div>
        </div>
      </div>
      <ViewedProducts />
    </div>
  );
}

export default RatingSection;
