import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";
import DashboardComps from "./DashboardComps";
import "./dashboard.css";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    let content;
    const { profile, loading } = this.props.profile;

    if (loading || profile === null) {
      content = (
        <div style={{ textAlign: "center" }}>
          <Icon style={{ height: "100px", width: "100px" }} type="loading" />
          <h1>
            {" "}
            We are fetching your Profile!
            <br /> One moment please!
          </h1>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        const { handle, location, bio } = this.props.profile.profile;
        const { twitter, youtube, facebook, instagram } =
          this.props.profile.profile.social || {};
        content = (
          <div className="center dashboard">
            <DashboardComps
              handle={handle}
              location={location}
              bio={bio}
              twitter={twitter}
              youtube={youtube}
              instagram={instagram}
              facebook={facebook}
            />
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
    return (
      <div>
        <h1 className="center title">Dashboard</h1>
        {content}
      </div>
    );
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
