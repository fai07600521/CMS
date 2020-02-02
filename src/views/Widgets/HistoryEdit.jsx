/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import qs from "query-string";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types"; // @material-ui/core components
import ReactQuill from "react-quill"; // ES6
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// @material-ui/icons
import { observer, inject } from "mobx-react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { api } from "../../config/config";
import "react-quill/dist/quill.snow.css";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import CustomSelect from './CustomSelect';
class RegularForms extends React.Component {
  //const data = this.props.historyEditStore.toJS();
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b",
      editorHtml: "",
      editorHtml2: "",
      editorHtml3: "",
      editorHtml4: "",
      editorHtml5: "",
      editorHtml6: "",
      editorHtml7: "",
      editorHtml8: "",
      editorHtml9: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillMount() {
    // eslint-disable-next-line react/prop-typespush("/error")
    const query = qs.parse(this.props.location.search);
    await this.props.historyEditStore.initData(query.id);
    // console.log(this.state.course[0].price);
  }

  handleClick(index) {
    try {
      this.alert(index);
    } catch (err) {
      console.log(err.message);
    }
  }
  async handleClick2() {
    this.props.history.push(`admin/CouponHistory`);
  }
   
   async handlechangeCustomSelect(value , key){
     console.log('value',value)
     await this.props.historyEditStore.handleChange(value, key);
     
   }

  handleChange(html, key) {
    console.log("html", html);
    this.props.historyEditStore.handleChange(html, key);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    // eslint-disable-next-line no-console
    console.error(err);
  };

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
    console.log("this.state", this.state);
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
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
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      customClass: "font-size-200",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let result = await this.props.historyEditStore.rdyToPut(api.url);
          result === 200 &&
            (await Swal.fire({
              type: "success",
              title: "Your edit has been done",
              text: "Thank you for your edition",
              showConfirmButton: false
              //timer: 1500
            }));
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

  // SplitButton() {
  //   const [open, setOpen] = React.useState(false);
  //   const [selectedIndex, setSelectedIndex] = React.useState(1);
  //   function handleClick() {
  //     alert(`You clicked ${options[selectedIndex]}`);
  //   }

  // handleMenuItemClick(event, index) {
  //     setSelectedIndex(index);
  //     setOpen(false);
  //   }

  // handleToggle() {
  //     setOpen(prevOpen => !prevOpen);
  //   }

  // handleClose(event) {
  //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //       return;
  //     }

  //     setOpen(false);
  //   }
  // }
  
  render() {
    const  { data }= this.props.historyEditStore.toJS();
    const  { data2 }= this.props.historyEditStore.toJS();
    console.log("data2", data.orderTime);
    const query = qs.parse(this.props.location.search);
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Form Elements</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Reservation Details :
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        autoComplete: "off"
                      }}
                      inputProps={{
                        value: data.courseTitle,
                        onChange: e =>
                          this.handleChange(e.target.value, "courseTitle")
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Container maxWidth="md" style={{ borderColor: "black" }}>
                  <Container maxWidth="xs" style={{ float: "left" }}>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Name
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.firstname,
                            onChange: e =>
                              this.handleChange(e.target.value, "firstname")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Email
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.email,
                            onChange: e =>
                              this.handleChange(e.target.value, "email")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Tel
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.tel,
                            onChange: e =>
                              this.handleChange(e.target.value, "tel")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </Container>
                  <Container maxWidth="xs" style={{ float: "right" }}>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Reservation Date
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.orderTime,
                            onChange: e =>
                              this.handleChange(e.target.value, "orderTime")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Status
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                      <CustomSelect handleChange={this.handlechangeCustomSelect.bind(this)} />
                      </GridItem>
                    </GridContainer>
                  </Container>
                  <Container maxWidth="md">
                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "left" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Course Name
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data2.courseTitle
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "left" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Location
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: data2.location
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "left" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Date
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data2.dateStart + "/" + data2.dateEnd
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "right" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Time
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data2.timeStart + "/" + data2.timeEnd
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </Container>
                  <Container maxWidth="xs" style={{ float: "left" }}>
                    <GridContainer>
                      <GridItem xs={12} sm={2}></GridItem>
                      <GridItem xs={12} sm={10}>
                        <img
                          src={data.images}
                          style={{
                            width: "300px",
                            height: "400px",
                            float: "left"
                          }}
                        ></img>
                      </GridItem>
                    </GridContainer>
                  </Container>
                  <Container maxWidth="xs" style={{ float: "right" }}>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          QTY
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.qty,
                            onChange: e => this.handleChange(e.target, "qty")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Price
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data2.price
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Discount
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: "-"
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Tax
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: "7%"
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Total Price
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.totalPrice
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </Container>
                  <Container maxWidth="md">
                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "left" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Type
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data.type
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "left" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          Address
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>

                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: `${data2.address}  ${
                              data.province ? data.province.label : ""
                            }  ${data.district ? data.district.label : ""}  ${
                              data.district ? data.subDistrict.label : ""
                            }`
                          }}
                        />

                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={2} style={{ float: "right" }}>
                        <FormLabel className={classes.labelHorizontal}>
                          TaxID
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={10}>
                        <CustomInput
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            autoComplete: "off"
                          }}
                          inputProps={{
                            value: data2.price
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </Container>
                </Container>
              </form>
              <Button
                color="success"
                className={classes.addButton}
                onClick={() => this.handleClick(data.id)}
                style={{ float: "right", minWidth: "110px" }}
              >
                Edit
              </Button>
              <Button
                color="default"
                className={classes.addButton}
                onClick={() => this.handleClick2()}
                style={{ float: "right", minWidth: "110px" }}
              >
                Cancel
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string
};

/*
 * Render component on page
 */
// ReactDOM.render(
//   <Editor placeholder={'Write something...'}/>,
//   document.querySelector('.app')
// )
RegularForms.propTypes = {
  classes: PropTypes.object
};
export const page = inject("historyEditStore")(observer(RegularForms));
export default withStyles(regularFormsStyle)(page);
