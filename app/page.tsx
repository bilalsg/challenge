'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import HealthTipCard from './components/HealthTipCard';
import AppointmentCard from './components/AppointmentCard';
import { usePatient } from './context/PatientContext';
type Appointment = {
  patient: string;
  medecin: string;
  specialite: string;
  date: string;
  lieu: string;
  statut: 'passé' | 'à venir';
};

type Recommandation = {
  categorie: string;
  conseil: string;
};

export default function HomePage() {
  const [rendezvous, setRendezvous] = useState<Appointment[]>([]);
  const [recommandations, setRecommandations] = useState<Recommandation[]>([]);
  const patientdada = usePatient()

  useEffect(() => {
    const fetchData = async () => {
      const [rdvRes, recoRes] = await Promise.all([
        axios.get('/data/rendezvous.json'),
        axios.get('/data/recommandations.json'),
      ]);
      setRendezvous(rdvRes.data);
      setRecommandations(recoRes.data);
    };

    fetchData();
  }, []);


  const dernierRdv = [...rendezvous]
    .filter((rdv) => new Date(rdv.date) <= new Date())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const recoDuJour = recommandations[0];

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Bienvenue, {patientdada.nom} 👋</h1>

  <section>
        <h2 className="text-xl font-semibold mb-2">Dernier rendez-vous</h2>
        {dernierRdv ? (
          <AppointmentCard {...dernierRdv} />
            ) : (
              <p>aucun rendez-vous trouvé.</p>
            )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Conseil santé du jour</h2>
        {recoDuJour ? (
         <HealthTipCard {...recoDuJour} />
        ) : (
           <p>Chargement du conseil...</p>
        )}
      </section>
    </main>
  );
}
