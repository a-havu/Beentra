interface ProfileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ProfileCard({ children, className = "", onClick }: ProfileCardProps) {
	const base = `w-full rounded-xl text-left border border-[#91d3e2] bg-white text-black ${className}`
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} text-left hover:bg-white/90 transition cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${base}`}>
      {children}
    </div>
  );
}
