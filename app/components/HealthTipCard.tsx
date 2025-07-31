type HealthTipProps = {
  categorie: string;
  conseil: string;
};

export default function HealthTipCard({ categorie, conseil }: HealthTipProps) {
  return (
    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
      <h4 className="font-semibold text-blue-700">{categorie}</h4>
      <p className="text-sm text-gray-700 mt-1">{conseil}</p>
    </div>
  );
}
