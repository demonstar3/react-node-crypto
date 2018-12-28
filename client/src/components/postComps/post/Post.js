import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../../actions/postActions";
import { Icon, Divider, Button } from "antd";
import { deletePost } from "../../../actions/postActions";
import "../posts.css";
import { withRouter } from "react-router-dom";
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  onDelete = () => {
    this.props.deletePost(this.props.post.post._id, this.props.history);
  };
  render() {
    const { post, loading } = this.props.post;
    const { auth } = this.props;
    let postContent;
    let deleteButton;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = (
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
      if (auth.user.id === post.user) {
        deleteButton = (
          <span>
            <Button onClick={this.onDelete} type="danger">
              Delete
            </Button>
          </span>
        );
      }
      postContent = (
        <div>
          <h1 className="center post-title">{post.title}</h1>
          <br />
          <p className="post-text">{post.text}</p>
          <Divider />
          {deleteButton}
        </div>
      );
    }
    return postContent;
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost, deletePost }
)(withRouter(Post));
