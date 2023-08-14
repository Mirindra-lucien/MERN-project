import React from 'react';
import {useState, createRef} from 'react';

const Create = () => {
    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        email: '',
        pass: '',
        city: '',
        school: '',
        photo: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = (name === "photo") ? e.target.files[0] : e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const sendForm = async (formd) => {
        const config = {
            method: 'post',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(formd)
        }
        try {
            let response = await fetch('http://localhost:3000/account/send', config);
            alert("bien");
        } catch (error) {
            
        }
    }

    const handleSubmit = (e) => {
        const formData = new FormData();
        inputs.name && formData.append("name", inputs.name);
        inputs.email && formData.append("email", inputs.email);
        inputs.username && formData.append("username", inputs.username);
        inputs.pass && formData.append("pass", inputs.city);
        inputs.birthday && formData.append("birthday", inputs.birthday);
        inputs.school && formData.append("school", inputs.school);
        inputs.photo && formData.append("photo", inputs.photo);
        const gui = {};
        for(let nom in inputs) {
            gui[nom] = inputs[nom];
        }
        sendForm(gui);
    }

    return <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor='name'>Your name</label>
            <input type="text" name="name" onChange={handleChange} />
            <label htmlFor='email'>Your email</label>
            <input type="email" name="email" onChange={handleChange} />
            <label htmlFor='username'>Your pseudo</label>
            <input type="text" name="username" onChange={handleChange} />
            <label htmlFor='pass'>Password</label>
            <input type="password" name="pass" onChange={handleChange} />
            <label htmlFor='pass1'>Confirm password</label>
            <input type="password" name="pass1" onChange={handleChange} />
            <label htmlFor='city'>City</label>
            <input type="text" name="city" onChange={handleChange} />
            <label htmlFor='birthday'>Birthday</label>
            <input type="date" name="birthday" onChange={handleChange} />
            <label htmlFor='school'>School</label>
            <input type="text" name="school" onChange={handleChange} />
            <input type="file" name="photo" onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    </div>
}

export default Create;