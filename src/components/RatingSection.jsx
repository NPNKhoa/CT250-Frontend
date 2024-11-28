import { Button, Rating } from '@mui/material';
import commentService from '@services/comment.service';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageWithAction from './common/ImageWithAction';

// eslint-disable-next-line react/prop-types
function RatingSection({ productId }) {
  const [ratingsData, setRatingsData] = useState([0, 0, 0, 0, 0]);
  const [averageRating, setAverageRating] = useState(5);
  const [totalRatings, setTotalRatings] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);

  const [reviewImg, setReviewImg] = useState([]);
  const [reviewImgFiles, setReviewImgFiles] = useState([]);

  const accessToken = localStorage.getItem('accessToken');

  const onLoadImage = files => {
    const fileArray = Array.from(files);
    const tempUrls = fileArray.map(file => URL.createObjectURL(file));

    setReviewImgFiles(fileArray);

    setReviewImg(prevImg => [...prevImg, ...tempUrls]);
  };

  const onDeleteReviewImg = image => {
    console.log('Deleting review image: ' + image);

    const imageIndex = reviewImg.findIndex(img => img === image);

    if (imageIndex !== -1) {
      const updatedUrls = reviewImg.filter((_, index) => index !== imageIndex);
      setReviewImg(updatedUrls);

      const updatedFiles = reviewImgFiles.filter(
        (_, index) => index !== imageIndex
      );
      setReviewImgFiles(updatedFiles);
    }
  };

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
        reviewImgFiles,
        accessToken
      );

      setReview('');
      setRating(5);
      toast.success('Đánh giá thành công! Cảm ơn bạn đã sử dụng dịch vụ');

      setReviewImg([]);

      fetchComments();
    } catch (error) {
      if (error.message == 'You can only comment once per product!') {
        toast.error('Bạn chỉ có thể đánh giá một lần cho mỗi sản phẩm!');
      } else {
        toast.error('Đánh giá thất bại! Vui lòng thử lại sau!');
      }
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
      <div className='flex flex-col items-start p-2 md:p-6 bg-white rounded-lg shadow-md w-full mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 mb-2'>
          <p className='text-md md:text-lg font-semibold text-center md:text-left'>
            Bạn đánh giá sao về sản phẩm này?
          </p>
          <Rating
            name='product-rating'
            value={rating}
            onChange={handleRatingChange}
            precision={1}
            size='large'
            className='w-full md:w-auto text-center'
          />
        </div>

        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder='Nhập nhận xét của bạn ở đây...'
          rows='4'
          className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-none mb-4'
        />
        <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>
          <Button
            component='label'
            variant='outlined'
            startIcon={<AddAPhotoIcon />}
            className='w-full md:w-auto'
          >
            Thêm ảnh
            <input
              type='file'
              multiple
              onChange={event => onLoadImage(event.target.files)}
              className='absolute inset-0 w-px h-px opacity-0'
            />
          </Button>
          <button
            onClick={handleSubmit}
            className='w-full md:w-auto bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out'
          >
            Đánh giá ngay
          </button>
        </div>

        {reviewImg.length !== 0 && (
          <div className='flex justify-start w-full items-center gap-5 mt-3 flex-wrap'>
            {reviewImg.map((image, index) => (
              <ImageWithAction
                key={`reviewImg-${index}`}
                imageUrl={image}
                onDelete={() => onDeleteReviewImg(image)}
                className='w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/5'
              />
            ))}
          </div>
        )}
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
                <h3 className='font-bold lg:text-lg text-sm'>
                  {comment.user?.fullname}
                </h3>
              </div>

              <span className='lg:text-sm text-xs text-gray-500'>
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
                  <span className='text-gray-700 lg:font-base lg:text-base text-xs'>
                    {comment.content}
                  </span>
                </p>
                {comment?.reviewImagePath &&
                  comment.reviewImagePath.length !== 0 && (
                    <div className='flex justify-start items-center flex-wrap gap-3 w-full mt-3'>
                      {comment.reviewImagePath.map((img, index) => (
                        <img
                          key={`${img}-${index}`}
                          src={`http://localhost:5000/${img}`}
                          alt='Ảnh khách hàng đánh giá'
                          className='w-[30%]'
                        />
                      ))}
                    </div>
                  )}
              </div>
              <div className='flex justify-start mt-3'>
                {comment.replies.length > 0 && (
                  <div className='bg-gray-100 p-4 rounded-lg w-full'>
                    <div className='flex items-center mb-2'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eSyK4zRPihr2JDlF7txHRNhlWu0nqTFFOg&s'
                        alt='Avatar'
                        className='w-10 h-10 rounded-full mr-2'
                      />
                      <div className='flex justify-between w-full'>
                        <p className='font-bold text-lg'>Quản trị viên</p>
                        <span className='text-sm text-gray-500'>
                          {new Date(
                            comment.replies[0].createdAt
                          ).toLocaleString('vi-VN', {
                            hour: 'numeric',
                            minute: 'numeric',
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <span className='text-gray-700 font-base w-full block'>
                      {comment.replies[0].content}
                    </span>
                  </div>
                )}
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
