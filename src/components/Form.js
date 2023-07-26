import React from "react";
import swapIcon from "../assets/swap-icon.png";
import uploadIcon from "../assets/upload-icon.png";
import crossIcon from "../assets/cross-icon.png";
// import getPresignedURL from "../adapters/uploadToS3";
import uploadTest from "../adapters/uploadTest";
import { fgtTimezone, srxTimezone } from "./timezone.js";

export default function Form(props) {
  const handleFileChange = (e) => {
    props.setFile();

    if (e.target.files) {
      if (e.target.files[0].type === "text/plain")
        props.setFile(e.target.files[0]);
      else {
        props.setIsFile("border-red-500 border-3");
        props.setErrorFile("File must be text/plain");
      }
    }
  };

  const onSubmit = async (e) => {
    props.setResult({});
    // const fileName = props.file["name"];
    const file = props.file;
    props.setUploading(true);
    const body = {
      // fileName: fileName,
      file: file,
      timezone: props.timezone,
      destination: props.destinationDevice,
    };
    // const result = await getPresignedURL(body, props.file, props.uploading);
    const result = await uploadTest(body);
    props.setUploading(false);
    props.setResult(result);
    console.log(result);
    if (result["status"] === 200) {
      props.setPage(1);
    }
  };

  const swapDevice = (e) => {
    e.preventDefault();
    let temp = props.sourceDevice;
    props.setSourceDevice(props.destinationDevice);
    props.setDestinationDevice(temp);
  };

  const resetFile = (e) => {
    e.preventDefault();
    props.setFile();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setStartTime(new Date());
    props.setErrorFile("");
    props.setIsSource("border-gray-300");
    props.setIsDst("border-gray-300");
    props.setIsTz("border-gray-300");
    props.setIsFile("border-gray-300");
    const data = {
      timezone: props.timezone,
      source: props.sourceDevice,
      destination: props.destinationDevice,
      file: props.file,
    };
    if (data.source === "" || data.source === "source")
      props.setIsSource("border-red-500 border-3");
    if (data.destination === "" || data.destination === "destination")
      props.setIsDst("border-red-500 border-3");
    if (data.timezone === "" || data.timezone === "Timezone")
      props.setIsTz("border-red-500 border-3");
    if (data.file === undefined) props.setIsFile("border-red-500 border-3");

    if (
      data.source !== "" &&
      data.destination !== "" &&
      data.file !== undefined
    ) {
      props.setIsSource("border-gray-300");
      props.setIsDst("border-gray-300");
      props.setIsTz("border-gray-300");
      props.setIsFile("border-gray-300");
      if (props.destinationDevice.toLowerCase() === "junipersrx") onSubmit(e);
      else if (props.destinationDevice.toLowerCase() === "fortigate") {
        if (data.timezone !== "" && data.timezone !== "Timezone") onSubmit(e);
      }
    }
  };

  return (
    <form className="flex flex-col my-14">
      <p className="my-3">
        Choose the <span className="font-bold ">source</span> and{" "}
        <span className="font-bold ">destination</span> device vendor
      </p>
      <div className="flex flex-col lg:flex-row lg:items-center my-3 w-full">
        <div className="flex flex-col">
          <select
            className={`bg-gray border ${props.isSource} text-gray-900 mr-2 2xl:mr-0 rounded-md block w-56  px-2 py-1 hover:cursor-pointer`}
            value={props.sourceDevice}
            onChange={(e) => props.setSourceDevice(e.target.value)}
            required
          >
            <option defaultValue={props.sourceDevice}>source</option>
            {props.srcDeviceList.map((device) => {
              return <option value={device}>{device}</option>;
            })}
          </select>
        </div>
        <button
          className="mx-2 hover:bg-green-500 2xl:block hidden py-1.5 px-2 rounded-md bg-[#86cd0d]"
          onClick={swapDevice}
        >
          <img src={swapIcon} alt="swap-icon" className="w-7"></img>
        </button>
        <div className="flex flex-col lg:mt-0 mt-3 mr-5">
          <select
            className={`bg-gray border ${props.isDst} text-gray-900 rounded-md block w-56  px-2 py-1 hover:cursor-pointer`}
            value={props.destinationDevice}
            onChange={(e) => props.setDestinationDevice(e.target.value)}
            required
          >
            <option defaultValue={props.destinationDevice}>destination</option>
            {props.dstDeviceList.map((device) => {
              if (props.sourceDevice !== device)
                return <option value={device}>{device}</option>;
              return null;
            })}
          </select>
        </div>
      </div>
      {props.destinationDevice.toLowerCase() === "fortigate" ? (
        <div className="grid lg:grid-rows-2 grid rows-1 lg:w-4/5">
          <div className="grid lg:grid-cols-2 items-center mb-2">
            <p className="">
              Choose <span className="font-bold mr- mb-2">Timezone</span>
            </p>
            <select
              className={`bg-gray border ${props.isTz} text-gray-900 rounded-md lg:mt-0 block w-48 px-2 py-1 hover:cursor-pointer`}
              required
              onChange={(e) => {
                if (props.destinationDevice.toLowerCase() === "junipersrx")
                  props.setTimezone(e.target.value);
                else if (
                  props.destinationDevice.toLowerCase() === "fortigate"
                ) {
                  let tz = e.target.value
                    .replace("{", "")
                    .split(":")[0]
                    .replace('"', "");
                  if (tz.toString().length == 1) {
                    tz = "0" + tz;
                  }
                  props.setTimezone(tz);
                }
              }}
            >
              <option defaultValue="">Timezone</option>

              {props.destinationDevice.toLowerCase() === "fortigate"
                ? fgtTimezone.map((tz, k) => (
                    <option key={k} value={`{"${k}: ${tz}}`}>
                      {tz}
                    </option>
                  ))
                : props.destinationDevice.toLowerCase() === "junipersrx"
                ? srxTimezone.map((tz) => <option value={tz}>{tz}</option>)
                : null}
            </select>
          </div>
        </div>
      ) : null}
      {props.sourceDevice.toLowerCase() === "junipersrx" ? (
        <div className="mt-2 mb-5">
          <div>
            <p className="font-bold mb-2">Show command:</p>
            <code className="px-3 py-2 rounded-md bg-gray-500/40">
              show configuration | no-more | display set{" "}
            </code>
          </div>
        </div>
      ) : null}
      <div className="grid lg:grid-rows-2 grid-rows-1 lg:w-4/5">
        <div className="grid lg:grid-cols-2 items-center">
          <p className="lg:mt-0 my-3">
            Upload your <span className="font-bold ">configuration</span>
          </p>
          <div className="text-center">
            <label
              htmlFor="files"
              className={`flex flex-row justify-center bg-gray-100 border ${props.isFile} text-gray-900 block py-1 px-2 rounded-md w-48 hover:cursor-pointer hover:bg-gray-200`}
            >
              {props.file ? (
                <div className="flex flex-row items-center justify-between bg-gray-100 px-1 text-gray-900 block rounded-md w-48 hover:cursor-pointer hover:bg-gray-200">
                  <span className="font-bold">{props.file.name}</span>{" "}
                  <button onClick={resetFile}>
                    <img
                      src={crossIcon}
                      alt="cross-icon"
                      className="ml-4 w-5"
                    ></img>
                  </button>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-between bg-gray-100 px-1 text-gray-900 block rounded-md w-48 hover:cursor-pointer hover:bg-gray-200">
                  Upload file{" "}
                  <img src={uploadIcon} alt="upload" className="ml-4 w-5"></img>
                </div>
              )}
            </label>
            <input
              accept="text/plain"
              id="files"
              type="file"
              name="configFile"
              className="hidden"
              onInput={handleFileChange}
              value=""
              required
            />
          </div>
          {props.errorFile === "" ? (
            ""
          ) : (
            <p className="text-red-400">{props.errorFile}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="rounded w-36 h-9 bg-[#86cd0d] text-black font-bold my-10 hover:bg-[#67a105] disabled:transform-none disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={props.uploading}
      >
        {props.uploading ? (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          "Convert"
        )}
      </button>
    </form>
  );
}
