'use client';

import CreateProject from "@/components/projects/CreateProject";
import ProjectForm from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

// export const metadata = {
//   title:'Projects'
// }

// export default function ProjectsPage() {
//   return (
//     <div>
//       <h1>Projects Page wehee</h1>
// 	  <Button onClick={() => {}} type="button">Create Project by clicking this button</Button>
// 	  <ProjectForm />
//     </div>
//   );
// }
 

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Projects Page wehee</h1>
      <Button onClick={() => setShowForm(true)} type="button">
        Create Project by clicking this button
      </Button>
      {showForm && <ProjectForm mode="create" onSubmit={handleSubmit} />}
    </div>
  );
}