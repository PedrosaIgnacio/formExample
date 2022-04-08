import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { IndexPage } from './components/Index/IndexPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<IndexPage />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>

  );
}

export default App;
