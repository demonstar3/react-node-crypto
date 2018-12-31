import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "../posts.css";
import { deletePost } from "../../../actions/postActions";

class PostItem extends Component {
  render() {
    const { post } = this.props;
    let postText;
    if (post.text.length >= 200) {
      postText = (
        <div className="post-feed-item-text">
          {post.text.substring(0, 200)}
          <Link to={`/post/${post._id}`}> ...Read More!</Link>
        </div>
      );
    } else {
      postText = <div className="post-feed-item-text">{post.text}</div>;
    }
    return (
      <div>
        {" "}
        <Card
          title={post.title}
          className="posts-item"
          extra={<Link to={`/post/${post._id}`}>More</Link>}
        >
          {console.log(post.text.length)}
          <div>{postText}</div>
        </Card>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({});

export default connect(
  null,
  { deletePost }
)(PostItem);
