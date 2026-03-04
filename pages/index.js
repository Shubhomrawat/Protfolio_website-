import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ══════════════════════════════════════════════════════════════
   SHUBHOM RAWAT PORTFOLIO  ·  "DEEP SPACE THREAT ACTOR"
   Full site theme: magenta / cyan / violet nebula on void black
   Matches the orbital planet Technical Arsenal exactly.
══════════════════════════════════════════════════════════════ */

/* ─── NAV ─────────────────────────────────────────────────── */
const NAV_ITEMS = ['Home','About','Skills','Projects','Experience','Certifications','Contact']

/* ─── ORBITAL TOOLS DATA ──────────────────────────────────── */
const ORBIT_TOOLS = [
  { name:'Python',       cat:'lang',      orbit:0, angle:0,   color:'#3776AB', bg:'#0d1f3a', svgPath:'M12 0C5.8 0 6.2 2.7 6.2 2.7v2.8h5.9v.9H3.9S0 6 0 12.2s3.4 5.9 3.4 5.9h2v-2.8s-.1-3.4 3.4-3.4h5.8s3.2.1 3.2-3.1V3.4S18.5 0 12 0zm-3.3 1.9c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zM12 24c6.2 0 5.8-2.7 5.8-2.7v-2.8h-5.9v-.9h8.2s3.9.4 3.9-5.8-3.4-5.9-3.4-5.9h-2v2.8s.1 3.4-3.4 3.4H9.4s-3.2-.1-3.2 3.1v5.4S5.5 24 12 24zm3.3-1.9c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z' },
  { name:'JavaScript',  cat:'lang',      orbit:0, angle:55,  color:'#F7DF1E', bg:'#2a2200', svgPath:'M0 0h24v24H0V0zm22.03 18.27c-.2-1.2-.98-2.2-3.35-3.14-.82-.38-1.73-.64-2-1.26-.1-.35-.12-.55-.05-.76.18-.79 1.07-.96 1.76-.74.45.15.87.5 1.13 1.08 1.2-.78 1.2-.78 2.03-1.3-.31-.49-.46-.7-.67-.9-.72-.8-1.68-1.2-3.24-1.16l-.8.1c-.78.2-1.52.62-1.95 1.18-1.3 1.47-.93 4.05.7 5.1 1.65 1.08 4.07 1.33 4.38 2.35.3 1.24-.92 1.64-2.08 1.49-.85-.18-1.32-.62-1.83-1.42l-2.13 1.22c.24.55.5.79.9 1.26 1.93 1.95 6.76 1.85 7.64-1.14.04-.12.2-.62.25-1.63l-.01-.01zM13.23 9.3h-2.6v7c0 1.5.08 2.87-.17 3.28-.4.72-1.43.63-1.9.5-.47-.18-.72-.5-.99-.93l-.16-.29-2.1 1.3c.35.71.86 1.32 1.5 1.71 1 .6 2.33.79 3.73.44.9-.25 1.69-.8 2.1-1.64.55-1.06.44-2.36.44-3.82l.01-7.55h.14z' },
  { name:'Burp Suite',  cat:'offensive', orbit:0, angle:115, color:'#FF6633', bg:'#2a0d00', svgPath:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' },
  { name:'Docker',      cat:'infra',     orbit:0, angle:175, color:'#2496ED', bg:'#061830', svgPath:'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185' },
  { name:'Linux',       cat:'infra',     orbit:0, angle:230, color:'#FCC624', bg:'#2a2000', svgPath:'M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.09-2.127 2.075-2.34 3.655-.16 1.09.119 2.463.853 3.456 1.066 1.41 3.37 1.678 3.37 1.678s-.052.625-.12 1.023c-.16.968-.354 2.053.29 2.7.315.3.754.44 1.3.35.39-.058.852-.272 1.39-.574.42-.24.9-.523 1.4-.59.48-.063 1.01.09 1.36.243.45.2.65.543.76.9.11.35.13.72.17 1.08.08.8.4 1.45.97 1.76.56.3 1.24.27 1.88.06.63-.21 1.23-.6 1.73-1.04l.01-.01c.7-.55 1.27-1.22 1.65-1.98.37-.76.54-1.58.56-2.37.04-1.44-.25-2.78-.82-3.9-.57-1.1-1.38-1.95-2.35-2.59L15.23 11c-.22-.14-.43-.28-.63-.43-.2-.15-.38-.31-.54-.47-.32-.33-.54-.7-.7-1.1-.33-.83-.4-1.77-.4-2.68 0-.31-.02-.62-.06-.92C13 3.43 12.08 0 12.504 0zM9.5 7c.28 0 .5.22.5.5S9.78 8 9.5 8 9 7.78 9 7.5 9.22 7 9.5 7zm5 0c.28 0 .5.22.5.5S14.78 8 14.5 8 14 7.78 14 7.5 14.22 7 14.5 7z' },
  { name:'Git',         cat:'infra',     orbit:0, angle:290, color:'#F05032', bg:'#2a0800', svgPath:'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.605-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187' },
  { name:'Wireshark',   cat:'defensive', orbit:1, angle:20,  color:'#1679A7', bg:'#051525', svgPath:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name:'Metasploit',  cat:'offensive', orbit:1, angle:80,  color:'#E34F26', bg:'#2a0a00', svgPath:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
  { name:'AWS',         cat:'cloud',     orbit:1, angle:140, color:'#FF9900', bg:'#2a1800', svgPath:'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.157c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z' },
  { name:'Nmap',        cat:'offensive', orbit:1, angle:200, color:'#00BFFF', bg:'#001825', svgPath:'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 1a7 7 0 100 14A7 7 0 0012 5zm0 2a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6z' },
  { name:'OWASP ZAP',   cat:'offensive', orbit:1, angle:260, color:'#00549E', bg:'#001030', svgPath:'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.9-2.7 7.51-6 8.93C8.7 18.51 6 14.9 6 11V7.67L12 5z' },
  { name:'Kali Linux',  cat:'offensive', orbit:1, angle:320, color:'#557C94', bg:'#0a1520', svgPath:'M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.85 17.43c-.4.4-.95.57-1.5.57-.4 0-.8-.1-1.15-.32l-3.2-2-3.2 2c-.35.22-.75.32-1.15.32-.55 0-1.1-.17-1.5-.57-.67-.67-.8-1.7-.3-2.5l2-3.13-2-3.13c-.5-.8-.37-1.83.3-2.5.67-.67 1.7-.8 2.5-.3l3.35 2.1 3.35-2.1c.8-.5 1.83-.37 2.5.3.67.67.8 1.7.3 2.5l-2 3.13 2 3.13c.5.8.37 1.83-.3 2.5z' },
  { name:'Splunk',      cat:'defensive', orbit:2, angle:30,  color:'#65A637', bg:'#0a1800', svgPath:'M22 9.4L12 4 2 9.4v5.2L12 20l10-5.4V9.4zM12 6.2l7.6 4.1-7.6 4.1L4.4 10.3 12 6.2zm-8 5.1l7 3.8v3.8l-7-3.8v-3.8zm9 7.6v-3.8l7-3.8v3.8l-7 3.8z' },
  { name:'Bash',        cat:'lang',      orbit:2, angle:100, color:'#4EAA25', bg:'#081500', svgPath:'M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z' },
  { name:'scikit-learn',cat:'lang',      orbit:2, angle:170, color:'#F7931E', bg:'#2a1500', svgPath:'M13.5 2C13.5 2 14.6 9.1 8.5 10.9 8.5 10.9 3 11.3 3 17.6 3 22 6.8 22 8 22c1.4 0 2.7-.5 3.7-1.4C12.8 19.6 13.5 18.2 13.5 16.5 13.5 14.2 11.8 12.4 9.5 12.4c-1.7 0-3.2 1-3.9 2.5 0-3.4 2.8-5 5-5 3.5 0 6.5-2.6 6.5-6.4C17.1 1.6 14.9 0 13.5 2z' },
  { name:'Hashcat',     cat:'offensive', orbit:2, angle:240, color:'#E94B3C', bg:'#2a0300', svgPath:'M12 2L2 12l10 10 10-10L12 2zm0 2.83L19.17 12 12 19.17 4.83 12 12 4.83z' },
  { name:'Nessus',      cat:'defensive', orbit:2, angle:310, color:'#00BCF2', bg:'#001a25', svgPath:'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
  { name:'John',        cat:'offensive', orbit:2, angle:380, color:'#C0392B', bg:'#1e0000', svgPath:'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' },
]
const RINGS = [
  { rx:220, ry:64,  tilt:-20, speed:0.30 },
  { rx:300, ry:90,  tilt: 14, speed:0.19 },
  { rx:385, ry:113, tilt: -7, speed:0.12 },
]
const SKILL_CATS = [
  { id:'offensive', label:'⚔ Offensive', color:'#ff6333',
    skills:[{name:'Penetration Testing',pct:88},{name:'Web App Security (OWASP)',pct:90},{name:'Burp Suite',pct:86},{name:'OWASP ZAP',pct:87},{name:'Metasploit',pct:78},{name:'SQLmap / XSS',pct:82}] },
  { id:'defensive', label:'🛡 Defensive', color:'#1e90ff',
    skills:[{name:'Network Vulnerability Assessment',pct:85},{name:'Port Scanning (Nmap)',pct:90},{name:'Wireshark / Traffic Analysis',pct:80},{name:'Splunk / SIEM',pct:84},{name:'IDS / IPS',pct:76}] },
  { id:'cloud', label:'☁ Cloud & Infra', color:'#00e5a0',
    skills:[{name:'AWS Security (GuardDuty, IAM)',pct:83},{name:'Docker & Container Security',pct:78},{name:'Kali Linux',pct:90},{name:'Bash Scripting',pct:82},{name:'Git & CI/CD Security',pct:79}] },
  { id:'lang', label:'💻 Programming', color:'#f7df1e',
    skills:[{name:'Python',pct:88},{name:'ML for Threat Detection',pct:80},{name:'REST API Security Testing',pct:84},{name:'JavaScript (Node.js)',pct:74},{name:'scikit-learn / XGBoost',pct:78}] },
]
const EXTRA_TOOLS = ['Hydra','Aircrack-ng','Nikto','Dirb','Gobuster','CrackMapExec','Volatility','Autopsy','Yara','theHarvester','Maltego','Shodan','Recon-ng','ELK Stack','Netcat']

/* ─── PROJECTS ────────────────────────────────────────────── */
const PROJECTS = [
  { title:'Web Security Assessment Suite', desc:'Discovered 50+ vulnerabilities (SQLI, XSS, CSRF, broken auth) using OWASP ZAP and Burp Suite. Generated full remediation reports with CVSS scoring.', icon:'🔍', gradient:'linear-gradient(135deg,#c026d3,#7c3aed,#06b6d4)', tags:['Burp Suite','OWASP ZAP','Python','Pentesting'], featured:true, github:'https://github.com', demo:null },
  { title:'Network Security Lab', desc:'TCP/UDP/XMAS port scanning workflows, exploitation chains, password cracking with Hashcat & John the Ripper, and full network traffic analysis.', icon:'🌐', gradient:'linear-gradient(135deg,#a855f7,#ec4899)', tags:['Nmap','Hashcat','Wireshark','Metasploit'], featured:false, github:'https://github.com', demo:null },
  { title:'Malware Detection via ML', desc:'Ensemble ML models (Random Forest, XGBoost) classifying malware with 96% F1-score. Features extracted from PE headers, system calls, and network behavior.', icon:'🤖', gradient:'linear-gradient(135deg,#f97316,#c026d3)', tags:['Python','scikit-learn','XGBoost','Feature Engineering'], featured:true, github:'https://github.com', demo:null },
  { title:'Demo Web App Security Lab', desc:'Deliberately vulnerable REST API for security training. Covers file permission exploits, GET/POST injection, JWT tampering, insecure deserialization.', icon:'⚗️', gradient:'linear-gradient(135deg,#22d3ee,#7c3aed)', tags:['REST API','Node.js','OWASP','JWT'], featured:false, github:'https://github.com', demo:null },
]

/* ─── EXPERIENCE ──────────────────────────────────────────── */
const EXPERIENCE = [
  { role:'Cybersecurity Engineer', company:'Amazon', period:'2026 – Present', location:'USA', active:true, bullets:['Defending AWS infrastructure at scale using GuardDuty, Security Hub, and CloudTrail.','Building automated detection and response playbooks within AWS SIEM/SOAR pipelines.','Conducting adversary simulation exercises aligned to MITRE ATT&CK framework.','Embedding security into CI/CD pipelines and leading shift-left security initiatives.'] },
  { role:'Cybersecurity Analyst', company:'Penn State University', period:'Sep 2025 – Present', location:'State College, PA', active:true, bullets:['Triaged 1,000+ daily security events, improving detection precision by 20%.','Performed log analysis across endpoints, servers, and network infra — reduced MTTD by 15%.','Executed MITRE ATT&CK–aligned threat hunting contributing to 25% fewer critical vulnerabilities.'] },
  { role:'Web Application Security Intern', company:'Infosys', period:'Jun 2023 – May 2024', location:'Mumbai, India', active:false, bullets:['OWASP Top 10 testing across 12 apps, uncovering 30% more high-risk findings.','SAST/DAST scans with 25% false positive reduction via custom rule tuning.','Shift-left security via threat modeling — 20% fewer post-release issues.'] },
  { role:'Teaching Assistant — Network Security', company:'Penn State University', period:'Jan 2025 – Present', location:'State College, PA', active:true, bullets:['Graded labs on port scanning, firewall config, and intrusion detection for 60+ students.','Led weekly office hours focused on hands-on Wireshark and Nmap exercises.'] },
]

/* ─── CERTS ────────────────────────────────────────────────── */
const CERTS = [
  { name:'eJPT', full:'eLearnSecurity Junior Penetration Tester', issuer:'eLearnSecurity / INE', icon:'⚔️', status:'earned' },
  { name:'CompTIA Security+', full:'CompTIA Security+', issuer:'CompTIA', icon:'🛡️', status:'in-progress' },
  { name:'CEH', full:'Certified Ethical Hacker', issuer:'EC-Council', icon:'🔓', status:'in-progress' },
  { name:'CompTIA PenTest+', full:'CompTIA PenTest+', issuer:'CompTIA', icon:'🎯', status:'earned' },
  { name:'TryHackMe SOC L1', full:'SOC Level 1 Analyst', issuer:'TryHackMe', icon:'🔬', status:'earned' },
  { name:'PJPT', full:'Practical Junior Pen Tester', issuer:'TCM Security', icon:'💀', status:'earned' },
]

/* ─── TIMELINE ─────────────────────────────────────────────── */
const TIMELINE = [
  { date:'May 2026', title:'MS Cybersecurity Analytics', org:'Penn State University', desc:'Expected graduation — GPA 3.85/4.0', active:true },
  { date:'2026', title:'Cybersecurity Engineer', org:'Amazon', desc:'Defending AWS infrastructure at scale', active:true },
  { date:'2025', title:'Cybersecurity Analyst + TA', org:'Penn State', desc:'SOC operations & network security teaching', active:false },
  { date:'2023–2024', title:'Application Security Intern', org:'Infosys', desc:'OWASP testing, SAST/DAST, threat modeling', active:false },
  { date:'2022–2023', title:'Cyber Security Analyst', org:'Kotak Bank', desc:'Vulnerability assessments & ethical hacking', active:false },
]

/* ════════════════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold:0.1, rootMargin:'0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useTypewriter(phrases, speed=80) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const phrase = phrases[idx], delay = del ? 38 : speed
    const t = setTimeout(() => {
      if (!del && display.length < phrase.length) setDisplay(phrase.slice(0,display.length+1))
      else if (!del && display.length === phrase.length) setTimeout(()=>setDel(true),1900)
      else if (del && display.length > 0) setDisplay(phrase.slice(0,display.length-1))
      else { setDel(false); setIdx(i=>(i+1)%phrases.length) }
    }, delay)
    return () => clearTimeout(t)
  }, [display, del, idx, phrases, speed])
  return display
}

function hexRgb(hex) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`
}

/* ════════════════════════════════════════════════════════════
   CANVAS: PLANET
════════════════════════════════════════════════════════════ */
function PlanetCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'), S=320; c.width=S; c.height=S
    let t=0, animId
    const cx=S/2, cy=S/2, r=128
    const draw = () => {
      ctx.clearRect(0,0,S,S)
      const aura=ctx.createRadialGradient(cx,cy,r*.7,cx,cy,r*1.6)
      aura.addColorStop(0,'rgba(180,0,255,.10)'); aura.addColorStop(.5,'rgba(100,0,200,.08)'); aura.addColorStop(1,'transparent')
      ctx.beginPath(); ctx.arc(cx,cy,r*1.6,0,Math.PI*2); ctx.fillStyle=aura; ctx.fill()
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip()
      const base=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r)
      base.addColorStop(0,'#c026d3'); base.addColorStop(.25,'#7c3aed'); base.addColorStop(.55,'#06b6d4'); base.addColorStop(.8,'#0891b2'); base.addColorStop(1,'#1e1b4b')
      ctx.fillStyle=base; ctx.fillRect(0,0,S,S)
      for(let row=0;row<28;row++){
        const y0=cy-r+row*(r*2/27); ctx.beginPath()
        for(let x=0;x<=S;x+=3){
          const w=Math.sin((x/26)+t+row*.55)*6+Math.sin((x/13)+t*1.4+row*1.1)*2.5+Math.sin((x/8)-t*.7+row*.3)*1.5
          x===0?ctx.moveTo(x,y0+w):ctx.lineTo(x,y0+w)
        }
        ctx.strokeStyle=`rgba(224,231,255,${.06+.07*Math.abs(Math.sin(row*.35+t*.25))})`; ctx.lineWidth=1.6; ctx.stroke()
      }
      ctx.globalAlpha=.055
      for(let tx=-30;tx<S+30;tx+=30) for(let ty=-26;ty<S+52;ty+=26){
        const off=(Math.floor(ty/26)%2)*15; ctx.beginPath(); ctx.moveTo(tx+off,ty); ctx.lineTo(tx+15+off,ty+26); ctx.lineTo(tx-15+off,ty+26); ctx.closePath(); ctx.fillStyle='rgba(200,180,255,1)'; ctx.fill()
      }
      ctx.globalAlpha=1; ctx.restore()
      const rim=ctx.createRadialGradient(cx,cy,r*.82,cx,cy,r)
      rim.addColorStop(0,'rgba(192,38,211,0)'); rim.addColorStop(.6,'rgba(192,38,211,.15)'); rim.addColorStop(1,'rgba(88,28,135,.55)')
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle=rim; ctx.fill()
      const spec=ctx.createRadialGradient(cx-40,cy-50,0,cx-40,cy-50,70); spec.addColorStop(0,'rgba(255,255,255,.22)'); spec.addColorStop(1,'transparent')
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip(); ctx.fillStyle=spec; ctx.fillRect(0,0,S,S); ctx.restore()
      t+=.013; animId=requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(animId)
  }, [])
  return <canvas ref={ref} style={{ position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',filter:'drop-shadow(0 0 48px rgba(192,38,211,.55)) drop-shadow(0 0 96px rgba(6,182,212,.22))',borderRadius:'50%' }} />
}

/* ════════════════════════════════════════════════════════════
   CANVAS: STARFIELD
════════════════════════════════════════════════════════════ */
function StarField() {
  const ref = useRef(null)
  useEffect(() => {
    const c=ref.current; if(!c) return; const ctx=c.getContext('2d')
    const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight}; resize()
    window.addEventListener('resize',resize)
    const stars=Array.from({length:260},()=>({x:Math.random(),y:Math.random(),r:.3+Math.random()*1.5,a:.15+Math.random()*.7,tw:Math.random()*Math.PI*2,sp:.004+Math.random()*.012}))
    let animId
    const draw=()=>{ctx.clearRect(0,0,c.width,c.height);stars.forEach(s=>{s.tw+=s.sp;const alpha=s.a*(.5+.5*Math.sin(s.tw));ctx.beginPath();ctx.arc(s.x*c.width,s.y*c.height,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(230,220,255,${alpha})`;ctx.fill()});animId=requestAnimationFrame(draw)}
    draw(); return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

/* ════════════════════════════════════════════════════════════
   ORBITAL RINGS SVG
════════════════════════════════════════════════════════════ */
function OrbitalRings() {
  return (
    <svg viewBox="0 0 700 700" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
      <defs>
        <linearGradient id="r0" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c026d3" stopOpacity="0"/><stop offset="25%" stopColor="#c026d3" stopOpacity="0.75"/><stop offset="75%" stopColor="#7c3aed" stopOpacity="0.6"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></linearGradient>
        <linearGradient id="r1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/><stop offset="30%" stopColor="#06b6d4" stopOpacity="0.65"/><stop offset="70%" stopColor="#3b82f6" stopOpacity="0.55"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
        <linearGradient id="r2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a855f7" stopOpacity="0"/><stop offset="40%" stopColor="#a855f7" stopOpacity="0.55"/><stop offset="100%" stopColor="#ec4899" stopOpacity="0"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="350" cy="350" rx="220" ry="62" fill="none" stroke="url(#r0)" strokeWidth="2.5" transform="rotate(-20,350,350)" opacity="0.95" filter="url(#glow)"/>
      <ellipse cx="350" cy="350" rx="300" ry="88" fill="none" stroke="url(#r1)" strokeWidth="1.5" transform="rotate(14,350,350)" opacity="0.8"/>
      <ellipse cx="350" cy="350" rx="385" ry="111" fill="none" stroke="url(#r2)" strokeWidth="1" transform="rotate(-7,350,350)" opacity="0.65"/>
      <ellipse cx="350" cy="350" rx="155" ry="18" fill="none" stroke="rgba(192,38,211,0.6)" strokeWidth="10" style={{filter:'blur(5px)'}}/>
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════
   ORBIT ICON
════════════════════════════════════════════════════════════ */
function OrbitIcon({ tool, ring, activeCat, time }) {
  const [hov, setHov] = useState(false)
  const dimmed = activeCat !== 'all' && tool.cat !== activeCat
  const rad = (tool.angle * Math.PI / 180) + time * ring.speed
  const tR = ring.tilt * Math.PI / 180
  const ex = ring.rx*Math.cos(rad), ey = ring.ry*Math.sin(rad)
  const x = 350 + ex*Math.cos(tR) - ey*Math.sin(tR)
  const y = 350 + ex*Math.sin(tR) + ey*Math.cos(tR)
  const depth = (Math.sin(rad)+1)/2
  const scale = hov ? 1.55 : (.65+depth*.55)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:'absolute',left:x,top:y,transform:`translate(-50%,-50%) scale(${scale})`,zIndex:hov?300:Math.round(depth*150),opacity:dimmed?.08:(.4+depth*.6),transition:'opacity .3s, transform .18s',cursor:'pointer'}}>
      <div style={{width:48,height:48,borderRadius:13,background:tool.bg,border:`1.5px solid ${tool.color}${hov?'cc':'55'}`,display:'flex',alignItems:'center',justifyContent:'center',color:tool.color,boxShadow:hov?`0 0 0 2px ${tool.color}33, 0 0 24px ${tool.color}80`:`0 0 10px ${tool.color}33`,backdropFilter:'blur(8px)',transition:'box-shadow .2s, border-color .2s'}}>
        <svg viewBox="0 0 24 24" fill="currentColor" style={{width:24,height:24}}><path d={tool.svgPath}/></svg>
      </div>
      {hov && (
        <div style={{position:'absolute',bottom:'calc(100% + 10px)',left:'50%',transform:'translateX(-50%)',background:'rgba(8,0,22,.97)',border:`1px solid ${tool.color}50`,borderRadius:10,padding:'7px 14px',whiteSpace:'nowrap',pointerEvents:'none',boxShadow:`0 4px 24px ${tool.color}30`,zIndex:400}}>
          <div style={{color:tool.color,fontSize:12,fontWeight:700,fontFamily:'monospace',letterSpacing:1}}>{tool.name}</div>
          <div style={{color:'rgba(200,180,255,.6)',fontSize:10,marginTop:2,textTransform:'capitalize'}}>{tool.cat}</div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SKILL BAR CARD
════════════════════════════════════════════════════════════ */
function SkillBarCard({ skill, color, delay }) {
  const [w,setW]=useState(0),[vis,setVis]=useState(false),[hov,setHov]=useState(false)
  const ref=useRef(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);setTimeout(()=>setW(skill.pct),150+delay);obs.disconnect()}},{threshold:.2})
    if(ref.current)obs.observe(ref.current); return ()=>obs.disconnect()
  },[skill.pct,delay])
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(16px)',transition:`opacity .5s ${delay}ms, transform .5s ${delay}ms, box-shadow .2s, border-color .2s`,background:hov?`rgba(${hexRgb(color)},.10)`:'rgba(15,5,40,.55)',border:`1px solid ${hov?color+'55':'rgba(120,60,200,.18)'}`,borderRadius:12,padding:'16px 20px',backdropFilter:'blur(14px)',boxShadow:hov?`0 0 20px ${color}25, 0 4px 16px rgba(0,0,0,.4)`:'0 2px 12px rgba(0,0,0,.3)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <span style={{color:'#e8d5ff',fontWeight:600,fontSize:13}}>{skill.name}</span>
        <span style={{color,fontFamily:'monospace',fontSize:12,fontWeight:700}}>{skill.pct}%</span>
      </div>
      <div style={{height:5,background:'rgba(120,60,200,.18)',borderRadius:9999,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${w}%`,background:`linear-gradient(90deg,${color},#a855f7)`,borderRadius:9999,transition:'width 1.1s cubic-bezier(.4,0,.2,1)',boxShadow:`0 0 8px ${color}70`}}/>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SKILLS SECTION (orbital planet)
════════════════════════════════════════════════════════════ */
function Skills() {
  const [activeCat,setActiveCat]=useState('all')
  const [time,setTime]=useState(0)
  const animRef=useRef(null),lastTs=useRef(null)
  useEffect(()=>{
    const loop=ts=>{if(lastTs.current!==null)setTime(t=>t+(ts-lastTs.current)*.001);lastTs.current=ts;animRef.current=requestAnimationFrame(loop)}
    animRef.current=requestAnimationFrame(loop); return ()=>cancelAnimationFrame(animRef.current)
  },[])
  const visCats = activeCat==='all' ? SKILL_CATS : SKILL_CATS.filter(c=>c.id===activeCat)
  return (
    <section id="skills" style={{background:'linear-gradient(170deg,#0d0025 0%,#160040 25%,#0d0030 55%,#080020 100%)',padding:'96px 0 100px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,zIndex:0}}><StarField/></div>
      <div style={{position:'absolute',top:'5%',left:'0',width:560,height:560,borderRadius:'50%',background:'radial-gradient(circle,rgba(192,38,211,.09) 0%,transparent 68%)',pointerEvents:'none',zIndex:0}}/>
      <div style={{position:'absolute',bottom:'5%',right:'0',width:440,height:440,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 68%)',pointerEvents:'none',zIndex:0}}/>
      <div style={{position:'relative',zIndex:2}}>
        <div style={{textAlign:'center',marginBottom:52,padding:'0 24px'}}>
          <span style={{fontFamily:'monospace',color:'#a855f7',fontSize:11,letterSpacing:5,textTransform:'uppercase',display:'block',marginBottom:12}}>// technical arsenal</span>
          <h2 style={{fontSize:'clamp(2.2rem,5vw,3.6rem)',fontWeight:900,margin:0,background:'linear-gradient(135deg,#fff 0%,#e879f9 35%,#06b6d4 75%,#a78bfa 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:-1,lineHeight:1.1}}>Tools &amp; Technologies</h2>
          <p style={{color:'rgba(180,140,255,.65)',marginTop:14,fontSize:16,maxWidth:520,margin:'14px auto 0',lineHeight:1.85}}>A cybersecurity arsenal forged through real-world assessments, research, and relentless hands-on practice.</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap',padding:'0 24px',marginBottom:48}}>
          {[{id:'all',label:'✦ All'},...SKILL_CATS.map(c=>({id:c.id,label:c.label}))].map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{background:activeCat===cat.id?'linear-gradient(135deg,#7c3aed,#c026d3)':'rgba(120,40,200,.10)',border:`1px solid ${activeCat===cat.id?'#c026d3':'rgba(140,80,230,.22)'}`,color:activeCat===cat.id?'#fff':'rgba(200,160,255,.7)',padding:'8px 22px',borderRadius:9999,cursor:'pointer',fontSize:13,fontWeight:activeCat===cat.id?700:400,transition:'all .22s ease',fontFamily:'monospace',boxShadow:activeCat===cat.id?'0 0 20px rgba(192,38,211,.4)':'none'}}>{cat.label}</button>
          ))}
        </div>
        <div style={{position:'relative',width:700,height:700,margin:'0 auto 72px',maxWidth:'100vw'}}>
          <OrbitalRings/>
          <PlanetCanvas/>
          <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',textAlign:'center',pointerEvents:'none',zIndex:5,marginTop:80}}>
            <div style={{fontFamily:'monospace',fontSize:10,color:'rgba(216,180,254,.6)',letterSpacing:3,textTransform:'uppercase'}}>Cyber<br/>Arsenal</div>
          </div>
          {ORBIT_TOOLS.map(tool=><OrbitIcon key={tool.name} tool={tool} ring={RINGS[tool.orbit]} activeCat={activeCat} time={time}/>)}
          <div style={{position:'absolute',right:'12%',top:'44%',width:14,height:14,borderRadius:'50%',background:'radial-gradient(circle,#f472b6,#c026d3)',boxShadow:'0 0 16px rgba(244,114,182,.8)',animation:'pulseSat 3s ease-in-out infinite'}}/>
        </div>
        <div style={{padding:'0 40px',maxWidth:1160,margin:'0 auto'}}>
          {visCats.map((cat,ci)=>(
            <div key={cat.id} style={{marginBottom:48}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:22}}>
                <div style={{height:1,flex:1,background:`linear-gradient(90deg,transparent,${cat.color}40)`}}/>
                <span style={{color:cat.color,fontFamily:'monospace',fontSize:13,fontWeight:700,letterSpacing:2,textTransform:'uppercase',background:`rgba(${hexRgb(cat.color)},.10)`,border:`1px solid ${cat.color}33`,borderRadius:9999,padding:'5px 16px'}}>{cat.label}</span>
                <div style={{height:1,flex:1,background:`linear-gradient(90deg,${cat.color}40,transparent)`}}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:14}}>
                {cat.skills.map((sk,si)=><SkillBarCard key={sk.name} skill={sk} color={cat.color} delay={ci*60+si*50}/>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{maxWidth:860,margin:'48px auto 0',padding:'0 40px',textAlign:'center'}}>
          <span style={{fontFamily:'monospace',color:'rgba(180,140,255,.45)',fontSize:11,letterSpacing:4,display:'block',marginBottom:18}}>// additional tools</span>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
            {EXTRA_TOOLS.map(tag=>(
              <span key={tag} style={{background:'rgba(100,40,200,.12)',border:'1px solid rgba(130,70,220,.22)',color:'rgba(200,165,255,.8)',fontFamily:'monospace',fontSize:12,padding:'5px 16px',borderRadius:9999,cursor:'default',transition:'all .2s'}}
                onMouseEnter={e=>{e.target.style.background='rgba(124,58,237,.28)';e.target.style.color='#e879f9';e.target.style.borderColor='rgba(192,38,211,.4)'}}
                onMouseLeave={e=>{e.target.style.background='rgba(100,40,200,.12)';e.target.style.color='rgba(200,165,255,.8)';e.target.style.borderColor='rgba(130,70,220,.22)'}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes pulseSat{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.4);opacity:1}}`}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
function Navbar({ theme, toggleTheme }) {
  const [scrolled,setScrolled]=useState(false),[active,setActive]=useState('Home'),[menuOpen,setMenuOpen]=useState(false)
  useEffect(()=>{
    const f=()=>{setScrolled(window.scrollY>30);const sections=NAV_ITEMS.map(n=>document.getElementById(n.toLowerCase()));const cur=sections.reduce((a,s)=>{if(s&&s.getBoundingClientRect().top<=100)return s.id;return a},'home');setActive(cur.charAt(0).toUpperCase()+cur.slice(1))}
    window.addEventListener('scroll',f,{passive:true}); return ()=>window.removeEventListener('scroll',f)
  },[])
  const go=id=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)}
  return (
    <nav className={`nav${scrolled?' scrolled':''}`}>
      <div className="nav-inner">
        <div className="nav-logo"><span className="accent-dot"/>SR<span style={{color:'var(--mag-bright)'}}>.</span></div>
        <ul className={`nav-links${menuOpen?' open':''}`}>
          {NAV_ITEMS.map(item=><li key={item}><button className={`nav-link${active===item?' active':''}`} onClick={()=>go(item)}>{item}</button></li>)}
        </ul>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <button className="theme-toggle" onClick={toggleTheme}>{theme==='dark'?'☀️':'🌙'}</button>
          <button className="nav-mobile-btn" onClick={()=>setMenuOpen(o=>!o)} aria-label="Toggle menu">
            <span style={{transform:menuOpen?'rotate(45deg) translateY(7px)':'none',transition:'transform .2s'}}/>
            <span style={{opacity:menuOpen?0:1,transition:'opacity .2s'}}/>
            <span style={{transform:menuOpen?'rotate(-45deg) translateY(-7px)':'none',transition:'transform .2s'}}/>
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function Hero() {
  const typed = useTypewriter(['Securing the Web, One Vulnerability at a Time.','Red Team Operator & Penetration Tester.','Building Smarter Threat Detection with ML.','Web Security | Network Security | Cloud Security.'])
  return (
    <section id="home" className="hero section">
      <div className="hero-grid-bg"/>
      <div className="hero-spotlight"/>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="status-dot"/>
              Available for Opportunities
            </div>
            <h1 className="hero-name">
              Shubhom<br/><span className="highlight">Rawat</span>
            </h1>
            <p className="hero-tagline">{typed}<span className="cursor"/></p>
            <p className="hero-bio">A cybersecurity professional with hands-on experience in web application security, network vulnerability assessments, and ML-powered threat detection. Penetration tester, red-team practitioner, and Amazon engineer.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#projects"><span>View Projects →</span></a>
              <a className="btn btn-outline" href="/Shubhom_Rawat_Resume.pdf" download>↓ Download Resume</a>
            </div>
            <div className="hero-socials">
              {[{href:'https://linkedin.com/in/shubhom-rawat-45a2b522b',icon:'💼',label:'LinkedIn'},{href:'https://github.com',icon:'🐙',label:'GitHub'},{href:'mailto:shubhomrawat27@gmail.com',icon:'✉️',label:'Email'}].map(s=>(
                <a key={s.label} href={s.href} className="social-btn" target="_blank" rel="noreferrer" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div className="hero-avatar-wrap">
            <div className="avatar-ring"/>
            <div className="avatar-ring2"/>
            <div className="avatar-placeholder">
              <span className="avatar-initials">SR</span>
            </div>
            <span className="avatar-chip">🔒 OSCP Prep</span>
            <span className="avatar-chip">🤖 ML Security</span>
            <span className="avatar-chip">☁️ AWS</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint"><span>scroll</span><span className="scroll-arrow"/></div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   ABOUT
════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="section">
      {/* Extra nebula orb specific to About */}
      <div style={{position:'absolute',top:'-80px',right:'-120px',width:480,height:480,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 68%)',pointerEvents:'none'}}/>
      <div className="container">
        <div className="reveal">
          <span className="section-eyebrow">// who i am</span>
          <h2 className="section-title">About <span>Me</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>I'm a cybersecurity professional and MS student at Penn State University (GPA 3.85, graduating May 2026). My passion lies in offensive security — understanding how systems are broken to build defenses that actually hold.</p>
            <p>With hands-on internship experience at <strong>Infosys</strong> and <strong>Kotak Bank</strong>, I've performed real-world vulnerability assessments, web app pentests, and reduced attack surfaces measurably. I combine red-team skills with machine learning to build smarter threat detection systems.</p>
            <p>Currently a Cybersecurity Engineer at <strong>Amazon</strong>, defending AWS infrastructure at scale using GuardDuty, Security Hub, and MITRE ATT&CK–aligned adversary simulation.</p>
            <div className="about-stats">
              {[{num:'50+',label:'Vulnerabilities Found'},{num:'2+',label:'Years Experience'},{num:'4',label:'Major Projects'},{num:'3.85',label:'GPA'}].map(s=>(
                <div className="stat-pill" key={s.label}>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="timeline reveal" style={{transitionDelay:'0.15s'}}>
            <span className="section-eyebrow" style={{marginBottom:'24px',display:'block'}}>// timeline</span>
            {TIMELINE.map((t,i)=>(
              <div key={i} className={`timeline-item${t.active?' active':''}`}>
                <div className="timeline-date">{t.date}</div>
                <div className="timeline-title">{t.title}</div>
                <div className="timeline-org">{t.org}</div>
                <div className="timeline-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section id="projects" className="section">
      <div style={{position:'absolute',bottom:'-60px',left:'-80px',width:420,height:420,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 68%)',pointerEvents:'none'}}/>
      <div className="container">
        <div className="reveal" style={{textAlign:'center',marginBottom:'48px'}}>
          <span className="section-eyebrow">// featured work</span>
          <h2 className="section-title">Security <span>Projects</span></h2>
          <p className="section-subtitle" style={{margin:'0 auto'}}>Real-world penetration testing and security research with documented methodologies and results.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p,i)=>(
            <div key={p.title} className="project-card reveal reveal-child" style={{transitionDelay:`${i*.1}s`}}>
              <div className="project-banner">
                <div className="project-banner-bg" style={{background:p.gradient}}/>
                <span className="project-banner-icon">{p.icon}</span>
                {p.featured&&<span className="project-badge">Featured</span>}
              </div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">{p.tags.map(t=><span key={t} className="project-tag">{t}</span>)}</div>
              </div>
              <div className="project-links">
                {p.github&&<a href={p.github} target="_blank" rel="noreferrer" className="project-link primary">🐙 GitHub</a>}
                {p.demo?<a href={p.demo} target="_blank" rel="noreferrer" className="project-link secondary">🔗 Demo</a>:<span className="project-link secondary" style={{cursor:'default',opacity:.5}}>🔒 Private</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="section">
      <div style={{position:'absolute',top:'-40px',right:'-60px',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(192,38,211,.06) 0%,transparent 68%)',pointerEvents:'none'}}/>
      <div className="container">
        <div className="reveal" style={{marginBottom:'48px'}}>
          <span className="section-eyebrow">// work history</span>
          <h2 className="section-title">Work <span>Experience</span></h2>
        </div>
        <div className="experience-list">
          {EXPERIENCE.map((exp,i)=>(
            <div key={exp.role+exp.company} className="exp-card reveal reveal-child" style={{transitionDelay:`${i*.08}s`}}>
              <div className="exp-card-top">
                <div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company} · {exp.location}</div>
                </div>
                <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                  {exp.active&&<span style={{background:'rgba(0,229,160,.10)',border:'1px solid rgba(0,229,160,.28)',color:'#00e5a0',fontSize:'.66rem',padding:'3px 10px',borderRadius:'999px',fontFamily:'monospace',letterSpacing:'.08em',boxShadow:'0 0 10px rgba(0,229,160,.15)'}}>● ACTIVE</span>}
                  <span className="exp-period">{exp.period}</span>
                </div>
              </div>
              <ul className="exp-bullets">{exp.bullets.map((b,bi)=><li key={bi}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   CERTIFICATIONS
════════════════════════════════════════════════════════════ */
function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="reveal" style={{textAlign:'center',marginBottom:'48px'}}>
          <span className="section-eyebrow">// credentials</span>
          <h2 className="section-title">Certifications & <span>Education</span></h2>
        </div>
        <div className="certs-grid">
          {CERTS.map((c,i)=>(
            <div key={c.name} className="cert-card reveal reveal-child" style={{transitionDelay:`${i*.08}s`}}>
              <div className="cert-icon">{c.icon}</div>
              <div>
                <div className="cert-name">{c.full}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
              <span className={`cert-status ${c.status}`}>{c.status==='earned'?'✓ Earned':'⏳ In Progress'}</span>
            </div>
          ))}
        </div>
        {/* Education card */}
        <div className="exp-card reveal" style={{marginTop:'32px',borderLeft:'3px solid var(--vio)'}}>
          <div className="exp-card-top">
            <div>
              <div className="exp-role">MS — Cybersecurity Analytics & Operations</div>
              <div className="exp-company" style={{color:'var(--vio-bright)'}}>Penn State University · State College, PA</div>
            </div>
            <span className="exp-period">Expected May 2026</span>
          </div>
          <ul className="exp-bullets">
            <li>GPA: 3.85 / 4.0</li>
            <li>Focus areas: penetration testing, cloud security, ML for threat detection</li>
            <li>Teaching Assistant — Network Security (Spring 2025)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   CONTACT
════════════════════════════════════════════════════════════ */
function Contact() {
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''})
  const [sent,setSent]=useState(false)
  const [error,setError]=useState('')
  const submit = e => {
    e.preventDefault()
    if(!form.name||!form.email||!form.message){setError('Please fill in all required fields.');return}
    setError(''); setSent(true)
    setTimeout(()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''})},5000)
  }
  return (
    <section id="contact" className="section">
      <div style={{position:'absolute',top:'10%',right:'-80px',width:440,height:440,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 68%)',pointerEvents:'none'}}/>
      <div className="container">
        <div className="reveal" style={{textAlign:'center',marginBottom:'48px'}}>
          <span className="section-eyebrow">// get in touch</span>
          <h2 className="section-title">Let&apos;s <span>Connect</span></h2>
          <p className="section-subtitle" style={{margin:'0 auto'}}>Open to internships, full-time roles, freelance security assessments, and research collaborations.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Contact Information</h3>
            <p>Whether you have a security assessment, a job opportunity, or just want to talk cybersecurity — my inbox is always open.</p>
            <div className="contact-links">
              {[
                {href:'mailto:shubhomrawat27@gmail.com',icon:'✉️',label:'Email',value:'shubhomrawat27@gmail.com'},
                {href:'tel:+18142806444',icon:'📞',label:'Phone',value:'+1 (814) 280-6444'},
                {href:'https://linkedin.com/in/shubhom-rawat-45a2b522b',icon:'💼',label:'LinkedIn',value:'linkedin.com/in/shubhom-rawat'},
                {href:'https://github.com',icon:'🐙',label:'GitHub',value:'github.com/shubhomrawat'},
              ].map(item=>(
                <a key={item.label} href={item.href} className="contact-link-item" target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">{item.icon}</span>
                  <div>
                    <div style={{fontSize:'.72rem',color:'var(--txt3)',letterSpacing:'.1em',fontFamily:'monospace',textTransform:'uppercase',marginBottom:'2px'}}>{item.label}</div>
                    <div>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form reveal" style={{transitionDelay:'0.15s'}}>
            <form onSubmit={submit}>
              <div className="form-group"><label className="form-label">Name *</label><input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Subject</label><input className="form-input" type="text" placeholder="What is this about?" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" placeholder="Tell me more..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/></div>
              {error&&<p style={{color:'#f87171',fontSize:'.85rem',marginBottom:'12px'}}>{error}</p>}
              <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}><span>Send Message →</span></button>
              {sent&&<p className="form-success">✅ Message sent! I will get back to you soon.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
function Footer({ theme, toggleTheme }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">© {new Date().getFullYear()} <span>Shubhom Rawat</span>. Crafted with ☕ &amp; security in mind.</p>
          <div style={{display:'flex',gap:'8px'}}>
            {[{href:'https://linkedin.com/in/shubhom-rawat-45a2b522b',icon:'💼'},{href:'https://github.com',icon:'🐙'},{href:'mailto:shubhomrawat27@gmail.com',icon:'✉️'}].map((s,i)=>(
              <a key={i} href={s.href} className="social-btn" target="_blank" rel="noreferrer" style={{width:'36px',height:'36px',fontSize:'.95rem'}}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════════════════════ */
export default function Home() {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = useCallback(() => {
    setTheme(t=>{const n=t==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);return n})
  }, [])
  useEffect(()=>{document.documentElement.setAttribute('data-theme','dark')},[])
  useScrollReveal()
  return (
    <>
      <Head>
        <title>Shubhom Rawat — Cybersecurity Engineer &amp; Penetration Tester</title>
        <meta name="description" content="Portfolio of Shubhom Rawat — Cybersecurity Engineer at Amazon. Penetration testing, web security, network vulnerability assessments, and ML for threat detection."/>
        <meta name="keywords" content="cybersecurity, penetration testing, web security, network security, ethical hacking, OWASP, Burp Suite, AWS security, Shubhom Rawat"/>
        <meta name="author" content="Shubhom Rawat"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta property="og:title" content="Shubhom Rawat — Cybersecurity Engineer"/>
        <meta property="og:description" content="Securing the Web, One Vulnerability at a Time."/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <link rel="canonical" href="https://shubhomrawat.netlify.app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Navbar theme={theme} toggleTheme={toggleTheme}/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Certifications/>
        <Contact/>
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme}/>
    </>
  )
}