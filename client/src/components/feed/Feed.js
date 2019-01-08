import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "antd";
import { getPosts } from "../../actions/postActions";
import PostFeed from "../postComps/posts/PostFeed";
import GoogleAd from "../ads/GoogleAd";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1>
            {" "}
            We are fetching the Posts!
            <br /> One moment please!
          </h1>
        </div>
      );
    } else {
      const { posts } = this.props.post;
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div>
        <GoogleAd />
        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
