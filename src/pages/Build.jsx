import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/build.css';

export default function Build() {
  const [copied, setCopied] = useState(null);

  function copyCode(id, text) {
    const toCopy = text || document.getElementById(id)?.innerText || '';
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="build-container">
      <div className="label">For Builders</div>
      <div className="page-title">Turn any service into an Aapp.</div>
      <div className="page-sub">Three methods. One registration. Nara auto-generates a skill &mdash; every agent on the network can use your service instantly.</div>

      <div className="steps">
        <div className="step">
          <div className="step-header">
            <div className="step-num">01</div>
            <div className="step-title">Install the SDK</div>
          </div>
          <div className="step-desc">One package. Everything you need to build, test, and deploy an Aapp.</div>
          <div className="code-wrap">
            <button className="copy-code" onClick={() => copyCode('s1', 'npm install nara-sdk')}>
              {copied === 's1' ? '✓ Copied' : 'Copy'}
            </button>
            <pre><span className="muted">$</span> <span className="co">npm install</span> nara-sdk</pre>
          </div>
        </div>

        <div className="step">
          <div className="step-header">
            <div className="step-num">02</div>
            <div className="step-title">Implement three methods</div>
          </div>
          <div className="step-desc">Tell agents what you do, execute their requests, and settle payment. That's it.</div>
          <div className="code-wrap">
            <button className="copy-code" onClick={() => copyCode('code-impl')}>
              {copied === 'code-impl' ? '✓ Copied' : 'Copy'}
            </button>
            <pre id="code-impl" dangerouslySetInnerHTML={{ __html: `<span class="co">import</span> { <span class="cg">Aapp</span> } <span class="co">from</span> <span class="cy">'nara-sdk'</span>;

<span class="co">class</span> <span class="cg">MyAapp</span> <span class="co">extends</span> <span class="cg">Aapp</span> {

  <span class="cc">// What you do. What it costs.</span>
  <span class="cg">manifest</span>() {
    <span class="co">return</span> {
      name: <span class="cy">'my-service'</span>,
      actions: [<span class="cy">'query'</span>, <span class="cy">'execute'</span>],
      cost: { amount: <span class="cy">0.01</span>, token: <span class="cy">'NARA'</span> }
    };
  }

  <span class="cc">// Receive intent. Return result.</span>
  <span class="co">async</span> <span class="cg">execute</span>(intent) {
    <span class="co">const</span> result = <span class="co">await</span> this.process(intent);
    <span class="co">return</span> { success: <span class="cy">true</span>, data: result };
  }

  <span class="cc">// Auto-runs on-chain. NARA sent to your wallet.</span>
  <span class="co">async</span> <span class="cg">settle</span>(executionId) {
    <span class="co">return</span> { settled: <span class="cy">true</span> };
  }
}` }} />
          </div>
        </div>

        <div className="step">
          <div className="step-header">
            <div className="step-num">03</div>
            <div className="step-title">Register and deploy</div>
          </div>
          <div className="step-desc">One command. Your Aapp goes live on Nara. A skill is auto-generated. Every agent on the network can discover and use your service.</div>
          <div className="code-wrap">
            <button className="copy-code" onClick={() => copyCode('s3', 'npx nara deploy')}>
              {copied === 's3' ? '✓ Copied' : 'Copy'}
            </button>
            <pre dangerouslySetInnerHTML={{ __html: `<span class="muted">$</span> <span class="co">npx nara deploy</span>

<span class="cg">✓</span> Compiled
<span class="cg">✓</span> Registered to AappRegistry
<span class="cg">✓</span> Skill auto-generated
<span class="cg">✓</span> Live on devnet

  Aapp:   my-service
  Skill:  npx nara-skill install my-service
  Cost:   0.01 NARA/call
  Status: <span class="co">● Active</span>` }} />
          </div>
        </div>
      </div>

      <div className="quickstart">
        <div className="qs-title">Quick start</div>
        <div className="qs-desc">From zero to live Aapp in under 60 seconds.</div>
        <div className="qs-cmds">
          <div className="qs-cmd"><code><span className="muted">$</span> npm install nara-sdk</code><span className="muted">Install</span></div>
          <div className="qs-cmd"><code><span className="muted">$</span> npx nara init my-aapp</code><span className="muted">Scaffold</span></div>
          <div className="qs-cmd"><code><span className="muted">$</span> npx nara deploy</code><span className="muted">Deploy</span></div>
        </div>
      </div>

      <div className="benefits">
        <div className="benefits-title">What you get</div>
        <div className="benefit-grid">
          <div className="benefit"><div className="benefit-label">Discovery</div><div className="benefit-text">Listed in AappRegistry. Any agent on the network can find you.</div></div>
          <div className="benefit"><div className="benefit-label">Settlement</div><div className="benefit-text">NARA auto-transferred to your wallet on every call. No invoicing.</div></div>
          <div className="benefit"><div className="benefit-label">Reputation</div><div className="benefit-text">On-chain execution history. Agents trust you based on your track record.</div></div>
          <div className="benefit"><div className="benefit-label">Skill generation</div><div className="benefit-text">Nara reads your manifest and auto-generates an installable skill. Zero extra work.</div></div>
        </div>
      </div>

      <div className="cta">
        <div className="cta-text">Ethereum defined dApps.<br /><span>Nara defines Aapps.</span></div>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <a href="https://github.com/nara-chain/nara-sdk" target="_blank" rel="noopener noreferrer" className="btn-p">Get the SDK &rarr;</a>
          <Link to="/skills" className="btn-s">View Skill Directory</Link>
        </div>
      </div>
    </div>
  );
}
