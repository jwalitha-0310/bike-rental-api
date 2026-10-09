const express = require("express");
const router = express.Router();
const b=require("../controllers/bikeController");

router.get("/available", b.getAvailableBikes);

router.get("",b.getBikes);

router.get("/:id", b.getBike);

router.post("", b.createBike);

router.put("/:id",b.updateBike);

router.delete("/:id",b.deleteBike);

module.exports = router;