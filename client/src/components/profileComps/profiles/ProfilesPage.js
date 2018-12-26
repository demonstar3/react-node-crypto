import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { getProfiles } from "../../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import "../profile.css";
class ProfilesPage extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1>
            {" "}
            We are fetching the Profiles!
            <br /> One moment please!
          </h1>
        </div>
      );
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <div>No profiles are currently avaiable</div>;
      }
    }
    return <div className="profiles-page">{profileItems}</div>;
  }
}

ProfilesPage.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(ProfilesPage);
