export interface UserState{
    products: any,
    loadMoreProducts: boolean,
    lossProducts: any,
    messages: any,
    chatRooms: any,
    bankAccount: any,
}

export const initialState: UserState = {
  products: [],
  loadMoreProducts: true,
  lossProducts: [],
  messages: [],
  chatRooms: [],
  bankAccount: null
}
