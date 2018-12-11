import React from "react";
import "./footer.css";
import { Layout } from "antd";
const { Footer } = Layout;
export default function PageFooter() {
  return (
    <Footer className="footer">
      <span role="img">©️</span>CryptoNet
    </Footer>
  );
}
