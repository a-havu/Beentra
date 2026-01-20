import Menu from "./Menu";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center bg-gray-800 p-4 h-16 w-full">
      <h3>My events&projects</h3>
      <Menu />
    </header>
  );
}
