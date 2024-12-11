import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteBarber, getBarberById } from '../../services/barberShopService';
import AuthContext from '../../contexts/authContext';
import PageHeader from '../Shared/PageHeader/PageHeader';

const DeleteBarber = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [barber, setBarber] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchBarber = async () => {
            try {
                const barberData = await getBarberById(id);
                setBarber(barberData);
            } catch (error) {
                console.error('Error fetching barber:', error);
            }
        };

        fetchBarber();
    }, [id]);

    const handleDelete = async () => {
        try {
            if (!isAuthenticated) {
                setErrorMessage('You need to be logged in to delete a barber.');
                return;
            }
            await deleteBarber(id);
            setSuccessMessage('Barber deleted successfully!');
            navigate('/team');
        } catch (error) {
            setErrorMessage(`Error deleting barber: ${error.message}`);
            console.error('Error deleting barber:', error);
        }
    };

    if (!barber) {
        return <p>Loading...</p>;
    }

    return (
        <div>
  <PageHeader name="Barbers" endpoint="team" />
            <div className="contact">
                <div className="container">
                    <div className="align-items-center">
                        <div className="col-md-4" />
                        <div className="contact-form">
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            <div className="team-item">
                                <div className="team-img">
                                    <img src={barber.photo} alt="Barber" style={{ maxWidth: '100%' }} />
                                </div>
                                <div className="team-text">
                                    <h2>{barber.name}</h2>
                                    <p>{barber.title}</p>
                                    <p>{barber.description}</p>
                                </div>
                            </div>
                            <button className="btn" onClick={handleDelete} style={{ marginRight: '10px' }}>
                                Confirm Delete
                            </button>
                            <Link className="btn" to={`/barber/${id}`}>
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteBarber;
