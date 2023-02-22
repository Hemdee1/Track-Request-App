import React from "react";
import { ButtonTypeProp } from "./Button.type";
import ButtonPrimary from "./Button.primary.component";
import ButtonSecondary from "./Button.secondary.component";
import ButtonRoundedPrimary from "./Button.rounded.primary.component";
import ButtonRoundedSecondary from "./Button.rounded.secondary.component";
import "../../global.css";

export const Button = (props: ButtonTypeProp) => {
  if (props.type === "primary") return <ButtonPrimary {...props} />;
  if (props.type === "secondary") return <ButtonSecondary {...props} />;
  if (props.type === "primary-rounded")
    return <ButtonRoundedPrimary {...props} />;
  if (props.type === "secondary-rounded")
    return <ButtonRoundedSecondary {...props} />;

  return <ButtonPrimary {...props} />;
};
