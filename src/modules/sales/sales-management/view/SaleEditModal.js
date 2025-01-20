import React, { useState } from "react";
import CustomForm from "components/Form/Form";
import FormGroup from "components/Form/FormGroup";
import { SaleDropdown } from "components/Input/Status-dropdown";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";

const SaleEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { saleID, items, itemQuantity, status, totalAmount } = data || {};
  
  const header = data ? "Edit Sale" : "Add Sale";

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      scrollable
      modalClassName="max-h-[80vh] w-full max-w-2xl"
    >
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm onSubmit={onSubmit} className="w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Sale Information
                </h3>

                {!data ? (
                  <p className="text-gray-600">No Item data available.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sale ID:</span>
                      <span className="text-black">{saleID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item ID:</span>
                      <span className="text-black">{items?.itemID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item Name:</span>
                      <span className="text-black">{items?.item}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sale status:</span>
                      <span className="text-black">{status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity Ordered:</span>
                      <span className="text-black">{itemQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-black">{totalAmount}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <FormGroup label="Sale Status">
                  <SaleDropdown
                    name="status"
                    defaultValue={status}
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
              </div>
            </div>

            <div className="!mt-5">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={isFetching || isLoading}
              >
                {isLoading ? "Submitting..." : header}
              </button>
            </div>
          </CustomForm>
        )}
      </ModalBody>
    </Modal>
  );
};

export default SaleEditModal;
