


// MathEditor.tsx
import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import 'mathquill/build/mathquill.css';


addStyles();

interface MathEditorProps {
  onChange: (latex: string) => void;
}

const MathEditor: React.FC<MathEditorProps> = ({ onChange }) => {
  const [latex, setLatex] = useState<string>('');

  const handleChange = (newLatex: string) => {
    setLatex(newLatex);
    onChange(newLatex);
  };

  return (
    <div>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => handleChange(mathField.latex())}
      />
    </div>
  );
};

export default MathEditor;




