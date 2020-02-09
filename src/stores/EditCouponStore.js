/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { toJS } from 'mobx';
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export class editCouponStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      
      data: {
        id:"",
        name: "",
        visible:"",
        code: "",
        point: "",
        discountType: "",
        discount: "",
        maxUse: "",
        expire: "",
        maxUsePerUser: ""
      }
    });
  }

  async initData(id) {
    console.log("initData id");
    console.log(id);
    try {
      const response = await axios.get(`https://api.joydrive.me/coupon/${id}` , 
       {
        headers: {
          Authorization: `Bearer ${cookies.get('loginToken')}`
        }
      })
      console.log("inittt",response)
      if (response.status === 200) {
        this.data.id = response.data.coupon.id || ``;
        this.data.name = response.data.coupon.name || ``;
        this.data.code = response.data.coupon.code || ``;
        this.data.point = response.data.coupon.point || ``;
        this.data.discountType = response.data.coupon.discountType || ``;
        this.data.discount = response.data.coupon.discount || ``;
        this.data.maxUse = response.data.coupon.maxUse || ``;
        this.data.expire = response.data.coupon.expire || ``;
        this.data.maxUsePerUser = response.data.coupon.maxUsePerUser || ``;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async rdyToPut(id) {
    try {
      console.log(id)
      console.log("rdyToPut",toJS(this.data));
      const response = await axios.patch(`https://api.joydrive.me/coupon/${id}`,toJS(this.data),
      {
        headers: {
          Authorization: `Bearer ${cookies.get('loginToken')}`
        }
      })
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
    this['data'][key] = html;

    // this.data == this['data']
    // key = 'aaa'
    // this.data['aaa'] == this.data[key]
    // this.data['aaa'] == this['data'][key]
    
  }
}

export default new editCouponStore();
