import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../../assets/svg/+.svg";
import Question from "../../components/Question/Question";
import Button from "../../components/Button/Button";
import { ADD_QUESTION } from "../../redux/actions/actionType";

const Content = () => {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state) => state);

  const onAddClick = () => {
    dispatch({
      type: ADD_QUESTION,
      payload: {
        question: "",
        type: "Short Answer",
        answer: "",
      },
    });
  };

  const onSaveClick = () => {
    const totalData = { title, data };
    console.log(totalData);
  };

  return (
    <main className="content">
      <section className="content-questions">
        {data.map((question, index) => (
          <Question
            key={index}
            index={index}
            total={data.length}
            question={question}
          ></Question>
        ))}
      </section>
      <section className="content-btns">
        <section className="btn-add">
          <Button
            ariaLabel={"Add Question"}
            ariaDescription={"Add Question"}
            text={"ADD QUESTION"}
            icon={AddIcon}
            onClick={onAddClick}
          ></Button>
        </section>
        <section className="btn-save">
          <Button
            ariaLabel={"Save & Share"}
            ariaDescription={"Save questions"}
            text={"SAVE & SHARE"}
            onClick={onSaveClick}
          ></Button>
        </section>
      </section>
    </main>
  );
};

export default Content;
