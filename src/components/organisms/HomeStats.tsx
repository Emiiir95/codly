import { useI18n } from "@/lib/i18n";
import StatItem from "@/components/molecules/StatItem";

export default function HomeStats() {
  const { t } = useI18n();
  const stats = [
    { value: "120+", label: t("home.stats.projects") },
    { value: "92%", label: t("home.stats.retention") },
    { value: "98", label: t("home.stats.lighthouse") },
    { value: "76%", label: t("home.stats.ranking") },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <dl className="card grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} />
        ))}
      </dl>
    </div>
  );
}
