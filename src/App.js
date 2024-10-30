import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import { lazy, Suspense } from "react";
function App() {
  return (
    <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Product />} />
              </Routes>
          </Suspense>
        </Router>
    </div>
  );
}

export default App;
