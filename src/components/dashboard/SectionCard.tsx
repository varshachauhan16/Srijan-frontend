import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ title, children, className = "" }: Props) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[var(--shadow-card)] bg-card ${className}`}>
      <div className="bg-[image:var(--gradient-pink)] text-white text-center py-3">
        <h2 className="text-xl font-bold tracking-wide">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default SectionCard;