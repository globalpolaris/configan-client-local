import React from "react";
import { fgtTimezone, srxTimezone } from "./timezone.js";
import trashIcon from "../assets/trash-icon.png";
import Select from "react-select";
import { components } from "react-select";

export default function JuniperSrx(props) {
  const [newZone, setNewZone] = React.useState("");
  const [newintf, setNewintf] = React.useState("");
  const [selectZone, setSelectZone] = React.useState("");
  const [selectedPolicy, setSelectedPolicy] = React.useState([]);
  const [intf, setInterface] = React.useState([]);
  const [firewallPolicy, setFirewallPolicy] = React.useState([]);
  const [addressBook, setAddressBook] = React.useState([]);

  const Option = (props) => {
    return (
      <div>
        {" "}
        <components.Option {...props}>
          {" "}
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>{" "}
        </components.Option>{" "}
      </div>
    );
  };
  let policies = props.data["firewall_policy"].map((policy) => ({
    value: policy["name"],
    label: policy["name"],
  }));
  policies = [{ value: "all", label: "Select All" }, ...policies];
  const numOfPolicy = 0;

  let secZoneOpt = props.data["firewall_address"].map((addr) => ({
    value: addr["name"],
    label: `${addr["name"]} - ${addr["ip"]}`,
  }));

  const addFirewallPolicy = (newData) => {
    setFirewallPolicy((fw) => [...fw, newData]);
  };

  const addAddressBook = (newData) => {
    setAddressBook((addr) => [...addr, newData]);
  };

  const onChangeSelect = (opt) => {
    return opt.value;
  };

  return (
    <div className="grid grid-cols-2 justify-items-center w-100 my-12 gap-5 ">
      <div className="lg:flex flex-col items-start bg-gray-800/50 w-full h-full rounded-lg p-2 px-10">
        <p className="mb-2">
          <span className="font-bold mr-3">Timezone</span>
        </p>
        <select
          className={`bg-gray border ${props.isTz} text-gray-900 rounded-md lg:mt-0 mt-3 block w-48 px-2 py-1 hover:cursor-pointer`}
          required
          onChange={(e) => {
            if (props.destinationDevice.toLowerCase() === "junipersrx")
              props.setTimezone(e.target.value);
            else if (props.destinationDevice.toLowerCase() === "fortigate") {
              let tz = e.target.value
                .replace("{", "")
                .split(":")[0]
                .replace('"', "");
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

      <div className="bg-gray-800/50 w-full h-full rounded-lg grid auto-rows-max p-2 px-10">
        <h1 className="text-center font-bold mb-4">Security Zones</h1>
        <div className="grid grid-cols-5 justify-items-start gap-2">
          <input
            minLength={1}
            maxLength={200}
            type="text"
            value={newZone}
            onChange={(e) => setNewZone(e.target.value)}
            placeholder="Add security zone..."
            className="rounded-sm w-full col-span-2 py-1 px-2 text-black outline-none"
          ></input>
          <button
            onClick={() => {
              if (!props.securityZone.includes(newZone) && newZone.length > 1) {
                props.setSecurityZone((zone) => [...zone, newZone]);
                addAddressBook({
                  securityZone: newZone,
                  member: [],
                });
                setNewZone("");
              }
            }}
            className="flex justify-center bg-[#86cd0d] hover:hover:bg-[#67a105]  w-5/12 text-xl rounded-sm text-black font-bold"
          >
            +
          </button>
        </div>

        <div className=" bg-gray-800 mt-2 rounded-sm  overflow-auto max-h-80">
          {props.securityZone.length === 0 ? (
            <em>No security zone</em>
          ) : (
            props.securityZone.map((v) => {
              return (
                <div className="flex flex-row justify-between my-2 px-2 py-1 rounded-sm">
                  <p className="font-bold">{v}</p>
                  <button
                    onClick={() =>
                      props.setSecurityZone(
                        props.securityZone.filter((item) => item !== v)
                      )
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

      <div className="bg-gray-800/50 w-full h-80 col-span-2 rounded-lg grid grid-flow-row auto-rows-max p-12  overflow-auto">
        <h1 className="text-center font-bold mb-4">Firewall Policies</h1>
        {firewallPolicy.length > 0
          ? firewallPolicy.map((policy, idx) => {
              return (
                <>
                  <div className="flex flex-row justify-between items-end px-5">
                    <div className="flex flex-row ">
                      <div className="mr-5">
                        <p className="font-bold mb-2 ">From zone</p>
                        <select
                          defaultValue="default"
                          onChange={(e) => {
                            policy["from-zone"] = e.target.value;
                          }}
                          className="bg-gray-500 rounded-md px-4 outline-none "
                        >
                          <option disabled="disabled" value="default">
                            Select zone
                          </option>
                          {props.securityZone.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </div>
                      <div className="mr-5">
                        <p className="font-bold mb-2">To zone</p>
                        <select
                          defaultValue="default"
                          onChange={(e) => {
                            policy["to-zone"] = e.target.value;
                          }}
                          className="bg-gray-500 rounded-md px-4 outline-none "
                        >
                          <option disabled="disabled" value="default">
                            Select zone
                          </option>
                          {props.securityZone.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setFirewallPolicy((pol) =>
                          pol.filter((p, i) => i != idx)
                        )
                      }
                    >
                      <img src={trashIcon} width={24} />
                    </button>
                  </div>
                  <div className="flex mb-5 mt-2">
                    <Select
                      components={{ Option }}
                      options={policies}
                      placeholder="Select policy ..."
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      isMulti
                      className="col-span-2 w-full text-black px-5"
                      onChange={(choice) => {
                        setSelectedPolicy((opt) => [choice, ...opt]);
                        choice.find((option) => option.value === "all")
                          ? (policy["selected-policy"] = policies.slice(1))
                          : console.log("none");
                        // policy["selected-policy"] = choice;
                        // policy["selected-policy"].map((item) => {
                        //   if (selectedPolicy.indexOf(item) === -1)
                        //     setSelectedPolicy((prev) => [...prev, item]);
                        // });
                      }}
                    />
                  </div>
                </>
              );
            })
          : null}
        <button
          className="ml-5 w-16 bg-gray-500 rounded-sm "
          onClick={() => {
            addFirewallPolicy({
              "from-zone": "",
              "to-zone": "",
              "selected-policy": [],
            });
          }}
        >
          Add
        </button>
      </div>
      <div className="bg-gray-800/50 w-full h-full rounded-lg grid grid-flow-row auto-rows-max p-2">
        <h1 className="text-center font-bold mb-4">Address Group</h1>
        <div className="grid grid-cols-2 justify-items-center">
          <p className="font-bold mb-2">Address group name</p>
          <p className="font-bold mb-2">Security zone</p>
        </div>

        <div className="grid grid-cols-1 max-h-80 overflow-auto">
          <div>
            {props.data["addrgrp"].map((v) => {
              return (
                <div className="grid grid-cols-2 justify-items-center my-1 ">
                  <p>{v["name"]}</p>
                  <select
                    defaultValue="default"
                    onChange={(e) => {
                      v["zone"] = e.target.value;
                    }}
                    className="bg-gray-500 rounded-md px-4 outline-none w-8/12"
                  >
                    <option disabled="disabled" value="default">
                      Select zone
                    </option>
                    {props.securityZone.map((v) => {
                      return <option value={v}>{v}</option>;
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 w-full h-full rounded-lg grid grid-flow-row auto-rows-max p-2 ">
        <h1 className="text-center font-bold mb-4">Static Routes</h1>
        <div className="grid grid-cols-5 justify-items-start gap-2 ml-5 mb-4">
          <input
            minLength={1}
            maxLength={200}
            type="text"
            value={newintf}
            onChange={(e) => setNewintf(e.target.value)}
            placeholder="Add interface..."
            className="rounded-sm w-full col-span-2 py-1 px-2 text-black outline-none"
          ></input>
          <button
            onClick={() => {
              if (!props.securityZone.includes(newintf) && newintf.length > 1) {
                setInterface((intf) => [...intf, newintf]);
                setNewintf("");
              }
            }}
            className="flex justify-center bg-[#86cd0d] hover:hover:bg-[#67a105]  w-5/12 text-xl rounded-sm text-black font-bold"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-2 justify-items-center">
          <p className="font-bold mb-2">Routing</p>
          <p className="font-bold mb-2">Interface</p>
        </div>

        <div className="grid grid-cols-1 max-h-80 overflow-auto">
          <div>
            {props.data["static_route"].map((v) => {
              return (
                <div className="grid grid-cols-2 justify-items-center my-1 ">
                  <div className="flex flex-row">
                    <p className="font-bold mr-1">{v["ip"]}</p> to{" "}
                    <p className="font-bold ml-1">{v["nexthop"]}</p>
                  </div>
                  <select
                    defaultValue="default"
                    onChange={(e) => {
                      v["interface"] = e.target.value;
                    }}
                    className="bg-gray-500 rounded-md px-4 outline-none w-8/12"
                  >
                    <option value="default" disabled="disabled">
                      Select interface
                    </option>
                    {intf.map((v) => {
                      return <option value={v}>{v}</option>;
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 w-full col-span-2 rounded-lg grid grid-flow-row auto-rows-max p-2 h-80 overflow-auto">
        <h1 className="text-center font-bold mb-4">Address Book</h1>
        {/* <div className="grid grid-cols-2 justify-items-center">
          <p className="font-bold mb-2">Address Name</p>
          <p className="font-bold mb-2">Security Zone</p>
        </div> */}

        {props.securityZone.length === 0 ? (
          <em className="text-center">Add security zone to map address book</em>
        ) : (
          addressBook.map((addr) => {
            return (
              <div className="flex flex-col px-5">
                <p className="mb-2">
                  Zone:{" "}
                  <span className="font-bold">{addr["securityZone"]}</span>
                </p>
                <Select
                  isMulti
                  options={secZoneOpt}
                  className="text-black mb-5"
                  placeholder="Select address book ..."
                  onChange={(choice) => (addr["member"] = choice)}
                />
              </div>
            );
          })
        )}
      </div>

      <button className="hover:underline" onClick={() => props.setPage(0)}>
        Cancel
      </button>
      <button
        className=" bg-[#67a105] hover:bg-[#558504] rounded-md px-5 py-2"
        onClick={(e) => {
          props.data["securityZone"] = props.securityZone;
          props.data["timezone"] = props.timezone;
          props.data["mapped_policy"] = firewallPolicy;
          props.data["firewall_policy"].map((item) => {
            firewallPolicy.map((mapped) => {
              mapped["selected-policy"].map((kv) => {
                if (kv["value"] === item["name"]) {
                  item["from-zone"] = mapped["from-zone"];
                  item["to-zone"] = mapped["to-zone"];
                }
              });
            });
          });
          props.data["firewall_address"].map((addr) => {
            addressBook.map((addrb) => {
              addrb["member"].map((item) => {
                if (item["value"] === addr["name"]) {
                  addr["zone"] = addrb["securityZone"];
                }
              });
            });
          });
          console.log(props.data);
          console.log(selectedPolicy);
          props.submitData();
        }}
      >
        Submit
      </button>
    </div>
  );
}
