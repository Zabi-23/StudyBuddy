



// src/components/SubjectPage.tsx
import React from 'react';

interface SubjectPageProps {
    subject: string | null; 
}

const SubjectPage: React.FC<SubjectPageProps> = ({ subject }) => {
    return (
        <div>
            {subject ? <h2>Ämnesinformation för: {subject}</h2> : <h2>Inga ämnen valda</h2>}
            
        </div>
    );
};

export default SubjectPage;



