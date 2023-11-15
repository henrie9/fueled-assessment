import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUESTION_TYPE,
  DELETE_QUESTION,
  UPDATE_QUESTION_ANSWER,
  SWAP_QUESTION,
  UPDATE_TITLE,
} from "../actions/actionType";

const getInitialAnswer = (type) => {
  switch (type) {
    case "Short Answer":
      return "";
    case "Long Answer":
      return "";
    case "Checkboxes":
      return [{ checked: false, value: "" }];
    case "Multiple Choice":
      return [
        { checked: false, value: "" },
        { checked: false, value: "" },
      ];
    case "Dropdown":
      return [{ value: "" }];
    default:
      return "";
  }
};

const initalState = [
  {
    id: uuidv4(),
    question: "",
    type: "Short Answer",
    answer: "",
  },
];

const dataReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      const newQuestion = {
        ...action.payload,
        id: uuidv4(), // Generate a unique ID using uuidv4()
      };
      return [...state, newQuestion];
    case UPDATE_QUESTION_TYPE:
      console.log(state, action.payload);
      const updatedQuestions = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            type: action.payload.type,
            answer: getInitialAnswer(action.payload.type),
          };
        }
        return item;
      });
      return updatedQuestions;
    case UPDATE_QUESTION:
      return state.map((question) =>
        question.id === action.payload.id
          ? {
              ...question,
              question: action.payload.question,
            }
          : question
      );
    case DELETE_QUESTION:
      const updated = state.filter(
        (question) => question.id !== action.payload.id
      );
      return updated;
    case UPDATE_QUESTION_ANSWER:
      const updatedQuestion = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            answer: action.payload.answer,
          };
        }
        return item;
      });
      return updatedQuestion;
    case SWAP_QUESTION:
      const currentIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const changedIndex =
        currentIndex + action.payload.type < 0 ||
        currentIndex + action.payload.type > state.length - 1
          ? currentIndex
          : currentIndex + action.payload.type;
      let newState = [...state];
      [newState[currentIndex], newState[changedIndex]] = [
        newState[changedIndex],
        newState[currentIndex],
      ];
      return newState;
    default:
      return state;
  }
};

const titleReducer = (state = "New Questionnaire", action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer,
  title: titleReducer,
});

export default rootReducer;
