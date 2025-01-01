import React from "react";
import { Button } from "components/Button";

function StockCreateAction(props) {
  const { toggle } = props;
  return (
    <div>
      <Button color="primary" onClick={toggle} className="p-2">
        Add Stock
      </Button>
    </div>
  );
}

export default StockCreateAction;
