import React, { useState, useEffect } from 'react';
import { bookBaseUrl } from '../axiosInstance';

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: '',
    BookTitle: '',
    Auther: '',
    SellingPrice: '',
    PublishDate: '',
  });

  const [bookList, setBookList] = useState([]);

  // Fetch all books
  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get('booklists');
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

  // Submit form
  const handleSubmit = async () => {
    try {
      const { BookName, BookTitle, Auther, SellingPrice } = bookForm;

      if (!BookName || !BookTitle || !Auther || !SellingPrice) {
        alert("All fields are required");
        return;
      }

      const { data } = await bookBaseUrl.post('/addbook', bookForm);

      if (data?.success) {
        alert(data?.Message);
        setBookForm({
          BookName: '',
          BookTitle: '',
          Auther: '',
          SellingPrice: '',
          PublishDate: '',
        });
        getAllbookList(); // Refresh book list
      }

      console.log(data);
    } catch (error) {
      console.error('Submit error:', error);
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

      {/* Submit Button */}
      <div className='w-full flex justify-end mb-8'>
        <button
          className='bg-gray-700 text-white h-9 px-6 rounded-md hover:bg-gray-800'
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
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
                  <td className='px-6 py-3'>Action</td>
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
