import React from 'react';

export const Experience = ({ data }) => {
  if (!data) return null;
  return (
    <section className="s" id="experience">
      <div className="s-inner">
        <div className="s-label reveal-up">
          <span className="s-num">03 /</span>
          <h2 className="s-title">Experience</h2>
          <div className="s-line"></div>
        </div>
        <div id="exp-list">
          {data.map((e, i) => (
            <div className="exp-item reveal-up" key={i}>
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-desc">{e.desc}</div>
                <div className="exp-tags">
                  {e.tags.map((t, j) => <span className="exp-tag" key={j}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Projects = ({ data }) => {
  if (!data) return null;

  const handleMouseMove = (e, card) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
  };

  return (
    <section className="s" id="projects">
      <div className="s-inner">
        <div className="s-label reveal-up">
          <span className="s-num">04 /</span>
          <h2 className="s-title">Projects</h2>
          <div className="s-line"></div>
        </div>
        <div className="projects-grid">
          {data.map((p, i) => (
            <div
              key={i}
              className={`proj-card${p.featured ? ' featured' : ''} reveal-up`}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseEnter={() => document.body.classList.add('hovering')}
              onMouseLeave={() => document.body.classList.remove('hovering')}
            >
              <div className="proj-num">{p.num}</div>
              <div className="proj-title" dangerouslySetInnerHTML={{ __html: p.title.replace(/\n/g, '<br>') }} />
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-footer">
                <div className="proj-stack">
                  {p.stack.map((t, j) => <span className="proj-tech" key={j}>{t}</span>)}
                </div>
              </div>
              <div className="proj-buttons">
                <a className="proj-btn code" href={p.github} target="_blank" rel="noopener noreferrer">⌥ Code</a>
                <a className="proj-btn live" href={p.live} target="_blank" rel="noopener noreferrer">↗ Live</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Blog = ({ data }) => {
  if (!data) return null;
  return (
    <section className="s" id="blog">
      <div className="s-inner">
        <div className="s-label reveal-up">
          <span className="s-num">05 /</span>
          <h2 className="s-title">Blog</h2>
          <div className="s-line"></div>
        </div>
        <div id="blog-list">
          {data.map((b, i) => (
            <a
              key={i}
              className="blog-item reveal-up"
              href={b.url}
              target={b.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onMouseEnter={() => document.body.classList.add('hovering')}
              onMouseLeave={() => document.body.classList.remove('hovering')}
            >
              <div>
                <div className="blog-cat">{b.category}</div>
                <div className="blog-title-text">{b.title}</div>
              </div>
              <div className="blog-right">
                <span className="blog-date">{b.date}</span>
                <span className="blog-arr">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = ({ data }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [statusColor, setStatusColor] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const submitForm = async () => {
    if (!name || !email || !message) {
      setStatusColor('var(--orange)');
      setStatus('⚠ Please fill in all fields.');
      return;
    }
    setSending(true);
    setStatus('');
    try {
      const res = await fetch('https://formspree.io/f/xlgkevjn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatusColor('var(--cyan)');
        setStatus("✓ Message sent! I'll get back to you soon.");
        setName(''); setEmail(''); setMessage('');
      } else throw new Error('Failed');
    } catch {
      setStatusColor('var(--orange)');
      setStatus('✗ Something went wrong. Try emailing directly.');
    }
    setSending(false);
  };

  return (
    <section className="s" id="contact">
      <div className="s-inner">
        <div className="contact-big">
          <div className="line"><span className="c1">Let's Build</span></div>
          <div className="line"><span className="c2">Together.</span></div>
        </div>
        <div className="contact-bottom">
          <div className="contact-form reveal-up">
            <div className="cf-group">
              <label className="cf-label">Your Name</label>
              <input className="cf-input" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="cf-group">
              <label className="cf-label">Email</label>
              <input className="cf-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="cf-group">
              <label className="cf-label">Message</label>
              <textarea className="cf-input" placeholder="Tell me about your project..." value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <div className="cf-status-msg" style={{ color: statusColor }}>{status}</div>
            <button className="btn-send" onClick={submitForm} disabled={sending}>
              <span>{sending ? 'Sending...' : 'Send Message →'}</span>
            </button>
          </div>
          <div className="contact-socials reveal-up">
            <h4>Find me online</h4>
            <div id="social-list">
              {data?.contact?.socials?.map((s, i) => (
                <a
                  key={i}
                  className="social-link"
                  href={s.url}
                  target={s.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onMouseEnter={() => document.body.classList.add('hovering')}
                  onMouseLeave={() => document.body.classList.remove('hovering')}
                >
                  <span className="social-link-name">{s.name}</span>
                  <span className="social-link-arr">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer>
    <div className="foot-l">Designed &amp; built by <span>Subhamoy Chowdhury</span> — 2025</div>
    <div className="foot-r">Always Creating. Always Learning.</div>
  </footer>
);
