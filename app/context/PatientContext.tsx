'use client';
import { createContext, useContext, useState } from 'react';

type PatientContextType = {
  nom: string;
  setNom: (nom: string) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [nom, setNom] = useState('lokas');

  return (
    <PatientContext.Provider value={{ nom, setNom }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) throw new Error('usePatient must be used within PatientProvider');
  return context;
}
