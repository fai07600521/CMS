/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";

export class CourseEditStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      id: "",
      data: {
        id: "",
        title: "",
        category_id: "",
        body: "",
      }
    });
  }

  async initData(id) {
    try {
      const response = await axios.get(`${api.url}/coupon/${id}`);
      console.log("init",response.data[0])
      if (response.status === 200) {
        this.id = response.data[0].id||``;
        this.data.id = response.data[0].id || ``;
        this.data.title = response.data[0].title || ``;
        this.data.category_id = response.data[0].category_id || ``;
        this.data.body = response.data[0].body || ``;
      }
      console.log('this',this);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async rdyToPut(url) {
    const id = this.id
    try {
      const response = await axios.put(`${url}/edit/course_detail/${id}`,this.data);
      console.log("rdyToPut",response);
      if (response.status === 200) {
        return response.status;
      } 
    } catch (err) {
      console.log(err.message);
    }
  }

  async rdyToDelete(url) {
    try {
      const response = await axios.Delete(`${url}/edit/course_detail`,this.data);
      if (response.status === 200) {
        return response.status;
      } 
    } catch (err) {
      console.log(err.message);
    }
  }
 


  async handleChange(html, key) {
    console.log("timeStart",html)
    this['data'][key] = html;

    // this.data == this['data']
    // key = 'aaa'
    // this.data['aaa'] == this.data[key]
    // this.data['aaa'] == this['data'][key]
    
  }
}

export default new CourseEditStore();
