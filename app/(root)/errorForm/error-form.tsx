"use client";

import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import toast from "react-hot-toast";
import QRScanner from "@/components/errorForm/qrscanner";
import { FiMapPin } from "react-icons/fi";
import { useErrorRecordMutation } from "@/app/redux/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormSchema } from "@/lib/validators";
import { defaultFormValues } from "@/lib/constants";
import { ErrorFormType } from "@/types";
import BackButton from "@/components/shared/back-button";
import Loader from "@/components/shared/loader";
import { typeOptions, actionOptions } from "@/types";

const ErrorForm = () => {
  const [errorRecord, { isLoading }] = useErrorRecordMutation();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ErrorFormType>({
    resolver: zodResolver(errorFormSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!isGeolocationAvailable)
      toast.error("Το browser δεν υποστηρίζει τοποθεσία.");
    if (!isGeolocationEnabled)
      toast.error("Η τοποθεσία είναι απενεργοποιημένη στη συσκευή.");
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  const handleLocationClick = () => {
    if (!coords) {
      toast.error("Η τοποθεσία δεν είναι ακόμα έτοιμη...");
      return;
    }
    setValue("latitude", coords.latitude);
    setValue("longitude", coords.longitude);
    toast.success("Η τοποθεσία ενημερώθηκε!");
  };

  const onSubmit = async (data: ErrorFormType) => {
    try {
      await errorRecord(data).unwrap();
      toast.success("Η βλάβη καταχωρήθηκε!");
      reset(defaultFormValues);
    } catch (error) {
      toast.error("Σφάλμα κατά την καταχώρηση");
      console.error(error);
    }
  };

  const currentDate: string = new Date().toLocaleDateString("el-GR");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6 text-center">Καταχώρηση</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* DATE */}
        <div>
          <label className="font-semibold">Ημερομηνία:</label>
          <input
            value={currentDate}
            readOnly
            className="border rounded-xl p-2 w-full"
          />
        </div>

        {/* LAT-LONG */}
        <div className="flex gap-4 items-end mt-4">
          <div className="flex flex-col flex-1 gap-3">
            <div>
              <label className="font-semibold">Latitude:</label>
              <input
                type="text"
                {...register("latitude", { valueAsNumber: true })}
                className="border rounded-xl p-2 w-full"
              />
              {errors.latitude && (
                <p className="text-red-600">{errors.latitude.message}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Longitude:</label>
              <input
                type="text"
                {...register("longitude", { valueAsNumber: true })}
                className="border rounded-xl p-2 w-full"
              />
              {errors.longitude && (
                <p className="text-red-600">{errors.longitude.message}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleLocationClick}
            className="w-30 h-30 flex items-center justify-center"
          >
            {!coords ? <Loader /> : <FiMapPin size={40} />}
          </button>
        </div>

        {/* QR Scanner */}
        <div className="flex gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div>
              <label className="font-semibold">Serial Number:</label>
              <input
                type="text"
                {...register("serialNumber")}
                className="border rounded-xl p-1 w-full"
              />
              {errors.serialNumber && (
                <p className="text-red-600">{errors.serialNumber.message}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Deveui:</label>
              <input
                type="text"
                {...register("deveui")}
                className="border rounded-xl p-1 w-full"
              />
              {errors.deveui && (
                <p className="text-red-600">{errors.deveui.message}</p>
              )}
            </div>
          </div>

          <div className="w-30 h-30">
            <QRScanner
              onScan={(sn: string, de: string) => {
                setValue("serialNumber", sn);
                setValue("deveui", de);
              }}
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Αριθμός Υδροληψίας:</label>
          <input
            type="text"
            placeholder="πχ Α1-142"
            {...register("boxNumber")}
            className="border rounded-xl p-1 w-full"
          />
          {errors.boxNumber && (
            <p className="text-red-600">{errors.boxNumber.message}</p>
          )}
        </div>

        {/* Types */}
        <div>
          <label className="font-semibold">Είδος Βλάβης:</label>
          <div className="flex flex-col mt-1">
            {typeOptions.map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input type="checkbox" value={t} {...register("types")} />
                {t}
              </label>
            ))}
          </div>
          {errors.types && (
            <p className="text-red-600">{errors.types.message}</p>
          )}
        </div>

        {/* Actions */}
        <div>
          <label className="font-semibold">Ενέργειες:</label>
          <div className="flex flex-col mt-1">
            {actionOptions.map((a) => (
              <label key={a} className="flex items-center gap-2">
                <input type="checkbox" value={a} {...register("actions")} />
                {a}
              </label>
            ))}
          </div>
          {errors.actions && (
            <p className="text-red-600">{errors.actions.message}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="font-semibold">Άλλο σχόλιο:</label>
          <textarea
            {...register("comments")}
            className="border rounded-xl p-2 w-full h-25"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl w-full"
        >
          Καταχώρηση
        </button>
      </form>
    </div>
  );
};

export default ErrorForm;
