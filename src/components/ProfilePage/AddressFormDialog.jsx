import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  createAddressThunk,
  updateAddressThunk,
  getUserAddressThunk,
} from '@redux/thunk/addressThunk';
import openApiService from '@services/open-api.service';
import PropTypes from 'prop-types';

const AddressFormDialog = ({ open, onClose, addressData = {} }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [detail, setDetail] = useState('');
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [commune, setCommune] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    if (addressData) {
      setFullName(addressData.fullname || '');
      setPhoneNumber(addressData.phone || '');
      setDetail(addressData.detail || '');
      setProvince({
        name: addressData.province || '',
        code: addressData.provinceCode || '',
      });
      setDistrict({
        name: addressData.district || '',
        code: addressData.districtCode || '',
      });
      setCommune({
        name: addressData.commune || '',
        code: addressData.communeCode || '',
      });
      setIsDefault(addressData.isDefault || false);
    }
  }, [addressData]);

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

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      fullname: fullName,
      phone: phoneNumber,
      province: province?.name || '',
      district: district?.name || '',
      commune: commune?.name || '',
      detail: detail,
      isDefault: isDefault,
    };

    try {
      if (addressData && addressData._id) {
        await dispatch(
          updateAddressThunk({
            updatedData: { ...formData },
            id: addressData._id,
            accessToken: localStorage.getItem('accessToken'),
          })
        );
      } else {
        await dispatch(
          createAddressThunk({
            addressData: formData,
            accessToken: localStorage.getItem('accessToken'),
          })
        );
      }
      dispatch(getUserAddressThunk(localStorage.getItem('accessToken')));
      onClose();
    } catch (error) {
      console.error('Error creating/updating address:', error);
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
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <TextField
          required
          margin='dense'
          id='phoneNumber'
          label='Số điện thoại'
          type='tel'
          fullWidth
          variant='standard'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <Autocomplete
          id='province'
          options={provinceData}
          getOptionLabel={option => option.name}
          value={province}
          onChange={handleProvinceChange}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={params => (
            <TextField
              {...params}
              label='Tỉnh/ Thành phố'
              margin='dense'
              variant='standard'
              required
            />
          )}
        />
        <Autocomplete
          id='district'
          options={districtData}
          getOptionLabel={option => option.name}
          value={district}
          onChange={handleDistrictChange}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={params => (
            <TextField
              {...params}
              label='Quận/ Huyện'
              margin='dense'
              variant='standard'
              required
            />
          )}
        />
        <Autocomplete
          id='commune'
          options={wardData}
          getOptionLabel={option => option.name}
          value={commune}
          onChange={(event, newValue) => setCommune(newValue)}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={params => (
            <TextField
              {...params}
              label='Phường/ Xã'
              margin='dense'
              variant='standard'
              required
            />
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
          value={detail}
          onChange={e => setDetail(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDefault}
              onChange={event => setIsDefault(event.target.checked)}
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

AddressFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addressData: PropTypes.object,
};

export default AddressFormDialog;
