import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import { ITEM_STATUS_TYPE } from "constants/statuses";

const ItemStatusDropdown = (props) => {
  const { name, error, isLoading, defaultValue = "", ...rest } = props;

  const renderOptions = () => {
    if (isLoading) {
      return (
        <option value="" disabled>
          Loading status...
        </option>
      );
    }

    const placeholderOption = (
      <option value="" disabled>
        Select a Status
      </option>
    );

    const statusOptions = Object.entries(ITEM_STATUS_TYPE).map(
      ([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      )
    );
    if (!defaultValue) {
      return (
        <>
          {placeholderOption}
          {statusOptions}
        </>
      );
    }

    return (
      <>
        <option value={defaultValue}>{defaultValue}</option>
        {statusOptions}
      </>
    );
  };

  return (
      <Input
        type="select"
        name={name}
        error={error}
        defaultValue={defaultValue || ""}
        {...rest}
      >
        {renderOptions()}
      </Input>
    );
};

ItemStatusDropdown.proTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default ItemStatusDropdown;
