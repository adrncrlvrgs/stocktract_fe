import React from "react";
import { Button } from "components/Button";

function createUser(props){
  const {toggle} =  props;
  return(
    <div>
      <Button color="primary" onClick={toggle} className="p-2">
        Add User
      </Button>
    </div>
  );
}

export default createUser