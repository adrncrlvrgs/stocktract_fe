import React from "react";

function createUser(props){
  const {toggle} =  props;
  return(
    <div>
      <button onClick={toggle}>
        Add User
      </button>
    </div>
  );
}

export default createUser