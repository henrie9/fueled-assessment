import { ReactComponent as FueledEmblem } from "../../assets/svg/Fueled Emblem.svg";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_TITLE } from "../../redux/actions/actionType";
import Button from "../../components/Button/Button";
import "./Navbar.css";

const Navbar = () => {
  const { title } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <nav className="navbar-basic">
      <section className="fueled-emblem">
        <FueledEmblem />
      </section>
      <section className="navbar-title">
        <input
          ariaLabel={"Question-title"}
          ariaDescription={"Enter new question title."}
          value={title}
          onChange={(e) =>
            dispatch({ type: UPDATE_TITLE, payload: e.target.value })
          }
        />
      </section>
      <section className="login-btn">
        <Button text={"LOG IN"}></Button>
      </section>
    </nav>
  );
};

export default Navbar;
