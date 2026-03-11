import Link from "next/link";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  creator?: { username: string } | null;
};

export default function ProjectCard({ project}: { project: Project;}) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="project-card">
      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">
        🐝
      </div>
      <div className="p-4">
        <h2>{project.projectName}</h2>
        <p>{project.oneLiner}</p>
        {project.creator && (
          <p>@{project.creator.username}</p>
        )}
      </div>
    </div>
    </Link>
  );
}