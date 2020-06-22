import React from "react";
import PropTypes from "prop-types";

const HostInfo = (props) => {
  const {host} = props;
  const {avatarUrl, isPro, name} = host;

  const proClass = isPro ? `property__avatar-wrapper--pro` : ``;

  return (
    <React.Fragment>
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper ${proClass} user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">
          {name}
        </span>
      </div>
    </React.Fragment>
  );
};

HostInfo.propTypes = {
  host: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default HostInfo;
