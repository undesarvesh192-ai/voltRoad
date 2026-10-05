import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, BatteryCharging, CarFront, CheckCircle2,
  CircuitBoard, Cloud, Cpu, Gauge, Github, Leaf, Menu, Radio,
  ShieldCheck, Sparkles, Zap, X, ChevronRight
} from "lucide-react";
import "./styles.css";

const specs = [
  ["Operating frequency", "85 kHz band", "Full-bridge inverter + gate driver"],
  ["Prototype air gap", "50–100 mm", "Litz-wire pancake coils + ferrite"],
  ["Power transfer", "50–200 W", "Series-series / LCC compensation"],
  ["Efficiency target", "≥ 80%", "Current + voltage sensing"],
  ["Road segments", "6–8 coils", "ESP32 / STM32 sequential switching"],
  ["Detection", "< 50 ms", "Hall / IR + ESP-NOW/BLE + MQTT"],
];

const bom = [
  ["Controller", "ESP32 / STM32F4", "₹1,000"],
  ["Inverter", "Gate driver + MOSFET/GaN", "₹1,200"],
  ["Tx coils", "Litz pancake coils, 6–8", "₹2,200"],
  ["Rx coil + ferrite", "Litz coil + Mn-Zn plate", "₹900"],
  ["Resonant capacitors", "MKP film", "₹800"],
  ["Sensors", "Hall, current, NTC, IR", "₹1,100"],
  ["Rectifier + buck", "Fast diodes + DC-DC", "₹600"],
  ["Battery + BMS", "Small Li-ion pack", "₹2,200"],
  ["Rover chassis", "Motors + wheels", "₹2,200"],
  ["PCB", "2-layer fabrication", "₹1,500"],
];

