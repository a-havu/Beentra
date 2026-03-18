interface ProfileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ProfileCard({ children, className = "", onClick }: ProfileCardProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`beentra-card w-full text-left hover:bg-white/90 transition cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`beentra-card ${className}`}>
      {children}
    </div>
  );
}
