import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@mui/material/Button';
import AddressFormDialog from '@components/ProfilePage/AddressFormDialog';
import {
  getUserAddressThunk,
  deleteAddressThunk,
  setDefaultAddressThunk,
} from '@redux/thunk/addressThunk';

function AddressSection() {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector(state => state.address);
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserAddressThunk(accessToken));
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (index = null) => {
    if (index !== null) {
      setEditAddress(addresses[index]);
    } else setEditAddress({});
    setOpen(true);
  };

  const handleSetDefault = index => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(setDefaultAddressThunk({ id: addresses[index]._id, accessToken: accessToken }));
  };

  const handleDelete = index => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(deleteAddressThunk({ id: addresses[index]._id, accessToken: accessToken }));
  };

  return (
    <div className=''>
      <button
        className='bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
        onClick={() => handleClickOpen()}
      >
        + Thêm địa chỉ mới
      </button>

      <AddressFormDialog
        open={open}
        onClose={handleClose}
        addressData={editAddress}
      />

      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Danh sách địa chỉ</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className='border-t border-gray-300 py-3'>
              <div className='flex justify-between'>
                <div>
                  <div className='flex items-center'>
                    <h3 className='text-lg font-semibold'>
                      {address.fullname}
                    </h3>
                    <div className='border-r-2 border-gray-300 h-6 mx-4' />
                    <p className='text-gray-600'>{address.phone}</p>
                  </div>
                  <p>{address.detail}</p>
                  <p>
                    {address.commune}, {address.district}, {address.province}
                  </p>
                  {address.isDefault && (
                    <span className='text-red-500 font-bold '>Mặc định</span>
                  )}
                </div>
                <div className='text-right'>
                  <button
                    className='text-blue-500 hover:underline'
                    onClick={() => handleClickOpen(index)}
                  >
                    Cập nhật
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        className='ml-4 text-red-500 hover:underline'
                        onClick={() => handleDelete(index)}
                      >
                        Xóa
                      </button>
                      <button
                        className='block mt-2 text-gray-600 border border-gray-300 py-1 px-2 rounded'
                        onClick={() => handleSetDefault(index)}
                      >
                        Thiết lập mặc định
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có địa chỉ nào.</p>
        )}
      </div>
    </div>
  );
}

export default AddressSection;
