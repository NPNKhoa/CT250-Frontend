import { Rating } from '@mui/material';
import commentService from '@services/comment.service';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
function RatingSection({ productId }) {
  const [ratingsData, setRatingsData] = useState([0, 0, 0, 0, 0]);
  const [averageRating, setAverageRating] = useState(5);
  const [totalRatings, setTotalRatings] = useState(0);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);

  const accessToken = localStorage.getItem('accessToken');

  const fetchComments = async () => {
    if (!productId) return;

    try {
      const response = await commentService.getAllComments(productId);
      const commentsData = response.data;

      const totalRatings = commentsData.length;
      const ratingsCount = [0, 0, 0, 0, 0];
      let totalStars = 0;

      commentsData.forEach(comment => {
        if (comment.star >= 1 && comment.star <= 5) {
          ratingsCount[comment.star - 1]++;
          totalStars += comment.star;
        }
      });

      setRatingsData(ratingsCount);
      setComments(commentsData);
      setTotalRatings(totalRatings);
      setAverageRating(
        totalRatings > 0 ? (totalStars / totalRatings).toFixed(1) : 5
      );
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect để gọi fetchComments khi productId thay đổi
  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleSubmit = async () => {
    if (rating === null || review.trim() === '') {
      toast.error('Vui lòng chọn đánh giá và nhập nhận xét!');
      return; // Dừng lại nếu không đủ thông tin
    }
    try {
      await commentService.createComment(
        productId,
        rating,
        review,
        accessToken
      );

      setReview('');
      setRating(5);
      toast.success('Đánh giá thành công! Cảm ơn bạn đã sử dụng dịch vụ');

      // Gọi lại hàm fetchComments để cập nhật danh sách nhận xét
      fetchComments();
    } catch (error) {
      console.log(error);
      toast.error('Vui lòng mua sản phẩm để đánh giá!');
    }
  };

  const handleRatingChange = (event, newRating) => setRating(newRating);
  const handleReviewChange = event => setReview(event.target.value);
  const handleLoadMore = () => {
    setVisibleComments(prev => prev + 5); // Tăng số bình luận hiển thị thêm 5
  };

  const handleShowLess = () => {
    setVisibleComments(5); // Quay lại 5 bình luận
  };

  return (
    <div className='container mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-lg md:text-xl font-bold mb-4'>
        Đánh giá & nhận xét sản phẩm
      </h2>
      <div className='flex flex-col md:flex-row items-center mb-6 gap-6 md:gap-10'>
        <div className='text-center'>
          <span className='text-3xl md:text-4xl font-bold'>
            {averageRating}/5
          </span>
          <div className='flex justify-center mt-2'>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns='http://www.w3.org/2000/svg'
                className={`h-5 w-5 md:h-6 md:w-6 ${
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

        <div className='w-full md:w-3/4'>
          {[...ratingsData].reverse().map((count, index) => {
            const starLevel = 5 - index;
            const percentage = totalRatings ? (count / totalRatings) * 100 : 0;

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
      <div className='flex flex-col items-start p-4 md:p-6 bg-white rounded-lg shadow-md w-full mx-auto'>
        <p className='text-md md:text-lg font-semibold mb-4'>
          Bạn đánh giá sao về sản phẩm này?
        </p>
        <Rating
          name='product-rating'
          value={rating}
          onChange={handleRatingChange}
          precision={1}
          size='large'
          className='mb-4'
        />
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder='Nhập nhận xét của bạn ở đây...'
          rows='4'
          className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-none mb-4'
        />
        <button
          onClick={handleSubmit}
          className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out'
        >
          Đánh giá ngay
        </button>
      </div>
      {comments
        .slice()
        .reverse()
        .slice(0, visibleComments)
        .map((comment, index) => (
          <div key={index} className='bg-gray-50 p-4 rounded-lg shadow-md my-4'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <img
                  src={
                    comment.user?.avatarImagePath
                      ? comment.user?.avatarImagePath.startsWith('http')
                        ? comment.user?.avatarImagePath
                        : `http://localhost:5000/${comment.user?.avatarImagePath.replace(
                            /\\/g,
                            '/'
                          )}`
                      : ''
                  }
                  alt=''
                  className=' rounded-full w-10 h-10 border-primary border-2'
                />
                <h3 className='font-bold text-lg'>{comment.user?.fullname}</h3>
              </div>

              <span className='text-sm text-gray-500'>
                {new Date(comment.createdAt).toLocaleString('vi-VN', {
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className='mt-2'>
              <div className=''>
                <p className='font-semibold flex items-center'>
                  Đánh giá:
                  <span className='inline-flex ml-2'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns='http://www.w3.org/2000/svg'
                        className={`h-5 w-5 ${
                          i < comment.star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.042 3.209a1 1 0 00.95.69h3.362c.969 0 1.371 1.24.588 1.81l-2.72 1.977a1 1 0 00-.364 1.118l1.042 3.209c.3.921-.755 1.688-1.54 1.118l-2.72-1.977a1 1 0 00-1.176 0l-2.72 1.977c-.785.57-1.84-.197-1.54-1.118l1.042-3.209a1 1 0 00-.364-1.118L2.545 8.636c-.783-.57-.381-1.81.588-1.81h3.362a1 1 0 00.95-.69l1.042-3.209z' />
                      </svg>
                    ))}
                  </span>
                </p>
                <p className='mt-1 font-semibold'>
                  Nhận xét:{' '}
                  <span className='text-gray-700 font-base'>
                    {comment.content}
                  </span>
                </p>
              </div>
              <div className='flex justify-end ml-auto mt-3'>
                <div className='bg-gray-100 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <img
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eSyK4zRPihr2JDlF7txHRNhlWu0nqTFFOg&s'
                      alt='Avatar'
                      className='w-10 h-10 rounded-full mr-2'
                    />
                    <div className='flex justify-between w-full'>
                      <p className='font-bold text-lg'>Quản trị viên</p>
                      <span className='text-sm text-gray-500'>
                        {new Date(comment.createdAt).toLocaleString('vi-VN', {
                          hour: 'numeric',
                          minute: 'numeric',
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <span className='text-gray-700 font-base'>
                    Chúng tôi rất vui khi bạn hài lòng với sản phẩm của chúng
                    tôi. Hãy chia sẻ trải nghiệm của bạn với bạn bè và người
                    thân nhé. Chúng tôi rất mong tiếp tục được phục vụ bạn trong
                    những lần mua sắm sau.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {totalRatings > 5 && (
        <>
          {visibleComments < comments.length ? (
            <button
              onClick={handleLoadMore}
              className='mt-4 text-white py-1 px-2 bg-primary rounded-lg hover:bg-hover-primary'
            >
              Xem thêm
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className='mt-4 text-white py-1 px-2 bg-primary rounded-lg hover:bg-hover-primary'
            >
              Thu gọn
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default RatingSection;
