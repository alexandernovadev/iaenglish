import React from "react";
import { FaCircleCheck, FaCircleUp, FaCircleXmark } from "react-icons/fa6";
import { MdOutlineSmartToy } from "react-icons/md";

interface Props {
  feedback?: string;
  status: "WELLDONE" | "SO-SO" | "WRONG";
}

export const FeedBack = ({
  feedback = "Hello, I AI Englishuda",
  status = "WELLDONE",
}: Props) => {
  return (
    <div className="bg-slate-700 rounded-2xl p-2">
      <section className="flex p-1">
        {status == "WELLDONE" ? (
          <div className="flex justify-center items-center gap-2">
            <FaCircleCheck style={{ color: "#4caf50" }} />
            <span style={{ color: "#4caf50" }}>Well Done !</span>
          </div>
        ) : status == "SO-SO" ? (
          <div className="flex justify-center items-center gap-2">
            <FaCircleUp style={{ color: "#ffeb3b" }} />
            <span style={{ color: "#ffeb3b" }}>Well Done !</span>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <FaCircleXmark style={{ color: "#f44336" }} />
            <span style={{ color: "#f44336" }}>Wrong Anserd :'(</span>
          </div>
        )}
      </section>

      <section className="flex gap-2 p-2">
        <MdOutlineSmartToy style={{ fontSize: 32, color: "#e64a19" }} />
        <p>{feedback}</p>
      </section>
    </div>
  );
};
