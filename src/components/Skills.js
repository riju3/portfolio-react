import React, { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?><[]{}';

const SKILL_TABS = [
  { id: 'dev', label: 'Full Stack Dev', skills: [
    { name: 'React',    icon: 'react',          filter: 'invert(1) sepia(1) saturate(5) hue-rotate(175deg) brightness(.8)' },
    { name: 'Node.js',  icon: 'nodedotjs',      filter: 'invert(1) sepia(1) saturate(3) hue-rotate(80deg) brightness(.75)' },
    { name: 'MongoDB',  icon: 'mongodb',         filter: 'invert(1) sepia(1) saturate(3) hue-rotate(80deg) brightness(.75)' },
    { name: 'Express',  icon: 'express',         filter: 'invert(.6)' },
    { name: 'Tailwind', icon: 'tailwindcss',     filter: 'invert(1) sepia(1) saturate(4) hue-rotate(175deg) brightness(.75)' },
    { name: 'Git',      icon: 'git',             filter: 'invert(1) sepia(1) saturate(5) hue-rotate(0deg) brightness(.8)' },
    { name: 'Docker',   icon: 'docker',          filter: 'invert(1) sepia(1) saturate(4) hue-rotate(175deg) brightness(.75)' },
    { name: 'Render',   icon: 'render',          filter: 'invert(.55) sepia(1) saturate(4) hue-rotate(240deg) brightness(.9)' },
    { name: 'Leaflet',  icon: 'leaflet',         filter: 'invert(1) sepia(1) saturate(3) hue-rotate(80deg) brightness(.75)' },
    { name: 'AWS',      icon: 'amazonaws',       filter: 'invert(1) sepia(1) saturate(5) hue-rotate(15deg) brightness(.8)' },
  ]},
  { id: 'lang', label: 'Languages', skills: [
    { name: 'Python', icon: 'python',    filter: 'invert(1) sepia(1) saturate(4) hue-rotate(195deg) brightness(.8)' },
    { name: 'Java',   icon: 'openjdk',   filter: 'invert(1) sepia(1) saturate(5) hue-rotate(0deg) brightness(.8)' },
    { name: 'C',      icon: 'c',         filter: 'invert(1) sepia(1) saturate(4) hue-rotate(195deg) brightness(.8)' },
    { name: 'SQL',    icon: 'mysql',     filter: 'invert(1) sepia(1) saturate(4) hue-rotate(175deg) brightness(.75)' },
  ]},
  { id: 'design', label: 'Design', skills: [
    { name: 'Figma',       icon: 'figma',              filter: 'invert(1) sepia(1) saturate(3) hue-rotate(290deg) brightness(.9)' },
    { name: 'Canva',       icon: 'canva',              filter: 'invert(1) sepia(1) saturate(4) hue-rotate(170deg) brightness(.75)' },
    { name: 'Illustrator', icon: 'adobeillustrator',   filter: 'invert(1) sepia(1) saturate(5) hue-rotate(20deg) brightness(.8)' },
    { name: 'Framer',      icon: 'framer',             filter: 'invert(.6)' },
  ]},
  { id: 'edit', label: 'Editing', skills: [
    { name: 'Lightroom',    icon: 'adobelightroom',    filter: 'invert(1) sepia(1) saturate(4) hue-rotate(195deg) brightness(.8)' },
    { name: 'Photoshop',    icon: 'adobephotoshop',    filter: 'invert(1) sepia(1) saturate(4) hue-rotate(195deg) brightness(.8)' },
    { name: 'Premiere Pro', icon: 'adobepremierepro',  filter: 'invert(1) sepia(1) saturate(5) hue-rotate(240deg) brightness(.8)' },
    { name: 'After Effects',icon: 'adobeaftereffects', filter: 'invert(1) sepia(1) saturate(5) hue-rotate(240deg) brightness(.8)' },
  ]},
];

function hackerReveal(cards, nameRefs, baseDelay) {
  cards.forEach((card, i) => {
    const delay = baseDelay + i * 420;
    setTimeout(() => {
      card.classList.add('revealed');
      card.classList.add('shaking');
      if (nameRefs[i]) nameRefs[i].classList.add('hacking');
      setTimeout(() => card.classList.remove('shaking'), 350);
      let ticks = 0;
      const finalName = card.dataset.name;
      const interval = setInterval(() => {
        if (nameRefs[i]) {
          nameRefs[i].textContent = finalName.split('').map(() =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('');
        }
        ticks++;
        if (ticks >= 18) {
          clearInterval(interval);
          if (nameRefs[i]) {
            nameRefs[i].textContent = finalName;
            nameRefs[i].classList.remove('hacking');
          }
          card.style.background = 'rgba(0,245,212,0.07)';
          setTimeout(() => { card.style.background = ''; }, 150);
        }
      }, 28);
    }, delay);
  });
}

const SkillCard = ({ skill }) => {
  const cardRef = useRef(null);
  const nameRef = useRef(null);
  const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.icon}.svg`;
  return (
    <div className="skill-card" data-name={skill.name} ref={cardRef}>
      <img className="skill-logo" src={iconUrl} style={{ filter: skill.filter }} alt={skill.name} />
      <span className="skill-name" ref={nameRef}></span>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('dev');
  const panelRef = useRef(null);

  const runHacker = () => {
    if (!panelRef.current) return;
    const cards = [...panelRef.current.querySelectorAll('.skill-card')];
    const nameRefs = cards.map(c => c.querySelector('.skill-name'));
    cards.forEach(c => {
      c.classList.remove('revealed');
      if (c.querySelector('.skill-name')) c.querySelector('.skill-name').textContent = '';
      c.style.background = '';
    });
    hackerReveal(cards, nameRefs, 0);
  };

  useEffect(() => {
    const timer = setTimeout(runHacker, 1400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    runHacker();
    // eslint-disable-next-line
  }, [activeTab]);

  const currentTab = SKILL_TABS.find(t => t.id === activeTab);

  return (
    <section className="s" id="skills">
      <div className="s-inner">
        <div className="s-label reveal-up">
          <span className="s-num">02 /</span>
          <h2 className="s-title">Stack</h2>
          <div className="s-line"></div>
        </div>
        <div className="skills-tabs reveal-up">
          {SKILL_TABS.map(tab => (
            <button
              key={tab.id}
              className={`s-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="skills-panel active" ref={panelRef}>
          {currentTab && currentTab.skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
