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
    this.state = {
      checked: [24, 22],
      uploading: false,
      images: null,
      status: false,
      file: null,
      fileForUpload: null,
      id: null
    };
    // this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  handleClick() {
    try {
      console.log("chick");
      const result = this.props.createCouponStore.rdyToPost();
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  }

  passValidate(value2) {
    console.log("!value.name && passValidate");
    console.log(
      !value.name &&
        !value.code &&
        !value.dateEndInvalid &&
        !value.dateEnd &&
        !value.point &&
        !value.discountType &&
        !value.discount &&
        !value.maxUse &&
        !value.expire &&
        !value.maxUsePerUser
    );

    if (
      !value.name &&
      !value.code &&
      !value.dateEndInvalid &&
      !value.dateEnd &&
      !value.point &&
      !value.discountType &&
      !value.discount &&
      !value.maxUse &&
      !value.expire &&
      !value.maxUsePerUser
    ) {
      return true;
    }
    return false;
  }

  validate = async (x, inValid) => {
    // await this.props.createCouponStore.getUrl()
    console.log("validate get in");
    console.log(x);
    if (
      (x.name === "" || x.code === "" || x.discountType === "",
      x.discount === "")
    ) {
      return Swal.fire({
        type: "error",
        title: "createCoupon submission failed!",
        footer: "Please check the form again"
      });
    }
    this.alert();
    return null;
  };

  mySubmitHandler = event => {
    event.preventDefault();
    axios
      .patch(`https://api.joydrive.me/pointRate/`, this.state)
      .then(response => {
        Swal.fire("SAVE!", "Point Setting finished!", "success");
      });
    //alert("You are submitting " + this.state.username);
  };

  /*async componentDidMount() {
    console.log("get in com");
    try {
      const response = await axios.get(`https://api.joydrive.me/pointRate/`);

      if (response.status === 200) {
        this.response = response.data.rate;
      }
      this.setState({ rate: response.data.rate });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }*/

  handleChange(html, key) {
    console.log("handleChange");
    this.props.createCouponStore.handleChange(html, key);
  }

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  async handleClick2() {
    this.props.history.push(`admin/coupon`);
  }

  async alert() {
    console.log("alert");
    let confirmDialogOptions = {
      title: `Confirmation`,
      html: `<div style="text-align:left;padding: 0 10px 0 10px">Do you want to confirm ?</div>`,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      reverseButtons: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "submit",
      cancelButtonText: "cancel",
      customClass: "font-size-200",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          console.log("get ready to post");
          let result = await this.props.createCouponStore.rdyToPost();
          console.log("result alert", result);
          result === 200 &&
            (await Swal.fire({
              type: "success",
              title: "Your order has been done",
              text: "Thank you for your purchase",
              showConfirmButton: false,
              timer: 1500
            }));

          return result;
        } catch (error) {
          await Swal.fire({
            type: "error",
            title: `การบันทึกล้มเหลว ${error.message}`,
            timer: 1500
          });
          // Swal.showValidationError(`การบันทึกล้มเหลว ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    };
    return await Swal.fire(confirmDialogOptions);
  }

  render() {
    // console.log("see this",this.state.data)
    const { classes } = this.props;
    const { isInvalid } = this.props.createCouponStore.toJS();
    const { data } = this.props.createCouponStore.toJS();
    console.log("isInvalid5555");
    console.log(data);
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Create Coupon</h4>
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
                      placeholder="Name"
                      onChange={html =>
                        this.handleChange(html.target.value, "name")
                      }
                      invalid={isInvalid.name}
                    />
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
                      //inputProps={{
                      //invalid: isInvalid.code,
                      //onChange: e => this.handleChange(e.target.value, "code")
                      // }}
                      onChange={html =>
                        this.handleChange(html.target.value, "code")
                      }
                      invalid={isInvalid.code}
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
                      onChange={html =>
                        this.handleChange(html.target.value, "point")
                      }
                      invalid={isInvalid.point}
                    />
                  </FormGroup>

                  <FormGroup widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      DiscountType
                    </Label>
                    <select
                      className={classes.select}
                      onChange={html =>
                        this.handleChange(html.target.value, "discountType")
                      }
                      invalid={isInvalid.discountType}
                    >
                      <option value="">Select DiscountType</option>
                      <option value="amount">Amount</option>
                      <option value="percent">Percent</option>
                    </select>
                  </FormGroup>

                  <FormGroup widths={2}>
                    <Label
                      className={classes.input}
                      for="exampleEmail"
                      sm={2}
                      size="lg"
                    >
                      Discount
                    </Label>
                    <Input
                      className={classes.input}
                      label="discount"
                      placeholder="Discount"
                      onChange={html =>
                        this.handleChange(html.target.value, "discount")
                      }
                      invalid={isInvalid.discount}
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
                      onChange={html =>
                        this.handleChange(html.target.value, "maxUse")
                      }
                      invalid={isInvalid.maxUse}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className={classes.input} for="exampleDate">
                      Expire
                    </Label>
                    <Input
                      type="date"
                      name="date"
                      className={classes.input}
                      id="Expire"
                      placeholder="Expire"
                      onChange={html =>
                        this.handleChange(html.target.value, "expire")
                      }
                      invalid={isInvalid.expire}
                    />
                  </FormGroup>

                  <FormGroup widths={2}>
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
                      label="maxUsePerUser"
                      placeholder="maxUsePerUser"
                      onChange={html =>
                        this.handleChange(html.target.value, "maxUsePerUser")
                      }
                      invalid={isInvalid.discount}
                    />
                  </FormGroup>
                  <Button
                    color="default"
                    className={classes.addButton}
                    onClick={() => this.handleClick2()}
                    style={{  minWidth: "110px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    style={{  minWidth: "110px" }}
                    type="button"
                    onClick={() => this.validate(data, isInvalid)}
                  >
                    Submit
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
  w: {
    width: "60%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box",
    background: "linear-gradient(to bottom, #134e5e, #71b280)",
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
  font: {}
};

export const page = inject("createCouponStore")(observer(ReactTables));
export default withStyles(styles)(page);
