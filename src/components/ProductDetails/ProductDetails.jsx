import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../services/barberShopService';
import AboutCard from '../Cards/AboutCard.jsx/AboutCard';

export default function ProductDetails() {
    const { isAuthenticated, isAdmin, username } = useContext(AuthContext);
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to load product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Product</h2>
                        </div>
                        <div className="col-12">
                            <Link to="/">Home</Link>
                            <Link to="/products">Products</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="price">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Our Best Pricing</p>
                        <h2>{product.name}</h2>
                    </div>
                    <div className="row">
                        <AboutCard
                            key={product._id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
