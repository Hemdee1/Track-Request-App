import React, { useState } from "react";
import Glow1 from "../../assets/SVGs/Glow1";
import Glow2 from "../../assets/SVGs/Glow2";
import Glow3 from "../../assets/SVGs/Glow3";
import "./animated.css";
import { useEffect } from "react";
const AnimatedBackground = (): JSX.Element => {
  return (
    <div className="w-full h-full overflow-hidden fixed pointer-events-none">
      <div className="w-[900px] h-[900px] absolute -bottom-[350px] left-[20%]">
        <Glow1 />
      </div>
      <div className="w-[700px] h-[700px] absolute right-[0%] top-[0%]">
        <Glow2 />
      </div>
      <div className="w-[300px] h-[300px] absolute -left-[150px] top-[10%]">
        <Glow3 />
      </div>
    </div>
  );
};

export default AnimatedBackground;
