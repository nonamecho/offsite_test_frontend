import React from "react";

const AppIcon = ({ alt, src, type }) => (
  <img
    alt={alt}
    src={src}
    style={
      type === "c"
        ? { width: 150, height: 150, borderRadius: 50 }
        : { width: 150, height: 150, borderRadius: 10 }
    }
  />
);

export default AppIcon;
