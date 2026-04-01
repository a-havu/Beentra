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
		<div className="flex flex-col justify-center gap-5">
      <h1 className="flex justify-center">All Projects</h1>
      <div className="flex justify-center"><CreateProject /></div>
	  </div>
      <DisplayProjects />
    </div>
  );
}
