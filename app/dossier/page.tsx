'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Dossier = {
  antecedents: string[];
  allergies: string[];
  traitements: string[];
};

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-6 bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Aucune information.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function DossierPage() {
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        const response = await axios.get<Dossier>('/data/dossier.json');
        setDossier(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) setError(err.message);
        else setError('Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };
    fetchDossier();
  }, []);

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Erreur : {error}</div>;

  if (!dossier)
    return (
      <div className="text-center py-8 text-gray-500">Aucune donnée dans le dossier médical.</div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dossier Médical</h1>
      <Section title="Antécédents" items={dossier.antecedents} />
      <Section title="Allergies" items={dossier.allergies} />
      <Section title="Traitements en cours" items={dossier.traitements} />
    </div>
  );
}
