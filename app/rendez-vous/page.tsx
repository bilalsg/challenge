'use client';
import { useState, useEffect } from 'react';
import axios from 'axios'; // <-- import axios
import FilterTabs from '../components/FilterTabs';
import AppointmentCard from '../components/AppointmentCard';

interface Rendezvous {
  patient:string,
  medecin: string;
  specialite: string;
  date: string;
  lieu: string;
  statut: 'passé' | 'à venir';
}

const filtres = ['Tous', 'À venir', 'Passés'];

export default function RendezVousPage() {
  const [filtre, setFiltre] = useState<string>('Tous');
  const [rendezvousData, setRendezvousData] = useState<Rendezvous[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Rendezvous[]>('/data/rendezvous.json');
        setRendezvousData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRendezvous = rendezvousData.filter((rdv) => {
    if (filtre === 'Tous') return true;
    if (filtre === 'À venir') return rdv.statut === 'à venir';
    if (filtre === 'Passés') return rdv.statut === 'passé';
    return true;
  });

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Mes Rendez-vous</h1>
        <div className="text-center py-8">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Mes Rendez-vous</h1>
        <div className="text-center py-8 text-red-500">
          Erreur: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes Rendez-vous</h1>
      
      <FilterTabs options={filtres} selected={filtre} onChange={setFiltre} />
      
      <div className="space-y-4">
        {filteredRendezvous.length > 0 ? (
          filteredRendezvous.map((rdv, i) => (
            <AppointmentCard key={i} {...rdv} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun rendez-vous trouvé pour ce filtre.
          </div>
        )}
      </div>
    </div>
  );
}
