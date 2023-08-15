import React from "react";

const Hello = () => {
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/doc/64da524bc70f5b9c39172422");
            const blob = await res.blob();
            let url = URL.createObjectURL(blob);
            let el = document.createElement("a");
            el.href = url;
            el.download = "" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
            el.click();
            console.log(blob);
        } catch (error) {
            alert("no");
        }
    }
    return <div>
        <button onClick={handleClick}>Download</button>
    </div>
}

export default Hello;