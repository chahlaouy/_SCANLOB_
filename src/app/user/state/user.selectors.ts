import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/state/custom.serializer";
import { getCurrentRouterParam } from "src/app/state/router.selector";
import { UserState } from "./user.state";


export const USER_STATE_NAME = "user";

const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const getUserProducts = createSelector(getUserState, state => {
    return state.products;
});
/**
 * Determine if we should make any other calls
 */
export const loadMoreProducts = createSelector(getUserState, state => {
    return state.loadMoreProducts;
});

export const getUserLossesProducts = createSelector(getUserState, state => {
    return state.lossProducts;
});

export const getUserLossProducts = createSelector(getUserLossesProducts, lossesProducts => {
    return lossesProducts.filter(prod => prod.loss_product.status == "loss-object");
});

export const getUserTheftProducts = createSelector(getUserLossesProducts, lossesProducts => {
    return lossesProducts.filter(prod => prod.loss_product.status == "theft-object");
});

export const getUserFoundProducts = createSelector(getUserLossesProducts, lossesProducts => {
    return lossesProducts.filter(prod => prod.loss_product.status == "found-object");
});

export const getProductById = createSelector(getUserProducts, getCurrentRouterParam,(products, route: RouterStateUrl) => {

  return products.find((product) => product.id == route.params.id
  )
});

export const getLossProductById = createSelector(getUserLossesProducts, getCurrentRouterParam,(products, route: RouterStateUrl) => {

  return products.find((product) => product.id == route.params.id
  )
});

export const getUserChatrooms = createSelector(getUserState, state => {

  return state.chatRooms;
});

export const selectSingleChatroom = createSelector(getUserChatrooms, getCurrentRouterParam,(chatRooms, route: RouterStateUrl) => {

  return chatRooms.find((chatRoom) => chatRoom.id == route.params.id);
});

export const selectUserMessages = createSelector(getUserState, state => {
  return state.messages;
});

export const getAccount = createSelector(getUserState, state => {
  return state.bankAccount;
});




