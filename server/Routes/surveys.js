const bll = require("../BLL/surveysBLL");

const express = require("express");
const checkAuth = require("../MiddleWares/checkAuth");

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  try {
    const surveys = await bll.getAllSurveys();
    res.send(surveys);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  try {
    const survey = await bll.getSurveyById(req.params.id);
    res.send(survey);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const data = await bll.createSurvey(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateSurvey(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteSurvey(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
