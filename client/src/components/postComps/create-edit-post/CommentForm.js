import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../../common/TextAreaGroup";
import { addComment } from "../../../actions/postActions";
import { Form, Button } from "antd";
import "../posts.css";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    const { postId } = this.props;

    const commentData = {
      text: this.state.text,
      username: user.username
    };
    console.log(commentData);
    this.props.addComment(commentData, postId);
    this.setState({ text: "" });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Form className="comment-form">
          <TextAreaGroup
            label="Comment!!"
            placeholder="Put your comment here"
            id="text"
            rows={2}
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
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
