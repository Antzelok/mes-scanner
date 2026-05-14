import { Metadata } from "next";
import Charts from "./charts";

export const metadata: Metadata = {
  title: "Charts",
};

const ChartsPage = () => {
  return <Charts />;
};

export default ChartsPage;
