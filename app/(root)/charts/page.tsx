import { Metadata } from "next";
import Charts from "./charts";

export const metadata: Metadata = {
  title: "Chart",
};

const ChartsPage = () => {
  return <Charts />;
};

export default ChartsPage;
