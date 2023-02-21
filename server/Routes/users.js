const bll = require("../BLL/usersBLL");
const express = require("express");
const router = express.Router();
const checkAuth = require("../MiddleWares/checkAuth");

router.get("/", checkAuth, async (req, res) => {
  try {
    const users = await bll.getAllUsers();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  try {
    const user = await bll.getUserById(req.params.id);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:userId/:surveyId", checkAuth, async (req, res) => {
  try {
    const user = await bll.getUserById(req.params.userId);
    const survey = user.awaitingApproval.find((survey) =>
      survey._id.equals(req.params.surveyId)
    );
    res.send(survey);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await bll.login(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await bll.createUser(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateUser(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/requests/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateRequests(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/status/:surveyname", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateStatus(req.params.surveyname, req.body.status);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/manager/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateManager(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/deleteStatus/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteRequest(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:userId/:surveyId", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteFromArray(
      req.params.userId,
      req.params.surveyId
    );
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteUser(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/status/:userId", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteAllStatus(req.params.userId);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
