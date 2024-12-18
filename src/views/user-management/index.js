import { Page } from "components/Pages";
import UsersManagementPage from "modules/user-management/view";
import React from "react";

function index() {
  return (
    <Page>
      <UsersManagementPage />
    </Page>
  );
}

export default index;
