import React from "react";
import PropTypes from "prop-types";

const StatsCard = ({ number, title, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-48 h-48 bg-white shadow-lg rounded-lg ${className}`}
    >
      <div className="text-4xl font-bold text-gray-800">{number}</div>
      <div className="text-lg text-gray-600 mt-2">{title}</div>
    </div>
  );
};

StatsCard.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

StatsCard.defaultProps = {
  className: "",
};

const SalesActivity = () => {
  const stats = [
    { number: 120, title: "Sales Today" },
    { number: 350, title: "Weekly Sales" },
    { number: 5000, title: "Monthly Sales" },
    { number: 60000, title: "Yearly Sales" },
  ]; //temp

  return (
    <div className="flex space-x-4 p-4 bg-gray-100">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          number={stat.number}
          title={stat.title}
          className="bg-blue-50"
        />
      ))}
    </div>
  );
};

export default SalesActivity;
