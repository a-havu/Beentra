import Link from "next/link";

export default function SecondMenu() {
  return (
    <ul className="flex w-full md:w-auto gap-8 md:gap-2 justify-center items-center">
      <li>
        <Link href="/terms">Terms</Link>
      </li>
      <li>
        <Link href="/privacy">Privacy</Link>
      </li>
    </ul>
  );
}
