'use client'
// HOX HOX this component can be discarded, as we're using a separate project page
type Project = {
  projectName: string;
  oneLiner: string;
  link?: string | null;
  techStack?: string | null;
  description?: string | null;
  creator?: { username: string } | null;
  image?: string | null;
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  console.log(project);
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-xl overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-6xl mb-4">
          {project.image
            ? <img src={project.image} alt={project.projectName} />
            : <span>🐝</span>
          }
        </div>
        <h2 className="text-2xl font-bold">{project.projectName}</h2>
        {project.creator && (
          <p className="text-sm text-gray-400 mb-2">@{project.creator.username}</p>
        )}
        <p className="text-gray-600 mt-1">{project.oneLiner}</p>
        {project.techStack && (
          <p className="text-sm text-gray-500 mt-3"><span className="font-medium">Tech:</span> {project.techStack}</p>
        )}
        {project.description && (
          <p className="text-sm text-gray-600 mt-2">{project.description}</p>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-500 hover:underline text-sm">
            Visit project →
          </a>
        )}
        <button onClick={onClose} className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
          Close
        </button>
      </div>
    </div>
  );
}