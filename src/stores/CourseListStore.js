/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";
import querystring from "querystring";
export class CourseListStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      courseList: []
    });
  }

  async initData() {
    try {
      const response = await axios.get(
        `https://api.joydrive.me/coupon/find/all/`
      );
      console.log("response");
      console.log(response);
      if (response.status === 200) {
        this.courseList = response.data.coupons;
      }
      //console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  deleteElement(index) {
    // eslint-disable-next-line prettier/prettier
    console.log('delete', this.courseList[index])
    // delete this.courseList[index];
    this.courseList.splice(index, 1);
  }
}

export default new CourseListStore();
