import React from "react";
import "./styles.css";
const EmptyView = () => {
  return (
    <div className="empty-view">
      <div>
        <img src="/images/gif/empty.gif" alt="empty view" />
        <h1>Nothing found as of now...</h1>
      </div>
    </div>
  );
};

export default EmptyView;
