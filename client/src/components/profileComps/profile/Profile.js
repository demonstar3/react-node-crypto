import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../../actions/profileActions";
import { Icon } from "antd";
import SocialMedia from "./SocialMedia";
import isEmpty from "../../../validation/is-empty";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;

    let content;
    if (profile === null || loading) {
      content = (
        <div>
          <div style={{ textAlign: "center" }}>
            <Icon style={{ height: "100px", width: "100px" }} type="loading" />
            <h1>
              {" "}
              We are fetching the Profiles!
              <br /> One moment please!
            </h1>
          </div>
        </div>
      );
    } else {
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      content = (
        <div>
          <h1 className="profile-username">
            <span className="user-icon">
              <Icon type="user" />
            </span>
            {profile.username}
          </h1>
          <div>
            <SocialMedia
              /* prettier-ignore */
              instagram={profile.social.instagram ? profile.social.instagram : null}
              /* prettier-ignore */
              facebook={profile.social.facebook ? profile.social.facebook : null}
              youtube={profile.social.youtube ? profile.social.youtube : null}
              twitter={profile.social.twitter ? profile.social.twitter : null}
            />
            {profile.bio ? (
              <div className="profile-bio">{profile.bio}</div>
            ) : null}
          </div>
          <div>POSTS</div>
        </div>
      );
    }

    return (
      <div>
        <h4>{content}</h4>
      </div>
    );
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
