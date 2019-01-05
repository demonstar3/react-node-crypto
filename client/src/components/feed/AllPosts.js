import React, { Component } from "react";
import { Button, Icon, Input } from "antd";
import "./feed.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/postActions";
import PostFeed from "../postComps/posts/PostFeed";
import { Link } from "react-router-dom";
const Search = Input.Search;

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.props.getPosts();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.post.posts });
  }
  onChange = e => {
    let filteredPosts;

    filteredPosts = this.props.post.posts.filter(post => {
      return (
        post.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ posts: filteredPosts });
  };
  onSearch = e => {
    let filteredPosts;

    filteredPosts = this.props.post.posts.filter(post => {
      return post.title.toLowerCase().indexOf(e.toLowerCase()) !== -1;
    });

    this.setState({ posts: filteredPosts });
  };
  render() {
    let createPost;
    let allposts;
    const { posts, loading } = this.props.post;

    if (this.props.auth.isAuthenticated) {
      createPost = (
        <div className="center">
          {" "}
          <Link to={"make-a-post"}>
            <Button className=" block-button" type="primary" block>
              Make A Post
            </Button>
          </Link>
        </div>
      );
    } else {
      createPost = (
        <div className="center">
          {" "}
          <Link to={"register"}>
            <Button className=" block-button" block type="primary">
              Sign Up
            </Button>
          </Link>
        </div>
      );
    }
    if (posts === null || loading || posts[0] === undefined) {
      allposts = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1> One moment please!</h1>
        </div>
      );
    } else {
      allposts = (
        <div>
          <div className="center">
            {" "}
            <Search
              placeholder="Search For Posts!"
              onChange={this.onChange}
              onSearch={this.onSearch}
              enterButton
              className="search-profiles"
            />
          </div>
          {createPost}
          <PostFeed posts={this.state.posts} />
        </div>
      );
    }
    return <div>{allposts}</div>;
  }
}
AllPosts.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(AllPosts);
