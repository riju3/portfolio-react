import React from 'react';

const words = ['Full Stack Dev','Designer','Editor','Photographer','React','MongoDB','Node.js','Figma','Lightroom','Creative','Builder'];

const Marquee = () => {
  const content = words.map((w, i) => (
    <React.Fragment key={i}>
      <span className={i % 4 === 1 ? 'hi' : ''}>{w}</span>
      <span style={{ color: '#222230', margin: '0 .5rem' }}>◆</span>
    </React.Fragment>
  ));

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {content}{content}{content}{content}
      </div>
    </div>
  );
};

export default Marquee;
