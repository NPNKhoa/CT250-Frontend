import React from 'react';
import PasswordInput from '@components/PasswordInput';

function PasswordResetForm({
  currentPassword,
  newPassword,
  confirmPassword,
  handleChangePassword,
  handleSubmitPasswordReset,
}) {
  return (
    <form onSubmit={handleSubmitPasswordReset} className=''>
      {['currentPassword', 'newPassword', 'confirmPassword'].map(field => (
        <div key={field} className='mb-4'>
          <label
            htmlFor={field}
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            {field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, ' $1')}
            :
          </label>
          <PasswordInput
            id={field}
            value={
              field === 'currentPassword'
                ? currentPassword
                : field === 'newPassword'
                ? newPassword
                : confirmPassword
            }
            onChange={handleChangePassword}
          />
        </div>
      ))}
      <button
        type='submit'
        className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-4 rounded'
      >
        Đổi mật khẩu
      </button>
    </form>
  );
}

export default PasswordResetForm;
