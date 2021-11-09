import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" {...props} >
      <image width="32" height="32" href="/images/lime.png" />
    </Svg>
  );
};

export default Icon;
