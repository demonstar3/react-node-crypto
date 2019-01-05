import { Form, Icon, Input, Button } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const FormItem = Form.Item;

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    this.setState({ errors: {} });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldValue } = this.props.form;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newUser = {
          username: getFieldValue("username"),
          email: getFieldValue("email"),
          password: getFieldValue("password"),
          password2: getFieldValue("password2")
        };

        this.props.registerUser(newUser, this.props.history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="form">
        <h2 className="formTitle">Register</h2>
        <Form onSubmit={this.handleSubmit} style={{ margin: "auto" }}>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
            {this.state.errors.email ? (
              <div className="error">{this.state.errors.email}</div>
            ) : null}
          </FormItem>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
            {this.state.errors.username ? (
              <div className="error">{this.state.errors.username}</div>
            ) : null}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
            {this.state.errors.password ? (
              <div className="error">{this.state.errors.password}</div>
            ) : null}
          </FormItem>

          <FormItem>
            {getFieldDecorator("password2", {
              rules: [
                {
                  required: true,
                  message: "Please input your password again!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
            {this.state.errors.password2 ? (
              <div className="error">{this.state.errors.password2}</div>
            ) : null}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="formButton">
              Register
            </Button>
            Or <Link to="/login">Login!</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Register = Form.create()(RegisterForm);

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
