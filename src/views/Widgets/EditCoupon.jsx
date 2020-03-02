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
import qs from "query-string";
import React from "react";
import axios from "axios";
import Datetime from "react-datetime";
import Calendar from 'react-input-calendar'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import Swal from "sweetalert2";
//import Widgegts from "./views/Widgets/Widgets";
import PropTypes from "prop-types";
// react component for creating dynamic tables;
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { observer, inject } from "mobx-react";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import { responsiveFontSizes } from "@material-ui/core/styles";


class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Percent" };
  }

  mySubmitHandler = event => {
    event.preventDefault();
    axios
      .patch(`https://api.joydrive.me/pointRate/`, this.state)
      .then(response => {
        Swal.fire("SAVE!", "Point Setting finished!", "success");
      });
    //alert("You are submitting " + this.state.username);
  };

  myChangeHandler = event => {
    this.setState({ rate: event.target.value });
  };

  handleClick(index) {
    console.log("get in handleclick index")
    console.log(index)
    try {
      this.alert(index);
    } catch (err) {
      console.log(err.message);
    }
  }

  async handleClick2() {
    this.props.history.push(`admin/coupon`);
  }

  async alert(index) {
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
          let result = await this.props.editCouponStore.rdyToPut(index);
          result === 200 &&
            (await Swal.fire({
              type: "success",
              title: "Your edit has been done",
              text: "Thank you for your edition",
              showConfirmButton: false
              //timer: 1500
            }));
            this.props.history.push(`admin/coupon`);
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


  async componentWillMount() {
    // eslint-disable-next-line react/prop-typespush("/error")
    const query = qs.parse(this.props.location.search);
    const l = await this.props.editCouponStore.initData(query.id);
    console.log("data will mount");
    console.log(query.id);
  }

  handleChange(html, key) {
    console.log("html", html);
    console.log("key", key);
    this.props.editCouponStore.handleChange(html, key);
  }

  async handlechangeCustomSelect(value, key) {
    console.log('value', value)
    await this.props.editCouponStore.handleChange(value, key);

  }
  render() {
    // console.log("see this",this.state.data)
    const { classes } = this.props;
    const { value } = this.state;
    const query = qs.parse(this.props.location.search);
    const data = this.props.editCouponStore.toJS();
    console.log("dataaaaa");
    console.log(data);
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Edit Coupon</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.body}>
                <Form className={classes.w}>
                  <FormGroup widths="equal">
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Name
                    </Label>
                    <Input
                      className={classes.input}
                      fluid
                      label="name"
                      value={data.data.name}
                      onChange={html =>
                        this.handleChange(html.target.value, "name")
                      }

                    /* inputProps={{
                      value: "data.name",
                      onChange: e =>
                        this.handleChange(e.target.value, "name")
                    }}*/
                    />
                  </FormGroup>

                  <FormGroup widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Visible
                    </Label>
                    <Input
                      className={classes.select}
                      type="select"
                      name="visible"
                      id="visible"
                      onChange={html =>
                        this.handleChange(html.target.value, "visible")
                      }
                    >
                      <option value="true" onChange={this.myChangeHandler}>
                        True
                      </option>
                      <option value="false" onChange={this.myChangeHandler}>
                        False
                      </option>
                    </Input>
                  </FormGroup>

                  <FormGroup unstackable widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Code
                    </Label>
                    <Input
                      className={classes.input}
                      label="code"
                      placeholder="Code"
                      value={data.data.code}
                      onChange={html =>
                        this.handleChange(html.target.value, "code")
                      }
                    />
                  </FormGroup>

                  <FormGroup widths="equal">
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Point
                    </Label>
                    <Input
                      className={classes.input}
                      abel="point"
                      placeholder="Point"
                      value={data.data.point}
                      onChange={html =>
                        this.handleChange(html.target.value, "point")
                      }
                    />
                  </FormGroup>

                  <FormGroup widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Discount Type
                    </Label>
                    <Input

                      className={classes.select}
                      type="select"
                      name="select"
                      id="exampleSelect"
                      placeholder="Select an option"
                      onChange={html =>
                        this.handleChange(html.target.value, "discountType")
                      }
                    >
                      <option value="amount" onChange={this.myChangeHandler}>
                        Amount
                      </option>
                      <option value="percent" onChange={this.myChangeHandler}>
                        Percent
                      </option>
                    </Input>
                  </FormGroup>

                  <FormGroup widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Amount
                    </Label>
                    <Input
                      className={classes.input}
                      label="discount"
                      placeholder="Discount"
                      value={(data.data.discount) ? data.data.discount : data.data.discountPercent}
                      onChange={html =>
                        this.handleChange(html.target.value, "discount")
                      }
                    />

                  </FormGroup>

                  <FormGroup unstackable widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      maxUse
                    </Label>
                    <Input
                      className={classes.input}
                      label="maxUse"
                      placeholder="maxUse"
                      value={data.data.maxUse}
                      onChange={html =>
                        this.handleChange(html.target.value, "maxUse")
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className={classes.input} for="exampleDate">
                      Expire
                    </Label>
                    <Datetime className={classes.input2}
                      timeFormat={false}
                      inputProps={{
                             placeholder:moment(data.data.expire).format('MM/DD/YYYY')
                          }}
                    
                      onChange={html =>
                        this.handleChange(html, "expire")
                      }

                    />
                  </FormGroup>

                  <FormGroup unstackable widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      maxUsePerUser
                    </Label>
                    <Input
                      className={classes.input}
                      label="maxUse"
                      placeholder="maxUsePerUser"
                      value={data.data.maxUsePerUser}
                      onChange={html =>
                        this.handleChange(html.target.value, "maxUsePerUser")
                      }
                    />
                  </FormGroup>

                  <Button
                    color="default"
                    className={classes.addButton}
                    onClick={() => this.handleClick2()}
                    style={{ minWidth: "110px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    className={classes.addButton}
                    onClick={() => this.handleClick(data.data.id)}
                    style={{ minWidth: "110px" }}
                  >
                    Edit
                  </Button>
                </Form>
              </div>
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
    float: "relatives"
  },
  body: {
    height: "100%",
    textAlign: "center",
    maxwidth: "100%",
    overflowX: "hidden"
  },
  input: {
    width: "55%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box"
  },
  input2: {
    width: "55%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box",
    backgroundColor: "white"
  },
  w: {
    width: "60%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box",
    background: "linear-gradient(45deg, #49a09d, #5f2c82)",
    // eslint-disable-next-line no-dupe-keys
    borderRadius: "15px"
  },

  text: {
    padding: "20px",
    color: "white"
  },
  select: {
    height: "38px",
    fontWeight: 100,
    width: "55%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box"
  },
  type: {
    padding: "50px",
    color: "black"
  },
  placeholder1: {
    color: "white",
  },
};

export const page = inject("editCouponStore")(observer(ReactTables));
export default withStyles(styles)(page);
