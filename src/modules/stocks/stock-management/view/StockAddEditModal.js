import React, { useState } from "react";
import * as Yup from "yup";
import CustomForm from "components/Form/Form";
import { Input } from "components/Input";
import { validateForm } from "utils/validate";
import { Modal, ModalBody, ModalHeader } from "components/Modal";
import { Spinner } from "components/Spinner";
import { CategoryDropdown } from "components/Input/category-dropdown";

const StockAddEditModal = (props) => {
  const { data, isOpen, toggle, onSubmit, isFetching, isLoading } = props;
  const { stockID, supplier, item, totalQuantity, totalCost } = data || {};
  const [errors, setErrors] = useState({});
  const [categoryValue, setCategoryValue] = useState("");

  const validationSchema = Yup.object({
    supplier: Yup.string().required("Supplier is required."),
    item: Yup.string().required("Item is required."),
    category: Yup.string().required("Category is required."),
    totalQuantity: Yup.number().required("Quantity is required."),
    totalCost: Yup.number().required("Total Cost is required."),
  });

  const validate = async (data) => {
    return await validateForm(data, validationSchema, setErrors);
  };

  const header = data ? "Edit Stock" : "Add Stock";

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
                name="supplier"
                type="text"
                defaultValue={supplier}
                placeholder="Supplier"
                error={errors.supplier}
              />
              <Input
                name="item"
                type="text"
                defaultValue={item}
                placeholder="Item"
                error={errors.item}
              />

              <CategoryDropdown
                name="category"
                error={errors.category}
                value={categoryValue} // Ensure this matches the option value
                onChange={(e) => setCategoryValue(e.target.value)} // Handle the change
              />
              <Input
                name="totalQuantity"
                type="number"
                defaultValue={totalQuantity}
                placeholder="Quantity"
                error={errors.totalQuantity}
              />
              <Input
                name="totalCost"
                type="number"
                defaultValue={totalCost}
                placeholder="Total Cost"
                error={errors.totalCost}
              />
            </div>
            <div className="!mt-8">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isFetching}
              >
                {data ? "Update" : "Add"}
              </button>
            </div>
          </CustomForm>
        )}
      </ModalBody>
    </Modal>
  );
};

export default StockAddEditModal;
