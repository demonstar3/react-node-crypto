import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../../common/TextAreaGroup";
import axios from "axios";
import TextField from "../../common/TextField";
import { withRouter } from "react-router-dom";
import { addPost } from "../../../actions/postActions";
import { Form, Button, Upload, Icon, Modal } from "antd";
import "../posts.css";
import ImgUpload from "../../img_upload/ImgUpload";
const imageChecker = image => {
  if (
    image.size > 200000 ||
    image.type !== "image/jpeg" ||
    image.type !== "image/jpg" ||
    image.type !== "image/gif" ||
    image.type !== "image/png" ||
    image.type !== "image/svg"
  ) {
    return false;
  } else {
    return true;
  }
};
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      errors: {},
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  onChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    let postData = {};
    postData = {
      text: this.state.text,
      username: user.username,
      title: this.state.title
    };
    if (this.state.image !== undefined && !imageChecker(this.state.image)) {
      this.setState({
        errors: {
          image:
            "Your image is not valid. Please choose a smaller or valid image."
        }
      });
    } else {
      this.props.addPost(postData, this.props.history, this.state.image);
      this.setState({ title: "", text: "" });
    }
  };
  // onSubmitImage = e => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   const file = this.state.image;
  //   console.log(file);
  //   formData.append("image", file);
  //   axios({
  //     method: "post",
  //     url: "api/profile/img_upload",
  //     data: formData
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err.response.data));
  // };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Form className="postForm">
          <TextField
            label="Give your post a title"
            placeholder="Title"
            id="title"
            size="large"
            onChange={this.onChange}
            value={this.state.title}
            errors={errors.title ? errors.title : null}
          />
          <TextAreaGroup
            label="Make a Post!"
            placeholder="Put your text here"
            id="text"
            rows={5}
            onChange={this.onChange}
            value={this.state.text}
            errors={errors.text ? errors.text : null}
          />
          <div className="edit-image">
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChangeImage}
            />
            {errors.image ? (
              <span className="error">{errors.image}</span>
            ) : null}
          </div>
          <Button
            className="center button"
            type="primary"
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
