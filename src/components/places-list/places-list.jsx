import React, {Component} from "react";
import PropTypes from "prop-types";

import {offerShape} from "../../utils/prop-types.js";
import {ViewMode, VIEWMODES} from "../../utils/constants.js";

import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends Component {
  constructor(props) {
    super(props);

    this.state = {value: null};

    this._handleCardPointerEnter = this._handleCardPointerEnter.bind(this);
    this._handleCardPointerLeave = this._handleCardPointerLeave.bind(this);
  }

  _handleCardPointerEnter(offer) {
    this.setState({value: offer});
  }

  _handleCardPointerLeave() {
    this.setState({value: null});
  }

  render() {
    const {offers, viewMode, placeHeaderClickHandler} = this.props;

    const isMainView = viewMode === ViewMode.Main;

    return (
      <div className={`places__list
        ${isMainView ? `cities__places-list tabs__content` : `near-places__list`}`}>

        {offers.map((offer) => {
          return <PlaceCard
            offer={offer}
            onPlaceHeaderClick={placeHeaderClickHandler}
            handleCardPointerEnter = {this._handleCardPointerEnter}
            handleCardPointerLeave = {this._handleCardPointerLeave}
            key={offer.id}
          />;
        })}

      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  viewMode: PropTypes.oneOf(VIEWMODES).isRequired,
  placeHeaderClickHandler: PropTypes.func.isRequired,
};

export default PlacesList;
