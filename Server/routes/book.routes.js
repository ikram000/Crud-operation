const express = require("express");
const { handleBookStoreController, handleBookListStoreController,handlerBookDeleteController } = require("../controller/book.controller");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListStoreController);
router.delete("/deletebook/:id", handlerBookDeleteController);

module.exports = router;
