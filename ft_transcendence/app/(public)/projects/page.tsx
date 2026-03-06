'use client';

import CreateProject from "@/components/projects/CreateProject";
import ProjectForm from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import DisplayProjects from "@/components/projects/DisplayProjects";
 

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Projects Page wehee</h1>
      <CreateProject />
	  <DisplayProjects />
    </div>
  );
}