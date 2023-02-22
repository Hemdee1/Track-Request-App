import React from "react";

const LogoIcon = () => {
  return (
    <svg
      width="77"
      height="45"
      viewBox="0 0 77 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_129_23)">
        <circle cx="27" cy="23" r="23" fill="#61818E" />
        <circle cx="50" cy="23" r="23" fill="#35CA8B" />
      </g>
      <defs>
        <filter
          id="filter0_d_129_23"
          x="0"
          y="0"
          width="77"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_129_23"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_129_23"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LogoIcon;
