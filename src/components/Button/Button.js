import React from "react";
import "./Button.css";

const Button = ({ icon, text, onClick, ariaLabel, ariaDescription }) => {
  return (
    <section
      className={icon ? `button-icon` : `button`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
      tabindex={1}
      aria-label={ariaLabel}
      aria-describedby={ariaDescription}
    >
      {icon && <img className="icon" src={icon} alt="Icon" />}
      {text}
    </section>
  );
};

export default Button;
