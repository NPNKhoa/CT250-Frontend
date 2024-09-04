import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel } from '@mui/material';
const AddressFormDialog = ({ open, onClose, onSubmit, address }) => {
  const [fullName, setFullName] = React.useState(address?.fullName || '');
  const [phoneNumber, setPhoneNumber] = React.useState(
    address?.phoneNumber || ''
  );
  const [province, setProvince] = React.useState(address?.province || '');
  const [district, setDistrict] = React.useState(address?.district || '');
  const [commune, setCommune] = React.useState(address?.commune || '');
  const [detail, setDetail] = React.useState(address?.detail || '');
  const [isDefault, setIsDefault] = React.useState(address?.isDefault || false);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      fullName,
      phoneNumber,
      province,
      district,
      commune,
      detail,
      isDefault,
    };
    onSubmit(formData); // Gọi hàm onSubmit với dữ liệu form
    onClose(); // Đóng dialog sau khi submit
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{address ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin='dense'
          id='fullName'
          name='fullName'
          label='Họ và tên'
          type='text'
          fullWidth
          variant='standard'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='phoneNumber'
          name='phoneNumber'
          label='Số điện thoại'
          type='tel'
          fullWidth
          variant='standard'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='province'
          name='province'
          label='Tỉnh/ Thành phố'
          type='text'
          fullWidth
          variant='standard'
          value={province}
          onChange={e => setProvince(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='district'
          name='district'
          label='Quận/ Huyện'
          type='text'
          fullWidth
          variant='standard'
          value={district}
          onChange={e => setDistrict(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='commune'
          name='commune'
          label='Phường/ Xã'
          type='text'
          fullWidth
          variant='standard'
          value={commune}
          onChange={e => setCommune(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='detail'
          name='detail'
          label='Địa chỉ cụ thể'
          type='text'
          fullWidth
          variant='standard'
          value={detail}
          onChange={e => setDetail(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefault}
              onChange={e => setIsDefault(e.target.checked)}
            />
          }
          label='Mặc định'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='text-primary'>
          Trở Lại
        </Button>
        <Button type='submit' onClick={handleSubmit} className='text-primary'>
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressFormDialog;
