import React from "react";
import Hello from "./components/hello";
import Layout from "./layout";
import {hot} from "react-hot-loader";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/client/" element={<Layout/>}>
                <Route path="home" element={<Hello/>}/>
                <Route path="file" element={<Hello/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default hot(module)(App);