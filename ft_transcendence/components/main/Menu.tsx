import Link from "next/link";

export default function Menu() {
  return (
  <ul className="flex w-full md:w-auto flex-col md:flex-row gap-4 justify-center items-center">
       <li>
        <Link href="/projects">Projects</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/terms">Terms</Link>
      </li>
      <li>
        <Link href="/faqs">FAQ</Link>
      </li>
    </ul>
  );
}
