import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../../common/TextAreaGroup";
import TextField from "../../common/TextField";
import { withRouter } from "react-router-dom";
import { editPost, getPost } from "../../../actions/postActions";
import { Form, Button, Icon } from "antd";
import "../posts.css";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post.post) {
      const { post } = nextProps.post;
      this.setState({
        text: post.text,
        title: post.title
      });
    }
  }

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
    this.props.editPost(postData, this.props.post.post._id, this.props.history);
    this.setState({ title: "", text: "" });
  };
  render() {
    let postForm;
    const { errors } = this.state;

    const { post, loading } = this.props.post;
    if (post === null || loading || Object.keys(post).length === 0) {
      postForm = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1>
            {" "}
            We are fetching the Post!
            <br /> One moment please!
          </h1>
        </div>
      );
    } else {
      postForm = (
        <div>
          <Form className="EditPost">
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
          </Form>
        </div>
      );
    }

    return postForm;
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  post: state.post
});

EditPost.propTypes = {
  errors: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editPost, getPost }
)(withRouter(EditPost));
