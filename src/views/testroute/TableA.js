// Example Implementation of Table A and Table B with Parent Route

// TableA Component
import React from "react";

const TableA = () => {
  return (
    <div>
      <h1>Table A</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Item A1</td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Item A2</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableA;