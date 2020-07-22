import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

// In this files we just pass props down to the components,we can connect, create a higher order component,add props,etc.

const mapStateToProps = createStructuredSelector({
  // Instead of only passing the select..., we pass a function with the state, because we want to reverse the value
  // We need the state, so we need a function to pass it.
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
