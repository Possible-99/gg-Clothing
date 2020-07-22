import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

// We do this because we require asynchronus data(collections).
// We put the HOC here because here is where we fetch the data.
// We will return a HOC
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");
    // We know another way to obtain the data, we need to use the fetch pattern.

    // This is a promise pattern, it have a disadvantage, it only rerender the info when we mount the component.
    // collectionRef.get().then((snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    // Here we uses a observable pattern. We are using a listener and making a suscription.
    // The advantage of this pattern is that it always updating because we establish a suscription.
    // this.unsuscribeFromSnapshot = collectionRef.onSnapshot( (snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="show-page">
        {/* This are nested routes */}
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

// const mapStateToProps = createStructuredSelector({
//   isCollectionsLoaded: selectIsCollectionsLoaded,
// });

export default connect(null, mapDispatchToProps)(ShopPage);

// Some quick note, i think that we are defining the collection page here, because is part of the route shop,
// /shop/"categoryId"categoryId=jackets,hats,etc
