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

  onChangeImage = e => this.setState({ image: e.target.files[0] });
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const postData = {
      text: this.state.text,
      username: user.username,
      title: this.state.title
    };
    this.props.addPost(postData, this.props.history);
    this.setState({ title: "", text: "" });
  };
  onSubmitImage = e => {
    e.preventDefault();

    const formData = new FormData();
    const file = this.state.image;
    console.log(file);
    formData.append("image", file);
    axios({
      method: "post",
      url: "api/profile/img_upload",
      data: formData
    }).then(res => {
      console.log(res.data);
    });
  };

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

          <Button
            className="center button"
            type="primary"
            onClick={this.onSubmit}
          >
            Submit
          </Button>
          <input
            type="file"
            name="selectedFile"
            onChange={this.onChangeImage}
          />
          <div className="clearfix">
            <Button
              className="center button"
              type="primary"
              onClick={this.onSubmitImage}
            >
              Image
            </Button>
          </div>
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
