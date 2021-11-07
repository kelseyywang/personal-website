import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './components/About';
import Home from './components/Home';
import Contact from "./components/Contact";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App ><Home /></App>} />
        <Route path="about" element={<App ><About /></App>} />
        <Route path="contact" element={<App ><Contact /></App>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
