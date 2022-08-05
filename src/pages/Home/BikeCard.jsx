//#Global Imports
import React from "react";

//#Local Imports
import BookBikeModal from "./BookBikeModal";
import Modal from "../../components/modal";

function BikeCard(props) {
  const { bikeData } = props;
  const [isBookModalOpen, setBookModalOpen] = React.useState(false);

  return (
    <div
      key={bikeData.id}
      className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div className="flex items-center justify-between w-full gap-8">
        <div className="flex items-center gap-8 md:gap-20">
          <div className="justify-start focus:outline-none">
            <p className="text-sm font-medium text-gray-900">
              <span>
                <strong>Modal: </strong>
              </span>
              {bikeData.modalName}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-900">
              <span>
                <strong>Color: </strong>
              </span>
              {bikeData.color}
            </p>
          </div>

          <div className="justify-end focus:outline-none">
            <p className="text-sm font-medium text-gray-900">
              <span>
                <strong>Location: </strong>
              </span>{" "}
              {bikeData.location}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-900">
              <span>
                <strong>Rating: </strong>
              </span>{" "}
              {bikeData.rating}
            </p>
          </div>
        </div>

        <div className="flex items-center focus:outline-none">
          <button
            type="button"
            onClick={() => {
              setBookModalOpen(true);
            }}
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Book
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={isBookModalOpen}
        setIsModalOpen={() => setBookModalOpen(false)}
        isConfirmation={false}
      >
        <BookBikeModal bikeData={bikeData} handleCloseModal={setBookModalOpen} />
      </Modal>
    </div>
  );
}

export default BikeCard;