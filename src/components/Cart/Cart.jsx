import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../slices/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
  
    const handleRemoveItem = (id) => {
      dispatch(removeItem({ id }));
    };
  
    const handleClearCart = () => {
      dispatch(clearCart());
    };
    const total = items.reduce((acc, item) => {
        return acc + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
  

    return (
      <div>
        {/* Page Header */}
        <div className="page-header">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Shopping Cart</h2>
              </div>
              <div className="col-12">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="price">
          <div className="container">
            <div className="section-header text-center">
              <p>Your Selected Items</p>
              <h2>Items in Your Cart</h2>
            </div>
            {items.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <div className="row">
                {items.map((item, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={item.id || index}>
                    <div className="price-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="price-text">
                      <h2>{item.name}</h2>
                      <h3>{item.price} (x{item.quantity})</h3>
                     <p>Total: {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)} lv</p>
                      <button 
                        className="btn btn-danger mt-2" 
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {items.length > 0 && (
              <div className="text-center mt-4">
                <p>Total: ${total.toFixed(2)}</p> 
                <button 
                  className="btn btn-warning" 
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button >
                <Link 
      to="/payment"
      className="btn btn-warning"
      style={{ marginLeft: '50px' }}
      onClick={() => {
        localStorage.setItem('cartTotal', JSON.stringify(total)); // Запис в localStorage
      }}
    >
      Pay
    </Link>

              </div>
            )}
          </div>
        </div>
      </div>
    );
}
