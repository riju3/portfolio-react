import React from 'react';

const About = ({ data }) => {
  if (!data) return null;
  const { bio, stats } = data;

  return (
    <section className="s" id="about">
      <div className="s-inner">
        <div className="s-label reveal-up">
          <span className="s-num">01 /</span>
          <h2 className="s-title">About Me</h2>
          <div className="s-line"></div>
        </div>
        <div className="about-layout">
          <div className="about-visual reveal-left">
            <div className="about-img-box">
              <img className="about-img" src="assets/profile.png" alt="Subhamoy Chowdhury" />
              <div className="about-img-scan"></div>
            </div>
            <div className="about-corner tl"></div>
            <div className="about-corner tr"></div>
            <div className="about-corner bl"></div>
            <div className="about-corner br"></div>
          </div>
          <div className="about-text-block">
            {bio && bio.map((p, i) => (
              <p key={i} className="reveal-up" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {stats && (
              <div className="about-nums reveal-up">
                {stats.map((s, i) => (
                  <div className="about-num-item" key={i}>
                    <div className="n">{s.value}</div>
                    <div className="l">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
