import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_QUESTION,
  UPDATE_QUESTION_TYPE,
  UPDATE_QUESTION_ANSWER,
} from "../../redux/actions/actionType";
import "./Input.css";

const Input = ({
  id,
  type,
  value,
  placeholder,
  options,
  index,
  ariaLabel,
  ariaDescription,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const customStyles = {
    control: (provided) => ({
      provided,
      display: "flex",
      width: "271px",
      height: "40px",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 16px",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    }),
    indicatorSeparator: (provided) => ({
      provided,
      display: "hidden",
    }),
    dropdownIndicator: (provided) => ({
      provided,
      color: "red", // Change to your desired color
    }),
  };

  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    if (type === "base") {
      dispatch({
        type: UPDATE_QUESTION,
        payload: {
          id,
          question: e.target.value,
        },
      });
    } else if (type === "text") {
      let updatedAnswer;
      const selectedQuestion = data.find((obj) => obj.id === id);
      if (
        selectedQuestion.type === "Checkboxes" ||
        selectedQuestion.type === "Multiple Choice" ||
        selectedQuestion.type === "Dropdown"
      ) {
        updatedAnswer = selectedQuestion.answer.map((answer, answer_index) => ({
          ...answer,
          value: answer_index === index ? e.target.value : answer.value,
        }));
      } else {
        updatedAnswer = e.target.value;
      }
      dispatch({
        type: UPDATE_QUESTION_ANSWER,
        payload: {
          id,
          answer: updatedAnswer,
        },
      });
    }
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    // setInputValue(e.target.value);
    dispatch({
      type: UPDATE_QUESTION_TYPE,
      payload: {
        id,
        type: e.label,
      },
    });
  };

  const renderInput = () => {
    switch (type) {
      case "base":
        return (
          <input
            aria-label={ariaLabel}
            aria-describedby={ariaDescription}
            className="input-base"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            tabIndex={1}
          />
        );
      case "text":
        return (
          <>
            {placeholder === "Long answer text" ? (
              <textarea
                className="input-text"
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                tabIndex={1}
              />
            ) : (
              <input
                className="input-text"
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                tabIndex={1}
              />
            )}
          </>
        );
      case "dropdown":
        return (
          <>
            <Select
              ariaLabel={"Question-Type"}
              ariaDescription={"Select question type."}
              key={id}
              onChange={handleSelectChange}
              options={options}
              styles={customStyles}
              defaultValue={options.find((option) => option.label === value)}
              tabIndex={1}
            ></Select>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderInput()}</>;
};

export default Input;
