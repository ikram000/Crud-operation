const Book = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        if (!body.BookName || !body.BookTitle || !body.Auther || !body.SellingPrice) {
            return res.status(400).json({ Message: "All fields are required", success: false });
        }

        const bookAdd = await Book.create(body);

        console.log("Book added:", bookAdd);

        return res.status(201).json({
            Message: "Data created successfully",
            success: true,
            Id: bookAdd?._id,
        });
    } catch (error) {
        console.error("Book add error:", error.message);
        return res.status(500).json({ Message: error.message, success: false });
    }
};

const handleBookListStoreController = async (req, res) => {
    try {
        const bookList = await Book.find({});

        return res.status(200).json({
            Message: "All books fetched successfully",
            success: true,
            TotalCount: bookList.length,
            BookList: bookList,
        });

    } catch (error) {
        console.error("Error fetching books:", error.message);
        return res.status(500).json({
            Message: "Error fetching books",
            success: false
        });
    }
};

const handlerBookDeleteController = async(req,res) =>{
    const body= req.body
    try {
        const deleted = await Book.findByIdAndDelete(body.id)
     // console.log('deleted', deleted);
        // if(deleted.length > 0){
         return res.json({
            Message: "Book deleted successfully",
            success: true,
           
        });
        // }
    } catch (error) {
         return res.status(500).json({ Message: error.message, success: false });
    }
}

module.exports = { handleBookStoreController, handleBookListStoreController,handlerBookDeleteController };
