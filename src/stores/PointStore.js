/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import BaseStore from "./BaseStore";
import axios from "axios";
import { api } from "./../config/config";

export class HistoryEditStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: {
        point :""
      },
      
    });
  }

  async initData() {
    try {
      const response = await axios.get(`${api.url}/order/${id}`);
      console.log("response33",response)
      const response2 = await axios.get(`${api.url}/course/${response.data[0].courseId}`);
      if (response.status === 200) {
        this.data.orderTime = response.data[0].orderTime || ``;
        this.data.firstname = response.data[0].firstname || ``;
        this.data.lastname = response.data[0].lastname || ``;
        this.data.email = response.data[0].email || ``;
        this.data.tel = response.data[0].tel || ``;
        this.data.status = response.data[0].status || ``;
        this.data.type = response.data[0].type || ``;
        this.data.taxInvoice = response.data[0].taxInvoice || ``;
        this.data.images = response.data[0].images || ``;
        this.data.nameInTax = response.data[0].nameInTax || ``;
        this.data.address = response.data[0].address || ``;
        this.data.province = response.data[0].province || ``;
        this.data.district = response.data[0].district || ``;
        this.data.subDistrict = response.data[0].subDistrict || ``;
        this.data.text = response.data[0].text || ``;
        this.data.pcode = response.data[0].pcode || ``;
        this.data.courseId = response.data[0].courseId || ``;
        this.data.qty = response.data[0].qty || ``;
        this.data.totalPrice = response.data[0].totalPrice || ``;
        this.data.userId = response.data[0].userId || ``;
        this.data.orderId = response.data[0].orderId || ``;
        this.data.status = response.data[0].status || ``;
        this.data.orderDate = response.data[0].orderDate || ``;
        this.data.orderTime = response.data[0].orderTime || ``;
        this.data.id = response.data[0].id || ``;
        this.data.images = response.data[0].images || ``;
        this.data2.id = response2.data[0].id;
        this.data2.courseTitle = response2.data[0].courseTitle || ``;
        this.data2.description = response2.data[0].description || ``;
        this.data2.courseObjective = response2.data[0].courseObjective || ``;
        this.data2.courseOutcome = response2.data[0].courseOutcome || ``;
        this.data2.courseOutline = response2.data[0].courseOutline || ``;
        this.data2.nameInstructor = response2.data[0].nameInstructor || ``;
        this.data2.aboutInstructor = response2.data[0].aboutInstructor || ``;
        this.data2.price = response2.data[0].price || ``;
        this.data2.location = response2.data[0].location || ``;
        this.data2.dateStart = response2.data[0].dateStart || ``;
        this.data2.id = response2.data[0].id || ``;
        this.data2.dateEnd = response2.data[0].dateEnd || ``;
        this.data2.timeStart = response2.data[0].timeStart || ``;
        this.data2.timeEnd = response2.data[0].timeEnd || ``;
      }
      //console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async rdyToPut(url) {
    try {
      const response = await axios.put(`${url}/edit/order/${this.data.orderId}`, this.data);
      if (response.status === 200) {
        return response.status;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async handleChange(html, key) {
    console.log("statussss", this["data"][key]);
    this["data"][key] = html;

    // this.data == this['data']
    // key = 'aaa'
    // this.data['aaa'] == this.data[key]
    // this.data['aaa'] == this['data'][key]
  }
}

export default new HistoryEditStore();
