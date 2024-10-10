//MathRenderer.tsx

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  expression: string; 
}

const MathRenderer: React.FC<MathRendererProps> = ({ expression }) => {
  let renderedMath = '';

  try {
    renderedMath = katex.renderToString(expression, {
      throwOnError: false,
    });
  } catch (error) {
    console.error('Kunde inte rendera LaTeX:', error);
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedMath }}
    />
  );
};

export default MathRenderer;



