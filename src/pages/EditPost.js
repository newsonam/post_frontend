import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ErrorNotice from "./ErrorNotice";

import './style.css';


function EditPost() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [data, setData] = useState({
        title: '',
        content: '',
    })
    const [error, setError] = useState();

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        const getPostData = async () => {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();
            setData({
                ...data,
                title: data.data.title,
                content: data.data.content,

            });
        }

        getPostData();
    }, [id]);

    const updateData = async (e, pid) => {
        e.preventDefault();
        const { title, content } = data
        const response = await fetch(`/api/posts/${pid}`, {
            method: 'Post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, content })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError("data updated");
            alert('data updated');
            navigate('/show');
        }
        else {
            setError("error");
        }
    }

    return (
        <div className="create-wrapper">

            <form className="edit-form">
                <h1 className=" mt-5 mb-4 edit-text">Edit Post</h1>
                <div className="mb-3 text-left">
                    <label for="exampleInputTitle" className="form-label d-flex justify-content-start">Title</label>
                    <input type="text" name="title" className="form-control" id="exampleInputTitle" aria-describedby="emailHelp" value={data.title} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDesc" className="form-label d-flex justify-content-start">Content</label>
                    <input type="text" name="content" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp" value={data.content} onChange={handleInputs} />
                </div>

                <button className="btn btn-primary" onClick={(e) => updateData(e, id)} >UPDATE</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

            </form>
        </div>
    );
}

export default EditPost;
