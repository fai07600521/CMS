/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export class feedbackStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      feedback: []
    });
  }

  async initData() {
    try {
      const response = await axios.get(
        `https://api.joydrive.me/review/`,{
          headers: {
            Authorization: `Bearer ${cookies.get("loginToken")}`
          }
        }
      );console.log("get in init", response);
      if (response.status === 200) {
        this.feedback = response.data.reviews;
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

export default new feedbackStore();
