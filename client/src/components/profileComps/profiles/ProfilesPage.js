import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon, Input } from "antd";
import { getProfiles } from "../../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import "../profile.css";

const Search = Input.Search;

class ProfilesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }
  componentDidMount() {
    this.props.getProfiles();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ profiles: nextProps.profile.profiles });
  }
  onChange = e => {
    let filtereProfiles;

    filtereProfiles = this.props.profile.profiles.filter(profile => {
      return (
        profile.username.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
        -1
      );
    });

    this.setState({ profiles: filtereProfiles });
  };

  onSearch = e => {
    let filteredProfiles;

    filteredProfiles = this.props.profile.profiles.filter(profile => {
      return profile.username.toLowerCase().indexOf(e.toLowerCase()) !== -1;
    });

    this.setState({ profiles: filteredProfiles });
  };
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
        profileItems = this.state.profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <div>No profiles are currently avaiable</div>;
      }
    }
    return (
      <div className="profiles-page">
        {" "}
        <div className="center">
          {" "}
          <Search
            placeholder="input search text"
            onChange={this.onChange}
            onSearch={this.onSearch}
            enterButton
            className="search-posts"
          />
        </div>
        {profileItems}
      </div>
    );
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
