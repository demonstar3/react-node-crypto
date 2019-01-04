import React, { Component } from "react";
import { Icon, Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

class ProfileGetPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }
  componentDidMount() {
    axios.get(`/api/post/${this.props.postId}`).then(res => {
      this.setState({ post: res.data });
    });
  }
  render() {
    // const { post, loading } = this.props.post;
    const { post } = this.state;
    let postContent;
    let postText;

    if (post === null || post === {} || post.text === undefined) {
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
      if (post.text.length >= 100) {
        postText = (
          <div className="post-feed-item-text">
            {post.text.substring(0, 200)}
            <span className="read-more"> ...Read More!</span>
          </div>
        );
      } else {
        postText = <div className="post-feed-item-text">{post.text}</div>;
      }
      postContent = (
        <div>
          <Card
            title={
              <Link className="post-feed-title" to={`/post/${post._id}`}>
                {post.title}
              </Link>
            }
            className="posts-item"
          >
            <Link to={`/post/${post._id}`}>{postText}</Link>
          </Card>
        </div>
      );
    }
    return postContent;
  }
}

export default ProfileGetPost;
