/* 
//QuestionForm.tsx 

import React, { useState } from 'react';
import axios from 'axios';
import SubjectModal from './SubjectModal'; 

const QuestionForm: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); 
        try {
            const response = await axios.post('http://localhost:5000/api/questions', {
                question,
                subject,
                userId: 'user_id_here'  
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error posting question:", error);
            setError('Det gick inte att skicka frågan. Försök igen.');
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleSelectSubject = (selectedSubject: string) => {
        setSubject(selectedSubject);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Ställ din fråga" 
                    required
                />
                <input 
                    type="text" 
                    value={subject} 
                    onClick={openModal} 
                    placeholder="Ämne (klicka för att välja)" 
                    readOnly 
                    required
                />
                <button type="submit">Skicka</button>
            </form>
            <SubjectModal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                onSelectSubject={handleSelectSubject} 
            />
            {answer && <p>Svar: {answer}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </div>
    );
};

export default QuestionForm;


 */

// QuestionForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import SubjectModal from './SubjectModal';

const QuestionForm: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); 
        try {
            const response = await axios.post('http://localhost:5000/api/questions', {
                question,
                subject,
                userId: 'user_id_here'
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error posting question:", error);
            setError('Det gick inte att skicka frågan. Försök igen.');
        }
    };

    const closeModal = () => setIsModalOpen(false);
    
    const handleSelectSubject = (selectedSubject: string) => {
        setSubject(selectedSubject);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Ställ din fråga" 
                    required
                />
               
                <button type="submit">Skicka</button>
            </form>

            {/* Lägg till en box under frågerutan där svaret visas */}
            {answer && (
                <div className="answer-box">
                    <h3>Svar:</h3>
                    <p>{answer}</p>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <SubjectModal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                onSelectSubject={handleSelectSubject} 
            />
        </div>
    );
};

export default QuestionForm;
