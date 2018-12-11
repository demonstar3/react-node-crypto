import { Form, Icon, Input, Button } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldValue } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = {
          username: getFieldValue("username"),

          password: getFieldValue("password")
        };
        this.props.loginUser(user);
      }
    });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="form">
        <h2 className="formTitle">Login</h2>
        <Form onSubmit={this.handleSubmit} style={{ margin: "auto" }}>
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
            <Button type="primary" htmlType="submit" className="formButton">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);
