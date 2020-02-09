/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export class OrderListStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      couponHistory: []
    });
  }

  async initData() {
    try {
      const response = await axios.get(
        `https://api.joydrive.me/booking/use/code/`,{
          headers: {
            Authorization: `Bearer ${cookies.get("loginToken")}`
          }
        }
      );console.log("get in init", response.data.bookings);
      if (response.status === 200) {
        this.couponHistory = response.data.bookings;
      }
    } catch (error) {
      console.error(error);
    }
  }



  deleteElement(index) {
    // eslint-disable-next-line prettier/prettier
    console.log("delete", index);
    // delete this.courseList[index];
    this.couponHistory.splice(index, 1);
  }
}

export default new OrderListStore();
