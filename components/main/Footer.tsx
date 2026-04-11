import Menu from "./Menu";
import SecondMenu from "./SecondMenu";

export default function Footer() {
  return (
    <div className="flex flex-col mt-15">
      <div>
        <SecondMenu />
      </div>
      <div>
        <p> Great team do anything</p>
      </div>
    </div>
  );
}
