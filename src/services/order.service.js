import axios from 'axios';
import createApiClient from './api.service';

class OrderService {
  constructor(path = '/order') {
    this.api = createApiClient(path);
  }

  async getDestinationCode({ province, district, ward }) {
    try {
      const provinceRes = await axios.get(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN_API,
          },
        }
      );

      const provinceData = provinceRes.data.filter(
        item => item.ProvinceName === province
      );

      const provinceId =
        provinceData.length !== 0 ? provinceData[0].ProvinceID : 0;

      const districtRes = await axios.get(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN_API,
            province_id: provinceId,
          },
        }
      );

      const districtData = districtRes.data.filter(item =>
        item.NameExtension.includes(district)
      );

      const districtId =
        districtData.length !== 0 ? districtData[0].DistrictID : 0;

      const wardRes = await axios.get(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN_API,
            district_id: districtId,
          },
        }
      );

      const wardData = wardRes.data.filter(item =>
        item.NameExtension.includes(ward)
      );

      const wardCode = wardData.length !== 0 ? wardData.WardCode : 0;

      return { districtId, wardCode };
    } catch (error) {
      throw new Error(
        error.response.data.error || 'Error fetching thirty-part api'
      );
    }
  }

  async getDeliveryFee({ province, district, ward }, packageWeight) {
    try {
      const { districtId, wardCode } = await this.getDestinationCode({
        province,
        district,
        ward,
      });

      const response = await axios.post(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
        JSON.stringify({
          to_district_id: districtId, // This value must be an integer
          to_ward_code: String.toString(wardCode), // This value must be a string
          weight: packageWeight, // (gram)
          service_id: 53321, // This value is temporary fixed
          service_type_id: 3, // This value is temporary fixed
        })
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || 'Error fetching thirty-part api'
      );
    }
  }
}

export default new OrderService();
