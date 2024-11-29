import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../slices/cartSlice';

export default function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
  
    const handleRemoveItem = (id) => {
      dispatch(removeItem({ id }));
    };
  
    const handleClearCart = () => {
      dispatch(clearCart());
    };
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
        {items.map((item, index) => (
            <li key={item.id || index}>
                <img src={item.image} alt={item.name} width="50" />
                <p>{item.name} - ${item.price} (x{item.quantity})</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && (
          <button onClick={handleClearCart}>Clear Cart</button>
        )}
      </div>
    );
  }
  