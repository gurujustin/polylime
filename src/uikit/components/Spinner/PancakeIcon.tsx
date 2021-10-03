import React from "react";
import Svg from "../Svg/Svg";
import { SvgProps } from "../Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 96 96" {...props} >
      <image width="96" height="96" href="/images/cherry.png" />
    </Svg>
   
  );
};

export default Icon;
