import React, {useState, createRef} from 'react';

const Fileup = () => {
    const [fields, setFields] = useState({
        nom: '',
        prenom: '',
        filename: "no file choosen"
    });
    const [image, setImage] = useState("");
    const imageRef = createRef();
    const handleChange = (elmt) => {
        const name = elmt.target.name;
        const value = elmt.target.value;
        setFields((ph) => ({...ph, [name]: value}));
    }
    const handleFile = async () => {
        const formData = new FormData();
        for(let nom in fields) {
            formData.append(nom, fields[nom]);
        }
        formData.append("photo", imageRef.current.files[0]);
        try {
            const res = await fetch('http://localhost:3000/file', {
                method: "post",
                body: formData
            });
            console.log(await res.json());
        } catch (error) {
            console.log("tsa mety");
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFile();
    }

    const handleImage = (e) => {
        e.preventDefault();
        const im = document.getElementById("file");
        im.click();
    }
    const handleChangeFile = (e) => {
        e.preventDefault();
        const img = e.target.files[0];
        setFields((values) => ({...values, ["filename"]: img.name}));
        img && setImage(URL.createObjectURL(img));
    }
    return <>
        <form onSubmit={handleSubmit} method="post">
            <label htmlFor='nom'>Nom</label>
            <br/>
            <input type="text" name="nom" onChange={handleChange} />
            <br/>
            <label htmlFor='prenom'>Prenom</label>
            <br/>
            <input type="text" name="prenom" onChange={handleChange} />
            <br/>
            <div style={{width: "300px", height: "300px", border: "dashed"}} onClick={handleImage}>
                {
                    image && <img src={image} alt="photo"
                    style={{width: "300px", height: "300px", objectFit: "cover", objectPosition: "0px 0px"}} />
                }
            </div>
            <label htmlFor='photo'>{fields.filename}</label>
            <input id="file" type="file" name="filename" onChange={handleChangeFile} ref={imageRef} hidden/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    </>
}

export default Fileup;