import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/state/custom.serializer';
import { getCurrentRouterParam } from 'src/app/state/router.selector';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoadingSpinnerState = createSelector(
  getSharedState,
  (state) => {
    return state.showLoadingSpinner;
  }
);

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});

export const getSuccessMessage = createSelector(getSharedState, (state) => {
  return state.successMessage;
});

export const getLatestProducts = createSelector(getSharedState, (state) => {
  return state.products;
});

export const getLatestLossProducts = createSelector(getSharedState, (state) => {
  return state.lossProducts;
});


export const getLatestLossProductByID = createSelector(
  getLatestLossProducts,
  getCurrentRouterParam,
  (products, route: RouterStateUrl) => {
    return products.find((product) => product.id == route.params.id);
  }
);

export const getProductById = createSelector(
  getLatestProducts,
  getCurrentRouterParam,
  (products, route: RouterStateUrl) => {
    return products.find((product) => product.id == route.params.id);
  }
);

export const getMessages = createSelector(getSharedState, (state) => {
  return state.messages;
});


export const getCategories = createSelector(getSharedState, (state) => {
  return state.categories;
});

export const getSubcategory = createSelector(
  getCategories,
  getCurrentRouterParam,
  (categories, route: RouterStateUrl) => {
    var subCat: any;

    categories.forEach(cat => {
      cat.sub_categories.forEach((subcat) => {
        if(subcat.id == route.params.subCatId){
          subCat = subcat;
        }
      });
    });
    return subCat;
  }

);

export const getSubcategoryProduct = createSelector(
  getSubcategory,
  getCurrentRouterParam,
  (subCat, route: RouterStateUrl) => {
    return subCat.products.find((product) => product.id == route.params.id);
  }

);

export const getCartItems = createSelector(getSharedState, (state) => {
  return state.cart;
});

export const getCartItemsNumber = createSelector(getSharedState, (state) => {
  return state.cart.length;
});

export const getProductComments = createSelector(getSharedState, (state) => {
  return state.productComments;
});
