const express = require("express");

const router = express.Router();

const Items = require("../models/item");

//test
router.get("/test", (req, res) => res.send("item routes is working"));

router.post("/", (req, res) => {
    Item.create(req.body)
    .then(() => res.json({msg:"Item added successfully"}))
    .catch(()=> res.status(400).json({msg:"item adding failed"}));
});

router.get("/", (req, res) => {
    Item.find()
    .then((items) => res.json(items))
    .catch(()=> res.status(400).json({msg:"No items found"}));
});

router.get("/:id", (req, res) => {
    Item.findById(req.params.id)
    .then((items) => res.json(items))
    .catch(()=> res.status(400).json({msg:"cannot find this  items"}));
});

router.put("/:id",(req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
   .then(() => res.json({msg:"Update successfully"}))
   .catch(() => res.status(400).json({msg: "Update failed"}));

});

router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
   .then(() => res.json({msg:"Delete successfully"}))
   .catch(() => res.status(400).json({msg: "Delete failed"}));
});

module.exports = router;