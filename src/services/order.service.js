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

      const provinceData = provinceRes.data.data.filter(
        item => item.ProvinceName === province
      );

      const provinceId = provinceData.length !== 0 ? provinceData[0].ProvinceID : 0;

      const districtRes = await axios.get(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN_API,
            province_id: provinceId,
          },
        }
      );

      const districtData = districtRes.data.data.filter(item =>
        item.DistrictName === district
      );

      const districtId = districtData.length !== 0 ? districtData[0].DistrictID : 0;

      const wardRes = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        {
          headers: {
            Token: import.meta.env.VITE_GHN_TOKEN_API,
          },
        }
      );

      const wardData = wardRes.data.data.filter(item =>
        item.WardName === ward
      );

      const wardCode = wardData.length !== 0 ? wardData[0].WardCode : 0;

      return { districtId, wardCode };
    } catch (error) {
      throw new Error(
        error || 'Error fetching thirty-part api'
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
          {
            headers: {
              Token: import.meta.env.VITE_GHN_TOKEN_API,
              from_district: 710,
              to_district: districtId,
              shop_id: import.meta.env.VITE_GHN_SHOP_ID,
            },
          }
        );
        console.log(response);

        // return response.data;
      } catch (error) {
        throw new Error(
          error || 'Error fetching thirty-part api'
        );
      }
    }
}

export default new OrderService();
