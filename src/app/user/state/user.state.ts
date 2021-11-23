export interface UserState{
    products: any,
    loadMoreProducts: boolean,
    lossProducts: any,
}

export const initialState: UserState = {
  products: [],
  loadMoreProducts: true,
  lossProducts: [],
}
