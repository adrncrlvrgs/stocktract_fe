// TableB Component
import React from "react";

const TableB = () => {
  return (
    <div>
      <h1>Table B</h1>
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
            <td>Item B1</td>
            <td>300</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Item B2</td>
            <td>400</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableB;