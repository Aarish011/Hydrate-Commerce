import react from 'react';
import { useNavigate } from 'react-router-dom';
const CartToast = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>Product added to cart!</p>

      <button
        onClick={() => navigate('/cart')}
        className='mt-2 bg-black text-white px-3 py-1 rounded'
      >
        View Cart
      </button>
    </div>
  );
};

export default CartToast;
