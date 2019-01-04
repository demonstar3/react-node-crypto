import React from "react";
import { Icon } from "antd";
import "../profile.css";

export default function SocialMedia({ twitter, instagram, facebook, youtube }) {
  return (
    <span>
      {facebook ? (
        <span className="social-icon">
          {/* prettier-ignore */}
          <a target={"_blank"} href={facebook}><span > <Icon type="facebook" /></span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {instagram ? (
        <span className="social-icon">
          {/* prettier-ignore */}
          <a target={"_blank"} href={instagram}><span ><Icon type="instagram" /></span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {youtube ? (
        <span className="social-icon">
          {/* prettier-ignore */}
          <a target={"_blank"} href={youtube}><span > <Icon type="youtube" /></span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {twitter ? (
        <span className="social-icon">
          {/* prettier-ignore */}
          <a target={"_blank"} href={twitter}><span ><Icon type="twitter" /></span></a>
        </span>
      ) : /* prettier-ignore */
      null}
    </span>
  );
}
