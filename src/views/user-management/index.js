import { Page } from "components/Pages";
import ListTable from "modules/user-management/list";
import React, { useState } from "react";

function index() {
  return (
    <Page>
      <ListTable />
    </Page>
  );
}

export default index;
