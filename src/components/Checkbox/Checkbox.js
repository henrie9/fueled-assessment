import React from "react";
import "./Checkbox.css";
import Input from "../Input/Input";
import { getOption } from "../../utils/helper";
import { ReactComponent as Cross } from "../../assets/svg/Cross.svg";

const Checkbox = ({ options, id, onSelect, onDelete }) => {
  return (
    <>
      {options.map(({ checked, value }, index) => (
        <section className="checkbox" key={index}>
          <input
            ariaLabel={"Checked"}
            ariaDescription={"Select if the answer is correct."}
            tabIndex={1}
            type="checkbox"
            checked={checked}
            onClick={() => onSelect(index, "checkbox")}
          />
          <Input
            ariaLabel={"Question-answer"}
            ariaDescription={"Enter optional checkbox answer."}
            id={id}
            type={"text"}
            placeholder={getOption(index + 1)}
            value={value}
          ></Input>
          <Cross
            ariaLabel={"Delete"}
            ariaDescription={"Delete checkbox answer"}
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

export default Checkbox;
