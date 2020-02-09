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

class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      rate: "",
      edit:"False"
    };
  }

  mySubmitHandler = event => {
    event.preventDefault();
    if(this.state.edit === "True"){
      axios
      .patch(`https://api.joydrive.me/pointRate/`, this.state)
      .then(response => {
        Swal.fire("SAVE!", "Point Setting finished!", "success");
      });
    }else{
      Swal.fire("Oops...", "No points for editing!", "error");
    }
    
    //alert("You are submitting " + this.state.username);
  };

  myChangeHandler = event => {
    this.setState({ 
      rate: event.target.value,
      edit:"True",
     });
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
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Point Setting</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.body}>
                <form>
                  <h5>Point</h5>
                  <p>
                    <input
                      className={classes.input}
                      type="text"
                      placeholder={this.state.rate}
                      onChange={this.myChangeHandler}
                    />
                    &nbsp; Bath / Point &#160;{" "}
                    <Button
                      color="success"
                      className={classes.addButton}
                      onClick={this.mySubmitHandler}
                    >
                      save
                    </Button>
                  </p>
                </form>
                
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
    width: "20%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxsizing: "border-box"
  }
};

export const page = inject("couponHistory")(observer(ReactTables));
export default withStyles(styles)(page);
