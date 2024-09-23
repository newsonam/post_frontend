import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css';

function ShowPost() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const getPostData = async () => {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setData(data.data);
        }

        getPostData();

    }, [refresh]);

    const deleteData = async (id) => {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'delete'
        });
        const status = await response.status;
        if (status === 201) {
            setRefresh(!refresh);
            window.alert("Post data deleted");
            

        }
        else {
            window.alert("error");
        }
    }
    return (
        <div className="show-wrapper">
            <h2 className="mt-5 font-bold pt-4">Post Details</h2>

            <table className="container table table-info table-bordered w-75">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="w-25 ">S.No.</th>
                        <th scope="col" className="w-25">Title</th>
                        <th scope="col" className="w-25">Content</th>
                        <th scope="col" className="w-25">Timestamp</th>
                        <th scope="col" className="w-25">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td key={item._id}>{index + 1}</td>
                                <td key={item._id}>{item.title}</td>
                                <td key={item._id}>{item.content}</td>
                                <td key={item._id}>{item.timestamp}</td>
                                <td key={item._id}>
                                    <div className="d-flex gap-2 justify-content-center flex-shrink ">
                                        <Link
                                            to={`/post/${item._id}`}

                                        >
                                            <button className="btn btn-primary">View</button>
                                        </Link>
                                        <Link
                                            to={`/edit/${item._id}`}

                                        >
                                            <button className="btn btn-primary">Edit</button>
                                        </Link>
                                        <button className="btn btn-primary" onClick={() => deleteData(item._id)}>Delete</button>
                                    </div>

                                </td>
                            </tr>
                        );
                    })}


                </tbody>
            </table>


        </div>
    );
}

export default ShowPost;

