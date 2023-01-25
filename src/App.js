import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Products, Cart } from './components';



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const { cart } = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(cart);
    }
    
    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);




    return (
        <Router>
            <Navbar totalItems={cart.total_items} />
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart"  >
                    <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
                </Route>
        </Router >
    );
}

export default App;