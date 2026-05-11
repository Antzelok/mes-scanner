import { Metadata } from "next";
import Button from "@/components/errorForm/button";
import { GiField } from "react-icons/gi";
import { FaGitlab } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Αρχική",
};

const HomePage = () => {
  return (
    <main className="flex items-center justify-center py-12 px-6 ">
      <div className="w-200">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Console
          </h1>
          <p className="text-slate-500 font-medium">
            Manage and monitor system entries
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Main Large Box (Full Width) */}
          <div className="col-span-2">
            <Button
              label="Καταχώρηση Πεδίου"
              link="/errorForm"
              className="group relative overflow-hidden w-full h-40 bg-[#3b82f6] rounded-4xl flex flex-col items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98]"
              icon={
                <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <GiField size={40} className="text-white" />
                </div>
              }
              // Adjusting the label style via a custom class if your Button component supports it
              labelClassName="text-white text-xl font-bold"
            />
          </div>
          <div className="col-span-2">
            <Button
              label="Καταχώρηση Εργαστηρίου"
              link="/errorForm"
              className="group relative overflow-hidden w-full h-40 bg-[#3b82f6] rounded-4xl flex flex-col items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98]"
              icon={
                <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <FaGitlab size={40} className="text-white" />
                </div>
              }
              // Adjusting the label style via a custom class if your Button component supports it
              labelClassName="text-white text-xl font-bold"
            />
          </div>

          {/* Square Box 1: History */}
          <div className="col-span-1">
            <Button
              label="Ιστορικό"
              link="/history"
              className="w-full h-48 bg-white border border-slate-200 rounded-4xl flex flex-col items-center justify-center gap-4 transition-all hover:border-[#3b82f6] hover:shadow-xl hover:shadow-slate-200 group active:scale-[0.97]"
              icon={
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  <MdHistory
                    size={32}
                    className="text-slate-600 group-hover:text-[#3b82f6]"
                  />
                </div>
              }
              labelClassName="text-slate-700 font-semibold"
            />
          </div>

          {/* Square Box 2: Charts */}
          <div className="col-span-1">
            <Button
              label="Charts"
              link="/charts"
              className="w-full h-48 bg-white border border-slate-200 rounded-4xl flex flex-col items-center justify-center gap-4 transition-all hover:border-[#3b82f6] hover:shadow-xl hover:shadow-slate-200 group active:scale-[0.97]"
              icon={
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  <IoStatsChartOutline
                    size={30}
                    className="text-slate-600 group-hover:text-[#3b82f6]"
                  />
                </div>
              }
              labelClassName="text-slate-700 font-semibold"
            />
          </div>
        </div>

        {/* Quick Footer Info */}
        <div className="mt-8 px-4 flex justify-between items-center text-slate-400 text-xs font-semibold tracking-widest">
          <span>v1.0.4</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            CONNECTED
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
