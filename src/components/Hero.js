import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ROLES = ['Full Stack Developer', 'UI/UX Designer', 'Video Editor', 'Photographer'];
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?><[]{}';

const Hero = () => {
  const roleDisplayRef = useRef(null);
  const roleTextRef = useRef(null);
  const rIdxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Hero entrance animations
    gsap.to('#firstName', { x: 0, duration: 1.1, ease: 'expo.out', delay: 0.2 });
    gsap.to('#lastName',  { x: 0, duration: 1.1, ease: 'expo.out', delay: 0.4 });
    gsap.to('.hero-status', { opacity: 1, duration: 0.6, delay: 0.8 });
    gsap.to('.hero-scroll',  { opacity: 1, duration: 0.6, delay: 1.6 });

    // Role cycler
    const startCycle = setTimeout(() => {
      if (roleDisplayRef.current) {
        gsap.to(roleDisplayRef.current, { opacity: 1, duration: 0.4 });
        cycleRole();
      }
    }, 1300);

    return () => {
      clearTimeout(startCycle);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, []);

  function glitchType(finalStr, onDone) {
    const display = roleDisplayRef.current;
    const textEl  = roleTextRef.current;
    if (!display || !textEl) return;

    display.classList.add('role-glitch');
    setTimeout(() => display.classList.remove('role-glitch'), 350);

    let ticks = 0;
    const scramble = setInterval(() => {
      textEl.textContent = finalStr.split('').map(() =>
        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      ).join('');
      ticks++;
      if (ticks >= 14) {
        clearInterval(scramble);
        let charIdx = 0;
        textEl.textContent = '';
        const typer = setInterval(() => {
          textEl.textContent = finalStr.slice(0, ++charIdx);
          if (charIdx >= finalStr.length) {
            clearInterval(typer);
            if (onDone) timerRef.current = setTimeout(onDone, 2200);
          }
        }, 55);
      }
    }, 28);
  }

  function cycleRole() {
    glitchType(ROLES[rIdxRef.current], () => {
      rIdxRef.current = (rIdxRef.current + 1) % ROLES.length;
      cycleRole();
    });
  }

  return (
    <section id="hero">
      <div className="hero-bg-text">SUBHAMOY</div>
      <div className="hero-status">
        <span className="status-dot"></span>
        Available for hire
      </div>
      <div className="hero-name-wrap">
        <div className="hero-firstname" id="firstName">SUBHAMOY</div>
      </div>
      <div className="hero-name-wrap">
        <div className="hero-lastname" id="lastName">CHOWDHURY</div>
      </div>
      <div className="hero-bottom">
        <div className="hero-roles">
          <div className="hero-role-single" id="roleDisplay" ref={roleDisplayRef}>
            ⟡ <span id="roleText" ref={roleTextRef}></span>
            <span className="role-cursor">|</span>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line"></div>
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default Hero;
