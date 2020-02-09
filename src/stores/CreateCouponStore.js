/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";
import { toJS } from 'mobx';
import Cookies from "universal-cookie";
const cookies = new Cookies();
export class createCouponStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: {
        name: "",
        code: "",
        point: "",
        discountType: "",
        discount: "",
        maxUse: "",
        expire: "",
        maxUsePerUser: ""

      },
      isInvalid: {
        idInvalid: false,
        nameInvalid: false,
        codeInvalid: false,
       // pointInvalid: false,
        discountTypeInvalid: false,
        discountInvalid: false,
       // expireInvalid: false,
       // maxUsePerUserInvalid: false,
      }
    });
  }

  async getUrl() {
    const formData = new FormData()
    formData.append('file', this.data.fileImg);
    await axios.post(`${api.url}/test-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      // eslint-disable-next-line no-unused-vars
    }).then(response => {
      // handle your response;
      const Img = response.data.Location
      console.log(response)
      this.handleChange(Img, "img")
    }).catch(error => {
      // handle your error
      console.log(error)
    });
  }

  async rdyToPost() {
    console.log("rdyToPost", toJS(this.data))
    try {
      console.log("resonpon rdyTopost")
      const response = await axios.post(`https://api.joydrive.me/coupon/`, toJS(this.data), {
        headers: {
          Authorization: `Bearer ${cookies.get('loginToken')}`
        }
      })
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
      return err.message
    }
  }

  setInvalid(key, value) {
    this.isInvalid[key] = true;
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  async handleChange(html, key) {
    this.data[key] = html;
  }

  submit() {
    !this.data.name || this.hasNumber(this.data.name) ? this.setInvalid('name', true) : this.setInvalid('name', false);
    !this.data.code || this.hasNumber(this.data.code) ? this.setInvalid('code', true) : this.setInvalid('code', false);
    // !this.data.email || !this.data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? this.setInvalid('emailInvalid', true) : this.setInvalid('emailInvalid', false);
    !this.data.point || this.data.point.match(/\d/) ? this.setInvalid('point', true) : this.setInvalid('point', false);
    !this.data.discountType ? this.setInvalid('discountType', true) : this.setInvalid('discountType', false);
    !this.data.discount ? this.data.discount.match(/\d/) ? this.setInvalid('discount', true) : this.setInvalid('discount', false) :
      !this.data.maxUse ? this.data.maxUse.match(/\d/) ? this.setInvalid('maxUse', true) : this.setInvalid('maxUse', false) :
        !this.data.expire ? this.data.expire.match(/\d/) ? this.setInvalid('expire', true) : this.setInvalid('expire', false) :
          !this.data.maxUsePerUser || this.data.maxUsePerUser.match(/\d/) ? this.setInvalid('nameInTaxInvalid', true) : this.setInvalid('nameInTaxInvalid', false);

  }
}

export default new createCouponStore();
