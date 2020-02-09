/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export class couponListStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      couponList: []
    });
  }

  async initData() {
    try {
      const response = await axios.get(
        `https://api.joydrive.me/coupon/find/all/`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("loginToken")}`
          }
        }
      );
      if (response.status === 200) {
        this.couponList = response.data.coupons;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new couponListStore();
