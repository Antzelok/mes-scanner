import { Metadata } from "next";
import ErrorForm from "./error-form";

export const metadata: Metadata = {
  title: "Καταχώρηση Πεδίου",
};

const ErrorFormPage = () => {
  return (
    <>
      <ErrorForm />
    </>
  );
};

export default ErrorFormPage;