const roadmap = [
  ["01", "Design freeze", "Coil design, simulation, CAD and component ordering."],
  ["02", "Build", "Wind coils, assemble PCB and bench-test one segment."],
  ["03", "Integrate", "Multi-segment switching, vehicle detection, firmware and dashboard."],
  ["04", "Validate", "Moving-rover tests, efficiency data and Stage 3 preparation."],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [segment, setSegment] = useState(4);
  const [active, setActive] = useState(true);

  const activeSegments = useMemo(
    () => Array.from({ length: 8 }, (_, i) => active && Math.abs(i - segment) <= 1),
    [active, segment]
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo("home")}>
            <span className="brand-mark"><Zap size={19}/></span>
            <span>VOLT<span>ROAD</span></span>
          </button>

          <nav className={menu ? "nav-links open" : "nav-links"}>
            {[
              ["Technology","technology"], ["Simulator","simulator"],
              ["Safety","safety"], ["Roadmap","roadmap"]
            ].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo("contact")}>View Prototype <ArrowRight size={16}/></button>
          </nav>

          <button className="menu-btn" onClick={() => setMenu(!menu)}>
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot"/> VISHWAKARMA AWARDS 2026–27 · STAGE 2</div>
            <h1>Charge while you <em>drive.</em></h1>
            <p className="hero-sub">
              Smart Dynamic Wireless EV Charging Roads use segmented, sensor-activated resonant coils
              embedded in the road to transfer energy only when an EV is detected above them.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => scrollTo("simulator")}>Explore the live demo <ArrowRight size={18}/></button>
              <button className="secondary" onClick={() => scrollTo("technology")}>How it works <ChevronRight size={18}/></button>
            </div>
            <div className="hero-metrics">
              <div><strong>85 kHz</strong><span>target operating band</span></div>
              <div><strong>≥80%</strong><span>prototype efficiency target</span></div>
              <div><strong>6–8</strong><span>sequential road coils</span></div>
            </div>
          </div>

          <div className="road-visual">
            <div className="visual-glow"/>
            <div className="sky-grid"/>
            <div className="road">
              <div className="road-line"/>
              <div className="road-segments">
                {activeSegments.map((on,i) => <div key={i} className={"coil " + (on ? "on":"")}><span/></div>)}
              </div>
              <div className="car">
                <div className="car-body"><CarFront size={72}/></div>
                <div className="receiver"><BatteryCharging size={20}/></div>
              </div>
            </div>
            <div className="visual-label label-top"><Radio size={14}/> VEHICLE DETECTED</div>
            <div className="visual-label label-bottom"><span className="green-dot"/> ACTIVE COILS: {activeSegments.filter(Boolean).length}</div>
          </div>
        </section>

        <section className="stats section">
          <div className="stat"><span className="stat-icon red"><Gauge/></span><div><strong>30–60 min</strong><small>typical fast-charge stop</small></div></div>
          <div className="stat"><span className="stat-icon amber"><BatteryCharging/></span><div><strong>150–250 km</strong><small>range between highway stops</small></div></div>
          <div className="stat"><span className="stat-icon green"><Zap/></span><div><strong>0 stops*</strong><small>target on electrified lanes</small></div></div>
          <div className="stat"><span className="stat-icon blue"><Leaf/></span><div><strong>Smaller packs</strong><small>long-trip battery burden reduced</small></div></div>
        </section>

        <section id="technology" className="section split">
          <div>
            <div className="section-kicker">THE CORE IDEA</div>
            <h2>Energy follows the vehicle, not the parking bay.</h2>
            <p className="muted">
              The road is divided into short transmitter segments. Detection logic wakes only the
              segments underneath the vehicle, while neighbouring segments pre-energize to avoid a
              power dip. Passed segments switch off.
            </p>
            <div className="flow">
              {[
                ["01","Detect","Hall / IR sensors identify the vehicle."],
                ["02","Handshake","Vehicle-road link confirms the receiver pad."],
                ["03","Energize","Only covered coils transfer resonant power."],
                ["04","Shut off","Passed segments return to the safe OFF state."]
              ].map(x => <div className="flow-card" key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div></div>)}
            </div>
          </div>
          <div className="architecture">
            <div className="arch-title"><CircuitBoard size={18}/> SYSTEM ARCHITECTURE</div>
            <div className="arch-lane"><span>GRID / SOLAR</span><i>→</i><span>AC–DC + PFC</span><i>→</i><span>85 kHz INVERTER</span><i>→</i><span>RESONANT TX</span></div>
            <div className="magnetic">MAGNETIC COUPLING <span>↕</span></div>
            <div className="arch-lane reverse"><span>BATTERY / MOTOR</span><i>←</i><span>BUCK + BMS</span><i>←</i><span>RECTIFIER</span><i>←</i><span>RX COIL + FERRITE</span></div>
            <div className="control-layer">
              <span><Radio/> Detection</span><span><Cpu/> MCU logic</span><span><Cloud/> Dashboard</span>
            </div>
          </div>
        </section>

        <section id="simulator" className="section simulator">
          <div className="section-heading">
            <div><div className="section-kicker">INTERACTIVE DEMO</div><h2>Watch the road think.</h2></div>
            <p className="muted">Move the vehicle across the lane. Active segments follow it in real time.</p>
          </div>
          <div className="sim-card">
            <div className="sim-top">
              <div><span className="live"><span/> LIVE SIMULATION</span><b>Segment {segment + 1} / 8</b></div>
              <button className={active ? "toggle on":"toggle"} onClick={() => setActive(!active)}>{active ? "System ON":"System OFF"}</button>
            </div>
            <div className="sim-road">
              <div className="sim-coils">
                {activeSegments.map((on,i)=><div className={"sim-coil "+(on?"active":"")} key={i}><small>{i+1}</small></div>)}
              </div>
              <div className="sim-car" style={{left:`${9 + segment*11.7}%`}}><CarFront/></div>
            </div>
            <div className="slider-row">
              <span>ENTRY</span>
              <input type="range" min="0" max="7" value={segment} onChange={e=>setSegment(+e.target.value)} />
              <span>EXIT</span>
            </div>
            <div className="telemetry">
              <div><small>VEHICLE</small><b>{active ? "AUTHENTICATED":"NOT DETECTED"}</b></div>
              <div><small>ACTIVE COILS</small><b>{activeSegments.filter(Boolean).length}</b></div>
              <div><small>POWER STATE</small><b>{active ? "TRANSFER":"STANDBY"}</b></div>
              <div><small>LINK</small><b className="ok">● STABLE</b></div>
            </div>
          </div>
        </section>

        <section className="section specs-section">
          <div className="section-kicker">ENGINEERING TARGETS</div>
          <h2>Prototype specification</h2>
          <div className="table-wrap">
            <table><thead><tr><th>Parameter</th><th>Target</th><th>Selected hardware / protocol</th></tr></thead>
              <tbody>{specs.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="note">*Values are design targets from the Stage 2 concept and should be replaced by measured prototype results during validation.</p>
        </section>

        <section id="safety" className="section safety">
          <div className="section-heading">
            <div><div className="section-kicker">SAFETY FIRST</div><h2>Designed to fail safe.</h2></div>
            <ShieldCheck size={46} strokeWidth={1.2}/>
          </div>
          <div className="safety-grid">
            {[
              ["Metal object","Power/Q-factor detection cuts the segment."],
              ["Detection failure","Default-OFF logic + watchdog timer."],
              ["Misalignment","Position feedback and power derating."],
              ["Overcurrent","Hardware cutoff + MCU shutdown."],
              ["Battery over-temp","NTC sensing + BMS disconnect."],
              ["EMF exposure","Shielding and energize-only-under-vehicle logic."]
            ].map(([a,b])=><div className="safety-card" key={a}><CheckCircle2/><div><b>{a}</b><p>{b}</p></div></div>)}
          </div>
        </section>

        <section className="section bom-section">
          <div className="section-heading"><div><div className="section-kicker">BUILD PLAN</div><h2>Indicative prototype BOM</h2></div><div className="total">₹13,700 <span>indicative total</span></div></div>
          <div className="bom-grid">{bom.map(r=><div className="bom-item" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><strong>{r[2]}</strong></div>)}</div>
        </section>

        <section id="roadmap" className="section roadmap">
          <div className="section-kicker">FROM CONCEPT TO PROTOTYPE</div>
          <h2>4-month fabrication roadmap</h2>
          <div className="roadmap-grid">{roadmap.map(r=><div className="roadmap-card" key={r[0]}><div className="month">{r[0]}</div><h3>{r[1]}</h3><p>{r[2]}</p></div>)}</div>
        </section>

        <section id="contact" className="section final-cta">
          <div className="cta-glow"/>
          <Sparkles size={30}/>
          <h2>Build the road that charges the future.</h2>
          <p>Smart Dynamic Wireless EV Charging Roads · Sanjivani University, Kopargaon</p>
          <div className="cta-buttons">
            <button className="primary" onClick={() => scrollTo("simulator")}>Run the simulation <ArrowRight size={18}/></button>
            <a className="secondary" href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17}/> Add GitHub repository</a>
          </div>
        </section>
      </main>

      <footer>
        <div>VOLT<span>ROAD</span> · Smart Dynamic Wireless EV Charging Roads</div>
        <div>Concept website based on the Stage 2 project presentation.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
