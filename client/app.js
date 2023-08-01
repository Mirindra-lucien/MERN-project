import React from "react";
import Hello from "./components/hello";
import {hot} from "react-hot-loader";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Hello/>}/>
        </Routes>
    </BrowserRouter>
}

export default hot(module)(App);