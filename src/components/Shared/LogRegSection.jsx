
import React from 'react';
import { Link } from 'react-router-dom';
import './logRegSection.css'; 

const LogRegSection = ({ text }) => {
    return (
        <div className="log-reg">
            <p>{text}</p>
            <div className="log-reg-buttons">
                <Link
                    to="/login"
                    className="btn"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="btn"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LogRegSection;
