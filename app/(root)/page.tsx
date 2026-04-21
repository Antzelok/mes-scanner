import { Metadata } from "next";
import Button from "@/components/errorForm/button";

export const metadata: Metadata = {
  title: "Home Page",
};

const HomePage = () => {
  return (
    <div className="flex flex-col m-5 space-y-5">
      <Button label="Νέα Καταχώρηση" link="/errorForm" />
      <Button label="Ιστορικό" link="/history" />
      <Button label="Charts" link="/charts" />
    </div>
  );
};

export default HomePage;
