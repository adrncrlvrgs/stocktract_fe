import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addSale } from "api/sales";
import { getItem } from "api/item";
import generateSaleId from "utils/generateID";

function useCreateSale(triggerRefetch) {
  const [data, setData] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = item;

  function toggleOpen(itemID) {
    if (typeof itemID === "number") {
      setItems({ isOpen: true, id: itemID });
      setIsLoading(false);
    } else {
      setItems({ isOpen: false, id: null });
      setData({});
      setIsLoading(false);
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getItem(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get item: " + (error.message || "An error occurred.")
      );
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  const createSale = async (formData) => {
    setIsCreating(true);

    try {
      const saleID = generateSaleId();
      const saleData = {
        ...formData,
        saleID: saleID,
        item: data?.item,
        itemID: data?.itemID,
        totalAmount: "10.00",
      };
      // await addSale(saleData);
      console.log(formData)
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("Sale created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create sale: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsCreating(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return {
    onCreate: createSale,
    isFetching: isLoading,
    isCreating,
    data,
    isCreatingOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateSale;
