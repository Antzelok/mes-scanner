"use client";

import { useGetErrorsHistoryQuery } from "@/app/redux/api";
import { ErrorForm } from "@/types";
import BackButton from "@/components/shared/back-button";
import Search from "@/components/history/search";
import { useState } from "react";
import Loader from "@/components/shared/loader";

const HistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetErrorsHistoryQuery(searchTerm);
  const records: ErrorForm[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-20">
        <Loader />
        <span className="ml-2 mt-4 text-gray-500 animate-pulse">
          Φόρτωση δεδομένων...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 bg-red-50 text-red-700 p-10 rounded-lg flex flex-col items-center border border-red-200">
        <span className="font-bold">Κάτι πήγε στραβά!</span>
        <span className="text-sm">
          Σφάλμα κατά την ανάκτηση δεδομένων. Παρακαλώ δοκιμάστε ξανά.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full p-2 md:p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <BackButton />
        <Search onSearch={setSearchTerm} />
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col space-y-4 m-1">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            Δεν βρέθηκαν αποτελέσματα.
          </p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="bg-white border-gray-200 rounded-xl p-4 shadow-xl"
            >
              {/* Header: Date and Box Number */}
              <div className="flex justify-between items-start py-2 border-b border-gray-50 mb-3">
                <div>
                  <div className="text-xs font-bold text-gray-400">ΗΜ/ΝΙΑ</div>
                  <div className="text-sm font-medium">
                    {new Date(record.date).toLocaleDateString()}
                    <span className="ml-2 text-gray-400 font-normal">
                      {new Date(record.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400">
                    ΑΡ. ΥΔ/ΨΙΑΣ
                  </div>
                  <div className="text-sm font-bold font-mono">
                    {record.boxNumber}
                  </div>
                </div>
              </div>

              {/* Device and Location */}
              <div className="mb-3 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-bold text-gray-400">ΣΥΣΚΕΥΗ</div>
                  <div className="text-sm font-bold text-gray-900">
                    {record.serialNumber}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    {record.deveui}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400">
                    ΤΟΠΟΘΕΣΙΑ
                  </div>
                  <div className="text-[12px] font-mono text-blue-600">
                    {record.latitude.toFixed(4)},<br />
                    {record.longitude.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* Types and Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 ">
                    ΒΛΑΒΗ
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record.types.map((type, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 text-[9px] px-2 py-0.5 rounded-xl font-bold border border-red-200"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400">
                    ΕΝΕΡΓΕΙΕΣ
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record.actions.map((action, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-xl font-bold border border-green-200"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {record.comments && (
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 italic">
                    ΣΧΟΛΙΑ
                  </span>
                  <p className="text-sm text-gray-600 italic leading-tight">
                    {record.comments}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">ΗΜ/ΝΙΑ</th>
              <th className="px-4 py-3">ΣΥΣΚΕΥΗ (S/N & DevEUI)</th>
              <th className="px-4 py-3">ΑΡΙΘΜΟΣ ΥΔ/ΨΙΑΣ</th>
              <th className="px-4 py-3">ΤΟΠΟΘΕΣΙΑ</th>
              <th className="px-4 py-3">ΒΛΑΒΗ</th>
              <th className="px-4 py-3">ΕΝΕΡΓΕΙΕΣ</th>
              <th className="px-4 py-3">ΣΧΟΛΙΑ</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Δεν βρέθηκαν αποτελέσματα.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-700">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(record.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-900">
                      {record.serialNumber}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {record.deveui}
                    </div>
                  </td>
                  {/* NEW BOX NUMBER COLUMN */}
                  <td className="px-4 py-3">
                    <div className="font-mono text-sm font-bold text-gray-700">
                      {record.boxNumber || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-blue-600 text-xs">
                    {record.latitude.toFixed(4)}, {record.longitude.toFixed(4)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {record.types.map((type, i) => (
                        <span
                          key={i}
                          className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded uppercase font-bold border border-red-200"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {record.actions.map((action, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded uppercase font-bold border border-green-200"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 italic text-gray-600 max-w-50 truncate"
                    title={record.comments || ""}
                  >
                    {record.comments || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;

