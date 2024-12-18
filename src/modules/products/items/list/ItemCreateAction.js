import React from "react";
import { Button } from "components/Button";

function ItemCreateAction(props) {
  const { toggle } = props;
  return (
    <div>
      <Button color="primary" onClick={toggle} className="p-2">
        Add Category
      </Button>
    </div>
  );
}

export default ItemCreateAction;
