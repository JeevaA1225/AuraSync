import React, { createContext, useState, useContext } from 'react';

interface Patient {
    id: number;
    name: string;
    age: number;
    lastVisit: string;
}

interface PatientContextType {
    patients: Patient[];
    addPatient: (patient: Patient) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC = ({ children }) => {
    const [patients, setPatients] = useState<Patient[]>([
        { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-03-10' },
        { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-03-09' },
        { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2024-03-08' },
    ]);

    const addPatient = (patient: Patient) => {
        setPatients([...patients, patient]);
    };

    return (
        <PatientContext.Provider value={{ patients, addPatient }}>
            {children}
        </PatientContext.Provider>
    );
};

export const usePatientContext = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatientContext must be used within a PatientProvider');
    }
    return context;
};
