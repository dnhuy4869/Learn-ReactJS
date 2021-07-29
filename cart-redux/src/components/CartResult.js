import React, { Component } from 'react';

class CartResult extends Component {
    constructor(props) {
        super(props);
        
    }

    showTotalPrice = (cart) => {
        var totalPrice = 0;
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                totalPrice += (cart[i].product.price * cart[i].quantity);
            }
        }
        return totalPrice;
    }
    
    render() {
        var { cart } = this.props;
        return (
            <tr>
                <td colSpan={3} />
                <td>
                    <h4>
                        <strong>Tổng Tiền</strong>
                    </h4>
                </td>
                <td>
                    <h4>
                        <strong>{this.showTotalPrice(cart)}$</strong>
                    </h4>
                </td>
                <td colSpan={3}>
                    <button type="button" className="btn btn-primary waves-effect waves-light">Complete purchase
                        <i className="fa fa-angle-right right" />
                    </button>
                </td>
            </tr>
        );
    }
}

export default CartResult;