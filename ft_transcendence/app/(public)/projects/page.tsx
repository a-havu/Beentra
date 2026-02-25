import CreateProject from "@/components/projects/CreateProject";
import ProjectForm from "@/components/projects/ProjectForm";

export const metadata ={
  title:'Projects'
}

export default function ProjectsPage() {
  return (
    <div>
      <h3> Projects Page</h3>
	  <CreateProject />
	  <ProjectForm />
    </div>
  );
}
 