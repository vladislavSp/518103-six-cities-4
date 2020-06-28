import React, {Component, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

import {VIEWMODES, ViewMode} from "../../utils/constants.js";
import {offerShape} from "../../utils/prop-types.js";

export default class PlacesMap extends Component {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._mapInstance = null;

    this._markers = [];
  }

  _initMap() {
    if (!this._mapRef || !this._mapRef.current) {
      return;
    }

    const {latitude, longitude, zoom} = this.props.offers[0].city.location;

    const mapSettings = {
      center: [latitude, longitude],
      zoom,
      zoomControl: false,
      marker: true
    };

    this._mapInstance = leaflet.map(this._mapRef.current, mapSettings);
    this._mapInstance.setView([latitude, longitude], zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._mapInstance);

    this._addMarkers(this.props.offers);
  }

  _addMarkers(offers) {
    const {activeOffer} = this.props;

    if (this._mapInstance) {
      offers.forEach((offer) => {
        this._addMarker(offer.location.latitude, offer.location.longitude, false);
      });
    }

    if (this._mapInstance && activeOffer !== null) {
      this._addMarker(activeOffer.location.latitude, activeOffer.location.longitude, true);
    }
  }

  _addMarker(latitude, longitude, isActive) {
    const icon = this._getMarkerTemplate(isActive);
    const marker = leaflet.marker([latitude, longitude], {icon}).addTo(this._mapInstance);
    this._markers.push(marker);
  }

  _getMarkerTemplate(isActive) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  _clearMarkers() {
    if (this._mapInstance !== null) {
      this._markers.forEach((marker) => {
        this._mapInstance.removeLayer(marker);
      });
    }
    this._markers = [];
  }

  componentDidMount() {
    const {offers} = this.props;

    if (offers.length > 0) {
      this._initMap();
    }
  }

  componentDidUpdate(prevProps) {
    const {activeOffer: prevActiveOffer} = prevProps;
    const {activeOffer} = this.props;

    if (prevActiveOffer.id !== activeOffer.id) {
      this._clearMarkers();
      this._addMarkers(this.props.offers);
    }
  }

  componentWillUnmount() {
    this.destroy();

  }

  destroy() {
    this._mapInstance.remove();
    this._mapInstance = null;
  }

  render() {
    const {viewMode} = this.props;
    const isNearViewMode = viewMode === ViewMode.PlaceDetails;

    return (
      <section className={`${isNearViewMode ? `property__map` : `cities__map`} map`}>
        <div id="map" style={{height: `100%`}} ref={this._mapRef}></div>
      </section>
    );
  }
}

PlacesMap.defaultProps = {
  activeOffer: null
};

PlacesMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
  viewMode: PropTypes.oneOf(VIEWMODES).isRequired,
  activeOffer: PropTypes.shape(offerShape),
};
