import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Autocomplete, TextField, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createAddressThunk } from '@redux/thunk/addressThunk'; // Nhập khẩu thunk cần thiết
import openApiService from '@services/open-api.service';

const AddressFormDialog = ({ open, onClose, onSubmit, accessToken }) => {
  const dispatch = useDispatch();
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const detailRef = useRef();
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [commune, setCommune] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinces = await openApiService.getProvinces();
        setProvinceData(provinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event, newValue) => {
    setProvince(newValue);
    setDistrict(null);
    setCommune(null);
    setDistrictData([]);
    setWardData([]);
    if (newValue) {
      try {
        const districts = await openApiService.getDistricts(newValue.code);
        setDistrictData(districts);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    }
  };

  const handleDistrictChange = async (event, newValue) => {
    setDistrict(newValue);
    setCommune(null);
    setWardData([]);
    if (newValue) {
      try {
        const wards = await openApiService.getWards(newValue.code);
        setWardData(wards);
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lấy giá trị từ các TextField
    const formData = {
      fullname: fullNameRef.current.value,
      phone: phoneNumberRef.current.value,
      province: province?.name || '',
      district: district?.name || '',
      commune: commune?.name || '',
      detail: detailRef.current.value,
      isDefault: isDefault, // Sử dụng giá trị từ checkbox isDefault
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
        <Autocomplete
          id='province'
          options={provinceData}
          getOptionLabel={(option) => option.name}
          value={province}
          onChange={handleProvinceChange}
          renderInput={(params) => (
            <TextField {...params} label='Tỉnh/ Thành phố' margin='dense' variant='standard' required />
          )}
        />
        <Autocomplete
          id='district'
          options={districtData}
          getOptionLabel={(option) => option.name}
          value={district}
          onChange={handleDistrictChange}
          renderInput={(params) => (
            <TextField {...params} label='Quận/ Huyện' margin='dense' variant='standard' required />
          )}
        />
        <Autocomplete
          id='commune'
          options={wardData}
          getOptionLabel={(option) => option.name}
          value={commune}
          onChange={(event, newValue) => setCommune(newValue)}
          renderInput={(params) => (
            <TextField {...params} label='Phường/ Xã' margin='dense' variant='standard' required />
          )}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefault}
              onChange={(event) => setIsDefault(event.target.checked)}
              name='isDefault'
              color='primary'
            />
          }
          label='Đặt làm địa chỉ mặc định'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Trở Lại
        </Button>
        <Button type='button' onClick={handleSubmit} color='primary'>
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressFormDialog;