import { Button } from "../ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Sidebar({
  userEmail,
  onButtonClick,
}: {
  userEmail: string;
  onButtonClick: any;
}) {
  const isMobile = useIsMobile();
  return (
    <aside className="flex flex-col gap-5 md:w-64 rounded-tl-xl rounded-bl-xl bg-white shadow-sm p-6">
      <div className="flex flex-col md:mb-8">
        <h1 className="text-2xl text-center font-bold text-[#255a8b]">
          Admin Dashboard
        </h1>
        <p className="text-sm text-center text-gray-600">
          Welcome, {userEmail}
        </p>
      </div>
      <nav className="grid grid-cols-3 gap-2 md:flex md:flex-col items-center md:gap-3 md:space-y-3">
        <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("users")}
        >
          Users
        </Button>
        <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("events")}
        >
          Events
        </Button>
        <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("projects")}
        >
          Projects
        </Button>
        <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("pages")}
        >
          Pages
        </Button>
        {/* <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("add-page")}
        >
          Add Page
        </Button> */}
        <Button
          variant="sidebar"
          size={isMobile ? "xsmall" : "medium"}
          onClick={() => onButtonClick("welcome")}
        >
          Back Home
        </Button>
      </nav>
    </aside>
  );
}
