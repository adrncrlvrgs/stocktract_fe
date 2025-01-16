import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import { STATUS_TYPE } from "constants/statuses";

const StatusDropdown = (props) => {
  const { name, error, isLoading, defaultValue = "", ...rest } = props;

  const renderOptions = () => {
    if (isLoading) {
      return (
        <option value="" disabled>
          Loading categories...
        </option>
      );
    }

    const placeholderOption = (
      <option value="" disabled>
        Select a Status
      </option>
    );

    const statusOptions = Object.entries(STATUS_TYPE).map(([key, value]) => (
      <option key={value} value={value}>
        {key}
      </option>
    ));
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

StatusDropdown.proTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default StatusDropdown;
