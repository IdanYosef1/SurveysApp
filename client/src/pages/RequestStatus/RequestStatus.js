import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteStatus, getById } from "../../axios";
import ModalBox from "../../Components/Modals/ModalBox";
import TableRequests from "../../Components/Table/TableRequests";

const urlUsers = process.env.REACT_APP_USERS_URL;

function RequestStatus() {
  const [bool, setBool] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestsIds, setRequestsIds] = useState([]);
  const [clickedAll, setClickedAll] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    async function getUser() {
      try {
        const data = (await getById(urlUsers, store.userId, store.token)).data;
        setRequests(data.requestStatus);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [bool, store.token, store.userId]);

  const setRequestStatus = () => {
    setBool(!bool);
  };

  const deleteStatuses = async () => {
    try {
      await deleteStatus(urlUsers, store.userId, requestsIds, store.token);
      setRequestStatus();
      if (requestsIds.length === 1) {
        setClickedAll(false);
      }
      setRequestsIds([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="col-lg-6 container mt-3">
        <ModalBox
          disabled={requestsIds.length === 0}
          callback={deleteStatuses}
          exitOrDelete={"delete"}
          buttonName={"deleteAll"}
          buttonStyle={
            requestsIds.length === 0 ? "disabledStyle" : "enabledStyle"
          }
        />

        <hr className="hr-main" />
        <TableRequests
          requestsIds={requestsIds}
          setRequestsIds={setRequestsIds}
          requests={requests}
          clickedAll={clickedAll}
          setClickedAll={setClickedAll}
        />
      </div>
    </div>
  );
}

export default RequestStatus;
