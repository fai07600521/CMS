/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";

export class CouponStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: {
        id: "",
        description: "",
        courseObjective: "",
        courseOutcome: "",
        courseOutline: "",
        aboutInstructor: "",
        price: "",
        location: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        fileImg:"",
        img:""
      },
      isInvalid: {
        idInvalid: false,
        courseTitleInvalid: false,
        descriptionInvalid: false,
        courseObjectiveInvalid: false,
        courseOutcomeInvalid: false,
        courseOutlineInvalid: false,
        aboutInstructorInvalid: false,
        priceInvalid: false,
        locationInvalid: false,
        dateStartInvalid: false,
        dateEndInvalid: false,
        timeStart: false,
        timeEnd: false
      }
    });
  }

  async getUrl(){
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
      this.handleChange(Img,"img")
  }).catch(error => {
      // handle your error
      console.log(error)
  });
  }
  
  async rdyToPost(url) {
    console.log("data",this.data)
    const priceNum = +this.data.price
    this.handleChange(priceNum,"price")
    try {
      const response = await axios.post(`${url}/add/course_detail`,this.data ,{
        headers: {
          Authorization: `Bearer ${cookies.get('loginToken')}`
        }
      })
      console.log("response555",response)
      if (response.status === 200) {
        return response.data;
      } 
    } catch (err) {
      console.log(err.message);
      return err.message
    }
  }

  setInvalid(key, value) {
    this.isInvalid[key] = value;
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }
  
  async handleChange(html, key) {
    this.data[key] = html;
  }

  submit() {
    !this.data.firstname || this.hasNumber(this.data.firstname) ? this.setInvalid('firstnameInvalid', true) : this.setInvalid('firstnameInvalid', false);
    !this.data.lastname || this.hasNumber(this.data.lastname) ? this.setInvalid('lastnameInvalid', true) : this.setInvalid('lastnameInvalid', false);
    !this.data.email || !this.data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? this.setInvalid('emailInvalid', true) : this.setInvalid('emailInvalid', false);
    !this.data.tel || this.data.tel.length !== 10 ? this.setInvalid('telInvalid', true) : this.setInvalid('telInvalid', false);
    !this.data.address ? this.setInvalid('addressInvalid', true) : this.setInvalid('addressInvalid', false);
    !this.data.nameInTax || this.hasNumber(this.data.nameInTax) ? this.setInvalid('nameInTaxInvalid', true) : this.setInvalid('nameInTaxInvalid', false);

  }
}

export default new CouponStore();
