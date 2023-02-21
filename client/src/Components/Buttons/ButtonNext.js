import { MdArrowForwardIos } from "react-icons/md";

function ButtonNext({ func }) {
  return (
    <button className="button-next" onClick={func}>
      <MdArrowForwardIos className="arrow-next" />
    </button>
  );
}

export default ButtonNext;
