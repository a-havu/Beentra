'use client';

import { useState } from "react";

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  creatorId: string | null;
};

type Props = {
  project: ProjectData;
  currentUserId?: string | null;
};

const ProjectCard = ({ project, currentUserId }: Props) => {
  const isCreator = currentUserId && project.creatorId === currentUserId;

  return (
	<div>
	  <h2>{project.name}</h2>
	  <p>{project.description}</p>
	  {project.image && <img src={project.image} alt={project.name} />}
	</div>
  );
};

export default ProjectCard;