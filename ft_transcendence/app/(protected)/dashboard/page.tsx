import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Home() {
  const session = await getSession();

  if (!session || session.role != "admin") {
    redirect("/login");
  }

  return (
    <div>
      <h3>
        Welcome, {session.email}, you are {session.role}!
      </h3>
      <h3> Dashboard Page</h3>
      <div className="m-2">
        <Link
          className="px-4 py-2 bg-blue-600 text-white rounded m"
          href="dashboard/infoPages"
        >
          manage pages
        </Link>
      </div>
    </div>
  );
}
