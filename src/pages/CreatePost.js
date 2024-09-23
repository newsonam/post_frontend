import React from 'react';
import { useState } from "react";
// import axios from 'axios';
import './style.css';
import { useNavigate } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";

function CreatePost() {
    let navigate = useNavigate();
    const [data, setData] = useState({
        title: '',
        content: '',
       
    })
    const [error, setError] = useState();

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    
    const postData = async (e) => {
        // setMain("hello");
        e.preventDefault();
        const { title, content } = data;
        const response = await fetch('/api/posts', {
            method: "Post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, content })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError('data saved successfully');
            navigate('/show');
        }
        else {
            setError('plz fill the data successfully');
            setData({});
        }
    }



    return (
        <div className="create-wrapper">

            <form method="post" className="create-form">
                <h1 className="mt-5 mb-5 create-text">Create Post</h1>
                <div className="mb-3 text-left">
                    <label for="exampleInputDesc" className="form-label d-flex justify-content-start">Title</label>
                    <input type="text" name="title" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp" value={data.title} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDate" className="form-label d-flex justify-content-start">Content</label>
                    <input type="text" name="content" max={20} className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={data.content} onChange={handleInputs} />

                </div>
                <button type="submit" name="submit" value="submit" className="btn btn-primary" onClick={postData} >POST</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            </form>


        </div>
    );
}

export default CreatePost;
