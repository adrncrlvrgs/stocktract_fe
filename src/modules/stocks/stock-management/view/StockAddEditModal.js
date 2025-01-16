import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import FormGroup from "components/Form/FormGroup";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { CategoryDropdown } from "components/Input/Category-dropdown";
import { StockDropdown } from "components/Input/Status-dropdown";
import { StockTags } from "components/Input/Tags";

const StockAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const {
    stockID,
    supplier,
    item,
    status,
    totalQuantity,
    category,
    totalCost,
    unit,
    expirationDate,
    location,
    supplierContact,
    notes,
    tags: initialTags = [],
  } = data || {};
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState(initialTags);

  useEffect(() => {
    if (isOpen) {
      setTags(initialTags); 
    } else {
      setTags([]); 
    }
  }, [isOpen, initialTags]);
  const validationSchema = Yup.object({
    supplier: Yup.string().required("Supplier is required."),
    item: Yup.string().required("Item is required."),
    category: Yup.string().required("Category is required."),
    totalQuantity: Yup.number().required("Quantity is required."),
    totalCost: Yup.number().required("Total Cost is required."),
    unit: Yup.string().required("Unit of Measurement is required."),
    expirationDate: Yup.date().required("Expiration Date is required."),
    location: Yup.string().required("Location is required."),
    supplierContact: Yup.string().required("Supplier Contact is required."),
    notes: Yup.string(),
    status: Yup.string().required("Status is required."),
    tags: Yup.array()
      .min(1, "At least 1 tag is required.")
      .max(8, "Maximum 8 tags allowed."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const handleFormSubmit = (formData) => {
    const updatedData = { ...formData, tags };
    onSubmit(updatedData);
  };
  const header = data ? "Edit Stock" : "Add Stock";

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
            onSubmit={handleFormSubmit}
            validate={validate}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup
                    label="Supplier"
                    error={errors.supplier}
                    isRequired
                  >
                    <Input
                      name="supplier"
                      type="text"
                      defaultValue={supplier}
                      placeholder="Supplier"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup label="Item" error={errors.item} isRequired>
                    <Input
                      name="item"
                      type="text"
                      defaultValue={item}
                      placeholder="Item"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Unit of Measurement"
                    error={errors.unit}
                    isRequired
                  >
                    <Input
                      name="unit"
                      type="text"
                      defaultValue={unit}
                      placeholder="Unit (e.g., kg, liters)"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup label="Status" error={errors.status} isRequired>
                    <StockDropdown
                      name="status"
                      defaultValue={status}
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Stock Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup
                    label="Category"
                    error={errors.category}
                    isRequired
                  >
                    <CategoryDropdown
                      name="category"
                      defaultValue={category}
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Quantity"
                    error={errors.totalQuantity}
                    isRequired
                  >
                    <Input
                      name="totalQuantity"
                      type="number"
                      defaultValue={totalQuantity}
                      placeholder="Quantity"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Total Cost"
                    error={errors.totalCost}
                    isRequired
                  >
                    <Input
                      name="totalCost"
                      type="number"
                      defaultValue={totalCost}
                      placeholder="Total Cost"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Advanced Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup
                    label="Expiration Date"
                    error={errors.expirationDate}
                    isRequired
                  >
                    <Input
                      name="expirationDate"
                      type="date"
                      defaultValue={expirationDate}
                      placeholder="Expiration Date"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Location"
                    error={errors.location}
                    isRequired
                  >
                    <Input
                      name="location"
                      type="text"
                      defaultValue={location}
                      placeholder="Location"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Supplier Contact"
                    error={errors.supplierContact}
                    isRequired
                  >
                    <Input
                      name="supplierContact"
                      type="text"
                      defaultValue={supplierContact}
                      placeholder="Supplier Contact"
                      className="w-full p-2 border rounded"
                    />
                  </FormGroup>
                  <FormGroup label="Stock Tags" error={errors.tags} isRequired>
                    <StockTags
                      name="tags"
                      value={tags}
                      onChange={(newTags) => setTags(newTags)} // Update the local tags state
                      maxTags={8}
                      minTags={1}
                    />
                  </FormGroup>
                </div>
                <FormGroup label="Notes" error={errors.notes}>
                  <Input
                    name="notes"
                    type="textarea"
                    defaultValue={notes}
                    placeholder="Notes"
                    className="w-full p-2 border rounded"
                  />
                </FormGroup>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={isFetching || isLoading}
                >
                  {isLoading ? "Submitting..." : header}
                </button>
              </div>
            </div>
          </CustomForm>
        )}
      </ModalBody>
    </Modal>
  );
};

export default StockAddEditModal;
