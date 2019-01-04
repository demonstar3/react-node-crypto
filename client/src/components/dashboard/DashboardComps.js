import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "antd";
import isEmpty from "../../validation/is-empty";
import ProfilePosts from "../profileComps/profile/ProfilePosts";

const DashboardComps = ({
  bio,
  location,
  twitter,
  youtube,
  instagram,
  facebook
}) => {
  let bioContent;
  let locationContent;
  let twitterContent;
  let youtubeContent;
  let facebookContent;
  let instagramContent;
  if (isEmpty(bio) === false) {
    bioContent = (
      <div className="dashboardSection">
        Bio :
        <br />
        {bio}
      </div>
    );
  }
  if (isEmpty(location) === false) {
    locationContent = (
      <div className="dashboardSection">
        Your location(other users can see this):
        <br />
        {location}
      </div>
    );
  }

  if (isEmpty(twitter) === false) {
    twitterContent = (
      <div className="dashboardSection">
        Your twitter page:
        <a target={"_blank"} href={twitter}>
          {twitter}
        </a>
      </div>
    );
  }

  if (isEmpty(youtube) === false) {
    youtubeContent = (
      <div className="dashboardSection">
        Your youtube page:{" "}
        <a target={"_blank"} href={youtube}>
          {youtube}
        </a>
      </div>
    );
  }
  if (isEmpty(facebook) === false) {
    facebookContent = (
      <div className="dashboardSection">
        Your facebook page:{" "}
        <a target={"_blank"} href={facebook}>
          {facebook}
        </a>
      </div>
    );
  }
  if (isEmpty(instagram) === false) {
    instagramContent = (
      <div className="dashboardSection">
        Your instagram page:{" "}
        <a target={"_blank"} href={instagram}>
          {instagram}
        </a>
      </div>
    );
  }
  return (
    <div>
      <div className="center dashboard">
        {locationContent}
        {bioContent}
        {/* {twitterContent}
        {youtubeContent}
        {instagramContent}
        {facebookContent} */}
      </div>

      <Link to="edit-profile">
        <Button style={{ margin: "2.5%" }} type="primary">
          Edit your profile
        </Button>
      </Link>
      <div>
        <h4 className="dashboard-posts-title">Posts</h4>
        <div className="dashboard-posts">
          <ProfilePosts />
        </div>
      </div>
    </div>
  );
};

DashboardComps.propTypes = {
  handle: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
  twitter: PropTypes.string,
  youtube: PropTypes.string,
  facebook: PropTypes.string,
  instagram: PropTypes.string
};
export default DashboardComps;
