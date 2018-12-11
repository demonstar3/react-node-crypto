import React, { Component } from "react";
import "./header.css";
import { IoLogoBitcoin } from "react-icons/io";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <Link to="/" className="link" style={{ textDecoration: "none" }}>
            CRYPTO NET
            <IoLogoBitcoin style={{ paddingTop: "20px" }} />
          </Link>
          <div className="quote">
            “Blockchain is the tech. Bitcoin is merely the first mainstream
            manifestation of its potential.” – Marc Kenigsberg
          </div>
          <Navbar />
        </div>
      </div>
    );
  }
}
