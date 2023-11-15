import React from "react";
import "./MultipleOption.css";
import Input from "../Input/Input";
import { getOption } from "../../utils/helper";
import { ReactComponent as Cross } from "../../assets/svg/Cross.svg";

const MultipleOption = ({ options, id, onSelect, onDelete }) => {
  return (
    <>
      {options.map(({ checked, value }, index) => (
        <section className="multiple-operation" key={index}>
          <input
            ariaLabel={"Checked"}
            ariaDescription={"Select if the answer is correct."}
            tabIndex={1}
            type="radio"
            checked={checked}
            onClick={() => onSelect(index, "multiple")}
          />
          <Input
            ariaLabel={"Question-answer"}
            ariaDescription={"Enter multiple option answer."}
            id={id}
            type={"text"}
            placeholder={getOption(index + 1)}
            value={value}
          ></Input>
          <Cross
            onClick={() => onDelete(index)}
            tabindex={1}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onDelete(index);
              }
            }}
            ariaLabel={"Delete"}
            ariaDescription={"Delete multiple option answer"}
          />
        </section>
      ))}
    </>
  );
};

export default MultipleOption;
