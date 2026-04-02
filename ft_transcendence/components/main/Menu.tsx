import Link from "next/link";

export default function Menu() {
  return (
    <ul className="flex flex-row gap-4 items-center">
      <li>
        <Link href="/projects">Projects</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="https://room.hive.fi">BookMe</Link>
      </li>
    </ul>
  );
}
