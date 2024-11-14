import axios from 'axios';
import createApiClient from './api.service';

const GHN_API_BASE_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';
const GHN_TOKEN_API = import.meta.env.VITE_GHN_TOKEN_API;
const GHN_SHOP_ID = parseInt(import.meta.env.VITE_GHN_SHOP_ID);

const GHTK_TOKEN_API = import.meta.env.VITE_GHTK_TOKEN_API;

class OrderService {
  constructor(path = '/order') {
    this.api = createApiClient(path);
    this.headers = {
      Token: GHN_TOKEN_API,
    };
  }

  async createOrder(order) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await this.api.post('/', order, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.data.error || 'Error creating order');
    }
  }

  async getOrderByUser(page, limit, orderStatus, isLatest) {
    const params = new URLSearchParams();

    // Thêm tham số phân trang vào URLSearchParams
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (orderStatus) params.append('orderStatus', orderStatus);
    if (isLatest) params.append('isLatest', isLatest);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await this.api.get('/get-order-by-user', {
        params: params,
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

  async getDeliveryFee({ province, district, ward }, method) {
    if (method === 'Giao hàng nhanh') {
      try {
        const { districtId, wardCode } = await this.getDestinationCode({
          province,
          district,
          ward,
        });

        const serviceRes = await axios.post(
          `${GHN_API_BASE_URL}/v2/shipping-order/available-services`,
          {
            shop_id: GHN_SHOP_ID,
            from_district: 1572,
            to_district: districtId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ...this.headers,
            },
          }
        );

        const serviceId = serviceRes.data.data[0].service_id;

        const response = await axios.post(
          `${GHN_API_BASE_URL}/v2/shipping-order/fee`,
          {
            service_id: serviceId,
            to_district_id: districtId,
            to_ward_code: wardCode.toString(),
            weight: 200, // Trọng lượng (gram)
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
        console.error(
          'Error fetching delivery fee:',
          error.response?.data || error.message
        );
        throw new Error(error.message || 'Error fetching third-party API');
      }
    } else if (method === 'Giao hàng tiết kiệm') {
      try {
        const response = await axios.post(
          '/ghtk/services/shipment/fee',
          {
            pick_province: 'Cần Thơ',
            pick_district: 'Quận Ninh Kiều',
            province: province,
            district: district,
            weight: 200,
            deliver_option: 'none',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Token: GHTK_TOKEN_API,
            },
          }
        );
        return response.data.fee.fee;
      } catch (error) {
        console.error(
          'Error fetching delivery fee:',
          error.response?.data || error.message
        );
        throw new Error(error.message || 'Error fetching third-party API');
      }
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await this.api.get(`/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error fetching order');
    }
  }
}

export default new OrderService();
