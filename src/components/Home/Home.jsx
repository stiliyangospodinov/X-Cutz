import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import VideoModal from '../Shared/Modals/VideoModal/VideoModal';
import NewsFeed from '../NewsFeed/NewsFeed';

export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="hero">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="hero-text animated fadeInLeft">
                            <h1>Welcome to the official site of X Cutz!</h1>
                            {isAuthenticated ? (
                                <NewsFeed />
                            ) : (
                                <>
                                    <p>At X Cutz, we believe that a good haircut can change your whole day. Our team of professional barbers are here to offer you the best service and help you look great. Whether you want a classic hairstyle, a modern updo, or a simple refresh, we've got you covered. Make an appointment today and see for yourself!</p>
                                    <p>If you want to rate our barbers, please log in or register</p>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link to="/login" className="btn">Login</Link>
                                        <Link to="/register" className="btn">Register</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 d-none d-md-block">
                        <div className="hero-image">
                            <img src="img/ivan_works.png" alt="Hero Image" />
                        </div>
                    </div>
                </div>

                {!isAuthenticated && ( 
                    <button
                        type="button"
                        className="btn-play"
                        onClick={openModal} 
                    >
                        <span />
                    </button>
                )}
            </div>

            <VideoModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                content={{
                    type: 'video',
                    src: 'https://www.youtube.com/embed/4grOZGIo2TM'
                }}
            />
        </div>
    );
}
