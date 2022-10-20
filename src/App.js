import React from "react";
import "./App.css";

import { HomePage, NotFoundPage, StudentPage } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudenProvider } from "./context/studentContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="app">
      <StudenProvider>
        <Router>
          <Routes>
            <Route path="react-app/" element={<HomePage />} />
            <Route path="/new" element={<StudentPage />} />
            <Route path="/update/:code" element={<StudentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster
          position="top-center"
          containerStyle={{
            position: "none",
          }}
        />
      </StudenProvider>
    </div>
  );
};

export default App;
