import ProjectCard from "@/components/projects/ProjectCard";

export default async function DisplayProjects() {
  const res = await fetch("/api/projects", {
	method: "GET",
	headers: { "Content-Type": "application/json" },
	credentials: "include",
  });
  return(
	<ProjectCard />
  );
}