//#Global Imports
import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

//#Local Imports
import db from "../../firebase";
import Modal from "../../components/modal";
import FormContainer from "./FormContainer";
import HistoryModal from "./HistoryModal";
import BikeCard from "./BikeCard";
import CancleDeleteBikeModal from "./CancleDeleteBikeModal";

const ManageBike = () => {
  const [bikeData, setBikeData] = React.useState([]);
  const [formActionType, setFormActionType] = React.useState("");
  const [selectedBikeData, setSelectedBikeData] = React.useState({});

  const handleAction = (data, mode) => {
    setSelectedBikeData(data);
    setFormActionType(mode);
  };

  React.useEffect(() => {
    db.collection("bikes").onSnapshot((snapshot) => {
      setBikeData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setFormActionType("add");
            }}
          >
            <span>Add Bike</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Data Listing Section */}
        <div className="grid grid-cols-2 gap-8 -mx-px sm:mx-0 md:grid md:grid-cols-3 lg:grid lg:grid-cols-3">
          {bikeData.map((items, index) => (
            <BikeCard
              key={index}
              bikeData={items}
              handleAction={handleAction}
            />
          ))}
        </div>
      </div>

      {/* Add, Edit, Delete, History User/Manager Form Modal Section */}
      <Modal
        isModalOpen={formActionType !== ""}
        setIsModalOpen={() => setFormActionType("")}
        isConfirmation={false}
        width="sm:max-w-lg sm:w-full"
      >
        {formActionType === "delete" && (
          <CancleDeleteBikeModal
            setFormActionType={setFormActionType}
            selectedBikeData={selectedBikeData}
          />
        )}
        {(formActionType === "edit" || formActionType === "add") && (
          <FormContainer
            actionType={formActionType}
            setFormActionType={setFormActionType}
            formData={selectedBikeData}
          />
        )}
        {formActionType === "history" && (
          <HistoryModal
            setFormActionType={setFormActionType}
            selectedBikeData={selectedBikeData}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageBike;
