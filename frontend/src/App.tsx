/* 

import './global.d.ts';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import QuestionForm from './components/QuestionForm';
import MathRenderer from './components/MathRenderer';
import MathEditor from './components/MathEditor';
import SubjectModal from './components/SubjectModal';
import SubjectPage from './components/SubjectPage'; 
import './App.css';

import biologyBook from './assets/books/Biologi.jpg';
import englishBook from './assets/books/English.jpg';
import fysikBook from './assets/books/Fysik.jpeg';
import geographyBook from './assets/books/Geografi.jpg';
import chemistryBook from './assets/books/kemi.jpg';
import mathematicsBook from './assets/books/Mattematik.jpg';
import modernlanguageBook from './assets/books/Modern-språk.jpg';
import religionBook from './assets/books/Religion.jpg';
import historyBook from './assets/books/Svenska.jpg';
import swedishBook from './assets/books/Svenska.jpg';
import technologyBook from './assets/books/Teknik.jpg';
import otherBook from './assets/books/Övrigt.jpg';

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [latexExpression, setLatexExpression] = useState<string>(''); 

    const handleLatexChange = (latex: string) => {
        setLatexExpression(latex); 
        console.log('New LaTeX:', latex);
    };

    const handleSelectSubject = (subject: string) => {
        setSelectedSubject(subject); 
        console.log('Selected Subject:', subject);
        setModalOpen(false);
    };

    const getBookImage = () => {
        switch (selectedSubject) {
            case 'Engelska':
                return englishBook;
            case 'Matematik':
                return mathematicsBook; 
            case 'Svenska':
                return swedishBook;
            case 'Biologi':
                return biologyBook;
            case 'Fysik':
                return fysikBook;
            case 'Kemi':
                return chemistryBook;
            case 'Geografi':
                return geographyBook;
            case 'Historia':
                return historyBook;
            case 'Religion':
                return religionBook;
            case 'Teknik':
                return technologyBook;
            case 'Modern-språk':
                return modernlanguageBook;
            case 'Övrigt':
                return otherBook;
            default:
                return '';
        }
    };

    return (
        <Router>
            <div>
                <h1>StudyBuddy-AI</h1>
                <button onClick={() => setModalOpen(true)}>Välj Ämne</button>
                <SubjectModal 
                    isOpen={isModalOpen} 
                    onRequestClose={() => setModalOpen(false)} 
                    onSelectSubject={handleSelectSubject} 
                />
                <QuestionForm />
                
                {selectedSubject && (
                    <h2>Valt ämne: {selectedSubject}</h2>
                )}
                
                {getBookImage() && (
                    <div className="book-container">
                        <img src={getBookImage()} alt={`${selectedSubject} bok`} className="book-image" />
                    </div>
                )}
                
                {selectedSubject === 'Matematik' && (
                    <div>
                        <MathEditor onChange={handleLatexChange} />
                        <MathRenderer expression={latexExpression} /> 
                    </div>
                )}

                <Routes>
                    <Route path="/subject/:subjectName" element={<SubjectPage subject={selectedSubject} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;


 */

import './global.d.ts';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionForm from './components/QuestionForm';
import MathRenderer from './components/MathRenderer';
import MathEditor from './components/MathEditor';
import SubjectModal from './components/SubjectModal';
import SubjectPage from './components/SubjectPage';
import './App.css';

// Import av bokbilder
import biologyBook from './assets/books/Biologi.jpg';
import englishBook from './assets/books/English.jpg';
import fysikBook from './assets/books/Fysik.jpeg';
import geographyBook from './assets/books/Geografi.jpg';
import chemistryBook from './assets/books/kemi.jpg';
import mathematicsBook from './assets/books/Mattematik.jpg';
import modernlanguageBook from './assets/books/Modern-språk.jpg';
import religionBook from './assets/books/Religion.jpg';
import historyBook from './assets/books/Historia.jpg';
import swedishBook from './assets/books/Svenska.jpg';
import technologyBook from './assets/books/Teknik.jpg';
import otherBook from './assets/books/Övrigt.jpg';

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [latexExpression, setLatexExpression] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('white'); // Standard textfärg

    const handleLatexChange = (latex: string) => {
        setLatexExpression(latex);
        console.log('New LaTeX:', latex);
    };

    const handleSelectSubject = (subject: string) => {
        setSelectedSubject(subject);
    };

    const getBookImage = useCallback(() => {
        switch (selectedSubject) {
            case 'Engelska':
                return englishBook;
            case 'Matematik':
                return mathematicsBook;
            case 'Svenska':
                return swedishBook;
            case 'Biologi':
                return biologyBook;
            case 'Fysik':
                return fysikBook;
            case 'Kemi':
                return chemistryBook;
            case 'Geografi':
                return geographyBook;
            case 'Historia':
                return historyBook;
            case 'Religion':
                return religionBook;
            case 'Teknik':
                return technologyBook;
            case 'Modern-språk':
                return modernlanguageBook;
            case 'Övrigt':
                return otherBook;
            default:
                return '';
        }
    }, [selectedSubject]);

    const getTextColor = useCallback(() => {
        const imgSrc = getBookImage();
        const img = new Image();
        img.src = imgSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let r = 0, g = 0, b = 0;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                const avgColor = (r + g + b) / (data.length / 4);
                setTextColor(avgColor < 128 ? 'white' : 'black'); // Dynamisk textfärg
            }
        };
    }, [getBookImage]);

    useEffect(() => {
        if (selectedSubject) {
            getTextColor();
        }
    }, [getTextColor, selectedSubject]);

    return (
        <Router>
            <div>
                <h1>StudyBuddy-AI</h1>
                <button onClick={() => setModalOpen(true)}>Välj Ämne</button>
                <SubjectModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    onSelectSubject={handleSelectSubject}
                />
                <QuestionForm />

                {selectedSubject && (
                    <h2>Valt ämne: {selectedSubject}</h2>
                )}

                {getBookImage() && (
                    <div className="book-container">
                        <img src={getBookImage()} alt={`${selectedSubject} bok`} className="book-image" />
                        <div className="text-overlay" style={{ color: textColor }}>
                            {selectedSubject} Bok
                        </div>
                    </div>
                )}

                {selectedSubject === 'Matematik' && (
                    <div>
                        <MathEditor onChange={handleLatexChange} />
                        <MathRenderer expression={latexExpression} />
                    </div>
                )}

                <Routes>
                    <Route path="/subject/:subjectName" element={<SubjectPage subject={selectedSubject} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
