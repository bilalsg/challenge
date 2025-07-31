type AppointmentProps = {
  medecin: string;
  specialite: string;
  date: string;
  lieu: string;
  statut: "passé" | "à venir";
};

export default function AppointmentCard({ medecin, specialite, date, lieu, statut }: AppointmentProps) {
  const statusColor = statut === "à venir" ? "text-green-600" : "text-gray-500";

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold">{medecin} <span className="text-sm text-gray-500">({specialite})</span></h3>
      <p className="text-sm mt-1">{date} – {lieu}</p>
      <p className={`text-sm mt-1 font-semibold ${statusColor}`}>{statut.toUpperCase()}</p>
    </div>
  );
}
