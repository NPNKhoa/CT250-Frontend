import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createAddressThunk } from '@redux/thunk/addressThunk'; // Nhập khẩu thunk cần thiết

const AddressFormDialog = ({
  open,
  onClose,
  onSubmit,
  addressId,
  accessToken,
}) => {
  const dispatch = useDispatch(); // Sử dụng hook dispatch của redux
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const provinceRef = useRef();
  const districtRef = useRef();
  const communeRef = useRef();
  const detailRef = useRef();

  const handleSubmit = async event => {
    event.preventDefault();

    // Lấy giá trị từ các TextField
    const formData = {
      fullname: fullNameRef.current.value,
      phone: phoneNumberRef.current.value,
      province: provinceRef.current.value,
      district: districtRef.current.value,
      commune: communeRef.current.value,
      detail: detailRef.current.value,
      isDefault: false, // Đặt isDefault là false cho địa chỉ mới
    };

    // Thực hiện tạo địa chỉ qua thunk
    try {
      await dispatch(
        createAddressThunk({
          addressData: formData,
          accessToken: accessToken, // Thay accessToken bằng token hiện tại
        })
      );
      onSubmit(formData); // Gọi hàm onSubmit với dữ liệu form sau khi tạo địa chỉ thành công
      onClose(); // Đóng dialog sau khi submit
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Địa chỉ mới</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin='dense'
          id='fullName'
          label='Họ và tên'
          type='text'
          fullWidth
          variant='standard'
          inputRef={fullNameRef}
        />
        <TextField
          required
          margin='dense'
          id='phoneNumber'
          label='Số điện thoại'
          type='tel'
          fullWidth
          variant='standard'
          inputRef={phoneNumberRef}
        />
        <TextField
          required
          margin='dense'
          id='province'
          label='Tỉnh/ Thành phố'
          type='text'
          fullWidth
          variant='standard'
          inputRef={provinceRef}
        />
        <TextField
          required
          margin='dense'
          id='district'
          label='Quận/ Huyện'
          type='text'
          fullWidth
          variant='standard'
          inputRef={districtRef}
        />
        <TextField
          required
          margin='dense'
          id='commune'
          label='Phường/ Xã'
          type='text'
          fullWidth
          variant='standard'
          inputRef={communeRef}
        />
        <TextField
          required
          margin='dense'
          id='detail'
          label='Địa chỉ cụ thể'
          type='text'
          fullWidth
          variant='standard'
          inputRef={detailRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='text-primary'>
          Trở Lại
        </Button>
        <Button type='button' onClick={handleSubmit} className='text-primary'>
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressFormDialog;
