const express = require("express");
const { handleBookStoreController, handleBookListStoreController,handlerBookDeleteController, handleBookUpdateController } = require("../controller/book.controller");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/booklists", handleBookListStoreController);
router.delete("/deletebook/:id", handlerBookDeleteController);
router.put("/updatebook/:id", handleBookUpdateController);


module.exports = router;
