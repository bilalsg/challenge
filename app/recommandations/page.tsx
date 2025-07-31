'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Recommandation {
  categorie: string;
  conseil: string;
}

export default function RecommandationList() {
  const [recommandations, setRecommandations] = useState<Recommandation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Recommandation[]>('/data/recommandations.json')
      .then((res) => {
        setRecommandations(res.data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des recommandations:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Chargement des recommandations...</p>;

  return (
    <div className="space-y-4">
      {recommandations.map((rec, index) => (
        <div key={index} className="bg-white shadow p-4 rounded-md border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-700">{rec.categorie}</h3>
          <p className="text-gray-800">{rec.conseil}</p>
        </div>
      ))}
    </div>
  );
}
