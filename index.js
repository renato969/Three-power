var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// index.js
var MODELO = {
  avaliar: "claude-haiku-4-5-20251001",
  gerar: "claude-sonnet-5"
};
var MAX_PROMPT = 8e3;
var BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
var HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Três Poderes</title>
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/icon-192.png">
<link rel="apple-touch-icon" href="/icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Três Poderes">
<meta name="theme-color" content="#15110d">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#15110d; --panel:#1d1611; --panel-2:#241b14;
    --rule:rgba(244,238,223,0.12);
    --parchment:#f4eedf; --dim:#a89f8e;
    --oxblood:#b3231f; --oxblood-br:#d63a2f;
    --brass:#c9a24b; --brass-dim:#8a7538;
    --good:#7ea36b; --radius:7px;
    --nav-h: 62px;
  }
  .install-banner{ position:fixed; left:12px; right:12px; bottom:calc(var(--nav-h) + env(safe-area-inset-bottom) + 12px);
    z-index:60; background:linear-gradient(180deg,var(--panel),var(--panel-2)); border:1px solid var(--brass-dim);
    border-radius:10px; padding:14px 16px; box-shadow:0 18px 40px -16px rgba(0,0,0,.7); display:none; }
  .install-banner.show{ display:flex; align-items:center; gap:12px; }
  .install-banner svg{ width:28px; height:28px; stroke:var(--brass); fill:none; flex-shrink:0; }
  .install-banner .txt{ flex:1; font-size:12.5px; line-height:1.4; color:var(--parchment); }
  .install-banner .txt b{ color:var(--brass); }
  .install-banner button{ font-family:'Inter',sans-serif; font-size:12px; font-weight:600; color:#241b14;
    background:var(--brass); border:none; padding:8px 12px; border-radius:6px; white-space:nowrap; }
  .install-banner .close{ background:none; color:var(--dim); font-size:18px; padding:0 4px; }
  .paywall-overlay{ position:fixed; inset:0; z-index:80; background:rgba(10,8,6,0.82); backdrop-filter:blur(3px);
    display:none; align-items:center; justify-content:center; padding:20px; }
  .paywall-overlay.show{ display:flex; }
  .paywall-card{ position:relative; max-width:360px; width:100%; background:linear-gradient(180deg,var(--panel),var(--panel-2));
    border:1px solid var(--brass-dim); border-radius:12px; padding:28px 24px; text-align:center;
    box-shadow:0 24px 60px -16px rgba(0,0,0,.8); }
  .paywall-close{ position:absolute; top:10px; right:12px; background:none; border:none; color:var(--dim); font-size:18px; }
  .lock-teaser{ display:none; background:linear-gradient(180deg,rgba(201,162,75,0.08),rgba(201,162,75,0.02));
    border:1px solid var(--brass-dim); border-radius:var(--radius); padding:16px 16px; margin-bottom:16px; }
  .lock-teaser.show{ display:flex; gap:12px; align-items:flex-start; }
  .lock-teaser svg{ width:24px; height:24px; stroke:var(--brass); fill:none; flex-shrink:0; margin-top:2px; }
  .lock-teaser .body{ flex:1; }
  .lock-teaser .body b{ color:var(--parchment); font-size:13.5px; }
  .lock-teaser .body p{ margin:4px 0 10px; font-size:12px; color:var(--dim); line-height:1.5; }
  .lock-teaser button{ font-family:'Inter',sans-serif; font-size:12px; font-weight:600; color:#241b14;
    background:var(--brass); border:none; padding:8px 14px; border-radius:6px; }
  *{box-sizing:border-box;}
  html{ overflow-x:hidden; }
  body{
    margin:0; min-height:100vh; min-height:100dvh;
    padding:24px 20px calc(var(--nav-h) + env(safe-area-inset-bottom) + 26px);
    background:radial-gradient(1200px 600px at 50% -10%, rgba(179,35,31,0.10), transparent 60%), var(--ink);
    color:var(--parchment); font-family:'Inter',sans-serif;
    display:flex; justify-content:center;
    overscroll-behavior-y:contain;
  }
  .app{ width:100%; max-width:660px; }
  .view{ display:none; } .view.active{ display:block; }

  header{ text-align:center; margin-bottom:18px; }
  .eyebrow{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:var(--brass); margin-bottom:5px; }
  h1{ font-family:'Fraunces',serif; font-weight:600; font-size:clamp(23px,4vw,30px); margin:0; }
  .sub-h{ font-size:12.5px; color:var(--dim); margin-top:6px; }

  /* topbar fixa */
  .topbar{ position:sticky; top:0; z-index:20; margin:0 -16px 12px; padding:0 16px 10px;
    background:linear-gradient(180deg, var(--ink) 78%, rgba(21,17,13,0)); }
  .topbar-inner{ display:flex; align-items:stretch; gap:1px; background:var(--rule);
    border:1px solid var(--rule); border-radius:var(--radius); overflow:hidden; }
  .ring-cell{ background:linear-gradient(180deg,var(--panel),var(--panel-2)); padding:8px 12px 7px;
    display:flex; flex-direction:column; align-items:center; justify-content:center; min-width:92px; }
  .ring-cell{ position:relative; overflow:hidden; }
  .ring-svg{ display:block; overflow:visible; }
  #lemni{ transform-origin:100px 50px; animation: lemPulse 3.4s ease-in-out infinite; }
  @keyframes lemPulse{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.045); } }
  #ringHalo{ opacity:0; transition:opacity .8s ease; }
  #ringFg{ transition: stroke-dashoffset 1.1s cubic-bezier(.25,1,.35,1); }
  #ringShine{ opacity:0; }

  .ring-cell.t2 #lemni{ animation-duration:2.6s; }
  .ring-cell.t3 #lemni{ animation-duration:1.7s; }
  .ring-cell.t4 #lemni{ animation-duration:1.05s; }
  .ring-cell.t2 #ringHalo{ opacity:.22; }
  .ring-cell.t3 #ringHalo{ opacity:.5; }
  .ring-cell.t4 #ringHalo{ opacity:.85; animation: haloBeat 1.05s ease-in-out infinite; }
  @keyframes haloBeat{ 0%,100%{ opacity:.55; } 50%{ opacity:1; } }

  .ring-cell.t3 #ringShine,
  .ring-cell.t4 #ringShine{ opacity:.9; animation: shineRun 2.1s linear infinite; }
  .ring-cell.t4 #ringShine{ animation-duration:1.25s; }
  @keyframes shineRun{ from{ stroke-dashoffset: var(--len,600); } to{ stroke-dashoffset: 0; } }

  .ring-cell.charging::after{ content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(circle at 42% 50%, rgba(201,162,75,0.55), transparent 62%);
    animation: chargeFlash .95s ease-out forwards; }
  @keyframes chargeFlash{ 0%{ opacity:0; transform:scale(.7); } 22%{ opacity:1; } 100%{ opacity:0; transform:scale(1.5); } }
  .ring-cell.charging #lemni{ animation: chargeKick .95s cubic-bezier(.2,1.6,.4,1); }
  @keyframes chargeKick{ 0%{ transform:scale(1); } 26%{ transform:scale(1.16); } 100%{ transform:scale(1); } }

  .ring-cell.t4 .ring-pct{ animation: pctBeat 1.05s ease-in-out infinite; }
  @keyframes pctBeat{ 0%,100%{ color:var(--brass); } 50%{ color:#ffe9a8; } }

  .ring-pct{ font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--brass); margin-top:-4px; line-height:1; transition:color .4s ease; }
  .ring-sub{ font-family:'IBM Plex Mono',monospace; font-size:8.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--dim); margin-top:3px; }
  .metrics{ flex:1; display:grid; grid-template-columns:repeat(5,1fr); gap:1px; background:var(--rule); }
  .metric{ background:linear-gradient(180deg,var(--panel),var(--panel-2)); padding:10px 4px; text-align:center;
    display:flex; flex-direction:column; justify-content:center; }
  .m-label{ font-family:'IBM Plex Mono',monospace; font-size:8.5px; letter-spacing:0.1em; text-transform:uppercase; color:var(--dim); margin-bottom:3px; }
  .m-val{ font-family:'Fraunces',serif; font-weight:600; font-size:19px; line-height:1; font-variant-numeric:tabular-nums; }
  .m-val.gold{ color:var(--brass); } .m-val.blood{ color:var(--oxblood-br); }
  .m-sub{ font-family:'IBM Plex Mono',monospace; font-size:8px; color:var(--dim); margin-top:2px; }
  .banner{ background:linear-gradient(180deg,var(--panel),var(--panel-2)); border:1px solid var(--rule);
    border-radius:var(--radius); padding:11px 16px; text-align:center; font-size:12.5px; color:var(--dim); line-height:1.5; margin-bottom:14px; }
  .banner strong{ color:var(--brass); }
  @media (max-width:560px){
    .topbar-inner{ flex-direction:column; }
    .ring-cell{ flex-direction:row; gap:10px; min-width:0; padding:7px 12px; }
    .ring-sub{ margin-top:0; }
    .m-val{ font-size:16px; } .m-label{ font-size:7.5px; }
  }

  .card{ background:linear-gradient(180deg,var(--panel),var(--panel-2)); border:1px solid var(--rule);
    border-radius:var(--radius); padding:26px 24px; margin-bottom:18px; position:relative; overflow:hidden;
    box-shadow:0 18px 40px -20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(244,238,223,0.04); }
  .card.hero{ border-color:rgba(201,162,75,0.28); box-shadow:0 20px 46px -18px rgba(0,0,0,0.7), inset 0 1px 0 rgba(244,238,223,0.05); }
  .card::before{ content:""; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--brass),transparent); opacity:0.55; }
  .card-title{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:0.1em; text-transform:uppercase; color:var(--dim); margin:0 0 14px; }

  .meta-row{ display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
  .badge{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; padding:5px 10px; border-radius:20px; border:1px solid; }
  .badge.raciocinio{ color:var(--brass); border-color:var(--brass-dim); background:rgba(201,162,75,0.08); }
  .badge.discernimento{ color:var(--oxblood-br); border-color:var(--oxblood); background:rgba(179,35,31,0.08); }
  .badge.influencia{ color:var(--parchment); border-color:var(--rule); background:rgba(244,238,223,0.06); }
  .meta-right{ font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--dim); text-align:right; }

  .adapt-note{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--brass);
    background:rgba(201,162,75,0.07); border:1px solid rgba(201,162,75,0.22); border-radius:6px; padding:8px 11px; margin-bottom:16px; line-height:1.5; }
  .prompt{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; font-size:19px; line-height:1.55; margin:0 0 20px; }
  .timer{ font-family:'IBM Plex Mono',monospace; font-size:34px; text-align:center; color:var(--brass); margin:0 0 16px; font-variant-numeric:tabular-nums; }
  .timer.stopped{ color:var(--parchment); }

  textarea{ width:100%; min-height:88px; background:rgba(244,238,223,0.04); border:1px solid var(--rule);
    border-radius:8px; color:var(--parchment); font-family:'Inter',sans-serif; font-size:14.5px; line-height:1.5; padding:13px; resize:vertical; margin-bottom:14px; }
  textarea:focus{ outline:none; border-color:var(--brass-dim); }
  textarea::placeholder{ color:var(--dim); } textarea:disabled{ opacity:0.55; }

  .choice-row{ display:flex; flex-direction:column; gap:9px; margin-bottom:14px; }
  .choice-btn{ text-align:left; background:rgba(244,238,223,0.03); border:1px solid var(--rule);
    color:var(--parchment); font-weight:400; font-size:14px; padding:13px 15px; font-family:'Inter',sans-serif;
    min-height:46px; touch-action:manipulation; }
  .choice-btn:hover:not(:disabled){ border-color:var(--brass-dim); background:rgba(201,162,75,0.06); }
  .choice-btn .letter{ font-family:'IBM Plex Mono',monospace; color:var(--brass); margin-right:8px; }
  .choice-btn.correct{ border-color:var(--good); background:rgba(126,163,107,0.12); }
  .choice-btn.wrong{ border-color:var(--oxblood); background:rgba(179,35,31,0.12); }

  .btn-row{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
  button{ font-family:'Inter',sans-serif; font-weight:600; font-size:14px; padding:12px 22px;
    border-radius:8px; border:1px solid transparent; cursor:pointer; transition:transform .15s ease, opacity .15s ease;
    touch-action:manipulation; }
  .btn-primary, .btn-ghost, .btn-gold{ min-height:44px; }
  button:active{ transform:scale(.97); }
  button:focus-visible{ outline:2px solid var(--brass); outline-offset:2px; }
  button:disabled{ opacity:.5; cursor:not-allowed; }
  .btn-primary{ background:var(--oxblood); color:var(--parchment); }
  .btn-primary:hover:not(:disabled){ background:var(--oxblood-br); }
  .btn-ghost{ background:transparent; color:var(--dim); border-color:var(--rule); }
  .btn-ghost:hover:not(:disabled){ color:var(--parchment); border-color:var(--dim); }
  .btn-gold{ background:var(--brass); color:#241b14; }
  .btn-gold:hover:not(:disabled){ background:#dab660; }
  .tab-btn{ background:transparent; color:var(--dim); border:1px solid var(--rule); font-size:12.5px; padding:8px 15px; }
  .tab-btn.active{ background:rgba(201,162,75,0.12); color:var(--brass); border-color:var(--brass-dim); }

  @keyframes dots{0%{content:'';}25%{content:'.';}50%{content:'..';}75%{content:'...';}100%{content:'';}}

  .result{ margin-top:18px; padding-top:18px; border-top:1px dashed var(--rule); }
  .result-head{ display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; margin-bottom:12px; }
  .verdict{ font-family:'IBM Plex Mono',monospace; font-size:11.5px; padding:4px 10px; border-radius:14px; }
  .verdict.ok{ background:rgba(126,163,107,0.15); color:var(--good); border:1px solid rgba(126,163,107,0.4); }
  .verdict.no{ background:rgba(179,35,31,0.15); color:var(--oxblood-br); border:1px solid rgba(179,35,31,0.4); }
  .mini-scale{ display:flex; align-items:center; gap:10px; }
  .mini-nota{ font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--dim); }
  .mini-nota b{ color:var(--brass); font-size:19px; }
  #beam{ transform-origin:100px 40px; transition:transform .8s cubic-bezier(.34,1.56,.64,1); }
  .feedback-text{ font-size:14.5px; line-height:1.6; margin:0 0 12px; }
  .result h4{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--dim); margin:0 0 7px; }
  .answer-text{ font-size:13.5px; line-height:1.6; color:var(--dim); margin:0 0 12px; padding:12px 14px;
    background:rgba(244,238,223,0.03); border-radius:8px; border:1px solid var(--rule); }
  .scale-caption{ font-size:12px; color:var(--dim); font-style:italic; }
  .rate-label{ font-size:13px; color:var(--dim); margin-bottom:9px; }
  .rate-row{ display:flex; flex-direction:column; gap:8px; }
  .rate-option{ text-align:left; background:rgba(244,238,223,0.03); border:1px solid var(--rule);
    color:var(--parchment); font-weight:400; font-size:13.5px; padding:13px 14px; min-height:46px;
    touch-action:manipulation; }
  .rate-option:hover{ border-color:var(--brass-dim); background:rgba(201,162,75,0.06); }
  .rate-option strong{ color:var(--brass); font-weight:600; }
  .error-note{ font-size:12.5px; color:var(--oxblood-br); margin-bottom:10px; }

  .session-done{ text-align:center; padding:8px 0 4px; }
  .session-done .sd-glyph{ font-size:34px; color:var(--brass); line-height:1; margin-bottom:12px; }
  .session-done h3{ font-family:'Fraunces',serif; font-weight:600; font-size:20px; margin:0 0 10px; }
  .session-done p{ font-size:14px; line-height:1.6; color:var(--dim); margin:0 auto 20px; max-width:420px; }
  .session-done p strong{ color:var(--brass); }
  .sd-aviso{ font-size:13px; line-height:1.6; color:var(--dim); margin:14px auto 0; max-width:440px;
    padding:12px 15px; border-radius:8px; background:rgba(179,35,31,0.08);
    border-left:2px solid var(--oxblood); text-align:left; }
  .sd-aviso strong{ color:var(--oxblood-br); }
  .sd-aviso code{ font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:var(--brass);
    background:rgba(201,162,75,0.1); padding:1px 5px; border-radius:4px; }

  /* módulos das leis */
  .mod-list{ display:flex; flex-direction:column; gap:10px; }
  .mod-card{ display:grid; grid-template-columns:38px 1fr auto; grid-template-rows:auto auto auto;
    column-gap:14px; row-gap:0; align-items:start; text-align:left; width:100%;
    background:linear-gradient(180deg,var(--panel),var(--panel-2)); border:1px solid var(--rule);
    border-radius:var(--radius); padding:15px 16px; font-family:'Inter',sans-serif; font-weight:400; color:var(--parchment); }
  .mod-card:hover{ border-color:var(--brass-dim); }
  .mod-card.done{ border-color:rgba(126,163,107,0.3); }
  .mod-card.done .mod-fill{ background:var(--good); }
  .mod-glifo{ grid-column:1; grid-row:1 / span 2; font-size:22px; line-height:1.1; color:var(--brass);
    text-align:center; align-self:center; }
  .mod-card.done .mod-glifo{ color:var(--good); }
  .mod-nome{ grid-column:2; grid-row:1; font-family:'Fraunces',serif; font-weight:600;
    font-size:16.5px; line-height:1.25; }
  .mod-sub{ grid-column:2; grid-row:2; font-size:11.5px; color:var(--dim); line-height:1.3; margin-top:3px; }
  .mod-prog{ grid-column:3; grid-row:1 / span 2; align-self:center; font-family:'IBM Plex Mono',monospace;
    font-size:11px; color:var(--brass); white-space:nowrap; padding-left:6px; }
  .mod-card.done .mod-prog{ color:var(--good); }
  .mod-track{ grid-column:1 / -1; grid-row:3; height:3px; background:rgba(244,238,223,0.07);
    border-radius:2px; overflow:hidden; margin-top:12px; }
  .mod-fill{ height:100%; background:var(--brass); border-radius:2px; transition:width .6s ease; }
  .mod-fontes{ grid-column:2 / -1; grid-row:2; font-family:'IBM Plex Mono',monospace; font-size:9px;
    color:var(--dim); opacity:.75; text-align:right; align-self:end; }
  .resumo{ font-size:14px; line-height:1.65; color:var(--dim); margin:0 0 18px;
    padding:14px 16px; background:rgba(201,162,75,0.05); border-left:2px solid var(--brass-dim); border-radius:0 8px 8px 0; }
  .back-link{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim); background:none;
    border:none; padding:0 0 14px; cursor:pointer; }
  .back-link:hover{ color:var(--brass); }

  /* eneagrama */
  .enea-wrap{ display:flex; justify-content:center; margin:6px 0 16px; }
  .enea-pt{ transition:all .5s ease; }
  @keyframes eneaQuebraGlow{ 0%,100%{ filter:drop-shadow(0 0 0 rgba(214,58,47,0)); } 50%{ filter:drop-shadow(0 0 7px rgba(214,58,47,.95)); } }
  .enea-pt-quebra{ animation:eneaQuebraGlow 1.8s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
  @keyframes eneaRingPulse{ 0%{ transform:scale(1); opacity:.85; } 100%{ transform:scale(2.8); opacity:0; } }
  .enea-pulse-ring{ animation:eneaRingPulse 1.8s ease-out infinite; transform-box:fill-box; transform-origin:center; }
  @media (prefers-reduced-motion:reduce){ .enea-pt-quebra,.enea-pulse-ring{ animation:none !important; } }
  .enea-label{ font-family:'IBM Plex Mono',monospace; font-size:9px; fill:var(--dim); }
  .scale-opts{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:14px; }
  .scale-opt{ background:rgba(244,238,223,0.03); border:1px solid var(--rule); color:var(--parchment);
    font-size:13px; padding:10px 14px; flex:1; min-width:78px; font-weight:400; }
  .scale-opt:hover{ border-color:var(--brass-dim); background:rgba(201,162,75,0.06); }
  .prog-dots{ display:flex; gap:5px; justify-content:center; margin-bottom:16px; flex-wrap:wrap; }
  .dot{ width:6px; height:6px; border-radius:50%; background:rgba(244,238,223,0.15); }
  .dot.done{ background:var(--brass); } .dot.now{ background:var(--oxblood-br); transform:scale(1.4); }
  .res-block{ text-align:center; }

  .gate-card{ background:linear-gradient(180deg, rgba(201,162,75,0.09), rgba(201,162,75,0.03));
    border:1px solid var(--brass-dim); border-radius:12px; padding:20px 18px; margin:20px 0 8px; text-align:center; }
  .gate-lead{ font-size:14px; line-height:1.6; color:var(--parchment); margin:0 0 16px; }
  .gate-row{ display:flex; flex-direction:column; gap:9px; margin-bottom:12px; }
  .gate-row input{ width:100%; background:rgba(244,238,223,0.05); border:1px solid var(--rule);
    border-radius:8px; padding:12px 14px; color:var(--parchment); font-family:'Inter',sans-serif;
    font-size:14px; }
  .gate-row input:focus{ outline:none; border-color:var(--brass); }
  .gate-row input::placeholder{ color:var(--dim); }
  .gate-fine{ font-size:11px; color:var(--dim); margin:10px 0 0; }
  .gate-ok{ background:rgba(126,163,107,0.1); border:1px solid rgba(126,163,107,0.4);
    border-radius:10px; padding:13px 16px; margin:20px 0 8px; font-size:13.5px; color:var(--good);
    text-align:center; }
  .res-kicker{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--dim); margin-bottom:6px; }
  .res-big{ font-family:'Fraunces',serif; font-weight:600; font-size:26px; color:var(--brass); margin-bottom:8px; }
  .res-text{ font-size:14px; line-height:1.65; color:var(--dim); max-width:440px; margin:0 auto 18px; }
  .res-text strong{ color:var(--parchment); }
  .note-bars{ margin-top:6px; }
  .nb-row{ margin-bottom:15px; }
  .nb-head{ display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:3px; }
  .nb-nota{ font-size:13.5px; color:var(--parchment); }
  .nb-nota b{ font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--brass); font-weight:600; margin-right:2px; }
  .nb-desc{ font-size:11.5px; color:var(--dim); line-height:1.4; margin-bottom:6px; }
  .nb-track{ height:6px; background:rgba(244,238,223,0.07); border-radius:3px; overflow:hidden; }
  .nb-fill{ height:100%; border-radius:3px; transition:width .6s ease; }
  .nb-val{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim); flex-shrink:0; }
  .nb-row.fraca .nb-nota{ color:#f0b6ac; }
  .nb-row.fraca .nb-val{ color:var(--oxblood-br); }
  .crit-tag{ font-family:'IBM Plex Mono',monospace; font-size:8.5px; color:var(--oxblood-br); margin-left:6px; }
  .anam{ margin-top:22px; padding-top:20px; border-top:1px dashed var(--rule); text-align:left; }
  .anam h4{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase;
    color:var(--brass); margin:0 0 10px; }
  .anam p{ font-size:14px; line-height:1.68; color:var(--dim); margin:0 0 14px; }
  .anam p strong{ color:var(--parchment); font-weight:600; }
  .anam .lead{ color:var(--parchment); font-size:14.5px; }
  .ficha{ display:grid; grid-template-columns:repeat(auto-fit,minmax(128px,1fr)); gap:1px;
    background:var(--rule); border:1px solid var(--rule); border-radius:8px; overflow:hidden; margin:0 0 16px; }
  .ficha div{ background:rgba(244,238,223,0.02); padding:9px 11px; }
  .ficha dt{ font-family:'IBM Plex Mono',monospace; font-size:8.5px; letter-spacing:0.1em;
    text-transform:uppercase; color:var(--dim); margin-bottom:3px; }
  .ficha dd{ margin:0; font-size:12.5px; color:var(--parchment); line-height:1.35; }
  .ficha-glossario{ font-size:11px; line-height:1.6; color:var(--dim); margin:-8px 0 16px; padding:10px 12px;
    background:rgba(244,238,223,0.02); border-radius:8px; border:1px solid var(--rule); }
  .ficha-glossario b{ color:var(--brass); font-weight:600; }
  .bloco{ padding:13px 15px; border-radius:8px; margin:0 0 14px; border-left:2px solid; }
  .bloco.sintoma{ background:rgba(179,35,31,0.07); border-color:var(--oxblood); }
  .bloco.origem{ background:rgba(201,162,75,0.06); border-color:var(--brass-dim); }
  .bloco.correcao{ background:rgba(126,163,107,0.07); border-color:rgba(126,163,107,.5); }
  .bloco .rot{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.1em;
    text-transform:uppercase; margin-bottom:6px; }
  .bloco.sintoma .rot{ color:var(--oxblood-br); }
  .bloco.origem .rot{ color:var(--brass); }
  .bloco.correcao .rot{ color:var(--good); }
  .bloco p{ margin:0; font-size:13.5px; line-height:1.62; color:var(--dim); }
  .bloco p strong{ color:var(--parchment); }
  .cbars{ margin:0 0 16px; }
  .cbar{ display:flex; align-items:center; gap:10px; margin-bottom:7px; }
  .cbar-n{ font-size:12px; width:92px; flex-shrink:0; color:var(--dim); }
  .cbar-t{ flex:1; height:5px; background:rgba(244,238,223,0.07); border-radius:3px; overflow:hidden; }
  .cbar-f{ height:100%; border-radius:3px; }
  .cbar-v{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--dim); width:30px; text-align:right; }
  .hist-list{ display:flex; flex-direction:column; gap:8px; }
  .hist-item{ display:flex; justify-content:space-between; align-items:center; gap:10px;
    background:rgba(244,238,223,0.03); border:1px solid var(--rule); border-radius:8px; padding:10px 13px;
    font-size:12.5px; color:var(--parchment); width:100%; text-align:left; font-weight:400; font-family:'Inter',sans-serif; }
  .hist-item:hover{ border-color:var(--brass-dim); }
  .hist-item.atual{ border-color:rgba(201,162,75,0.45); background:rgba(201,162,75,0.07); }
  .hist-data{ font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--dim); }
  .hist-tag{ font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--brass); }
  .evo{ font-size:12.5px; line-height:1.6; color:var(--dim); margin-top:12px; padding-top:12px; border-top:1px dashed var(--rule); }
  .evo strong{ color:var(--brass); }

  /* performance */
  .axis-row{ margin-bottom:15px; }
  .axis-head{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
  .axis-name{ font-size:13px; }
  .axis-val{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim); }
  .axis-track{ height:6px; background:rgba(244,238,223,0.07); border-radius:3px; overflow:hidden; }
  .axis-fill{ height:100%; border-radius:3px; transition:width .7s cubic-bezier(.34,1.1,.64,1); }
  .axis-tag{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.08em; text-transform:uppercase; padding:2px 7px; border-radius:10px; margin-left:8px; }
  .tag-foco{ background:rgba(179,35,31,0.16); color:var(--oxblood-br); border:1px solid rgba(179,35,31,0.4); }
  .tag-solido{ background:rgba(126,163,107,0.14); color:var(--good); border:1px solid rgba(126,163,107,0.35); }
  .diag-msg{ font-size:13px; line-height:1.6; color:var(--dim); margin-top:14px; padding-top:14px; border-top:1px dashed var(--rule); }
  .diag-msg strong{ color:var(--brass); }
  .melhora-list{ list-style:none; padding:0; margin:0; }
  .melhora-list li{ font-size:13.5px; line-height:1.6; color:var(--dim); padding:11px 0 11px 22px; position:relative; border-bottom:1px solid rgba(244,238,223,0.06); }
  .melhora-list li:last-child{ border-bottom:none; }
  .melhora-list li::before{ content:'→'; position:absolute; left:0; color:var(--oxblood-br); font-family:'IBM Plex Mono',monospace; }
  .melhora-list strong{ color:var(--parchment); }

  table{ width:100%; border-collapse:collapse; font-size:13px; }
  th{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.06em; text-transform:uppercase;
    color:var(--dim); text-align:left; padding:8px 6px; border-bottom:1px solid var(--rule); }
  td{ padding:9px 6px; border-bottom:1px solid rgba(244,238,223,0.06); }
  .tag-pill{ font-family:'IBM Plex Mono',monospace; font-size:10px; padding:2px 7px; border-radius:10px; }
  .rank-badge{ display:inline-flex; align-items:center; justify-content:center; width:25px; height:25px;
    border-radius:50%; font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600;
    background:rgba(244,238,223,0.05); color:var(--dim); border:1px solid var(--rule); }
  .rank-badge.axis369{ background:rgba(201,162,75,0.12); color:var(--brass); border-color:var(--brass-dim); }
  .empty-state{ text-align:center; color:var(--dim); font-size:13.5px; padding:18px 0; line-height:1.5; }
  .axis-note{ font-size:11px; color:var(--dim); text-align:center; margin-top:12px; font-style:italic; }
  .num-mono{ font-family:'IBM Plex Mono',monospace; color:var(--brass); }
  .pane{ display:none; } .pane.active{ display:block; }

  .api-badge{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.08em; text-transform:uppercase; padding:3px 8px; border-radius:10px; }
  .api-badge.on{ color:var(--good); border:1px solid rgba(126,163,107,0.35); background:rgba(126,163,107,0.10); }
  .api-badge.off{ color:var(--dim); border:1px solid var(--rule); background:rgba(244,238,223,0.04); }
  .ver-tag{ font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.08em;
    color:var(--dim); opacity:.6; margin-left:8px; }
  .io-box{ margin-top:20px; padding-top:16px; border-top:1px dashed var(--rule); }
  .io-title{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--dim); margin-bottom:8px; }
  .io-help{ font-size:12px; color:var(--dim); line-height:1.5; margin-bottom:12px; }
  .io-msg{ font-size:12px; color:var(--brass); margin-top:10px; text-align:center; min-height:16px; }

  /* menu inferior */
  .bottomnav{ position:fixed; left:0; right:0; bottom:0; z-index:40; height:var(--nav-h);
    display:flex; align-items:stretch; background:rgba(24,18,13,0.96); backdrop-filter:blur(16px) saturate(1.2);
    border-top:1px solid var(--rule); padding-bottom:env(safe-area-inset-bottom);
    transform:translateZ(0); -webkit-transform:translateZ(0); backface-visibility:hidden;
    contain:layout style; touch-action:manipulation;
    transition:transform .18s ease, opacity .18s ease; }
  /* No iOS, elemento fixo pode "flutuar" no meio da tela quando o teclado abre,
     porque o Safari mede errado o fundo real da tela nesse instante. Mais seguro
     do que brigar com isso: esconder o menu enquanto o campo de texto esta em foco. */
  body.campo-ativo .bottomnav{ transform:translateY(100%); opacity:0; pointer-events:none; }
  .nav-item{ position:relative; flex:1; background:none; border:none; padding:8px 4px 7px; cursor:pointer;
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; color:#8a8073;
    font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.07em; text-transform:uppercase;
    font-weight:400; transition:color .22s ease; -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
  .nav-item::before{ content:''; position:absolute; top:0; left:22%; right:22%; height:2px;
    background:var(--brass); border-radius:0 0 3px 3px; transform:scaleX(0); opacity:0;
    transition:transform .28s cubic-bezier(.3,1.2,.4,1), opacity .22s ease; }
  .nav-ico{ display:flex; align-items:center; justify-content:center; width:38px; height:32px;
    border-radius:11px; border:1px solid transparent; background:transparent;
    transition:background .22s ease, border-color .22s ease, transform .22s cubic-bezier(.3,1.3,.4,1), box-shadow .25s ease; }
  .nav-item svg{ width:20px; height:20px; stroke:currentColor; fill:none; stroke-width:1.6;
    stroke-linecap:round; stroke-linejoin:round; transition:stroke-width .22s ease; }

  @media (hover:hover){
    .nav-item:hover{ color:var(--parchment); }
    .nav-item:hover .nav-ico{ background:rgba(244,238,223,0.07); border-color:rgba(244,238,223,0.13); transform:translateY(-2px); }
    .nav-item.active:hover .nav-ico{ background:rgba(201,162,75,0.24); border-color:rgba(201,162,75,0.65); transform:translateY(-2px); }
  }
  .nav-item:active .nav-ico{ transform:scale(.9); }
  .nav-item:focus-visible{ outline:none; }
  .nav-item:focus-visible .nav-ico{ outline:2px solid var(--brass); outline-offset:2px; }

  .nav-item.active{ color:#ffdc95; font-weight:600; }
  .nav-item.active::before{ transform:scaleX(1); opacity:1; box-shadow:0 0 10px 1px rgba(201,162,75,.55); }
  .nav-item.active .nav-ico{ background:rgba(201,162,75,0.17); border-color:rgba(201,162,75,0.5);
    box-shadow:0 0 14px -2px rgba(201,162,75,.45), inset 0 0 10px -4px rgba(255,220,149,.6); }
  .nav-item.active svg{ stroke-width:1.95; }

  /* roda da lei de sete: 7 notas girando, os dois pontos criticos em vermelho */
  .spin7{ display:inline-block; vertical-align:middle; margin-right:9px; }
  .spin7 svg{ display:block; animation: gira7 2.8s linear infinite; }
  @keyframes gira7{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
  .loading-wrap{ display:flex; align-items:center; justify-content:center; gap:2px;
    font-family:'IBM Plex Mono',monospace; font-size:12.5px; color:var(--brass); padding:14px 0; }
  .loading-wrap .lbl::after{ content:''; animation:dots 1.2s steps(4,end) infinite; }

  .prog-wrap{ max-width:340px; margin:14px auto 0; }
  .prog-head{ display:flex; justify-content:space-between; align-items:baseline;
    font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:var(--dim); margin-bottom:6px; }
  .prog-head b{ color:var(--brass); font-size:12px; }
  .prog-track{ height:6px; background:rgba(244,238,223,0.08); border-radius:3px; overflow:hidden; }
  .prog-fill{ height:100%; border-radius:3px; width:0%;
    background:linear-gradient(90deg, var(--oxblood-br), var(--brass));
    transition:width .5s cubic-bezier(.3,1,.4,1); }
  .prog-nota{ font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--dim);
    text-align:center; margin-top:7px; min-height:14px; }

  ::selection{ background:var(--oxblood); color:var(--parchment); }
  @media (prefers-reduced-motion:reduce){
    #beam,.axis-fill,.nb-fill,.mod-fill,.enea-pt,#ringFg{ transition:none; }
    button{ transition:none; }
    #lemni,#ringShine,#ringHalo,.ring-pct,.ring-cell.charging::after{ animation:none !important; }
    .nav-ico,.nav-item,.nav-item::before,.nav-item svg{ transition:none; }
  }
</style>
</head>
<body>
<div class="paywall-overlay" id="paywallOverlay">
  <div class="paywall-card">
    <button class="paywall-close" id="paywallClose">✕</button>
    <div style="font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase;
      color:var(--ink); background:var(--brass); display:inline-block; padding:4px 10px; border-radius:20px; margin-bottom:14px;">2 meses de graça no anual</div>
    <div style="font-family:'Fraunces',serif; font-weight:600; font-size:22px; color:var(--parchment); margin-bottom:6px;">Resolva seus pontos fracos, evolua os fortes</div>
    <div style="font-size:13px; color:var(--dim); margin-bottom:18px;">Treine as leis universais todos os dias, com exercícios diários e as cinco leis do livro. O Eneagrama continua grátis, sempre.</div>
    <div style="font-family:'Fraunces',serif; font-weight:600; font-size:24px; color:var(--parchment);">R$377,70 <span style="font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim); font-weight:400;">/ano</span></div>
    <div style="font-size:11px; color:var(--dim); margin:4px 0 16px;">menos de R$31/mês, cobrado uma vez só</div>
    <a href="https://pay.kiwify.com.br/0gvPpju" target="_blank" class="btn-gold" style="display:block; text-align:center; padding:13px; border-radius:8px; text-decoration:none; margin-bottom:10px;">Assinar o ano →</a>
    <div style="font-size:11.5px; color:var(--dim);">Prefere mês a mês? <a href="https://pay.kiwify.com.br/cfcPgdx" target="_blank" style="color:var(--brass);">R$37,70/mês</a></div>
  </div>
</div>

<div class="install-banner" id="installBanner">
  <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9.2" stroke-width="1.1"/>
    <path d="M12 2.8 19.9 16.6 4.1 16.6z" stroke-width="1.1"/>
    <path d="M17.9 5.2 15.1 20.6 21 10.6 6.1 5.2 8.9 20.6 3 10.6Z" stroke-width="0.9"/>
  </svg>
  <div class="txt" id="installTxt"><b>Instale o app.</b> Fica na tela de início, abre sem navegador.</div>
  <button id="installBtn">Instalar</button>
  <button class="close" id="installClose">✕</button>
</div>
<div class="app">

  <!-- ============ TREINO ============ -->
  <section class="view active" id="viewTreino">
    <header>
      <div class="eyebrow">Raciocínio · Discernimento · Influência</div>
      <h1>Treino Diário</h1>
      <div style="margin-top:8px;"><span class="api-badge" id="apiBadge"></span><span class="ver-tag" id="verTag">v2.3</span></div>
    </header>

    <div class="lock-teaser" id="treinoLockBanner">
      <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="1.5" stroke-width="1.4"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke-width="1.4"/></svg>
      <div class="body">
        <b>Assine e treine no seu ponto exato, todos os dias</b>
        <p>Gera exercícios todo dia mirando exatamente o seu ponto mais fraco entre raciocínio, discernimento e influência, a partir do seu próprio diagnóstico. Não é genérico.</p>
        <button id="treinoLockBtn">Ver planos →</button>
      </div>
    </div>

    <div class="topbar">
      <div class="topbar-inner">
        <div class="ring-cell">
          <svg class="ring-svg" id="ringSvg" width="74" height="40" viewBox="-6 -6 212 112">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--oxblood-br)"/><stop offset="100%" stop-color="var(--brass)"/>
              </linearGradient>
              <filter id="ringGlow" x="-40%" y="-60%" width="180%" height="220%">
                <feGaussianBlur stdDeviation="3.2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <g id="lemni">
              <path class="lem" d="M100,50 C70,10 30,10 30,50 C30,90 70,90 100,50 C130,90 170,90 170,50 C170,10 130,10 100,50 Z"
                fill="none" stroke="rgba(244,238,223,0.09)" stroke-width="9" stroke-linecap="round"/>
              <path id="ringHalo" d="M100,50 C70,10 30,10 30,50 C30,90 70,90 100,50 C130,90 170,90 170,50 C170,10 130,10 100,50 Z"
                fill="none" stroke="url(#ringGrad)" stroke-width="9" stroke-linecap="round" filter="url(#ringGlow)"/>
              <path id="ringFg" d="M100,50 C70,10 30,10 30,50 C30,90 70,90 100,50 C130,90 170,90 170,50 C170,10 130,10 100,50 Z"
                fill="none" stroke="url(#ringGrad)" stroke-width="9" stroke-linecap="round"/>
              <path id="ringShine" d="M100,50 C70,10 30,10 30,50 C30,90 70,90 100,50 C130,90 170,90 170,50 C170,10 130,10 100,50 Z"
                fill="none" stroke="rgba(255,244,214,0.95)" stroke-width="9" stroke-linecap="round"/>
            </g>
          </svg>
          <div class="ring-pct" id="ringPct">0%</div>
          <div class="ring-sub"><span id="dashPerfect">0</span> ciclos</div>
        </div>
        <div class="metrics">
          <div class="metric"><span class="m-label">Hoje</span><span class="m-val gold" id="dashToday">0</span><span class="m-sub" id="dashTodaySub">—</span></div>
          <div class="metric"><span class="m-label">Total</span><span class="m-val" id="dashTotal">0</span><span class="m-sub" id="dashTotalSub">0 rodadas</span></div>
          <div class="metric"><span class="m-label">Sequência</span><span class="m-val blood" id="dashStreak">0</span><span class="m-sub" id="dashStreakSub">dias</span></div>
          <div class="metric"><span class="m-label">Média</span><span class="m-val" id="dashAvg">—</span><span class="m-sub">de 7</span></div>
          <div class="metric"><span class="m-label">Resolvidos</span><span class="m-val gold" id="dashSolved">0</span><span class="m-sub" id="dashSolvedSub">de 14</span></div>
        </div>
      </div>
    </div>
    <div class="banner" id="dashBanner">Comece o primeiro exercício do dia para abrir o placar.</div>

    <div class="card hero" id="exerciseCard">
      <div class="meta-row">
        <span class="badge" id="categoryBadge">Raciocínio</span>
        <span class="meta-right" id="metaRight">—</span>
      </div>
      <div class="adapt-note" id="adaptNote" style="display:none;"></div>
      <p class="prompt" id="promptText">Carregando...</p>
      <div class="timer" id="timerDisplay">00:00.0</div>
      <textarea id="answerInput" placeholder="Escreva sua resposta aqui. Clique em Iniciar antes de começar." disabled></textarea>
      <div class="choice-row" id="choiceRow" style="display:none;"></div>
      <div class="btn-row">
        <button class="btn-primary" id="startBtn">Iniciar</button>
        <button class="btn-ghost" id="skipBtn">Trocar</button>
      </div>
      <div id="loadingBlock" class="loading-wrap" style="display:none;"><span class="spin7" id="spinAval"></span><span class="lbl">Avaliando</span></div>

      <div class="session-done" id="sessionDone" style="display:none;">
        <div class="sd-glyph">∞</div>
        <h3 id="sdTitle">Você respondeu todas desta vez</h3>
        <p id="sdText"></p>
        <div class="btn-row">
          <button class="btn-gold" id="sdContinue">Continuar agora</button>
          <button class="btn-ghost" id="sdRest">Esperar a próxima sessão</button>
        </div>
        <div id="sdLoading" style="display:none;">
          <div class="loading-wrap"><span class="spin7" id="spinLote"></span><span class="lbl">Preparando questões novas</span></div>
          <div class="prog-wrap">
            <div class="prog-head"><span>progresso</span><span><b id="progFeito">0</b> de <span id="progTotal">18</span></span></div>
            <div class="prog-track"><div class="prog-fill" id="progFill"></div></div>
            <div class="prog-nota" id="progNota"></div>
          </div>
        </div>
        <div id="sdAviso" class="sd-aviso" style="display:none;"></div>
        <div class="btn-row" id="sdRevisarRow" style="display:none; margin-top:12px;">
          <button class="btn-ghost" id="sdRevisar">Revisar exercícios já resolvidos</button>
        </div>
      </div>

      <div class="result" id="resultSection" style="display:none;">
        <div id="errorNote"></div>
        <div class="result-head">
          <span id="verdictBlock"></span>
          <div class="mini-scale">
            <svg width="112" height="56" viewBox="0 0 200 100">
              <line x1="100" y1="10" x2="100" y2="40" stroke="var(--brass-dim)" stroke-width="4"/>
              <g id="beam">
                <line x1="20" y1="40" x2="180" y2="40" stroke="var(--brass)" stroke-width="4"/>
                <line x1="20" y1="40" x2="20" y2="58" stroke="var(--brass-dim)" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="58" stroke="var(--brass-dim)" stroke-width="3"/>
                <path d="M 5 58 Q 20 76 35 58 Z" fill="none" stroke="var(--oxblood-br)" stroke-width="3.5"/>
                <path d="M 165 58 Q 180 76 195 58 Z" fill="none" stroke="var(--brass)" stroke-width="3.5"/>
              </g>
              <polygon points="88,88 112,88 100,99" fill="var(--brass-dim)"/>
            </svg>
            <span class="mini-nota"><b id="notaValue">—</b>/7</span>
          </div>
        </div>
        <p class="feedback-text" id="feedbackText"></p>
        <p class="scale-caption" id="scaleCaption"></p>
        <h4 style="margin-top:14px;">Resposta / critério</h4>
        <p class="answer-text" id="answerText"></p>
        <div id="fallbackRate" style="display:none;">
          <div class="rate-label">Não consegui avaliar automaticamente. Como você chegou nessa resposta?</div>
          <div class="rate-row">
            <button class="rate-option" data-band="4"><strong>Com convicção</strong> — direto, sem "acho que", e bateu com o critério.</button>
            <button class="rate-option" data-band="3"><strong>Hesitando</strong> — cheguei lá, mas testando e mudando de ideia.</button>
            <button class="rate-option" data-band="0"><strong>Errei</strong> — ou não fechei, mesmo tentando.</button>
          </div>
        </div>
        <div class="btn-row" id="treinoNextRow" style="margin-top:16px; display:none;">
          <button class="btn-gold" id="treinoNext">Próximo exercício</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ LEIS ============ -->
  <section class="view" id="viewLeis">
    <header>
      <div class="eyebrow">Gurdjieff · As leis fundamentais</div>
      <h1>Domine os 3 Poderes</h1>
      <div class="sub-h">As leis que governam fenômenos, processos e resultados</div>
    </header>

    <div class="lock-teaser" id="leisLockBanner">
      <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="1.5" stroke-width="1.4"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke-width="1.4"/></svg>
      <div class="body">
        <b>Assine e domine as leis universais</b>
        <p>Os cinco pilares do livro completos: Lei de Três, Lei da Oitava, Lei do Retorno, os Três Centros, e os Quatro Estados de consciência.</p>
        <button id="leisLockBtn">Ver planos →</button>
      </div>
    </div>

    <div id="leisIndex">
      <div class="banner" id="leisBanner">Cinco módulos. Estude o resumo, depois responda. O que você acerta sai da lista.</div>
      <div class="mod-list" id="modList"></div>
    </div>

    <div id="leisModulo" style="display:none;">
      <button class="back-link" id="leisBack">← voltar aos módulos</button>
      <div class="card hero">
        <div class="meta-row">
          <span class="badge raciocinio" id="modBadge">Lei de Três</span>
          <span class="meta-right" id="modMeta">—</span>
        </div>
        <p class="resumo" id="modResumo"></p>
        <p class="prompt" id="modPrompt"></p>
        <textarea id="modInput" placeholder="Escreva sua resposta aqui."></textarea>
        <div class="choice-row" id="modChoices" style="display:none;"></div>
        <div class="btn-row">
          <button class="btn-primary" id="modSubmit">Responder</button>
          <button class="btn-ghost" id="modSkip">Pular</button>
        </div>
        <div id="modLoading" class="loading-wrap" style="display:none;"><span class="spin7" id="spinMod"></span><span class="lbl">Avaliando</span></div>
        <div class="result" id="modResult" style="display:none;">
          <div id="modVerdict"></div>
          <p class="feedback-text" id="modFeedback"></p>
          <h4>Resposta / critério</h4>
          <p class="answer-text" id="modAnswer"></p>
          <div id="modFallback" style="display:none;">
            <div class="rate-label">Avalie você mesmo: você acertou o critério?</div>
            <div class="rate-row">
              <button class="rate-option" data-mod="1"><strong>Acertei</strong> — bateu com o critério.</button>
              <button class="rate-option" data-mod="0"><strong>Não acertei</strong> — ficou fora.</button>
            </div>
          </div>
          <div class="btn-row" id="modNextRow" style="margin-top:14px;">
            <button class="btn-gold" id="modNext">Próximo</button>
          </div>
        </div>
      </div>
    </div>

    <div id="leisDone" style="display:none;">
      <button class="back-link" id="leisBack2">← voltar aos módulos</button>
      <div class="card">
        <div class="session-done">
          <div class="sd-glyph" id="doneGlifo">△</div>
          <h3>Módulo concluído</h3>
          <p id="doneText"></p>
          <div class="btn-row">
        <button class="btn-gold" id="doneGerar">Gerar questões novas deste módulo</button>
        <button class="btn-ghost" id="doneBack">Voltar aos módulos</button>
      </div>
      <div id="doneLoading" class="loading-wrap" style="display:none;"><span class="spin7" id="spinDone"></span><span class="lbl">Criando questões inéditas</span></div>
      <div id="doneAviso" class="sd-aviso" style="display:none;"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ ENEAGRAMA ============ -->
  <section class="view" id="viewEnea">
    <header>
      <div class="eyebrow">Eneagrama de Gurdjieff</div>
      <h1>Teste do Eneagrama</h1>
      <div class="sub-h">Seu centro predominante e onde sua oitava quebra</div>
    </header>

    <div id="eneaIntro">
      <div class="card">
        <p class="resumo" style="margin-bottom:18px;">Este não é o eneagrama de personalidade dos nove tipos. É o de Gurdjieff: três forças e sete etapas. A primeira parte encontra qual dos seus três centros comanda. A segunda encontra em que nota da oitava o seu processo costuma quebrar. Dezesseis perguntas, uns quatro minutos.</p>
        <div class="btn-row"><button class="btn-primary" id="eneaStart">Começar o teste</button></div>
        <div id="eneaPrevWrap" style="display:none; margin-top:16px; text-align:center;">
          <button class="btn-ghost" id="eneaSeePrev">Ver meu último resultado</button>
        </div>
      </div>
    </div>

    <div id="eneaQuiz" style="display:none;">
      <div class="card hero">
        <div class="prog-dots" id="eneaDots"></div>
        <div class="meta-row">
          <span class="badge influencia" id="eneaPart">Parte 1 · Os três centros</span>
          <span class="meta-right" id="eneaCount">1 de 16</span>
        </div>
        <p class="prompt" id="eneaQ">—</p>
        <div class="choice-row" id="eneaOpts"></div>
        <div class="scale-opts" id="eneaScale" style="display:none;"></div>
      </div>
    </div>

    <div id="eneaResult" style="display:none;">
      <div class="card">
        <div class="enea-wrap"><svg id="eneaSvg" width="260" height="260" viewBox="0 0 220 220"></svg></div>
        <div class="res-block">
          <div class="res-kicker" id="resQuando">Centro predominante</div>
          <div class="res-big" id="resCentro">—</div>
        </div>

        <div id="eneaGate" class="gate-card" style="display:none;">
          <p class="gate-lead">Sua ficha completa está pronta: a origem da quebra, o cruzamento com os três centros e o que fazer a partir disso. Informe seu email pra liberar agora e receber tudo em PDF.</p>
          <div class="gate-row">
            <input type="text" id="gateNome" placeholder="Seu nome" autocomplete="name">
            <input type="email" id="gateEmail" placeholder="Seu melhor email" autocomplete="email">
          </div>
          <button class="btn-gold" id="gateSubmit" style="width:100%;">Liberar minha análise completa</button>
          <div id="gateMsg" class="sd-aviso" style="display:none; margin-top:12px;"></div>
          <p class="gate-fine">Sem spam. Só o relatório, e o que vier depois sobre o treino.</p>
        </div>

        <div id="eneaEnviado" class="gate-ok" style="display:none;">
          <span id="eneaEnviadoTxt"></span>
        </div>

        <div id="eneaLocked" style="display:none;">

        <div class="anam">
          <h4>Ficha do centro</h4>
          <dl class="ficha" id="fichaCentro"></dl>
          <div class="ficha-glossario">
            <b>O que significa cada campo:</b> Função é o que esse centro faz por você. Alimento é o que ele processa pra funcionar bem. Sede de comando é onde ele fica baseado no corpo. Densidade vem da cosmologia do livro, um número que mede o quão sutil é a matéria que esse centro usa, quanto menor o número, mais fino; "material solar" significa que ele opera numa matéria tão fina quanto a do próprio Sol, nesse sistema. Êxito é o resultado que ele entrega quando funciona bem. Desempenho é a qualidade que ele desenvolve com o uso. Maior revelação é o insight mais alto que ele pode te dar.
          </div>
          <p class="lead" id="anamCentro"></p>
          <p id="anamCentroLim"></p>
          <div class="bloco sintoma"><div class="rot">Risco deste perfil</div><p id="anamCentroRisco"></p></div>
          <h4 style="margin-top:22px;">Distribuição dos três centros</h4>
          <div class="cbars" id="centroBars"></div>
          <p id="anamCentroDist"></p>
        </div>

        <div class="anam">
          <h4>Onde a oitava quebra</h4>
          <div class="res-big" id="resNota" style="text-align:left; margin-bottom:10px;">—</div>
          <p class="lead" id="anamNotaFuncao"></p>
          <div class="bloco sintoma"><div class="rot">Como isso aparece em você</div><p id="anamNotaQuebra"></p></div>
          <div class="bloco origem"><div class="rot">Origem provável</div><p id="anamNotaOrigem"></p></div>
          <div class="bloco correcao"><div class="rot">Correção</div><p id="anamNotaCorrecao"></p></div>
          <p id="anamCritico"></p>
        </div>

        <div class="anam">
          <h4>Perfil das sete notas</h4>
          <div class="note-bars" id="noteBars"></div>
          <p id="anamTrecho" style="margin-top:14px;"></p>
        </div>

        <div class="anam">
          <h4>Cruzamento: centro e trecho</h4>
          <p id="anamCruz"></p>
        </div>

        <div class="anam" id="anamHistWrap" style="display:none;">
          <h4>Testes anteriores</h4>
          <div class="hist-list" id="eneaHistList"></div>
          <p class="evo" id="eneaEvo" style="display:none;"></p>
        </div>

        <div class="anam">
          <h4>O que é o choque consciente</h4>
          <p>Na escala musical faltam os semitons em dois lugares: entre mi e fá, e entre si e dó. Não é escolha de ninguém, é o espectro disponível na natureza. Nesses dois intervalos o processo perde o apoio que tinha nos outros e tende a desviar do rumo original, e o livro é claro que isso acontece por vontade da lei, não por falha de caráter.</p>
          <p><strong>Choque consciente é a intervenção que se aplica exatamente ali.</strong> Gurdjieff o definia como uma adição de energia extra, feita de propósito e fora do automático, para compensar essa tendência natural de desvio. Três coisas o distinguem de simplesmente se esforçar mais: ele é <strong>deliberado</strong>, ou seja, você sabe que está aplicando; é <strong>localizado</strong>, entra no ponto crítico e não espalhado pelo processo inteiro; e é <strong>extra</strong>, acima do que o processo pediria em condição normal.</p>
          <p>Na prática, muda de forma conforme o ponto. No primeiro ponto crítico, entre mi e fá, o esforço é de pensamento: exigir de si mais alternativas antes de permitir a decisão, quando a pressa e o relógio pedem o contrário. No segundo, entre si e dó, o esforço é de fechamento: nomear o próximo passo, o responsável e a data, quando a sensação é de que o trabalho já acabou. Sem o choque, o desvio nesses pontos não é acidente, é o comportamento padrão.</p>
        </div>

        <div class="btn-row" style="margin-top:26px;">
          <button class="btn-gold" id="eneaPdf">Baixar PDF da análise</button>
        </div>
        <div id="eneaPdfMsg" class="sd-aviso" style="display:none; margin-top:12px;"></div>

        <div class="card" style="margin-top:26px; border-color:var(--brass-dim);">
          <div style="text-align:center; margin-bottom:16px;">
            <div style="font-family:'Fraunces',serif; font-weight:600; font-size:19px; color:var(--parchment); margin-bottom:6px;">O treino que mira o seu ponto exato</div>
            <div style="font-size:12.5px; color:var(--dim); line-height:1.5;" id="pvPersonalTxt">O treino diário trabalha exatamente onde você trava, todo dia.</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="border:1px solid var(--rule); border-radius:8px; padding:14px 10px; text-align:center;">
              <div style="font-family:'IBM Plex Mono',monospace; font-size:9.5px; color:var(--dim); text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px;">Mensal</div>
              <div style="font-family:'Fraunces',serif; font-weight:600; font-size:19px; color:var(--parchment);">R$37,70</div>
              <div style="font-size:10px; color:var(--dim); margin-bottom:10px;">por mês</div>
              <a href="https://pay.kiwify.com.br/cfcPgdx" style="display:block; text-align:center; padding:9px; border-radius:7px; border:1px solid var(--brass-dim); color:var(--brass); text-decoration:none; font-size:12px; font-weight:600;">Assinar →</a>
            </div>
            <div style="border:1.5px solid var(--brass); border-radius:8px; padding:14px 10px; text-align:center; position:relative; background:rgba(201,162,75,0.06);">
              <div style="position:absolute; top:-9px; left:50%; transform:translateX(-50%); background:var(--brass); color:var(--ink); font-family:'IBM Plex Mono',monospace; font-size:8px; text-transform:uppercase; letter-spacing:.05em; padding:2px 8px; border-radius:10px; white-space:nowrap;">2 meses grátis</div>
              <div style="font-family:'IBM Plex Mono',monospace; font-size:9.5px; color:var(--brass); text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; margin-top:4px;">Anual</div>
              <div style="font-family:'Fraunces',serif; font-weight:600; font-size:19px; color:var(--parchment);">R$377,70</div>
              <div style="font-size:10px; color:var(--dim); margin-bottom:10px;">menos de R$31/mês</div>
              <a href="https://pay.kiwify.com.br/0gvPpju" class="btn-gold" style="display:block; text-align:center; padding:9px; border-radius:7px; text-decoration:none; font-size:12px; font-weight:600;">Assinar →</a>
            </div>
          </div>
        </div>

        </div>

        <div class="btn-row" style="margin-top:18px;">
          <button class="btn-ghost" id="eneaRedo">Refazer o teste</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ PERFORMANCE ============ -->
  <section class="view" id="viewPerf">
    <header>
      <div class="eyebrow">Visão consolidada</div>
      <h1>Performance</h1>
      <div class="sub-h">Onde você está forte e o que precisa melhorar</div>
    </header>

    <div class="card">
      <div class="card-title">Panorama</div>
      <div class="metrics" style="border:1px solid var(--rule); border-radius:8px; overflow:hidden; grid-template-columns:repeat(4,1fr);">
        <div class="metric"><span class="m-label">Treino</span><span class="m-val gold" id="pfTreino">0</span><span class="m-sub">pontos</span></div>
        <div class="metric"><span class="m-label">Leis</span><span class="m-val" id="pfLeis">0</span><span class="m-sub" id="pfLeisSub">de 30</span></div>
        <div class="metric"><span class="m-label">Sequência</span><span class="m-val blood" id="pfStreak">0</span><span class="m-sub">dias</span></div>
        <div class="metric"><span class="m-label">Eneagrama</span><span class="m-val" id="pfEnea" style="font-size:14px;">—</span><span class="m-sub" id="pfEneaSub">não feito</span></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Pontos a melhorar</div>
      <ul class="melhora-list" id="melhoraList"><li>Responda alguns exercícios para eu mapear seus pontos fracos.</li></ul>
    </div>

    <div class="card">
      <div class="card-title">Os três eixos</div>
      <div id="axisBars"><div class="empty-state">Sem dados ainda.</div></div>
      <div class="diag-msg" id="diagMsg" style="display:none;"></div>
    </div>

    <div class="card">
      <div class="card-title">Detalhe</div>
      <div class="btn-row" style="margin-bottom:16px;">
        <button class="tab-btn active" data-pane="Rank">Ranking</button>
        <button class="tab-btn" data-pane="Hist">Histórico</button>
        <button class="tab-btn" data-pane="Io">Backup</button>
      </div>
      <div class="pane active" id="paneRank">
        <div class="btn-row" style="margin-bottom:14px;">
          <button class="tab-btn active" id="tabSessao">Por sessão</button>
          <button class="tab-btn" id="tabDia">Por dia</button>
        </div>
        <div id="rankingWrap"><div class="empty-state">Ainda sem sessões pra ranquear.</div></div>
        <div class="axis-note">Posições 3, 6 e 9 vêm em dourado, o eixo de controle por trás do ciclo 1-2-4-8-7-5.</div>
      </div>
      <div class="pane" id="paneHist">
        <div id="historyWrap"><div class="empty-state">Nenhum registro ainda.</div></div>
        <div class="diag-msg" id="trendMsg" style="display:none;"></div>
      </div>
      <div class="pane" id="paneIo">
        <div class="io-help">Todo o seu progresso fica salvo neste navegador. Se limpar os dados do site ou trocar de aparelho, ele se perde. Exporte de vez em quando.</div>
        <div class="btn-row">
          <button class="btn-ghost" id="btnExport">Exportar</button>
          <button class="btn-ghost" id="btnImport">Importar</button>
          <input type="file" id="fileImport" accept="application/json" style="display:none;">
        </div>
        <div class="io-msg" id="ioMsg"></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Exercício sob medida</div>
      <div class="io-help" style="margin-bottom:14px;">Gera uma questão nova mirando o eixo em que você está mais fraco, evitando os temas que já apareceram.</div>
      <div class="btn-row"><button class="btn-gold" id="genBtn">Gerar exercício no meu ponto fraco</button></div>
      <div id="genLoading" class="loading-wrap" style="display:none;"><span class="spin7" id="spinGen"></span><span class="lbl">Criando exercício sob medida</span></div>
    </div>
  </section>

</div>

<nav class="bottomnav">
  <button class="nav-item active" data-view="Treino">
    <span class="nav-ico"><svg viewBox="0 0 24 24"><rect x="5" y="9.5" width="14" height="10.5" rx="4"/><path d="M8.2 9.5V8a1.5 1.5 0 0 1 3 0v1.5"/><path d="M11.2 9.5V7a1.5 1.5 0 0 1 3 0v2.5"/><path d="M14.2 9.5V8.2a1.5 1.5 0 0 1 3 0v1.3"/><path d="M5 14.2h5.5"/></svg></span>
    Treino
  </button>
  <button class="nav-item" data-view="Leis">
    <span class="nav-ico"><svg viewBox="0 0 24 24"><path d="M7 3.5h10l4 5.5-9 11.5L3 9z"/><path d="M3 9h18"/><path d="M12 20.5 8.6 9l1.6-5.5"/><path d="M12 20.5 15.4 9l-1.6-5.5"/></svg></span>
    Leis
  </button>
  <button class="nav-item" data-view="Enea">
    <span class="nav-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2"/><path d="M12 2.8 19.9 16.6 4.1 16.6z" stroke-width="1.1"/><path d="M17.9 5.2 15.1 20.6 21 10.6 6.1 5.2 8.9 20.6 3 10.6Z" stroke-width="0.9"/></svg></span>
    Eneagrama
  </button>
  <button class="nav-item" data-view="Perf">
    <span class="nav-ico"><svg viewBox="0 0 24 24"><path d="M4 19V10"/><path d="M10 19V5"/><path d="M16 19v-6"/><path d="M22 19H2"/></svg></span>
    Performance
  </button>
</nav>

<script>
/* ===== Banco do Treino Diário ===== */
const EXERCISES = [
  { id:'livro-1-tijolo', cat:'raciocinio', catLabel:'Raciocínio', type:'livre', fonte:'Livro · 1º',
    concept:'álgebra simples escondida em enunciado cotidiano',
    prompt:'Num prato da balança, um tijolo inteiro. No outro, meio tijolo mais um peso de 1kg. A balança fica nivelada. Quanto pesa o tijolo inteiro?',
    answer:'2 kg. Se o tijolo inteiro equilibra com meio tijolo mais 1kg, meio tijolo pesa 1kg, logo o inteiro pesa 2kg.' },
  { id:'livro-2-prateleiras', cat:'raciocinio', catLabel:'Raciocínio', type:'livre', fonte:'Livro · 2º',
    concept:'extrair informação máxima de uma única medição',
    prompt:'Onze prateleiras, dez bolas iguais em cada. Todas de 1kg, exceto as de uma prateleira, que pesam 900g. Com UMA única pesagem, como descobrir qual é?',
    answer:'Pegue 1 bola da prateleira 1, 2 da prateleira 2, e assim até 10 da prateleira 10, nenhuma da 11. Pese as 55 juntas. O quanto faltar para 55kg, em múltiplos de 100g, aponta a prateleira. Se der 55kg cravado, é a 11.' },
  { id:'livro-3-vinho', cat:'raciocinio', catLabel:'Raciocínio', type:'multipla', fonte:'Livro · 3º',
    concept:'simetria de troca entre dois conjuntos',
    prompt:'Uma colher de vinho vai para a água e mistura. A mesma colher, cheia da mistura, volta para o vinho. Há mais vinho na água ou mais água no vinho?',
    options:['Mais vinho na água','Mais água no vinho','São iguais'], correctIndex:2,
    answer:'São iguais. Cada copo termina com o volume do começo, então o que falta de um líquido foi substituído pelo mesmo volume do outro. É a analogia das duas cidades trocando quarenta passageiros.' },
  { id:'livro-4-populacao', cat:'discernimento', catLabel:'Discernimento', type:'multipla', fonte:'Livro · 4º',
    concept:'noção de grandeza pelo sentimento',
    prompt:'Sem calcular, pelo sentimento: toda a população do mundo reunida numa só aglomeração, a 4 pessoas por metro quadrado, ocuparia que área?',
    options:['A Grande Belo Horizonte, cerca de 40 por 40 km','Todo o estado do Amazonas','Metade do território brasileiro'], correctIndex:0,
    answer:'A Grande Belo Horizonte, uns 40 por 40 km. São 1,6 bilhão de metros quadrados, e a 4 por metro cabem 6,4 bilhões. O ponto do livro é o nosso sentimento exagerado de escassez.' },
  { id:'livro-5-triade', cat:'influencia', catLabel:'Influência', type:'multipla', fonte:'Livro · 5º',
    concept:'domínio da tríade Mente, Emoção, Corpo',
    prompt:'Na tabela das tríades: Inteligência para a Mente, Coragem para a Emoção, e para o Corpo?',
    options:['Disciplina','Liberdade','Resistência'], correctIndex:1,
    answer:'Liberdade. A tríade é Inteligência, Coragem, Liberdade. Assim como Visão, Paixão, Ação. E Pensamento, Sentimento, Movimento.' },
  { id:'livro-6-polar', cat:'raciocinio', catLabel:'Raciocínio', type:'multipla', fonte:'Livro · 6º',
    concept:'geometria celeste e imaginação espacial',
    prompt:'Você está na Latitude Zero, na linha do Equador. A que altura no céu verá a Estrela Polar?',
    options:['Na vertical, acima da cabeça','A meia altura do céu','No horizonte'], correctIndex:2,
    answer:'No horizonte. A altura da Polar no céu é igual à sua latitude. No Equador, latitude zero, ela aparece rente ao horizonte norte.' },
  { id:'livro-7-lua', cat:'raciocinio', catLabel:'Raciocínio', type:'multipla', fonte:'Livro · 7º',
    concept:'posição relativa e fases da lua',
    prompt:'Você vê a Terra à sua frente, o Sol à esquerda e Vênus à direita. É inverno no hemisfério sul e a Lua está em quarto minguante. Onde está a Lua?',
    options:['À esquerda da Terra','À direita da Terra','À sua frente, entre você e a Terra'], correctIndex:2,
    answer:'À sua frente, entre você e a Terra. A fase depende da posição relativa entre Sol, Terra e Lua, e essa combinação a coloca nesse ponto.' },
  { id:'livro-8-tabuleiro', cat:'discernimento', catLabel:'Discernimento', type:'multipla', fonte:'Livro · 8º',
    concept:'crescimento exponencial e falência por falta de noção de grandeza',
    prompt:'Um grão de trigo na primeira casa do tabuleiro, dobrando e acumulando até a casa 64. Quantos grãos no total?',
    options:['Cerca de mil','Cerca de um bilhão','Mais de 18 quintilhões'], correctIndex:2,
    answer:'Mais de 18 quintilhões. Só na casa 40 já passa de um trilhão. O rei aceitou e faliu em menos de trinta segundos, por falta de noção de grandeza.' },
  { id:'livro-mago', cat:'discernimento', catLabel:'Discernimento', type:'livre', fonte:'Livro · Gurdjieff',
    concept:'reconhecer condicionamento e hipnose social',
    prompt:'No conto do Mago e seu Rebanho, os carneiros são hipnotizados a se acharem leões e magos, e passam a esperar o abate com calma. Qual a lição prática disso na sua vida profissional hoje?',
    answer:'Critério: reconhecer que a hipnose funciona porque dá uma identidade lisonjeira que substitui a percepção do próprio interesse. Aplicação: notar quando um título, elogio ou discurso de propósito serve para você aceitar algo que não te serve. Resposta forte nomeia uma situação concreta.' },
  { id:'interruptores', cat:'discernimento', catLabel:'Discernimento', type:'livre', fonte:'Clássico',
    concept:'usar variável não óbvia para multiplicar informação',
    prompt:'Três interruptores fora de uma sala fechada. Um acende a lâmpada lá dentro. Você só pode entrar uma vez. Como descobrir qual é?',
    answer:'Ligue o 1, espere alguns minutos, desligue e ligue o 2. Entre: acesa é o 2, apagada e quente é o 1, apagada e fria é o 3. A informação extra vem do calor.' },
  { id:'decisao-parcial', cat:'discernimento', catLabel:'Discernimento', type:'livre', fonte:'Aplicado',
    concept:'critério de decisão sob informação incompleta',
    prompt:'Informação importante mas incompleta, apontando forte numa direção sem ser prova. Você precisa decidir hoje. Qual o critério: esperar mais dado ou agir?',
    answer:'Critério: o custo de esperar é maior que o custo de errar com o dado atual? Se sim, decida agora. Discernimento é decidir com informação suficiente, não perfeita.' },
  { id:'sintese-pitch', cat:'influencia', catLabel:'Influência', type:'livre', fonte:'Aplicado',
    concept:'síntese persuasiva com gancho na frente',
    prompt:'Em até 30 palavras: por que uma marca deveria investir num evento pontual em vez de mídia tradicional? Sem "acho que". Direto.',
    answer:'Critério: começou pela conclusão, sem amaciamento, em torno de 30 palavras. O conteúdo é livre, a estrutura é o que vale.' },
  { id:'objecao-rapida', cat:'influencia', catLabel:'Influência', type:'livre', fonte:'Aplicado',
    concept:'sustentar posição sob pressão hierárquica',
    prompt:'Alguém de hierarquia acima discorda da sua proposta na frente de todos. Em uma frase, sem justificar demais, como você responde mantendo a posição?',
    answer:'Critério: afirma a posição, dá um motivo objetivo, não pede desculpa por discordar. Frase longa aqui é insegurança disfarçada de educação.' },
  { id:'abertura-reuniao', cat:'influencia', catLabel:'Influência', type:'multipla', fonte:'Aplicado',
    concept:'ordem de abertura que gera influência',
    prompt:'Qual abertura gera mais influência numa negociação tensa?',
    options:['Contexto detalhado primeiro, conclusão no final','Conclusão direta primeiro, sustentação depois','Agradecimentos e elogios, depois o assunto'], correctIndex:1,
    answer:'Conclusão primeiro, sustentação depois. Gancho antes de contexto. Se a pessoa só ouvir a primeira frase, já precisa saber sua posição.' }
];

/* ===== Módulos das Leis ===== */
const MODULOS = [
  {
    id:'lei-tres', nome:'A Lei de Três', sub:'Governa os fenômenos', glifo:'△',
    contexto:'A Lei de Três de Gurdjieff: todo fenomeno se decompoe em forca positiva (sutil, energia), negativa (densa, materia) e conciliadora (a chave, onde mora a complexidade). Exercicios identificam as tres forcas em fenomenos variados e aplicam a triade a situacoes reais de negocio e vida.',
    resumo:'Todo fenômeno se decompõe em três forças: a positiva (sutil, pura energia), a negativa (densa, pura matéria) e a conciliadora, que harmoniza as duas. Nenhum fenômeno vem à existência sem a participação solene das três. A força conciliadora é sempre a chave: é nela que mora a complexidade e a solução.',
    itens:[
      { f:'Livro', type:'multipla', prompt:'Concreto = cimento + água + agregados. Qual é a força conciliadora?', options:['Cimento','Água','Agregados'], correctIndex:1,
        answer:'A água. O cimento é a força positiva, os agregados a negativa, e a água concilia as duas num campo de harmonia.' },
      { f:'Livro', type:'multipla', prompt:'Na tríade Produção, Distribuição e Consumo, onde mora a complexidade real?', options:['Na produção','Na distribuição','No consumo'], correctIndex:1,
        answer:'Na distribuição, a força conciliadora. Produzir e consumir é simples. Toda a complexidade está no meio.' },
      { f:'Livro', type:'multipla', prompt:'Governo = Executivo, Judiciário e Legislativo. Qual é a conciliadora?', options:['Executivo','Judiciário','Legislativo'], correctIndex:1,
        answer:'O Judiciário. Assim como na tríade da disputa, tudo depende do juiz.' },
      { f:'Livro', type:'multipla', prompt:'Ser humano = Mente, Emoção e Corpo. Qual é a força conciliadora?', options:['A mente','A emoção','O corpo'], correctIndex:1,
        answer:'A emoção. Por isso o "mente sã em corpo são" é tratado no livro como crime contra a humanidade: apaga justamente a força do meio.' },
      { f:'Livro', type:'multipla', prompt:'Para extinguir o fogo, que é combustível + oxigênio + calor, o que se faz?', options:['Aumentar um dos três','Eliminar um dos três','Equilibrar os três'], correctIndex:1,
        answer:'Eliminar um dos três. Abafar remove o oxigênio e o fenômeno deixa de existir. Nenhum fenômeno sobrevive sem as três forças.' },
      { f:'Livro', type:'multipla', prompt:'Toda tecnologia tem três forças. Quais são?', options:['Objetivo, estratégia e técnica','Ideia, dinheiro e execução','Pessoa, processo e ferramenta'], correctIndex:0,
        answer:'Objetivo (o quê e por quê), estratégia (como e quando) e técnica (com quê e onde). Todo profissional vende um saber, e todo saber é um evento tecnológico.' },
      { f:'Livro', type:'multipla', prompt:'No átomo, quais são as três forças?', options:['Núcleo, campo eletromagnético e elétrons','Prótons, nêutrons e elétrons','Massa, carga e órbita'], correctIndex:0,
        answer:'Núcleo (positiva), campo eletromagnético (conciliadora) e elétrons (negativa). O campo é o que sustenta a relação entre os outros dois.' },
      { f:'Livro', type:'multipla', prompt:'No Sistema Solar, qual elemento ocupa a posição conciliadora?', options:['O Sol','O sistema planetário','Cada um dos planetas'], correctIndex:1,
        answer:'O sistema planetário. O Sol é a força positiva, os planetas individualmente são a negativa, e o sistema como organização é o que concilia.' },
      { f:'Livro', type:'multipla', prompt:'Na tríade da família, quem ocupa a posição conciliadora?', options:['O pai','O filho','A mãe'], correctIndex:1,
        answer:'O filho. E o livro observa: a maior parte dos problemas do casal costuma passar por ali. Num casal sem filhos, a conciliação vem do amor, de um sonho em comum ou da convivência.' },
      { f:'Livro', type:'multipla', prompt:'O menino da história dizia saber fazer três coisas: pensar, esperar e jejuar. Qual delas é a conciliadora?', options:['Pensar','Esperar','Jejuar'], correctIndex:1,
        answer:'Esperar, que corresponde ao centro emocional. Pensar é o mental, jejuar é o corporal. E foi essa capacidade que garantiu ao menino trabalho, família e prosperidade.' },
      { f:'Aplicado', type:'multipla', prompt:'Numa venda, considerando produto, vendedor e cliente, onde está a força conciliadora?', options:['No produto','No vendedor','No cliente'], correctIndex:1,
        answer:'No vendedor. Produto e cliente existem independentemente; é o vendedor que concilia os dois. E por isso é ali que mora toda a complexidade da operação comercial.' },
      { f:'Aplicado', type:'multipla', prompt:'Num evento, considerando artista, produção e público, quem concilia?', options:['O artista','A produção','O público'], correctIndex:1,
        answer:'A produção. O artista é a força positiva, o público a negativa, e a produção é o que faz os dois se encontrarem. Falhou a produção, o fenômeno não acontece, por melhores que sejam os outros dois.' },
      { f:'Aplicado', type:'multipla', prompt:'Na comunicação, considerando emissor, canal e receptor, onde está a conciliadora?', options:['No emissor','No canal','No receptor'], correctIndex:1,
        answer:'No canal, que inclui o meio, o tom e o momento. É por isso que a mesma mensagem funciona num contexto e destrói em outro.' },
      { f:'Aplicado', type:'multipla', prompt:'Num time de futebol, entre ataque, meio-campo e defesa, quem concilia?', options:['O ataque','O meio-campo','A defesa'], correctIndex:1,
        answer:'O meio-campo. Time que ganha jogo difícil normalmente ganha no meio, não nas pontas. É a força que organiza a relação entre as outras duas.' },
      { f:'Aplicado', type:'multipla', prompt:'Uma equipe entrega no prazo mas com qualidade ruim. Pela Lei de Três, onde você procura o problema primeiro?', options:['Na capacidade das pessoas','No processo que liga pessoas e entrega','Na definição do resultado esperado'], correctIndex:1,
        answer:'No processo, que é a força conciliadora entre quem faz e o que se entrega. É lá que mora a complexidade, e é lá que quase sempre está a falha real.' },
      { f:'Aplicado', type:'multipla', prompt:'Qual destas afirmações contradiz a Lei de Três?', options:['Toda tríade tem uma força que harmoniza as outras duas','Um fenômeno pode existir com apenas duas forças, desde que fortes','A conciliadora é onde costuma estar o problema'], correctIndex:1,
        answer:'A de que um fenômeno pode existir com duas forças. Nenhum fenômeno vem à existência sem a participação solene das três. Ver o mundo em pares é justamente a visão dual que o livro combate.' },
      { f:'Aplicado', type:'livre', prompt:'Pegue um problema real da sua semana e decomponha nas três forças. Qual delas é a conciliadora, e o problema está nela?',
        answer:'Critério: identificou as três forças com clareza, nomeou a conciliadora, e verificou se é ali que o problema mora. Resposta forte é específica, não genérica.' },
      { f:'Aplicado', type:'livre', prompt:'Aplique a tríade objetivo, estratégia e técnica a um projeto seu em andamento agora.',
        answer:'Critério: separou com clareza o quê/por quê (objetivo), o como/quando (estratégia) e o com quê/onde (técnica), sem misturar os três.' },
      { f:'Aplicado', type:'livre', prompt:'Aponte uma situação em que você vinha enxergando só dois lados. Qual era a terceira força que você não estava vendo?',
        answer:'Critério: nomeia a visão dual anterior e identifica com precisão a força que faltava. O livro trata a visão dual como ferramenta de dominação justamente por esconder a terceira força.' },
      { f:'Aplicado', type:'livre', prompt:'Numa negociação travada sua, quem ou o que ocupa a posição conciliadora? Ela está sendo trabalhada, ou vocês estão só empurrando as duas pontas?',
        answer:'Critério: identifica a conciliadora concreta (uma pessoa, um documento, um prazo, um intermediário) e avalia honestamente se ela está recebendo atenção. Negociação travada quase sempre é conciliadora abandonada.' }
    ]
  },
  {
    id:'lei-oitava', nome:'A Lei de Oitava', sub:'Governa os processos', glifo:'♪',
    contexto:'A Lei de Sete ou de Oitava: todo processo tem sete etapas e dois pontos criticos, onde falta o semitom na escala musical (entre mi e fa, e entre si e do). Nesses pontos o processo desvia se nao houver choque consciente. A oitava humana: percepcao, absorcao, raciocinio, discernimento, entusiasmo, manifestacao, influencia.',
    resumo:'Tudo que existe vibra, e toda vibração obedece ao ciclo de sete. Na escala musical faltam os semitons entre mi e fá e entre si e dó: são os dois pontos críticos de todo processo, onde ele tende a desviar do rumo. Nesses pontos é preciso o que Gurdjieff chamava de choque consciente, um acréscimo intencional de energia.',
    itens:[
      { f:'Livro', type:'multipla', prompt:'Onde estão os dois pontos críticos da escala?', options:['Entre dó e ré, e entre sol e lá','Entre mi e fá, e entre si e dó','Entre ré e mi, e entre lá e si'], correctIndex:1,
        answer:'Entre mi e fá, e entre si e dó. São os intervalos onde não coube o semitom, e é ali que todo processo ameaça sair do rumo.' },
      { f:'Livro', type:'multipla', prompt:'O que é o choque consciente?', options:['Uma pausa para descansar','Uma adição intencional de energia extra para manter o rumo','Uma mudança de objetivo'], correctIndex:1,
        answer:'Uma adição de energia extra, feita de propósito, para compensar a tendência natural de desvio nos pontos críticos.' },
      { f:'Livro', type:'multipla', prompt:'Na oitava da manifestação humana, a nota Dó equivale a quê?', options:['Percepção','Decisão','Influência'], correctIndex:0,
        answer:'Percepção. Funciona como um radar: recebe os estímulos disponíveis no ambiente. É o início de todo processo.' },
      { f:'Livro', type:'multipla', prompt:'E a nota Ré?', options:['Absorção ou reação','Raciocínio','Entusiasmo'], correctIndex:0,
        answer:'Absorção ou reação. É onde a informação entra. Se você já reage por cima, distorce antes de entender.' },
      { f:'Livro', type:'multipla', prompt:'E a nota Fá?', options:['Raciocínio','Discernimento, a decisão com coragem','Manifestação'], correctIndex:1,
        answer:'Discernimento. Aqui a escala deixa de ser mental e vira emocional. É onde se escolhe, e escolher exige coragem.' },
      { f:'Livro', type:'multipla', prompt:'E a nota Sol?', options:['Discernimento','Entusiasmo, motivação, vontade','Influência'], correctIndex:1,
        answer:'Entusiasmo. É onde se concentra todo o gás necessário para a etapa seguinte. Decisão sem entusiasmo não sustenta o processo.' },
      { f:'Livro', type:'multipla', prompt:'E a nota Lá?', options:['Manifestação, o pronunciamento','Absorção','Percepção'], correctIndex:0,
        answer:'Manifestação. É onde a pessoa mostra o tamanho da sua capacidade, da sua inteligência e da sua coragem.' },
      { f:'Livro', type:'multipla', prompt:'E a nota Si, última da oitava?', options:['Entusiasmo','Manifestação','Influência'], correctIndex:2,
        answer:'Influência. Se tudo foi bem feito, você influencia. E logo depois vem o segundo ponto crítico, que exige esforço extra para fechar o ciclo.' },
      { f:'Livro', type:'multipla', prompt:'Qual é a sequência correta da oitava humana?', options:['Percepção, absorção, raciocínio, discernimento, entusiasmo, manifestação, influência','Percepção, raciocínio, decisão, ação, análise, controle, resultado','Ideia, plano, recurso, execução, controle, revisão, entrega'], correctIndex:0,
        answer:'Dó percepção, Ré absorção, Mi raciocínio, Fá discernimento, Sol entusiasmo, Lá manifestação, Si influência.' },
      { f:'Livro', type:'multipla', prompt:'Na oitava de uma obra (projeto, planejamento, suprimento, execução, controle, análise, novas ideias), qual é o primeiro ponto fraco?', options:['Concluir o planejamento','Concluir o suprimento','Concluir a execução'], correctIndex:1,
        answer:'Concluir o suprimento, entre mi e fá. O segundo ponto fraco é fazer surgirem novas ideias, entre si e o dó da próxima oitava.' },
      { f:'Livro', type:'multipla', prompt:'Qual experimento científico o livro aponta como demonstração da Lei de Oitava?', options:['A dupla fenda','O prisma de Newton','O pêndulo de Foucault'], correctIndex:1,
        answer:'O prisma de Newton. A luz branca se reparte em exatamente sete cores, todo o espectro. A mesma lei de sete que aparece na escala musical.' },
      { f:'Livro', type:'multipla', prompt:'O que acontece quando uma vibração passa da sétima para a oitava onda?', options:['Ela se extingue','Muda de escala mantendo as características da primeira','Inverte o sentido'], correctIndex:1,
        answer:'Muda de escala mas mantém as mesmas características da primeira. Por isso o Dó de uma escala tem o mesmo timbre do Dó de todas as outras.' },
      { f:'Aplicado', type:'multipla', prompt:'Um vendedor que faz ótima apresentação mas não fecha negócio está travando em qual nota?', options:['Mi, o raciocínio','Lá, a manifestação','Si, a influência'], correctIndex:2,
        answer:'Si, a influência, e ele para exatamente no segundo ponto crítico. Manifestar bem é Lá. Fazer o outro agir depois é Si, e é ali que se perde a maioria dos processos comerciais.' },
      { f:'Aplicado', type:'multipla', prompt:'Uma pessoa que decide rápido demais, sem levantar alternativas, está pulando qual etapa?', options:['Mi, o raciocínio','Sol, o entusiasmo','Lá, a manifestação'], correctIndex:0,
        answer:'Mi, o raciocínio. Sem gerar alternativas suficientes, a decisão em Fá vira chute, e a motivação em Sol nasce fraca. É a analogia do enxadrista sob pressão de relógio.' },
      { f:'Aplicado', type:'multipla', prompt:'Um projeto seu tem verba aprovada, plano pronto, mas o dinheiro não chega e tudo para. Pela oitava da obra, onde está?', options:['No primeiro ponto crítico, concluir o suprimento','No segundo ponto crítico, gerar novas ideias','Na execução'], correctIndex:0,
        answer:'No primeiro ponto crítico, entre mi e fá. Aprovação não é suprimento. E é justamente ali que a lei empurra o processo para fora do rumo, se ninguém der o choque consciente.' },
      { f:'Aplicado', type:'multipla', prompt:'Qual destas NÃO é uma manifestação da Lei de Oitava citada no livro?', options:['Os sete dias da semana','O espectro de sete cores','As quatro estações do ano'], correctIndex:2,
        answer:'As quatro estações. O livro cita os dias da semana, as notas musicais, as ondas eletromagnéticas e o espectro de cores, todos em sete.' },
      { f:'Aplicado', type:'livre', prompt:'Descreva um projeto seu que travou no meio. Em qual nota ele parou, e que choque consciente teria salvado o rumo?',
        answer:'Critério: identificou a nota com precisão e propôs uma intervenção concreta, não genérica. Reconhecer o ponto crítico é o que separa quem corrige de quem fica nas mãos da sorte.' },
      { f:'Aplicado', type:'livre', prompt:'Aplique as sete notas a um processo comercial seu, do primeiro contato ao fechamento. Onde ele costuma morrer?',
        answer:'Critério: mapeou as sete etapas ao processo real, sem forçar, e apontou o ponto de perda com honestidade. Resposta forte reconhece se o ponto de perda coincide com um dos dois pontos críticos naturais.' },
      { f:'Aplicado', type:'livre', prompt:'Qual processo seu está agora exatamente num ponto crítico, e que esforço extra específico você vai aplicar esta semana?',
        answer:'Critério: nomeia o processo, localiza o ponto crítico e define uma ação concreta com prazo. Choque consciente sem data é intenção, não choque.' },
      { f:'Aplicado', type:'livre', prompt:'Você chegou até Lá, se manifestou bem, e mesmo assim não houve influência. O que faltou entre uma nota e outra?',
        answer:'Critério: reconhece que entre si e dó existe um ponto crítico e identifica o esforço extra que faltou: um pedido explícito, um prazo, um próximo passo concreto. Manifestar não é influenciar.' }
    ]
  },
  {
    id:'lei-retorno', nome:'A Lei do Retorno', sub:'Governa os resultados', glifo:'○',
    contexto:'A Lei do Retorno ou de causa e efeito: toda acao corresponde a uma reacao igual e de sentido contrario. Tudo que se planta se colhe. No Eneagrama e a circunferencia, a serpente que engole o proprio rabo. Exercicios ligam decisoes passadas a resultados presentes e projetam colheitas futuras.',
    resumo:'Toda ação corresponde a uma reação igual e de sentido contrário. Tudo que se planta, se colhe. É a lei de causa e efeito, e no símbolo do Eneagrama está representada pela circunferência, a serpente que engole o próprio rabo. Nada do que se faz deixa de ser contabilizado pela natureza.',
    itens:[
      { f:'Livro', type:'multipla', prompt:'No símbolo do Eneagrama, a Lei do Retorno é representada por qual elemento?', options:['O triângulo','A circunferência','A hexade'], correctIndex:1,
        answer:'A circunferência, a serpente que engole o próprio rabo. O triângulo representa a Lei de Três e a figura interna representa a Lei de Oitava.' },
      { f:'Livro', type:'multipla', prompt:'As três leis governam, respectivamente:', options:['Pessoas, empresas e nações','Fenômenos, processos e resultados','Passado, presente e futuro'], correctIndex:1,
        answer:'Fenômenos (Lei de Três), processos (Lei de Oitava) e resultados (Lei do Retorno). Tudo que existe cabe numa dessas três gavetas.' },
      { f:'Livro', type:'multipla', prompt:'Segundo o livro, o que acontece se a cobrança da Lei do Retorno não chegar em vida?', options:['Ela se perde','Um descendente seu a recebe','Ela é anulada'], correctIndex:1,
        answer:'Um descendente estará lá para receber. Tudo que se faz é contabilizado pela natureza, e o prazo não é escolhido por quem plantou.' },
      { f:'Livro', type:'multipla', prompt:'Qual provérbio o livro usa para resumir a Lei do Retorno?', options:['Quem planta vento colhe tempestade','Água mole em pedra dura','De grão em grão a galinha enche o papo'], correctIndex:0,
        answer:'Quem planta vento colhe tempestade. A colheita não é só proporcional, é amplificada.' },
      { f:'Aplicado', type:'multipla', prompt:'Uma empresa corta atendimento para economizar e dois anos depois perde participação de mercado. Isso ilustra:', options:['Falha de planejamento apenas','A Lei do Retorno, com atraso entre causa e efeito','Uma coincidência de mercado'], correctIndex:1,
        answer:'A Lei do Retorno. O intervalo entre plantio e colheita é justamente o que faz as pessoas não enxergarem a ligação, e por isso repetirem o erro.' },
      { f:'Aplicado', type:'multipla', prompt:'Por que a Lei do Retorno é a mais difícil de enxergar na prática?', options:['Porque nem sempre se cumpre','Porque o intervalo entre causa e efeito esconde a ligação','Porque só vale para grandes decisões'], correctIndex:1,
        answer:'Pelo intervalo. Quando a colheita chega, a semente já saiu do campo de visão, e a pessoa atribui o resultado à sorte ou ao destino.' },
      { f:'Aplicado', type:'livre', prompt:'Aponte um resultado da sua vida hoje que é colheita direta de algo que você plantou há mais de um ano. Seja específico sobre a semente.',
        answer:'Critério: a ligação entre causa e efeito está nomeada com precisão, sem generalidade. Resposta forte identifica a ação concreta e o intervalo de tempo.' },
      { f:'Aplicado', type:'livre', prompt:'O que você está plantando agora, sem perceber, que vai colher daqui a três anos? Inclua algo que não é confortável de admitir.',
        answer:'Critério: identifica pelo menos uma semente atual com honestidade, incluindo uma de efeito indesejado. Resposta que só lista boas sementes está incompleta.' },
      { f:'Aplicado', type:'livre', prompt:'Descreva uma decisão sua que trouxe ganho imediato e custo depois. Você conseguia ver o custo na hora?',
        answer:'Critério: reconhece o ganho de curto prazo, o custo posterior e é honesta sobre o quanto era previsível. A lição está no que era visível e foi ignorado, não no que era imprevisível.' }
    ]
  },
  {
    id:'tres-centros', nome:'Os Três Centros', sub:'A máquina humana', glifo:'⚙',
    contexto:'Os tres centros de poder: Mental (pensamento, alimento informacao, cerebro, densidade 12, exito visao, desempenho inteligencia), Emocional (sentimento, oxigenio, ganglios do simpatico, densidade 24, exito paixao, desempenho coragem e discernimento), Corporal (movimento, comida/exercicio/sono/sexo, medula, densidade 48, exito acao, desempenho liberdade). Persuasao: 7% mensagem, 38% tom de voz, 55% corpo.',
    resumo:'Mental, Emocional e Corporal. O mental pensa e se alimenta de informação, sede no cérebro, densidade 12. O emocional sente e se alimenta de oxigênio, sede nos gânglios do simpático, densidade 24. O corporal se move e se alimenta de comida, exercício, sono e sexo, sede na medula, densidade 48. Êxito: visão, paixão e ação. Desempenho: inteligência, coragem e liberdade.',
    itens:[
      { f:'Livro', type:'multipla', prompt:'Qual é o alimento do centro emocional?', options:['Informação','Oxigênio','Comida e bebida'], correctIndex:1,
        answer:'Oxigênio. Por isso, em abalo emocional, se pede respiração profunda. Informação alimenta o mental, comida alimenta o corporal.' },
      { f:'Livro', type:'multipla', prompt:'Onde fica a sede de comando do centro emocional?', options:['No cérebro','Nos gânglios nervosos do sistema simpático','Na medula espinhal'], correctIndex:1,
        answer:'Nos gânglios do sistema simpático, uma rede neural espalhada pelo corpo inteiro. O cérebro comanda o mental, a medula comanda o corporal.' },
      { f:'Livro', type:'multipla', prompt:'O êxito do centro mental é caracterizado por:', options:['Visão','Paixão','Ação'], correctIndex:0,
        answer:'Visão, a capacidade de antever, de enxergar mais longe. Paixão é do emocional, ação é do corporal.' },
      { f:'Livro', type:'multipla', prompt:'O desempenho do centro corporal é caracterizado por:', options:['Inteligência','Coragem','Liberdade e versatilidade'], correctIndex:2,
        answer:'Liberdade e versatilidade, coroadas pela capacidade de falar em público com influência.' },
      { f:'Livro', type:'multipla', prompt:'Na persuasão, quanto pesa a mensagem, o lado puramente intelectual?', options:['7%','38%','55%'], correctIndex:0,
        answer:'7%. O tom de voz pesa 38% e o corpo o restante. Corpo e emoção juntos somam 93%. O intelectual sozinho não persuade ninguém.' },
      { f:'Livro', type:'multipla', prompt:'Qual é a densidade do material que constitui o centro emocional?', options:['12, material solar','24, material planetário','48, material terrestre'], correctIndex:1,
        answer:'24, material planetário. É o conciliador. O mental é 12, solar e sutil. O corporal é 48, terrestre e denso.' },
      { f:'Livro', type:'multipla', prompt:'Segundo o livro, qual é o problema do "mente sã em corpo são"?', options:['Ignora o centro emocional','Valoriza demais o corpo','Não menciona a alma'], correctIndex:0,
        answer:'Ignora o centro emocional, justamente o responsável pelas nossas principais qualidades. O livro trata isso como ferramenta de dominação, porque um emocional imaturo é facilmente dominado.' },
      { f:'Livro', type:'multipla', prompt:'Quais são as maiores revelações do centro emocional?', options:['Imaginação e memória','Confiança, intuição, gratidão e humildade','Força, resistência e ritmo'], correctIndex:1,
        answer:'Confiança, intuição, gratidão e humildade. A maior revelação do mental é a imaginação.' },
      { f:'Livro', type:'multipla', prompt:'Quando o centro mental não chega a uma solução única e encontra várias alternativas, quem decide?', options:['Ele mesmo, escolhendo a mais provável','O centro emocional','O centro corporal, pela ação'], correctIndex:1,
        answer:'O centro emocional. O mental calcula e oferece possibilidades; a escolha é emocional. Por isso discernimento é função do emocional, não do intelecto.' },
      { f:'Livro', type:'multipla', prompt:'Segundo o livro, o que sobra para quem tem o emocional imaturo?', options:['Inveja, ciúme, medo e ingratidão','Preguiça e desorganização','Excesso de racionalidade'], correctIndex:0,
        answer:'Inveja, ciúme, medo e ingratidão. E o livro é duro: pessoas assim ocupam a maioria dos cargos relevantes na organização mundial.' },
      { f:'Livro', type:'multipla', prompt:'Segundo o livro, a palavra falada deve ter apenas três objetivos. Quais?', options:['Informar, convencer e vender','Agradecer, curar e prosperar','Ensinar, corrigir e inspirar'], correctIndex:1,
        answer:'Agradecer, curar e prosperar. E o melhor exercício para desenvolver inteligência, coragem e liberdade é a oratória espontânea: simplesmente fazer a pessoa falar.' },
      { f:'Aplicado', type:'multipla', prompt:'Uma pessoa que sabe tudo do assunto mas trava ao apresentar tem qual centro em déficit?', options:['Mental','Emocional','Corporal'], correctIndex:1,
        answer:'Emocional. Conhecimento é mental e já está lá. O que falta é coragem, que é desempenho do emocional. Estudar mais não resolve esse tipo de trava.' },
      { f:'Aplicado', type:'multipla', prompt:'Você respira fundo antes de uma reunião difícil. Qual centro está sendo alimentado?', options:['Mental','Emocional','Corporal'], correctIndex:1,
        answer:'O emocional, cujo alimento é o oxigênio. Não é técnica de relaxamento genérica: é nutrição direta do centro que vai precisar decidir.' },
      { f:'Aplicado', type:'multipla', prompt:'Segundo a proporção de persuasão do livro, um argumento impecável dito com voz insegura perde o quê?', options:['Nada, o argumento se sustenta sozinho','A maior parte, porque 93% está em corpo e emoção','Apenas parte do impacto visual'], correctIndex:1,
        answer:'A maior parte. O conteúdo responde por 7%. Por isso a mesma tese convence numa boca e morre em outra.' },
      { f:'Aplicado', type:'livre', prompt:'Dos seus três centros, qual está mais atrofiado hoje? Dê uma evidência concreta, não uma impressão.',
        answer:'Critério: aponta um centro e sustenta com um fato observável do comportamento recente, não com autoimagem. Sinais de emocional fraco: falta de coragem, indecisão, inveja, ingratidão.' },
      { f:'Aplicado', type:'livre', prompt:'Descreva uma decisão recente em que o mental fez bem o trabalho, gerou alternativas, e o emocional ainda assim escolheu mal. O que aconteceu ali?',
        answer:'Critério: separa com clareza a etapa de gerar alternativas da etapa de escolher, e identifica o que interferiu na escolha. Boa resposta reconhece que decidir é função emocional, não intelectual.' },
      { f:'Aplicado', type:'livre', prompt:'Como você alimentou cada um dos seus três centros nas últimas 24 horas? Seja literal: informação, oxigênio, comida e movimento.',
        answer:'Critério: responde nos três, com fatos, e percebe qual ficou desnutrido. O centro que você não consegue lembrar de ter alimentado é o que está sendo negligenciado.' }
    ]
  },
  {
    id:'estados', nome:'Os Quatro Estados', sub:'Níveis de consciência', glifo:'◉',
    contexto:'Os quatro estados de consciencia: sono, vigilia comum (devaneio ou consciencia relativa), consciencia de si e consciencia objetiva. A maioria alterna entre os dois primeiros a vida toda. Quem nao conhece as leis vive na ilusao, vendo as coisas como aparentam ser. Inclui o conto do Mago e seu Rebanho como hipnose social.',
    resumo:'Sono, vigília comum, consciência de si e consciência objetiva. A maioria das pessoas vive alternando entre os dois primeiros a vida inteira, e chama de estar acordado o que é apenas devaneio. Quem não conhece as leis não enxerga as coisas como elas são, mas como aparentam ser. Vive na ilusão.',
    itens:[
      { f:'Livro', type:'multipla', prompt:'Em qual estado a maioria das pessoas passa a vida acreditando estar acordada?', options:['Sono','Vigília comum, o devaneio','Consciência de si'], correctIndex:1,
        answer:'Vigília comum, também chamada de consciência relativa ou devaneio. É o estado em que se reage automaticamente, sem se observar.' },
      { f:'Livro', type:'multipla', prompt:'Segundo o livro, quem não aplica as três leis vive como?', options:['Sem objetivos','Na ilusão, vendo as coisas como aparentam ser','Em conflito constante'], correctIndex:1,
        answer:'Na ilusão. Jung dizia que até você se tornar consciente, o inconsciente dirige sua vida e você chama isso de destino.' },
      { f:'Livro', type:'multipla', prompt:'Quais são os quatro estados, em ordem?', options:['Sono, vigília comum, consciência de si, consciência objetiva','Inconsciente, subconsciente, consciente, superconsciente','Reação, reflexão, decisão, ação'], correctIndex:0,
        answer:'Sono, vigília comum (devaneio), consciência de si e consciência objetiva. Os dois últimos são raros e exigem trabalho deliberado.' },
      { f:'Livro', type:'multipla', prompt:'No conto do Mago e seu Rebanho, por que os carneiros não fogem?', options:['Porque estão presos','Porque foram hipnotizados a se acharem leões, águias e magos','Porque não sabem o caminho'], correctIndex:1,
        answer:'Porque foram hipnotizados a acreditar numa identidade lisonjeira e a achar que tudo acontece para o bem do rebanho. A cerca não é física, é de identidade.' },
      { f:'Aplicado', type:'multipla', prompt:'Você dirige por um trajeto conhecido e chega sem lembrar do caminho. Em que estado você estava?', options:['Consciência de si','Vigília comum, o devaneio','Consciência objetiva'], correctIndex:1,
        answer:'Vigília comum. O corpo executou, o mental vagou, e não houve observação de si em nenhum momento. É o estado padrão da maior parte do dia.' },
      { f:'Aplicado', type:'multipla', prompt:'Qual é a diferença entre lembrar de uma reação sua e ter consciência de si?', options:['Nenhuma, são a mesma coisa','A consciência de si acontece durante o ato, não depois','A lembrança é mais confiável'], correctIndex:1,
        answer:'A consciência de si acontece no ato: você se observa enquanto age. Lembrar depois é reconstrução, e a reconstrução quase sempre favorece quem lembra.' },
      { f:'Aplicado', type:'multipla', prompt:'Alguém recebe um título pomposo em vez de aumento e passa a trabalhar mais. Isso é:', options:['Reconhecimento legítimo','A hipnose do rebanho: identidade no lugar do interesse','Uma troca justa'], correctIndex:1,
        answer:'A hipnose do rebanho. O título substitui a percepção do próprio interesse, exatamente como o mago convencendo o carneiro de que ele é um leão.' },
      { f:'Aplicado', type:'livre', prompt:'Descreva um momento recente de consciência de si: um instante em que você se observou agindo, em vez de simplesmente reagir.',
        answer:'Critério: descreve um instante específico de auto-observação em tempo real, não uma reflexão feita depois. A diferença entre lembrar e observar-se no ato é o núcleo do exercício.' },
      { f:'Aplicado', type:'livre', prompt:'Qual hipnose você aceita hoje sem questionar? Pode ser um título, um discurso de propósito, uma regra de mercado que todo mundo repete.',
        answer:'Critério: nomeia uma crença específica que serve mais a outro do que a você, e reconhece por que é confortável mantê-la. Resposta genérica sobre "a sociedade" não conta.' },
      { f:'Aplicado', type:'livre', prompt:'Reconstrua sua última hora. Quanto dela foi devaneio e quanto foi presença real? Seja honesto sobre a proporção.',
        answer:'Critério: proporção honesta, com exemplos concretos dos dois estados. Resposta que reivindica presença o tempo todo geralmente é a própria prova do devaneio.' }
    ]
  }
];

/* ===== Base doutrinária para a leitura profunda ===== */
const NOTA_INFO = {
  'Dó':{ nome:'Percepção', trecho:'mental', critico:false, anterior:null,
    funcao:'Funciona como um radar. Recebe os estímulos disponíveis no ambiente antes de qualquer processamento. É a matéria-prima de tudo que vem depois.',
    quebra:'Você entra nas situações sem ler o ambiente. Perde o que não foi dito, o que estava no tom, na hesitação, em quem não falou. Depois é surpreendido por coisas que já estavam visíveis para quem prestou atenção.',
    consequencia:'Percepção fraca contamina a oitava inteira. Não adianta raciocinar bem sobre uma leitura errada do que estava acontecendo.',
    correcao:'Chegue antes. Fale menos nos primeiros minutos. Antes de opinar, faça um inventário mental do que está na sala e do que está faltando ali.' },
  'Ré':{ nome:'Absorção', trecho:'mental', critico:false, anterior:'Dó',
    funcao:'Absorver a informação tal qual ela veio, sem já reagir por cima. É a diferença entre receber e interpretar.',
    quebra:'Você distorce na entrada. Ouve o que esperava ouvir, traduz para a sua versão antes de entender a do outro. O sintoma clássico é a frase "não foi isso que eu disse" aparecendo com frequência nas suas conversas.',
    consequencia:'Tudo que vem depois passa a operar sobre uma informação que já não é a original. Você raciocina com precisão sobre um dado errado.',
    correcao:'Repita de volta antes de responder. Não como técnica de escuta ativa decorada, mas como checagem real: se você não consegue reformular o que o outro disse, você não absorveu, reagiu.' },
  'Mi':{ nome:'Raciocínio', trecho:'mental', critico:true, anterior:'Ré',
    funcao:'Pensar fundo e gerar o maior número possível de alternativas. O livro é explícito: o centro mental não decide, ele oferece possibilidades. Quanto mais alternativas boas, melhor será a decisão seguinte.',
    quebra:'Poucas alternativas chegam à mesa. O livro usa a imagem do enxadrista com o relógio correndo: a plateia espera, o adversário espera, e você arrisca um movimento em vez de escolher um. Também usa a imagem do trevo sem sinalização, com várias saídas e nenhuma indicação.',
    consequencia:'Esta é a nota logo antes do primeiro ponto crítico da escala. Mi fraco não produz só uma decisão ruim em Fá: produz também motivação fraca em Sol, porque ninguém se entusiasma com uma escolha em que não acreditou de verdade.',
    correcao:'Exija de si um número mínimo de alternativas antes de permitir a decisão. Três, quatro, cinco. É aqui que o choque consciente cabe melhor: o esforço extra é de pensamento, não de vontade.' },
  'Fá':{ nome:'Discernimento', trecho:'emocional', critico:false, anterior:'Mi',
    funcao:'Decidir, com coragem. Aqui a escala deixa de ser mental e passa a ser emocional. Discernimento, no livro, é a capacidade de fazer escolhas, e é função do centro emocional, não do intelecto.',
    quebra:'Você sabe o que fazer e não decide. Ou decide e desdiz na semana seguinte. Ou empurra a decisão para o grupo, para o prazo, para o momento em que não haverá mais escolha a fazer.',
    consequencia:'Sem decisão não há gás para Sol. O processo passa a andar por inércia, e a energia que devia vir da convicção passa a vir da cobrança externa.',
    correcao:'Antes de tratar como falta de coragem, verifique Mi. Se o raciocínio anterior está forte e mesmo assim você não decide, aí sim o problema é emocional: é maturidade de centro, e se desenvolve com exposição, não com mais informação.' },
  'Sol':{ nome:'Entusiasmo', trecho:'emocional', critico:false, anterior:'Fá',
    funcao:'É onde se concentra todo o gás necessário para a etapa seguinte. Motivação, vontade, paixão. O que faz vestir a camisa.',
    quebra:'Você decide e não sustenta. O projeto não morre de oposição, morre de inanição. Duas semanas depois ninguém mais fala nele, inclusive você.',
    consequencia:'Sem entusiasmo, a manifestação em Lá sai morna, e manifestação morna não influencia ninguém, porque tom de voz e corpo respondem por 93% do poder de persuasão.',
    correcao:'Entusiasmo baixo quase nunca se resolve olhando para a frente. O livro é direto: se a escolha anterior não foi boa, haverá pouca motivação para seguir. Olhe para trás, para Fá e para Mi.' },
  'Lá':{ nome:'Manifestação', trecho:'corporal', critico:false, anterior:'Sol',
    funcao:'É onde a pessoa mostra o tamanho da sua capacidade, da sua inteligência e da sua coragem. O pronunciamento. É aqui que quem fala define o que vem depois.',
    quebra:'Você encolhe a fala para caber no ambiente. Entrega menos do que tem, principalmente diante de quem tem posição. Amacia a opinião antes de afirmá-la, e o "acho que" aparece na frente do que você já sabe.',
    consequencia:'Você chega até aqui com boa análise e boa decisão e desperdiça as duas na entrega. É a perda mais evitável da oitava inteira.',
    correcao:'O livro aponta um único programa como o mais eficaz para desenvolver um profissional: fazê-lo falar. Oratória espontânea, de pé, sem preparo, com tempo curto. Não é treino de conteúdo, é treino de tamanho.' },
  'Si':{ nome:'Influência', trecho:'corporal', critico:true, anterior:'Lá',
    funcao:'Influência é o que acontece no outro depois que você falou. Não é ser ouvido, não é ser elogiado, não é concordância educada na sala. É mudança de comportamento: a pessoa faz algo que não faria se você não tivesse falado.',
    quebra:'Você fala bem e nada muda depois. A reunião termina com todo mundo de acordo e nenhuma ação nomeada. O elogio vem, o movimento não. Manifestar é Lá; fazer acontecer no outro é Si, e são coisas diferentes.',
    consequencia:'Esta é a nota do segundo ponto crítico, entre si e o dó da oitava seguinte. Quem para aqui não fecha o ciclo, e sem fechar o ciclo o próximo recomeça do zero, sem herdar nada do esforço anterior.',
    correcao:'O esforço extra aqui é concreto e pequeno: um pedido explícito, um responsável nomeado, uma data. A maioria dos processos não morre por falta de argumento, morre por falta da última frase, aquela que transforma concordância em compromisso.' }
};

const CENTRO_DEEP = {
  mental:{ nome:'Centro Mental', funcao:'Pensamento', alimento:'Informação', sede:'Cérebro', densidade:'12, material solar',
    exito:'Visão', desempenho:'Inteligência', revelacao:'Imaginação',
    txt:'Sua força natural é a visão: antever, calcular, enxergar mais longe do que o campo imediato. O centro mental se alimenta de informação, tem sede de comando no cérebro e é o mais sutil dos três, densidade 12, material solar.',
    limite:'O livro é categórico num ponto que costuma passar despercebido: o centro mental não decide. Nas questões complexas, onde não existe uma solução única e sim várias alternativas possíveis, ele passa a bola adiante. Quem decide é o emocional. Por isso um mental muito desenvolvido, sozinho, produz análise excelente e paralisia decisória.',
    risco:'Seu risco não é errar de raciocínio, é chegar tarde. Analisar até que a janela feche, e chamar isso de prudência.' },
  emocional:{ nome:'Centro Emocional', funcao:'Sentimento', alimento:'Oxigênio', sede:'Gânglios do sistema simpático', densidade:'24, material planetário',
    exito:'Paixão', desempenho:'Coragem e discernimento', revelacao:'Confiança, intuição, gratidão e humildade',
    txt:'Sua força natural é a paixão: envolver-se por inteiro, vestir a camisa. O centro emocional se alimenta de oxigênio, tem sede numa rede neural espalhada pelo corpo e é o conciliador da tríade, densidade 24, material planetário. É dele que vem o discernimento, a capacidade de escolher.',
    limite:'É o centro mais raro e o mais ignorado. O ditado "mente sã em corpo são" apagou justamente a força do meio, e o livro trata isso como ferramenta de dominação: um emocional imaturo é facilmente dominado, porque nele sobram inveja, ciúme, medo e ingratidão.',
    risco:'Seu risco é decidir bem sobre base fina. O emocional escolhe entre as alternativas que o mental ofereceu; se o mental não trabalhou o suficiente, você vai escolher com convicção dentro de um leque pobre.' },
  corporal:{ nome:'Centro Corporal', funcao:'Movimento', alimento:'Comida, exercício, sono e sexo', sede:'Medula espinhal', densidade:'48, material terrestre',
    exito:'Ação', desempenho:'Liberdade e versatilidade', revelacao:'A fala em público com influência',
    txt:'Sua força natural é a ação: presença, desenvoltura, fazer acontecer. O centro corporal se alimenta de comida, exercício, sono e sexo, tem sede na medula e é o mais denso dos três, densidade 48, material terrestre. É dele que sai a maior parte do poder de persuasão.',
    limite:'A proporção do livro é dura com quem confia só no conteúdo: a mensagem responde por 7% da persuasão, o tom de voz por 38%, e o corpo pelo restante. Corpo e emoção juntos são 93%. Isso é uma vantagem enorme para você, desde que os outros dois centros estejam alimentados.',
    risco:'Seu risco é agir antes de ter pensado o suficiente, e compensar com presença o que faltou de preparo. Funciona muitas vezes, e é justamente por funcionar que vira hábito.' }
};

const TRECHO_INFO = {
  mental:{ nome:'trecho mental', notas:'Dó, Ré e Mi',
    desc:'ler a situação, absorver sem distorcer e gerar alternativas antes de escolher',
    verbos:'<strong>Perceber</strong> é captar o que está realmente acontecendo, inclusive o que não foi dito. <strong>Absorver</strong> é deixar a informação entrar como ela veio, sem já traduzir para a sua versão. <strong>Raciocinar</strong> é pensar fundo o suficiente para colocar várias alternativas boas na mesa, já que o centro mental não decide, ele oferece possibilidades.' },
  emocional:{ nome:'trecho emocional', notas:'Fá e Sol',
    desc:'escolher entre as alternativas e sustentar a escolha com energia real',
    verbos:'<strong>Discernir</strong> é decidir, e no livro isso é função emocional, não intelectual: exige coragem, não mais informação. <strong>Entusiasmar</strong> é o gás que sobra depois da decisão, o que faz você seguir sem cobrança externa. Se a decisão foi fraca, o entusiasmo nasce fraco junto.' },
  corporal:{ nome:'trecho corporal', notas:'Lá e Si',
    desc:'aparecer no seu tamanho real e converter isso em movimento no outro',
    verbos:'<strong>Manifestar</strong> é se pronunciar mostrando o tamanho da sua capacidade, sem encolher a fala para caber no ambiente. <strong>Influenciar</strong> é o que acontece depois na outra pessoa: ela faz algo que não faria se você não tivesse falado. Concordância educada na sala não é influência, é cortesia.' }
};

const CRUZAMENTO = {
  'mental|mental':'Aqui há uma contradição que vale encarar. O centro que comanda em você é o mesmo trecho onde sua oitava está mais fraca. Isso normalmente significa uma de duas coisas: ou você confia tanto na sua leitura que parou de checá-la, ou está usando o mental para outra coisa que não pensar sobre o problema em si, como antecipar reações e proteger posição. Vale investigar qual das duas.',
  'mental|emocional':'Este é o padrão de manual, e o livro descreve exatamente ele. O mental gera alternativas, mas não decide; quem decide é o emocional. Você tem matéria-prima de sobra e um conversor fraco. O resultado é conhecido: análise excelente, decisão adiada, e depois a sensação de que perdeu o timing por circunstância externa. Não foi circunstância.',
  'mental|corporal':'Você pensa bem, decide razoavelmente, e perde na entrega. É a perda mais cara, porque você já pagou o custo de todo o trabalho anterior. E é a mais evitável: 93% da persuasão está em corpo e emoção, ou seja, o que falta não é conteúdo, é tamanho na hora de aparecer.',
  'emocional|mental':'Você decide com firmeza sobre uma base fina. Coragem não falta, informação sim. O risco desse perfil é acertar várias vezes por leitura intuitiva e concluir que o processo mental é dispensável, até o dia em que o assunto é complexo demais para a intuição sozinha.',
  'emocional|emocional':'Seu centro mais forte é onde você quebra, o que quase sempre indica que o problema não é capacidade e sim desgaste. Emocional é o centro que se alimenta de oxigênio e se esvazia com exposição contínua sem recuperação. Vale olhar menos para técnica de decisão e mais para o quanto você vem sustentando o ânimo de outras pessoas além do seu.',
  'emocional|corporal':'Você decide com coragem e não converte isso em movimento no outro. Decisão sem manifestação de tamanho vira decisão interna, que ninguém acompanha. O livro tem um remédio específico e desconfortável para isso: falar mais, em público, sem preparo.',
  'corporal|mental':'Você faz acontecer e influencia, mas sobre uma leitura que nem sempre foi checada. Esse perfil produz muito, e produz na direção errada com a mesma eficiência. O ganho aqui não vem de agir mais, vem de gastar dez minutos a mais antes de agir.',
  'corporal|emocional':'Você tem presença e faz acontecer, mas a decisão que sustenta a ação vem fraca ou de fora. O sintoma típico é executar muito bem projetos que você não escolheu. Vale checar quantas das suas ações recentes vieram de uma escolha sua e quantas vieram de uma demanda que você absorveu.',
  'corporal|corporal':'Seu centro mais forte é o mesmo trecho onde a oitava quebra, e no seu caso isso costuma ser específico: você tem presença de sobra, mas está usando a presença para conduzir sem pedir. Manifestar você manifesta. O que falta é o passo final, nomear o que precisa acontecer depois.'
};

/* ===== Teste do Eneagrama ===== */
const TESTE_CENTROS = [
  { q:'Diante de um problema novo e complexo, seu primeiro movimento é:',
    o:[{t:'Mapear o cenário e levantar todas as alternativas possíveis',c:'mental'},
       {t:'Sentir o que está em jogo e decidir por onde começar',c:'emocional'},
       {t:'Começar a fazer alguma coisa e ajustar no caminho',c:'corporal'}] },
  { q:'O que mais te cansa num dia difícil:',
    o:[{t:'Excesso de informação sem tempo de processar',c:'mental'},
       {t:'Ter que sustentar clima e ânimo dos outros',c:'emocional'},
       {t:'Ter que estar em muitos lugares e resolver na prática',c:'corporal'}] },
  { q:'Quando você acerta, geralmente é porque:',
    o:[{t:'Enxergou antes o que os outros não viram',c:'mental'},
       {t:'Teve coragem de bancar uma escolha impopular',c:'emocional'},
       {t:'Se moveu mais rápido e com mais presença',c:'corporal'}] },
  { q:'O elogio que mais te representa:',
    o:[{t:'Você pensa longe',c:'mental'},
       {t:'Você veste a camisa como ninguém',c:'emocional'},
       {t:'Com você a coisa acontece',c:'corporal'}] },
  { q:'Numa reunião tensa, o que você faz melhor:',
    o:[{t:'Organizar o raciocínio e trazer clareza',c:'mental'},
       {t:'Ler o clima e decidir o tom certo',c:'emocional'},
       {t:'Manter presença e conduzir a sala',c:'corporal'}] },
  { q:'O que você mais evita:',
    o:[{t:'Decidir sem ter analisado o suficiente',c:'mental'},
       {t:'Perder o entusiasmo por algo que era seu',c:'emocional'},
       {t:'Ficar parado esperando as condições ideais',c:'corporal'}] },
  { q:'Sua energia se recupera com:',
    o:[{t:'Silêncio e informação nova de qualidade',c:'mental'},
       {t:'Conversa verdadeira e ar livre',c:'emocional'},
       {t:'Movimento, comida boa, sono',c:'corporal'}] },
  { q:'Quando erra, normalmente é porque:',
    o:[{t:'Analisou demais e perdeu o tempo da ação',c:'mental'},
       {t:'Deixou a emoção do momento decidir',c:'emocional'},
       {t:'Agiu antes de pensar direito',c:'corporal'}] },
  { q:'O que as pessoas mais buscam em você:',
    o:[{t:'Uma leitura da situação',c:'mental'},
       {t:'Uma decisão que ninguém quer tomar',c:'emocional'},
       {t:'Execução, alguém que faça acontecer',c:'corporal'}] }
];

const TESTE_OITAVA = [
  { nota:'Dó', nome:'Percepção', desc:'Captar o que realmente está acontecendo, sem filtro',
    q:'Eu percebo com clareza o que está em jogo antes de qualquer coisa, incluindo o que não foi dito.' },
  { nota:'Ré', nome:'Absorção', desc:'Deixar a informação entrar sem distorcer',
    q:'Eu absorvo o que recebo sem já reagir por cima, sem transformar na minha versão antes de entender.' },
  { nota:'Mi', nome:'Raciocínio', desc:'Pensar fundo e gerar alternativas',
    q:'Eu penso a fundo e levanto várias alternativas reais antes de escolher, mesmo sob pressão de tempo.' },
  { nota:'Fá', nome:'Discernimento', desc:'Decidir, com coragem',
    q:'Eu decido com firmeza no momento certo, mesmo quando a decisão desagrada alguém com posição acima.' },
  { nota:'Sol', nome:'Entusiasmo', desc:'A paixão que dá gás ao processo',
    q:'Depois de decidir, eu sustento entusiasmo real, e isso se vê na minha energia, não só nas palavras.' },
  { nota:'Lá', nome:'Manifestação', desc:'Se pronunciar, mostrar o tamanho',
    q:'Eu me manifesto no tamanho da minha capacidade, sem encolher a fala pra caber no ambiente.' },
  { nota:'Si', nome:'Influência', desc:'Fazer a coisa acontecer no outro',
    q:'O que eu falo muda o que as pessoas fazem depois, e o ciclo se fecha em resultado concreto.' }
];

/* ========== ESTADO ========== */
const STORE_KEY = 'tres-poderes-v2';
const BATCH = 18;
const PLANO_LOTE = { fraco:9, geral:6, avanco:3 };
const ONDA = 6;   // quantas questoes pedimos em paralelo por vez

let state = {
  // treino
  sessions:[], mastery:{}, generated:[], lastDay:null, resting:false,
  timerInterval:null, startTime:null, elapsedMs:0, running:false,
  currentEx:null, adaptNote:'', lastId:null, rankTab:'sessao', generating:false,
  // leis
  leis:{}, leisGen:{},   // progresso e questoes geradas por modulo
  modAtual:null, modIdx:0, modShuf:null, exShuf:null,
  // eneagrama
  enea:null, eneaHist:[]   // resultado atual e todos os testes anteriores
};
let pendingContext = null;
let pendingMod = null;
let API_OK = null;

/* ========== PERSISTÊNCIA ========== */
function snapshot(){
  return { v:2, sessions:state.sessions, mastery:state.mastery, generated:state.generated,
    lastDay:state.lastDay, resting:state.resting, leis:state.leis, leisGen:state.leisGen, enea:state.enea, eneaHist:state.eneaHist };
}
async function persist(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(snapshot())); }
  catch(e){ console.error('Falha ao salvar', e); }
}
async function loadProgress(){
  try{
    const raw = localStorage.getItem(STORE_KEY) || localStorage.getItem('treino-tres-poderes');
    if(raw){ const p=JSON.parse(raw);
      state.sessions=p.sessions||[]; state.mastery=p.mastery||{}; state.generated=p.generated||[];
      state.lastDay=p.lastDay||null; state.resting=!!p.resting;
      state.leis=p.leis||{}; state.leisGen=p.leisGen||{}; state.enea=p.enea||null;
      state.eneaHist=p.eneaHist||(p.enea?[p.enea]:[]); }
  }catch(e){ console.error('Falha ao carregar', e); }
}
function exportProgress(){
  const blob = new Blob([JSON.stringify(snapshot(),null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download='tres-poderes-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function importProgress(file){
  const rd=new FileReader();
  rd.onload=async()=>{
    try{
      const p=JSON.parse(rd.result);
      if(!p||!Array.isArray(p.sessions)) throw new Error('inválido');
      state.sessions=p.sessions||[]; state.mastery=p.mastery||{}; state.generated=p.generated||[];
      state.lastDay=p.lastDay||null; state.resting=!!p.resting;
      state.leis=p.leis||{}; state.leisGen=p.leisGen||{}; state.enea=p.enea||null;
      state.eneaHist=p.eneaHist||(p.enea?[p.enea]:[]);
      await persist(); renderAll(); pickNextExercise();
      if(state.currentEx) renderExercise(); else showSessionDone();
      document.getElementById('ioMsg').textContent='Progresso restaurado: '+state.sessions.length+' rodadas.';
    }catch(e){ document.getElementById('ioMsg').textContent='Não consegui ler esse arquivo.'; }
  };
  rd.readAsText(file);
}

/* Roda da Lei de Sete: as sete notas em circulo, com os dois pontos
   criticos (mi->fa e si->do) marcados em vermelho. Gira enquanto processa. */
function svgSete(tam){
  const t=tam||20, c=t/2, r=t*0.36, p=t*0.085;
  const criticos=[2,6]; // indices de Mi e Si
  let out='<svg width="'+t+'" height="'+t+'" viewBox="0 0 '+t+' '+t+'">';
  out+='<circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="none" stroke="rgba(201,162,75,0.22)" stroke-width="1"/>';
  for(let i=0;i<7;i++){
    const a=(-90 + i*(360/7))*Math.PI/180;
    const x=c+r*Math.cos(a), y=c+r*Math.sin(a);
    const crit=criticos.indexOf(i)>=0;
    out+='<circle cx="'+x.toFixed(2)+'" cy="'+y.toFixed(2)+'" r="'+(crit?p*1.25:p).toFixed(2)+
      '" fill="'+(crit?'var(--oxblood-br)':'var(--brass)')+'" opacity="'+(crit?1:(0.45+i*0.08).toFixed(2))+'"/>';
  }
  out+='</svg>';
  return out;
}
function montarRodas(){
  ['spinAval','spinLote','spinMod','spinDone','spinGen'].forEach(id=>{
    const el=document.getElementById(id);
    if(el && !el.innerHTML) el.innerHTML=svgSete(id==='spinLote'?24:20);
  });
}

/* ========== PDF DA ANAMNESE ========== */
var jspdfCarregando = null;
function carregarJsPDF(){
  if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
  if (jspdfCarregando) return jspdfCarregando;
  var fontes = [
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js'
  ];
  function tentar(i){
    return new Promise(function(resolve, reject){
      if (i >= fontes.length){ reject(new Error('não consegui carregar o gerador de PDF')); return; }
      var el = document.createElement('script');
      el.src = fontes[i];
      el.onload = function(){
        if (window.jspdf && window.jspdf.jsPDF) resolve();
        else tentar(i+1).then(resolve, reject);
      };
      el.onerror = function(){ tentar(i+1).then(resolve, reject); };
      document.head.appendChild(el);
    });
  }
  jspdfCarregando = tentar(0).catch(function(e){ jspdfCarregando = null; throw e; });
  return jspdfCarregando;
}

function txt(id){ const el=document.getElementById(id); return el? el.textContent.trim() : ''; }

function montarPdfEnea(e){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const M=48, W=595.28-M*2;
  let y=M;
  const COR_BRASS=[176,138,58], COR_TXT=[40,34,28], COR_DIM=[110,102,90];

  function novaPaginaSeNecessario(alturaExtra){
    if(y+alturaExtra > 841.89-M){ doc.addPage(); y=M; }
  }
  function titulo(texto){
    novaPaginaSeNecessario(40);
    doc.setFont('helvetica','bold'); doc.setFontSize(16); doc.setTextColor(...COR_TXT);
    doc.text(texto, M, y); y+=22;
  }
  function subtitulo(texto){
    novaPaginaSeNecessario(20);
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(...COR_DIM);
    doc.text(texto, M, y); y+=18;
  }
  function h(texto){
    novaPaginaSeNecessario(26);
    y+=8;
    doc.setFont('helvetica','bold'); doc.setFontSize(11.5); doc.setTextColor(...COR_BRASS);
    doc.text(texto.toUpperCase(), M, y); y+=14;
    doc.setDrawColor(...COR_BRASS); doc.setLineWidth(0.6);
    doc.line(M, y-9, M+W, y-9);
  }
  function par(texto, opts){
    if(!texto) return;
    opts=opts||{};
    doc.setFont('helvetica', opts.bold?'bold':'normal'); doc.setFontSize(opts.size||10.3);
    doc.setTextColor(...(opts.dim?COR_DIM:COR_TXT));
    const linhas=doc.splitTextToSize(texto, W);
    linhas.forEach(l=>{
      novaPaginaSeNecessario(14);
      doc.text(l, M, y); y+=14;
    });
    y+=8;
  }
  function barra(label, valor, max, cor){
    novaPaginaSeNecessario(16);
    doc.setFont('helvetica','normal'); doc.setFontSize(9.3); doc.setTextColor(...COR_TXT);
    doc.text(label, M, y);
    const bx=M+150, bw=W-150-34, bh=5;
    doc.setFillColor(238,233,222); doc.rect(bx, y-4, bw, bh, 'F');
    const pct=Math.max(0,Math.min(1, valor/max));
    doc.setFillColor(...cor); doc.rect(bx, y-4, bw*pct, bh, 'F');
    doc.setTextColor(...COR_DIM); doc.setFontSize(8.6);
    doc.text(valor+'/'+max, bx+bw+6, y);
    y+=15;
  }

  titulo('Anamnese do Eneagrama');
  subtitulo('Teste realizado em '+new Date(e.data).toLocaleDateString('pt-BR')+'  ·  Três Poderes');
  y+=6;

  h('Centro predominante — '+txt('resCentro'));
  par(txt('anamCentro'));
  par(txt('anamCentroLim'));
  par('Risco deste perfil: '+txt('anamCentroRisco'));

  (function fichaCentroPdf(){
    const C=CENTRO_DEEP[e.centro]; if(!C) return;
    const campos=[['Função',C.funcao],['Alimento',C.alimento],['Sede de comando',C.sede],['Densidade',C.densidade],
      ['Êxito',C.exito],['Desempenho',C.desempenho],['Maior revelação',C.revelacao]];
    novaPaginaSeNecessario(140);
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...COR_BRASS);
    campos.forEach(c=>{
      novaPaginaSeNecessario(24);
      doc.text(c[0].toUpperCase(), M, y);
      doc.setFont('helvetica','normal'); doc.setTextColor(...COR_TXT); doc.setFontSize(10.5);
      const linhas=doc.splitTextToSize(String(c[1]), W-140);
      doc.text(linhas, M+140, y);
      y += Math.max(16, linhas.length*13);
      doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...COR_BRASS);
    });
    y+=6;
    par('O que significa cada campo: Função é o que esse centro faz por você. Alimento é o que ele processa pra funcionar bem. Sede de comando é onde ele fica baseado no corpo. Densidade vem da cosmologia do livro, um número que mede o quão sutil é a matéria que esse centro usa, quanto menor o número, mais fino; "material solar" significa que ele opera numa matéria tão fina quanto a do próprio Sol, nesse sistema. Êxito é o resultado que ele entrega quando funciona bem. Desempenho é a qualidade que ele desenvolve com o uso. Maior revelação é o insight mais alto que ele pode te dar.', {dim:true});
  })();

  h('Distribuição dos três centros');
  const cc=e.centros||{mental:0,emocional:0,corporal:0};
  barra('Mental', cc.mental||0, 9, [176,138,58]);
  barra('Emocional', cc.emocional||0, 9, [163,58,53]);
  barra('Corporal', cc.corporal||0, 9, [90,84,74]);
  y+=6;
  par(txt('anamCentroDist'));

  h('Onde a oitava quebra — '+txt('resNota'));
  par(txt('anamNotaFuncao'), {bold:true});
  par('Como aparece em você: '+txt('anamNotaQuebra'));
  par('Origem provável: '+txt('anamNotaOrigem'));
  par('Correção: '+txt('anamNotaCorrecao'));
  par(txt('anamCritico'), {dim:true});

  h('Mapa da sua oitava');
  novaPaginaSeNecessario(210);
  (function desenharEneagramaPdf(){
    const diagCx=M+W/2, diagCy=y+92, diagR=78;
    const posPdf=n=>{ const a=(-90+n*40)*Math.PI/180; return {x:diagCx+diagR*Math.cos(a), y:diagCy+diagR*Math.sin(a)}; };
    const Ppdf={}; for(let i=1;i<=9;i++) Ppdf[i]=posPdf(i);
    const triPdf=[3,6,9], hexPdf=[1,4,2,8,5,7];
    doc.setDrawColor(222,216,202); doc.setLineWidth(0.6);
    doc.circle(diagCx, diagCy, diagR, 'S');
    doc.setDrawColor(176,138,58); doc.setLineWidth(0.9);
    for(let i=0;i<3;i++) doc.line(Ppdf[triPdf[i]].x, Ppdf[triPdf[i]].y, Ppdf[triPdf[(i+1)%3]].x, Ppdf[triPdf[(i+1)%3]].y);
    doc.setDrawColor(163,58,53); doc.setLineWidth(0.7);
    for(let i=0;i<6;i++) doc.line(Ppdf[hexPdf[i]].x, Ppdf[hexPdf[i]].y, Ppdf[hexPdf[(i+1)%6]].x, Ppdf[hexPdf[(i+1)%6]].y);
    const ordemPdf=['Dó','Ré','Mi','Fá','Sol','Lá','Si'], idxPontoPdf=[9,1,2,4,5,7,8];
    for(let i=1;i<=9;i++){
      const oi=idxPontoPdf.indexOf(i), nota= oi>=0 ? ordemPdf[oi] : null;
      let cor=[210,204,190], raio=2.2;
      if(nota===e.quebra){ cor=[214,58,47]; raio=5.5; }
      else if(nota){ cor=[176,138,58]; raio=3; }
      doc.setFillColor(cor[0],cor[1],cor[2]);
      doc.circle(Ppdf[i].x, Ppdf[i].y, raio, 'F');
    }
    y = diagCy + diagR + 22;
  })();
  par('O ponto vermelho, maior que os outros, marca exatamente onde a sua oitava quebra: nota '+(e.quebra||'—')+'.', {dim:true});

  h('Perfil das sete notas');
  TESTE_OITAVA.forEach(function(n){
    const v=(e.notas && e.notas[n.nota]) || 0;
    const cor= v<=2 ? [163,58,53] : (v>=4 ? [110,140,95] : [176,138,58]);
    barra(n.nota+' · '+n.nome, v, 5, cor);
  });
  y+=4;
  par(txt('anamTrecho'));

  h('Cruzamento: centro e trecho');
  par(txt('anamCruz'));

  h('O que é o choque consciente');
  document.querySelectorAll('.anam').forEach(function(bloco){
    const hh=bloco.querySelector('h4');
    if(hh && hh.textContent.indexOf('choque')>=0){
      bloco.querySelectorAll('p').forEach(function(pp){ par(pp.textContent.trim()); });
    }
  });

  novaPaginaSeNecessario(30);
  y+=10;
  doc.setDrawColor(220,214,200); doc.setLineWidth(0.4); doc.line(M,y,M+W,y); y+=16;
  doc.setFont('helvetica','italic'); doc.setFontSize(8.6); doc.setTextColor(...COR_DIM);
  doc.text('Gerado pelo app Três Poderes, baseado no livro "Conheça e Aprimore Seus Três Poderes".', M, y);
  return doc;
}

async function gerarPdfEnea(){
  const e=state.enea; if(!e) return;
  const btn=document.getElementById('eneaPdf'), msg=document.getElementById('eneaPdfMsg');
  msg.style.display='none';
  btn.disabled=true; const rotuloOrig=btn.textContent; btn.textContent='Preparando...';
  try{
    await carregarJsPDF();
    btn.textContent='Montando o PDF...';
    const doc = montarPdfEnea(e);
    const nomeArq='anamnese-eneagrama-'+new Date(e.data).toISOString().slice(0,10)+'.pdf';
    doc.save(nomeArq);
  }catch(err){
    console.error('Falha ao gerar PDF', err);
    msg.innerHTML='<strong>Não consegui montar o PDF.</strong> Tente de novo em instantes.';
    msg.style.display='block';
  }finally{
    btn.disabled=false; btn.textContent=rotuloOrig;
  }
}

/* ========== BACKEND ========== */

/* Extrai JSON mesmo quando o modelo enfeita a resposta com preambulo,
   cercas de markdown ou comentario depois do objeto. */
function extrairJSON(texto){
  if(!texto) throw new Error('resposta vazia');
  var t=String(texto).replace(/\`\`\`json/gi,'').replace(/\`\`\`/g,'').trim();
  try{ return JSON.parse(t); }catch(e){}
  var ini=t.indexOf('{'), fim=t.lastIndexOf('}');
  if(ini>=0 && fim>ini){
    var corte=t.slice(ini, fim+1);
    try{ return JSON.parse(corte); }catch(e){}
    try{ return JSON.parse(corte.replace(/,\\s*([}\\]])/g,'$1')); }catch(e){}
  }
  var fim2=t.trim().slice(-1);
  if(fim2!=='}' && fim2!==']') throw new Error('resposta truncada pelo limite de tamanho');
  throw new Error('resposta fora do formato JSON');
}

/* Pede ao modelo e insiste uma vez se o formato vier errado. */
async function pedirJSON(prompt, validar, tarefa){
  var ultimo=null;
  for(var tentativa=0; tentativa<2; tentativa++){
    var extra = tentativa===0 ? '' :
      '\\n\\nIMPORTANTE: sua resposta anterior nao veio em JSON puro. Responda APENAS com o objeto JSON, comecando com { e terminando com }, sem nenhuma palavra antes ou depois, sem cercas de markdown.';
    var texto = await askModel(prompt + extra, tarefa);
    try{
      var obj = extrairJSON(texto);
      if(validar && !validar(obj)) throw new Error('campos faltando na resposta');
      return obj;
    }catch(e){ ultimo=e; }
  }
  throw ultimo || new Error('formato inesperado');
}

async function askModel(prompt, tarefa){
  const res = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ prompt, tarefa: tarefa || 'gerar' }) });
  if(!res.ok){ API_OK=false; updateApiBadge(); throw new Error('backend '+res.status); }
  const data = await res.json();
  if(data.error){ API_OK=false; updateApiBadge(); throw new Error(data.error); }
  const text=(data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\\n');
  if(!text) throw new Error('resposta vazia');
  API_OK=true; updateApiBadge(); return text;
}
function updateApiBadge(){
  const el=document.getElementById('apiBadge'); if(!el) return;
  if(API_OK===true){ el.textContent='IA ativa'; el.className='api-badge on'; }
  else if(API_OK===false){ el.textContent='IA off · avaliação manual'; el.className='api-badge off'; }
  else { el.textContent=''; el.className='api-badge'; }
}
async function pingBackend(){
  try{ const r=await fetch('/api/claude',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ping:true})}); API_OK=r.ok; }
  catch(e){ API_OK=false; }
  updateApiBadge();
}
async function judge(promptTxt, criterio, resposta, eixo){
  const p='Voce e um avaliador rigoroso e direto, sem elogio vazio.\\n\\n'+
    'Exercicio'+(eixo?' (eixo '+eixo+')':'')+': "'+promptTxt+'"\\n\\n'+
    'Criterio / resposta correta: "'+criterio+'"\\n\\n'+
    'Resposta do usuario: "'+resposta+'"\\n\\n'+
    'Avalie: 1) atende ao criterio? 2) foi escrita com conviccao direta ou com hesitacao ("acho que", "talvez", ressalva excessiva)?\\n\\n'+
    'Responda SOMENTE em JSON, sem markdown:\\n'+
    '{"correct": true, "conviction": "convicto", "feedback": "uma frase curta e direta, maximo 20 palavras"}';
  return await pedirJSON(p, function(o){ return typeof o.correct==='boolean' && !!o.conviction; }, 'avaliar');
}

/* ========== EMBARALHAR ALTERNATIVAS ==========
   Sem isso 69% das respostas caíam na letra B, e a pessoa se educa a chutar B. */
function embaralhar(item){
  const n=item.options.length;
  const ordem=Array.from({length:n},(_,i)=>i);
  for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [ordem[i],ordem[j]]=[ordem[j],ordem[i]]; }
  return { ordem, options: ordem.map(i=>item.options[i]), correta: ordem.indexOf(item.correctIndex) };
}

/* ========== TREINO: núcleo ========== */
function allExercises(){ return EXERCISES.concat(state.generated); }
function isSolved(id){ const m=state.mastery[id]; return !!(m&&m.solved); }
function openPool(){
  const todos=allExercises();
  if(state.revisando) return todos;
  return todos.filter(e=>!isSolved(e.id));
}
function formatTime(ms){ const t=ms/1000,m=Math.floor(t/60),s=(t%60).toFixed(1);
  return String(m).padStart(2,'0')+':'+String(s).padStart(4,'0'); }
function dayKey(iso){ return new Date(iso).toLocaleDateString('pt-BR'); }

function axisStats(){
  const ax={ raciocinio:{n:0,sum:0,label:'Raciocínio'}, discernimento:{n:0,sum:0,label:'Discernimento'}, influencia:{n:0,sum:0,label:'Influência'} };
  state.sessions.forEach(x=>{ if(ax[x.cat]){ ax[x.cat].n++; ax[x.cat].sum+=x.nota; } });
  Object.keys(ax).forEach(k=>{ ax[k].avg = ax[k].n ? ax[k].sum/ax[k].n : null; });
  return ax;
}
/* A nota onde a oitava quebra pertence a um dos tres eixos do treino.
   Do/Re/Mi sao mentais (raciocinio), Fa/Sol emocionais (discernimento), La/Si corporais (influencia). */
const NOTA_EIXO = { 'Dó':'raciocinio','Ré':'raciocinio','Mi':'raciocinio',
  'Fá':'discernimento','Sol':'discernimento','Lá':'influencia','Si':'influencia' };
function eixoDoEneagrama(){
  if(!state.enea || !state.enea.quebra) return null;
  return NOTA_EIXO[state.enea.quebra] || null;
}

function strongestAxis(){
  const a=axisStats();
  const tried=Object.keys(a).filter(k=>a[k].n>0);
  if(!tried.length) return null;
  return tried.sort((x,y)=>a[y].avg-a[x].avg)[0];
}

function weakestAxis(){
  const a=axisStats(); const tried=Object.keys(a).filter(k=>a[k].n>0);
  if(!tried.length) return null;
  const untried=Object.keys(a).filter(k=>a[k].n===0);
  if(untried.length) return untried[0];
  return tried.sort((x,y)=>a[x].avg-a[y].avg)[0];
}
function exerciseWeight(ex, weak){
  const m=state.mastery[ex.id]; let w;
  if(!m||!m.attempts) w=3; else if(m.lastNota<=2) w=8; else w=5;
  if(weak && ex.cat===weak) w*=1.8;
  const eixoEnea=eixoDoEneagrama();
  if(eixoEnea && ex.cat===eixoEnea) w*=1.5;
  if(ex.id===state.lastId) w*=0.15;
  return w;
}
function pickNextExercise(){
  const pool=openPool();
  if(!pool.length){ state.currentEx=null; state.adaptNote=''; return; }
  const weak=weakestAxis();
  const ws=pool.map(e=>exerciseWeight(e,weak));
  const tot=ws.reduce((a,b)=>a+b,0);
  let r=Math.random()*tot, ch=pool[0];
  for(let i=0;i<pool.length;i++){ r-=ws[i]; if(r<=0){ ch=pool[i]; break; } }
  state.currentEx=ch;
  const m=state.mastery[ch.id], a=axisStats();
  if(ch.variantOf) state.adaptNote='Mesma habilidade, outro contexto. Da primeira vez você acertou hesitando ou devagar.';
  else if(ch.generated && ch.modo==='avanco') state.adaptNote='Nível avançado. '+ch.catLabel+' já é seu ponto forte, então aqui a régua sobe pra não estagnar.';
  else if(ch.generated && ch.modo==='geral') state.adaptNote='Aprimoramento geral em '+ch.catLabel+'. Não mira um ponto fraco, exercita a habilidade por inteiro.';
  else if(ch.generated) state.adaptNote='Criado sob medida para o seu eixo mais fraco: '+ch.catLabel+'.';
  else if(m&&m.lastNota<=2) state.adaptNote='Errado da última vez ('+m.lastNota+'/7). Erro recente volta primeiro.';
  else if(m&&m.attempts) state.adaptNote='Ainda não fechou: '+m.lastNota+'/7 na última tentativa.';
  else if(weak&&ch.cat===weak&&a[weak].n>0) state.adaptNote='Priorizando '+ch.catLabel+', seu eixo mais baixo (média '+a[weak].avg.toFixed(1)+'/7).';
  else if(eixoDoEneagrama()===ch.cat && state.enea) state.adaptNote='Ligado ao seu eneagrama: sua oitava quebra em '+state.enea.quebra+', que trabalha '+ch.catLabel+'.';
  else state.adaptNote='';
  if(state.revisando) state.adaptNote='Modo revisão. Este exercício você já resolveu antes, e agora só vale como treino.';
}
function currentExercise(){ if(!state.currentEx) pickNextExercise(); return state.currentEx; }

function exerciseUI(show){
  ['promptText','timerDisplay','answerInput','choiceRow'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.style.display = show?'':'none'; });
  document.querySelector('#exerciseCard .meta-row').style.display = show?'':'none';
  document.querySelector('#exerciseCard .btn-row').style.display = show?'':'none';
  if(!show) document.getElementById('adaptNote').style.display='none';
}
function showSessionDone(){
  clearInterval(state.timerInterval); state.running=false;
  exerciseUI(false);
  document.getElementById('resultSection').style.display='none';
  document.getElementById('sessionDone').style.display='block';
  const todayK=new Date().toLocaleDateString('pt-BR');
  const today=state.sessions.filter(x=>dayKey(x.date)===todayK);
  const pts=today.reduce((a,b)=>a+b.nota,0);
  const solved=Object.values(state.mastery).filter(m=>m.solved).length;
  if(state.resting){
    document.getElementById('sdTitle').textContent='Sessão encerrada';
    document.getElementById('sdText').innerHTML='Hoje você fechou <strong>'+pts+'</strong> ponto(s) em <strong>'+today.length+
      '</strong> rodada(s). Total resolvido: <strong>'+solved+'</strong>. Na próxima sessão eu trago questões inéditas, nenhuma repetida.';
    document.getElementById('sdContinue').textContent='Mudei de ideia, continuar';
    document.getElementById('sdRest').style.display='none';
  } else {
    document.getElementById('sdTitle').textContent='Você respondeu todas desta vez';
    document.getElementById('sdText').innerHTML='Nada repetido, nada pendente. Foram <strong>'+pts+'</strong> ponto(s) hoje em <strong>'+
      today.length+'</strong> rodada(s). Quer continuar agora com questões novas, ou esperar até a próxima sessão?';
    document.getElementById('sdContinue').textContent='Continuar agora';
    document.getElementById('sdRest').style.display='';
  }
}
function hideSessionDone(){ document.getElementById('sessionDone').style.display='none'; exerciseUI(true); }

function renderExercise(){
  const ex=currentExercise();
  document.getElementById('resultSection').style.display='none';
  document.getElementById('loadingBlock').style.display='none';
  document.getElementById('fallbackRate').style.display='none';
  document.getElementById('treinoNextRow').style.display='none';
  if(!ex){ showSessionDone(); return; }
  hideSessionDone();
  document.getElementById('startBtn').disabled=false;
  document.getElementById('startBtn').textContent='Iniciar';
  document.getElementById('promptText').textContent=ex.prompt;
  document.getElementById('answerText').textContent=ex.answer;
  const b=document.getElementById('categoryBadge');
  b.textContent=ex.catLabel; b.className='badge '+ex.cat;
  document.getElementById('metaRight').textContent=(ex.fonte||'Sob medida')+' · '+(ex.type==='multipla'?'escolha':'resposta livre')+' · rodada '+(state.sessions.length+1);
  const an=document.getElementById('adaptNote');
  if(state.adaptNote){ an.textContent=state.adaptNote; an.style.display='block'; } else an.style.display='none';
  document.getElementById('timerDisplay').textContent='00:00.0';
  document.getElementById('timerDisplay').className='timer';
  const input=document.getElementById('answerInput'), row=document.getElementById('choiceRow');
  if(ex.type==='multipla'){
    input.style.display='none'; row.style.display='flex';
    state.exShuf=embaralhar(ex);
    row.innerHTML=state.exShuf.options.map((o,i)=>'<button class="choice-btn" data-idx="'+i+'" disabled><span class="letter">'+String.fromCharCode(65+i)+'</span>'+o+'</button>').join('');
    row.querySelectorAll('.choice-btn').forEach(bt=>bt.addEventListener('click',()=>handleChoice(parseInt(bt.dataset.idx,10))));
  } else {
    input.style.display='block'; input.value=''; input.disabled=true;
    input.placeholder='Escreva sua resposta aqui. Clique em Iniciar antes de começar.';
    row.style.display='none'; row.innerHTML='';
  }
  state.running=false; state.elapsedMs=0; clearInterval(state.timerInterval);
}
function startTimer(){
  if(window.precisaAssinar && window.precisaAssinar()){ if(window.mostrarPaywall) window.mostrarPaywall(); return; }
  const ex=currentExercise(); if(!ex) return;
  if(state.running){ if(ex.type!=='multipla') submitAnswer(); return; }
  state.running=true; state.startTime=Date.now()-state.elapsedMs;
  if(ex.type==='multipla'){
    document.querySelectorAll('#choiceRow .choice-btn').forEach(b=>b.disabled=false);
    document.getElementById('startBtn').disabled=true;
  } else {
    document.getElementById('answerInput').disabled=false;
    document.getElementById('answerInput').focus();
    document.getElementById('startBtn').textContent='Avaliar resposta';
  }
  state.timerInterval=setInterval(()=>{ state.elapsedMs=Date.now()-state.startTime;
    document.getElementById('timerDisplay').textContent=formatTime(state.elapsedMs); },100);
}
function tempoBand(ms){ const s=ms/1000; if(s<45) return 3; if(s<=120) return 2; if(s<=240) return 1; return 0; }

function handleChoice(idx){
  if(window.precisaAssinar && window.precisaAssinar()){ if(window.mostrarPaywall) window.mostrarPaywall(); return; }
  clearInterval(state.timerInterval); state.running=false;
  document.getElementById('timerDisplay').className='timer stopped';
  const ex=currentExercise(), sh=state.exShuf;
  const corr= sh? sh.correta : ex.correctIndex;
  document.querySelectorAll('#choiceRow .choice-btn').forEach((b,i)=>{
    b.disabled=true;
    if(i===corr) b.classList.add('correct'); else if(i===idx) b.classList.add('wrong'); });
  const ok=idx===corr;
  document.getElementById('resultSection').style.display='block';
  document.getElementById('errorNote').innerHTML='';
  document.getElementById('verdictBlock').innerHTML='<span class="verdict '+(ok?'ok':'no')+'">'+(ok?'Correto':'Incorreto')+'</span>';
  document.getElementById('feedbackText').textContent= ok?'Direto na resposta certa.':'Não foi essa. O critério está abaixo.';
  finalizeSession(ex, tempoBand(state.elapsedMs), ok?4:0);
}
async function submitAnswer(){
  clearInterval(state.timerInterval); state.running=false;
  document.getElementById('timerDisplay').className='timer stopped';
  const txt=document.getElementById('answerInput').value.trim();
  if(!txt){
    document.getElementById('answerInput').placeholder='Escreva alguma coisa antes de avaliar.';
    state.running=true;
    state.timerInterval=setInterval(()=>{ state.elapsedMs=Date.now()-state.startTime;
      document.getElementById('timerDisplay').textContent=formatTime(state.elapsedMs); },100);
    return;
  }
  document.getElementById('answerInput').disabled=true;
  document.getElementById('startBtn').disabled=true;
  document.getElementById('loadingBlock').style.display='block';
  const ex=currentExercise(), tB=tempoBand(state.elapsedMs);
  try{ showResult(ex,tB, await judge(ex.prompt, ex.answer, txt, ex.catLabel), null); }
  catch(e){ console.error(e); showResult(ex,tB,null,'Não consegui avaliar automaticamente agora.'); }
}
function showResult(ex,tB,ai,err){
  document.getElementById('loadingBlock').style.display='none';
  document.getElementById('resultSection').style.display='block';
  if(err){
    document.getElementById('errorNote').innerHTML='<div class="error-note">'+err+'</div>';
    document.getElementById('verdictBlock').innerHTML='';
    document.getElementById('feedbackText').textContent='';
    document.getElementById('fallbackRate').style.display='block';
    pendingContext={ex,tB}; return;
  }
  document.getElementById('errorNote').innerHTML='';
  document.getElementById('fallbackRate').style.display='none';
  const aB= ai.correct ? (ai.conviction==='convicto'?4:3) : 0;
  document.getElementById('verdictBlock').innerHTML='<span class="verdict '+(ai.correct?'ok':'no')+'">'+
    (ai.correct?'Correto':'Não bateu com o critério')+' · '+(ai.conviction==='convicto'?'convicto':'hesitante')+'</span>';
  document.getElementById('feedbackText').textContent=ai.feedback||'';
  finalizeSession(ex,tB,aB);
}
async function finalizeSession(ex,tB,aB){
  const nota=tB+aB, acertou=aB>=3;
  const m=state.mastery[ex.id]||{attempts:0,lastNota:0,best:0,solved:false};
  m.attempts++; m.lastNota=nota; m.best=Math.max(m.best,nota);
  if(acertou) m.solved=true;
  state.mastery[ex.id]=m; state.lastId=ex.id;
  state.lastDay=new Date().toLocaleDateString('pt-BR'); state.resting=false;
  state.sessions.push({ date:new Date().toISOString(), exerciseId:ex.id, cat:ex.cat, catLabel:ex.catLabel,
    elapsedMs:state.elapsedMs, tempoBand:tB, assertBand:aB, nota });
  await persist();
  sincronizarProgresso();
  tiltBeam(nota); renderAll();
  if(acertou && (aB===3||tB<=1) && !state.generating) generateExercise(ex);
  // sem avanço automático: o resultado fica na tela até você mandar seguir
  document.getElementById('treinoNextRow').style.display='flex';
  const r=document.getElementById('resultSection');
  if(r && r.scrollIntoView) r.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function proximoExercicio(){
  document.getElementById('treinoNextRow').style.display='none';
  pickNextExercise();
  renderExercise();
  const c=document.getElementById('exerciseCard');
  if(c && c.scrollIntoView) c.scrollIntoView({behavior:'smooth', block:'start'});
}
function tiltBeam(nota){
  document.getElementById('beam').style.transform='rotate('+(((nota-3.5)/3.5)*15)+'deg)';
  document.getElementById('notaValue').textContent=nota;
  const c={7:'Ciclo completo. O infinito se fecha nesse aqui.',6:'Harmonia quase plena, um passo do ciclo.',
    5:'Bom equilíbrio, ainda falta afinar um lado.',4:'Ponto médio, eixo ainda se firmando.',
    3:'Ignição: a faísca está aí, falta sustentar.',2:'Ainda descompassado, mas o terreno é firme.',
    1:'Base baixa hoje, sem drama.',0:'Zerado. Só serve de chão pra subir.'};
  document.getElementById('scaleCaption').textContent=c[nota]||'';
}

/* ========== GERAÇÃO ========== */
/* Retrato do usuario a partir de TODAS as frentes: treino, leis e eneagrama.
   Serve para gerar tanto reforco do ponto fraco quanto evolucao do ponto forte. */
function dossie(){
  const a=axisStats();
  const linhas=[];

  const eixos=Object.keys(a).filter(k=>a[k].n>0)
    .map(k=>a[k].label+' media '+a[k].avg.toFixed(1)+'/7 em '+a[k].n+' exercicios');
  if(eixos.length) linhas.push('Desempenho por eixo no treino: '+eixos.join('; ')+'.');

  const n=state.sessions.length;
  if(n>=3){
    const t=state.sessions.reduce((x,y)=>x+y.tempoBand,0)/n/3;
    const c=state.sessions.reduce((x,y)=>x+y.assertBand,0)/n/4;
    if(t-c>0.18) linhas.push('Padrao observado: responde rapido porem erra ou hesita. O gargalo e clareza, nao velocidade.');
    else if(c-t>0.18) linhas.push('Padrao observado: acerta com conviccao porem demora. Falta virar reflexo.');
    else linhas.push('Padrao observado: tempo e assertividade equilibrados.');
  }

  const errados=state.sessions.filter(x=>x.nota<=2);
  if(errados.length){
    const temas=[...new Set(errados.map(x=>{
      const e=allExercises().find(y=>y.id===x.exerciseId);
      return e && e.concept ? e.concept : null;
    }).filter(Boolean))].slice(0,5);
    if(temas.length) linhas.push('Habilidades em que ja falhou: '+temas.join('; ')+'.');
  }

  const dominados=MODULOS.filter(m=>leisProg(m).done>=leisProg(m).total && leisProg(m).total>0).map(m=>m.nome);
  const pendentes=MODULOS.filter(m=>leisProg(m).done<leisProg(m).total).map(m=>m.nome+' ('+leisProg(m).done+'/'+leisProg(m).total+')');
  if(dominados.length) linhas.push('Leis ja dominadas: '+dominados.join(', ')+'.');
  if(pendentes.length) linhas.push('Leis ainda em aberto: '+pendentes.join(', ')+'. Pode ancorar o exercicio numa dessas leis.');

  if(state.enea && NOTA_INFO[state.enea.quebra]){
    const N=NOTA_INFO[state.enea.quebra], C=CENTRO_DEEP[state.enea.centro];
    linhas.push('Eneagrama: centro predominante '+C.nome+'. Risco desse perfil: '+C.risco);
    linhas.push('A oitava quebra na nota '+state.enea.quebra+' ('+N.nome+'). Essa nota e: '+N.funcao);
    linhas.push('Como a falha aparece: '+N.quebra);
    const fracas=Object.keys(state.enea.notas).filter(k=>state.enea.notas[k]<=2);
    if(fracas.length) linhas.push('Outras notas baixas na oitava: '+fracas.join(', ')+'.');
  }
  return linhas.join('\\n');
}

async function buildGenerated(baseEx, opts){
  opts = opts || {};
  const a=axisStats();
  const weak=weakestAxis()||'raciocinio';
  const modo = opts.modo || 'reforco';
  const eixoAlvo = opts.eixo || weak;
  const cat= baseEx? baseEx.cat : eixoAlvo;
  const label= baseEx? baseEx.catLabel : (a[eixoAlvo]?a[eixoAlvo].label:'Raciocínio');
  let prompt;
  if(baseEx){
    prompt='Voce cria exercicios de treino mental no espirito do livro "Conheca e Aprimore Seus Tres Poderes".\\n\\n'+
      'O usuario acertou este exercicio, mas com hesitacao ou lentidao:\\n"'+baseEx.prompt+'"\\n'+
      'Habilidade testada: '+(baseEx.concept||baseEx.catLabel)+'\\n\\n'+
      'Crie UM exercicio NOVO que teste exatamente a MESMA habilidade, com contexto e exemplo COMPLETAMENTE diferentes.\\n'+
      'Resolvivel em ate 2 minutos de cabeca, sem calculadora.\\n\\n';
    if(state.enea && NOTA_INFO[state.enea.quebra]){
      prompt+='Contexto do usuario: a oitava dele quebra na nota '+state.enea.quebra+' ('+NOTA_INFO[state.enea.quebra].nome+
        '). Se fizer sentido, aproxime o exercicio dessa habilidade.\\n\\n';
    }
  } else {
    prompt='Voce cria exercicios de treino mental no espirito do livro "Conheca e Aprimore Seus Tres Poderes" (raciocinio, discernimento, influencia).\\n\\n'+
      'DOSSIE DO USUARIO:\\n'+dossie()+'\\n\\n';
    if(modo==='geral'){
      prompt+='OBJETIVO DESTA QUESTAO: APRIMORAMENTO GERAL.\\n'+
        'Crie UM exercicio do eixo '+label+', de nivel intermediario, que exercite a habilidade de forma ampla '+
        'em vez de mirar so um ponto fraco. Resolvivel em ate 2 minutos de cabeca, sem calculadora. '+
        'Prefira contextos praticos de negocio, lideranca ou vida real.\\n\\n';
    } else if(modo==='avanco'){
      prompt+='OBJETIVO DESTA QUESTAO: EVOLUIR UM PONTO FORTE.\\n'+
        'Crie UM exercicio do eixo '+label+', que ja e um ponto forte dele. Justamente por isso o nivel deve ser MAIS DIFICIL que o normal: '+
        'exija um passo a mais de raciocinio, uma pegadinha legitima, ou a combinacao de duas ideias em vez de uma. '+
        'Nao deve ser impossivel, deve ser resolvivel em ate 3 minutos de cabeca por alguem que domina o basico do tema. '+
        'A ideia e nao deixar o ponto forte estagnar.\\n\\n';
    } else {
      prompt+='OBJETIVO DESTA QUESTAO: REFORCAR UM PONTO FRACO.\\n'+
        'Crie UM exercicio do eixo '+label+', que e onde ele esta mais fraco. '+
        'O nivel deve ser acessivel mas nao trivial: resolvivel em ate 2 minutos de cabeca, sem calculadora, '+
        'de modo que ele consiga acertar com esforco e ganhar terreno, em vez de errar de novo e desanimar.\\n\\n';
      if(state.enea && NOTA_INFO[state.enea.quebra] && NOTA_EIXO[state.enea.quebra]===eixoAlvo){
        prompt+='ATENCAO ESPECIAL: este eixo corresponde exatamente a nota onde a oitava dele quebra. '+
          'Mire a habilidade descrita no dossie, num contexto pratico e diferente dos anteriores.\\n\\n';
      }
    }
  }
  prompt+='SEJA COMPACTO: o enunciado em no maximo 60 palavras e a resposta em no maximo 60 palavras. Nada de introducao ou despedida.\\n\\n';
  const vistos=allExercises().map(e=>(e.concept||'').trim()).filter(Boolean).slice(-14);
  prompt+='NAO repita nenhum destes temas ja usados: '+(vistos.join(' | ')||'nenhum')+'.\\n\\n';
  prompt+='Responda SOMENTE em JSON, sem markdown:\\n'+
    '{"type":"livre","prompt":"enunciado curto e claro","answer":"resposta correta com raciocinio em 1-3 frases","concept":"habilidade testada"}\\n'+
    'ou:\\n'+
    '{"type":"multipla","prompt":"enunciado","options":["a","b","c"],"correctIndex":0,"answer":"explicacao curta","concept":"habilidade testada"}';
  const pj = await pedirJSON(prompt, function(o){ return !!o.prompt && !!o.answer; });
  const ex={ id:'gen-'+Date.now()+'-'+Math.random().toString(36).slice(2,7), cat, catLabel:label,
    type: pj.type==='multipla'?'multipla':'livre', prompt:pj.prompt, answer:pj.answer,
    concept: pj.concept||(baseEx?baseEx.concept:''), generated:true,
    modo: baseEx? 'variante' : modo,
    fonte: baseEx? 'Variante' : (modo==='avanco'?'Avançado':(modo==='geral'?'Amplitude':'Sob medida')),
    variantOf: baseEx?baseEx.id:null };
  if(ex.type==='multipla'){
    ex.options=pj.options||[];
    ex.correctIndex= typeof pj.correctIndex==='number'?pj.correctIndex:0;
    if(ex.options.length<2||ex.correctIndex>=ex.options.length) ex.type='livre';
  }
  return ex;
}
async function generateExercise(baseEx){
  if(state.generating) return;
  state.generating=true;
  const manual=!baseEx;
  const btn=document.getElementById('genBtn'), load=document.getElementById('genLoading');
  if(manual){ btn.disabled=true; load.style.display='block'; }
  try{
    const ex=await buildGenerated(baseEx);
    state.generated.push(ex); await persist(); renderAll();
    if(manual){
      state.resting=false; state.currentEx=ex;
      state.adaptNote='Criado agora, sob medida para o seu eixo mais fraco: '+ex.catLabel+'.';
      switchView('Treino'); renderExercise();
      document.getElementById('exerciseCard').scrollIntoView({behavior:'smooth',block:'start'});
    }
  }catch(e){
    console.error(e);
    if(manual){ load.textContent='Não consegui gerar agora. Tente de novo em instantes.';
      setTimeout(()=>{ load.textContent='Criando exercício sob medida'; },3000); }
  }finally{
    state.generating=false;
    if(manual){ btn.disabled=false; load.style.display='none'; }
  }
}
function mostrarAviso(html){
  const a=document.getElementById('sdAviso');
  a.innerHTML=html; a.style.display='block';
  document.getElementById('sdRevisarRow').style.display='flex';
}
function limparAviso(){
  document.getElementById('sdAviso').style.display='none';
  document.getElementById('sdRevisarRow').style.display='none';
}
async function generateBatch(){
  if(state.generating) return;
  state.generating=true;
  limparAviso();
  const load=document.getElementById('sdLoading');
  load.style.display='block';
  document.getElementById('sdContinue').disabled=true;
  document.getElementById('sdRest').disabled=true;

  const fraco=weakestAxis()||'raciocinio';
  const forte=strongestAxis()||fraco;
  const eixos=['raciocinio','discernimento','influencia'];

  // monta o plano: reforco do ponto fraco, amplitude geral, avanco no ponto forte
  const plano=[];
  for(let i=0;i<PLANO_LOTE.fraco;i++) plano.push({modo:'reforco', eixo:fraco});
  for(let i=0;i<PLANO_LOTE.geral;i++) plano.push({modo:'geral', eixo:eixos[i%3]});
  for(let i=0;i<PLANO_LOTE.avanco;i++) plano.push({modo:'avanco', eixo:forte});

  const total=plano.length;
  document.getElementById('progTotal').textContent=total;
  let feito=0, ok=0, falhas=0;
  const atualizar=(texto)=>{
    document.getElementById('progFeito').textContent=ok;
    document.getElementById('progFill').style.width=((feito/total)*100)+'%';
    if(texto) document.getElementById('progNota').textContent=texto;
  };
  const rotulo={reforco:'reforçando seu ponto fraco', geral:'ampliando o repertório', avanco:'subindo a régua no ponto forte'};
  atualizar('começando');

  let ultimoErro=null;
  try{
    for(let i=0;i<plano.length;i+=ONDA){
      const onda=plano.slice(i,i+ONDA);
      atualizar(rotulo[onda[0].modo]||'');
      const res=await Promise.all(onda.map(cfg=>
        buildGenerated(null,cfg).catch(e=>{ ultimoErro=e; return null; })
      ));
      res.forEach(ex=>{ feito++; if(ex){ ok++; state.generated.push(ex); } else falhas++; });
      atualizar();
      if(ok) await persist();   // salva o que ja veio, nada se perde
    }

    if(ok){
      state.resting=false; state.revisando=false;
      await persist(); renderAll(); pickNextExercise();
      if(state.currentEx){
        renderExercise();
        if(falhas) console.warn(falhas+' questões falharam, '+ok+' entraram');
        return;
      }
    }
    throw ultimoErro || new Error('nenhuma questão gerada');
  }catch(e){
    console.error('Falha ao gerar lote', e);
    const msg=String((e && e.message)||'');
    const semChave = API_OK===false || /ANTHROPIC_API_KEY/i.test(msg) || /backend (5\\d\\d|401|403)/i.test(msg);
    if(semChave){
      mostrarAviso('<strong>A geração de questões precisa da chave da IA.</strong> Nas configurações do Worker, adicione a variável <code>ANTHROPIC_API_KEY</code> e publique de novo. Enquanto isso, dá para revisar o que você já resolveu.');
    } else {
      mostrarAviso('<strong>Não consegui preparar as questões agora.</strong> Tente de novo, costuma funcionar na segunda. Se insistir, dá para revisar o que já resolveu.<br><span style="opacity:.6; font-size:11px;">Motivo: '+msg.slice(0,80)+'</span>');
    }
  }finally{
    state.generating=false; load.style.display='none';
    document.getElementById('progFill').style.width='0%';
    document.getElementById('progNota').textContent='';
    document.getElementById('sdContinue').disabled=false;
    document.getElementById('sdRest').disabled=false;
  }
}

function entrarRevisao(){
  state.revisando=true;
  limparAviso();
  pickNextExercise();
  renderExercise();
}

/* ========== LEIS ========== */
function modItens(mod){
  const g = (state.leisGen && state.leisGen[mod.id]) ? state.leisGen[mod.id] : [];
  return mod.itens.concat(g);
}
function leisProg(mod){
  const d = state.leis[mod.id] && state.leis[mod.id].done ? state.leis[mod.id].done : [];
  const tot = modItens(mod).length;
  return { done:d.length, total:tot, pct: tot? (d.length/tot)*100 : 0, lista:d };
}
function renderModList(){
  const wrap=document.getElementById('modList');
  wrap.innerHTML = MODULOS.map(m=>{
    const p=leisProg(m);
    const cls = p.done>=p.total ? 'mod-card done' : 'mod-card';
    return '<button class="'+cls+'" data-mod="'+m.id+'">'+
      '<span class="mod-glifo">'+m.glifo+'</span>'+
      '<span class="mod-nome">'+m.nome+'</span>'+
      '<span class="mod-sub">'+m.sub+'</span>'+
      '<span class="mod-prog">'+p.done+'/'+p.total+(p.done>=p.total?' ✓':'')+'</span>'+
      '<span class="mod-track"><span class="mod-fill" style="width:'+p.pct+'%"></span></span></button>';
  }).join('');
  wrap.querySelectorAll('.mod-card').forEach(b=> b.addEventListener('click',()=> abrirModulo(b.dataset.mod)));
  const total=MODULOS.reduce((a,m)=>a+leisProg(m).total,0);
  const feitos=MODULOS.reduce((a,m)=>a+leisProg(m).done,0);
  const doLivro=MODULOS.reduce((a,m)=>a+m.itens.filter(i=>i.f==='Livro').length,0);
  document.getElementById('leisBanner').innerHTML= feitos===0
    ? 'Cinco módulos, <strong>'+total+'</strong> questões, sendo '+doLivro+' do próprio autor e o resto aplicado ao dia a dia. O que você acerta sai da lista, e o banco cresce quando acaba.'
    : '<strong>'+feitos+'</strong> de '+total+' questões dominadas. O que você acerta não volta, e quando o módulo esgota eu gero questões novas.';
}
function pendentes(mod){
  const p=leisProg(mod);
  return modItens(mod).map((it,i)=>i).filter(i=>!p.lista.includes(i));
}
function abrirModulo(id){
  const mod=MODULOS.find(m=>m.id===id); if(!mod) return;
  state.modAtual=mod;
  const pend=pendentes(mod);
  if(!pend.length){ mostrarModDone(mod); return; }
  state.modIdx=pend[0];
  document.getElementById('leisIndex').style.display='none';
  document.getElementById('leisDone').style.display='none';
  document.getElementById('leisModulo').style.display='block';
  renderModItem();
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderModItem(){
  const mod=state.modAtual, it=modItens(mod)[state.modIdx];
  const p=leisProg(mod);
  document.getElementById('modBadge').textContent=mod.nome;
  document.getElementById('modMeta').textContent=(it.type==='multipla'?'escolha':'resposta livre')+' · '+(p.done+1)+' de '+p.total;
  document.getElementById('modResumo').textContent=mod.resumo;
  document.getElementById('modPrompt').textContent=it.prompt;
  document.getElementById('modResult').style.display='none';
  document.getElementById('modLoading').style.display='none';
  document.getElementById('modFallback').style.display='none';
  document.querySelector('#leisModulo .btn-row').style.display='flex';
  const input=document.getElementById('modInput'), row=document.getElementById('modChoices');
  if(it.type==='multipla'){
    input.style.display='none'; row.style.display='flex';
    state.modShuf=embaralhar(it);
    row.innerHTML=state.modShuf.options.map((o,i)=>'<button class="choice-btn" data-idx="'+i+'"><span class="letter">'+String.fromCharCode(65+i)+'</span>'+o+'</button>').join('');
    row.querySelectorAll('.choice-btn').forEach(b=>b.addEventListener('click',()=>modChoice(parseInt(b.dataset.idx,10))));
    document.getElementById('modSubmit').style.display='none';
  } else {
    input.style.display='block'; input.value='';
    row.style.display='none'; row.innerHTML='';
    document.getElementById('modSubmit').style.display='';
    document.getElementById('modSubmit').disabled=false;
  }
}
function modChoice(idx){
  if(window.precisaAssinar && window.precisaAssinar()){ if(window.mostrarPaywall) window.mostrarPaywall(); return; }
  const it=modItens(state.modAtual)[state.modIdx], sh=state.modShuf;
  const corr= sh? sh.correta : it.correctIndex;
  document.querySelectorAll('#modChoices .choice-btn').forEach((b,i)=>{
    b.disabled=true;
    if(i===corr) b.classList.add('correct'); else if(i===idx) b.classList.add('wrong'); });
  const ok=idx===corr;
  mostrarModResultado(ok, ok?'Certo.':'Não foi essa.', it.answer);
  if(ok) marcarModItem();
}
async function modSubmit(){
  if(window.precisaAssinar && window.precisaAssinar()){ if(window.mostrarPaywall) window.mostrarPaywall(); return; }
  const it=modItens(state.modAtual)[state.modIdx];
  const txt=document.getElementById('modInput').value.trim();
  if(!txt){ document.getElementById('modInput').placeholder='Escreva alguma coisa antes de responder.'; return; }
  document.getElementById('modSubmit').disabled=true;
  document.getElementById('modLoading').style.display='block';
  try{
    const j=await judge(it.prompt, it.answer, txt, state.modAtual.nome);
    document.getElementById('modLoading').style.display='none';
    mostrarModResultado(j.correct, j.feedback||'', it.answer, j.conviction);
    if(j.correct) marcarModItem();
  }catch(e){
    console.error(e);
    document.getElementById('modLoading').style.display='none';
    mostrarModResultado(null,'','',null);
    document.getElementById('modFallback').style.display='block';
    pendingMod=true;
  }
}
function mostrarModResultado(ok, fb, resposta, conv){
  document.getElementById('modResult').style.display='block';
  document.querySelector('#leisModulo .btn-row').style.display='none';
  const v=document.getElementById('modVerdict');
  if(ok===null){ v.innerHTML='<div class="error-note">Não consegui avaliar automaticamente agora.</div>'; }
  else v.innerHTML='<span class="verdict '+(ok?'ok':'no')+'">'+(ok?'Correto':'Não bateu com o critério')+(conv?' · '+conv:'')+'</span>';
  document.getElementById('modFeedback').textContent=fb||'';
  document.getElementById('modAnswer').textContent=resposta||modItens(state.modAtual)[state.modIdx].answer;
}
async function marcarModItem(){
  const id=state.modAtual.id;
  if(!state.leis[id]) state.leis[id]={done:[]};
  if(!state.leis[id].done.includes(state.modIdx)) state.leis[id].done.push(state.modIdx);
  await persist(); renderModList(); renderPerf();
}
function modProximo(){
  const mod=state.modAtual;
  const pend=pendentes(mod);
  if(!pend.length){ mostrarModDone(mod); return; }
  const seguintes=pend.filter(i=>i>state.modIdx);
  state.modIdx = seguintes.length? seguintes[0] : pend[0];
  renderModItem();
  window.scrollTo({top:0,behavior:'smooth'});
}
function mostrarModDone(mod){
  const av=document.getElementById('doneAviso');
  if(av) av.style.display='none';
  document.getElementById('leisIndex').style.display='none';
  document.getElementById('leisModulo').style.display='none';
  document.getElementById('leisDone').style.display='block';
  document.getElementById('doneGlifo').textContent=mod.glifo;
  const restantes=MODULOS.filter(m=>leisProg(m).done<leisProg(m).total);
  document.getElementById('doneText').innerHTML= restantes.length
    ? 'Você dominou as <strong>'+leisProg(mod).total+'</strong> questões de '+mod.nome+'. Ainda faltam <strong>'+restantes.length+'</strong> módulo(s). Se quiser continuar aqui, eu gero questões inéditas sobre esta mesma lei.'
    : 'Você dominou <strong>todos os módulos</strong>. As três leis, os três centros e os quatro estados. Daqui pra frente o treino continua com questões geradas sobre as mesmas leis, sempre inéditas.';
  window.scrollTo({top:0,behavior:'smooth'});
}
function voltarModulos(){
  document.getElementById('leisModulo').style.display='none';
  document.getElementById('leisDone').style.display='none';
  document.getElementById('leisIndex').style.display='block';
  renderModList();
  window.scrollTo({top:0,behavior:'smooth'});
}

async function gerarQuestoesModulo(mod, n){
  if(state.generating) return;
  state.generating=true;
  const btn=document.getElementById('doneGerar'), load=document.getElementById('doneLoading');
  const avPrev=document.getElementById('doneAviso');
  if(avPrev) avPrev.style.display='none';
  btn.disabled=true; load.style.display='block';
  const vistos = modItens(mod).map(i=>i.prompt.slice(0,70));
  try{
    const jobs=[];
    for(let k=0;k<n;k++){
      const prompt='Voce cria questoes de estudo sobre as leis fundamentais de Gurdjieff, no espirito do livro "Conheca e Aprimore Seus Tres Poderes".\\n\\n'+
        'TEMA: '+mod.nome+' — '+mod.contexto+'\\n\\n'+
        'Crie UMA questao nova e inedita que ensine ou teste essa lei, preferindo contextos praticos de negocio, lideranca, comunicacao ou vida pessoal, e nao apenas definicoes decoradas.\\n'+
        'A questao deve ser respondivel por alguem que leu o resumo, sem exigir memorizacao de trivia.\\n\\n'+
        'SEJA COMPACTO: enunciado em no maximo 60 palavras, explicacao em no maximo 60 palavras.\\n'+
        'NAO repita nenhuma destas questoes ja existentes:\\n- '+vistos.join('\\n- ')+'\\n\\n'+
        'Responda SOMENTE em JSON, sem markdown:\\n'+
        '{"type":"multipla","prompt":"enunciado","options":["a","b","c"],"correctIndex":0,"answer":"explicacao curta ligando a lei"}\\n'+
        'ou, se for questao de reflexao aplicada:\\n'+
        '{"type":"livre","prompt":"enunciado","answer":"criterio de avaliacao em 1-2 frases"}';
      jobs.push(pedirJSON(prompt, function(o){ return !!o.prompt && !!o.answer; }));
    }
    const res=await Promise.all(jobs.map(j=>j.catch(()=>null)));
    const novos=[];
    res.filter(Boolean).forEach(pj=>{
      if(!pj.prompt||!pj.answer) return;
      const it={ f:'Gerada', type: pj.type==='multipla'?'multipla':'livre', prompt:pj.prompt, answer:pj.answer };
      if(it.type==='multipla'){
        it.options=pj.options||[];
        it.correctIndex= typeof pj.correctIndex==='number'?pj.correctIndex:0;
        if(it.options.length<2||it.correctIndex>=it.options.length) it.type='livre';
      }
      novos.push(it);
    });
    if(!novos.length) throw new Error('nada gerado');
    if(!state.leisGen[mod.id]) state.leisGen[mod.id]=[];
    state.leisGen[mod.id].push(...novos);
    await persist();
    renderModList(); renderPerf();
    abrirModulo(mod.id);
  }catch(e){
    console.error('Falha ao gerar questões do módulo', e);
    const msg=String((e && e.message)||'');
    const semChave = API_OK===false || /ANTHROPIC_API_KEY/i.test(msg) || /backend (5\\d\\d|401|403)/i.test(msg);
    const av=document.getElementById('doneAviso');
    av.innerHTML = semChave
      ? '<strong>A geração precisa da chave da IA.</strong> Nas configurações do Worker, adicione a variável <code>ANTHROPIC_API_KEY</code> e publique de novo.'
      : '<strong>Não consegui gerar agora.</strong> Tente de novo, costuma funcionar na segunda.<br><span style="opacity:.6; font-size:11px;">Motivo: '+msg.slice(0,80)+'</span>';
    av.style.display='block';
  }finally{
    state.generating=false; btn.disabled=false; load.style.display='none';
  }
}

/* ========== ENEAGRAMA ========== */
let quiz = { fase:1, idx:0, centros:{mental:0,emocional:0,corporal:0}, notas:{} };
const ESCALA=[{t:'Sempre',v:5},{t:'Quase sempre',v:4},{t:'Às vezes',v:3},{t:'Raramente',v:2},{t:'Quase nunca',v:1}];

function eneaIniciar(){
  quiz={ fase:1, idx:0, centros:{mental:0,emocional:0,corporal:0}, notas:{} };
  document.getElementById('eneaIntro').style.display='none';
  document.getElementById('eneaResult').style.display='none';
  document.getElementById('eneaQuiz').style.display='block';
  renderQuiz();
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderQuiz(){
  const total=TESTE_CENTROS.length+TESTE_OITAVA.length;
  const n = quiz.fase===1 ? quiz.idx : TESTE_CENTROS.length+quiz.idx;
  document.getElementById('eneaCount').textContent=(n+1)+' de '+total;
  document.getElementById('eneaDots').innerHTML=Array.from({length:total},(_,i)=>
    '<span class="dot '+(i<n?'done':(i===n?'now':''))+'"></span>').join('');
  const opts=document.getElementById('eneaOpts'), scale=document.getElementById('eneaScale');
  if(quiz.fase===1){
    document.getElementById('eneaPart').textContent='Parte 1 · Os três centros';
    const q=TESTE_CENTROS[quiz.idx];
    document.getElementById('eneaQ').textContent=q.q;
    opts.style.display='flex'; scale.style.display='none';
    opts.innerHTML=q.o.map((o,i)=>'<button class="choice-btn" data-c="'+o.c+'"><span class="letter">'+String.fromCharCode(65+i)+'</span>'+o.t+'</button>').join('');
    opts.querySelectorAll('.choice-btn').forEach(b=>b.addEventListener('click',()=>{
      quiz.centros[b.dataset.c]++; avancarQuiz(); }));
  } else {
    const it=TESTE_OITAVA[quiz.idx];
    document.getElementById('eneaPart').textContent='Parte 2 · '+it.nota+' · '+it.nome;
    document.getElementById('eneaQ').textContent=it.q;
    opts.style.display='none'; scale.style.display='flex';
    scale.innerHTML=ESCALA.map(e=>'<button class="scale-opt" data-v="'+e.v+'">'+e.t+'</button>').join('');
    scale.querySelectorAll('.scale-opt').forEach(b=>b.addEventListener('click',()=>{
      quiz.notas[it.nota]=parseInt(b.dataset.v,10); avancarQuiz(); }));
  }
}
function avancarQuiz(){
  if(quiz.fase===1){
    quiz.idx++;
    if(quiz.idx>=TESTE_CENTROS.length){ quiz.fase=2; quiz.idx=0; }
  } else {
    quiz.idx++;
    if(quiz.idx>=TESTE_OITAVA.length){ finalizarQuiz(); return; }
  }
  renderQuiz();
}
async function finalizarQuiz(){
  const c=quiz.centros;
  const centro=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];
  const menor=Math.min(...Object.values(quiz.notas));
  const quebra=TESTE_OITAVA.find(n=>quiz.notas[n.nota]===menor);
  state.enea={ centro, centros:{...c}, notas:{...quiz.notas}, quebra:quebra.nota, data:new Date().toISOString() };
  if(!Array.isArray(state.eneaHist)) state.eneaHist=[];
  state.eneaHist.push(JSON.parse(JSON.stringify(state.enea)));
  await persist();
  mostrarEneaResultado();
  renderPerf();
}
function trechoMaisFraco(notas){
  const soma={mental:[],emocional:[],corporal:[]};
  Object.keys(NOTA_INFO).forEach(n=>{ soma[NOTA_INFO[n].trecho].push(notas[n]||0); });
  const med={}; Object.keys(soma).forEach(k=> med[k]= soma[k].reduce((a,b)=>a+b,0)/soma[k].length );
  const ord=Object.keys(med).sort((a,b)=>med[a]-med[b]);
  return { fraco:ord[0], forte:ord[2], med };
}
function cadeiaOrigem(notas, quebra){
  // Percorre para trás até achar a primeira nota firme. A origem real é a nota seguinte a ela.
  const seq=['Dó','Ré','Mi','Fá','Sol','Lá','Si'];
  let i=seq.indexOf(quebra);
  let origem=quebra;
  while(i>0 && (notas[seq[i-1]]||0) <= 3){ i--; origem=seq[i]; }
  return { origem, local: origem===quebra };
}
function mostrarEneaResultado(){
  const e=state.enea; if(!e) return;
  document.getElementById('eneaIntro').style.display='none';
  document.getElementById('eneaQuiz').style.display='none';
  document.getElementById('eneaResult').style.display='block';

  const C=CENTRO_DEEP[e.centro];
  const N=NOTA_INFO[e.quebra];
  const dt=new Date(e.data);
  document.getElementById('resQuando').textContent='Centro predominante · teste de '+dt.toLocaleDateString('pt-BR');
  document.getElementById('resCentro').textContent=C.nome;

  document.getElementById('fichaCentro').innerHTML=
    [['Função',C.funcao],['Alimento',C.alimento],['Sede de comando',C.sede],['Densidade',C.densidade],
     ['Êxito',C.exito],['Desempenho',C.desempenho],['Maior revelação',C.revelacao]]
    .map(x=>'<div><dt>'+x[0]+'</dt><dd>'+x[1]+'</dd></div>').join('');
  document.getElementById('anamCentro').textContent=C.txt;
  document.getElementById('anamCentroLim').textContent=C.limite;
  document.getElementById('anamCentroRisco').textContent=C.risco;

  // distribuição dos três centros
  const cc=e.centros||{mental:0,emocional:0,corporal:0};
  const tot=Object.values(cc).reduce((a,b)=>a+b,0)||1;
  const cor={mental:'var(--brass)',emocional:'var(--oxblood-br)',corporal:'var(--parchment)'};
  const rot={mental:'Mental',emocional:'Emocional',corporal:'Corporal'};
  document.getElementById('centroBars').innerHTML=Object.keys(cc).map(k=>
    '<div class="cbar"><span class="cbar-n">'+rot[k]+'</span>'+
    '<span class="cbar-t"><span class="cbar-f" style="width:'+((cc[k]/tot)*100)+'%;background:'+cor[k]+'"></span></span>'+
    '<span class="cbar-v">'+cc[k]+'/9</span></div>').join('');
  const ordC=Object.keys(cc).sort((a,b)=>cc[b]-cc[a]);
  const dif=cc[ordC[0]]-cc[ordC[2]];
  let dTxt;
  if(dif<=2) dTxt='Os três centros aparecem em proporção parecida, o que é raro e favorável. Significa que você não depende de um só modo de operar. O cuidado aqui é outro: sem um centro claramente dominante, a tendência é resolver tudo pelo que a situação pede, e isso pode virar ausência de posição própria.';
  else if(cc[ordC[2]]<=1) dTxt='O '+rot[ordC[2]].toLowerCase()+' aparece quase zerado nas suas respostas. Isso não significa que ele não exista em você, significa que você não recorre a ele quando tem escolha. Segundo o livro, centro que não se alimenta atrofia, e o custo aparece justamente nas situações em que os outros dois não bastam.';
  else dTxt='O '+rot[ordC[0]].toLowerCase()+' domina com folga, e o '+rot[ordC[2]].toLowerCase()+' aparece bem atrás. Vale lembrar que a máquina humana é uma tríade e a força conciliadora é a emocional: quando ela não está no meio, os outros dois operam em visão dual, que é exatamente o que o livro chama de armadilha.';
  document.getElementById('anamCentroDist').textContent=dTxt;

  // nota de quebra
  document.getElementById('resNota').textContent=N.nome+' · nota '+e.quebra;
  document.getElementById('anamNotaFuncao').textContent=N.funcao;
  document.getElementById('anamNotaQuebra').textContent=N.quebra;

  const cad=cadeiaOrigem(e.notas, e.quebra);
  let origemTxt;
  if(cad.local){
    origemTxt='A nota anterior está firme, então a quebra é local: começa e termina em '+e.quebra+'. '+N.consequencia;
  } else {
    const O=NOTA_INFO[cad.origem];
    origemTxt='A quebra aparece em '+e.quebra+', mas a cadeia para trás mostra que ela não começa ali. '+cad.origem+', '+O.nome.toLowerCase()+
      ', também está baixa, e é de lá que vem o problema. '+O.consequencia+' Tratar '+e.quebra+' diretamente vai render pouco enquanto '+cad.origem+' estiver desse jeito.';
  }
  document.getElementById('anamNotaOrigem').textContent=origemTxt;
  document.getElementById('anamNotaCorrecao').textContent= cad.local ? N.correcao : NOTA_INFO[cad.origem].correcao+' Depois disso, '+N.correcao.charAt(0).toLowerCase()+N.correcao.slice(1);

  let critTxt;
  if(N.critico && e.quebra==='Mi') critTxt='Vale notar: Mi é a última nota antes do primeiro ponto crítico da escala, onde falta o semitom entre mi e fá. Você quebra exatamente onde a própria lei já empurra todo mundo para fora do rumo. Isso é meio consolo e meio alerta: não é fraqueza pessoal, é o ponto em que ninguém passa sem esforço deliberado. Sem choque consciente ali, o desvio é o comportamento padrão, não a exceção.';
  else if(N.critico) critTxt='Vale notar: Si é a última nota antes do segundo ponto crítico, entre si e o dó da oitava seguinte. É o ponto em que mais gente desiste, porque a sensação é de que o trabalho já foi feito. Foi quase todo feito. O que falta é pequeno em esforço e decisivo em resultado.';
  else critTxt='Um ponto a seu favor: a nota onde você quebra não é nenhum dos dois pontos críticos naturais da escala. Isso significa que a quebra é sua, não da lei. Não depende de choque consciente para ser corrigida, depende de treino direto e repetido, que é bem mais barato.';
  document.getElementById('anamCritico').textContent=critTxt;

  // barras das notas
  document.getElementById('noteBars').innerHTML=TESTE_OITAVA.map(n=>{
    const v=e.notas[n.nota]||0, pct=(v/5)*100;
    const info=NOTA_INFO[n.nota];
    const crit= info.critico?' <span class="crit-tag">ponto crítico</span>':'';
    const c= v<=2?'var(--oxblood-br)':(v>=4?'var(--good)':'var(--brass)');
    const fraca= v<=2?' fraca':'';
    return '<div class="nb-row'+fraca+'">'+
      '<div class="nb-head"><span class="nb-nota"><b>'+n.nota+'</b> · '+n.nome+crit+'</span>'+
      '<span class="nb-val">'+v+'/5</span></div>'+
      '<div class="nb-desc">'+n.desc+'</div>'+
      '<div class="nb-track"><div class="nb-fill" style="width:'+pct+'%;background:'+c+'"></div></div></div>';
  }).join('');

  const tr=trechoMaisFraco(e.notas);
  const TF=TRECHO_INFO[tr.fraco], TS=TRECHO_INFO[tr.forte];
  document.getElementById('anamTrecho').innerHTML=
    'Olhando as sete notas em blocos, seu ponto mais frágil está no <strong>'+TF.nome+'</strong> ('+TF.notas+
    '), o de '+TF.desc+', com média '+tr.med[tr.fraco].toFixed(1)+' de 5. O mais firme é o <strong>'+TS.nome+'</strong> ('+TS.notas+'), média '+
    tr.med[tr.forte].toFixed(1)+'.</p>'+
    '<p>'+TF.verbos+'</p>'+
    '<p>A oitava não perdoa desequilíbrio entre trechos. Como o processo é sequencial, o trecho fraco limita tudo que vem depois dele, por melhor que seja o resto. Não adianta reforçar o que já está forte.';

  document.getElementById('anamCruz').innerHTML=CRUZAMENTO[e.centro+'|'+tr.fraco]||'';

  renderEneaHist();
  desenharEneagrama(e);
  aplicarGateEnea();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ========== GATE DE EMAIL ========== */
function arrayBufferParaBase64(buffer){
  var binary=''; var bytes=new Uint8Array(buffer);
  for(var i=0;i<bytes.byteLength;i++){ binary += String.fromCharCode(bytes[i]); }
  return btoa(binary);
}

function leadSalvo(){
  try{ var raw=localStorage.getItem('tres-poderes-lead'); return raw? JSON.parse(raw) : null; }
  catch(e){ return null; }
}

function aplicarGateEnea(){
  const lead=leadSalvo();
  const gate=document.getElementById('eneaGate'), locked=document.getElementById('eneaLocked'),
        enviado=document.getElementById('eneaEnviado');
  const e=state.enea, pv=document.getElementById('pvPersonalTxt');
  if(pv && e && e.centro && e.quebra){
    const C=CENTRO_DEEP[e.centro], N=NOTA_INFO[e.quebra];
    pv.textContent='Seu centro predominante é o '+C.nome.replace('Centro ','')+', e você trava em '+e.quebra+' ('+N.nome+'). O treino diário mira esse ponto exato, todos os dias, não um genérico pra qualquer pessoa.';
  }
  if(lead && lead.email){
    gate.style.display='none';
    locked.style.display='block';
    enviado.style.display='none';
    // reenvia em segundo plano pra manter o email atualizado com o resultado mais recente, sem travar a tela
    enviarRelatorioPorEmail(lead.nome, lead.email, {silencioso:true});
  } else {
    gate.style.display='block';
    locked.style.display='none';
    enviado.style.display='none';
  }
}

async function enviarRelatorioPorEmail(nome, email, opts){
  opts=opts||{};
  const e=state.enea; if(!e) return {ok:false, erro:'sem resultado carregado'};
  try{
    await carregarJsPDF();
    const doc = montarPdfEnea(e);
    const b64 = arrayBufferParaBase64(doc.output('arraybuffer'));
    const nomeArq='anamnese-eneagrama-'+new Date(e.data).toISOString().slice(0,10)+'.pdf';
    const res = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ nome, email, pdfBase64:b64, nomeArquivo:nomeArq, resumo:{
        centro: txt('resCentro'), quebra: txt('resNota') } }) });
    const data = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error || ('backend '+res.status));
    return {ok:true};
  }catch(err){
    if(!opts.silencioso) console.error('Falha ao enviar relatório', err);
    return {ok:false, erro: err && err.message ? err.message : 'falha desconhecida'};
  }
}

async function submeterGate(){
  const nomeEl=document.getElementById('gateNome'), emailEl=document.getElementById('gateEmail');
  const btn=document.getElementById('gateSubmit'), msg=document.getElementById('gateMsg');
  const nome=nomeEl.value.trim(), email=emailEl.value.trim();
  msg.style.display='none';

  if(nome.length<2){ msg.innerHTML='Digite seu nome.'; msg.style.display='block'; nomeEl.focus(); return; }
  const emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  if(!emailOk){ msg.innerHTML='Digite um email válido.'; msg.style.display='block'; emailEl.focus(); return; }

  btn.disabled=true; const rotuloOrig=btn.textContent; btn.textContent='Enviando...';
  const resultado = await enviarRelatorioPorEmail(nome, email, {silencioso:false});
  btn.disabled=false; btn.textContent=rotuloOrig;

  if(resultado.ok){
    try{ localStorage.setItem('tres-poderes-lead', JSON.stringify({nome, email})); }catch(e){}
    document.getElementById('eneaGate').style.display='none';
    document.getElementById('eneaLocked').style.display='block';
    const enviado=document.getElementById('eneaEnviado');
    document.getElementById('eneaEnviadoTxt').textContent='Relatório enviado para '+email+'. Confira também a caixa de spam.';
    enviado.style.display='block';
  } else {
    const motivo = resultado.erro && resultado.erro.includes('dominio de email nao recebe')
      ? 'Esse email não parece existir. Confira se digitou certo.'
      : 'Não consegui enviar agora. Confira o email digitado e tente de novo.';
    msg.innerHTML='<strong>'+motivo+'</strong>';
    msg.style.display='block';
  }
}

function renderEneaHist(){
  const hist=state.eneaHist||[];
  const wrap=document.getElementById('anamHistWrap');
  if(hist.length<=1){ wrap.style.display='none'; return; }
  wrap.style.display='block';
  const atualData= state.enea? state.enea.data : null;
  document.getElementById('eneaHistList').innerHTML=hist.slice().reverse().map(h=>{
    const d=new Date(h.data);
    const cls= h.data===atualData ? 'hist-item atual':'hist-item';
    return '<button class="'+cls+'" data-data="'+h.data+'">'+
      '<span><span class="hist-tag">'+CENTRO_DEEP[h.centro].nome+'</span><br>'+
      '<span class="hist-data">quebra em '+h.quebra+' · '+NOTA_INFO[h.quebra].nome+'</span></span>'+
      '<span class="hist-data">'+d.toLocaleDateString('pt-BR')+'</span></button>';
  }).join('');
  document.querySelectorAll('#eneaHistList .hist-item').forEach(b=> b.addEventListener('click',()=>{
    const alvo=hist.find(x=>x.data===b.dataset.data);
    if(alvo){ state.enea=alvo; persist(); mostrarEneaResultado(); }
  }));

  const evo=document.getElementById('eneaEvo');
  const ant=hist[hist.length-2], at=hist[hist.length-1];
  const partes=[];
  if(ant.centro!==at.centro) partes.push('Seu centro predominante mudou de <strong>'+CENTRO_DEEP[ant.centro].nome+'</strong> para <strong>'+CENTRO_DEEP[at.centro].nome+'</strong>. Mudança de centro entre testes costuma refletir fase de vida, não estrutura, então vale olhar o que mudou no seu contexto no intervalo.');
  else partes.push('Seu centro predominante se manteve em <strong>'+CENTRO_DEEP[at.centro].nome+'</strong>, o que sugere estrutura e não estado passageiro.');
  if(ant.quebra!==at.quebra) partes.push('A quebra saiu de <strong>'+ant.quebra+'</strong> e foi para <strong>'+at.quebra+'</strong>.');
  else partes.push('A quebra continua em <strong>'+at.quebra+'</strong>.');
  const dAnt=Object.values(ant.notas).reduce((a,b)=>a+b,0), dAt=Object.values(at.notas).reduce((a,b)=>a+b,0);
  const dif=dAt-dAnt;
  if(Math.abs(dif)>=3) partes.push('Sua soma geral nas sete notas '+(dif>0?'subiu':'caiu')+' '+Math.abs(dif)+' pontos.');
  evo.innerHTML=partes.join(' ');
  evo.style.display='block';
}

function desenharEneagrama(e){
  const svg=document.getElementById('eneaSvg');
  const cx=110, cy=110, r=82;
  const pos=n=>{ const a=(-90+n*40)*Math.PI/180; return {x:cx+r*Math.cos(a), y:cy+r*Math.sin(a)}; };
  const P={}; for(let i=1;i<=9;i++) P[i]=pos(i);
  const tri=[3,6,9], hex=[1,4,2,8,5,7];
  const linha=(a,b,cor,w)=>'<line x1="'+P[a].x+'" y1="'+P[a].y+'" x2="'+P[b].x+'" y2="'+P[b].y+'" stroke="'+cor+'" stroke-width="'+w+'"/>';
  let s='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="rgba(244,238,223,0.14)" stroke-width="1.5"/>';
  for(let i=0;i<3;i++) s+=linha(tri[i],tri[(i+1)%3],'rgba(201,162,75,0.5)',1.4);
  for(let i=0;i<6;i++) s+=linha(hex[i],hex[(i+1)%6],'rgba(179,35,31,0.45)',1.2);
  // Dó no 9 (topo). Os pontos 3 e 6, vértices do triângulo, são os dois choques da lei.
  const ordem=['Dó','Ré','Mi','Fá','Sol','Lá','Si'];
  const idxPonto=[9,1,2,4,5,7,8];
  const CHOQUE=[3,6];
  for(let i=1;i<=9;i++){
    const oi=idxPonto.indexOf(i);
    const nota= oi>=0 ? ordem[oi] : null;
    const val= nota ? (e.notas[nota]||0) : 0;
    const a=(-90+i*40)*Math.PI/180;
    const lx=cx+(r+16)*Math.cos(a), ly=cy+(r+16)*Math.sin(a)+3;
    if(CHOQUE.includes(i)){
      s+='<circle class="enea-pt" cx="'+P[i].x+'" cy="'+P[i].y+'" r="5" fill="none" stroke="var(--oxblood-br)" stroke-width="1.6" stroke-dasharray="2 2"/>';
      s+='<text class="enea-label" x="'+lx+'" y="'+ly+'" text-anchor="middle" style="fill:var(--oxblood-br); font-size:8px;">choque</text>';
      continue;
    }
    let fill='rgba(244,238,223,0.16)', rr=4.5, classeExtra='';
    if(nota){
      if(nota===e.quebra){ fill='var(--oxblood-br)'; rr=8; classeExtra=' enea-pt-quebra'; }
      else if(val>=4){ fill='var(--good)'; rr=5.5; }
      else if(val<=2){ fill='rgba(179,35,31,0.55)'; rr=5.5; }
      else { fill='var(--brass)'; rr=5; }
    }
    if(nota===e.quebra){
      s+='<circle class="enea-pulse-ring" cx="'+P[i].x+'" cy="'+P[i].y+'" r="'+rr+'" fill="none" stroke="var(--oxblood-br)" stroke-width="2"/>';
    }
    s+='<circle class="enea-pt'+classeExtra+'" cx="'+P[i].x+'" cy="'+P[i].y+'" r="'+rr+'" fill="'+fill+'"/>';
    if(nota) s+='<text class="enea-label" x="'+lx+'" y="'+ly+'" text-anchor="middle">'+nota+'</text>';
  }
  const cCor={mental:'var(--brass)',emocional:'var(--oxblood-br)',corporal:'var(--parchment)'};
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="16" fill="none" stroke="'+cCor[e.centro]+'" stroke-width="1.6"/>';
  s+='<text x="'+cx+'" y="'+(cy+4)+'" text-anchor="middle" class="enea-label" style="fill:'+cCor[e.centro]+'; font-size:11px;">'+e.centro.charAt(0).toUpperCase()+'</text>';
  svg.innerHTML=s;
}

/* ========== PERFORMANCE ========== */
function renderDashboard(){
  const s=state.sessions, todayK=new Date().toLocaleDateString('pt-BR');
  const today=s.filter(x=>dayKey(x.date)===todayK);
  const tp=today.reduce((a,b)=>a+b.nota,0);
  document.getElementById('dashToday').textContent=tp;
  document.getElementById('dashTodaySub').textContent= today.length? tp+' de '+(today.length*7)+' pts':'sem rodadas';
  const total=s.reduce((a,b)=>a+b.nota,0);
  document.getElementById('dashTotal').textContent=total;
  document.getElementById('dashTotalSub').textContent=s.length+(s.length===1?' rodada':' rodadas');
  const days=[...new Set(s.map(x=>dayKey(x.date)))];
  let streak=0; const d=new Date();
  while(streak<400){ const k=d.toLocaleDateString('pt-BR');
    if(days.includes(k)){ streak++; d.setDate(d.getDate()-1); }
    else if(streak===0&&k===todayK){ d.setDate(d.getDate()-1); } else break; }
  document.getElementById('dashStreak').textContent=streak;
  document.getElementById('dashStreakSub').textContent= streak===1?'dia':'dias';
  document.getElementById('dashAvg').textContent= s.length?(total/s.length).toFixed(1):'—';
  const solved=Object.values(state.mastery).filter(m=>m.solved).length;
  document.getElementById('dashSolved').textContent=solved;
  document.getElementById('dashSolvedSub').textContent='de '+allExercises().length;
  document.getElementById('dashPerfect').textContent=s.filter(x=>x.nota===7).length;
  const b=document.getElementById('dashBanner');
  if(!s.length) b.innerHTML='Comece o primeiro exercício do dia para abrir o placar.';
  else if(!today.length) b.innerHTML='Nada hoje ainda. Sua sequência de <strong>'+streak+'</strong> dia(s) depende do exercício de agora.';
  else if(tp>=9&&tp/today.length>=6) b.innerHTML='Dia em <strong>'+tp+'</strong> pontos, no eixo 9. Ritmo e clareza andando juntos.';
  else if(tp>=9) b.innerHTML='<strong>'+tp+'</strong> pontos hoje. Volume alto, mas a média por rodada ainda pede afinação.';
  else if(tp>=6) b.innerHTML='<strong>'+tp+'</strong> pontos hoje. Passou do 6, o próximo ciclo é o 9.';
  else if(tp>=3) b.innerHTML='<strong>'+tp+'</strong> pontos hoje. A faísca do 3 acendeu, sustenta até o 6.';
  else b.innerHTML='<strong>'+tp+'</strong> ponto(s) hoje. Começo é começo, o 3 está logo ali.';
  return {streak,total,tp};
}
let lastRatio = null;
function renderRing(){
  const now=Date.now(), week=7*24*3600*1000;
  const rec=state.sessions.filter(s=>now-new Date(s.date).getTime()<=week);
  const ratio= rec.length? rec.filter(s=>s.nota>=6).length/rec.length : 0;
  const fg=document.getElementById('ringFg'), halo=document.getElementById('ringHalo'),
        shine=document.getElementById('ringShine'), cell=document.querySelector('.ring-cell');
  if(!fg||!cell) return;
  const len=fg.getTotalLength();

  // barra de carga
  fg.style.strokeDasharray=len; fg.style.strokeDashoffset=len*(1-ratio);
  if(halo){ halo.style.strokeDasharray=len; halo.style.strokeDashoffset=len*(1-ratio); }

  // pulso de energia correndo pelo trecho ja carregado
  if(shine){
    const seg=Math.max(len*0.07, 10);
    shine.style.strokeDasharray=seg+' '+(len-seg);
    shine.style.setProperty('--len', len+'px');
    // o brilho so percorre a parte preenchida
    shine.style.clipPath='none';
    shine.style.opacity='';
  }
  document.getElementById('ringPct').textContent=Math.round(ratio*100)+'%';

  // niveis do medidor
  const tier = ratio>=0.999 ? 4 : (ratio>=0.67 ? 3 : (ratio>=0.34 ? 2 : 1));
  cell.classList.remove('t1','t2','t3','t4');
  cell.classList.add('t'+tier);

  // estouro de carga quando o medidor sobe
  if(lastRatio!==null && ratio>lastRatio+0.001){
    cell.classList.remove('charging');
    void cell.offsetWidth;
    cell.classList.add('charging');
    setTimeout(()=>cell.classList.remove('charging'), 1000);
  }
  lastRatio=ratio;
}
function renderAxis(){
  const wrap=document.getElementById('axisBars'), diag=document.getElementById('diagMsg');
  if(!state.sessions.length){ wrap.innerHTML='<div class="empty-state">Sem dados ainda.</div>'; diag.style.display='none'; return; }
  const a=axisStats(), weak=weakestAxis();
  const cores={raciocinio:'var(--brass)',discernimento:'var(--oxblood-br)',influencia:'var(--parchment)'};
  const icones={
    raciocinio:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.35-4.35"/>',
    discernimento:'<path d="M12 3v18M5 8h14M5 8 3 13h4L5 8Zm14 0-2 5h4l-2-5Z"/>',
    influencia:'<circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6" opacity="0.55"/><circle cx="12" cy="12" r="10" opacity="0.3"/>'
  };
  wrap.innerHTML=Object.keys(a).map(k=>{
    const st=a[k], pct= st.avg!==null?Math.round((st.avg/7)*100):0;
    let tag=''; if(st.n===0) tag='';
    else if(k===weak) tag='<span class="axis-tag tag-foco">foco</span>';
    else if(st.avg>=6) tag='<span class="axis-tag tag-solido">sólido</span>';
    return '<div class="axis-row"><div class="axis-head">'+
      '<svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:'+cores[k]+';fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;margin-right:6px;vertical-align:-3px;">'+icones[k]+'</svg>'+
      '<span class="axis-name">'+st.label+tag+'</span>'+
      '<span class="axis-val" style="font-weight:700;color:'+cores[k]+';">'+pct+'%</span></div>'+
      '<div class="axis-track"><div class="axis-fill" style="width:'+pct+'%;background:'+cores[k]+'"></div></div>'+
      '<div style="font-size:10.5px;color:var(--dim);margin-top:3px;">'+(st.n? st.avg.toFixed(1)+'/7 · '+st.n+'x':'sem dados')+'</div></div>';
  }).join('');
  const n=state.sessions.length;
  const avgT=state.sessions.reduce((x,y)=>x+y.tempoBand,0)/n/3;
  const avgA=state.sessions.reduce((x,y)=>x+y.assertBand,0)/n/4;
  let msg;
  if(n<3) msg='Ainda poucos dados. A partir de <strong>3</strong> rodadas eu começo a repetir seus erros de propósito.';
  else if(avgT-avgA>0.18) msg='Padrão: você responde <strong>rápido, mas erra ou hesita</strong>. O gargalo é clareza, não velocidade.';
  else if(avgA-avgT>0.18) msg='Padrão: você <strong>acerta com convicção, mas demora</strong>. Falta virar reflexo.';
  else if(avgT+avgA>=1.6) msg='Os dois eixos altos e equilibrados. Foco atual: <strong>'+(weak?a[weak].label:'variedade')+'</strong>.';
  else msg='Tempo e assertividade caminham juntos, mas abaixo do ciclo <strong>6</strong>. Foco: <strong>'+(weak?a[weak].label:'variedade')+'</strong>.';
  diag.innerHTML=msg; diag.style.display='block';
}
function renderRanking(){
  const wrap=document.getElementById('rankingWrap');
  if(!state.sessions.length){ wrap.innerHTML='<div class="empty-state">Ainda sem sessões pra ranquear.</div>'; return; }
  if(state.rankTab==='sessao'){
    const rows=state.sessions.slice().sort((a,b)=>b.nota-a.nota||a.elapsedMs-b.elapsedMs).slice(0,10).map((s,i)=>{
      const r=i+1, ax=(r%3===0)?'axis369':'';
      return '<tr><td><span class="rank-badge '+ax+'">'+r+'</span></td><td>'+new Date(s.date).toLocaleDateString('pt-BR')+
        '</td><td>'+s.catLabel+'</td><td class="num-mono">'+s.nota+'/7'+(s.nota===7?' ∞':'')+'</td><td>'+formatTime(s.elapsedMs)+'</td></tr>'; }).join('');
    wrap.innerHTML='<table><thead><tr><th>#</th><th>Data</th><th>Eixo</th><th>Nota</th><th>Tempo</th></tr></thead><tbody>'+rows+'</tbody></table>';
  } else {
    const by={}; state.sessions.forEach(s=>{ const k=dayKey(s.date); if(!by[k]) by[k]={t:0,c:0}; by[k].t+=s.nota; by[k].c++; });
    const rows=Object.keys(by).map(k=>({d:k,t:by[k].t,c:by[k].c,a:by[k].t/by[k].c})).sort((x,y)=>y.t-x.t).slice(0,10).map((d,i)=>{
      const r=i+1, ax=(r%3===0)?'axis369':'';
      return '<tr><td><span class="rank-badge '+ax+'">'+r+'</span></td><td>'+d.d+'</td><td>'+d.c+' rodada(s)</td>'+
        '<td class="num-mono">'+d.t+' pts</td><td>média '+d.a.toFixed(1)+'</td></tr>'; }).join('');
    wrap.innerHTML='<table><thead><tr><th>#</th><th>Dia</th><th>Volume</th><th>Soma</th><th>Média</th></tr></thead><tbody>'+rows+'</tbody></table>';
  }
}
function renderHistory(){
  const wrap=document.getElementById('historyWrap');
  if(!state.sessions.length){ wrap.innerHTML='<div class="empty-state">Nenhum registro ainda.</div>'; return; }
  const rows=state.sessions.slice().reverse().slice(0,15).map(s=>{
    const c= s.cat==='raciocinio'?'var(--brass)':(s.cat==='discernimento'?'var(--oxblood-br)':'var(--parchment)');
    const dt=new Date(s.date);
    const al= s.assertBand>=4?'Convicto':(s.assertBand===3?'Hesitante':'Errou');
    return '<tr><td>'+dt.toLocaleDateString('pt-BR')+' '+dt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+
      '</td><td><span class="tag-pill" style="color:'+c+';border:1px solid '+c+'55;">'+s.catLabel+'</span></td>'+
      '<td>'+formatTime(s.elapsedMs)+'</td><td>'+al+'</td><td class="num-mono">'+s.nota+'/7'+(s.nota===7?' ∞':'')+'</td></tr>'; }).join('');
  wrap.innerHTML='<table><thead><tr><th>Quando</th><th>Eixo</th><th>Tempo</th><th>Assertiv.</th><th>Nota</th></tr></thead><tbody>'+rows+'</tbody></table>';
  const t=document.getElementById('trendMsg');
  if(state.sessions.length<4){ t.style.display='none'; return; }
  const rec=state.sessions.slice(-3), prev=state.sessions.slice(-6,-3);
  if(!prev.length){ t.style.display='none'; return; }
  const av=(arr,k)=>arr.reduce((a,b)=>a+b[k],0)/arr.length;
  const tR=av(rec,'tempoBand'),tP=av(prev,'tempoBand'),aR=av(rec,'assertBand'),aP=av(prev,'assertBand');
  let m;
  if(tR>tP+0.3&&aR<aP-0.3) m='<strong>Atenção:</strong> tempo melhorou mas assertividade caiu. Pode ser pressa, não clareza.';
  else if(aR>aP+0.3&&Math.abs(tR-tP)<0.3) m='<strong>Bom sinal:</strong> assertividade subindo, tempo estável.';
  else if(tR>tP+0.2&&aR>aP+0.2) m='<strong>Progresso real:</strong> os dois eixos melhorando juntos.';
  else if(tR<tP-0.3&&aR<aP-0.3) m='Os dois eixos caíram. Pode ser cansaço, vale ajustar o horário do treino.';
  else m='Tendência estável nas últimas rodadas.';
  t.innerHTML=m; t.style.display='block';
}
function renderPerf(){
  const d=renderDashboard();
  const totalLeis=MODULOS.reduce((a,m)=>a+leisProg(m).total,0);
  const feitosLeis=MODULOS.reduce((a,m)=>a+leisProg(m).done,0);
  document.getElementById('pfTreino').textContent=d.total;
  document.getElementById('pfLeis').textContent=feitosLeis;
  document.getElementById('pfLeisSub').textContent='de '+totalLeis;
  document.getElementById('pfStreak').textContent=d.streak;
  const eEl=document.getElementById('pfEnea'), eSub=document.getElementById('pfEneaSub');
  if(state.enea){
    const ab={mental:'Mental',emocional:'Emoc.',corporal:'Corp.'};
    eEl.textContent= ab[state.enea.centro]||'—';
    eSub.textContent='quebra em '+state.enea.quebra;
  } else { eEl.textContent='—'; eSub.textContent='não feito'; }
  renderMelhorar(feitosLeis, totalLeis);
}
function renderMelhorar(feitosLeis, totalLeis){
  const ul=document.getElementById('melhoraList');
  const itens=[];
  const a=axisStats(), weak=weakestAxis();
  if(state.sessions.length>=3 && weak && a[weak].n>0){
    itens.push('<strong>'+a[weak].label+'</strong> é seu eixo mais baixo, média '+a[weak].avg.toFixed(1)+' de 7. O sistema já está puxando mais questões desse tipo pra você.');
  }
  if(state.sessions.length>=3){
    const n=state.sessions.length;
    const avgT=state.sessions.reduce((x,y)=>x+y.tempoBand,0)/n/3;
    const avgA=state.sessions.reduce((x,y)=>x+y.assertBand,0)/n/4;
    if(avgT-avgA>0.18) itens.push('Você responde rápido mas erra ou hesita. <strong>Desacelere de propósito</strong>: o gargalo é clareza, não velocidade.');
    else if(avgA-avgT>0.18) itens.push('Você acerta com convicção mas demora. Falta virar reflexo, e isso só vem com <strong>repetição diária</strong>, não com mais estudo.');
  }
  const errados=openPool().filter(e=>{const m=state.mastery[e.id]; return m&&m.attempts;}).length;
  if(errados) itens.push('Tem <strong>'+errados+'</strong> exercício(s) errado(s) na fila de retorno. Eles voltam com prioridade até você fechar.');
  if(state.enea){
    const nt=TESTE_OITAVA.find(n=>n.nota===state.enea.quebra);
    itens.push('Sua oitava quebra em <strong>'+nt.nota+', '+nt.nome+'</strong>. '+nt.desc+'. É onde o processo perde força antes de fechar o ciclo.');
    const fracos=Object.keys(state.enea.notas).filter(k=>state.enea.notas[k]<=2 && k!==state.enea.quebra);
    if(fracos.length) itens.push('Outras notas baixas na sua oitava: <strong>'+fracos.join(', ')+'</strong>. Duas ou mais notas fracas seguidas costumam ser o mesmo problema, não problemas diferentes.');
  } else {
    itens.push('Você ainda não fez o <strong>teste do eneagrama</strong>. Ele mostra qual dos três centros comanda em você e em que nota da oitava seu processo quebra.');
  }
  if(feitosLeis<totalLeis){
    const restantes=MODULOS.filter(m=>leisProg(m).done<leisProg(m).total).map(m=>m.nome);
    itens.push('Faltam <strong>'+(totalLeis-feitosLeis)+'</strong> questões nas Leis. Pendentes: '+restantes.join(', ')+'.');
  }
  const days=[...new Set(state.sessions.map(x=>dayKey(x.date)))];
  const hoje=new Date().toLocaleDateString('pt-BR');
  if(state.sessions.length && !days.includes(hoje)) itens.push('Você ainda não treinou hoje. <strong>Constância vale mais que volume</strong> aqui.');
  if(!itens.length) itens.push('Responda alguns exercícios para eu mapear seus pontos fracos.');
  ul.innerHTML=itens.map(i=>'<li>'+i+'</li>').join('');
}
function renderAll(){ renderDashboard(); renderRing(); renderAxis(); renderRanking(); renderHistory(); renderModList(); renderPerf(); }

/* ========== NAVEGAÇÃO ========== */
function switchView(v){
  document.querySelectorAll('.view').forEach(s=>s.classList.remove('active'));
  document.getElementById('view'+v).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active', b.dataset.view===v));
  if(v==='Perf'){ renderPerf(); renderAxis(); renderRanking(); renderHistory(); }
  if(v==='Leis') renderModList();
  if(v==='Enea' && state.enea && document.getElementById('eneaQuiz').style.display==='none'){
    document.getElementById('eneaPrevWrap').style.display='block';
  }
  window.scrollTo({top:0,behavior:'instant'});
}

/* ========== LISTENERS ========== */
document.querySelectorAll('.nav-item').forEach(b=> b.addEventListener('click',()=>switchView(b.dataset.view)));
document.getElementById('startBtn').addEventListener('click', function(ev){
  if(precisaAssinar()){ ev.preventDefault(); mostrarPaywall(); return; }
  startTimer();
});
document.getElementById('skipBtn').addEventListener('click',()=>{
  state.lastId= state.currentEx? state.currentEx.id:null; pickNextExercise(); renderExercise(); });
document.querySelectorAll('#fallbackRate .rate-option').forEach(b=> b.addEventListener('click',()=>{
  if(!pendingContext) return;
  finalizeSession(pendingContext.ex, pendingContext.tB, parseInt(b.dataset.band,10));
  pendingContext=null; }));
document.getElementById('sdContinue').addEventListener('click',()=>generateBatch());
document.getElementById('sdRevisar').addEventListener('click', entrarRevisao);
document.getElementById('treinoNext').addEventListener('click', proximoExercicio);
document.getElementById('sdRest').addEventListener('click', async()=>{ state.resting=true; await persist(); showSessionDone(); });
document.getElementById('genBtn').addEventListener('click',()=>generateExercise(null));
document.getElementById('btnExport').addEventListener('click', exportProgress);
document.getElementById('btnImport').addEventListener('click',()=>document.getElementById('fileImport').click());
document.getElementById('fileImport').addEventListener('change',e=>{
  if(e.target.files&&e.target.files[0]) importProgress(e.target.files[0]); e.target.value=''; });

document.getElementById('leisBack').addEventListener('click', voltarModulos);
document.getElementById('leisBack2').addEventListener('click', voltarModulos);
document.getElementById('doneBack').addEventListener('click', voltarModulos);
document.getElementById('doneGerar').addEventListener('click',()=>{
  if(state.modAtual) gerarQuestoesModulo(state.modAtual, 3); });
document.getElementById('modSubmit').addEventListener('click', function(ev){
  if(precisaAssinar()){ ev.preventDefault(); mostrarPaywall(); return; }
  modSubmit();
});
document.getElementById('modSkip').addEventListener('click', modProximo);
document.getElementById('modNext').addEventListener('click', modProximo);
document.querySelectorAll('#modFallback .rate-option').forEach(b=> b.addEventListener('click', async()=>{
  if(!pendingMod) return;
  if(parseInt(b.dataset.mod,10)===1) await marcarModItem();
  document.getElementById('modFallback').style.display='none';
  pendingMod=null; }));

document.getElementById('eneaStart').addEventListener('click', eneaIniciar);
document.getElementById('eneaRedo').addEventListener('click', eneaIniciar);
document.getElementById('eneaPdf').addEventListener('click', gerarPdfEnea);
document.getElementById('gateSubmit').addEventListener('click', submeterGate);
document.getElementById('eneaSeePrev').addEventListener('click', mostrarEneaResultado);

document.querySelectorAll('.tab-btn[data-pane]').forEach(b=> b.addEventListener('click',()=>{
  document.querySelectorAll('.tab-btn[data-pane]').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('pane'+b.dataset.pane).classList.add('active'); }));
document.getElementById('tabSessao').addEventListener('click',()=>{
  state.rankTab='sessao';
  document.getElementById('tabSessao').classList.add('active');
  document.getElementById('tabDia').classList.remove('active'); renderRanking(); });
document.getElementById('tabDia').addEventListener('click',()=>{
  state.rankTab='dia';
  document.getElementById('tabDia').classList.add('active');
  document.getElementById('tabSessao').classList.remove('active'); renderRanking(); });

/* ========== INIT ========== */
/* Some com o menu inferior enquanto o teclado esta aberto, e devolve ao sair do campo. */
document.addEventListener('focusin', function(e){
  if (e.target && (e.target.tagName==='TEXTAREA' || (e.target.tagName==='INPUT' && e.target.type!=='file'))) {
    document.body.classList.add('campo-ativo');
  }
});
document.addEventListener('focusout', function(e){
  if (e.target && (e.target.tagName==='TEXTAREA' || (e.target.tagName==='INPUT' && e.target.type!=='file'))) {
    setTimeout(function(){
      var ativo=document.activeElement;
      var aindaEmCampo = ativo && (ativo.tagName==='TEXTAREA' || (ativo.tagName==='INPUT' && ativo.type!=='file'));
      if (!aindaEmCampo) document.body.classList.remove('campo-ativo');
    }, 60);
  }
});

(async function init(){
  montarRodas();
  await loadProgress();
  pingBackend();
  const hoje=new Date().toLocaleDateString('pt-BR');
  const novoDia= state.lastDay && state.lastDay!==hoje;
  if(novoDia) state.resting=false;
  pickNextExercise();
  renderAll();
  if(state.sessions.length) tiltBeam(state.sessions[state.sessions.length-1].nota);
  if(state.enea) document.getElementById('eneaPrevWrap').style.display='block';
  if(!state.currentEx){
    showSessionDone();
    if(novoDia || (!state.resting && state.sessions.length===0)) generateBatch();
  } else renderExercise();
  const params=new URLSearchParams(location.search);
  if(params.get('ir')==='enea'){
    switchView('Enea');
    const btnEnea=document.getElementById('eneaStart');
    if(btnEnea && !state.enea) btnEnea.click();
    history.replaceState(null,'',location.pathname);
  }

  let ASSINANTE=false, PAGAMENTO_CHECADO=false;
  function precisaAssinar(){ return !ASSINANTE; }
  window.precisaAssinar = precisaAssinar;
  function leadEmailAtual(){
    try{ const raw=localStorage.getItem('tres-poderes-lead'); if(raw) return JSON.parse(raw).email||''; }catch(e){}
    return '';
  }
  async function sincronizarProgresso(){
    const email=leadEmailAtual(); if(!email) return;
    try{
      const a=axisStats();
      const resumo={
        raciocinio: a.raciocinio.avg, discernimento: a.discernimento.avg, influencia: a.influencia.avg,
        totalSessoes: state.sessions.length, streak: (typeof renderDashboard==='function'? renderDashboard().streak : null)
      };
      await fetch('/api/progress', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, resumo }) });
    }catch(e){ /* silencioso, nao trava o uso do app */ }
  }
  function mostrarPaywall(){ document.getElementById('paywallOverlay').classList.add('show'); }
  window.mostrarPaywall = mostrarPaywall;
  function fecharPaywall(){ document.getElementById('paywallOverlay').classList.remove('show'); }
  document.getElementById('paywallClose').addEventListener('click', fecharPaywall);
  document.getElementById('paywallOverlay').addEventListener('click', function(ev){
    if(ev.target.id==='paywallOverlay') fecharPaywall();
  });
  (async function checarAssinatura(){
    let email='';
    try{ const raw=localStorage.getItem('tres-poderes-lead'); if(raw) email=(JSON.parse(raw).email||''); }catch(e){}
    if(!email){ PAGAMENTO_CHECADO=true; atualizarAvisosBloqueio(); return; }
    try{
      const res=await fetch('/api/status?email='+encodeURIComponent(email));
      const data=await res.json();
      ASSINANTE=!!data.pago;
    }catch(e){ ASSINANTE=false; }
    PAGAMENTO_CHECADO=true;
    atualizarAvisosBloqueio();
  })();

  function atualizarAvisosBloqueio(){
    if(!PAGAMENTO_CHECADO) return;
    const mostrar = !ASSINANTE;
    document.getElementById('treinoLockBanner').classList.toggle('show', mostrar);
    document.getElementById('leisLockBanner').classList.toggle('show', mostrar);
  }
  document.getElementById('treinoLockBtn').addEventListener('click', mostrarPaywall);
  document.getElementById('leisLockBtn').addEventListener('click', mostrarPaywall);

  (function initInstallBanner(){
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if(standalone){ try{ localStorage.setItem('tp-install-status','instalado'); }catch(e){} return; }
    try{ if(localStorage.getItem('tp-install-status')==='instalado') return; }catch(e){}
    let ultimoAdiado=0;
    try{ ultimoAdiado=parseInt(localStorage.getItem('tp-install-adiado')||'0',10); }catch(e){}
    const seteDias=7*24*60*60*1000;
    if(Date.now()-ultimoAdiado < seteDias) return;
    const banner=document.getElementById('installBanner'), txt=document.getElementById('installTxt'),
      btn=document.getElementById('installBtn'), close=document.getElementById('installClose');
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    let deferredPrompt=null;
    function adiar(){
      banner.classList.remove('show');
      try{ localStorage.setItem('tp-install-adiado', String(Date.now())); }catch(e){}
    }
    close.addEventListener('click', adiar);
    if(isIOS){
      txt.innerHTML='<b>Instale o app.</b> Toque em compartilhar, depois "Adicionar à Tela de Início".';
      btn.textContent='Entendi';
      btn.addEventListener('click', adiar);
      setTimeout(()=>banner.classList.add('show'), 1200);
    } else {
      window.addEventListener('beforeinstallprompt', (e)=>{
        e.preventDefault();
        deferredPrompt=e;
        setTimeout(()=>banner.classList.add('show'), 1200);
      });
      btn.addEventListener('click', async ()=>{
        if(!deferredPrompt) return adiar();
        deferredPrompt.prompt();
        const escolha=await deferredPrompt.userChoice;
        deferredPrompt=null;
        if(escolha && escolha.outcome==='accepted'){
          try{ localStorage.setItem('tp-install-status','instalado'); }catch(e){}
          banner.classList.remove('show');
        } else {
          adiar();
        }
      });
    }
  })();
})();

</script>
</body>
</html>
`;
var LP_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Três Poderes: por que a pessoa concorda e não muda?</title>
<meta name="description" content="Descubra qual dos seus três poderes, raciocínio, discernimento ou influência, está te travando. Teste gratuito baseado no Eneagrama de Gurdjieff, com treino diário focado no seu ponto fraco.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://trespoderes.app/lp">
<meta property="og:title" content="Seus Três Poderes: descubra o que está te travando">
<meta property="og:description" content="Descubra qual dos seus três poderes, raciocínio, discernimento ou influência, está te travando. Teste gratuito baseado no Eneagrama de Gurdjieff, com treino diário focado no seu ponto fraco.">
<meta property="og:image" content="https://cdn.jsdelivr.net/gh/renato969/Three-power@main/tres-poderes-og.png">
<meta property="og:image:width" content="1536">
<meta property="og:image:height" content="1024">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Seus Três Poderes: descubra o que está te travando">
<meta name="twitter:description" content="Descubra qual dos seus três poderes, raciocínio, discernimento ou influência, está te travando. Teste gratuito baseado no Eneagrama de Gurdjieff.">
<meta name="twitter:image" content="https://cdn.jsdelivr.net/gh/renato969/Three-power@main/tres-poderes-og.png">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c9a24b' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='9.2' stroke-width='1.1'/%3E%3Cpath d='M12 2.8 19.9 16.6 4.1 16.6z' stroke-width='1.1'/%3E%3Cpath d='M17.9 5.2 15.1 20.6 21 10.6 6.1 5.2 8.9 20.6 3 10.6Z' stroke-width='0.9'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#15110d; --panel:#1d1611; --panel-2:#241b14;
    --rule:rgba(244,238,223,0.12);
    --parchment:#f4eedf; --dim:#a89f8e;
    --oxblood:#b3231f; --oxblood-br:#d63a2f;
    --brass:#c9a24b; --brass-dim:#8a7538;
    --good:#7ea36b; --radius:10px;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    margin:0; background:var(--ink); color:var(--parchment);
    font-family:'Inter',sans-serif; overflow-x:hidden;
  }
  .wrap{ max-width:720px; margin:0 auto; padding:0 24px; }
  .eyebrow{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.2em;
    text-transform:uppercase; color:var(--brass); }
  a{ color:inherit; }

  /* ===== CABEÇALHO ===== */
  header{ position:sticky; top:0; z-index:50; padding:18px 0 14px; text-align:center;
    background:rgba(21,17,13,0.92); backdrop-filter:blur(10px) saturate(1.15);
    border-bottom:1px solid var(--rule); }
  .brand{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
  .brand-icon{ width:46px; height:46px; stroke:var(--brass); fill:none; overflow:visible; }
  .brand span{ font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.18em;
    text-transform:uppercase; color:var(--parchment); }
  @media (prefers-reduced-motion:reduce){ .shine-sweep animateTransform{ display:none; } }

  /* ===== HERO ===== */
  .hero{ position:relative; padding:64px 0 56px; text-align:center; overflow:hidden;
    background:radial-gradient(1100px 560px at 50% -8%, rgba(179,35,31,0.14), transparent 62%), var(--ink); }
  .enea-bg{ position:absolute; top:44%; left:50%; transform:translate(-50%,-50%);
    width:min(920px,150vw); opacity:.14; pointer-events:none; z-index:0; }
  .enea-bg .breathe{ transform-origin:220px 220px; animation:breathe 7s ease-in-out infinite; }
  @keyframes breathe{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.035); } }
  .enea-bg .choque{ animation:pulse 2.6s ease-in-out infinite; }
  .enea-bg .choque.b{ animation-delay:.4s; }
  @keyframes pulse{ 0%,100%{ opacity:.55; } 50%{ opacity:1; } }

  .hero-inner{ position:relative; z-index:1; }
  .hero .eyebrow{ margin-bottom:16px; }
  h1{ font-family:'Fraunces',serif; font-weight:600; font-style:italic;
    font-size:clamp(32px,6vw,52px); line-height:1.08; margin:0 0 20px; color:var(--parchment); }
  h1 em{ font-style:italic; color:var(--brass); }
  .hero-sub{ font-size:16.5px; line-height:1.65; color:var(--dim); max-width:480px;
    margin:0 auto 34px; }
  .hero-sub strong{ color:var(--parchment); font-weight:600; }
  .hero-list{ list-style:none; margin:0 auto 8px; padding:0; max-width:440px; text-align:left; }
  .hero-list li{ position:relative; padding:8px 0 8px 24px; font-size:15px; color:var(--parchment);
    border-bottom:1px solid var(--rule); }
  .hero-list li:last-child{ border-bottom:none; }
  .hero-list li::before{ content:'→'; position:absolute; left:0; color:var(--brass); font-weight:600; }

  .btn{ display:inline-flex; align-items:center; gap:8px; font-family:'Inter',sans-serif;
    font-weight:600; font-size:15px; padding:15px 30px; border-radius:8px; border:none;
    cursor:pointer; text-decoration:none; transition:transform .15s ease, box-shadow .2s ease; }
  .btn-gold{ background:linear-gradient(180deg,#d8b768,var(--brass)); color:#241b14;
    box-shadow:0 8px 24px -8px rgba(201,162,75,.55); }
  .btn-gold:hover{ transform:translateY(-1px); box-shadow:0 10px 28px -8px rgba(201,162,75,.7); }
  .btn-wide{ max-width:360px; white-space:normal; line-height:1.35; text-align:center; padding:16px 26px; }
  .fine{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim);
    margin-top:14px; letter-spacing:.02em; }

  /* ===== AUTORIDADE ===== */
  .authority{ border-top:1px solid var(--rule); border-bottom:1px solid var(--rule);
    padding-top:18px; padding-bottom:18px; padding-left:24px; padding-right:24px;
    text-align:center; background:rgba(244,238,223,0.02); }
  .authority p{ margin:0; font-size:13px; color:var(--dim); }
  .authority strong{ color:var(--parchment); font-weight:600; }

  /* ===== PRA QUEM É ===== */
  .who{ padding-top:30px; padding-bottom:6px; text-align:center; }
  .who .eyebrow{ display:block; margin-bottom:14px; }
  .tags-row{ display:flex; gap:9px; justify-content:center; flex-wrap:wrap; max-width:520px; margin:0 auto; }
  .tags-row .tag{ font-size:12px; padding:7px 14px; }

  /* ===== VÍDEO DO CHICO ===== */
  .video-block{ padding-top:34px; padding-bottom:6px; }
  .video-cap{ text-align:center; font-family:'IBM Plex Mono',monospace; font-size:11px;
    color:var(--dim); margin-bottom:14px; letter-spacing:.04em; }
  .video-frame{ position:relative; width:100%; max-width:640px; margin:0 auto; aspect-ratio:16/9;
    background:var(--panel-2); border:1px solid var(--rule); border-radius:var(--radius);
    display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .video-frame .play{ width:56px; height:56px; border-radius:50%; background:rgba(201,162,75,0.14);
    border:1px solid var(--brass-dim); display:flex; align-items:center; justify-content:center; }
  .video-frame .play svg{ width:20px; height:20px; fill:var(--brass); margin-left:3px; }
  .video-frame .ph-text{ position:absolute; bottom:16px; left:0; right:0; text-align:center;
    font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--dim); letter-spacing:.06em; }
  /* Quando o vídeo real entrar, troca este bloco por um <iframe> do YouTube/Vimeo
     e remove .video-frame, .play e .ph-text */

  /* ===== O QUE É O ENEAGRAMA ===== */
  .explainer{ padding-top:40px; padding-bottom:40px; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule);
    background:rgba(244,238,223,0.015); }
  .explainer .sec-head{ margin-bottom:22px; }
  .explainer p{ font-size:14.5px; line-height:1.75; color:var(--dim); max-width:560px; margin:0 auto 14px; }
  .explainer p:last-child{ margin-bottom:0; }
  .explainer strong{ color:var(--parchment); font-weight:600; }
  .diagram{ display:flex; justify-content:center; margin:36px 0 34px; }
  @keyframes glintGold{
    0%,88%,100%{ filter:brightness(1) drop-shadow(0 0 0 rgba(201,162,75,0)); }
    4%{ filter:brightness(2.5) drop-shadow(0 0 6px rgba(255,224,153,.95)); }
  }
  @keyframes glintRed{
    0%,88%,100%{ filter:brightness(1) drop-shadow(0 0 0 rgba(214,58,47,0)); }
    4%{ filter:brightness(2.3) drop-shadow(0 0 6px rgba(255,140,120,.9)); }
  }
  .diagram .pt{ animation-duration:3.6s; animation-timing-function:ease-in-out; animation-iteration-count:infinite; transform-box:fill-box; transform-origin:center; }
  .diagram .pt-g{ animation-name:glintGold; }
  .diagram .pt-r{ animation-name:glintRed; }
  .diagram .d0{ animation-delay:0s; } .diagram .d1{ animation-delay:.4s; }
  .diagram .d2{ animation-delay:.8s; } .diagram .d3{ animation-delay:1.2s; }
  .diagram .d4{ animation-delay:1.6s; } .diagram .d5{ animation-delay:2s; }
  .diagram .d6{ animation-delay:2.4s; } .diagram .d7{ animation-delay:2.8s; }
  .diagram .d8{ animation-delay:3.2s; }
  .diagram svg{ width:220px; height:220px; }
  .legend{ display:flex; gap:22px; justify-content:center; flex-wrap:wrap; margin:0 auto 26px;
    max-width:420px; }
  .legend-item{ display:flex; align-items:center; gap:8px; font-family:'IBM Plex Mono',monospace;
    font-size:11.5px; color:var(--dim); }
  .legend-dot{ width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .legend-dot.tri{ background:var(--brass); }
  .legend-dot.hept{ background:var(--oxblood-br); }
  .aside{ max-width:480px; margin:26px auto 0; text-align:center; font-family:'Fraunces',serif;
    font-style:italic; font-size:14.5px; line-height:1.6; color:var(--dim); }
  .aside cite{ display:block; margin-top:8px; font-family:'IBM Plex Mono',monospace;
    font-style:normal; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--brass-dim); }

  /* ===== POR QUE, COMO, O QUE ===== */
  .whw{ display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--rule);
    border:1px solid var(--rule); border-radius:var(--radius); overflow:hidden; }
  .whw-item{ background:var(--panel); padding:24px 20px; }
  .whw-item .eyebrow{ display:block; margin-bottom:10px; }
  .whw-item p{ font-size:13px; line-height:1.62; color:var(--dim); margin:0; }
  @media (max-width:640px){ .whw{ grid-template-columns:1fr; } }

  /* ===== SEÇÃO GERAL ===== */
  section{ padding:44px 0; }
  @media (min-width:640px){ section{ padding:64px 0; } }
  .sec-head{ text-align:center; margin-bottom:40px; }
  .sec-icon{ width:26px; height:26px; margin:0 auto 14px; stroke:var(--brass); fill:none;
    stroke-width:1.3; stroke-linecap:round; stroke-linejoin:round; display:block; }
  .sec-head .eyebrow{ display:block; margin-bottom:10px; }
  .sec-head h2{ font-family:'Fraunces',serif; font-weight:600; font-size:clamp(24px,4vw,32px);
    margin:0; }

  /* ===== COMO FUNCIONA ===== */
  .steps{ display:grid; gap:2px; background:var(--rule); border:1px solid var(--rule);
    border-radius:var(--radius); overflow:hidden; }
  .step{ background:var(--panel); padding:26px 24px; display:flex; gap:18px; align-items:flex-start; }
  .step-n{ font-family:'Fraunces',serif; font-weight:600; font-size:26px; color:var(--brass);
    line-height:1; flex-shrink:0; width:32px; }
  .step-body h3{ font-family:'Inter',sans-serif; font-weight:600; font-size:15.5px; margin:0 0 6px; }
  .step-body p{ font-size:13.5px; line-height:1.6; color:var(--dim); margin:0; }

  /* ===== PRÉVIA DO RESULTADO ===== */
  .preview-card{ background:linear-gradient(180deg,var(--panel),var(--panel-2));
    border:1px solid var(--rule); border-radius:var(--radius); padding:28px; position:relative; }
  .preview-card::after{ content:''; position:absolute; inset:0; border-radius:var(--radius);
    background:linear-gradient(180deg, transparent 45%, var(--panel-2) 100%); pointer-events:none; }
  .pv-kicker{ font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.14em;
    text-transform:uppercase; color:var(--dim); text-align:center; margin-bottom:6px; }
  .pv-title{ font-family:'Fraunces',serif; font-weight:600; font-size:22px; text-align:center;
    color:var(--brass); margin-bottom:22px; }
  .pv-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:1px;
    background:var(--rule); border:1px solid var(--rule); border-radius:8px; overflow:hidden; margin-bottom:18px; }
  .pv-grid div{ background:rgba(244,238,223,0.02); padding:10px 12px; }
  .pv-grid dt{ font-family:'IBM Plex Mono',monospace; font-size:8.5px; letter-spacing:.1em;
    text-transform:uppercase; color:var(--dim); margin-bottom:3px; }
  .pv-grid dd{ margin:0; font-size:12.5px; color:var(--parchment); }
  .pv-blur{ font-size:13.5px; line-height:1.7; color:var(--dim); filter:blur(3.5px); user-select:none; }
  .pv-lock{ position:relative; z-index:2; text-align:center; margin-top:18px; }
  .pv-lock span{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--brass);
    letter-spacing:.04em; }

  /* ===== TREINO (upsell teaser) ===== */
  .upsell{ background:var(--panel); border:1px solid var(--brass-dim); border-radius:var(--radius);
    padding:36px 28px; text-align:center; }
  .upsell h3{ font-family:'Fraunces',serif; font-weight:600; font-size:24px; margin:0 0 12px; }
  .upsell p{ color:var(--dim); font-size:14.5px; line-height:1.7; max-width:440px; margin:0 auto 24px; }
  .upsell-tags{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:24px; }
  .price-card{ background:rgba(201,162,75,0.06); border:1px solid var(--brass-dim); border-radius:var(--radius);
    padding:22px 20px; margin-bottom:22px; text-align:center; }
  .price-badge{ display:inline-block; font-family:'IBM Plex Mono',monospace; font-size:10.5px;
    letter-spacing:.08em; text-transform:uppercase; color:var(--ink); background:var(--brass);
    padding:4px 10px; border-radius:20px; margin-bottom:12px; }
  .price-main{ font-family:'Fraunces',serif; font-weight:600; font-size:28px; color:var(--parchment); }
  .price-main span{ font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--dim); font-weight:400; }
  .price-sub{ font-size:12.5px; color:var(--dim); margin:6px 0 16px; }
  .price-alt{ font-size:12px; color:var(--dim); margin-top:14px; }
  .price-alt a{ color:var(--brass); text-decoration:underline; }
  .tag{ font-family:'IBM Plex Mono',monospace; font-size:11px; padding:6px 12px; border-radius:20px;
    border:1px solid var(--rule); color:var(--dim); }

  /* ===== CTA FINAL ===== */
  .cta-final{ text-align:center; padding:70px 0 90px; }
  .cta-final h2{ font-family:'Fraunces',serif; font-weight:600; font-style:italic; font-size:clamp(24px,4vw,32px);
    margin:0 0 26px; }

  footer{ border-top:1px solid var(--rule); padding:28px 0 48px; text-align:center; }
  footer p{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--dim); margin:0; }

  @media (max-width:639px){
    .cta-final{ padding:48px 0 56px; }
    .explainer{ padding-top:32px; padding-bottom:32px; }
    .video-block{ padding-top:26px; padding-bottom:6px; }
    .who{ padding-top:24px; padding-bottom:6px; }
  }

  @media (prefers-reduced-motion:reduce){ .breathe,.choque,.pt{ animation:none !important; } }
