import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ value, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative'>
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        {...props}
        className='border border-gray-300 px-3 py-2 rounded w-full'
      />
      <button
        type='button'
        onClick={handleClickShowPassword}
        className='absolute inset-y-0 right-0 flex items-center pr-3'
      >
        {showPassword ? (
          <VisibilityOff className='text-gray-500' />
        ) : (
          <Visibility className='text-gray-500' />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
