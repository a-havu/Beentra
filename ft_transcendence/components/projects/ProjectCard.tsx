type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  creator?: { username: string } | null;
};

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">
        🐝
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg">{project.projectName}</h2>
        <p className="text-sm text-gray-500 mt-1">{project.oneLiner}</p>
        {project.creator && (
          <p className="text-xs text-gray-400 mt-2">@{project.creator.username}</p>
        )}
      </div>
    </div>
  );
}
