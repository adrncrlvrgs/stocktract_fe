import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import CustomForm from "components/form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { ImageUpload } from "components/Input/ImageUpload";
import FormGroup from "components/form/FormGroup";
import { PriceInput } from "components/Input/PriceInput";
import ItemStatusDropdown from "components/Input/Status-dropdown/ItemStatusDropdown";
import { Button } from "components/Button";

const ItemEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const {
    itemID,
    item,
    quantity,
    price,
    status,
    category,
    supplier,
    tags,
    imageUrls,
  } = data || {};
  const [errors, setErrors] = useState({});
  const [itemImages, setItemImages] = useState([]);

  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      setItemImages(imageUrls);
    }
  }, [imageUrls]);

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Quantity is required."),
    price: Yup.number()
      .required("Price is required.")
      .positive("Price must be a positive number."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const handleSubmit = (formData) => {
    const updatedData = { ...formData, itemImages };
    onSubmit(updatedData);
  };

  const header = data ? "Edit Item" : "Add Item";

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      scrollable
      modalClassName="max-h-[80vh] w-full max-w-5xl"
    >
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm
            onSubmit={handleSubmit}
            validate={validate}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Item Information
                </h3>
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
                    <span className="text-gray-600">Supplier:</span>
                    <span className="text-black">{supplier}</span>
                  </div>
                  <FormGroup label="Item Status">
                    <ItemStatusDropdown
                      name="status"
                      defaultValue={status}
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>

                  <label className="block text-xs font-semibold text-gray-500">
                    Tags:
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2 ">
                    {tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Item Details
                </h3>
                <FormGroup
                  label="Quantity to Sell"
                  error={errors.quantity}
                  isRequired
                >
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    defaultValue={quantity}
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>

                <FormGroup label="Price" error={errors.price} isRequired>
                  <PriceInput
                    name="price"
                    defaultValue={price}
                    placeholder="Enter the price"
                  />
                </FormGroup>

                <FormGroup label="Upload Images (Max 5)">
                  <ImageUpload
                    name="itemImages"
                    multiple={true}
                    maxImages={5}
                    initialImages={imageUrls}
                    onChange={(updatedImages) => setItemImages(updatedImages)}
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
    </Modal>
  );
};

export default ItemEditModal;
