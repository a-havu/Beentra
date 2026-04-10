import CreateProject from "@/components/projects/CreateProject";
import DisplayProjects from "@/components/projects/DisplayProjects";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div>
		<div className="flex flex-col justify-center p-6">
		<div className="flex flex-col items-center gap-6">
      <h1>All Beentra Projects</h1>
      <div className="flex justify-center">
		<CreateProject />
		</div>
		</div>
	  </div>
      <DisplayProjects />
    </div>
  );
}