</style>
</head>
<body>

  <header>
    <div class="brand">
      <svg class="brand-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <defs>
          <linearGradient id="shine" x1="-1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stop-color="#fff3d6" stop-opacity="0"/>
            <stop offset="46%" stop-color="#fff3d6" stop-opacity="0"/>
            <stop offset="50%" stop-color="#fff8e6" stop-opacity="1"/>
            <stop offset="54%" stop-color="#fff3d6" stop-opacity="0"/>
            <stop offset="100%" stop-color="#fff3d6" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="2 0" dur="2.8s" repeatCount="indefinite"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9.2" stroke-width="1.1"/>
        <path d="M12 2.8 19.9 16.6 4.1 16.6z" stroke-width="1.1"/>
        <path d="M17.9 5.2 15.1 20.6 21 10.6 6.1 5.2 8.9 20.6 3 10.6Z" stroke-width="0.9"/>
        <g class="shine-sweep" stroke="url(#shine)" stroke-width="2.2">
          <circle cx="12" cy="12" r="9.2"/>
          <path d="M12 2.8 19.9 16.6 4.1 16.6z"/>
          <path d="M17.9 5.2 15.1 20.6 21 10.6 6.1 5.2 8.9 20.6 3 10.6Z"/>
        </g>
      </svg>
      <span>Três Poderes</span>
    </div>
  </header>

  <section class="hero">
    <svg class="enea-bg" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
      <g class="breathe">
        <circle cx="220" cy="220" r="200" fill="none" stroke="#c9a24b" stroke-width="1"/>
        <polygon points="220,30 383,325 57,325" fill="none" stroke="#c9a24b" stroke-width="1.4"/>
        <polygon points="220,30 90,127 133,283 307,283 350,127" fill="none" stroke="#c9a24b" stroke-width="1"/>
        <polygon points="90,127 350,127 133,283 220,30 307,283" fill="none" stroke="#c9a24b" stroke-width="1"/>
        <circle class="choque a" cx="90" cy="127" r="7" fill="#d63a2f"/>
        <circle class="choque b" cx="350" cy="127" r="7" fill="#d63a2f"/>
      </g>
    </svg>
    <div class="wrap hero-inner">
      <div class="eyebrow">Teste gratuito · 4 minutos</div>
      <h1>Você sabe que precisa evoluir.<br>Só não sabe exatamente onde.</h1>
      <p class="hero-sub">O posicionamento e a evolução de todo ser humano dependem de pensar com clareza, tomar decisões fundamentadas e fazer essas decisões acontecerem de verdade, seja para a sua própria evolução, para a sua empresa, ou simplesmente para influenciar outras pessoas.</p>
      <p class="hero-sub" style="margin-bottom:14px;">E, nesse sentido, os três pontos abaixo são determinantes:</p>
      <ul class="hero-list">
        <li><strong>Raciocínio.</strong> Quando você não enxerga as opções antes de agir</li>
        <li><strong>Discernimento.</strong> Quando você vê as opções e não decide</li>
        <li><strong>Influência.</strong> Quando você decide e não faz acontecer, nem em você, nem no outro</li>
      </ul>
      <p class="hero-sub" style="margin-top:22px;">O eneagrama de Gurdjieff traça a anamnese completa dos seus três poderes. Baseado em leis universais, ele avalia sua capacidade de raciocínio, discernimento e influência, e mostra exatamente onde você está falhando.</p>
      <a href="/?ir=enea" class="btn btn-gold">Descobrir o meu em 4 minutos →</a>
      <div class="fine">Grátis · Resultado na hora · Sem cartão</div>
    </div>
  </section>

  <div class="authority">
    <p>Baseado em <strong>Seus Três Poderes</strong>, de <strong>Chico Vasquez</strong>. Raciocínio, discernimento e influência.</p>
  </div>

  <div class="explainer wrap">
    <div class="sec-head">
      <span class="eyebrow">O que é o eneagrama, de verdade</span>
      <h2 style="font-size:20px;">Não é o teste de personalidade que você já viu por aí</h2>
    </div>
    <p>O eneagrama é um símbolo antigo: um círculo com um triângulo e uma figura de sete pontas dentro. O triângulo representa a <strong>Lei de Três</strong>, as três forças que precisam estar presentes para qualquer coisa acontecer de verdade. A figura de sete pontas representa a <strong>Lei da Oitava</strong>, as sete etapas que todo processo atravessa, da primeira percepção até o resultado final.</p>

    <div class="diagram">
      <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="88" fill="none" stroke="#4a4136" stroke-width="1"/>
        <polygon points="110,22 186.2,154 33.8,154" fill="none" stroke="#c9a24b" stroke-width="1.6"/>
        <polygon points="166.6,42.6 140.1,192.7 196.7,94.7 53.4,42.6 79.9,192.7 23.3,94.7" fill="none" stroke="#d63a2f" stroke-width="1.3"/>
        <circle class="pt pt-g d0" cx="110" cy="22" r="4" fill="#c9a24b"/>
        <circle class="pt pt-g d3" cx="186.2" cy="154" r="4" fill="#c9a24b"/>
        <circle class="pt pt-g d6" cx="33.8" cy="154" r="4" fill="#c9a24b"/>
        <circle class="pt pt-r d1" cx="166.6" cy="42.6" r="3.5" fill="#d63a2f"/>
        <circle class="pt pt-r d4" cx="140.1" cy="192.7" r="3.5" fill="#d63a2f"/>
        <circle class="pt pt-r d2" cx="196.7" cy="94.7" r="3.5" fill="#d63a2f"/>
        <circle class="pt pt-r d8" cx="53.4" cy="42.6" r="3.5" fill="#d63a2f"/>
        <circle class="pt pt-r d5" cx="79.9" cy="192.7" r="3.5" fill="#d63a2f"/>
        <circle class="pt pt-r d7" cx="23.3" cy="94.7" r="3.5" fill="#d63a2f"/>
      </svg>
    </div>
    <div class="legend">
      <div class="legend-item"><span class="legend-dot tri"></span>Triângulo, a Lei de Três</div>
      <div class="legend-item"><span class="legend-dot hept"></span>Sete pontas, a Lei da Oitava</div>
    </div>

    <p>No livro <strong>"Seus Três Poderes"</strong> de Chico Vasquez, esse mapa é aplicado ao processo de pensar, decidir e agir. É esse mesmo mapa que o teste usa para encontrar exatamente onde o seu processo perde força.</p>
  </div>

  <div class="who wrap">
    <span class="eyebrow">Feito para quem quer crescer em todas as camadas da vida</span>
    <div class="tags-row">
      <span class="tag">Empresários</span>
      <span class="tag">Médicos e profissionais da saúde</span>
      <span class="tag">Treinadores e professores</span>
      <span class="tag">Psicólogos e terapeutas</span>
    </div>
  </div>

  <div class="video-block wrap">
    <div class="video-cap">Chico Vasquez explica o app</div>
    <div class="video-frame">
      <div class="play">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <span class="ph-text">Vídeo a ser adicionado</span>
    </div>
  </div>

  <section style="padding-top:8px;">
    <div class="wrap">
      <div class="whw">
        <div class="whw-item">
          <span class="eyebrow">Por quê</span>
          <p>Se você sente que podia chegar mais longe, mas não consegue e não entende exatamente por quê, esta ferramenta, baseada nas leis universais estudadas por Gurdjieff, vai te ajudar a encontrar exatamente os pontos que você precisa melhorar.</p>
        </div>
        <div class="whw-item">
          <span class="eyebrow">Como</span>
          <p>Pelo eneagrama de Gurdjieff, um sistema com mais de cem anos que mapeia os três centros do ser humano e as etapas de qualquer processo, até localizar exatamente onde é o seu.</p>
        </div>
        <div class="whw-item">
          <span class="eyebrow">O quê</span>
          <p>Um teste de quatro minutos, um diagnóstico completo por email, e um treino diário que trabalha só o seu ponto fraco, não o de todo mundo.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="sec-head">
        <svg class="sec-icon" viewBox="0 0 24 24">
          <path d="M7 3.5h10l4 5.5-9 11.5L3 9z"/>
          <path d="M3 9h18"/>
          <path d="M12 20.5 8.6 9l1.6-5.5"/>
          <path d="M12 20.5 15.4 9l-1.6-5.5"/>
        </svg>
        <span class="eyebrow">Como funciona</span>
        <h2>Três passos, nessa ordem</h2>
      </div>
      <div class="steps">
        <div class="step">
          <div class="step-n">1</div>
          <div class="step-body">
            <h3>Você faz o teste</h3>
            <p>Dezesseis perguntas certeiras sobre como você pensa, decide e age no dia a dia. Sem certo ou errado, só o seu jeito de processar as coisas.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">2</div>
          <div class="step-body">
            <h3>Você recebe o diagnóstico</h3>
            <p>Seu centro predominante, se é mental, emocional ou corporal, e a etapa exata onde você trava. Mais a origem provável e o que fazer a partir disso. Em PDF, no seu email.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">3</div>
          <div class="step-body">
            <h3>Você treina o ponto certo</h3>
            <p>O app usa o seu resultado para gerar exercícios diários que miram exatamente onde você trava, sem generalidade.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap" style="max-width:560px;">
      <div class="sec-head">
        <svg class="sec-icon" viewBox="0 0 24 24">
          <path d="M6 3h9l3 3v15H6z"/>
          <path d="M15 3v3h3"/>
          <path d="M9 11h6M9 14.5h6M9 18h4"/>
        </svg>
        <span class="eyebrow">Uma prévia</span>
        <h2>É assim que seu resultado chega</h2>
      </div>
      <div class="preview-card">
        <div class="pv-kicker">Centro predominante</div>
        <div class="pv-title">Centro Mental</div>
        <div class="pv-grid">
          <div><dt>Função</dt><dd>Pensamento</dd></div>
          <div><dt>Alimento</dt><dd>Informação</dd></div>
          <div><dt>Êxito</dt><dd>Visão</dd></div>
        </div>
        <p class="pv-blur">Sua força natural é a visão. Antever, calcular, enxergar mais longe do que o campo imediato. O livro é categórico num ponto que costuma passar despercebido, o centro mental não decide...</p>
        <div class="pv-lock"><span>🔒 O resto chega no seu email, de graça</span></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap" style="max-width:560px;">
      <div class="upsell">
        <span class="eyebrow">Depois do resultado</span>
        <h3 style="margin-top:12px;">Sua avaliação completa, e um treino que evolui com você</h3>
        <p>Você recebe uma avaliação completa dos seus pontos fortes e fracos. Depois, tem acesso a um treino diário que trabalha o seu ponto mais fraco e evolui os pontos que já são fortes, para nenhum dos dois ficar parado. E o módulo Domine as Leis cobre as cinco leis fundamentais do livro, uma a uma.</p>
        <div class="upsell-tags">
          <span class="tag">Lei de Três</span>
          <span class="tag">Lei da Oitava</span>
          <span class="tag">Lei do Retorno</span>
          <span class="tag">Os Três Centros</span>
          <span class="tag">Os Quatro Estados</span>
        </div>
        <div class="price-card">
          <span class="price-badge">2 meses de graça no anual</span>
          <div class="price-main">R$377,70<span> /ano</span></div>
          <div class="price-sub">equivale a menos de R$31/mês, cobrado uma vez só</div>
          <a href="https://pay.kiwify.com.br/0gvPpju" class="btn btn-gold">Assinar o ano →</a>
          <div class="price-alt">Prefere mês a mês? <a href="https://pay.kiwify.com.br/cfcPgdx">R$37,70/mês, sem compromisso</a></div>
        </div>
        <a href="/?ir=enea" class="btn btn-gold">Descobrir o meu agora →</a>
      </div>
    </div>
  </section>

  <section class="cta-final" id="comecar">
    <div class="wrap">
      <h2>Quatro minutos.<br>Uma resposta que você já sentia, mas não tinha nome.</h2>
      <a href="/?ir=enea" class="btn btn-gold btn-wide">4 minutos, a resposta certa daquilo que te bloqueia →</a>
      <div class="fine">trespoderes.app</div>
    </div>
  </section>

  <footer>
    <p>TRÊS PODERES · BASEADO NO LIVRO DE CHICO VASQUEZ</p>
  </footer>

