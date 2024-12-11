import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modals/Modal/Modal';
import PageHeader from '../Shared/PageHeader/PageHeader';

export default function About() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const service = {
        title: 'About Us - Detailed Information',
        description: 'For over 25 years, our company has been at the forefront of the industry, providing unparalleled service and expertise. We pride ourselves on our commitment to excellence and customer satisfaction.',
        more: 'Our mission is to deliver outstanding results while building lasting relationships with our clients. We continuously strive to innovate and improve our services to meet the evolving needs of our customers. Our experienced team is dedicated to ensuring that every project is executed to the highest standards. From initial consultation to project completion, we work closely with our clients to achieve their goals and exceed their expectations.'
    };

    return (
        <div>
  <PageHeader name="About Us" endpoint="about" />
            <div className="about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="about-img">
                                <img src="img/about.jpg" alt="About Us" />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className="section-header text-left">
                                <p>Learn About Us</p>
                                <h2>25 Years Experience</h2>
                            </div>
                            <div className="about-text">
                                <p>
                                    We are a trusted company with over 25 years of experience in delivering exceptional services.
                                </p>
                                <p>
                                    Our team of experts is dedicated to providing top-notch quality and service. We value customer satisfaction above all else.
                                </p>
                                <a className="btn" onClick={openModal}>
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                service={service}
            />
        </div>
    );
}
