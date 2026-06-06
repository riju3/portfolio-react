import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/global.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import { Experience, Projects, Blog, Contact, Footer } from './components/Sections';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('data.json')
      .then(r => r.json())
      .then(d => setPortfolioData(d))
      .catch(() => console.warn('data.json not found'));
  }, []);

  useEffect(() => {
    const dot  = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; };
    document.addEventListener('mousemove', onMove);
    const loop = () => { rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); };
    loop();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, pts=[], animId;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i=0;i<90;i++) pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.2+.3,o:Math.random()*.4+.1});
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,245,212,${p.o})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.fromTo(el,{opacity:0,y:60},{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
      });
      gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el,{opacity:0,x:-60},{opacity:1,x:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}});
      });
      gsap.utils.toArray('.contact-big .line span').forEach((el,i) => {
        gsap.fromTo(el,{y:'110%'},{y:0,duration:1.1,ease:'expo.out',delay:i*.15,scrollTrigger:{trigger:'.contact-big',start:'top 80%'}});
      });
      gsap.to('.hero-bg-text',{y:-150,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}});
    }, 400);
    return () => clearTimeout(timer);
  }, [portfolioData]);

  return (
    <div className="App">
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <Navbar />
      <Hero />
      <Marquee />
      <About data={portfolioData?.about} />
      <Skills />
      <Experience data={portfolioData?.experience} />
      <Projects data={portfolioData?.projects} />
      <Blog data={portfolioData?.blog} />
      <Contact data={portfolioData} />
      <Footer />
    </div>
  );
}

export default App;