</body>
</html>
`;
var ICON_192_B64 = "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO29d3Rc15Wv+d17K0cUqhAIgCAAZokibVKksiiJlCgqS5ZkW7Ldbsfnduie7unuWd291sx7a96bnp7Xr5/d9jhIbtsjW07KkWJQoEQFUqLEYImgCIAgciqgcr53/riFCghEqkjVt5aXqULVrVNVZ9+zzz57/7ZAYZGcTttmUVE2KgprgTUCtAFmwCGAWQFdgcdUobCEUfAAHgTcCJxSZOGYosjHFUn3rtvt9hZyMEK+36C62tgkytp7BUHZAVwL2PL9nhXKlpgiCAcFmWckxGcGJybO5vsN82IATU0Yo37bvTJ8SRCUGwAxH+9T4YJGAWUviD8YGffuAeR8vElODcDlclnFRORbisJfI1CXy2tX+AQj8DEy/3VkwvcIOTaEXBmAttZh/Svgf1OgOkfXrFBhCsr7oqz87ZAncCBXV1yyAbiqLNsRhB8JcHEuBlShwtwIf9DFlb/o8/nGlnylxb6wpQVDwGP7V1C+tZTrVKiwSAZA+NrIuPeFpVxEWsyLamy21bGodg9wB5XJX6E4WIEHLAa9NRCOHgCUxVxkwZO3zmneKcvi41TCmRVKhxcSgvbzizlDWJAB1FRb7hcU4ZHKYVWFUkOAD+NCfJfbHepdyOvmHZ93VVu/gSL8tjL5K5QiClwkKZpXHQ5H80JeN68VoKbacj+K8FsqB1oVSp8ujSJdPzAx0T2fJ89pAE675QZRFF4A9EseWoUKhaFDiilXDPr9I3M98bx39BqbbbUoCk9SmfwVyouVCa3w2Kp5zNtZw6AtLRjUUKfQksOBVahQKFZEjPrmYDj61PmeNKsBaAXb91Hj/BUqlCubzCZ9TzAUfX+2J8y4B6hxWK8BXpvt7xUqlBEBWeTSsTHfqZn+ONMeQKvAj6lM/goXBmZRVn4DaGb64zQXqNZh/RvgwXyPqkKFwiEsMxkM48Fw5O1pf8n8j5qaGgvx8FnAWaihVahQIHyKlFg3Ohrsz3wwywUS4uG/oDL5K1yYWElI/zz1wdQKoKY3WzuBZQUd1gWKJApYLVqsZi1Gg4TRoMGkl9BpRURJQKvJ3n7F4jJyQiEakwlGEoTCcULhBL5ADJ8/RkJeVLJjhWwSssiGzA1xamMQnLDdj6BUJv8CkSSRWoeeGqcBV7WBGoeeKrsOi0mDKOQmjiArCv5AnAlvlJHxCKPuMCNjYYbHIyQSeSmVvVCRBJl/AL40+UDqF3JV2fYJgrKzKMMqIww6ieUNZhrrTTTWGqlzGpGk80/0cDhBMJogHI4Ti8uEIwkAEur/ISVDEQa9hFYjYjBoMOkkDIbzl2skEgpDYyH6hkL0DgboGQgQiVYMYg4SgiyuHfZ4OiBpAE6nsVGUNd0sskDmQsdVbWBls5W2JgsNtUZEcfqE9wVjjLojjLjDuCeieP1RJvxR/P74ot0XSRSwWDTYrXqqzFocVTpqqw04q/VYTdppz5dlhb7hIF09fs6c8zE2HlnU+34C+L9Gxn3/AEkDcFXZ/koQlH8r7phKC2eVnnVtdta22XBWZaeUJBIy/SMh+geD9A2H6B8OEgonCjo+o0GisdZEQ52JxjoTy2oMSFL2vmJsPMKpLi+nOjy4PRVjyGBgZNzXDMQFgBqH9VngtuKOqfhoNALr2uxsWuugoc6U9TePN0Znr5euHj/dAwHi8dLalGo1As0NFtqaLLQut2K3Zq8QfUNBjrWP097pKbmxFwMFbh8d9z0nAFKNwzoKVBV7UMXCZtWy5WInl6xxoNel76Jef4z2Tg+nOj0MjoaLOMKFU19jYF2rnbVtdmyWtDFEojInTo/z3skxvP5YEUdYXAR4aHjc9w3B6bRtFWXlcLEHVAzqXQa2bnKxZoUt5dcnEjLtZ32cODVOz0BgcZXWJYQALF9m5pJ1Dta2WFNukiwrtJ/1cuTYKENj5WXcOaJ3ZNy3XKiptn4VhYeLPZpCUuM0cPXmWlausKbCYN5AjKMnxzh5eoJQpLD+fKEw6iU2rHWw5eJqrGZ1VVCAM2e9vHF0hFH3J8sQRJRLBJfD+i8C/G2xB1MIbFYt27fWsbbVzmSIfmQszOETo7R3ej8xh02SKLC2zca2jS5qqg0AKAqc6vJw8PDQJ8c1EviqUOuwPq1c4Hn/Go3Ato0uLt/kSrkAoxMRDh8b5cMzEyifjHk/DQFY2Wzlqi011DqNAMQTMkdPunnrgxGisQv7TEFQ+DehxmE9Bmws9mDyxeoWGzuvrMeSjJt7AzFePzLERx2eT+zEn4ogwPpVdq69tC7lGvkCMfa/OcCZbl+RR5c/FEXYL7gc1rMCrCj2YHKN2ajhum31XLTaDkA8rnD0T2O8+cEIsQv8zrZYNBqBzRc7ufJTNWi16krZcc7HvjcG8AUvSLfolFDrsI5daIrO69rs3HjVMgx69WC7s8fPvkP9nxzfdonYrFp2XdVAS5MFgFAkwd43+jndVdDmLYVgUKh1WCMXitiVTity3WX1bFrnACAcSXDwyBDHTo0XeWTlydpWOzdeWY/RqOZMfvixh71v9l9IK2hEqHFYLwhPuMZp4K4dy6myqbbc0eNnz8E+gqF4kUdW3piNGnZvb6Q1uRq4vVGe3tfD6PiFETK9IAzgopV2brqmEa1GIJGQee3IEEdPukv+EGtNsxWA0+dKe6MpABvXObjh8mVokt/x3kMDnDw9UeyhLZmyNgBRENh+WR2XblCL2Ca8UZ460MNIGZxsfuveVdx6TQMAz7/ez48fO1PkEc1NndPAnTubU3lGR06M8drhwbKOpklmo/7/KPYgFoNWI3DHjuVsWKOmMHX2+nlsTzdeX+lvdC9eaedb961OHcatbrZy/OMJRko8fTkQivPhmQlqnAYcNh2NdSZqqw2cOedDLtNtQVkagMmo4b5bWljRYAbUO9Geg31lkeUoCgL/+JWLqLan4w6CAG0NFva+NVjybls8ofBRhwetTk3Hrq7S09Jo4cw5H7F4+VlB2RmAxajhs7e0UOs0ICsKB94a5O0P5tRALRl2XbGMm6+aXnlabdcxOhGho9dfhFEtnLO9fvyBOG3LLdgsWlatsHKm21d2p8dlJXdut2l54I42nA498YTMU3vP8f6H7mIPa94Y9RIP3jr7meOXbm3FbCyforzj7eM8vb+HREKm2q7n87e1YrdNr1QrZcpmBbDbtHz+1lZsFi2xmMwTL53jbF+g2MNaEH92WyufTp5RAKnN4+RewKCX0Igi77eXz7mF2xOlfzjEmhYbJqOGNS02Pj7nJRIpj5WgLFYAq1nLZ3e3YjVrCUcT/OHFbs4NlNfkX+YycNu1DVmPvfruMK++O5z12G3XNtBYYyzk0JZMd3+AP+zpJhKVs36rcqDkDcBk1HD/LSuwW9U7/+N7ztE/HCz2sBbM1+9ZlaUFFInJPPJ8F798tiulEgGg1Yh85a62YgxxSfQPBXnspW5iMRm7Vct9t6zAZJxRjrOkKGkD0Egi99zYTLVd9fmf2Feek/9Taxxsuzg73eoPe88xPB5hzBPhsQM9WX+7bIOTLesdlBv9Q0Ge3HeORELGadfzmZtWoNWUtsZyyRqAKAjcfkMTy2qNyLLCM/t7ONdfXm4PgCQJfP2e7Dv68HiEp15JNzN8/EDvtLLEr929Es0cekOlSHd/gGde7kVWFOprDNx6XRM50gfLCyVrANsvq2PVCjVV4MBbg3T0lEd4cCq3XtPAimXmrMcefrKDSEa4MBaX+Y+nu7Kes7zOxC1Xl6dQ35luHy+/PQio9Rjbt9UXeUSzU5IGcNEqeyq94ciJMT74qHxCnZlYTRo+f1N2184TH0/w5rHRac89dGyED05nR38euLklS9GhnHj/T27ePTkGwNZLnKxfaS/yiGam5AygptrArqsbAejuC3Dw8FCRR7R4vnhrS1Y0RJYVfvZk56zP/9njnSQS6bNgi0nDg7vLt1bp1XcG6Uwe7N18bQN1TkORRzSdkjIAnVbkrp3L0WgEJrxRnnm5BzlHmVYmUeBLLgf3VNuolvJ/2NRcb2bXFdkuzEtvDdDVN7srd24wwN53BrMe233lMloaLHkZYybVksS91Ta+5HJgmkH6cTEoCrzwSi8eXwyNJHL7DctTlWalQkkdhO26uoHmBjPxhMwfcpzY9rWaar7kcnC5xcR91XY2mNRYe180Rj5EUP72S+tpyIjn+0Nx/tvPP5xTvPZUl5ddVy5Dn5wogiDQVGfkQB5WQr0gcIPdwrfqnPxVvZPLLWY2m41oBIF3A6GcvEc8odA7GGDDmipMRg0Wo5YzJZT+XTIGsKbFxjVb6wA48PYgnTn+ki63mLjYqC7BoiDQqNNyrdXMZ6qraNZpCSoKQ7F4TpLRrtzk4r4bl2c99qvnujg2j/z5aEwmkZDZvD4dNq1zGujqD9A7tPQQsAh82mzkyy4Hf99Qyw6bhUadNkvK/VQ4yuFA7sLNgVCcaFymtclKrcuAeyLKaIlkvpbESYXFqGFXMje+o8fPsTzk95yNRGd83CQK3Fxl5eYqK8PxOPs9fl7y+Gd9/lxoNSJfvq0167Ge4SDPv94/yyum8+zr/dx0RT3N9eno0VfvbOPdD92Lzrhs0evYZbew026hVnP+n70rkvvJefSkm5YmVWF751XL6BkIECiBar2ScMh2XqkWsIfCCfYc7MtLSnBHxoQejsd5aMRNdzR7ktdqNDzgrOJXbU081NrEfdV2HAvcL9x9QxMNtdmpDD9/ooN4Yv6fKpFQ+NkTHVmP1bsM3HV904LG4pAk7qu281BrE79qa+IBZ9W0yd8djfLQiJvheHoydizS+M+HAux5rY9QOIFRL7HjytIIjRZ9BVjVbGV1qw2Al98ayFsNb1c4ioxq8U5J4vduD78enUjdGXdXWbMm+xqDjjUGJ39R5+T9YJCXJvwc9AUInUc9rsqq494d2a7PkT+5efejhSe3fdA+wbsfurn0orQr9Nkbl3Pg8NB5pc51gsBWi5Gb7BautpjRzHAK5U3IvOrzs9fj50QwjFYU+HOXevIsM/tquVQCoTgvvzPArdubWNtqZ1WLlzNni6s0UVQD0GpFbkwe9nT2+Pmww5O39worCoPROA06DZIg0KzV0hGJcjYS5afDbh4eGedTRiM3V1m41mrGkIyEiMAWk4ktJhN/o8i85Q+y1+PnbX+IxJQI1VfuaMWU0dUlnlD4+VPZd/KF8NMnOti0piqVQ2TQS/zZbS3822/as54nAhebDNxkt7DDZsEsTl/YY7LCkWCIlyb8vOEPEM8Ye7NOlzKUgWjsvEa+VD782MNFK6tobbKw84p6unt9xIpYyFRUA7h8kwuLSUs8rrDv0Px95MXSGYnQoFM/cptBl7XUJxSF94JB3gsG+b4ocpXVxK4qC5tNppSArl4Quc5q4TqrhZF4nIPeIC94fJwJR1i13MJ1W2uz3u+Zg330Di8+mjIwEuK5N/q5+7q063PD1jpeeL2f9nM+Vui0XG+zsMtuTX2uqbSHouz1etnr8eOdpZ9Ymz59VtGZp7t/JnsP9fPVe1dhNWvZtqmGQ+8Nz/2iPFE0A7BbtWy9RD3tfef4aEFEqzoiUa62qhvLNv3sUkh+Weal5Ga4RqNhu83ELXYrKw3pTjE1Gg2fqbbxmWob3ZEo4gYrUkhGMakrgMcf4w8vnVvymH/7YjfXbanFYVXHK0Zl/nFbM15xnEuMMx8snYvGOODxs9froz86t0u5MuO76Ajn3wC8vhiHj41y5eZatm10cuL0eNFquYtmANdurUOSRLz+GIePF6aksTOc/pLPZwCZjMTjPOb28pjbO+t+YYVeBx9HUM4MIDfqia028bv3+/HnYD8TDCf4wwvdfPvyJrSng2i6QlhkYMrk9yVkXkn69SeD4QUFEtr0acMuxAoAcPj4KJesdWA1a7nm0jqez0gOLCRFMYAap4G1rWpuyOvvDhWsmD0zvNdmWLgY3lz7BUEBqTeC1BvhW7KejQ21vOqbeb8wF5N+/fVWCzeO6jC+ODbtOTFF4UhA9esP+QPEFnlq3mZIu0BdBTKAWFzh9XeHuWV7I+vb7LzzwWhRxLaKYgBXb65FENQmbh/lceM7ld5YnIgioxdEajUabJI4q198PjL3C4O7W7i/tRrtx0GkvgiTt16zKHKT3cJNdgvD8Tive4M87/HRET5/jH0+fn3CpSO+xsgf+sZ5eM/gjM+ZL1ZJpCYZGo0qCn2xwsXmPzrj4bJNLpxVeq7aUsPT+3vmflGOKbgB1LsMrEymOb/x3nBBRZUSisK5SIzVSV++Ra/jeHDxd52aKgO37GgiphWJrTUjBOL0vTqKsSNEsy59V63N2C+cjUR5yePnxQkf48lGwVZJ5HqrhZuqLGwwGpgpE2coFiewQk/d9hpku/qz3XqRmWcODzDsXvzBVaYreDYSW/BKtRRkReHN90a4fUcTq1ts1DqNDI/lJgVjvhTcALZudCEAw2MhPi5CDLgjHE0ZQJtevyQD+No9ramcHYCoXuSf3u1m2B1hvVHPTTYrO2xm7Jr0fqFFr+ObtdV8tcbB4WS+zbZk/s1UPPEEB7wB9np9fBSKUDNq4Ce765j02LUaka/c2cY//+KjRX+G1kz/f47VKR+0n/VwhduFq9rA1o3Ogu8FCnoSbLNqWdOiHnodPj5WFBGozE3eSv3ic+0varNz5caarMceO9CTuht/FIrw/aFR7j5zjr/uHmSvx08k4+6qEQSutJi40mLKmvwxWeFNf5D/vXeYz5w5x/eHRvkopF5zZCLMky9nT5CrP1XDJasX3+BzZRH8/0wUBd45odZHrGu1Fbz+oaAGsOViJ6Io4A3EiqY1n/kjty5iIwxqMt037lmZVeo35onw+Aw+bEJRGInHGIzF8CTmzjsdlxOcCUfojERm3NT+cZ9aS5zJN+5um7F7/XxozXCBChUBmkp7hxdfIIYoCmxOFkIVioIZgEYjcMka9bj96MmxojWk64ykQ6Gtet2M/vZc7LpyGauWZ+fo//KZLsIZqc52jcQ91TZ+0tLIIyuX8yWXY1oeTm80Rm80O/5dq9HwJZeDR1Yu5yctjdxTbctyoSIxmUeeyy6fbG20sOvyhefWCEw1gOLE4hOywnt/UhMgL1lThaaAhfQF2wOsa7Oj14kkEjInPy6erPZoPM5EPEGVRsIiitRqNQwtIPJhMkg8uDu7zPHUWS+vvjeMVhTYZlbzcK6ymNHO4Nf7EzJv+oPsmfBzNBhEAdYadeyy2dhhM1OVMdnXG/WsN+r5Tq2TD0JquPNVb4BX3xtm91XLuKgtXWb4hVtbeP39kQWdPdRqNViSaROeeILRePGyM0+cHueaLTUYdBJrW+38qUBzpGAGsGmtevdv7/IRChe3D29XJMqnNWrG5kq9bkEG8MDuFqqs6bumosDep7r5bq2LnVM2vJNk5uHMFK9vD0VpD43yo+Gx1PnCdpsZfdKAJEFI5SN9r17mTV+Q15/uYd1fpht82y1aPntzMz8/T8nlVFZluID5yABdCOFwgtPdPta32dm01nFhGYDTrqehzgSoepLFpisS49Nm1QDaDDre9M+v+GN5rYnbknULoi+B5kyQ+Ace/tHggBmyEibzcPZ7A0zE5zb6rHykIZGrLNPzkSyT5wtA6Bf9SBssxNaZke0a7rimkX1vDXFucH7yMZnuT1eR3J9MjrdPsL7NTmO9iWqbDrc3/0ZZEANYl1QE8Ppi9JaApGHmZi8zDDgX37yjDeOZYNah19RXD8XiHPD6eX7CN82/Xwj+RDofqU6rYYfNwq1VVpoyzheMMQXe96F735c6HPv2bW38/cMn5vUebVn+f/ErtHr6/HgDMWxmLWtX2nnr/fynyBTEANa0qaHPU52ektC/78j4secKhU769Z9bXs3Gt0OQmL5azOTX55KhWJxHxyZ4dGxi1v2CNBpFGo1ymQAPXbScx/rGedUbyAq9TiUrCa7ILhCoh+jtXV62bnCyrtV2YRiAy2HAVaXeJ9u7Cpf2cD66IlEU1CjIcp0WrSBM88unTTQFyKjqUkSBd3wBXvb455xouWRyv/DjkTG2mY1cb7ewo8qCmPSwBAXWoOUfGmr5Xt3shqlN1kWD+tG6S8AAANo7PGzd4MRVbcBZpWdsIr8rU94NYFLdzeONMThaGr27QrLCQLI4RiMILNdp6YxEZ3U1Mpl0Nf7lSC/7zxWvMUdMVjjkC3LIF+RNp8LfX9s8LR/JImXkI8Xi7M9wzZqThg8wEI0TLFJYeiqDIyG8/hg2i5aVzdbyN4C2ZHvNzp7SkcIANTN0MtnsAWcVy3QaNsySXx+3SCTWmomvNiFXaTh2eoL9BUrhng8vHxvh+qvq+fRtNYgTcTQfB5FOB9H40tGtWq1a7/yAs4qToTADGXUC+SiCXywK0NXjY9P6alqaLBw+Pl1FL5fk9SBMrxOpTxaId/aWjgFoBSHrjnej3TJt8vsSMs9MeHlllUjowWVEt9qQqzTIssJDCwg1FoqHnuggkVCQqzREt9oIPVDPy6tEnpnw4puS8brBaOBGe/ogLygrM55ZFIvOZOOTpjoTujwLaeV1BWhusCCJal/ZUmhoMdsGcpKEomQdODU0mPn+DcvIPC5+8dAAZ/tLT6j33GCQPW8NcOvVySYcAmzZsYy//mCQH5wZO+8B3Y12C1dYTHndyC+Ec31+EgkFSRJYvsxMRx6FtPJqAI31auy/fzhUtA6ODToNu+xWbkwKQM1ETFb40bCbA15fVn3A1BwbfzDOb/Z0533Mi+XXz5/l2k/XpPRIJ3OW/v4Hx1L7BZskssNm5du11WgzPlvmfqEvGmOf189LnvmVVOaaaExmaCxEQ62JpjpTXg0gr+tLU/Lwqy8HimYLwSqJ3FFl44ctDTy6spkvuxzTJv9ANJ6K/GhEgX1TJv9MWZaP7jlbkNrlxeILxvnt3uw65KlZq96EzD6vD01y8scUJWs/ANCo0/Jll4NHVzbzw5YG7qiyYZUKKyHVN6jOmcmbaL7I2wogSSK11apf3b8EZYR5v58gzJhGkIlfVtMIJpf5h1sbWWXQp5LCTiRrAybz7DPpGQrywhsDef8cS+X51/vZdXl9Vk+Cr93TyrsfjqV6ErRlJAGejUT5Wldfyj3MTOcQgEuMBi4xGvhenfO86Ry5pncoyFbUAipJUnPI8kHeDKC2Wo+U7HCSz7ZGC/XrM+P1nZEYq1LFMWkDuHfHcmqrs894H35yYepuxSKRUCXY/+tfXJJ6rKbKwN03NPG7pEpFdhG8uqJNPV+Yul/Qiun6BV9C1UfK535h8qYpSSI11ToGR/ITQs+jAah3f18glvPkt1qthp02C7dUWVk+i18/U+nhVDqyimPUU1GnXc9ndmaru71zYoz3FqHuViyOtY/zzskxLsvIrb/vxmZePjzE8Hgk6/R7ao1y5vnCbKWa1oz9wmTqx3MTPvqWkPoxlWAoTiAUx2zU4Ko2lJ8BuJIGMLKEetVMLLOIVWWykOJzyC4BnMyL+fIdrRh0aX9XbV9UemHPuXj4yQ42r3OkVOX0WpEv3trKv/76VFYh0PmqwCZDwc9MeGnWablhhmL9uozzhcnkv33eAJ55JP/NxYg7grlRQ40jf4018mgA6jK7FKkLAbjSamKX3coVFhO6Wfz617wBXvL4OL5APZyuKcUx61qsXLclW93t2YP99I0UtlA7FwyMhnnuYD9335BWlbvu0lr2vDlAq2bhWaDnojF+OTrOr0bH2WgysMtuZbvNnKonANUdXWt08c1aJ2/5g7zk8S1KEmaSEXeYlkYztY75JywulLwZQJVN/ZLdE4vPMfnbZTXcWmWd9nhcUTgcCLHX4+eQL0B0sV9wPI43IWOTRCySyLdvyS5z9Phi/H5v6YY95+LRPd1sv7SW6uRvIQjw7d1tWF5Wc7K8CZmRBRbBKMCxYJhjwTD/c3CUq6xmbrJbsgr7dYLAdquZ7VYzL074+OeBxZ2ajydFgO22MjMASRSwmNRLe/2LN4A1U2p2T4Ui7PX6ODDP/Pr50BmJ8Klkt5jVBh2Z0+FXz3URCBW3eGcphCIJfvPCWb77uTWpx7J1QJfmnkYVhVe8fl7x+qnSSOywmbnJZmWdMT1h1xoXP3knfOrcsZo1iKKAnId8pbwEd62WdMeRiSUYwDPj6QOQiKLwT71DPO725mzyQ7ZcouhO/7uj18/+d8q3Qd8k+94e4nTGQVLmZ8z87EtlIp7gcbeXf+odyoq0PelevPjB5JmLKApYzPlxVvJiALbkSaSigN+/+JPE5ya8nEpKgugFgW/WVs/xioWTuQkU3el/P/RER84a9BUTWVF46ImOlABZlgHkIQX6m3XVqTOYM+EIz3sWf4rr9cdSezq7eXEKHnORFwMwGlRrjUQSS1J/kIEfDqX1g3baLWw05TYiMJHRzEV0q8Z68OgwJwso2ZhvPury8voHqgS5NJY2AG+OD1kvNhrYaUsn2f37kHtJSnOJhEIkqq72BmN+OnvmyQDUwQajS3dVToTCvOZTk88E4Lt1rpwO+vpdjalkN2k8RjQc5xfPdp3/RWXIfzzVRTgsI3qSK7IA229cWMul8yEC3613psLTr3j9fBBcevQsnDxDMunL0ADCOWp39KMhd8qvXGPQsWuGyNBi2LSmiq2frkG2JL9cGV7e25ezs4tSYnQiwqsv9aSq2mSLhm2bXXw6qdaxVHZVWVmfPFWPKDI/Gc5No8NQJLkCGMpoDzCZwx2O5SZ/YzgW53djaZmMb9ZWz9gGaCGIosDX71bzfWRnRm3s+7nvUFkqnHk/fZotO9UJ9fV7VqZSVhaLSRT4ek3akH476mEwRyrTkUkDyFNdQF6uKiUnp7zIlp4z8ZtRT0q/xyFJPOhavB4mZHdgl6vTd5cmqbDalIWkWZv+nLJT/ZzN9aZpHe0XyhddDpxJ1buReJzfjuVO02cy/0pcopHORn4MIOlRxHMYt40oMg+NpNqbNgcAABp8SURBVO/O91fbZ63bnQuLScODu1ek/jvhTF9nMY0zyoVMGZREdfrfX7y1JVVDsFAadBruc6QV6n467Cacw+hZQlZvoppFap/ORV4MYNJa5RyfIe1PtvUEtazxW4sMiz5wc0uWCnHckf73ynm2TipHMg0g7kivBlaThs/f1DzTS+bkO7XOVGHNn0Jh9ntyWy03mcco5kkvtCQaZc8XBfjB0CiTjtXVVjNbzcbzvWQay+tM3HJ19pK/r32MWHK1qtVqsBS4+KMQTOqggprxuf90dsulW69pyKohmA+bzUauSjYdlIF/HyyO5P1SyMsvLaf8ttxf+3Q4yt6J9OHKd+qcSAso6P7a3SvRZPiToUiCR144y7lk13gBaNVdeKtAqyFdBNMdjfKLKWkekiTwjbvbZn7xDEiCwHfr0unWL034+CgPDTYm3Wk5TyW1eTGAyWUrX37bT4bdBJK+YYtexx1Vtnm97rINTraszw77/XZPN25vNFs2/QLcB7RNkUH3+GL8YV92+eSmtQ62XTw/t/JOhzV1zZCs8PBIfuolJgMqudxPZpIfA0hOTlGTH1diPJHg0YxIw1drHNjmcFu0GpGv3JV9hxsYDfPsQbVBd0eOOseUKjPJID7zWt+0VO+v37MqVUMwG1ZJ5MvO9I3kkdHxvEmra1L7yTIygGiyUURmYUmu+f2YJyU+a5VE/tx1/jvX7dc20FiTvV94+KkOYslQbWZmZNsCBHPLhawVIOmqzFTss8xl4LZrG857ra+4qlN1w/3ROH905y9tRJ88AQ7nIKtgJvIyQ4PJwwujPn+qKzFFyTptzFySp2K3avnsTSuyHjvWPs47J9IbwalNtEtHJio3zCaF/s6JMY6eynZfHrh5RaqGYCordDrucKRP4n80PLboeoz5YErOoXCeekrkxQBCYXU5NBjyk78xyeu+AEeSnRanbsoy+dKtrZgzkqlkWeFnT2Xf+dTiGPVLtkgiLk3BeofknczI1kxFMA89kV3wb9RLPHhLy4zX+k69M1X4cjQQ4g1ffgXPJufQ5E011+TFACat1aCTkPK0EZ7kh0NjqYxDNSyXneK4ssnMjZfVZT32/BsDdPdP/+Ey74yZ3dPLnbn6APQMBdlzKFvy5cbL61jdnN0H7SqrmW3JsHNCUfjh0PTu9blEkgR0STe6rFYAb0CdSIIAFkt+76RnI1GenUgXXXyn1pWlePb1e1ZNU3d7dBZ1t86svgEXzj5gZZb/P3MRzK9fzBb9UlXlVqVKRKcePD4z4c17TwGbRZtyRT2B/LxXXgzA54+likmqLPkPKf58ZDzlvjToNHwmeTR/7eZaNqy0Zz33kRfO4gvMPAmm7gMuFOajAuEPxnn0pewbw/pWG9d8ShUJuLfanpKg8SVkfjGa/x5e9uRpvSwr+AP5iTLlKQyaHrC9AAbgTcj8cjS9kfszl4N6o44/v70163nnBoPseXN2dbfMCqkLKSdovp1gXpjBNfzKXa3UGbR8ISP58D9G3TmRPZkLe7IZoS8Qz0s9MOQxFWIi2eDMUVWYifTUuC91dzOJAv95QyM1U9TdJiXEZ6MzEkkd5Wc2kChnJhuAgJpKcvY8BiDLCj97siPrMVeVnv9ySVNK/qQ7Gs2q1c4nDrv6+0348lefkTcDmCwqqanOn6hRJglF4QcZm7J1ARFxOP1jv318lPfn6FAZlBWGkynXmS2EypnlGYY8FIunTtBn49jpiazwsDgaY10gPU1+ODhGvEC10rVO1QCG81iglDcDGHWrWZtT78L55GggxCFfUodUUTAcmgAleeAzzzLHmeQSy5lsGcT5bSQfyjggVL9DdcIf8gU5HCicSNikItzkXMoHeVwB1EFbTNpUiWQheFEbRklGfaShKNqOIE+92jdvherOjElyIWyEW7OEcOd3Jx0cDfP0q31qz7GB5GskgX2GwjXSMxk1mIxqBLEsDWB4PJKStG6sza/G+ySiIHD3Pa3ENqbj15o3PTy7v2fe18juIVz+BpC5me9cQDPsp/b1oHk7HemJbjBz190tKb2nfDPZWD2RkBkZz5/h5c0AEgmZoTHVcic/TL7Zsa2ONc1WolusKCb1o2mCCe4wz7+IPssFugAiQVlnAAuI299lsaIJqDcwxSgS3WxnZZOFG6YcKuaLyeYqAyPhvPUGgDwXxPQNqW5HYwEMwKiX+OJtLQAoWpHI1nT8/wGXnTrt/A7keqKxVHFMnVaz5OL7YmKeUgQz3871NRoNn3emw56Ry+woevXO/+XbWrLSSvJFqrvQYH5TLfL66/YmWyMtqzGgzVNJ2ySf29WclcAVXWuiW1EjOnpB5Bu1M+cJTSWhKJyLJU+yKW83KDOp71w0Ou/ozbfqqjEk91E9cpzomvQNrMqq476diyufnC86rUitS90A57u9Vl4NoKfPT0JWkCSR5gbL3C9YJMtcBu7Y3pj12KtHR/iX7uG0qpzNzKZ5qspdKBvh1kX4/xuMBm7IUHf7f3qGee397F69d17XOC21PJesaJzsLqpwbrCMDSASkxlIRl9amxZWb7oQvnbXyqwijmgswSPPdXEyFOYVb7pI+7t1znl94OwT4fI9C8gKgc7D/5+q7nbA6+dYMMwvnu4kHE374TP1UMslLcm50jcYIJYjbanZyLuD29mrTsC25fMrW1wom9ZUcdkl2e7NH/f1Mjyuhu/+3yE34aRPv9qg52b73BviLAMo46S4tgWGQHdXWVmXoe7202S9xZgnwuMHsiNpl13iZPO63KjKZSIAbU3qbzTZMDuf5N0AznSrmZp2q5b6mtyeCouiwDfuXpn12MhEmCdeTv9YU4WavllbndXVZCayDaB8XaCWeWSBTmISBb6aoe72aIYQGcDjB3qnnchOFRjIBfU1xpRkTWd3/lMu8m4AY+MRxpJ343VtS1Nzm8qtVy9jRUO2a/UfT3Wl2oFO8tux9I9ZpZGyErtmYjgWx5cMvVklkZoyLI6p0WhSddL+hDxnze6fZai7DcezpShBdSt/+Uz2aXpzvYmbr1qaqtxU1iWzd0fcYcY8+ddoLUiM71SXugqsbbXlrNTQYtLwwM3ZZY4fdnl544Pp7XgiisxDGeWTmam9s9GVdSBWfvuAzL1LRyR6Xr2ezBRygJ8Ojc2o7nbw/WFOnMk2jC/szhYZWwqCAGtaVVe5vXPxjTUWQkEMoD2ptW+zaFnekJvN8BdvyZbzUxtBnGG2SN9+r5/jWapy5w+LZhXJG8pvH7AQ/z+ziOhPoTAHvLP73g890ZmVmmwxaXhg14pZn78QmpdZsJm1KMBHXYXpzyDUOKwFSe178PZWGupMfNjh4flXepd0reZ6M//+d5uzVI1lRSE4Rz8vrTuG83k3QtJK3DsdRBpmntym00Hsb6t3oVCbkYmr7TM+r1SpesODsVONwHkutxFcM/NhpG4ggnOfmiWrCAJju6uJuc5/RzcZpayUiERC4bv/cpRzSzy0uv2GJta12ekZDPC7584u6VrzpWDO7bH2cRrqTKxtsfKyQVpS8+z7blw+TdJbFNKN+WbFpCG+1oT2lPpDVb3nI9BmnnEdlOoNgGoAek987muXGDpP+vvV1htmHr8MpqPp1Of4WhP6ZiMLXe8kSeC+G5fzr4+cWuRo1eL31SvU6M/xOdLWc0nBzvlPdXoIRxNIksiGNUsLn1mMi5+MkW221LG+OB5H++HMYq6yQ5vqHCOOxyG/4ejcIqvdbgAQIFE98/el/ZM/1TJJ0YpEti1+lVvKbwKwcY0DSRIJRxOc7ixMwQ0U0ADicYWTp9UN1JaLq5ekFvHH/T2Lbl+qmCSin0qfSeiPeBHC02e3ohdQzJPClEq6tVAZIHpiIE92gpFgBoEyISKjfy+90cxMIFwogVCCPy4g43YqkiSweYNacH/i9ATxPCa/TaVgewAAq1nL1z+7GkkUeP7VXj48s/iNjkEv0VS7uON4DfCfTU7qk+q9L8eC/CYyfSX4S6OdjZLqEPw07OFwvDxaJ23T6PmmQb2bH0tE+EFo+vf8Bb2F67XqvmBETvBPoTEWqz/bOxwivATdng1rqth9bSMJWeHhP3ycpU6Rbwrq2PoCMU53eVm/0s62jS4+OuNZtJx2OJLgTM/iteh/YFX4b01qau92jZFHetzT0oVP1OrYmCzLM/llzozkVvs+X1xfo4PkmeOJ8dC0cbfodVzbmr55/Fv/CKd8+c25mQ1BgK3Jk/z2Tm9BJz8UoT/AkeOjKKi1wmtaixdZOeQLpMr7ZlOV6wqXZ0pEtgzi9FUrU1I+q4y0CKxrteNyGFCAw8dH53x+rim4AQyNhTlzVvU9r9xSQzGFF340lC7w3mw2crU1+4ziTJmmRGQW8pyZkgV6TUZTkYSi8O95Vnc7H6IgcMXmGgBOd3lSZbQFHUPB3xF44+gIiqJKbqxfVbxV4GwkW+Lj2xntfiBZHJM0kHpdeRTHmEQhVfwTUxT6MopgtILAf8pQd3t63JeXbvHz5aLVdpxVehQFDh2dfoJfCIryi466w5zqVDdm115al/dimfORKfI0teFbXFHoiaaLY1rKYBVo0+szimDSBgzZjQVVdbfitYTVakWuuVRVnfuow5PKFys0RbulHTw8RDyuYDVr2bbRVaxh4EvI/HIsffCS2fITyk8mJbsPQHrsU1vLqnKSxTvcuHyTC4tJSzwh8/q7Q0UbR9EMwBuIcfiEuunZtsmF3Vq8hLNMV2Bq0+fMjXA5lEdmJsFlujeZzcWnCgoXGrtNm4r8HD42VvDITyZFdWoPHxvBF4ihkURuuur8XUnyydTN4K4qK+uTCXDlVh2WnQSnjn2NQceuqoymFkOFU3ebigDsuqoRSRLx+mO8c7w4vv8kRTWAWFxh3xtqj66WJgsXrS7ehlgNB6o5QpmlgeVWHZaZut0ZiSIA36tzpX7oNzLCv8Xg4jVVrGhUo20H3hognqfuj/Ol6GGNjh4/7cnU1xsuW4Z5iTklS+GHw+l+wRcbDey0WRiOxfEnfWVbiXeOUYtg1NNtvywzEouz027hkqQYQExR+PFw8Ta+FqOG67fVA2pu2JkCVHzNRdENAODAm4OEIgmMBond2xuL1p+rPxrnsfF02sA366rRC0JWcUxbCRfHZN39w1F0gsjXa9Jhzz+6PfPWBso1ArD7uiYMBolwOMGBtwaLMo6plIQBBEJxXkq6Qq1NFjbPs1dtPvj/RscZS5YPTgpElYtcYmbhTmckwoMZgmDjiQS/KUBTi9nYssFJS9L12XdogGCoNJILS8IAAD7u8nKyXf2Btm+ro85ZGFn1qQRlhYeH02HRz7vsBDMkxVeWcHVYZpjWn1D4XIa620+H3fjnkEbPF/UuA9duVWP+x9vHOVWgaq/5UDIGALD/7QHGPVEkSeTOnc0Y9YVTlc5kj8dHe0i96+sFkR0ZQlHl4gLdZLegT+aZtIeivDRRHH/baJC4c2czkiTi9kR4+a3ZO/QUg5IygFhM5sm954jGZOxWLbfvaCqYGnEmMvD9odFUpmpthq5oi06XSiQrJSRBoEWXXgEmx6wAPxweLUo9jyDArdc1YbNoicVkntrfQ6zIUZ+plJQBgCrCtPd1dT+wosHCtdsKo0Y8ldmKw7WiQJO29FaB5TptVh7TJJliAIXm+suW0dpkQQH2HOwvWrrD+Sg5AwD4qNPDkWSbnq2XOPn0RcXZFP9kaCylKpdJKTbQmylbdaocTCHZcnE1W5JVXkeOj5aU359JSRoAwGuHB/k4mTZ9wxX1rGqev8Z/rhiJx/mde3rkpBT3ATON6dGxbHW3QrFqhZXrLlfj/ae7vBw8Urxcn7koWQNQFHjulT76h4OIgsAdO5bT2pQ/henZmCoRCKWZFDf1lHo4Hue3RQh7rmgwc8cN6t5tYDTE86/1zqrVVAqUrAEAxBMyT+7rYcwTQZIE7tyxvGDdZibJFImdpLUEUyKmukA/HnITKfDMa6g1cfeNasRndCLC43u6i57qMBclbQAAwVCcP77QjccXQ6sVuXfXioIbwaRM+CTLdBpMS1C1yDVGUaBel45UTZWFLwQNdSY+c3MzWq2Ixxvjjy90L0n7qVCUvAGAWkz/+xe78AVi6HUi99+8Ypoobr754VA6lCgAK3Sl4watyOgEIwPfHxxdtNjAYmhutHD/7hYMOin1W/mDxUtxXghlYQAAHm+M3z7flVoJPrOrmVUrCrcxPh2O8lwyhz6iyIzGS+fuNhZLEFFU83x23MvpefYDzgWrWmzce9NytBpB/Y2eU3+jcqGgukC5wGzUcP8tK3A5DMiKwitvD3L0T4UJ9UmCwGVmI33RGN1FSiqbjRU6LY06Le8EQiQK5PtvWudg55XLEEWBMU+EP77QjS9QWt/LXJSdAYDaRPmem5pZluxT9e7JMV57Zwi5lMMNFxCiIHDdZfWpOH//cJAn9p4rC59/KmVpAACSJHLL9gbWtalFNOcGAjz7cm/JZBleqBgMErdfvzyV2flxl5fnXust+WjPbJStAYCaa7J9W32qvtTji/H0/nOpBt0Vcku9y8CdO5uxWVQN/yPHRzl4ZKik4/xzUdYGMMn6Nju7rm1EqxFIJGTeODqiKtCV/ScrDQRg4zoHN1y+DI1GIBaT2XOwv2TTGxbCBWEAAK5qA3ftWI7DroYnu3r9vPhaH4GKS7QkLEYNu69rSrk8bk+Ep/f1MDpReolti0GocVjDsOCeCCWJRhK5dlsdW5IVZeFIgoNHhjh+arygcfELhbWtdm68ahlGg1qX8eHHHva+2Z/33r0FJCLUVFkHEShOznGeWNNq46arG1IFNWd7/bx0qB9vGcWni4ndpmXX1Q2saFBzr8LhBHsO9fNxV/G0hPLEqFBTZW1HYE2xR5JrTEkFgkmplXhC5uhJN299MEL0wrmD5RSNRmDbRheXb3IhJVusdpzzse+NAXxlcrK7QLoEV7Vtv6AoO4o9knyxaoWVnVcuS3WU9AVivP7uMB+emahskpOIgsBFq+1cc2ktFpP6PXn9Mfa/OUDHueJLl+QP4QPJbNRuBuHyYg8lX7g9UT445SYak2msNWE0aFjdYmNtm51oTGZsPPKJ3R8Igurn37GziY1rHei0EvG4wrsnxnjmlV5GS7CCK6cIvCW4qq1fExQeKvZYCoHNouWarXWsb7On+hKMusO8c2KU9g4viRmqvy5EJElg3Uo72y5x4nKo6huKoqo0v35kCG+ZpTMsgX8Wah3mjQrisWKPpJC4HAau3lzDqozO9b5AjPf+5ObE6XHCZXikPx8MBomNaxxs3lCNNenqKKinuW8cHS7Jmt28ovAVATUU2gM0Fns8habWaWTbRidrW22Iyfz+RELmdLeP4+0T9PT5y949EgS1A/vGdVWsXmFNbW4TskJ7p5fDJ0YZ+YSenCuyuEUAqKmy/hyBrxR7QMXCZtGyeYOTS9ZUYdCltYi8gRjtXV7aOzwMjBRPUHahCEB9jZF1K+2sbbWlAgAA4WiCE6cnOHqyuLLkJcDEyLjPJQDUVVnvlAWeKvaIio1GElnbZmPTWgeN9dlVZ15/jK4eH529frr7AyV3GKTTijQ3WmhtMtPWZMVmyS6S7x0Mcrx9nPZOb0H78JYsAk+OuH33TLrA2hqH9RxQX8wxlRLVNh1rV9pZ12ZLbRQnSSQUhkZD9A2H6B0M0D8cKngWqsmooaHWSFO9mcY6I3Uu47Tm4yPuMO2dXk51eRj3FK8XWGmifGdk3P+j1Dfmclj/bwH+rphDKlWcVXpWNltpbbLQWGdCkqbXAwdCcUbdEYbdYcYnIkz4o3j9Mbz+GInE4nYSkiRgs2ixWbRUWXU47Hpqqw24qvUzysgnEgq9Q0G6ev10dvsY83zCNrXzJ4FGbhoZCQymfskam20VknIKKI4gZ5mg04o0LzPTWG+isc5EvcuQ2ljORjiaIBxKEIomiMYSRKMysqIw6YlIonoYpdOJ6LQSRp2EwShl7UdmIpGQGRwJ0zsUpG8oyLmB0nPNSpQ9I+O+3UC2FH+tw/JrBeHB4oypPJEkkRqHjppqI65qPbUOPVU2PRazJhVZWiqyrOALxJnwRRhxRxgZDzM6FmZkPEqi4s8vGAXhwdFx76MwxQCcTst6URZOUkbF8qWKKApYzRpsZh0Go4RJJ2E0atBrRQRRQKfN/oqjMRlFVojEZEKhOMHkquEJRPEH4sifkEO6AjCoN/vaensJAdObsVRWgQoXMorA34y6ff9j8r+n3ekVjfK/AuVf6lOhwnTGBMnws8wHpu2ygsGY32TSRwXYVbhxVahQABThH0bc469nPjTbLk1T47AcBuHTBRhWhQqF4NjIuO9SIOvAZrbNbpyEeD9wISeDV/jkoCiK8pdMmfxwnmjPiNd7BoH/Ja/DqlChEAjKD0Yn/K/N9KfznrQEQ9H3zUZ9G7ApLwOrUCHfKBwZGfd/Hpgxx33OeL993PcN4GCux1WhQgGYEBXxs8CsiVBzGsAZiEQSwt1Aey5HVqFCPhEgKgji/UMeT9f5njevE1+v1+vWKNIu4LwXq1ChREggKA8Muz375nrivFMeBiYmuuNorgM6ljKyChXyTEIR+E/Dbv/j83nygrO1qquNTRpF85ICFy18bBUq5JWIICgPznfywyKS3tzuUG9c0F4BvLDQ11aokEcmFEW5eSGTHxaZ+x8KhSLBcPT3JqPeJMAVLGIlqVAhZygcERXxxhGP74OFvnTJE7fGYdsNysNAw1KvVaHCAlEQlB+MuP1/x3lCnecjJ3dum81WrZf4ESify8X1KlSYB8cE+PbwuO/QUi6SU9fFVWW5XhD47yBszuV1K1TIYBRF+D9HJrw/YobcnoWSD99drK2yfUFB+ccLUXW6QtEYUAT+u6Q1/XRoaCiQq4vmc/Mq1lTbbkJRvodaW1Aps6ywUBLAPgXhEYvd+8TZs+Rcwq4g0RuHw9GsIXY7CncKgrBdgdJps16h1BhX4DUBZT8a5fGRkcBgPt+s4OHL6upqmyhHNwuImxCVTSisB6oy/mc4/xUqlDOCGq3xKzABghdB6ULhNArtiiIeG/V4jjFL5mY++P8BxGeNBsWdowQAAAAASUVORK5CYII=";
var ICON_512_B64 = "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";
var ICON_180_B64 = "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";
function b64ParaBytes(b64) {
  var bin = atob(b64);
  var bytes = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
__name(b64ParaBytes, "b64ParaBytes");
var MANIFEST_JSON = JSON.stringify({
  name: "Três Poderes",
  short_name: "Três Poderes",
  description: "Raciocinio, discernimento e influencia, baseado no Eneagrama de Gurdjieff",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#15110d",
  theme_color: "#15110d",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
  ]
});

;
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
__name(json, "json");
async function temMX(dominio) {
  try {
    const res = await fetch("https://cloudflare-dns.com/dns-query?name=" + encodeURIComponent(dominio) + "&type=MX", {
      headers: { accept: "application/dns-json" }
    });
    if (!res.ok) return true;
    const data = await res.json();
    return Array.isArray(data.Answer) && data.Answer.length > 0;
  } catch (e) {
    return true;
  }
}
__name(temMX, "temMX");

async function assinaturaKiwifyValida(corpoTexto, assinaturaRecebida, token) {
  if (!token || !assinaturaRecebida) return false;
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(token), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
    const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(corpoTexto));
    const hex = Array.from(new Uint8Array(sigBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return hex === assinaturaRecebida;
  } catch (e) {
    return false;
  }
}
__name(assinaturaKiwifyValida, "assinaturaKiwifyValida");

async function handleKiwify(request, env) {
  if (request.method !== "POST") return json({ error: "use POST" }, 405);
  const url = new URL(request.url);
  const assinatura = url.searchParams.get("signature") || "";
  const corpoTexto = await request.text();

  if (env.KIWIFY_WEBHOOK_TOKEN) {
    const ok = await assinaturaKiwifyValida(corpoTexto, assinatura, env.KIWIFY_WEBHOOK_TOKEN);
    if (!ok) return json({ error: "assinatura invalida" }, 401);
  }

  let body;
  try {
    body = JSON.parse(corpoTexto);
  } catch (e) {
    return json({ error: "corpo invalido" }, 400);
  }

  const evento = body.webhook_event_type || body.order_status || "";
  const email = (body.Customer && body.Customer.email) || (body.customer && body.customer.email) || (body.Customer && body.Customer.Email) || "";
  console.log("kiwify webhook recebido, evento=" + evento + " email=" + (email || "(vazio)"));

  if (env.LEADS) {
    await env.LEADS.put("debug:ultimo-kiwify", corpoTexto.slice(0, 3000));
  }

  if (!email) return json({ ok: true, aviso: "sem email no payload, confira o formato" });

  const emailNorm = String(email).trim().toLowerCase();

  if (env.LEADS) {
    const chave = "pago:" + emailNorm;
    const pago = /aprovad|paid/i.test(String(evento));
    const revogado = /reembols|chargeback|cancel/i.test(String(evento));
    if (pago) {
      await env.LEADS.put(chave, JSON.stringify({ status: "ativo", evento, atualizadoEm: new Date().toISOString() }));
    } else if (revogado) {
      await env.LEADS.put(chave, JSON.stringify({ status: "revogado", evento, atualizadoEm: new Date().toISOString() }));
    }
  }
  return json({ ok: true, evento, email: emailNorm });
}
__name(handleKiwify, "handleKiwify");

async function handleProgress(request, env) {
  if (request.method !== "POST") return json({ error: "use POST" }, 405);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "corpo invalido" }, 400);
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return json({ error: "email invalido" }, 400);
  const resumo = body.resumo && typeof body.resumo === "object" ? body.resumo : {};
  if (env.LEADS) {
    await env.LEADS.put("progresso:" + email, JSON.stringify({ resumo, atualizadoEm: new Date().toISOString() }));
  }
  return json({ ok: true });
}
__name(handleProgress, "handleProgress");

async function handleStatus(request, env) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  if (!email || !env.LEADS) return json({ pago: false });
  try {
    const raw = await env.LEADS.get("pago:" + email, { type: "json" });
    const pago = !!(raw && raw.status === "ativo");
    return json({ pago });
  } catch (e) {
    return json({ pago: false });
  }
}
__name(handleStatus, "handleStatus");

async function handleLead(request, env) {
  if (request.method !== "POST") return json({ error: "use POST" }, 405);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "corpo invalido" }, 400);
  }
  const nome = typeof body.nome === "string" ? body.nome.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!nome || !emailOk) return json({ error: "nome ou email invalido" }, 400);
  const dominio = email.split("@")[1];
  const dominioTemMX = await temMX(dominio);
  if (!dominioTemMX) return json({ error: "esse dominio de email nao recebe mensagens, confira o email digitado" }, 400);
  const pdfBase64 = typeof body.pdfBase64 === "string" ? body.pdfBase64 : "";
  const nomeArquivo = typeof body.nomeArquivo === "string" ? body.nomeArquivo.slice(0, 120) : "anamnese.pdf";
  const resumo = body.resumo && typeof body.resumo === "object" ? body.resumo : {};
  if (env.LEADS) {
    try {
      const chave = "lead:" + email;
      const anterior = await env.LEADS.get(chave, { type: "json" });
      await env.LEADS.put(chave, JSON.stringify({
        nome,
        email,
        primeiraVez: anterior ? anterior.primeiraVez : (/* @__PURE__ */ new Date()).toISOString(),
        ultimaAtualizacao: (/* @__PURE__ */ new Date()).toISOString(),
        totalEnvios: (anterior ? anterior.totalEnvios : 0) + 1,
        ultimoResumo: resumo
      }));
    } catch (e) {
    }
  }
  if (!env.BREVO_API_KEY) {
    return json({ error: "BREVO_API_KEY nao configurada nas variaveis do Worker" }, 500);
  }
  if (!env.BREVO_FROM_EMAIL) {
    return json({ error: "BREVO_FROM_EMAIL nao configurada nas variaveis do Worker" }, 500);
  }
  const primeiroNome = nome.split(" ")[0];
  const centro = resumo.centro || "";
  const quebra = resumo.quebra || "";
  const html = '<div style="font-family:Georgia,serif; max-width:520px; margin:0 auto; color:#241b14;"><h2 style="color:#8a7538;">Sua anamnese do Eneagrama</h2><p>Oi, ' + primeiroNome + ".</p><p>Seu resultado no teste do Eneagrama de Gurdjieff, do app <strong>Tr\xEAs Poderes</strong>, est\xE1 pronto e em anexo, em PDF.</p>" + (centro ? "<p><strong>Centro predominante:</strong> " + centro + "<br><strong>Onde sua oitava quebra:</strong> " + quebra + "</p>" : "") + '<p>O relat\xF3rio traz a ficha completa do seu centro, a origem prov\xE1vel da quebra e o que fazer a partir dela.</p><p style="margin-top:28px; font-size:13px; color:#8a7538;">Tr\xEAs Poderes \u2014 baseado no livro de Francisco Vasquez</p></div>';
  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "api-key": env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: env.BREVO_FROM_NAME || "Tres Poderes", email: env.BREVO_FROM_EMAIL },
        to: [{ email, name: nome }],
        subject: env.BREVO_SUBJECT || "Sua anamnese do Eneagrama esta pronta",
        htmlContent: html,
        attachment: pdfBase64 ? [{ content: pdfBase64, name: nomeArquivo }] : void 0
      })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data && (data.message || data.errors && data.errors[0] && data.errors[0].message) || "brevo " + res.status;
      return json({ error: msg }, res.status >= 400 && res.status < 600 ? res.status : 502);
    }
    return json({ ok: true });
  } catch (e) {
    return json({ error: "falha ao contatar o Brevo" }, 502);
  }
}
__name(handleLead, "handleLead");
async function handleClaude(request, env) {
  if (request.method !== "POST") return json({ error: "use POST" }, 405);
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "ANTHROPIC_API_KEY nao configurada nas variaveis do Worker" }, 500);
  }
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "corpo invalido" }, 400);
  }
  if (body.ping) return json({ ok: true });
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "prompt ausente" }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: "prompt longo demais" }, 413);
  const tarefa = body.tarefa === "avaliar" ? "avaliar" : "gerar";
  const modelo = tarefa === "avaliar" ? env.CLAUDE_MODEL_AVALIAR || MODELO.avaliar : env.CLAUDE_MODEL_GERAR || env.CLAUDE_MODEL || MODELO.gerar;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: modelo,
        max_tokens: Number(env.MAX_TOKENS) || 2e3,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data && data.error && data.error.message || "falha na API da Anthropic";
      return json({ error: msg }, res.status);
    }
    return json({ content: data.content });
  } catch (e) {
    return json({ error: "falha ao contatar a API" }, 502);
  }
}
__name(handleClaude, "handleClaude");
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/claude") return handleClaude(request, env);
    if (url.pathname === "/api/lead") return handleLead(request, env);
    if (url.pathname === "/favicon.ico") return new Response(null, { status: 204 });
    if (url.pathname === "/lp" || url.pathname === "/lp/") {
      return new Response(LP_HTML, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store, no-cache, must-revalidate" }
      });
    }
    if (url.pathname === "/api/kiwify") return handleKiwify(request, env);
    if (url.pathname === "/api/status") return handleStatus(request, env);
    if (url.pathname === "/api/progress") return handleProgress(request, env);
    if (url.pathname === "/manifest.json") {
      return new Response(MANIFEST_JSON, { headers: { "content-type": "application/manifest+json; charset=utf-8" } });
    }
    if (url.pathname === "/icon-192.png") {
      return new Response(b64ParaBytes(ICON_192_B64), { headers: { "content-type": "image/png", "cache-control": "public, max-age=604800" } });
    }
    if (url.pathname === "/icon-512.png") {
      return new Response(b64ParaBytes(ICON_512_B64), { headers: { "content-type": "image/png", "cache-control": "public, max-age=604800" } });
    }
    if (url.pathname === "/icon-180.png" || url.pathname === "/apple-touch-icon.png") {
      return new Response(b64ParaBytes(ICON_180_B64), { headers: { "content-type": "image/png", "cache-control": "public, max-age=604800" } });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate"
      }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
