import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon, Divider, Button } from "antd";
import {
  getPost,
  deletePost,
  addLike,
  removeLike
} from "../../../actions/postActions";
import "../posts.css";
import { Link } from "react-router-dom";
import CommentForm from "../create-edit-post/CommentForm";
import { withRouter } from "react-router-dom";
import Comments from "./Comments";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      alreadyLiked: false
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  onDelete = () => {
    this.props.deletePost(this.props.post.post._id, this.props.history);
  };

  checkLikes = () => {
    const { post } = this.props.post;
    const { auth } = this.props;
    for (var i = post.likes.length - 1; i >= 0; i--) {
      if (post.likes[i].user === auth.user.id) {
        return false;
      }
    }
    return true;
  };

  onLikeClick = () => {
    const { post } = this.props.post;
    const { auth } = this.props;
    let apple = this.state.likes;
    if (!auth.isAuthenticated) {
      this.setState({ errors: "You must login to like a post" });
    } else {
      if (this.checkLikes()) {
        this.props.addLike(post._id);

        this.setState({ likes: apple });
      } else {
        this.props.removeLike(post._id);

        this.setState({ likes: apple });
      }
    }
  };
  render() {
    const { post, loading } = this.props.post;
    const { auth } = this.props;
    let postContent;
    let buttons;
    let likeButton;
    let commentForm;
    let comments;

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
      let color = "filled";
      if (post.comments !== []) {
        comments = (
          <div className="comments">
            {post.comments.map(comment => (
              <Comments comment={comment} key={comment._id} post={post} />
            ))}
          </div>
        );
      }
      if (auth.isAuthenticated && this.checkLikes()) {
        color = "twoTone";
      }
      if (auth.isAuthenticated) {
        commentForm = (
          <div>
            <CommentForm postId={post._id} />
          </div>
        );
      }
      likeButton = (
        <span className="like-button">
          <Icon type="like" theme={color} onClick={this.onLikeClick} />
          <span className="like-num">{post.likes.length}</span>
          {this.state.errors ? (
            <div className="error error-like">{this.state.errors}</div>
          ) : null}
        </span>
      );

      if (auth.user.id === post.user) {
        buttons = (
          <span className="delete-button">
            <Link to={`/edit-post/${post._id}`}>
              <Button disabled={false} className="post-button" type="default">
                Edit
              </Button>
            </Link>
            <Button
              onClick={this.onDelete}
              className="post-button"
              type="danger"
            >
              Delete
            </Button>
          </span>
        );
      }
      postContent = (
        <div>
          <h1 className="center post-title">{post.title}</h1>
          <div className="post-username">
            <Link to={`/profile/${post.username}`}>By:{post.username}</Link>
          </div>
          <br />
          <p className="post-text">{post.text}</p>
          <Divider />
          <div style={{ width: "100%" }}>
            {likeButton}
            {buttons}
          </div>
          <Divider />
          {comments}
          {commentForm}
        </div>
      );
    }
    return postContent;
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost, deletePost, addLike, removeLike }
)(withRouter(Post));
