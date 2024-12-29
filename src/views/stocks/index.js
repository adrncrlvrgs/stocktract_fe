import { Page } from "components/Pages";
import React from "react";
import StocksPage from "modules/stocks";

function index() {
  return (
    <Page>
      <StocksPage />
    </Page>
  );
}

export default index;
