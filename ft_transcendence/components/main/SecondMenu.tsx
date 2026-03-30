import Link from "next/link";

export default function SecondMenu() {
  return (
  <ul className="flex w-full md:w-auto flex-col md:flex-row justify-center items-center">
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
    </ul>
  );
}
