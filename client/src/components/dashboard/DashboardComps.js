import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "antd";
import isEmpty from "../../validation/is-empty";

const DashboardComps = ({
  bio,
  location,
  handle,
  twitter,
  youtube,
  instagram,
  facebook
}) => {
  let bioContent;
  let locationContent;
  let handleContent;
  let twitterContent;
  let youtubeContent;
  let facebookContent;
  let instagramContent;
  if (isEmpty(bio) === false) {
    bioContent = (
      <div className="dashboardSection">
        Here's your bio :
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
  if (isEmpty(handle) === false) {
    let link = `/profile/${handle}`;
    handleContent = (
      <div className="dashboardSection">
        Your profile Handle:
        <br />
        <Link to={link}>http://localhost:3000/profile/{handle}</Link>
        <br />
        Share this link to expand your profile reach!
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
      {/* <div className="center dashboard">
        {handleContent}
        {locationContent}
        {bioContent}
        {twitterContent}
        {youtubeContent}
        {instagramContent}
        {facebookContent}
 </div>*/}
      <div>
        {" "}
        <Link to="edit-profile">
          {" "}
          <Button style={{ margin: "2.5%" }} type="primary">
            Edit your profile
          </Button>
        </Link>
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
