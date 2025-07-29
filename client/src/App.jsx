import React from 'react'
import Navbar from './Components/Navbar';
import Home from './Components/Home';

const App = () => {
 
   // <h1 className='text-3xl text-red-800'>This is App Component</h1>
   return(  
    <>
     <Navbar/>
     <Home/>
     </>
   )
};

export default App;