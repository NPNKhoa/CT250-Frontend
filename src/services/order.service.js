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

    async getDeliveryFee({ province, district, ward }) {
      try {
        const { districtId, wardCode } = await this.getDestinationCode({
          province,
          district,
          ward,
        });

        const response = await axios.post(
          'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
          {
            from_district_id: 1572,  // Quận Ninh Kiều
            from_ward_code: '550113', // Phường Xuân Khánh
            service_id: 53321, // Hàng nhẹ
            service_type_id: 2, // Giao hàng thương mại
            to_district_id: districtId,
            to_ward_code: wardCode,
            height: 10, // Chiều cao (cm)
            length: 70, // Chiều dài (cm)
            width: 15, // Chiều rộng (cm)
            weight: 85, // Trọng lượng (gram)
            insurance_value: 0, // Dùng để khai báo giá trị lô hàng. GHN sẽ căn cứ vào giá trị này để bồi thường nếu có sự cố ngoài ý muốn (thất lạc, bể vỡ…).
            cod_failed_amount: 2000, // Số tiền thu hộ nếu giao hàng thất bại (VND)
            coupon: null, // Mã giảm giá
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Token: import.meta.env.VITE_GHN_TOKEN_API,
            },
          }
        );
        return response.data.data.total;
      } catch (error) {
        throw new Error(
          error || 'Error fetching thirty-part api'
        );
      }
    }
}

export default new OrderService();
