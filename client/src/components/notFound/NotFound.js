import React from "react";
import "./notfound.css";

export default function NotFound() {
  return (
    <div>
      <h1 className="notFound">
        Oops you've come to a page that doesn't exist! Check your URL for any
        mistakes and reload the page.
      </h1>
      <img
        className="notFoundimg"
        src={require("./../../images/notFound.jpg")}
        alt="notFound"
      />
    </div>
  );
}
