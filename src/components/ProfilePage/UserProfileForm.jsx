import Avatar from '@assets/user.png';

function UserProfileForm({
  userData,
  handleChange,
  handleSubmit,
  handleAvatarChange,
  avatarPreview,
}) {
  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='mb-4 flex items-center'>
        <div className='flex items-center border py-3 px-5 rounded-xl bg-gray-200'>
          <label
            htmlFor='avatar'
            className='block text-gray-700 text-sm font-bold mb-2 mr-4'
          >
            Avatar:
          </label>
          <input
            type='file'
            id='avatar'
            accept='image/*'
            onChange={handleAvatarChange}
            className='mb-4'
          />
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt='Avatar Preview'
              className='w-24 h-24 object-cover rounded-full'
            />
          ) : (
            <div className='border rounded-lg'>
              <img
                src={Avatar}
                alt='Avatar Preview'
                className='w-24 h-24 object-cover rounded-full'
              />
            </div>
          )}
        </div>
      </div>

      {['email', 'fullName', 'phoneNumber', 'gender', 'dateOfBirth'].map(
        field => (
          <div key={field} className='mb-4'>
            <label
              htmlFor={field}
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, ' $1')}
              :
            </label>
            {field === 'gender' ? (
              <select
                id={field}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                <option value=''>Chọn giới tính</option>
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='other'>Khác</option>
              </select>
            ) : (
              <input
                type={field === 'dateOfBirth' ? 'date' : 'text'}
                id={field}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            )}
          </div>
        )
      )}

      <button
        type='submit'
        className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-4 rounded'
      >
        Cập nhật
      </button>
    </form>
  );
}

export default UserProfileForm;
