import React, { Component } from "react";
import { Menu } from "antd";
import "./header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearProfile } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  state = {
    current: ""
  };
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let links;
    if (isAuthenticated) {
      links = (
        <div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="nav"
          >
            <Menu.Item key="posts" className="navItem">
              <Link to="/"> Posts</Link>
            </Menu.Item>
            <Menu.Item key="topposts" className="navItem">
              Top Posts
            </Menu.Item>
            <Menu.Item key="profile" className="navItem">
              <Link to="/dashboard"> My Profile</Link>
            </Menu.Item>
            <Menu.Item key="profiles" className="navItem">
              <Link to="/profiles"> Find a Creator</Link>
            </Menu.Item>

            <Menu.Item key="logout" className="navItem">
              <Link to="/" onClick={this.onLogoutClick}>
                {" "}
                Logout
              </Link>
            </Menu.Item>
            <Menu.Item key="greeting" className="navItem greeting">
              {" "}
              Hello {user.username}
            </Menu.Item>
          </Menu>
        </div>
      );
    } else {
      links = (
        <div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="nav"
          >
            <Menu.Item key="posts" className="navItem">
              <Link to="/"> Posts</Link>
            </Menu.Item>
            <Menu.Item key="topposts" className="navItem">
              Top Posts
            </Menu.Item>
            <Menu.Item key="login" className="navItem">
              <Link to="/login"> Login</Link>
            </Menu.Item>
            <Menu.Item key="profiles" className="navItem">
              <Link to="/profiles"> Find a Creator</Link>
            </Menu.Item>

            <Menu.Item key="signup" className="navItem ">
              <Link to="/register"> Sign Up</Link>
            </Menu.Item>
          </Menu>
        </div>
      );
    }
    return <div>{links}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(Navbar);
