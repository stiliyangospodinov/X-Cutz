import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices } from '../../services/barberShopService';
import Modal from '../Shared/Modals/Modal/Modal';
import LogRegSection from '../Shared/LogRegSection/LogRegSection'; 

import AuthContext from '../../contexts/authContext';

const Service = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getAllServices();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const openModal = (service) => {
        setSelectedService(service);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedService(null);
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Service</h2>
                        </div>
                        <div className="col-12">
                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="service">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Our Salon Services</p>
                        <h2>Best Salon and Barber Services for You</h2>
                    </div>
                    <div className="row">
                        {services.map((service) => (
                            <div className="col-lg-4 col-md-6" key={service._id}>
                                <div className="service-item">
                                    <div className="service-img">
                                        <img src={service.img} alt={service.title} />
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    {isAuthenticated && (
                                        <a className="btn" onClick={() => openModal(service)}>
                                            Learn More
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!isAuthenticated && (
                        <LogRegSection
                            text="If you want to learn more about our services please log in to your account"
                        />
                    )}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                service={selectedService}
            />
        </div>
    );
};

export default Service;
