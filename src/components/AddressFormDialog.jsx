import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
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

  const handleProvinceChange = async (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
    setDistrict('');
    setCommune('');
    setDistrictData([]);
    setWardData([]);
    try {
      const districts = await openApiService.getDistricts(selectedProvince.code);
      setDistrictData(districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleDistrictChange = async (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setCommune('');
    setWardData([]);
    try {
      const wards = await openApiService.getWards(selectedDistrict.code);
      setWardData(wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lấy giá trị từ các TextField
    const formData = {
      fullname: fullNameRef.current.value,
      phone: phoneNumberRef.current.value,
      province: province.name,
      district: district.name,
      commune: commune.name,
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
        <FormControl fullWidth margin='dense' variant='standard'>
          <InputLabel id='province-label'>Tỉnh/ Thành phố</InputLabel>
          <Select
            labelId='province-label'
            id='province'
            value={province}
            onChange={handleProvinceChange}
            required
          >
            {provinceData.map((province) => (
              <MenuItem key={province.code} value={province}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='dense' variant='standard'>
          <InputLabel id='district-label'>Quận/ Huyện</InputLabel>
          <Select
            labelId='district-label'
            id='district'
            value={district}
            onChange={handleDistrictChange}
            required
          >
            {districtData.map((district) => (
              <MenuItem key={district.code} value={district}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='dense' variant='standard'>
          <InputLabel id='commune-label'>Phường/ Xã</InputLabel>
          <Select
            labelId='commune-label'
            id='commune'
            value={commune}
            onChange={(event) => setCommune(event.target.value)}
            required
          >
            {wardData.map((ward) => (
              <MenuItem key={ward.code} value={ward}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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