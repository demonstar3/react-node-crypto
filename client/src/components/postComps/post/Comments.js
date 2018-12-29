import React, { Component } from "react";
import "../posts.css";
import { Divider, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../actions/postActions";

class Comments extends Component {
  onDeleteClick = () => {
    this.props.deleteComment(this.props.post._id, this.props.comment._id);
  };
  render() {
    const { comment, auth, post } = this.props;
    let deleteButton;
    if (auth.user.id === post.user) {
      deleteButton = (
        <span>
          <Button
            onClick={this.onDeleteClick}
            type="danger"
            className="delete-button"
          >
            Delete
          </Button>
        </span>
      );
    }

    return (
      <div className="indi-comment">
        <Divider />
        <div className="comment-username">{comment.username}</div>
        <br />
        {comment.text}
        <span className="delete-button">{deleteButton}</span>
        <Divider />
      </div>
    );
  }
}

Comments.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteComment }
)(Comments);
