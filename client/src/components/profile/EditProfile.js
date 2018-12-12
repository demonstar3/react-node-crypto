import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Icon, Button } from "antd";
import TextAreaGroup from "../common/TextAreaGroup";
import TextField from "../common/TextField";
import "./profile.css";
import { createProfile, getProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
const FormItem = Form.Item;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      location: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      this.setState({
        handle: profile.handle,
        location: profile.location,
        bio: profile.bio,
        social: profile.social,
        twitter: profile.twitter,
        youtube: profile.youtube,
        facebook: profile.facebook,
        instagram: profile.instagram
      });
    }
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    const { profile } = this.props.profile;
    let socialInputs;
    //SOCIAL INPUTS
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <TextField
            label="Twitter"
            placeholder="Twitter profile URL"
            id="twitter"
            size="large"
            onChange={this.onChange}
            value={this.state.twitter}
            errors={errors.twitter ? errors.twitter : null}
            icon={{ type: "twitter" }}
          />
          <TextField
            label="Youtube"
            placeholder="Youtube profile URL"
            id="youtube"
            size="large"
            onChange={this.onChange}
            value={this.state.youtube}
            errors={errors.youtube ? errors.youtube : null}
            icon={{ type: "youtube" }}
          />
          <TextField
            label="Facebook"
            placeholder="Facebook profile URL"
            id="facebook"
            size="large"
            onChange={this.onChange}
            value={this.state.facebook}
            errors={errors.facebook ? errors.facebook : null}
            icon={{ type: "facebook" }}
          />
          <TextField
            label="Instagram"
            placeholder="Instagram profile URL"
            id="instagram"
            size="large"
            onChange={this.onChange}
            value={this.state.instagram}
            errors={errors.instagram ? errors.instagram : null}
            icon={{ type: "instagram" }}
          />
        </div>
      );
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="profileForm">
          <FormItem>
            <TextField
              label="This is your handle"
              placeholder="Handle"
              id="handle"
              size="large"
              onChange={this.onChange}
              value={this.state.handle}
              errors={errors.handle ? errors.handle : null}
            />
          </FormItem>
          <FormItem>
            <TextField
              label="Where are you located?"
              placeholder="Location"
              id="location"
              size="large"
              onChange={this.onChange}
              value={this.state.location}
              errors={errors.location ? errors.location : null}
            />
          </FormItem>
          <FormItem>
            <Button
              className="button"
              type={displaySocialInputs ? "ghost" : "primary"}
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
            >
              Add Social Network Links
            </Button>
            {socialInputs}
          </FormItem>
          <FormItem>
            <TextAreaGroup
              label="Tell us a little bit about yourself!"
              placeholder="Put your Bio here"
              id="bio"
              rows={5}
              onChange={this.onChange}
              value={this.state.bio}
              errors={errors.bio ? errors.bio : null}
            />
          </FormItem>
          {/* PUT COINS FORM HERE */}

          <Button
            className="center button"
            type="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(withRouter(EditProfile));
