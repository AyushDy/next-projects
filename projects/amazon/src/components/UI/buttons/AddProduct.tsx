import { Plus } from "lucide-react";
import { useState } from "react";
import AddProductModal from "../forms/AddProductModal";

export default function AddProductButton() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((prev) => !prev);
  }

  return (
    <>
      {modal && <AddProductModal toggleModal={toggleModal} />}
      <button
        onClick={toggleModal}
        className="flex items-center shadow-inner  shadow-white px-3 py-2 border-2 text-white bg-purple-500 rounded-md"
      >
        <Plus size={18} />
        Add Product
      </button>
    </>
  );
}
