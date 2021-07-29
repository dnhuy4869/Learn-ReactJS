import React, { Component } from 'react';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import Message from './components/Message';
import Products from './components/Products';
import CartContainer from './containers/CartContainer';
import MessageContainer from './containers/MessageContainer';
import ProductsContainer from './containers/ProductsContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <main id="mainContainer">
                    <div className="container">
                        <ProductsContainer></ProductsContainer>
                        <MessageContainer></MessageContainer>
                        <CartContainer></CartContainer>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;