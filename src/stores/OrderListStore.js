/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";

export class OrderListStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      orderList: []
    });
  }

  async initData() {
    try {
      const response = await axios.get(
        ` https://api.joydrive.me/booking/use/code/`
      );
      console.log("get in init", response);
      if (response.status === 200) {
        this.orderList = response.data.coupons;
      }
      //console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }



  deleteElement(index) {
    // eslint-disable-next-line prettier/prettier
    console.log("delete", index);
    // delete this.courseList[index];
    this.orderList.splice(index, 1);
  }
}

export default new OrderListStore();
