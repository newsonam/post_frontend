import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ErrorNotice from "../components/misc/ErrorNotice";
import './style.css';
function ShowSinglePost() {
    let { id } = useParams();
    let navigate = useNavigate();
    console.log(id);
    const [postdata, setPostData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const getPostData = async () => {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();
            setPostData(data);
        }

        getPostData();
        // eslint-disable-next-line
    }, [id]);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/posts/${id}`, { method: "delete" });
        const resultStatus = await res.status;
        if (resultStatus === 201) {
            setError("Post data deleted");
            navigate('/show');
        }
        else {
            setError("data not saved");
        }

    }
    return (
        <div className='details-wrapper'>
            {Object.values(postdata).map((item) => {
                return (
                    <div class="card" style={{width: '18rem',height:'14rem',marginTop:'2rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text">{item.content}</p>

                            <div className='d-flex align-items-center justify-content-center gap-3 pt-4'>
                                <Link
                                    to={`/edit/${item._id}`}

                                >
                                    <button className='btn btn-danger' >Edit</button>

                                </Link>
                                <Link
                                    to={`/delete/${item._id}`}

                                >
                                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                )

            })}
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

        </div>
    );
}

export default ShowSinglePost;

