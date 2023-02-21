const bll = require("../BLL/answeringsBLL");
const express = require("express");
const router = express.Router();
const checkAuth = require("../MiddleWares/checkAuth");

router.get("/", checkAuth, async (req, res) => {
  try {
    const answerings = await bll.getAllAnswerings();
    res.send(answerings);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  try {
    const answering = await bll.getAnsweringById(req.params.id);
    res.send(answering);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await bll.createAnswering(req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.updateAnswering(req.params.id, req.body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteAnswering(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id/:num", checkAuth, async (req, res) => {
  try {
    const data = await bll.deleteFromAllAnswering(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
