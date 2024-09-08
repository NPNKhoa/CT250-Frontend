import { useState } from 'react';
import PasswordInput from '@components/common/PasswordInput';
import { useDispatch } from 'react-redux';
import { updatePasswordThunk } from '@redux/thunk/userThunk';

function PasswordResetForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  const handleSubmitPasswordReset = async event => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    try {
      await dispatch(
        updatePasswordThunk({
          updatedData: {
            oldPassword: currentPassword,
            password: newPassword,
            confirmPassword,
          },
          accessToken,
        })
      ).unwrap();

      alert('Mật khẩu đã được thay đổi thành công.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert(`Đổi mật khẩu thất bại: ${error.message}`);
    }
  };

  const handleChangePassword = e => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

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
            name={field}
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
        className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-3 rounded'
      >
        Đổi mật khẩu
      </button>
    </form>
  );
}

export default PasswordResetForm;
