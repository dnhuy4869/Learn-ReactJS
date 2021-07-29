import * as types from '../constants/ActionType';

export const actAddToCart = (product, quantity) => {
    return {
        type: types.ADD_TO_CART,
        product: product,
        quantity: quantity
    }
};

export const actChangeMessage = (message) => {
    return {
        type: types.CHANGE_MESSAGE,
        message: message
    }
}

export const actRemoveProductInCart = (product) => {
    return {
        type: types.DELETE_PRODUCT_IN_CART,
        product: product
    }
}

export const actUpdateProductInCart = (product, quantity) => {
    return {
        type: types.UPDATE_PRODUCT_IN_CART,
        product: product,
        quantity: quantity
    }
}