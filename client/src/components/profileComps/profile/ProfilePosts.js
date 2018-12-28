import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileGetPost from "./ProfileGetPost";

class ProfilePosts extends Component {
  render() {
    const { profile } = this.props.profile;
    let postContent;
    if (profile.posts !== []) {
      postContent = (
        <div>
          {profile.posts.map(post => (
            <ProfileGetPost postId={post.post} key={post._id} />
          ))}
        </div>
      );
    }
    return postContent;
  }
}
ProfilePosts.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ProfilePosts);
