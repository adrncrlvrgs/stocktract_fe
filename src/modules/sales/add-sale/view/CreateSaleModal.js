import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import FormGroup from "components/Form/FormGroup";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "components/Modal";
import { Spinner } from "components/Spinner";
import { Button } from "components/Button";

const CreateSaleModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { itemID, item, price, tags, unit, quantity, category, description } =
    data || {};
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState("");

  const validationSchema = Yup.object({
    itemQuantity: Yup.number()
      .required("Quantity is required.")
      .min(1, "Quantity must be at least 1.")
      .max(quantity, `Quantity cannot exceed available stock (${quantity}).`),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setTotalPrice(0);
      setItemQuantity("");
      setShowConfirmation(false);
    }
  }, [isOpen]);

  const handleFormSubmit = (formData) => {
    if (formData) {
      const itemQuantity = parseFloat(formData?.itemQuantity);
      const totalPrice =
        !isNaN(itemQuantity) && price ? itemQuantity * price : 0;
      setItemQuantity(itemQuantity);
      setTotalPrice(totalPrice);

      setShowConfirmation(true);
    }
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      onSubmit({ itemQuantity });
    }

    setShowConfirmation(false);
  };

  const header = "Add Sale";

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
          <CustomForm
            onSubmit={handleFormSubmit}
            validate={validate}
            className="w-full max-w-xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Item Information
                </h3>
                {!data ? (
                  <p className="text-gray-600">No Item data available.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item ID:</span>
                      <span className="text-black">{itemID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Item:</span>
                      <span className="text-black">{item}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-black">{category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-black">{price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Quantity:</span>
                      <span className="text-black">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Description:</span>
                      <span className="text-black">{description}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <FormGroup
                  label="Quantity"
                  error={errors.itemQuantity}
                  isRequired
                >
                  <Input
                    name="itemQuantity"
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="!mt-8">
              <Button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={isFetching || isLoading}
              >
                {isLoading ? "Submitting..." : header}
              </Button>
            </div>
          </CustomForm>
        )}
      </ModalBody>

      <Modal
        isOpen={showConfirmation}
        toggle={() => setShowConfirmation(false)}
      >
        <ModalHeader toggle={() => setShowConfirmation(false)}>
          Confirm Sale
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to proceed with this sale?</p>
          <p>
            <strong>Total Price:</strong> ₱{totalPrice.toFixed(2)}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-4 py-2 pl-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
            onClick={() => handleConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
            onClick={() => handleConfirmation(true)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </Modal>
  );
};

export default CreateSaleModal;
