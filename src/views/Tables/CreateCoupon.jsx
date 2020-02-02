/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//import qs from "query-string";
import Container from "@material-ui/core/Container";
//import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types"; // @material-ui/core components
//import ReactQuill from "react-quill"; // ES6
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
//import { Editor } from "react-draft-wysiwyg";
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
//import { api } from "../../config/config";
//import "react-quill/dist/quill.snow.css";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

//import CustomSelect from './CustomSelect';
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
    this.props.history.push(`admin/historyOrder`);
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
    return (
      <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Title</label>
          <input
            type="text"
            className="form-control"
            value={this.state.post.title}
            onChange={this.handleChange.bind(this, 'title')} />
        </div>

        <div className="form-group">
          <label className="label-control">Body</label>
          <Textarea
            className="form-control"
            value={this.state.post.body}
            onChange={this.handleChange.bind(this, 'body')} />
        </div>

        <button type="submit" className="btn btn-default">
          {this.state.postId ? 'Update' : 'Create' } Post
        </button>
      </form>
    );
  }
}


/*
 * PropType validation
 */


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
