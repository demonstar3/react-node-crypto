import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Icon } from "antd";
import DashboardComps from "./DashboardComps";
import "./dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
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
        const { location, bio } = this.props.profile.profile;
        const { twitter, youtube, facebook, instagram } =
          this.props.profile.profile.social || {};
        content = (
          <div className="center dashboard">
            <DashboardComps
              location={location}
              bio={bio}
              twitter={twitter}
              youtube={youtube}
              instagram={instagram}
              facebook={facebook}
            />
          </div>
        );
      }
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
