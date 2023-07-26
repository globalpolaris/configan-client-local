import { components } from "react-select";
const CustomComponent = ({ children, ...props }) => {
  console.log("Halo");
  return (
    <div>
      <components.CustomComponent {...props}>
        {console.log(props)}
        <input type="checkbox" checked={true} onChange={() => null}>
          <label>{props.label}</label>
        </input>
      </components.CustomComponent>
    </div>
  );
};

export default CustomComponent;
