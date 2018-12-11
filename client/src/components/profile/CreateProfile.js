import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Icon } from "antd";
import TextAreaGroup from "../common/TextAreaGroup";
import TextField from "../common/TextField";
import "./profile.css";
const FormItem = Form.Item;

class CreateProfile extends Component {
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
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="profileForm">
          <FormItem>
            <TextField
              placeholder="Handle"
              id="handle"
              size="large"
              onChange={this.onChange}
              value={this.state.handle}
            />
            <TextField
              placeholder="Location"
              id="location"
              size="large"
              onChange={this.onChange}
              value={this.state.location}
            />
            <TextAreaGroup
              placeholder="Put your Bio here"
              id="bio"
              rows={5}
              onChange={this.onChange}
              value={this.state.bio}
            />
            {/* PUT COINS FORM HERE */}
          </FormItem>
        </Form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps)(CreateProfile);
