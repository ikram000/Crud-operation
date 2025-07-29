const express = require("express");
const { handleBookStoreController, handleBookListStoreController,handlerBookDeleteController } = require("../controller/book.controller");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListStoreController);
router.post("/deletebook", handlerBookDeleteController);

module.exports = router;
