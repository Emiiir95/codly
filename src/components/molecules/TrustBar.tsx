import { Zap, Users, MapPin } from "lucide-react";

type Props = {
  projectsLabel: string;
  satisfactionLabel: string;
  locationLabel: string;
};

export default function TrustBar({
  projectsLabel,
  satisfactionLabel,
  locationLabel,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-8 py-5 shadow-sm">
      <TrustItem icon={<Zap size={20} />} label={projectsLabel} />
      <div className="hidden h-6 w-px bg-[var(--color-border)] sm:block" />
      <TrustItem icon={<Users size={20} />} label={satisfactionLabel} />
      <div className="hidden h-6 w-px bg-[var(--color-border)] sm:block" />
      <TrustItem icon={<MapPin size={20} />} label={locationLabel} />
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-fg)]">
      <span className="text-[var(--color-accent)]">{icon}</span>
      {label}
    </div>
  );
}
