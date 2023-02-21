import { useEffect, useState } from "react";

function Request({ request, callBack, removeFromArr, isAll, clickedAll }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(isAll);
  }, [isAll]);

  const bool = clickedAll ? true : isClicked && isAll;

  useEffect(() => {
    setIsClicked(bool);
  }, [bool]);

  const handleClick = (e) => {
    if (e.target.checked) {
      callBack(request._id);
    } else {
      removeFromArr(request._id);
    }
  };

  const color =
    request.requestStatus === "aprroved"
      ? "#36EC0D"
      : request.requestStatus === "pendingApproval"
      ? "#006DF8"
      : "#F12413";

  return (
    <tr style={{ background: color }}>
      <td className="td-request">
        {" "}
        <input
          type="checkbox"
          onClick={handleClick}
          onChange={(e) => setIsClicked(e.target.checked)}
          checked={isClicked}
        />
      </td>
      <td className="td-request">{request.surveyname}</td>
      <td className="td-request">{request.requestStatus}</td>
      <td className="td-request">{request.uploadDate.slice(0, 10)}</td>
    </tr>
  );
}

export default Request;
