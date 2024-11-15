import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const ImageWithAction = ({ imageUrl, onDelete, ...props }) => {
  const [isReviewing, setIsReviewing] = useState(false);

  // Trigger review mode
  const onReview = () => {
    setIsReviewing(true);
  };

  // Close review mode
  const closeReview = () => {
    setIsReviewing(false);
  };

  return (
    <div {...props}>
      {/* Image Container with hover effect */}
      <div
        className='relative group border-4 border-primary p-2 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'
        onClick={onReview}
      >
        {/* Image */}
        <img
          src={imageUrl}
          alt='Uploaded'
          className='rounded-lg object-cover w-full h-full'
        />

        {/* Delete Button */}
        <IconButton
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            color: 'red',
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      {/* Review Mode Modal */}
      {isReviewing && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
          <div className='relative w-screen h-screen flex justify-center items-center'>
            {/* Close Review Button */}
            <IconButton
              onClick={closeReview}
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                color: 'white',
              }}
            >
              <CloseIcon fontSize='large' />
            </IconButton>

            {/* Zoomed Image */}
            <img
              src={imageUrl}
              alt='Review'
              className='max-w-full max-h-full rounded-lg shadow-lg'
            />
          </div>
          {/* Background click to exit review mode */}
          <div className='absolute inset-0' onClick={closeReview}></div>
        </div>
      )}
    </div>
  );
};

ImageWithAction.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ImageWithAction;
