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

  async componentDidMount() {
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
  }

  render() {
    // console.log("see this",this.state.data)
    const { classes } = this.props;
    const { value } = this.state;
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
                      placeholder="Name"
                      value 
                      onChange={this.appHandleSubmit}
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
                    <Input
                      className={classes.select}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option value="True" onChange={this.myChangeHandler}>
                        True
                      </option>
                      <option value="False" onChange={this.myChangeHandler}>
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
                    <Input
                      className={classes.select}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option value="Amount" onChange={this.myChangeHandler}>
                        Amount
                      </option>
                      <option value="Percent" onChange={this.myChangeHandler}>
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
                      Discount
                    </Label>
                    <Input
                      className={classes.input}
                      label="discount"
                      placeholder="Discount"
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
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label className={classes.input} for="exampleDate">
                      maxUsePerUser
                    </Label>
                    <Input
                      type="date"
                      name="date"
                      className={classes.input}
                      id="maxUsePerUser"
                      placeholder="maxUsePerUser"
                    />
                  </FormGroup>

                  <Button color="success" type="submit">
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
  font: {}
};

export const page = inject("orderList")(observer(ReactTables));
export default withStyles(styles)(page);
