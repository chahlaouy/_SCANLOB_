import { createReducer, on } from "@ngrx/store";
import { getBankAccountSuccess, getChatroomsSuccess, getLossProductsSuccess, getProductsSuccess, getSingleChatroomsSuccess, resetFeilds, sendMessageSuccess, setBankAccountSuccess, setUserMessages } from "./user.actions";
import { initialState } from "./user.state";

export const _userReducer = createReducer(initialState,
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            products: action.products
        }
    }),
    on(getLossProductsSuccess, (state, action) => {
      return {
          ...state,
          lossProducts: action.products
      }
    }),
    on(getChatroomsSuccess, (state, action) => {
      return {
          ...state,
          chatRooms: action.chatrooms
      }
    }),
    on(getSingleChatroomsSuccess, (state, action) => {
      return {
          ...state,
          chatRooms: [action.chatroom, ...state.chatRooms]
      }
    }),
    on(sendMessageSuccess, (state, action) => {
      return {
        ...state,
        messages: [action.message, ...state.messages ],
      };
    }),
    on(setUserMessages, (state, action) => {
      return {
        ...state,
        messages: [...state.messages ,...action.messages],
      };
    }),
    on(getBankAccountSuccess, (state, action) => {
      return {
        ...state,
        bankAccount: action.account,
      };
    }),
    on(setBankAccountSuccess, (state, action) => {
      return {
        ...state,
        bankAccount: action.account,
      };
    }),
    on(resetFeilds, (state, action) => {
      return {
        ...state,
        products: [],
        loadMoreProducts: true,
        lossProducts: [],
        messages: [],
        chatRooms: [],
        bankAccount: null
      };
    }),

    );

export function UserReducer(state, action){

    return _userReducer(state, action);
}
