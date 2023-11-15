import "./Question.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import MultipleOption from "../MultipleOption/MultipleOption";
import Dropdown from "../Dropdown/Dropdown";
import AddIcon from "../../assets/svg/+.svg";
import MoveUp from "../../assets/svg/move up.svg";
import MoveDown from "../../assets/svg/move down.svg";
import Remove from "../../assets/svg/remove.svg";
import { useDispatch } from "react-redux";
import {
  DELETE_QUESTION,
  SWAP_QUESTION,
  UPDATE_QUESTION_ANSWER,
} from "../../redux/actions/actionType";

const RenderQuestionType = ({ question }) => {
  const dispatch = useDispatch();
  const dropdownOptions = [
    { label: "Short Answer", value: "Option 1" },
    { label: "Paragraph", value: "Option 2" },
    { label: "Checkboxes", value: "Option 3" },
    { label: "Multiple Choice", value: "Option 4" },
    { label: "Dropdown", value: "Option 5" },
  ];
  const onSelect = (index, type) => {
    const updatedAnswer = question.answer.map((answer, answer_index) => ({
      ...answer,
      checked:
        type === "multiple"
          ? answer_index === index
          : answer_index === index
          ? !answer.checked
          : answer.checked,
    }));
    dispatch({
      type: UPDATE_QUESTION_ANSWER,
      payload: {
        id: question.id,
        answer: updatedAnswer,
      },
    });
  };
  const onAdd = (type) => {
    const newOption =
      type === "dropdown" ? { value: "" } : { checked: false, value: "" };
    const updatedAnswer = [...question.answer, newOption];
    dispatch({
      type: UPDATE_QUESTION_ANSWER,
      payload: {
        id: question.id,
        answer: updatedAnswer,
      },
    });
  };
  const onDelete = (index) => {
    const updatedAnswer = question.answer.filter(
      (value, answer_index) => answer_index !== index
    );

    dispatch({
      type: UPDATE_QUESTION_ANSWER,
      payload: {
        id: question.id,
        answer: updatedAnswer,
      },
    });
  };

  switch (question.type) {
    case "Short Answer":
      return (
        <section className="answer">
          <label>Answer</label>
          <Input
            id={question.id}
            type="dropdown"
            value={question.type}
            options={dropdownOptions}
          />
          <section className="questions-answer">
            <Input
              ariaLabel={"Question-answer"}
              ariaDescription={"Enter short answer."}
              id={question.id}
              type={"text"}
              placeholder={"Short answer text"}
              value={question.answer}
            />
          </section>
        </section>
      );
    case "Paragraph":
      return (
        <section className="answer">
          <label>Answer</label>
          <Input
            id={question.id}
            type="dropdown"
            value={question.type}
            options={dropdownOptions}
          />
          <section className="questions-answer">
            <Input
              ariaLabel={"Question-answer"}
              ariaDescription={"Enter long answer."}
              id={question.id}
              type={"text"}
              placeholder={"Long answer text"}
              value={question.answer}
            />
          </section>
        </section>
      );
    case "Checkboxes":
      return (
        <section className="answer">
          <label>Answer</label>
          <Input
            id={question.id}
            type="dropdown"
            value={question.type}
            options={dropdownOptions}
          />
          <Checkbox
            id={question.id}
            options={question.answer}
            onSelect={onSelect}
            onDelete={onDelete}
          ></Checkbox>
          <section className="add-option">
            <Button
              text={"ADD OPTION"}
              icon={AddIcon}
              onClick={onAdd}
              ariaLabel={"Add Answer"}
              ariaDescription={"Add checkbox answer"}
            ></Button>
          </section>
        </section>
      );
    case "Multiple Choice":
      return (
        <section className="answer">
          <label>Answer</label>
          <Input
            id={question.id}
            type="dropdown"
            value={question.type}
            options={dropdownOptions}
          />
          <MultipleOption
            options={question.answer}
            id={question.id}
            onSelect={onSelect}
            onDelete={onDelete}
          ></MultipleOption>
          <section className="add-option">
            <Button
              text={"ADD OPTION"}
              icon={AddIcon}
              onClick={onAdd}
              ariaLabel={"Add Answer"}
              ariaDescription={"Add multiple option answer"}
            ></Button>
          </section>
        </section>
      );
    case "Dropdown":
      return (
        <section className="answer">
          <label>Answer</label>
          <Input
            id={question.id}
            type="dropdown"
            value={question.type}
            options={dropdownOptions}
          />
          <Dropdown
            options={question.answer}
            id={question.id}
            onDelete={onDelete}
          ></Dropdown>
          <section className="add-option">
            <Button
              text={"ADD OPTION"}
              icon={AddIcon}
              onClick={() => onAdd("dropdown")}
              ariaLabel={"Add Answer"}
              ariaDescription={"Add dropdown answer"}
            ></Button>
          </section>
        </section>
      );
    default:
      return null;
  }
};

const Question = ({ question, total, index }) => {
  const dispatch = useDispatch();
  const removeQuestion = () => {
    dispatch({
      type: DELETE_QUESTION,
      payload: {
        id: question.id,
      },
    });
  };
  const moveUp = () => {
    dispatch({
      type: SWAP_QUESTION,
      payload: {
        id: question.id,
        type: -1,
      },
    });
  };
  const moveDown = () => {
    dispatch({
      type: SWAP_QUESTION,
      payload: {
        id: question.id,
        type: 1,
      },
    });
  };

  return (
    <section className="questions">
      <section className="question-short-answer">
        <section className="question-base">
          <section className="question">
            <label>Question</label>
            <Input
              ariaLabel={"Question"}
              ariaDescription={"Enter the question."}
              id={question.id}
              type={"base"}
              placeholder={"What do you want ask?"}
              value={question.question}
            />
          </section>
          <section className="divider"></section>
          {<RenderQuestionType question={question} />}
          {total > 1 && (
            <section className="question-actions">
              <label>
                {index + 1} of {total}
              </label>
              <section className="btns">
                <img
                  tabIndex={1}
                  src={MoveUp}
                  onClick={moveUp}
                  alt="MoveUp"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      moveUp();
                    }
                  }}
                ></img>
                <img
                  tabIndex={1}
                  src={MoveDown}
                  onClick={moveDown}
                  alt="MoveDown"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      moveDown();
                    }
                  }}
                ></img>
                <img
                  tabIndex={1}
                  src={Remove}
                  onClick={removeQuestion}
                  alt="Remove"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      removeQuestion();
                    }
                  }}
                ></img>
              </section>
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default Question;
