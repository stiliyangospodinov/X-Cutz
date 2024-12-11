import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../services/barberShopService';
import AboutCard from '../Cards/AboutCard/AboutCard';
import LogRegSection from '../Shared/LogRegSection/LogRegSection';
import PageHeader from '../Shared/PageHeader/PageHeader';

export default function ProductDetails() {

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
  <PageHeader name="Products" endpoint="products" />
            <div className="price">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Our Best Pricing</p>
                        <h2>{product.name}</h2>
                    </div>
                    <div className="row">
                        
                        <AboutCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                            text = "If you want to buy a product please log in to your account"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}
