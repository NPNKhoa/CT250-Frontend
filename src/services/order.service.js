import axios from 'axios';
import createApiClient from './api.service';

const GHN_API_BASE_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';
const GHN_TOKEN_API = import.meta.env.VITE_GHN_TOKEN_API;
const accessToken = localStorage.getItem('accessToken');

class OrderService {
  constructor(path = '/order') {
    this.api = createApiClient(path);
    this.headers = {
      Token: GHN_TOKEN_API,
    };
  }

  async createOrder(order) {
    try {
      const response = await this.api.post('/', order, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error creating order');
    }
  }

  async getOrderByUser() {
    try {
      const response = await this.api.get('/get-order-by-user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error fetching order list');
    }
  }

  async getDestinationCode({ province, district, ward }) {
    try {
      const provinceRes = await axios.get(
        `${GHN_API_BASE_URL}/master-data/province`,
        {
          headers: this.headers,
        }
      );

      const provinceId =
        provinceRes.data.data.find(item => item.ProvinceName === province)
          ?.ProvinceID ?? 0;

      const districtRes = await axios.get(
        `${GHN_API_BASE_URL}/master-data/district`,
        {
          headers: {
            ...this.headers,
            province_id: provinceId,
          },
        }
      );

      const districtId =
        districtRes.data.data.find(item => item.DistrictName === district)
          ?.DistrictID ?? 0;

      const wardRes = await axios.get(
        `${GHN_API_BASE_URL}/master-data/ward?district_id=${districtId}`,
        {
          headers: this.headers,
        }
      );

      const wardCode =
        wardRes.data.data.find(item => item.WardName === ward)?.WardCode ?? 0;

      return { districtId, wardCode };
    } catch (error) {
      throw new Error(error.message || 'Error fetching third-party API');
    }
  }

  async getDeliveryFee({ province, district, ward }) {
    try {
      const { districtId, wardCode } = await this.getDestinationCode({
        province,
        district,
        ward,
      });

      const response = await axios.post(
        `${GHN_API_BASE_URL}/v2/shipping-order/fee`,
        {
          from_district_id: 1572, // Quận Ninh Kiều
          from_ward_code: '550113', // Phường Xuân Khánh
          service_id: 53320, // Hàng nhẹ
          service_type_id: 2, // Giao hàng thương mại
          to_district_id: +districtId,
          to_ward_code: wardCode.toString(),
          weight: 85, // Trọng lượng (gram)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...this.headers,
          },
        }
      );

      return response.data.data.total;
    } catch (error) {
      throw new Error(error.message || 'Error fetching third-party API');
    }
  }
}

export default new OrderService();
