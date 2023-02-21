import axios from "axios";

const config = (token) => {
  const obj = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return obj;
};

const getAll = (url, token) => axios.get(url, config(token));

const getById = (url, id, token) => axios.get(`${url}/${id}`, config(token));

const getAwaitingApprovalById = (url, userId, surveyId, token) =>
  axios.get(`${url}/${userId}/${surveyId}`, config(token));

const login = (url, obj, token) => axios.post(`${url}/login`, obj, config(token));

const createData = (url, obj, token) => axios.post(url, obj, config(token));

const updateData = (url, id, obj, token) =>
  axios.put(`${url}/${id}`, obj, config(token));

const updateRequests = (url, id, obj, token) =>
  axios.put(`${url}/requests/${id}`, obj, config(token));

const updateStatus = (url, surveyname, status, token) =>
  axios.put(`${url}/status/${surveyname}`, status, config(token));

const updateManager = (url, id, obj, token) =>
  axios.put(`${url}/manager/${id}`, obj, config(token));

const deleteFromArray = (url, userId, surveyId, token) =>
  axios.put(`${url}/${userId}/${surveyId}`, undefined, config(token));

const deleteStatus = (url, userId, arr, token) =>
  axios.put(`${url}/deleteStatus/${userId}`, arr, config(token));

const deleteAllStatus = (url, userId, token) =>
  axios.delete(`${url}/status/${userId}`, config(token));

const deleteData = (url, id, token) => axios.delete(`${url}/${id}`, config(token));

const deleteAll = (url, id, token) => axios.delete(`${url}/${id}/1`, config(token));

export {
  getAll,
  getById,
  getAwaitingApprovalById,
  login,
  createData,
  updateData,
  updateRequests,
  deleteData,
  deleteAll,
  updateStatus,
  updateManager,
  deleteFromArray,
  deleteStatus,
  deleteAllStatus,
};
