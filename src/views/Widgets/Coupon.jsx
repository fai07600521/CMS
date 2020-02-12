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
import qs from "query-string";
import Swal from "sweetalert2";
import { api } from "../../config/config";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Edit from "@material-ui/icons/Edit";
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
import moment from 'moment'

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  newMethod() {
    return "couponList";
  }

  createInfo(couponList) {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line react/prop-types
    // const { couponList } = this.props.couponList.toJS();
    return couponList.map((prop, key) => {
      // eslint-disable-next-line react/prop-types
      console.log("props", this.props);
      const { classes } = this.props;
      console.log("classes", classes);
      const fillButtons = [
        { color: "success", icon: Edit }
        // { color: "danger", icon: Close }
      ].map((prop2, key2) => {
        const condition = prop2.color;
        return (
          <Button
            onClick={() => this.handleClick(condition, prop.code, key)}
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
        id: prop.id,
        type: (prop.discountPercent) ? "Percent" : "Amount",
        amount:(prop.name) ? prop.name : "Amount",
        visible: (prop.visible) ? "Yes" : "No",
        code: (prop.code) ? prop.code : "-",
        point:  (prop.point) ? prop.point : "-",
        discount: (prop.discount) ? prop.discount : "-",
        redeem: (prop.redeem) ? prop.redeem : "-",
        createdAt: (prop.createdAt) ? prop.createdAt : "-",
        updatedAt: (prop.updatedAt) ? prop.updatedAt : "-",
        expire:(prop.expire) ? moment(prop.expire).format('DD/MM/YYYY') : "-",
        maxuseperuser:(prop.maxUsePerUser) ? prop.maxUsePerUser : "-",
        maxuse:(prop.maxUse) ? prop.maxUse  : "-",
        //location: <td dangerouslySetInnerHTML={{__html: prop.location}} />,
        //Instructor: <td dangerouslySetInnerHTML={{__html: prop.nameInstructor}} />,
        actions: (
          // we've added some custom button actions
          <div className="actions-right">{fillButtons}</div>
        )
      };
    });
  }

  async componentWillMount() {
    await this.props.couponList.initData();
  
  }

  handleClick(condition, code, index) {
    const { couponList } = this.props.couponList.toJS();
    // eslint-disable-next-line react/prop-types
    console.log("condition", condition, "code", code);
    switch (condition) {
      case "info":
        console.log("get in");
        this.props.history.push(`/profile2?id=${code}`);
        break;
      case "success":
        console.log("get in 2");
        this.props.history.push(`/edit?id=${code}`);
        break;
      case "danger":
        console.log("get in 3");
        console.log(id);
        this.alert();
        try {
          this.alert(id, index);
          //  const response = axios.delete(`${api.url}/delete/course_detail/${id}`);
          // // console.log(' Returned data:', response);
          // // if (response.status === 200) {
          //   console.log('index', index)

          // return response.status
          // }
        } catch (err) {
          console.log(err.message);
        }
    }
  }

  async handleClick2() {
    this.props.history.push(`admin/historyOrder`);
  }

  async alert(id, index) {
    console.log("alert");
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
          const result = axios.delete(`${api.url}/delete/course_detail/${id}`);
          await this.props.couponList.deleteElement(index);
          result === 200 &&
            (await Swal.fire({
              type: "success",
              title: "Your order has been done",
              text: "Thank you for your purchase",
              showConfirmButton: false
              //timer: 1500
            })).then((result) => {
              if (result.value) {
                this.handleClick2()
              }
            })
          return result;
        } catch (error) {
          await Swal.fire({
            type: "error",
            title: `การบันทึกล้มเหลว ${error.message}`
          });
          // Swal.showValidationError(`การบันทึกล้มเหลว ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    };
    return await Swal.fire(confirmDialogOptions);
  }

  handleClick2() {
    // eslint-disable-next-line react/prop-types
    this.props.history.push(`/create`);
    //console.log("The link was clicked.");
  }

  render() {
    const { couponList } = this.props.couponList.toJS();
   
    const info = this.createInfo(couponList);
    console.log("couponList");
    console.log(info);
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <Button
                color="success"
                className={classes.addButton}
                onClick={() => this.handleClick2()}
              >
                CREATE COUPON
              </Button>

              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Coupon List</h4>
            </CardHeader>
            
            <CardBody>
              <ReactTable
                data={info}
                filterable
                columns={[
                  {
                    Header: "Code",
                    accessor: "code"
                  },
                  {
                    Header: "Discount Type",
                    accessor: "type"
                  },
                  {
                    Header: "Amount",
                    accessor: "amount"
                  },
                  {
                    Header: "Point",
                    accessor: "point"
                  },
                  {
                    Header: "Expire",
                    accessor: "expire"
                  },
                  {
                    Header: "MaxUse",
                    accessor: "maxuse"
                  },
                  {
                    Header: "MaxUsePerUser",
                    accessor: "maxuseperuser"
                  },
                  {
                    Header: "Visible",
                    accessor: "visible"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
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

export const page = inject("couponList")(observer(ReactTables));
export default withStyles(styles)(page);
