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
        console.log("booklist",bookList);
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
    const {id}= req.params
    // console.log("body.data", body);
    try {
        const deleted = await Book.findByIdAndDelete(id)
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

const handleBookUpdateController= async (req,res)=>{
    
    try {
        const {id} = req.params
        const body= req.body

        console.log("updating::::::",id,"\n",body);
        const updating= await Book.findByIdAndUpdate(id,body,{new:true});
        console.log("updating",updating);

        return res.json({
            Message:"Book Updated Successfully",
            success:true,
    })
    } catch (error) {
        return res.status(500).json({ Message: "updating error", success: false });
    }
};
module.exports = { handleBookStoreController, handleBookListStoreController,handlerBookDeleteController,handleBookUpdateController };
