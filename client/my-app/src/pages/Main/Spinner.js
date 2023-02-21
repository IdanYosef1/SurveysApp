import Spinner from "react-bootstrap/Spinner";

function MainSpinner() {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default MainSpinner;
