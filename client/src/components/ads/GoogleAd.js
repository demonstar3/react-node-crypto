import React, { Component } from "react";
export default class GoogleAd extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-xxxxxxxxxx"
          data-ad-slot="xxxxxxxxxx"
          data-ad-format="auto"
        />
      </div>
    );
  }
}
