import Configan from "../assets/configan.png";
import { Link } from "react-router-dom";

export default function Header({ setPage }) {
  return (
    <header className="flex flex-row py-5 items-center justify-between w-10/12">
      <Link to="/">
        <img width={150} src={Configan}></img>
      </Link>

      {/* <a href="#" className="">
        about
      </a> */}
    </header>
  );
}
