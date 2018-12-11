import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    let content;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (loading || profile === null) {
      content = (
        <div>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          HELLO
        </div>
      );
    } else {
      // console.log(profile);
      const { handle, location, bio } = this.props.profile.profile;
      let bioContent;
      let locationContent;
      let handleContent;
      if (bio) {
        bioContent = (
          <div>
            Here's your bio:
            <br />
            <br />
            {bio}
          </div>
        );
      }
      if (location) {
        locationContent = (
          <div>
            Your location(other users can see this):
            <br />
            <br />
            {locationContent}
          </div>
        );
      }
      if (handle) {
        handleContent = (
          <div>
            Your profile Handle:
            <br />
            <br />
            {handle}
          </div>
        );
      }
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            {bioContent}
            <br />
            {locationContent}
            {handleContent}
            <div>
              {" "}
              <Link to="create-profile">
                {" "}
                <Button type="primary">Edit your profile</Button>
              </Link>
            </div>
          </div>
        );
      } else {
        content = (
          <div>
            {" "}
            <Link to="create-profile">
              {" "}
              <Button type="primary">Make a profile</Button>
            </Link>
          </div>
        );
      }
      //   content = <div>Content</div>;
    }
    return <div>{content}</div>;
  }
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfile }
)(Dashboard);
