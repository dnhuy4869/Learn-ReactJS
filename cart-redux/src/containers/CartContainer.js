import React, { Component } from 'react';
import Cart from '../components/Cart';
import { connect } from 'react-redux';
import * as messages from '../constants/Message'
import CartItem from '../components/CartItem';
import CartResult from '../components/CartResult';
import { actRemoveProductInCart, actChangeMessage, actUpdateProductInCart } from '../actions';

class CartContainer extends Component {
    constructor(props) {
        super(props);

    }

    showCartItem = (cart) => {
        var result = <tr><td>{messages.MSG_CART_EMPTY}</td></tr>;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return (
                    <CartItem
                        key={index}
                        item={item}
                        index={index}
                        onDeleteProductInCart={this.props.onDeleteProductInCart}
                        onChangeMessage={this.props.onChangeMessage}
                        onUpdateProductInCart={this.props.onUpdateProductInCart}
                    >
                        
                        </CartItem>
                );
            });
        }
        return result;
    }

    showCartResult = (cart) => {
        var result = 0;
        if (cart.length > 0) {
            result = <CartResult cart={cart}></CartResult>;
        }
        return result;
    }

    render() {
        var { cart } = this.props;
        return (
            <Cart>
                {this.showCartItem(cart)}
                {this.showCartResult(cart)}
            </Cart>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProductInCart: (product) => {
            dispatch(actRemoveProductInCart(product));
        },
        onUpdateProductInCart: (product, quantity) => {
            dispatch(actUpdateProductInCart(product, quantity));
        },
        onChangeMessage: (message) => {
            dispatch(actChangeMessage(message));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);