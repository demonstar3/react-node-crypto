import React, { Component } from "react";
import { Carousel, Button, Icon } from "antd";
import "./homepage.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/postActions";
import PostFeed from "../postComps/posts/PostFeed";
import { Link } from "react-router-dom";
class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    let createPost;
    let carousel;
    const { posts, loading } = this.props.post;
    if (this.props.auth.isAuthenticated) {
      createPost = (
        <div className=" center">
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
        <div className=" center">
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
      carousel = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1> One moment please!</h1>
        </div>
      );
    } else {
      console.log(posts[0]);
      carousel = (
        <div>
          <Carousel autoplay className="carousel">
            {" "}
            <div className="carouselItem">{posts[0].title}</div>
            <div className="carouselItem">{posts[1].title}</div>
            <div className="carouselItem">{posts[2].title}</div>
            <div className="carouselItem">4</div>
          </Carousel>
          <br />
          {createPost}
          <PostFeed posts={posts} />
        </div>
      );
    }
    return (
      <div className="Home">
        <h3 className="carouselTitle">This Week's Top Posts</h3>
        {carousel}
      </div>
    );
  }
}

Home.propTypes = {
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
)(Home);
