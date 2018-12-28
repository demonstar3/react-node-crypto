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

    if (post === null || post === {}) {
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
      postContent = (
        <div>
          {" "}
          <Card
            title={post.title}
            className="posts-item"
            extra={<Link to={`/post/${post._id}`}>More</Link>}
          >
            {post.text}
          </Card>
        </div>
      );
    }
    return postContent;
  }
}

export default ProfileGetPost;
