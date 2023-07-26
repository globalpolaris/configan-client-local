import React from "react";
import downArrow from "../assets/down-arrow.png";
import trashIcon from "../assets/trash-icon.png";

export default function Fortigate({ data, submitData, setPage }) {
  const [showDnatPool, setShowDnatPool] = React.useState(false);
  const [showDnatRuleSet, setShowDnatRuleSet] = React.useState(false);
  const [showRoutingInstance, setShowRoutingInstance] = React.useState(false);
  const [showDns, setShowDns] = React.useState(false);
  const [showNtp, setShowNtp] = React.useState(false);
  const [showStaticRoute, setShowStaticRoute] = React.useState(false);
  const [showFwPolicy, setShowFwPolicy] = React.useState(false);
  const [showSnatPool, setShowSnatPool] = React.useState(false);
  const [showAllData, setShowAllData] = React.useState(false);
  const [lagMember, setLagMember] = React.useState([]);
  const [newMember, setNewMember] = React.useState("");
  const showAll = () => {
    setShowAllData(!showAllData);
    setShowDnatPool(!showDnatPool);
    setShowDnatRuleSet(!showDnatRuleSet);
    setShowRoutingInstance(!showRoutingInstance);
    setShowDns(!showDns);
    setShowNtp(!showNtp);
    setShowStaticRoute(!showStaticRoute);
    setShowFwPolicy(!showFwPolicy);
    setShowSnatPool(!showSnatPool);
  };

  return (
    <div className="mt-5">
      <div className="bg-gray-800/50 w-full h-full rounded-lg grid auto-rows-max p-2 px-10 mb-12">
        <h1 className="text-center font-bold mb-4">
          Aggregate Interface Member
        </h1>
        <div className="grid grid-cols-5 justify-items-start gap-2">
          <input
            minLength={1}
            maxLength={200}
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Add aggregate interface member..."
            className="rounded-sm w-full col-span-2 py-1 px-2 text-black outline-none"
          ></input>
          <button
            onClick={() => {
              if (!lagMember.includes(newMember) && newMember.length > 1) {
                setLagMember((member) => [...member, `"${newMember}"`]);
                setNewMember("");
              }
            }}
            className="flex justify-center bg-[#86cd0d] hover:hover:bg-[#67a105]  w-5/12 text-xl rounded-sm text-black font-bold"
          >
            +
          </button>
        </div>

        <div className=" bg-gray-800 mt-2 rounded-sm  overflow-auto max-h-80">
          {lagMember.length === 0 ? (
            <em>No interface member</em>
          ) : (
            lagMember.map((v) => {
              return (
                <div className="flex flex-row justify-between my-2 px-2 py-1 rounded-sm">
                  <p className="font-bold">{v}</p>
                  <button
                    onClick={() =>
                      setLagMember(lagMember.filter((item) => item !== v))
                    }
                    className="flex justify-center hover:bg-gray-600 p-1 rounded-full"
                  >
                    <img src={trashIcon} alt="trash-icon" className="h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex mb-2 flex-row justify-between">
        <h1>Preview of converted data:</h1>
        <button
          onClick={showAll}
          className="bg-white px-2 rounded-md text-black"
        >
          {showAllData ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowDns(!showDns);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">DNS</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showDns ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showDns ? "block" : "hidden"}`}>
          {data["dns_list"].map((item) => {
            return <p>{item}</p>;
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowNtp(!showNtp);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">NTP</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showNtp ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showNtp ? "block" : "hidden"}`}>
          {data["ntp_list"].map((item) => {
            return <p>{item}</p>;
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowFwPolicy(!showFwPolicy);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">Firewall Policy</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showFwPolicy ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showFwPolicy ? "block" : "hidden"}`}>
          {Object.entries(data["security_policy"]).map(([item, value]) => {
            return (
              <div>
                <div className="mt-2 border-b-2">{item}</div>
                <div className="indent-4">
                  <span className="font-light">Source Interface:</span>
                  {value["src_intf"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Destination Interface:</span>
                  {value["dst_intf"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Source Address:</span>
                  {value["src_addr"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Destination Address:</span>
                  {value["dst_addr"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Application:</span>
                  {value["src_intf"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Action:</span>
                  {value["action"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">Schedule:</span>
                  {value["schedule"]}
                </div>
                <div className="indent-4">
                  <span className="font-light">NAT:</span>
                  {value["nat"]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowStaticRoute(!showStaticRoute);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">Static Route</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showStaticRoute ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showStaticRoute ? "block" : "hidden"}`}>
          {data["static_route"].map((item, i) => {
            return (
              <div className="mb-2">
                <p className="border-b-2">{i}</p>
                <p>
                  <span className="font-light">Destination: </span>
                  {item["ip"]}
                </p>
                <p>
                  <span className="font-light">Gateway: </span>
                  {item["nextHop"]}
                </p>
                <p>
                  <span className="font-light">Device: </span>
                  {item["vrname"]}-{item["vlanid"]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowSnatPool(!showSnatPool);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">SNAT Pool (IP Pool)</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showSnatPool ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showSnatPool ? "block" : "hidden"}`}>
          {data["fw_ippool"].map((item, i) => {
            return (
              <div className="mb-2">
                <p className="border-b-2">{i}</p>
                <p>
                  <span className="font-light">Pool Name: </span>
                  {item["poolName"]}
                </p>
                <p>
                  <span className="font-light">Start IP: </span>
                  {item["startIp"]}
                </p>
                <p>
                  <span className="font-light">End IP: </span>
                  {item["endIp"]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowDnatPool(!showDnatPool);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">DNAT Pool</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showDnatPool ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showDnatPool ? "block" : "hidden"}`}>
          {Object.entries(data["dnat_pool"]).map(([item, v]) => {
            return (
              <div className="mb-2">
                <p className="border-b-2">{item}</p>
                <p className="indent-2 ">
                  <span className="font-light">Mapped IP: </span>
                  {v["mapped_ip"].toString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowDnatRuleSet(!showDnatRuleSet);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">DNAT Rule Set</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showDnatRuleSet ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showDnatRuleSet ? "block" : "hidden"}`}>
          {Object.entries(data["dnat_rule_set"]).map(([item, v]) => {
            return (
              <div className="grid grid-cols-1">
                <p className="indent-2 border-b-2">
                  {item} (from zone: {v["from_zone"]})
                </p>
                <p className="font-medium indent-4">Rules:</p>
                {Object.entries(v["rules"]).map(([k, member]) => {
                  return (
                    <div>
                      <p className="indent-6">{k}</p>
                      <p className="indent-8">
                        <span className="font-light">
                          Destination Address:{" "}
                        </span>
                        {member["dst_addr"]}
                      </p>
                      <p className="indent-8">
                        <span className="font-light">Destination Pool: </span>
                        {member["dst_pool"]}
                      </p>
                      <p className="indent-8">
                        <span className="font-light">Mapped IP: </span>
                        {member["mapped_ip"]}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-md bg-gray-800/50 px-2 my-1 overflow-y-auto hover:cursor-pointer"
        onClick={() => {
          setShowRoutingInstance(!showRoutingInstance);
        }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="my-2 font-bold">Routing Instance</p>
          <img
            src={downArrow}
            className={`w-4 h-4 ${!showRoutingInstance ? "" : "rotate-180"}`}
          />
        </div>
        <div className={`${showRoutingInstance ? "block" : "hidden"}`}>
          {Object.entries(data["routing_instance"]).map(([item, v]) => {
            return (
              <div className="grid grid-cols-1">
                <p className="indent-2 border-b-2">{item}</p>
                <p className="indent-4">
                  <span className="font-light">IP Address: </span>
                  {v["ip"]}
                </p>
                <p className="indent-4">
                  <span className="font-light">Next Hop: </span>
                  {v["next_hop"]}
                </p>
                <p className="indent-4">
                  <span className="font-light">Statement:</span>
                  {v["statement"]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button
          onClick={() => setPage(0)}
          className="mr-5 mt-2 hover:underline"
        >
          Back
        </button>
        <button
          onClick={() => {
            data["lag-member"] = lagMember;
            submitData();
          }}
          className="px-5 py-1 mt-2 bg-[#67a105] hover:bg-[#558504] rounded-md"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
