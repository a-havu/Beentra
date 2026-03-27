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
      <h1 className="flex justify-center">Projects!</h1>
      <CreateProject />
      <DisplayProjects />
    </div>
  );
}
