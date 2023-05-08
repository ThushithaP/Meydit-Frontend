import React from "react";
import Lottie from "react-lottie";

const AnimatedIcon = ({ animationData, size, marginTop, marginBottom }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      style={{
        width: size,
        height: size,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    />
  );
};

export default AnimatedIcon;
