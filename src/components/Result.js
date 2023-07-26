import React from "react";
import downloadIcon from "../assets/download-icon.png";

export default function Result({ finalUrl, setPage, startTime, setStartTime }) {
  // const finalUrl = data["finalUrl"];
  const [finalDate, setFinalDate] = React.useState(new Date());
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <h1>Your new configuration is ready at:</h1>
      <h1 className="font-bold text-xl text-[#86cd0d]">{finalUrl}</h1>
      {/* <div className="text-center mb-3">
        <p>
          Configuration file is available for{" "}
          <span className="font-bold">24 hours</span>!
        </p>
      </div>
      <Link className="font-bold text-gray-800 text-2xl" to={finalUrl}>
        <div className="flex hover:cursor-pointer bg-[#86cd0d] hover:bg-[#67a105] rounded-md px-4 py-3">
          Download your new configuration
          <img className="ml-4" src={downloadIcon}></img>
        </div>
      </Link> */}
      <button
        className="mt-5 font-bold text-black px-2 rounded-md hover:cursor-pointer hover:bg-gray-300 bg-white"
        onClick={() => {
          setPage(0);
          setStartTime(new Date());
        }}
      >
        Convert Again!
      </button>
      <p className="mt-2">
        Start Time:{" "}
        <span className="font-bold">{startTime.toLocaleTimeString()}</span>
      </p>
      <p>
        End Time:{" "}
        <span className="font-bold mt-2">{finalDate.toLocaleTimeString()}</span>
      </p>
    </div>
  );
}
