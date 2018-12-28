import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Row, Col, Card, Button } from "antd";
import "../profile.css";

export default class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card title={profile.username}>
              {profile.bio ? profile.bio : "No bio yet!"}
              <br />
              <Link to={`/profile/${profile.handle}`}>
                <Button className="view-profile" type="primary">
                  View Profile
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
