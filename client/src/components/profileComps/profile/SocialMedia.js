import React from "react";
import { Icon } from "antd";

export default function SocialMedia({ twitter, instagram, facebook, youtube }) {
  return (
    <span>
      {facebook ? (
        <div className="social-icon">
          <Icon type="facebook" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={facebook}>Facebook</a>
        </div>
      ) : /* prettier-ignore */
      null}

      <br />
      {instagram ? (
        <div className="social-icon">
          <Icon type="instagram" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={instagram}>Instagram</a>
        </div>
      ) : /* prettier-ignore */
      null}
      <br />
      {youtube ? (
        <div className="social-icon">
          <Icon type="youtube" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={youtube}>Youtube</a>
        </div>
      ) : /* prettier-ignore */
      null}
      <br />
      {twitter ? (
        <div className="social-icon">
          <Icon type="twitter" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={twitter}>Twitter</a>
        </div>
      ) : /* prettier-ignore */
      null}
    </span>
  );
}
