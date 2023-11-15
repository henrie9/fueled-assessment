import React from "react";
import "./Dropdown.css";
import Input from "../Input/Input";
import { getOption } from "../../utils/helper";
import { ReactComponent as Cross } from "../../assets/svg/Cross.svg";

const Dropdown = ({ options, id, onDelete }) => {
  return (
    <>
      {options.map(({ value }, index) => (
        <section className="dropdown">
          <label>{`${index + 1}.`}</label>
          <Input
            ariaLabel={"Question-answer"}
            ariaDescription={"Enter optional dropdown answer."}
            id={id}
            type={"text"}
            placeholder={getOption(index + 1)}
            value={value}
          ></Input>
          <Cross
            ariaLabel={"Delete"}
            ariaDescription={"Delete dropdown answer"}
            onClick={() => onDelete(index)}
            tabindex={1}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onDelete(index);
              }
            }}
          />
        </section>
      ))}
    </>
  );
};

export default Dropdown;
