import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";

const SaleEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { saleID, item, quantity, totalAmount } = data || {};
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    item: Yup.string().required("Item is required."),
    quantity: Yup.number().required("Quantity is required."),
    totalAmount: Yup.number().required("Total Amount is required."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = data ? "Edit Sale" : "Add Sale";

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm
            onSubmit={onSubmit}
            validate={validate}
            className="max-w-md md:ml-auto w-full"
          >
            <div className="space-y-4">
              <Input
                name="item"
                type="text"
                defaultValue={item}
                placeholder="Item"
                error={errors.item}
              />
              <Input
                name="quantity"
                type="number"
                defaultValue={quantity}
                placeholder="Quantity"
                error={errors.quantity}
              />
              <Input
                name="totalAmount"
                type="number"
                defaultValue={totalAmount}
                placeholder="Total Amount"
                error={errors.totalAmount}
              />
            </div>
            <div className="!mt-8">
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
