import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import AuthOptions from './auth/AuthOptions';


function Header() {
    return (
        <div className="header">
            <div className='imgtitle'>

                <h4>Post Management System</h4>
            </div>
            <div className='links'>
                <Link
                    to="/home"
                    className='link'
                >
                    Home
                </Link>
                <Link
                    to="/create"
                    className='link'
                >
                    Create Post
                </Link>

                <Link
                    to="/show"
                    className='link'

                >
                    Show Post
                </Link>
             
                <AuthOptions/>
            </div>

        </div>
    );
}

export default Header;
