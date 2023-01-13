import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
 
import { Products, Navbar } from './components';


 
const App = () => {
    const [products, setProducts] = useState([]);
    const [Cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quanitity) => {
        const item = await commerce.cart.add(productId, quanitity);

        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts(); 
        fetchCart();
    }, []);




    return (
        <div>
            <Products products={products} onAddToCart={handleAddToCart} />
            <Navbar />

        </div>
    )
}

export default App;