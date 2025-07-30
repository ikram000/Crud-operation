import React, { useState, useEffect } from 'react';
import { bookBaseUrl } from '../axiosInstance'; // Make sure your axios instance is configured
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import axios from 'axios';

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: '',
    BookTitle: '',
    Auther: '',
    SellingPrice: '',
    PublishDate: '',
  });

  const [bookList, setBookList] = useState([]);
  const [isupdating, setIsupdating] = useState(null); // store book ID instead of boolean

  // Fetch all books
  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get('/booklists');
      setBookList(data?.BookList || []);
    } catch (error) {
      console.error('Get all books error:', error);
    }
  };

  // Fetch books on mount
  useEffect(() => {
    getAllbookList();
  }, []);

  // Handle form input change
  const handFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add / Update Submit
  const handleSubmit = async () => {
    const { BookName, BookTitle, Auther, SellingPrice } = bookForm;

    if (!BookName || !BookTitle || !Auther || !SellingPrice) {
      alert("All fields are required");
      return;
    }

    try {
      let response;
      if (isupdating) {
        response = await bookBaseUrl.put(`/updatebook/${isupdating}`, bookForm);
      } else {
        response = await bookBaseUrl.post("/addbook", bookForm);
      }

      if (response?.data?.success) {
        alert(response.data.Message || "Operation successful");
        setBookForm({
          BookName: '',
          BookTitle: '',
          Auther: '',
          SellingPrice: '',
          PublishDate: '',
        });
        setIsupdating(null);
        getAllbookList();
      }

    } catch (error) {
      console.error('Submit error:', error);
      alert("Something went wrong");
    }
  };

  // Populate form for editing
  const handleEdit = (book) => {
    setBookForm({
      BookName: book?.BookName,
      BookTitle: book?.BookTitle,
      Auther: book?.Auther,
      SellingPrice: book?.SellingPrice,
      PublishDate: book?.PublishDate?.split("T")[0] || '',
    });
    setIsupdating(book._id);
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/book/deletebook/${id}`);
      getAllbookList();
      alert("Book deleted");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete");
    }
  };

  return (
    <div className='w-full px-5 py-5 min-h-screen'>
      <h1 className="text-xl font-bold mb-4">Book Management</h1>

      {/* Book Form */}
      <div className='w-full grid grid-cols-5 gap-3 my-4'>
        {[
          { label: 'Book Name', name: 'BookName', type: 'text' },
          { label: 'Book Title', name: 'BookTitle', type: 'text' },
          { label: 'Auther', name: 'Auther', type: 'text' },
          { label: 'Selling Price', name: 'SellingPrice', type: 'number' },
          { label: 'Publish Date', name: 'PublishDate', type: 'date' },
        ].map(({ label, name, type }) => (
          <div key={name} className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>{label}</label>
            <input
              type={type}
              placeholder={label}
              name={name}
              value={bookForm[name]}
              onChange={handFormChange}
              className='border border-gray-300 rounded px-2 h-8 text-gray-800'
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className='w-full flex justify-end mb-8'>
        <button
          className='bg-gray-700 text-white h-9 px-6 rounded-md hover:bg-gray-800'
          onClick={handleSubmit}
        >
          {isupdating ? "Update" : "Submit"}
        </button>

        {isupdating && (
          <button
            className='ml-4 bg-red-500 text-white h-9 px-4 rounded-md hover:bg-red-600'
            onClick={() => {
              setIsupdating(null);
              setBookForm({
                BookName: '',
                BookTitle: '',
                Auther: '',
                SellingPrice: '',
                PublishDate: '',
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Book Table */}
      <div className='w-full overflow-x-auto'>
        <table className='w-full bg-white divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Title</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Auther</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Selling Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Publish Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Action</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {bookList.length > 0 ? (
              bookList.map((book, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-6 py-3'>{book?.BookName}</td>
                  <td className='px-6 py-3'>{book?.BookTitle}</td>
                  <td className='px-6 py-3'>{book?.Auther}</td>
                  <td className='px-6 py-3'>₹{book?.SellingPrice}</td>
                  <td className='px-6 py-3'>
                    {book?.PublishDate
                      ? new Date(book.PublishDate).toLocaleDateString()
                      : '—'}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="w-20 flex justify-center gap-5">
                      <div className="h-5 w-8 flex justify-center items-center bg-red-100 text-red-600 cursor-pointer">
                        <span onClick={() => handleDelete(book?._id)}><MdDelete /></span>
                      </div>
                      <div className="h-5 w-8 flex justify-center items-center bg-green-100 text-green-600 cursor-pointer">
                        <span onClick={() => handleEdit(book)}><FaPen /></span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='text-center px-6 py-4 text-gray-500'>
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
