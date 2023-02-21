import { MdArrowBackIosNew } from "react-icons/md";

function ButtonBack({ func }) {
  return (
    <button className="button-back" onClick={func}>
      <MdArrowBackIosNew className="arrow-back" />
    </button>
  );
}

export default ButtonBack;
