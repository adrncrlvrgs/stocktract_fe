import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faCoffee,
  faBars,
  faCog,
  faRightFromBracket,
  faSearch,
  faBox,
  faList,
  faBagShopping,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUser,
  faCoffee,
  faBars,
  faCog,
  faRightFromBracket,
  faSearch,
  faBox,
  faList,
  faBagShopping,
  faChevronUp,
  faChevronDown
);

class IconFA extends React.Component {
  static defaultProps = {
    fixedWidth: true,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    const { name, ...rest } = this.props;

    return <FontAwesomeIcon icon={name?.toLowerCase() || {}} {...rest} />;
  }
}

export default IconFA;
