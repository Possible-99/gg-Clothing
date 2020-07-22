import ShopActionsTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// We are doing multiple-dispatching, because we need to change that we are fetching in our state.
// We need to note that we return a function.
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    // We are disptching the action that let us know that we are fetching.We can do this because of redux-thunk. We need to imported to store.js
    dispatch(fetchCollectionsStart());
    // This is asynchronus, so we uses promises
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error)));
  };
};

export const anyOne = () => {};

// ! Important note: Remember that the actions functions return an object, or it returns a function that have multiple dispatches
// ! we need to use redux-thunk for async-redux. Remember that to return a function we need to add redux-thunk to our middleware!!.
