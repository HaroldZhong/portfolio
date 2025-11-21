import React from 'react';
import '../assets/styles/Aurora.scss';

const AuroraBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="aurora-container">
      <div className="aurora-background">
        <div className="aurora-layer aurora-layer-1"></div>
        <div className="aurora-layer aurora-layer-2"></div>
        <div className="aurora-layer aurora-layer-3"></div>
      </div>
      <div className="aurora-content">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;

