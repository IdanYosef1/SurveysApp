import { Table } from "react-bootstrap";
import { useState } from "react";
import Request from "./Request";

function TableRequests({
  requestsIds,
  setRequestsIds,
  requests,
  clickedAll,
  setClickedAll,
}) {
  const [isAll, setIsAll] = useState(false);

  const handleClick = (e) => {
    const arr = [];
    if (e.target.checked) {
      requests.forEach((request) => {
        arr.push({ _id: request._id });
      });
    }
    setRequestsIds(arr);
    setIsAll(e.target.checked);
  };

  const handleChange = (e) => {
    setClickedAll(e.target.checked);
  };

  const addIdToArr = (id) => {
    setRequestsIds([...requestsIds, { _id: id }]);
  };

  const removeFromArr = (id) => {
    const index = requestsIds.findIndex((obj) => obj._id === id);
    if (index !== -1) {
      if (requestsIds.length === requests.length) {
        setClickedAll(false);
      }
      const newArr = [...requestsIds];
      newArr.splice(index, 1);
      setRequestsIds(newArr);
    }
  };

  const showRequests = requests.map((request) => {
    return (
      <Request
        key={request._id}
        isAll={isAll}
        clickedAll={clickedAll}
        request={request}
        callBack={addIdToArr}
        removeFromArr={removeFromArr}
      />
    );
  });

  return (
    <Table striped size="sm" className="table">
      <thead>
        <tr className="tr-head-request">
          <th className="th-request">
            <input
              type="checkbox"
              onClick={handleClick}
              onChange={handleChange}
              checked={clickedAll}
              disabled={requests.length === 0 ? true : false}
            />
          </th>
          <th className="th-request">Survey Name</th>
          <th className="th-request">Status</th>
          <th className="th-request">Date of request</th>
        </tr>
      </thead>
      <tbody>{showRequests}</tbody>
    </Table>
  );
}

export default TableRequests;
