const express = require("express");

const router = express.Router();

const Companies = require("../models/company");

//test
router.get("/test", (req, res) => res.send("Company routes is working"));

router.post("/", (req, res) => {
    Company.create(req.body)
    .then(() => res.json({msg:"Company added successfully"}))
    .catch(()=> res.status(400).json({msg:"Company adding failed"}));
});

router.get("/", (req, res) => {
    Company.find()
    .then((companies) => res.json(companies))
    .catch(()=> res.status(400).json({msg:"No companies found"}));
});

router.get("/:id", (req, res) => {
    Company.findById(req.params.id)
    .then((companies) => res.json(companies))
    .catch(()=> res.status(400).json({msg:"cannot find this  companies"}));
});

router.put("/:id",(req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body)
   .then(() => res.json({msg:"Update successfully"}))
   .catch(() => res.status(400).json({msg: "Update failed"}));

});

router.delete("/:id", (req, res) => {
    Company.findByIdAndDelete(req.params.id)
   .then(() => res.json({msg:"Delete successfully"}))
   .catch(() => res.status(400).json({msg: "Delete failed"}));
});

module.exports = router;