import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";

const CreateSaleModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { itemID, name, quantity, category } = data || {};
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Quantity is required."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = "Add Sale";

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
            <div>
                <label>Item Id: </label>
                <span>{itemID}</span>
              </div>
              <div>
                <label>Name: </label>
                <span>{name}</span>
              </div>
              <div>
                <label>Available Quantity: </label>
                <span>{quantity}</span>
              </div>
              <div>
                <label>Category: </label>
                <span>{category}</span>
              </div>

              <Input
                name="quantity"
                type="number"
                placeholder="Quantity"
                error={errors.quantity}
              />

              {/* total price here */}
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

export default CreateSaleModal;
