import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { CategoryDropdown } from "components/Input/Category-dropdown";
import { ImageUpload } from "components/Input/ImageUpload";

const ItemEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { itemID, item, quantity, category, imageUrls } = data || {};
  const [errors, setErrors] = useState({});
  const [itemImages, setItemImages] = useState(imageUrls || []);

  const validationSchema = Yup.object({
    item: Yup.string().required("Item Name is required."),
    quantity: Yup.number().required("Quantity is required."),
    category: Yup.string().required("Category is required."),
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
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={() => toggle()}>{header}</ModalHeader>
      <ModalBody>
        {isFetching || isLoading ? (
          <Spinner />
        ) : (
          <CustomForm
            onSubmit={handleSubmit}
            validate={validate}
            className="max-w-md md:ml-auto w-full"
          >
            <div className="space-y-4">
              <Input
                name="item"
                type="text"
                defaultValue={item}
                placeholder="Item Name"
                error={errors.item}
              />
              <Input
                name="quantity"
                type="number"
                defaultValue={quantity}
                placeholder="Quantity"
                error={errors.quantity}
              />
              <CategoryDropdown
                name="category"
                error={errors.category}
                defaultValue={category}
              />
              <ImageUpload
                name="itemImages"
                multiple={true}
                maxImages={5}
                error={errors.itemImages}
                initialImages={imageUrls}
                onChange={(updatedImages) => setItemImages(updatedImages)} // Update images state
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

export default ItemEditModal;
