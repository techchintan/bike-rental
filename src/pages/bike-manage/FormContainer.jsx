//#Global imports
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//#Local Imports
import db from "../../firebase";
import { getErrorMessage, regexForName } from "../../utils";

const FormContainer = (props) => {
  const { actionType, formData, setFormActionType } = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isBikeAvailable: actionType === "edit" ? formData.isBikeAvailable : false,
    },
  });

  const onSubmit = (data) => {
    if (actionType === "add") {
      db.collection("bikes")
        .add({
          modalName: data.modalName,
          color: data.color,
          location: data.location,
          rating: 0,
          isBikeAvailable: data.isBikeAvailable,
        })
        .then(() => {
          setFormActionType(null);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else if (actionType === "edit") {
      db.collection("bikes")
        .doc(data.id)
        .update({
          modalName: data.modalName,
          color: data.color,
          location: data.location,
        })
        .then(() => {
          setFormActionType(null);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  };

  const handleDeleteBike = () => {
    db.collection("bikes")
      .doc(formData.id)
      .delete()
      .then(() => {
        setFormActionType(null);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <div className="w-full p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-8 m-auto mt-6"
      >
        <div>
          <label
            htmlFor="modalName"
            className="block text-sm font-medium text-gray-900"
          >
            Modal Name
          </label>
          <div className="mt-1">
            <input
              id="modalName"
              name="modalName"
              type="text"
              autoComplete="off"
              placeholder="eg. Ducati"
              defaultValue={actionType === "edit" ? formData.modalName : ""}
              {...register("modalName", {
                required: true,
                pattern: regexForName,
              })}
              className={clsx(
                errors.modalName
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
              )}
            />
          </div>
          <p className="text-sm font-semibold text-red-500">
            {getErrorMessage(errors, "modalName", "Modal Name")}
          </p>
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-900"
          >
            Color
          </label>
          <div className="mt-1">
            <div className="mt-1">
              <select
                id="color"
                name="color"
                className={clsx(
                  errors.color
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                  "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                )}
                defaultValue={actionType === "edit" ? formData.color : ""}
                {...register("color", {
                  required: true,
                })}
              >
                <option>Select Color</option>
                <option>Black</option>
                <option>Blue</option>
                <option>Red</option>
                <option>Gray</option>
                <option>Orange</option>
                <option>Yellow</option>
              </select>
            </div>
          </div>
          {errors.color && (
            <p className="text-sm font-semibold text-red-500">
              Select a Color is Required.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-900"
          >
            Location
          </label>
          <div className="mt-1">
            <div className="mt-1">
              <select
                id="location"
                name="location"
                className={clsx(
                  errors.location
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                  "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                )}
                defaultValue={actionType === "edit" ? formData.location : ""}
                {...register("location", {
                  required: true,
                })}
              >
                <option>Select Location</option>
                <option>Suart</option>
                <option>Baroda</option>
                <option>Gandhinagar</option>
                <option>Ahemdabad</option>
              </select>
            </div>
          </div>
          {errors.location && (
            <p className="text-sm font-semibold text-red-500">
              Select a Location is Required.
            </p>
          )}
        </div>

        <div className="flex items-center justify-start space-x-5">
          <input
            id="isBikeAvailable"
            aria-describedby="is-bike-available"
            name="isBikeAvailable"
            type="checkbox"
            {...register("isBikeAvailable", {})}
            className="w-6 h-6 text-indigo-600 border-gray-300 rounded"
          />
          <label
            htmlFor="isBikeAvailable"
            className="block text-sm font-medium text-gray-900"
          >
            Is bike available for rent ?
          </label>
        </div>

        <div className="space-x-3 sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            Submit
          </button>
          {actionType === "edit" && (
            <button
              type="button"
              onClick={handleDeleteBike}
              className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormContainer;