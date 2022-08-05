//#Global Imports
import React from "react";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

//#Local Imports
import db from "../../firebase";
import Modal from "../../components/modal";
import FormContainer from "./FormContainer";
import HistoryModal from "./HistoryModal";

const BikeMange = () => {
  const [bikeData, setBikeData] = React.useState([]);
  const [isFormActionType, setFormActionType] = React.useState(null);
  const [selectedBikeData, setSelectedBikeData] = React.useState({});
  const [isBikeHistoryModal, setIsBikeHistoryModal] = React.useState(false);

  const handleEditAction = (bikeData) => {
    setSelectedBikeData(bikeData);
    setFormActionType("edit");
  };

  const handleAddAction = () => {
    setFormActionType("add");
  };

  const handleBikeHistory = (bikeData) => {
    setSelectedBikeData(bikeData);
    setIsBikeHistoryModal(true);
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
            onClick={handleAddAction}
          >
            <span>Add</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Data Listing Section */}
        {bikeData.map((items, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            onClick={() => {
              setIsBikeHistoryModal(true);
              setSelectedBikeData(items);
            }}
          >
            <div className="flex items-center justify-between w-full gap-8">
              <div onClick={handleBikeHistory} className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">
                  Modal Name : {items.modalName}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Color : {items.color}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Location : {items.location}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Rating : {items.rating}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => handleEditAction(items)}
                >
                  <PencilIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="cursor-pointer cursor">
                  <TrashIcon className="w-5 h-5 cursor" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add and Edit User/Manager Form Modal Section */}
      <Modal
        isModalOpen={isFormActionType === "edit" || isFormActionType === "add"}
        setIsModalOpen={() => setFormActionType("")}
        isConfirmation={false}
      >
        <FormContainer
          actionType={isFormActionType}
          setFormActionType={setFormActionType}
          formData={selectedBikeData}
        />
      </Modal>

      {/* Bike Used as a Ride by User History Modal Section */}
      <Modal
        isModalOpen={isBikeHistoryModal}
        setIsModalOpen={setIsBikeHistoryModal}
        isConfirmation={false}
      >
        <HistoryModal selectedBikeData={selectedBikeData} />
      </Modal>
    </div>
  );
};

export default BikeMange;