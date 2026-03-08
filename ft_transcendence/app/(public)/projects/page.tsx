import CreateProject from "@/components/projects/CreateProject";
import DisplayProjects from "@/components/projects/DisplayProjects";
 

export default function ProjectsPage() {
  return (
    <div>
		<br />
      <h1 className="flex justify-center">Projects!</h1><br />
      <CreateProject />
	  <DisplayProjects />
    </div>
  );
}