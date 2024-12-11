import React, { useState } from 'react';
import { createNews } from '../../services/newsService'; 
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import PageHeader from '../Shared/PageHeader/PageHeader';

const formatDate = (date) => {
    return new Date(date).toISOString();
};

const CreateNews = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const initialValues = { title: '', description: '' };

    const submitHandler = async (values) => {
        const currentDate = formatDate(new Date());
        const newsData = { ...values, date: currentDate };

        try {
            await createNews(newsData);
            setSuccessMessage('News created successfully!');
            navigate('/');
        } catch (error) {
            setErrorMessage('Error creating news. Please try again.');
            console.error('Error creating news:', error);
        }
    };

    const { values, onChange, onSubmit } = useForm(submitHandler, initialValues);

    return (
        <div>
  <PageHeader name="News" endpoint="" />
            <div className="contact">
                <div className="container">
                    <div className="align-items-center">
                        <div className="col-md-4" />
                        <div className="contact-form">
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            <form id="newsForm" onSubmit={onSubmit}>
                                <div className="control-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="title" 
                                        placeholder="Title" 
                                        value={values.title} 
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div className="control-group">
                                    <textarea 
                                        className="form-control" 
                                        name="description" 
                                        placeholder="Description" 
                                        value={values.description} 
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div>
                                    <button className="btn" type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNews;
