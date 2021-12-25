export interface SharedState{
    showLoadingSpinner: boolean,
    errorMessage: any,
    successMessage: any,
    products: any,
    lossProducts: any,
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
    categories: [],
    cart: [],
    productComments: []
}
