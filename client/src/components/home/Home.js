import React, { Component } from "react";
import { Carousel } from "antd";
import "./homepage.css";
export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h3 className="carouselTitle">This Week's Top Posts</h3>
        <Carousel autoplay className="carousel">
          {" "}
          <div className="carouselItem">1</div>
          <div className="carouselItem">2</div>
          <div className="carouselItem">3</div>
          <div className="carouselItem">4</div>
        </Carousel>
      </div>
    );
  }
}
