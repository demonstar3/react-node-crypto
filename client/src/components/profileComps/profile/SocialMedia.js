import React from "react";
import { Icon } from "antd";
import "../profile.css";

export default function SocialMedia({ twitter, instagram, facebook, youtube }) {
  return (
    <span>
      {facebook ? (
        <span className="social-icon">
          <Icon type="facebook" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={facebook}><span className='ignore'>If you're seeing this, it's just dummy text</span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {instagram ? (
        <span className="social-icon">
          <Icon type="instagram" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={instagram}><span className='ignore'>If you're seeing this, it's just dummy text</span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {youtube ? (
        <span className="social-icon">
          <Icon type="youtube" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={youtube}><span className='ignore'>If you're seeing this, it's just dummy text</span></a>
          <br />
        </span>
      ) : /* prettier-ignore */
      null}

      {twitter ? (
        <span className="social-icon">
          <Icon type="twitter" />
          {/* prettier-ignore */}
          <a target={"_blank"} href={twitter}><span className='ignore'>If you're seeing this, it's just dummy text</span></a>
        </span>
      ) : /* prettier-ignore */
      null}
    </span>
  );
}
