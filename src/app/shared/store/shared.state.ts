export interface SharedState{
    showLoadingSpinner: boolean,
    errorMessage: any,
    successMessage: any,
    products: any,
    lossProducts: any,
    messages: any,
    categories: any,
    cart: any,
    productComments: any
}

export const initialState: SharedState = {
    showLoadingSpinner: false,
    errorMessage: null,
    successMessage: null,
    products: [],
    lossProducts: [],
    messages: [],
    categories: [],
    cart: [],
    productComments: []
}
