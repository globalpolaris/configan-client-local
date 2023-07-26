import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import Illustration from "../assets/illustration.png";
import Firewall from "../components/Firewall";
import Result from "../components/Result";

export default function Index() {
  const [sourceDevice, setSourceDevice] = React.useState("");
  const [destinationDevice, setDestinationDevice] = React.useState("");
  const [timezone, setTimezone] = React.useState("");
  const [isSource, setIsSource] = React.useState("border-gray-300");
  const [isDst, setIsDst] = React.useState("border-gray-300");
  const [isTz, setIsTz] = React.useState("border-gray-300");
  const [isFile, setIsFile] = React.useState("border-gray-300");
  const [file, setFile] = React.useState();
  const [errorFile, setErrorFile] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [result, setResult] = React.useState({});
  const srcDeviceList = ["JuniperSRX", "Fortigate"];
  const dstDeviceList = ["Fortigate", "JuniperSRX"];
  const [page, setPage] = React.useState(0);
  const [securityZone, setSecurityZone] = React.useState([]);
  const [finalUrl, setFinalUrl] = React.useState("");
  const [startTime, setStartTime] = React.useState();

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return (
          <div className="grid grid-cols-2 place-items-center">
            <Form
              setPage={setPage}
              srcDeviceList={srcDeviceList}
              dstDeviceList={dstDeviceList}
              sourceDevice={sourceDevice}
              destinationDevice={destinationDevice}
              timezone={timezone}
              isSource={isSource}
              isDst={isDst}
              isTz={isTz}
              isFile={isFile}
              file={file}
              errorFile={errorFile}
              uploading={uploading}
              result={result}
              startTime={startTime}
              setSourceDevice={setSourceDevice}
              setDestinationDevice={setDestinationDevice}
              setTimezone={setTimezone}
              setIsSource={setIsSource}
              setIsDst={setIsDst}
              setIsTz={setIsTz}
              setIsFile={setIsFile}
              setFile={setFile}
              setErrorFile={setErrorFile}
              setUploading={setUploading}
              setResult={setResult}
              setStartTime={setStartTime}
            />
            <img src={Illustration} className="w-4/6 hidden xl:block"></img>
          </div>
        );
      case 1:
        return (
          <Firewall
            isTz={isTz}
            timezone={timezone}
            setTimezone={setTimezone}
            destinationDevice={destinationDevice}
            result={result}
            securityZone={securityZone}
            setSecurityZone={setSecurityZone}
            setPage={setPage}
            setFinalUrl={setFinalUrl}
          />
        );
      case 2:
        return (
          <Result
            finalUrl={finalUrl}
            setPage={setPage}
            startTime={startTime}
            setStartTime={setStartTime}
          />
        );
    }
  };
  return (
    <div className="m-8 mt-24 w-10/12">
      <div className="">
        <div>
          <h1 className="font-extrabold text-transparent text-5xl bg-clip-text py-2 bg-gradient-to-tl from-[#00a1ff] to-[#00ff8f]">
            Converting cross-vendor made easy
          </h1>
          {renderSwitch(page)}
        </div>
      </div>
    </div>
  );
}
