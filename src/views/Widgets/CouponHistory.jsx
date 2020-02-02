/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-class-members */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
/* eslint-disable react/no-deprecated */
import React from "react";
import axios from "axios";
import qs from "query-string"
import Swal from 'sweetalert2';
import { api } from '../../config/config';
//import Widgegts from "./views/Widgets/Widgets";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
//import Dvr from "@material-ui/icons/Dvr";
//import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { observer, inject } from "mobx-react";
import Add from "@material-ui/icons/Add";
import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  newMethod() {
    return "orderList";
  }

  createInfo2(orderList) {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line react/prop-types
    // const { orderList } = this.props.orderList.toJS();
    console.log("get in form",orderList);
    return orderList.map((prop, key) => {
      // eslint-disable-next-line react/prop-types
      const { classes } = this.props;
      const fillButtons = [
        { color: "info", icon: Person },
        { color: "success", icon: Edit },
        { color: "danger", icon: Close }
      ].map((prop2, key2) => {
        const condition = prop2.color;
        return (
          <Button
            onClick={() => this.handleClick(condition, prop.id ,key)}
            color={prop2.color}
            className={classes.actionButton}
            size="sm"
            key={key2}
          >
            <prop2.icon className={classes.icon} />
          </Button>
        );
      });
      return {
        //Name: `${prop.firstname} ${prop.lastname}` ,
        bookingID: (prop.bookingId) ? "Percent" : "Amount",
        bookingDate:(prop.bookingDate) ? prop.name : "Amount",
        code: (prop.code) ? "Yes" : "No",
        pointAmount: (prop.discount) ? prop.code : "-",
        discount:  (prop.priceAfterDiscount) ? prop.point : "-",
        email: (prop.user) ? prop.discount : "-",
        fullname: (prop.passengerName) ? prop.redeem : "-",
        actions: (
          // we've added some custom button actions
          <div className="actions-right">{fillButtons}</div>
        )
      };
    });
  }


  async componentWillMount() {
    await this.props.orderList.initData();
    // const info = await this.createInfo2();
    // this.setState({
    //   data: info
    // });
     const query = qs.parse(this.props.location.search);
    // if (!query.id) {
    //   this.props.history.push('/error');
    // }delete
    const res = await axios.get(`${api.url}/order/${query.id}`);
    console.log("res",res);
    const order = res.data;
    this.setState({ oreder: order });
    // console.log(this.state.course[0].price);
  }

  handleClick(condition, id, index) {
    // eslint-disable-next-line react/prop-types
    console.log("condition", condition);
    console.log("id",id);
    switch (condition) {
      case "info":
        console.log("get in");
        this.props.history.push(`/historyView?id=${id}`);
        break;
      case "success":
        console.log("get in 2");
        this.props.history.push(`/historyEdit?id=${id}`);
        break;
      case "danger":
        try {
          // const response = axios.delete(`${api.url}/delete/order/${id}`);
          this.alert(id, index)
          
          // if (response.status === 200) {
          //   return response.status
          // }
        } catch (err) {
          console.log(err.message);
        }
    }
  }
  handleClick2() {
    // eslint-disable-next-line react/prop-types
    this.props.history.push(`/Coupon`);
    //console.log("The link was clicked.");
  }

  async alert(id, index) {
    console.log("alert")
    let confirmDialogOptions = {
      title: `Confirmation`,
      html: `<div style="text-align:left;padding: 0 10px 0 10px">Do you want to confirm ?</div>`,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      reverseButtons: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      customClass: "font-size-200",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const result = axios.delete(`${api.url}/delete/order/${id}`);
          await this.props.orderList.deleteElement(index);
          result === 200 &&
            (await Swal.fire({
              type: "success",
              title: "Your order has been done",
              text: "Thank you for your purchase",
              showConfirmButton: false
              //timer: 1500
            }));
          return result;
        } catch (error) {
          await Swal.fire({
            type: "error",
            title: `การบันทึกล้มเหลว ${error.message}`,
          });
          // Swal.showValidationError(`การบันทึกล้มเหลว ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    };
    return await Swal.fire(confirmDialogOptions);
  }

  render() {
    const { orderList } = this.props.orderList.toJS();
    console.log(orderList)
    const info = this.createInfo2(orderList || []);
    // console.log("see this",this.state.data)
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
             

              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Coupon History</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={info}
                filterable
                columns={[
                  {
                    Header: "Booking ID",
                    accessor: "bookingID"
                  },
                  {
                    Header: "Booking Date",
                    accessor: "bookingDate"
                  },
                  {
                    Header: "Code",
                    accessor: "code"
                  },
                  {
                    Header: "Point Amount",
                    accessor: "pointAmount"
                  },
                  {
                    Header: "Discount Amount",
                    accessor: "discount",

                  },
                  {
                    Header: "Email",
                    accessor: "email",
                  },
                  {
                    Header: "Full Name",
                    accessor: "fullname",
                  }
                ]}
                defaultPageSize={10}
                // showPaginationTop
                showPaginationBottom={true}
                className="-striped -highlight"
              />
            </CardBody>
           
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ReactTables.propTypes = {
  classes: PropTypes.object
};
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  addButton: {
    float: "right"
  }
};

export const page = inject("orderList")(observer(ReactTables));
export default withStyles(styles)(page);
