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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#15110d; --panel:#1d1611; --panel-2:#241b14;
    --rule:rgba(244,238,223,0.12);
    --parchment:#f4eedf; --dim:#a89f8e;
    --oxblood:#b3231f; --oxblood-br:#d63a2f;
    --brass:#c9a24b; --brass-dim:#8a7538;
    --good:#7ea36b; --radius:10px;
    --nav-h: 62px;
  }
  *{box-sizing:border-box;}
  html{ overflow-x:hidden; }
  body{
    margin:0; min-height:100vh; min-height:100dvh;
    padding:24px 16px calc(var(--nav-h) + env(safe-area-inset-bottom) + 26px);
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
    border-radius:var(--radius); padding:24px 22px; margin-bottom:14px; position:relative; overflow:hidden; }
  .card.hero{ border-color:rgba(201,162,75,0.28); }
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
<div class="app">

  <!-- ============ TREINO ============ -->
  <section class="view active" id="viewTreino">
    <header>
      <div class="eyebrow">Raciocínio · Discernimento · Influência</div>
      <h1>Treino Diário</h1>
      <div style="margin-top:8px;"><span class="api-badge" id="apiBadge"></span><span class="ver-tag" id="verTag">v2.3</span></div>
    </header>

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
  const e=state.enea; if(!e) return false;
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
    return true;
  }catch(err){
    if(!opts.silencioso) console.error('Falha ao enviar relatório', err);
    return false;
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
  const ok = await enviarRelatorioPorEmail(nome, email, {silencioso:false});
  btn.disabled=false; btn.textContent=rotuloOrig;

  if(ok){
    try{ localStorage.setItem('tres-poderes-lead', JSON.stringify({nome, email})); }catch(e){}
    document.getElementById('eneaGate').style.display='none';
    document.getElementById('eneaLocked').style.display='block';
    const enviado=document.getElementById('eneaEnviado');
    document.getElementById('eneaEnviadoTxt').textContent='Relatório enviado para '+email+'. Confira também a caixa de spam.';
    enviado.style.display='block';
  } else {
    msg.innerHTML='<strong>Não consegui enviar agora.</strong> Confira o email digitado e tente de novo.';
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
    let fill='rgba(244,238,223,0.16)', rr=4.5;
    if(nota){
      if(nota===e.quebra){ fill='var(--oxblood-br)'; rr=8; }
      else if(val>=4){ fill='var(--good)'; rr=5.5; }
      else if(val<=2){ fill='rgba(179,35,31,0.55)'; rr=5.5; }
      else { fill='var(--brass)'; rr=5; }
    }
    s+='<circle class="enea-pt" cx="'+P[i].x+'" cy="'+P[i].y+'" r="'+rr+'" fill="'+fill+'"/>';
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
  wrap.innerHTML=Object.keys(a).map(k=>{
    const st=a[k], pct= st.avg!==null?(st.avg/7)*100:0;
    let tag=''; if(st.n===0) tag='';
    else if(k===weak) tag='<span class="axis-tag tag-foco">foco</span>';
    else if(st.avg>=6) tag='<span class="axis-tag tag-solido">sólido</span>';
    return '<div class="axis-row"><div class="axis-head"><span class="axis-name">'+st.label+tag+'</span>'+
      '<span class="axis-val">'+(st.n? st.avg.toFixed(1)+'/7 · '+st.n+'x':'sem dados')+'</span></div>'+
      '<div class="axis-track"><div class="axis-fill" style="width:'+pct+'%;background:'+cores[k]+'"></div></div></div>';
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
document.getElementById('startBtn').addEventListener('click', startTimer);
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
document.getElementById('modSubmit').addEventListener('click', modSubmit);
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
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
__name(json, "json");
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
