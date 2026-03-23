<!DOCTYPE html> 
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>쉬운청약</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Black+Han+Sans&display=swap" rel="stylesheet">
<style> 
:root {
  --ink:#0A0E1A; --ink-2:#1E2535; --ink-3:#4A5568; --ink-4:#8896A8; --ink-5:#BCC6D3;
  --bg:#F5F7FA; --bg-2:#EDF0F5; --bg-card:#FFFFFF;
  --accent:#0066FF; --accent-dark:#0051CC; --accent-light:#EBF2FF; --accent-mid:#C7DCFF;
  --mint:#00C9A0; --mint-light:#E6FAF5;
  --gold:#F5A623; --gold-light:#FFF8EC;
  --red:#F04040; --red-light:#FEF0F0;
  --lotto:#6D28D9; --lotto-light:#EDE9FE;
  --public:#059669; --public-light:#ECFDF5;
  --private:#DC2626; --private-light:#FEF2F2;
  --shadow-xs:0 1px 2px rgba(0,0,0,.06);
  --shadow-sm:0 2px 8px rgba(0,0,0,.08);
  --shadow-md:0 4px 20px rgba(0,0,0,.10);
  --shadow-lg:0 12px 40px rgba(0,0,0,.14);
  --r:16px; --r-sm:10px; --nav-h:68px;
  /* 타이포 스케일 */
  --t-xs:11px; --t-sm:12px; --t-base:13px; --t-md:14px; --t-lg:16px; --t-xl:18px; --t-2xl:22px; --t-3xl:26px;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%}
body{font-family:'Noto Sans KR',sans-serif;background:var(--bg);color:var(--ink);max-width:430px;margin:0 auto;min-height:100vh;overflow-x:hidden}
.screen{display:none;min-height:100vh;padding-bottom:calc(var(--nav-h)+50px);animation:pageIn .22s ease}
.screen.active{display:block}
/* pageIn → 애니메이션 마스터에서 정의 */
button{font-family:'Noto Sans KR',sans-serif}
input,select{font-family:'Noto Sans KR',sans-serif}

/* ══ 네비 ══ */
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;height:var(--nav-h);background:rgba(255,255,255,.98);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:1px solid rgba(0,0,0,.07);display:flex;align-items:center;justify-content:space-around;z-index:100;padding-bottom:env(safe-area-inset-bottom);box-shadow:0 -4px 20px rgba(0,0,0,.07)}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;padding:8px 0;cursor:pointer;transition:all .2s;position:relative}
.nav-item svg{width:22px;height:22px;color:var(--ink-5);transition:all .25s}
.nav-item span{font-size:11px;font-weight:500;color:var(--ink-5);transition:all .25s}
.nav-item.active span{color:var(--accent);font-weight:700}
.nav-item.active svg{color:var(--accent);transform:translateY(-1px)}
.nav-item.active::before{content:'';position:absolute;top:6px;left:50%;transform:translateX(-50%);width:32px;height:32px;background:var(--accent-light);border-radius:10px;z-index:-1;animation:navPop .2s cubic-bezier(.34,1.56,.64,1)}
@keyframes navPop{from{transform:translateX(-50%) scale(.6);opacity:0}to{transform:translateX(-50%) scale(1);opacity:1}}
.nav-item.consult.active svg,.nav-item.consult.active span{color:var(--accent)}

/* ══ 공통 컴포넌트 ══ */
.page-header{background:var(--bg-card);padding:18px 20px 14px;position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(0,0,0,.06)}
.page-title{font-size:var(--t-2xl);font-weight:900;color:var(--ink);letter-spacing:-.4px}
.page-sub{font-size:13px;color:var(--ink-4);margin-top:2px}
.section-row{display:flex;justify-content:space-between;align-items:center;padding:20px 20px 10px}
.section-title{font-size:var(--t-md);font-weight:800;color:var(--ink);letter-spacing:-.2px}
.section-more{font-size:12px;color:var(--accent);font-weight:600;cursor:pointer;padding:5px 12px;background:var(--accent-light);border-radius:20px}
.divider{height:8px;background:var(--bg)}
.badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;white-space:nowrap;letter-spacing:-.1px}
.badge-public{background:var(--public-light);color:var(--public)}
.badge-private{background:var(--private-light);color:var(--private)}
.badge-lotto{background:var(--lotto-light);color:var(--lotto)}
.badge-urgent{background:var(--red-light);color:var(--red);font-weight:800}
.badge-mytype{background:var(--mint-light);color:#00A882}
.chip{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px}

/* ══ 홈 히어로 — 리디자인 ══ */
.hero{background:linear-gradient(135deg,#0A0E1A,#1A2236,#0F1A2E,#0A0E1A);background-size:400% 400%;animation:heroShift 10s ease infinite;padding:0 20px 0;position:relative;overflow:hidden}
@keyframes heroShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.hero-noise{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/Cfilter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");opacity:.4}
.hero-glow{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,.3) 0%,transparent 70%);top:-80px;right:-60px;pointer-events:none}
.hero-glow2{position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,160,.2) 0%,transparent 70%);bottom:-60px;left:-40px;pointer-events:none}
.hero-inner{position:relative;z-index:1;padding:20px 0 18px}
.hero-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.hero-appname{font-size:var(--t-base);font-weight:800;color:white;letter-spacing:-.3px}
.hero-appname span{color:#60A5FA}
/* 조건 카드 */

.cond-card-top{display:flex;align-items:center;justify-content:space-between}
.cond-card-label{font-size:var(--t-sm);font-weight:700;color:rgba(255,255,255,.6);letter-spacing:.5px;text-transform:uppercase}
.cond-chevron{color:rgba(255,255,255,.35);font-size:14px;transition:transform .25s}
.cond-chevron.open{transform:rotate(180deg)}
.type-pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}
.type-pill{font-size:var(--t-xs);font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.85);background:rgba(255,255,255,.07)}
.type-pill.fp{border-color:rgba(0,201,160,.45);background:rgba(0,201,160,.12);color:#6EECDA}
.type-pill.nb{border-color:rgba(251,191,36,.45);background:rgba(251,191,36,.12);color:#FDE68A}
.type-pill.mc{border-color:rgba(239,68,68,.35);background:rgba(239,68,68,.12);color:#FCA5A5}
.type-pill.yt{border-color:rgba(139,92,246,.45);background:rgba(139,92,246,.12);color:#C4B5FD}
.type-pill.gn{border-color:rgba(99,102,241,.45);background:rgba(99,102,241,.12);color:#A5B4FC}
/* 조건 그리드 (드롭다운) */
.cond-detail{max-height:0;overflow:hidden;transition:max-height .3s ease}
.cond-detail.open{max-height:200px}
.cond-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 0 4px;border-top:1px solid rgba(255,255,255,.08);margin-top:12px}
.cond-item-label{font-size:var(--t-xs);color:rgba(255,255,255,.35);font-weight:600;letter-spacing:.3px}
.cond-item-val{font-size:var(--t-base);font-weight:700;color:white;margin-top:3px}
.cond-item-val.blank{color:rgba(255,255,255,.25)}
.hero-cta-btn{display:block;width:100%;margin:14px 0 18px;padding:13px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.18);border-radius:14px;color:rgba(255,255,255,.9);font-size:var(--t-base);font-weight:600;cursor:pointer;text-align:center;transition:all .2s;position:relative;z-index:1;letter-spacing:-.1px}
.hero-cta-btn:active{background:rgba(255,255,255,.18);transform:scale(.98)}
/* 하단 탭 라인 */
.hero-tabs-wrap{position:relative;z-index:1;margin:0 -20px;padding:0 20px;border-top:1px solid rgba(255,255,255,.08)}

/* 알림 배너 */
.alert-banner{margin:12px 20px 0;background:linear-gradient(135deg,#7F1D1D,#DC2626);border-radius:14px;padding:13px 16px;display:flex;align-items:center;gap:12px;cursor:pointer}
.alert-banner-icon{font-size:22px;flex-shrink:0}
.alert-banner-title{font-size:13px;font-weight:800;color:white}
.alert-banner-sub{font-size:11px;color:rgba(255,255,255,.75);margin-top:2px}

/* ══ 추천 가로스크롤 ══ */
.rec-scroll{display:flex;gap:12px;padding:0 20px 4px;overflow-x:auto;scrollbar-width:none}
.rec-scroll::-webkit-scrollbar{display:none}
.rec-card{flex-shrink:0;width:200px;background:var(--bg-card);border-radius:18px;padding:14px;border:1px solid rgba(0,0,0,.05);box-shadow:0 2px 12px rgba(0,0,0,.07);cursor:pointer;transition:transform .18s,box-shadow .18s}
.rec-card:active{transform:scale(.97);box-shadow:0 1px 4px rgba(0,0,0,.06)}
.rec-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.rec-mytype{font-size:var(--t-xs);font-weight:700;padding:3px 9px;border-radius:20px;background:var(--mint-light);color:#00A882}
.rec-name{font-size:var(--t-md);font-weight:800;color:var(--ink);line-height:1.35;margin-bottom:3px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;letter-spacing:-.2px}
.rec-loc{font-size:var(--t-sm);color:var(--ink-4);margin-bottom:10px}
.rec-bottom{display:flex;justify-content:space-between;align-items:center}
.rec-price{font-size:var(--t-sm);font-weight:600;color:var(--ink-3)}
.rec-d{font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px}
.rec-d.u{background:var(--gold-light);color:var(--gold)}
.rec-d.n{background:var(--accent-light);color:var(--accent)}

/* ══ 검색바 ══ */
.search-wrap{padding:12px 20px 0}
.search-box{display:flex;align-items:center;gap:10px;background:var(--bg-card);border:1.5px solid rgba(0,0,0,.08);border-radius:14px;padding:12px 16px;transition:all .2s;box-shadow:var(--shadow-xs)}
.search-box:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(0,102,255,.09)}
.search-box svg{width:17px;height:17px;color:var(--ink-5);flex-shrink:0}
.search-inp{flex:1;border:none;outline:none;font-size:14px;color:var(--ink);background:transparent}
.search-inp::placeholder{color:var(--ink-5)}
.search-clr{background:var(--bg);border:none;cursor:pointer;color:var(--ink-4);font-size:14px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center}

/* ══ 필터 탭 ══ */
.filter-wrap{padding:10px 20px 0;position:relative}
.filter-wrap::after{content:'';position:absolute;right:0;top:10px;bottom:0;width:40px;background:linear-gradient(to right,transparent,var(--bg));pointer-events:none;z-index:1}
.filter-tabs{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;padding-right:24px}
.filter-tabs::-webkit-scrollbar{display:none}
.ftab{flex-shrink:0;padding:7px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid rgba(0,0,0,.07);background:var(--bg-card);color:var(--ink-4);transition:all .2s}
.ftab.active{background:var(--accent);color:white;border-color:var(--accent);box-shadow:0 3px 12px rgba(0,102,255,.32);font-weight:700}
.ftab.lotto{border-color:rgba(124,58,237,.25);color:var(--lotto)}
.ftab.lotto.active{background:var(--lotto) !important;border-color:var(--lotto) !important;color:white !important;box-shadow:0 2px 10px rgba(124,58,237,.3)}
.sort-row{display:flex;align-items:center;justify-content:flex-end;padding:8px 20px 0;gap:8px}
.sort-label{font-size:12px;color:var(--ink-4)}
.sort-sel{border:1.5px solid rgba(0,0,0,.08);background:var(--bg-card);border-radius:10px;padding:6px 28px 6px 10px;font-size:12px;font-weight:600;color:var(--ink-3);cursor:pointer;outline:none;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238896A8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}

/* ══ 매물 카드 ══ */
.listings{padding:10px 20px 40px;display:flex;flex-direction:column;gap:14px}
.card{background:var(--bg-card);border-radius:20px;padding:18px 16px 14px;box-shadow:0 2px 12px rgba(0,0,0,.07);cursor:pointer;transition:transform .18s,box-shadow .18s;border:1px solid rgba(0,0,0,.05)}
.card:active{transform:scale(.97);box-shadow:0 1px 4px rgba(0,0,0,.06)}
.card-top{display:flex;justify-content:space-between;align-items:flex-start}
.card-badges{display:flex;gap:5px;flex-wrap:wrap}
/* 북마크 버튼 */
.bm-btn{background:none;border:none;cursor:pointer;padding:10px;margin:-6px;transition:transform .15s;flex-shrink:0;line-height:1;display:flex;align-items:center;justify-content:center;min-width:44px;min-height:44px}
.bm-btn:active{transform:scale(1.2)}
.bm-btn svg{width:20px;height:20px;transition:all .2s}
.bm-btn.unsaved svg{stroke:var(--ink-5);fill:none}
.bm-btn.saved svg{stroke:var(--gold);fill:var(--gold)}
.card-name{font-size:16px;font-weight:800;margin-top:10px;color:var(--ink);line-height:1.35;letter-spacing:-.3px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.card-loc{font-size:12px;color:var(--ink-4);margin-top:4px;display:flex;align-items:center;gap:3px}
/* 시세 인라인 */
.gap-pill{display:flex;align-items:center;gap:8px;margin-top:11px;padding:8px 12px;background:var(--bg);border-radius:12px}
.gap-nums{font-size:12px;color:var(--ink-4);display:flex;align-items:center;gap:5px}
.gap-nums b{color:var(--ink-3);font-weight:700}
.gap-badge{font-size:12px;font-weight:800;padding:3px 9px;border-radius:20px}
.gap-badge.up{background:var(--mint-light);color:#00A882}
.gap-badge.dn{background:var(--red-light);color:var(--red)}
.card-sep{height:1px;background:rgba(0,0,0,.05);margin:13px 0 11px}
.card-meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0}
.meta-label{font-size:var(--t-xs);color:var(--ink-5);font-weight:600;letter-spacing:.2px}
.meta-val{font-size:var(--t-base);font-weight:700;color:var(--ink);margin-top:4px}
.meta-val.hot{color:var(--gold)}
/* 당첨률 뱃지 */
.wr-badge{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;margin-top:12px}
.wr-badge.known{background:var(--accent-light);color:var(--accent)}
.wr-badge.lotto{background:var(--lotto-light);color:var(--lotto)}
.wr-badge.unknown{background:var(--accent-light);color:var(--accent);border:1.5px dashed var(--accent)}
.no-res{padding:48px 20px;text-align:center}
.no-res-icon{font-size:52px;margin-bottom:14px}
.no-res-title{font-size:16px;font-weight:700}
.no-res-sub{font-size:13px;color:var(--ink-4);margin-top:5px}

/* ══ 당첨률 설정 목록 바텀시트 ══ */
.wr-sheet-ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:none;align-items:flex-end;justify-content:center;max-width:430px;margin:0 auto}
.wr-sheet-ov.open{display:flex}
.wr-sheet{background:var(--bg-card);border-radius:20px 20px 0 0;width:100%;max-height:80vh;overflow-y:auto;animation:slideUp .3s ease}
.wr-sheet-handle{width:40px;height:4px;background:var(--bg-2);border-radius:20px;margin:12px auto 0}
.wr-sheet-header{padding:16px 20px 12px;border-bottom:1px solid rgba(0,0,0,.06)}
.wr-sheet-title{font-size:18px;font-weight:900;color:var(--ink);letter-spacing:-.3px}
.wr-sheet-sub{font-size:13px;color:var(--ink-4);margin-top:4px;line-height:1.5}
/* 조건 입력 목록 */
.wr-cond-list{padding:12px 0 0}
.wr-cond-item{display:flex;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(0,0,0,.05);cursor:pointer;transition:background .15s;gap:14px}
.wr-cond-item:active{background:var(--bg)}
.wr-cond-item:last-child{border-bottom:none}
.wr-cond-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.wr-cond-icon.set{background:var(--accent-light)}
.wr-cond-icon.unset{background:var(--bg-2)}
.wr-cond-body{flex:1}
.wr-cond-name{font-size:14px;font-weight:700;color:var(--ink)}
.wr-cond-desc{font-size:12px;color:var(--ink-4);margin-top:2px}
.wr-cond-status{font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0}
.wr-cond-status.ok{background:var(--accent-light);color:var(--accent)}
.wr-cond-status.no{background:var(--bg-2);color:var(--ink-4)}
.wr-cond-arrow{color:var(--ink-5);font-size:16px;flex-shrink:0}
.wr-sheet-footer{padding:16px 20px;padding-bottom:calc(16px + env(safe-area-inset-bottom));border-top:1px solid rgba(0,0,0,.06)}
.wr-start-btn{width:100%;padding:15px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.3)}
.wr-start-btn:disabled{background:var(--bg-2);color:var(--ink-5);box-shadow:none;cursor:not-allowed}

/* ══ 위저드 ══ */
.wizard{display:none;position:fixed;inset:0;z-index:500;background:var(--bg-card);max-width:430px;margin:0 auto;flex-direction:column;overflow:hidden}
.wizard.open{display:flex}
.wiz-top{padding:20px 20px 0;display:flex;align-items:center;gap:14px;flex-shrink:0}
.wiz-back{background:var(--bg-card);border:none;cursor:pointer;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--ink-2);flex-shrink:0;box-shadow:var(--shadow-sm);transition:all .15s}
/* ══ 공통 뒤로가기 버튼 ══ */
.back-btn{background:var(--bg-card);border:none;cursor:pointer;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--ink-2);flex-shrink:0;box-shadow:var(--shadow-sm);transition:all .15s}
.back-btn:active{background:var(--bg-2);transform:scale(.95)}
.back-btn-light{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:12px;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;transition:all .15s}
.back-btn-light:active{background:rgba(255,255,255,.25)}

.wiz-prog-wrap{flex:1}
.wiz-step-txt{font-size:12px;color:var(--ink-4);margin-bottom:6px;font-weight:600}
.wiz-track{height:4px;background:var(--bg-2);border-radius:20px;overflow:hidden}
.wiz-fill{height:4px;background:var(--accent);border-radius:20px;transition:width .35s ease}
.wiz-body{flex:1;padding:32px 24px 16px;overflow-y:auto;-webkit-overflow-scrolling:touch}
.wiz-title{font-size:26px;font-weight:900;line-height:1.35;color:var(--ink);margin-bottom:6px;letter-spacing:-.5px}
.wiz-sub{font-size:14px;color:var(--ink-4);line-height:1.6;margin-bottom:28px}
.wiz-field{margin-bottom:28px}
.wiz-field.dob{margin-bottom:28px}
.wiz-label{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:4px;display:flex;align-items:center;gap:8px}
.wiz-accuracy-hint{display:flex;align-items:center;gap:6px;margin-top:8px;padding:8px 12px;background:#F0FDF4;border-radius:8px;border:1px solid rgba(5,150,105,.15)}
.wiz-accuracy-hint span{font-size:12px;color:#059669;font-weight:500;line-height:1.4}
.wiz-hint{font-size:12px;color:var(--accent);font-weight:600;margin-top:6px;padding:8px 12px;background:var(--accent-light);border-radius:8px;line-height:1.5}
.wiz-inp{width:100%;padding:15px 16px;border-radius:12px;border:1.5px solid rgba(0,0,0,.1);background:var(--bg-card);font-size:16px;color:var(--ink);outline:none;transition:all .2s;-webkit-appearance:none}
.wiz-inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(0,102,255,.1)}
.wiz-inp-unit{position:relative}
.wiz-inp-unit .wiz-inp{padding-right:50px}
.wiz-inp-unit .unit{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:600;color:var(--ink-4)}
.wiz-inp-row{display:flex;gap:8px;margin-bottom:24px}
.wiz-inp-row .wiz-inp{text-align:center;padding:15px 8px}
.wiz-inp-row .wiz-inp-wrap{flex:1;position:relative}
.wiz-sel{width:100%;padding:15px 16px;border-radius:12px;border:1.5px solid rgba(0,0,0,.1);background:var(--bg-card);font-size:16px;color:var(--ink);outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%238896A8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
/* 라디오 그룹 */
.wiz-radio-grp{display:flex;gap:0;border:1.5px solid rgba(0,0,0,.1);border-radius:12px;overflow:hidden}
.wiz-radio{flex:1;padding:14px 8px;text-align:center;font-size:13px;font-weight:600;color:var(--ink-4);cursor:pointer;background:var(--bg-card);transition:all .2s;border-right:1px solid rgba(0,0,0,.08)}
.wiz-radio:last-child{border-right:none}
.wiz-radio.on{background:var(--accent);color:white}
/* 스텝퍼 */
.wiz-stepper{display:flex;align-items:center;border:1.5px solid rgba(0,0,0,.1);border-radius:12px;overflow:hidden;background:var(--bg-card)}
.step-btn{width:52px;height:52px;border:none;background:none;font-size:22px;cursor:pointer;color:var(--ink-3);display:flex;align-items:center;justify-content:center;font-weight:300;transition:background .15s}
.step-btn:active{background:var(--bg)}
.step-val{flex:1;text-align:center;font-size:20px;font-weight:700;color:var(--ink)}
/* 국세청 버튼 */

/* 자녀 날짜 */
.child-dates{margin-top:12px;background:var(--bg);border-radius:12px;padding:14px;border:1.5px solid rgba(0,102,255,.15)}
.child-date-item{margin-bottom:14px}
.child-date-item:last-child{margin-bottom:0}
.child-date-label{font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:8px}
.newborn-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:var(--mint-light);color:#00A882;border-radius:20px;font-size:11px;font-weight:700;margin-top:6px}
/* 하단 확인 버튼 */
.wiz-foot{padding:16px 24px;padding-bottom:calc(16px + env(safe-area-inset-bottom));background:var(--bg-card);border-top:1px solid rgba(0,0,0,.06)}
.wiz-btn{width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.35);transition:all .2s}
.wiz-btn:active{transform:scale(.98)}

/* ══ 상세 ══ */
.det-header{background:linear-gradient(150deg,#0A0E1A,#1A2440,#0D1929);padding:20px 20px 32px;position:relative;overflow:hidden}
.det-header::before{content:'';position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,.22) 0%,transparent 70%);top:-80px;right:-80px;pointer-events:none}
.det-header::after{content:'';position:absolute;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,160,.12) 0%,transparent 70%);bottom:-60px;left:-30px;pointer-events:none}
.det-header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;position:relative;z-index:1}
.det-back{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:12px;cursor:pointer;width:44px;height:44px;display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;transition:all .15s}
/* 상세 고정 하단 CTA */
.det-sticky-cta{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;padding:12px 20px;padding-bottom:calc(12px + env(safe-area-inset-bottom));background:rgba(255,255,255,.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(0,0,0,.07);z-index:90;display:none}
.det-sticky-cta.show{display:block}
.det-cta-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:15px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 4px 16px rgba(0,102,255,.3);letter-spacing:-.2px}
.det-cta-btn:active{transform:scale(.98)}
.det-bell{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0}
.det-bell:active{background:rgba(255,255,255,.25)}
.det-bell svg{width:18px;height:18px;stroke:white;fill:none;transition:all .2s}
.det-bell.on{background:rgba(245,166,35,.35);border-color:rgba(245,166,35,.7)}
.det-bell.on svg{stroke:var(--gold);fill:var(--gold)}
#det-save-btn.on{background:rgba(245,166,35,.35);border-color:rgba(245,166,35,.7)}
.det-title{font-size:23px;font-weight:900;color:white;line-height:1.3;letter-spacing:-.5px;position:relative;z-index:1;margin-top:4px}
.det-loc{font-size:13px;color:rgba(255,255,255,.6);margin-top:7px;position:relative;z-index:1;display:flex;align-items:center;gap:4px}
.det-body{padding:0 20px}
.info-card{background:var(--bg-card);border-radius:20px;border:1px solid rgba(0,0,0,.06);margin-top:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07)}
.info-card-title{padding:14px 18px;font-size:14px;font-weight:800;border-bottom:1px solid rgba(0,0,0,.05);background:var(--bg);letter-spacing:-.2px}
.info-row{display:flex;padding:12px 18px;border-bottom:1px solid rgba(0,0,0,.05)}
.info-row:last-child{border-bottom:none}
.info-rl{font-size:13px;color:var(--ink-4);width:90px;flex-shrink:0}
.info-rv{font-size:13px;font-weight:600;color:var(--ink);flex:1;line-height:1.5}
.ai-card{background:linear-gradient(135deg,#EBF2FF,#E0ECFF);border:1.5px solid #C7DCFF;border-radius:var(--r);margin-top:14px;overflow:hidden}
.ai-card-top{padding:14px 18px 10px;display:flex;align-items:center;gap:8px}
.ai-lbl{background:var(--accent);color:white;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px}
.ai-title{font-size:14px;font-weight:700;color:var(--accent-dark)}
.ai-body{padding:0 18px 18px}
.ai-item{margin-bottom:12px}
.ai-item:last-child{margin-bottom:0}
.ai-item-title{font-size:13px;font-weight:700;color:var(--accent-dark);margin-bottom:4px}
.ai-item-text{font-size:13px;color:var(--ink-3);line-height:1.65}
.fund-card{background:var(--bg-card);border-radius:var(--r);border:1px solid rgba(0,0,0,.07);margin-top:14px;overflow:hidden;box-shadow:var(--shadow-xs)}
.fund-header{padding:13px 18px;font-size:14px;font-weight:700;border-bottom:1px solid rgba(0,0,0,.06);background:linear-gradient(135deg,#EBF2FF,#DCE8FF)}
.fund-row{display:flex;justify-content:space-between;align-items:center;padding:11px 18px;border-bottom:1px solid rgba(0,0,0,.05)}
.fund-row:last-child{border-bottom:none}
.fund-rl{font-size:13px;color:var(--ink-4)}
.fund-rv{font-size:14px;font-weight:700}
.fund-rv.ok{color:var(--public)}
.fund-rv.no{color:var(--red)}
.fund-rv.ac{color:var(--accent)}
.pri-btn{width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.35);transition:all .2s;display:block;margin:16px 0 8px}
.pri-btn:active{transform:scale(.98)}
.sec-btn{width:100%;padding:14px;background:var(--bg);color:var(--ink-3);border:1.5px solid rgba(0,0,0,.1);border-radius:14px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px}

/* ══ 가점 ══ */
.score-hero{background:var(--ink-2);padding:24px 20px;position:relative;overflow:hidden}
.score-hero::before{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,160,.2) 0%,transparent 70%);top:-100px;right:-60px;pointer-events:none}
.score-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:var(--r);padding:20px;margin-top:16px;text-align:center;position:relative;z-index:1}
.score-num{font-size:68px;font-weight:900;color:white;line-height:1;letter-spacing:-3px}
.score-num.unknown{display:inline-block;animation:qPulse 1.8s ease-in-out infinite}
@keyframes qPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.18);opacity:.7}}
.score-max{font-size:16px;color:rgba(255,255,255,.5);margin-top:4px}
.score-grade{display:inline-block;margin-top:10px;padding:5px 16px;border-radius:20px;font-size:13px;font-weight:700}
.score-grade.a{background:rgba(0,201,160,.2);color:#6EECDA;border:1px solid rgba(0,201,160,.4)}
.score-grade.b{background:rgba(245,166,35,.2);color:#FDE68A;border:1px solid rgba(245,166,35,.4)}
.score-grade.c{background:rgba(240,64,64,.2);color:#FCA5A5;border:1px solid rgba(240,64,64,.4)}
.score-bk{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.score-bk-item{background:rgba(255,255,255,.07);border-radius:12px;padding:12px;text-align:center}
.score-bk-l{font-size:10px;color:rgba(255,255,255,.5)}
.score-bk-v{font-size:20px;font-weight:800;color:white;margin-top:4px}
.score-bk-m{font-size:11px;color:rgba(255,255,255,.35);margin-top:2px}
.score-body{padding:0 20px}
.score-card{background:var(--bg-card);border-radius:var(--r);border:1px solid rgba(0,0,0,.07);margin-top:14px;overflow:hidden;box-shadow:var(--shadow-xs)}
.score-card-t{padding:13px 18px;font-size:14px;font-weight:700;border-bottom:1px solid rgba(0,0,0,.06);background:var(--bg)}
.score-row{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid rgba(0,0,0,.05)}
.score-row:last-child{border-bottom:none}
.score-rl{font-size:13px;color:var(--ink-3);font-weight:500;flex:1}
.score-pts{font-size:15px;font-weight:800;color:var(--accent);width:40px;text-align:right}
.score-mx{font-size:11px;color:var(--ink-5);width:50px;text-align:right}
.cut-row{display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid rgba(0,0,0,.05);gap:12px;cursor:pointer;transition:background .15s}
.cut-row:last-child{border-bottom:none}
.cut-row:active{background:var(--bg)}
.cut-name{font-size:13px;font-weight:600;flex:1}
.cut-score{font-size:13px;font-weight:700;color:var(--ink-4)}
.cut-diff{font-size:12px;font-weight:700;padding:2px 8px;border-radius:20px}
.cut-diff.ok{background:var(--public-light);color:var(--public)}
.cut-diff.no{background:var(--red-light);color:var(--red)}

/* ══ 캘린더 ══ */
.cal-hd{background:var(--bg-card);padding:16px 20px;border-bottom:1px solid rgba(0,0,0,.06)}
.cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.cal-mo{font-size:18px;font-weight:800}
.cal-nav-btn{background:var(--bg);border:none;border-radius:10px;width:36px;height:36px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;color:var(--ink-3)}
.cal-wdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}
.cal-wday{font-size:11px;font-weight:600;color:var(--ink-5);padding:4px 0}
.cal-wday:first-child{color:#EF4444}
.cal-wday:last-child{color:#3B82F6}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr);padding:0 20px}
.cal-day{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:10px}
.cal-day.empty{pointer-events:none}
.cal-day.today .cal-dn{background:var(--accent);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center}
.cal-dn{font-size:13px;font-weight:500;color:var(--ink)}
.cal-day.sun .cal-dn{color:#EF4444}
.cal-day.sat .cal-dn{color:#3B82F6}
.cal-dot{width:5px;height:5px;border-radius:50%;margin-top:2px}
.cal-dot.ac{background:var(--accent)}
.cal-dot.an{background:var(--public)}
.cal-dot.ug{background:var(--red)}
.cal-evs{padding:0 20px;margin-top:8px}
.cal-ev{background:var(--bg-card);border-radius:12px;padding:12px 14px;margin-bottom:8px;border:1px solid rgba(0,0,0,.06);box-shadow:var(--shadow-xs);cursor:pointer;display:flex;align-items:center;gap:12px}
.cal-ev:active{background:var(--bg)}
.cal-ev-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.cal-ev-dot.ac{background:var(--accent)}
.cal-ev-dot.an{background:var(--public)}
.cal-ev-name{font-size:13px;font-weight:600;flex:1}
.cal-ev-type{font-size:11px;color:var(--ink-4);margin-top:2px}
.cal-ev-d{font-size:12px;font-weight:700;color:var(--ink-4)}
.cal-leg{display:flex;gap:16px;padding:10px 20px}
.cal-leg-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-4)}
.cal-leg-dot{width:8px;height:8px;border-radius:50%}

/* ══ 즐겨찾기 ══ */
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 32px;text-align:center}
.empty-icon{width:72px;height:72px;border-radius:24px;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:20px;box-shadow:0 4px 20px rgba(0,102,255,.12)}
.empty-title{font-size:var(--t-lg);font-weight:800;color:var(--ink);letter-spacing:-.3px}
.empty-sub{font-size:var(--t-base);color:var(--ink-4);margin-top:8px;line-height:1.7}

/* ══ 마이페이지 ══ */
.my-hero{background:linear-gradient(135deg,#0A0E1A,#1A2440,#0D1929);padding:32px 20px 28px;display:flex;align-items:center;gap:16px;position:relative;overflow:hidden}
.my-hero::before{content:'';position:absolute;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,.25) 0%,transparent 70%);top:-80px;right:-60px;pointer-events:none}
.my-hero::after{content:'';position:absolute;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,160,.15) 0%,transparent 70%);bottom:-60px;left:-40px;pointer-events:none}
.my-name{font-size:20px;font-weight:900;color:white;position:relative;z-index:1;letter-spacing:-.4px}
.my-sub{font-size:13px;color:rgba(255,255,255,.55);margin-top:3px;position:relative;z-index:1}
.login-btn{margin-left:auto;background:var(--accent);border:none;padding:10px 18px;border-radius:12px;color:white;font-size:13px;font-weight:700;cursor:pointer;position:relative;z-index:1;white-space:nowrap;box-shadow:0 4px 12px rgba(0,102,255,.4);letter-spacing:-.2px}
.my-cond-card{background:var(--bg-card);border-radius:20px;border:1px solid rgba(0,0,0,.06);padding:20px;box-shadow:0 2px 16px rgba(0,0,0,.08);margin-bottom:12px}
.cond-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:13px}
.cond-label{font-size:11px;color:var(--ink-5)}
.cond-val{font-size:14px;font-weight:700;margin-top:3px}
.menu-item{display:flex;align-items:center;padding:17px 20px;background:var(--bg-card);border-bottom:1px solid rgba(0,0,0,.04);cursor:pointer;transition:background .15s}
.menu-item:first-of-type{margin-top:8px;border-top:1px solid rgba(0,0,0,.04)}
.menu-item:active{background:var(--bg)}
.menu-section-label{padding:22px 20px 8px;font-size:11px;font-weight:700;color:var(--ink-5);letter-spacing:.8px;text-transform:uppercase}
.sup-link{font-size:15px;font-weight:500;color:var(--ink-3);cursor:pointer;transition:opacity .15s;padding:2px 0}
.sup-link:active{opacity:.4}
.menu-ico{font-size:20px;margin-right:14px;width:28px;text-align:center}
.menu-txt{font-size:15px;font-weight:400;flex:1}
.menu-arr{color:var(--ink-5);font-size:18px}
.menu-new{font-size:11px;background:var(--accent);color:white;padding:2px 8px;border-radius:20px;font-weight:700;margin-right:8px}

/* ══ 컨설팅 ══ */
.consult-hero{background:linear-gradient(135deg,#0A0E1A,#1E2535,#2D3A52);padding:28px 20px 24px;position:relative;overflow:hidden}
.consult-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,rgba(0,102,255,.2) 0%,transparent 70%);border-radius:50%}
.consult-title{font-size:22px;font-weight:900;color:white;line-height:1.3;position:relative}
.consult-sub{font-size:13px;color:rgba(255,255,255,.72);margin-top:7px;line-height:1.55}
.consult-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:5px 13px;margin-top:12px;font-size:12px;font-weight:700;color:white}
.prob-card{margin:16px 20px 0;background:var(--bg-card);border-radius:var(--r);border:1px solid rgba(0,0,0,.07);overflow:hidden;box-shadow:var(--shadow-sm)}
.prob-hd{padding:14px 18px;background:linear-gradient(135deg,#EBF2FF,#DCE8FF);border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:center;gap:8px}
.prob-hd-title{font-size:14px;font-weight:800;color:var(--accent-dark)}
.prob-item{padding:14px 18px;border-bottom:1px solid rgba(0,0,0,.05);cursor:pointer;transition:background .15s}
.prob-item:last-child{border-bottom:none}
.prob-item:active{background:var(--bg)}
.prob-item-top{display:flex;justify-content:space-between;align-items:center}
.prob-name{font-size:14px;font-weight:700}
.prob-bar-wrap{margin-top:8px;background:var(--bg);border-radius:20px;height:7px;overflow:hidden}
.prob-bar{height:7px;border-radius:20px}
.prob-bar.hi{background:linear-gradient(90deg,#059669,#34D399)}
.prob-bar.mi{background:linear-gradient(90deg,#D97706,#FBBF24)}
.prob-bar.lo{background:linear-gradient(90deg,#DC2626,#F87171)}
.prob-pct{font-size:15px;font-weight:900}
.prob-pct.hi{color:#059669}
.prob-pct.mi{color:#D97706}
.prob-pct.lo{color:#DC2626}
.prob-sub{font-size:12px;color:var(--ink-4);margin-top:5px}
.prem-card{margin:14px 20px 0}
.prem-inner{background:linear-gradient(135deg,#0F0C2E,#1E1B4B,#312E81);padding:22px 20px;border-radius:var(--r);position:relative;overflow:hidden}
.prem-inner::after{content:'👑';position:absolute;right:18px;top:16px;font-size:40px;opacity:.18}
.prem-title{font-size:16px;font-weight:800;color:white}
.prem-sub{font-size:13px;color:rgba(255,255,255,.65);margin-top:5px;line-height:1.55}
.prem-features{display:flex;flex-direction:column;gap:9px;margin-top:15px}
.prem-feat{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,.82)}
.prem-feat::before{content:'✓';font-weight:800;color:#818CF8}
.prem-btn{width:100%;padding:14px;background:linear-gradient(135deg,#F59E0B,#D97706);color:white;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;margin-top:18px;box-shadow:0 4px 16px rgba(245,158,11,.4);transition:all .2s}
.prem-btn:active{transform:scale(.98)}
.prem-lock{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px;background:var(--bg);border:1px solid rgba(0,0,0,.07);border-top:none;border-radius:0 0 var(--r) var(--r);font-size:13px;color:var(--ink-4);font-weight:600}

/* ══ 용어사전 ══ */
.glo-search{padding:12px 20px 0}
.glo-bar{display:flex;align-items:center;gap:10px;background:var(--bg-card);border:1.5px solid rgba(0,0,0,.08);border-radius:14px;padding:12px 16px;transition:all .2s;box-shadow:var(--shadow-xs)}
.glo-bar:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(0,102,255,.09)}
.glo-bar svg{width:17px;height:17px;color:var(--ink-5)}
.glo-inp{flex:1;border:none;outline:none;font-size:14px;color:var(--ink);background:transparent}
.glo-inp::placeholder{color:var(--ink-5)}
.glo-cat{padding:8px 20px;background:var(--bg);font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid rgba(0,0,0,.05);border-top:1px solid rgba(0,0,0,.05)}
.glo-item{background:var(--bg-card);border-bottom:1px solid rgba(0,0,0,.05);padding:15px 20px;cursor:pointer;transition:background .15s}
.glo-item:active{background:var(--bg)}
.glo-term{font-size:15px;font-weight:700;color:var(--ink)}
.glo-short{font-size:13px;color:var(--ink-4);margin-top:3px}
.glo-full{font-size:13px;color:var(--ink-3);margin-top:8px;line-height:1.65;display:none}
.glo-item.open .glo-full{display:block}
.glo-item.open .glo-term{color:var(--accent)}

/* ══ 위저드 완료 화면 ══ */
.wiz-done{display:none;position:absolute;inset:0;background:var(--bg-card);flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;z-index:10}
.wiz-done.show{display:flex}
.wiz-done-emoji{font-size:64px;margin-bottom:20px;animation:popIn .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
.wiz-done-title{font-size:24px;font-weight:900;color:var(--ink);letter-spacing:-.5px;margin-bottom:8px}
.wiz-done-sub{font-size:14px;color:var(--ink-4);line-height:1.6;margin-bottom:28px}
.wiz-done-types{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px}
.wiz-done-type{font-size:13px;font-weight:700;padding:7px 16px;border-radius:20px;background:var(--accent-light);color:var(--accent);border:1.5px solid var(--accent-mid)}
.wiz-done-btn{width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.3)}
.nudge-ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:none;align-items:flex-end;justify-content:center;max-width:430px;margin:0 auto}
.nudge-ov.open{display:flex}
.nudge-sheet{background:var(--bg-card);border-radius:20px 20px 0 0;width:100%;padding:0 24px 32px;padding-bottom:calc(32px + env(safe-area-inset-bottom))}
.nudge-handle{width:40px;height:4px;background:var(--bg-2);border-radius:20px;margin:12px auto 20px}
.nudge-title{font-size:20px;font-weight:900;color:var(--ink);margin-bottom:8px;letter-spacing:-.3px}
.nudge-sub{font-size:14px;color:var(--ink-4);line-height:1.6;margin-bottom:22px}
.nudge-btn{width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.3)}
.nudge-cancel{text-align:center;margin-top:14px;font-size:13px;color:var(--ink-5);cursor:pointer;padding:4px}
/* ══ 내 조건 대시보드 ══ */
.dash-hero{background:var(--ink-2);padding:24px 20px 20px;position:relative;overflow:hidden}
.dash-hero::after{content:'';position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,.2) 0%,transparent 70%);top:-60px;right:-40px;pointer-events:none}
.dash-name{font-size:22px;font-weight:900;color:white;position:relative;z-index:1;letter-spacing:-.4px}
.dash-sub{font-size:13px;color:rgba(255,255,255,.6);margin-top:4px;position:relative;z-index:1}
.dash-score-row{display:flex;gap:10px;margin-top:16px;position:relative;z-index:1}
.dash-score-card{flex:1;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:14px;text-align:center}
.dash-score-label{font-size:10px;color:rgba(255,255,255,.5);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.dash-score-val{font-size:26px;font-weight:900;color:white;margin-top:4px;letter-spacing:-1px}
.dash-score-unit{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px}
.dash-edit-btn{display:block;width:100%;margin-top:14px;padding:11px;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.2);border-radius:12px;color:white;font-size:13px;font-weight:600;cursor:pointer;text-align:center;position:relative;z-index:1;font-family:'Noto Sans KR',sans-serif}
/* 가능 전형 */
.dash-section{padding:20px 20px 0}
.dash-section-title{font-size:14px;font-weight:800;color:var(--ink);margin-bottom:12px}
.dash-types{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:0}
.dash-type-card{flex:1;min-width:calc(50% - 4px);background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:14px;box-shadow:var(--shadow-xs)}
.dash-type-name{font-size:13px;font-weight:700;color:var(--ink)}
.dash-type-desc{font-size:11px;color:var(--ink-4);margin-top:4px;line-height:1.5}
.dash-type-badge{display:inline-block;margin-top:8px;font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;background:var(--accent-light);color:var(--accent)}
/* 매칭 공고 요약 */
.dash-match-card{background:var(--bg-card);border-radius:var(--r);border:1px solid rgba(0,0,0,.07);padding:16px 18px;box-shadow:var(--shadow-xs);margin-bottom:12px;cursor:pointer;transition:all .2s}
.dash-match-card:active{transform:scale(.98)}
.dash-match-name{font-size:14px;font-weight:700;color:var(--ink)}
.dash-match-loc{font-size:12px;color:var(--ink-4);margin-top:3px}
.dash-match-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.dash-match-type{font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;background:#FEF3C7;color:#92400E}
.dash-match-days{font-size:12px;font-weight:700;color:var(--gold)}
.api-ind-mock{font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;cursor:pointer;background:rgba(255,255,255,.1);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.15);transition:all .2s}
.api-ind-live{font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;cursor:pointer;background:rgba(0,201,160,.2);color:#6EECDA;border:1px solid rgba(0,201,160,.35)}
.api-ind-loading{font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;background:rgba(245,166,35,.2);color:#FDE68A;border:1px solid rgba(245,166,35,.35);animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
.api-menu-badge-off{font-size:11px;background:var(--bg-2);color:var(--ink-5);padding:3px 9px;border-radius:20px;font-weight:600;margin-right:8px}
.api-menu-badge-on{font-size:11px;background:var(--mint-light);color:#00A882;padding:3px 9px;border-radius:20px;font-weight:700;margin-right:8px}

/* ══ API 설정 시트 ══ */
.api-setup-ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:700;display:none;align-items:flex-end;justify-content:center;max-width:430px;margin:0 auto}
.api-setup-ov.open{display:flex}
.api-setup-sheet{background:var(--bg-card);border-radius:20px 20px 0 0;width:100%;max-height:88vh;overflow-y:auto;padding-bottom:env(safe-area-inset-bottom);animation:slideUp .3s ease}
.api-setup-handle{width:40px;height:4px;background:var(--bg-2);border-radius:20px;margin:12px auto 0}
.api-setup-top{padding:20px 24px 16px;border-bottom:1px solid rgba(0,0,0,.06)}
.api-setup-title{font-size:20px;font-weight:900;color:var(--ink);letter-spacing:-.4px;margin-bottom:6px}
.api-setup-sub{font-size:13px;color:var(--ink-4);line-height:1.6}
.api-setup-body{padding:20px 24px 0}
.api-step{display:flex;gap:14px;margin-bottom:22px}
.api-step-num{width:28px;height:28px;border-radius:50%;background:var(--accent);color:white;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.api-step-body{flex:1}
.api-step-title{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:5px}
.api-step-desc{font-size:13px;color:var(--ink-4);line-height:1.6}
.api-step-desc b{color:var(--ink-3);font-weight:700}
.api-step-link{display:inline-block;margin-top:8px;font-size:12px;font-weight:700;color:var(--accent);text-decoration:none;background:var(--accent-light);padding:5px 12px;border-radius:20px}
.api-key-input{width:100%;padding:13px 14px;border-radius:12px;border:1.5px solid rgba(0,0,0,.1);background:var(--bg);font-size:13px;font-family:'Noto Sans KR',sans-serif;color:var(--ink);outline:none;margin-top:10px;transition:all .2s;word-break:break-all}
.api-key-input:focus{border-color:var(--accent);background:var(--bg-card);box-shadow:0 0 0 3px rgba(0,102,255,.09)}
.api-status-box{margin:4px 0 16px;padding:13px 15px;border-radius:12px;font-size:13px;font-weight:600;line-height:1.5}
.api-status-box.ok{background:var(--mint-light);color:#00A882;border:1px solid rgba(0,201,160,.3)}
.api-status-box.err{background:var(--red-light);color:var(--red);border:1px solid rgba(240,64,64,.3)}
.api-status-box.loading{background:var(--gold-light);color:#92400E;border:1px solid rgba(245,166,35,.3);animation:blink 1s infinite}
.api-setup-footer{padding:16px 24px 20px}
.api-connect-btn{width:100%;padding:15px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,102,255,.3);margin-bottom:12px;font-family:'Noto Sans KR',sans-serif}
.api-connect-btn:disabled{background:var(--bg-2);color:var(--ink-5);box-shadow:none;cursor:not-allowed}
.api-skip{text-align:center;font-size:13px;color:var(--ink-5);cursor:pointer}

.notice{margin:0 20px 4px;padding:12px 14px;background:var(--gold-light);border:1.5px solid rgba(245,166,35,.3);border-radius:12px;font-size:13px;color:#92400E;font-weight:500;display:flex;align-items:center;gap:8px}
.toast{position:fixed;bottom:calc(var(--nav-h)+16px);left:50%;transform:translateX(-50%) translateY(20px);background:var(--ink);color:white;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:500;opacity:0;transition:all .3s;white-space:nowrap;z-index:600;pointer-events:none;box-shadow:var(--shadow-lg)}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
/* ══ 상세 그래프 ══ */
/* 반원 게이지 (당첨률) */
.det-chip{display:inline-block;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;color:var(--accent-dark);background:rgba(0,102,255,.08);border:1.5px solid rgba(0,102,255,.15);cursor:pointer;transition:all .2s}
.det-chip-on{background:var(--accent);color:white !important;border-color:var(--accent)}
.prob-gauge-wrap{display:flex;flex-direction:column;align-items:center;padding:16px 0 8px}
.prob-gauge-svg{width:160px;height:88px;overflow:visible}
.prob-gauge-bg{fill:none;stroke:rgba(0,102,255,.12);stroke-width:14;stroke-linecap:round}
.prob-gauge-fill{fill:none;stroke-width:14;stroke-linecap:round;transition:stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)}
.prob-gauge-num{font-size:28px;font-weight:900;text-anchor:middle;dominant-baseline:central}
.prob-gauge-label{font-size:11px;fill:var(--ink-4);text-anchor:middle}

/* 시세 차익 바 */
.gap-chart{padding:12px 0 8px}
.gap-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:0 18px}
.gap-bar-label{font-size:11px;color:var(--ink-4);width:48px;flex-shrink:0;font-weight:600}
.gap-bar-track{flex:1;height:10px;background:rgba(0,0,0,.06);border-radius:10px;overflow:hidden}
.gap-bar-fill{height:100%;border-radius:10px;transition:width .8s cubic-bezier(.4,0,.2,1);width:0%}
.gap-bar-val{font-size:12px;font-weight:700;color:var(--ink-3);width:44px;text-align:right;flex-shrink:0}

/* 커트라인 비교 바 */
.cut-chart{display:flex;flex-direction:column;gap:12px;padding:4px 0}
.cut-chart-row{display:flex;flex-direction:column;gap:5px}
.cut-chart-name{font-size:12px;font-weight:600;color:var(--ink-3)}
.cut-chart-bar-wrap{display:flex;align-items:center;gap:8px}
.cut-chart-track{flex:1;height:8px;background:rgba(0,0,0,.06);border-radius:10px;overflow:visible;position:relative}
.cut-chart-my{height:100%;border-radius:10px;background:var(--accent);transition:width .8s .1s cubic-bezier(.4,0,.2,1);width:0%}
.cut-chart-line{position:absolute;top:0;bottom:0;width:2px;background:var(--red);border-radius:2px}
.cut-chart-scores{display:flex;justify-content:space-between;font-size:11px;color:var(--ink-4)}

/* ══ 추가 애니메이션 2 ══ */
/* 가점 게이지 바 */
.score-bar-wrap{height:6px;background:rgba(255,255,255,.15);border-radius:10px;margin-top:8px;overflow:hidden}
.score-bar-fill{height:100%;border-radius:10px;background:var(--mint);width:0%;transition:width .8s cubic-bezier(.4,0,.2,1)}

/* 대시보드 카드 카운트업 팝 */
@keyframes dashPop{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.dash-val-anim{animation:dashPop .5s cubic-bezier(.34,1.56,.64,1) both}

/* bmSaved → 애니메이션 마스터에서 정의 */

/* 네비 탭 탭 시 통통 */
@keyframes navBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}70%{transform:translateY(-2px)}}
.nav-item.bouncing svg{animation:navBounce .35s ease}

/* 마감임박 흔들림 — 3일 이하 n일 텍스트에 적용 */
@keyframes badgeShake{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(3deg)}}
.rec-d.urgent{animation:badgeShake 2.5s ease infinite;display:inline-block}
@keyframes qBounce {
  0%, 100% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-10px) scale(1.15); }
  60% { transform: translateY(-4px) scale(1.05); }
}
  
/* ══ 애니메이션 마스터 ══ */

/* ── 기본 페이드/슬라이드 ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

/* ── 히어로 인사말 ── */
.hero-greet-anim{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both}
.hero-cheer-anim{animation:fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both}
.cond-card{animation:fadeUp .45s .2s cubic-bezier(.22,1,.36,1) both;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px 16px;margin-bottom:0;cursor:pointer;transition:background .2s}
.cond-card:active{background:rgba(255,255,255,.12)}

/* ── 카드 stagger ── */
@keyframes cardIn{from{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.card-anim{animation:cardIn .4s cubic-bezier(.22,1,.36,1) both}

/* ── 화면 전환 ── */
@keyframes pageIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.screen.active{animation:pageIn .28s cubic-bezier(.22,1,.36,1)}

/* ── 바텀시트 슬라이드업 ── */
@keyframes sheetUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
.wiz-done.show{animation:sheetUp .35s cubic-bezier(.22,1,.36,1)}
.nudge-sheet{animation:sheetUp .32s cubic-bezier(.22,1,.36,1)}
.api-setup-sheet{animation:sheetUp .32s cubic-bezier(.22,1,.36,1)}

/* ── 숫자 카운트업 팝 ── */
@keyframes numPop{0%{transform:scale(1.3);opacity:.5}100%{transform:scale(1);opacity:1}}
.num-pop{animation:numPop .3s cubic-bezier(.34,1.56,.64,1)}

/* ── 당첨률 색상 전환 ── */
.prob-num{transition:color .6s ease}

/* ── 북마크 저장 팡 ── */
@keyframes bmSaved{0%{transform:scale(1)}30%{transform:scale(1.7) rotate(-10deg)}60%{transform:scale(.88) rotate(5deg)}80%{transform:scale(1.08)}100%{transform:scale(1)}}
.bm-btn.just-saved{animation:bmSaved .5s cubic-bezier(.34,1.56,.64,1)}

/* ── 뱃지 팝인 ── */
@keyframes badgePop{0%{transform:scale(0) rotate(-8deg);opacity:0}70%{transform:scale(1.1) rotate(2deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}

/* ── 타입 pill 순차 팝인 ── */
.type-pill:nth-child(1){animation:badgePop .3s .05s cubic-bezier(.34,1.56,.64,1) both}
.type-pill:nth-child(2){animation:badgePop .3s .1s cubic-bezier(.34,1.56,.64,1) both}
.type-pill:nth-child(3){animation:badgePop .3s .15s cubic-bezier(.34,1.56,.64,1) both}
.type-pill:nth-child(4){animation:badgePop .3s .2s cubic-bezier(.34,1.56,.64,1) both}
.type-pill:nth-child(5){animation:badgePop .3s .25s cubic-bezier(.34,1.56,.64,1) both}

/* ── 위저드 파티클 ── */
@keyframes confetti{0%{opacity:1;transform:translateY(0) rotate(0deg) scale(1)}100%{opacity:0;transform:translateY(-130px) rotate(720deg) scale(0)}}
.confetti-piece{position:absolute;width:8px;height:8px;border-radius:2px;animation:confetti 1.2s cubic-bezier(.22,1,.36,1) forwards}

/* ── 게이지 바 pulse ── */
@keyframes barPulse{0%,100%{opacity:1}50%{opacity:.75}}
.gap-bar-fill{animation:barPulse 2.5s ease-in-out infinite}

/* ── 히어로 glow 부유 ── */
@keyframes glowFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1.06)}}
.hero-glow{animation:glowFloat 6s ease-in-out infinite}
.hero-glow2{animation:glowFloat 8s 1s ease-in-out infinite}

/* ── 상세 헤더 진입 ── */
@keyframes detHeaderIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.det-title{animation:detHeaderIn .4s .1s cubic-bezier(.22,1,.36,1) both}
.det-loc{animation:detHeaderIn .4s .18s cubic-bezier(.22,1,.36,1) both}

/* ── 추천 카드 가로스크롤 순차 ── */
.rec-card:nth-child(1){animation:slideLeft .4s .05s cubic-bezier(.22,1,.36,1) both}
.rec-card:nth-child(2){animation:slideLeft .4s .12s cubic-bezier(.22,1,.36,1) both}
.rec-card:nth-child(3){animation:slideLeft .4s .19s cubic-bezier(.22,1,.36,1) both}
.rec-card:nth-child(4){animation:slideLeft .4s .26s cubic-bezier(.22,1,.36,1) both}
.rec-card:nth-child(5){animation:slideLeft .4s .33s cubic-bezier(.22,1,.36,1) both}

/* ── 마이페이지 메뉴 순차 ── */
@keyframes menuIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
.menu-item:nth-child(1){animation:menuIn .35s .05s cubic-bezier(.22,1,.36,1) both}
.menu-item:nth-child(2){animation:menuIn .35s .1s cubic-bezier(.22,1,.36,1) both}
.menu-item:nth-child(3){animation:menuIn .35s .15s cubic-bezier(.22,1,.36,1) both}
.menu-item:nth-child(4){animation:menuIn .35s .2s cubic-bezier(.22,1,.36,1) both}
.menu-item:nth-child(5){animation:menuIn .35s .25s cubic-bezier(.22,1,.36,1) both}

/* ── 마감 임박 흔들림 ── */
@keyframes badgeShake{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(3deg)}}
.rec-d.urgent{animation:badgeShake 2.5s ease infinite;display:inline-block}

/* ── 빈 상태 진입 ── */
@keyframes emptyIn{0%{opacity:0;transform:translateY(24px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
.empty-state{animation:emptyIn .5s cubic-bezier(.22,1,.36,1) both}
.empty-icon{animation:badgePop .5s .2s cubic-bezier(.34,1.56,.64,1) both}

/* ── 토스트 스프링 ── */
.toast{transition:all .35s cubic-bezier(.34,1.56,.64,1)}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* ── 탭바 활성 배경 팝 ── */
@keyframes navPop{from{transform:translateX(-50%) scale(.5);opacity:0}to{transform:translateX(-50%) scale(1);opacity:1}}
@keyframes loadDot{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
/* 리포트 인트로 */
@keyframes introLineIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.intro-line{opacity:0;animation:introLineIn .5s cubic-bezier(.22,1,.36,1) forwards}
@keyframes introBtnIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.intro-btn{opacity:0;animation:introBtnIn .5s cubic-bezier(.34,1.56,.64,1) forwards}
/* 리포트 섹션 스타일 */
.report-section{background:var(--bg-card);border-radius:20px;border:1px solid rgba(0,0,0,.06);padding:18px 20px;margin-bottom:14px;box-shadow:0 2px 12px rgba(0,0,0,.06);animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both}
.report-section-title{font-size:13px;font-weight:700;color:var(--accent);margin-bottom:10px;display:flex;align-items:center;gap:6px;text-transform:uppercase;letter-spacing:.5px}
.report-section-body{font-size:14px;color:var(--ink-3);line-height:1.8}
.report-highlight{background:var(--accent-light);border-radius:12px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--accent-dark);font-weight:600;line-height:1.6}
.report-tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:var(--mint-light);color:#00A882;margin:3px 3px 3px 0}

/* ══ 스플래시 ══ */
#splash{position:fixed;inset:0;background:#ffffff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;}
#splash.hide{animation:splashOut .5s ease forwards}
@keyframes splashOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.04);pointer-events:none}}
/* 지붕 */
.sp-roof{opacity:0;animation:spRoofIn .45s cubic-bezier(.34,1.4,.64,1) .2s forwards}
@keyframes spRoofIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
/* 몸통 */
.sp-body{opacity:0;animation:spBodyIn .4s ease .5s forwards;transform-origin:top center}
@keyframes spBodyIn{from{opacity:0;transform:scaleY(.5)}to{opacity:1;transform:scaleY(1)}}
/* 체크 드로우 */
.sp-check{stroke-dasharray:40;stroke-dashoffset:40;animation:spCheck .45s cubic-bezier(.4,0,.2,1) .85s forwards}
@keyframes spCheck{to{stroke-dashoffset:0}}
/* 아이콘 바운스 */
.sp-icon-g{animation:spBounce .28s cubic-bezier(.34,1.7,.64,1) 1.28s both}
@keyframes spBounce{from{transform:scale(1)}50%{transform:scale(1.06)}to{transform:scale(1)}}
/* 텍스트 */
.splash-logo{font-family:'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif;font-weight:900;font-size:35px;color:#0A0E1A;letter-spacing:-.8px;margin-top:16px;opacity:0;animation:spTextUp .5s ease 1.1s forwards}
.splash-logo span{color:#0066FF}
@keyframes spTextUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
/* 로딩바 */
.sp-bar-wrap{position:absolute;bottom:40px;width:64px;opacity:0;animation:spTextUp .4s ease 1.5s forwards}
.sp-bar-track{width:100%;height:2px;background:rgba(0,0,0,.06);border-radius:2px;overflow:hidden}
.sp-bar-fill{height:100%;background:linear-gradient(to right,#0066FF,#4DA3FF);border-radius:2px;width:0;animation:spBarFill 1.4s ease 1.55s forwards}
@keyframes spBarFill{0%{width:0}60%{width:65%}100%{width:100%}}

/* ══ 지역 필터 ══ */
.region-filter-wrap{padding:8px 20px 0}
.sort-row{display:flex;align-items:center;padding:0}
.region-btn{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:var(--bg-card);border:1.5px solid rgba(0,0,0,.08);border-radius:10px;font-size:12px;font-weight:600;color:var(--ink-3);cursor:pointer;box-shadow:var(--shadow-xs);white-space:nowrap;transition:all .2s}
.region-btn:active,.region-btn.open{border-color:var(--accent);color:var(--accent)}
.region-btn .cnt{font-size:11px;font-weight:700;padding:1px 6px;border-radius:20px;background:var(--accent);color:white}
.region-btn .cnt.none{display:none}
.region-chips-wrap{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 0}
.region-chips-wrap.open{max-height:160px}
.region-chips{display:flex;flex-wrap:wrap;gap:7px;padding:10px 0 2px}
.region-chip{padding:5px 12px;border-radius:20px;border:1.5px solid rgba(0,0,0,.08);background:var(--bg-card);font-size:12px;font-weight:600;color:var(--ink-4);cursor:pointer;transition:all .15s;user-select:none}
.region-chip.checked{background:var(--accent-light);border-color:var(--accent);color:var(--accent);font-weight:700}
@keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(2.5);opacity:0}}

</style>
</head>
<body>


<!-- ══ 스플래시 ══ -->
<div id="splash">
  <svg width="68" height="63" viewBox="0 0 90 82" overflow="visible" style="display:block">
    <defs>
      <linearGradient id="spRG" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stop-color="#3B8FFF"/><stop offset="100%" stop-color="#0062F0"/>
      </linearGradient>
      <linearGradient id="spBG" x1="0%" y1="0%" x2="40%" y2="100%">
        <stop offset="0%" stop-color="#1478FF"/><stop offset="100%" stop-color="#004FCC"/>
      </linearGradient>
    </defs>
    <g class="sp-icon-g">
      <g class="sp-roof">
        <polygon points="45,6 86,36 4,36" fill="url(#spRG)"/>
        <polygon points="45,6 86,36 45,36" fill="white" opacity="0.07"/>
        <line x1="45" y1="6" x2="86" y2="36" stroke="white" stroke-width="0.8" opacity="0.18"/>
      </g>
      <g class="sp-body">
        <rect x="10" y="35" width="70" height="42" rx="4" fill="url(#spBG)"/>
        <rect x="10" y="35" width="18" height="42" rx="4" fill="white" opacity="0.055"/>
        <rect x="16" y="40" width="8" height="7" rx="1.5" fill="white" opacity="0.1"/>
        <rect x="66" y="40" width="8" height="7" rx="1.5" fill="white" opacity="0.1"/>
      </g>
      <polyline class="sp-check" points="30,57 40,68 60,50"
        fill="none" stroke="white" stroke-width="6.5"
        stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
  <div class="splash-logo">쉬운<span>청약</span></div>
  <div class="sp-bar-wrap"><div class="sp-bar-track"><div class="sp-bar-fill"></div></div></div>
</div>
<!-- ══ 설정 화면 ══ -->
<div class="api-setup-ov" id="api-setup-ov">
  <div class="api-setup-sheet">
    <div class="api-setup-handle"></div>
    <div class="api-setup-top">
      <div class="api-setup-title">🔌 청약홈 API 연동</div>
      <div class="api-setup-sub">공공데이터포털에서 API 키를 발급받아 입력하면<br>전국 실시간 청약 공고를 불러올 수 있어요.</div>
    </div>
    <div class="api-setup-body">
      <div class="api-step">
        <div class="api-step-num">1</div>
        <div class="api-step-body">
          <div class="api-step-title">공공데이터포털 가입 및 API 신청</div>
          <div class="api-step-desc">data.go.kr 접속 → 회원가입 → 검색창에 <b>"청약홈 분양정보"</b> 검색 → 활용신청 (즉시 발급)</div>
          <a class="api-step-link" href="https://www.data.go.kr/data/15098547/openapi.do" target="_blank">→ data.go.kr 바로가기</a>
        </div>
      </div>
      <div class="api-step">
        <div class="api-step-num">2</div>
        <div class="api-step-body">
          <div class="api-step-title">발급받은 서비스키 입력</div>
          <div class="api-step-desc">마이페이지 → API 키 확인 → <b>Decoding 키</b>를 아래에 붙여넣기</div>
          <input type="text" class="api-key-input" id="api-key-input" placeholder="서비스키(Decoding)를 입력하세요"/>
        </div>
      </div>
      <div class="api-status-box" id="api-status-box" style="display:none"></div>
    </div>
    <div class="api-setup-footer">
      <button class="api-connect-btn" id="api-connect-btn" onclick="connectApi()">연결하기</button>
      <div class="api-skip" onclick="closeApiSetup()">나중에 할게요 (목업 데이터로 계속)</div>
    </div>
  </div>
</div>

<!-- ══ 위저드 ══ -->
<div class="wizard" id="wizard">
  <div class="wiz-top">
    <button class="wiz-back" onclick="wizBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
    <div class="wiz-prog-wrap" id="wiz-prog-wrap">
      <div class="wiz-step-txt" id="wiz-step-txt">1 / 4</div>
      <div class="wiz-track"><div class="wiz-fill" id="wiz-fill" style="width:25%"></div></div>
    </div>
  </div>

  <!-- Step 1: 기본 정보 -->
  <div class="wiz-body" id="ws1">
    <div class="wiz-title">딱 1분이면<br>맞춤 공고를 찾아드려요</div>
    <div class="wiz-sub">대략 입력해도 돼요. 언제든 수정할 수 있어요.</div>
    <div class="wiz-field dob">
      <label class="wiz-label">출생년도 / 월 / 일</label>
      <div class="wiz-inp-row">
        <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" id="w-by" placeholder="1990" oninput="onBirthChange();if(this.value.length>=4)document.getElementById('w-bm').focus();" maxlength="4"/></div>
        <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" id="w-bm" placeholder="01" min="1" max="12" oninput="onBirthChange();if(this.value.length>=2)document.getElementById('w-bd').focus();"/></div>
        <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" id="w-bd" placeholder="01" min="1" max="31"/></div>
      </div>
      <div class="wiz-accuracy-hint">
        <span>📊 입력하면 청년특공 자격 여부를 바로 확인해드려요</span>
      </div>
    </div>
    <div class="wiz-field" style="margin-top:8px">
      <label class="wiz-label">혼인 여부</label>
      <div class="wiz-radio-grp">
        <div class="wiz-radio on" onclick="wRadio(this,'marriage')">미혼</div>
        <div class="wiz-radio" onclick="wRadio(this,'marriage')">기혼</div>
        <div class="wiz-radio" onclick="wRadio(this,'marriage')">이혼·사별</div>
      </div>
    </div>
    <!-- 기혼 선택 시 혼인신고 연도 -->
    <div class="wiz-field" id="marriage-year-field" style="display:none">
      <label class="wiz-label">혼인신고 연도</label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-marriageYear" placeholder="예: 2022"/><span class="unit">년</span></div>
      <div class="wiz-accuracy-hint">
        <span>📊 혼인 7년 이내면 신혼부부특공 자격을 확인해드려요</span>
      </div>
    </div>
    <!-- 기혼 선택 시 맞벌이 여부 표시 -->
    <div class="wiz-field" id="dual-income-field" style="display:none">
      <label class="wiz-label">맞벌이 여부</label>
      <div class="wiz-radio-grp">
        <div class="wiz-radio on" onclick="wRadio(this,'dualincome')">외벌이</div>
        <div class="wiz-radio" onclick="wRadio(this,'dualincome')">맞벌이</div>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">자녀 수</label>
      <div class="wiz-stepper">
        <button class="step-btn" onclick="wStep('children',-1)">−</button>
        <div class="step-val" id="sv-children">0명</div>
        <button class="step-btn" onclick="wStep('children',1)">+</button>
      </div>
      <div id="child-dates-wrap"></div>
    </div>
  </div>

  <!-- Step 2: 주택 현황 -->
  <div class="wiz-body" id="ws2" style="display:none">
    <div class="wiz-title">주택 현황을<br>알려주세요</div>
    <div class="wiz-sub">대략 입력해도 돼요. 언제든 수정할 수 있어요.</div>
    <div class="wiz-field">
      <label class="wiz-label">현재 주택 소유</label>
      <div class="wiz-radio-grp">
        <div class="wiz-radio on" onclick="wRadio(this,'homeowner')">무주택자</div>
        <div class="wiz-radio" onclick="wRadio(this,'homeowner')">1주택자</div>
        <div class="wiz-radio" onclick="wRadio(this,'homeowner')">2주택↑</div>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">무주택 기간 (년)
        <span class="wiz-label-note" id="nohome-hint"></span>
      </label>
      <div id="nohome-auto-hint" style="font-size:12px;color:var(--accent);background:var(--accent-light);border-radius:8px;padding:8px 12px;margin-bottom:8px;line-height:1.6;display:none"></div>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-nohome" placeholder="예: 3"/><span class="unit">년</span></div>
      <div class="wiz-accuracy-hint">
        <span>📊 입력할수록 가점 계산과 예상 당첨률이 더 정확해져요</span>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">부양가족 수 <span class="wiz-label-note">(본인 제외)</span></label>
      <div class="wiz-stepper">
        <button class="step-btn" onclick="wStep('dep',-1)">−</button>
        <div class="step-val" id="sv-dep">0명</div>
        <button class="step-btn" onclick="wStep('dep',1)">+</button>
      </div>
      <div class="wiz-accuracy-hint">
        <span>📊 부양가족 1명당 가점 5점, 최대 35점까지 올라가요</span>
      </div>
    </div>
  </div>

  <!-- Step 3: 소득·자산 -->
  <div class="wiz-body" id="ws3" style="display:none">
    <div class="wiz-title">소득과 자산을<br>알려주세요</div>
    <div class="wiz-sub">대략 입력해도 돼요. 언제든 수정할 수 있어요.</div>
    <div class="wiz-field">
      <label class="wiz-label">세대원 수</label>
      <select class="wiz-sel" id="w-household" onchange="onHouseholdChange()">
        <option value="">선택하세요</option>
        <option value="1">1인</option><option value="2">2인</option>
        <option value="3">3인</option><option value="4">4인</option>
        <option value="5">5인 이상</option>
      </select>
    </div>
    <!-- 세대원 2인 이상일 때 노부모 부양 여부 -->
    <div class="wiz-field" id="elder-parent-field" style="display:none">
      <label class="wiz-label">만 65세 이상 부모 부양 여부</label>
      <div class="wiz-radio-grp">
        <div class="wiz-radio on" onclick="wRadio(this,'elderParent')">아니오</div>
        <div class="wiz-radio" onclick="wRadio(this,'elderParent')">예 (3년 이상 부양)</div>
      </div>
      <div class="wiz-accuracy-hint">
        <span>📊 만 65세 이상 직계존속을 3년 이상 부양하면 노부모부양 특공 자격이에요</span>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">연간 소득 <span class="wiz-label-note" id="income-who-label">본인</span></label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-income" placeholder="예: 4500" oninput="onIncomeChange()"/><span class="unit">만원</span></div>
      <!-- 소득 기준 % 표시 -->
      <div id="income-pct-box" style="display:none;margin-top:10px;padding:10px 14px;background:var(--accent-light);border-radius:10px;line-height:1.7">
        <div id="income-pct-main" style="font-size:14px;font-weight:800;color:var(--accent)"></div>
        <div id="income-pct-detail" style="font-size:12px;color:var(--ink-4);margin-top:2px"></div>
      </div>
    </div>
    <!-- 맞벌이일 경우 배우자 소득 추가 -->
    <div class="wiz-field" id="spouse-income-field" style="display:none">
      <label class="wiz-label">배우자 연간 소득</label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-spouse-income" placeholder="예: 3500" oninput="onIncomeChange()"/><span class="unit">만원</span></div>
      <!-- 맞벌이 합산 % 표시 -->
      <div id="spouse-pct-box" style="display:none;margin-top:10px;padding:10px 14px;background:var(--accent-light);border-radius:10px;line-height:1.7">
        <div id="spouse-pct-main" style="font-size:14px;font-weight:800;color:var(--accent)"></div>
        <div id="spouse-pct-detail" style="font-size:12px;color:var(--ink-4);margin-top:2px"></div>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">보유 현금 <span class="wiz-label-note">예·적금 포함</span></label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-cash" placeholder="예: 5000"/><span class="unit">만원</span></div>
      <div class="wiz-accuracy-hint">
        <span>📊 입력하면 계약금 납부 가능 여부를 분석해드려요</span>
      </div>
    </div>
  </div>

  <!-- Step 4: 청약통장 + 지역 -->
  <div class="wiz-body" id="ws4" style="display:none">
    <div class="wiz-title">청약 통장 정보를<br>입력해주세요</div>
    <div class="wiz-sub">대략 입력해도 돼요. 언제든 수정할 수 있어요.</div>
    <div class="wiz-field">
      <label class="wiz-label">청약통장 가입기간</label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-accYears" placeholder="예: 5"/><span class="unit">년</span></div>
      <div class="wiz-accuracy-hint">
        <span>📊 가입 2년 이상이면 투기과열지구 1순위 자격이에요</span>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">납입 횟수</label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-dc" placeholder="예: 24"/><span class="unit">회</span></div>
      <div class="wiz-accuracy-hint">
        <span>📊 24회 이상이면 투기과열지구 1순위, 12회 이상이면 기타지역 1순위예요</span>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">납입 총액</label>
      <div class="wiz-inp-unit"><input type="number" class="wiz-inp" id="w-da" placeholder="예: 1500"/><span class="unit">만원</span></div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">관심 평형</label>
      <div class="region-chips" id="wiz-size-chips" style="padding:0">
        <label class="region-chip" onclick="clearWizSizes()">전체</label>
        <label class="region-chip" onclick="toggleWizSize('20')">20평 (59㎡)</label>
        <label class="region-chip" onclick="toggleWizSize('25')">25평 (74㎡)</label>
        <label class="region-chip" onclick="toggleWizSize('30')">30평 (84㎡)</label>
        <label class="region-chip" onclick="toggleWizSize('34')">34평 (102㎡)</label>
        <label class="region-chip" onclick="toggleWizSize('40')">40평 (115㎡)</label>
      </div>
      <div class="wiz-accuracy-hint" style="margin-top:10px">
        <span>📊 선택하면 평형별 경쟁률로 당첨 확률을 더 정확하게 분석해드려요</span>
      </div>
    </div>
    <div class="wiz-field">
      <label class="wiz-label">희망 지역</label>
      <div class="region-chips" id="wiz-region-chips" style="padding:0">
        <label class="region-chip" onclick="clearWizRegions()">전체</label>
        <label class="region-chip" onclick="toggleWizRegion('seoul')">서울</label>
        <label class="region-chip" onclick="toggleWizRegion('gyeonggi')">경기</label>
        <label class="region-chip" onclick="toggleWizRegion('incheon')">인천</label>
        <label class="region-chip" onclick="toggleWizRegion('busan')">부산</label>
        <label class="region-chip" onclick="toggleWizRegion('daejeon')">대전</label>
        <label class="region-chip" onclick="toggleWizRegion('sejong')">세종</label>
        <label class="region-chip" onclick="toggleWizRegion('daegu')">대구</label>
        <label class="region-chip" onclick="toggleWizRegion('gwangju')">광주</label>
        <label class="region-chip" onclick="toggleWizRegion('ulsan')">울산</label>
        <label class="region-chip" onclick="toggleWizRegion('gangwon')">강원</label>
        <label class="region-chip" onclick="toggleWizRegion('chungnam')">충남</label>
        <label class="region-chip" onclick="toggleWizRegion('jeonnam')">전남</label>
      </div>
      <div class="wiz-accuracy-hint" style="margin-top:10px">
        <span>📊 입력하면 해당 지역 공고를 우선으로 추천해드려요</span>
      </div>
    </div>
  </div>

  <div class="wiz-foot" id="wiz-foot">
    <button class="wiz-btn" id="wiz-btn" onclick="wizNext()">확인</button>
  </div>

  <!-- 완료 화면 -->
  <div class="wiz-done" id="wiz-done">
    <div class="wiz-done-emoji">🎉</div>
    <div class="wiz-done-title">조건 설정 완료!</div>
    <div class="wiz-done-sub" id="wiz-done-sub"></div>
    <div class="wiz-done-types" id="wiz-done-types"></div>
    <button class="wiz-done-btn" onclick="finishWizard()">공고 보러 가기</button>
  </div>
</div>

<!-- ══ 홈 ══ -->
<div class="screen active" id="screen-home">
  <!-- 히어로 -->
  <div class="hero">
    <div class="hero-noise"></div>
    <div class="hero-glow"></div>
    <div class="hero-glow2"></div>
    <div class="hero-inner">
      <div id="api-indicator" style="display:none"></div>
      <!-- 닉네임 + 응원 문구 -->
      <div style="margin-bottom:16px;position:relative;z-index:1;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
        <div id="hero-greeting" class="hero-greet-anim" style="font-size:20px;font-weight:900;color:white;letter-spacing:-.4px;white-space:nowrap"></div>
        <div id="hero-cheer" class="hero-cheer-anim" style="font-size:13px;font-weight:300;color:rgba(255,255,255,.6);letter-spacing:-.1px"></div>
      </div>
      <div class="cond-card" onclick="toggleCond()">
        <div class="cond-card-top">
          <div class="cond-card-label">내 청약 조건</div>
          <div class="cond-chevron" id="cond-chev">⌄</div>
        </div>
        <div class="type-pills" id="type-pills">

        </div>
        <div class="cond-detail" id="cond-detail">
          <div class="cond-grid">
            <div><div class="cond-item-label">연소득</div><div class="cond-item-val blank" id="cd-income">?만</div></div>
            <div><div class="cond-item-label">보유현금</div><div class="cond-item-val blank" id="cd-cash">?만</div></div>
            <div><div class="cond-item-label">무주택</div><div class="cond-item-val blank" id="cd-nohome">?년</div></div>
            <div><div class="cond-item-label">청약통장</div><div class="cond-item-val blank" id="cd-dep">?회</div></div>
            <div><div class="cond-item-label">자녀</div><div class="cond-item-val blank" id="cd-children">?명</div></div>
            <div><div class="cond-item-label">지역</div><div class="cond-item-val blank" id="cd-region">?</div></div>
          </div>
        </div>
        <button class="hero-cta-btn" id="hero-cta" onclick="event.stopPropagation();openWizard()">조건 설정하기</button>
      </div>
    </div>
  </div>

  <div id="alert-area"></div>

  <div class="section-row" id="rec-section-row">
    <div class="section-title">내게 맞는 공고</div>
  </div>
  <div id="rec-container"><div class="notice" style="cursor:pointer" onclick="openMyCondition()">⚠️ 조건을 설정하면 맞춤 공고를 추천해드려요!</div></div>

  <div class="section-row" style="margin-top:6px">
    <div class="section-title">전체 공고</div>
  </div>
  <div class="search-wrap">
    <div class="search-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="search-inp" id="srch-inp" type="text" placeholder="단지명이나 지역으로 검색해보세요" oninput="onSearch()"/>
      <button class="search-clr" id="srch-clr" onclick="clearSearch()" style="display:none">×</button>
    </div>
  </div>
  <div class="filter-wrap">
    <div class="filter-tabs">
      <div class="ftab active" id="tab-all" onclick="setFilter('all',this)">전체</div>
      <div class="ftab lotto" id="tab-lotto" onclick="setFilter('lotto',this)">🎰 로또청약</div>
      <div class="ftab" id="tab-public" onclick="setFilter('public',this)">공공분양</div>
      <div class="ftab" id="tab-private" onclick="setFilter('private',this)">민간분양</div>
    </div>
  </div>
  <div class="region-filter-wrap">
    <div class="sort-row">
      <div class="region-btn" id="region-toggle" onclick="toggleRegionFilter()">
        희망 지역 <span id="region-cnt" class="cnt none">전체</span> <span id="region-chev" style="font-size:11px;color:var(--ink-4)">⌄</span>
      </div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
        <span class="sort-label">정렬</span>
        <select class="sort-sel" id="sort-sel" onchange="renderListings()">
          <option value="default">기본순</option>
          <option value="recommend">추천순</option>
          <option value="winrate">당첨률순</option>
          <option value="profit">시세차익순</option>
        </select>
      </div>
    </div>
    <div class="region-chips-wrap" id="region-chips-wrap">
      <div class="region-chips">
        <label class="region-chip" onclick="clearRegions()">전체</label>
        <label class="region-chip" onclick="toggleRegion('seoul')">서울</label>
        <label class="region-chip" onclick="toggleRegion('gyeonggi')">경기</label>
        <label class="region-chip" onclick="toggleRegion('incheon')">인천</label>
        <label class="region-chip" onclick="toggleRegion('busan')">부산</label>
        <label class="region-chip" onclick="toggleRegion('daejeon')">대전</label>
        <label class="region-chip" onclick="toggleRegion('sejong')">세종</label>
        <label class="region-chip" onclick="toggleRegion('daegu')">대구</label>
        <label class="region-chip" onclick="toggleRegion('gwangju')">광주</label>
        <label class="region-chip" onclick="toggleRegion('ulsan')">울산</label>
        <label class="region-chip" onclick="toggleRegion('gangwon')">강원</label>
        <label class="region-chip" onclick="toggleRegion('chungnam')">충남</label>
        <label class="region-chip" onclick="toggleRegion('jeonnam')">전남</label>
      </div>
    </div>
  </div>
  <div id="api-notice-banner"></div>
  <div id="lotto-banner"></div>
  <div class="listings" id="listings"></div>
  <div style="height:50px"></div>
</div>

<!-- ══ 상세 ══ -->
<div class="screen" id="screen-detail">
  <div class="det-sticky-cta" id="det-sticky-cta">
    <a id="det-cta-link" href="https://www.applyhome.co.kr" target="_blank" class="det-cta-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      청약홈에서 바로 신청하기
    </a>
  </div>
  <div class="det-header">
    <div class="det-header-top">
      <button class="det-back" onclick="goBack()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="det-bell" id="det-delete-btn" onclick="deleteFromDetail()" style="display:none;background:var(--red)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
        <button class="det-bell" id="det-share-btn" onclick="shareDetail()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
        <button class="det-bell" id="det-save-btn" onclick="toggleSaveFromDetailIcon()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        <button class="det-bell" id="det-bell-btn" onclick="toggleDetailAlarm()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
      </div>
    </div>
    <div id="det-badges"></div>
    <div class="det-title" id="det-title"></div>
    <div class="det-loc" id="det-loc"></div>
  </div>
  <div class="det-body" id="det-body" style="padding-bottom:80px"></div>
</div>

<!-- ══ 내 조건 대시보드 ══ -->
<div class="screen" id="screen-mycond">
  <div id="mycond-body"></div>
</div>

<!-- ══ 가점 계산기 ══ -->
<div class="screen" id="screen-score">
  <div class="score-hero">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;position:relative;z-index:1">
      <button class="det-back" onclick="showScreen('my')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
      <div style="font-size:16px;font-weight:700;color:white">청약 가점 계산기</div>
    </div>
    <div class="score-box">
      <div class="score-num" id="score-total">0</div>
      <div class="score-max">/ 84점</div>
      <div id="score-grade"></div>
      <div class="score-bk">
        <div class="score-bk-item"><div class="score-bk-l">무주택 기간</div><div class="score-bk-v" id="sc-nh">0</div><div class="score-bk-m">/ 32점</div><div class="score-bar-wrap"><div class="score-bar-fill" id="bar-nh"></div></div></div>
        <div class="score-bk-item"><div class="score-bk-l">부양가족</div><div class="score-bk-v" id="sc-dp">0</div><div class="score-bk-m">/ 35점</div><div class="score-bar-wrap"><div class="score-bar-fill" id="bar-dp"></div></div></div>
        <div class="score-bk-item"><div class="score-bk-l">청약통장</div><div class="score-bk-v" id="sc-ac">0</div><div class="score-bk-m">/ 17점</div><div class="score-bar-wrap"><div class="score-bar-fill" id="bar-ac"></div></div></div>
      </div>
    </div>
  </div>
  <div class="score-body">
    <div class="score-card">
      <div class="score-card-t">점수 세부 내역</div>
      <div id="score-rows"></div>
    </div>
    <div class="info-card" style="margin-top:14px">
      <div class="info-card-title">진행 중 공고 커트라인 비교</div>
      <div id="cutline-list"></div>
    </div>
    <div class="info-card" style="margin-top:14px" id="score-tips-card">
      <div class="info-card-title">💡 내 가점 올리는 방법</div>
      <div id="score-tips"></div>
    </div>
    <div style="height:100px"></div>
  </div>
</div>

<!-- ══ 캘린더 ══ -->
<div class="screen" id="screen-calendar">
  <div class="cal-hd">
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="changeMonth(-1)">‹</button>
      <div class="cal-mo" id="cal-mo"></div>
      <button class="cal-nav-btn" onclick="changeMonth(1)">›</button>
    </div>
    <div class="cal-wdays">
      <div class="cal-wday">일</div><div class="cal-wday">월</div>
      <div class="cal-wday">화</div><div class="cal-wday">수</div>
      <div class="cal-wday">목</div><div class="cal-wday">금</div>
      <div class="cal-wday">토</div>
    </div>
  </div>
  <div class="cal-days" id="cal-days"></div>
  <div class="cal-leg">
    <div class="cal-leg-item"><div class="cal-leg-dot" style="background:var(--accent)"></div>접수</div>
    <div class="cal-leg-item"><div class="cal-leg-dot" style="background:var(--public)"></div>발표</div>
    <div class="cal-leg-item"><div class="cal-leg-dot" style="background:var(--red)"></div>마감</div>
  </div>
  <div class="cal-evs" id="cal-evs"></div>
</div>

<!-- ══ 즐겨찾기 ══ -->
<div class="screen" id="screen-saved">
  <div class="page-header"><div class="page-title">즐겨찾기</div><div class="page-sub">관심 있는 공고를 저장해두세요</div></div>
  <div id="saved-container"></div>
</div>

<!-- ══ 컨설팅 ══ -->
<div class="screen" id="screen-consult">
  <div class="consult-hero">
    <div class="consult-title">🏆 청약 컨설팅</div>
    <div class="consult-sub">내 조건으로 어디 청약할지,
예상 당첨률까지 분석해드려요</div>
    <div class="consult-badge">⚡ 내 조건 기반 실시간 분석</div>
  </div>
  <div class="prob-card">
    <div class="prob-hd"><span style="font-size:18px">🎯</span><span class="prob-hd-title">진행 중 공고 예상 당첨률 분석</span></div>
    <div id="prob-list"><div style="padding:24px;text-align:center;color:var(--ink-4);font-size:13px">조건을 먼저 설정해주세요</div></div>
  </div>
  <div class="prem-card">
    <div class="prem-inner">
      <div class="prem-title">AI 맞춤 청약 전략 리포트</div>
      <div style="margin:8px 0 12px;padding:10px 14px;background:rgba(255,255,255,.15);border-radius:10px;border-left:3px solid white">
        <div style="font-size:13px;font-weight:800;color:white;line-height:1.6">✦ 내 조건을 분석해 최적 청약지와<br>당첨 확률이 가장 높은 전형을 추천해드려요</div>
      </div>
      <div class="prem-sub">나만을 위한 청약 로드맵을 AI가 분석해드려요</div>
      <div class="prem-features">
        <div class="prem-feat">내 조건 기반 최적 청약지 TOP 5 추천</div>
        <div class="prem-feat">가점 계산 및 경쟁률 심층 분석</div>
        <div class="prem-feat">대출 상품 비교 및 월 상환액 시뮬레이션</div>
        <div class="prem-feat">청약 일정 맞춤 저축 전략 제안</div>
      </div>
      <button class="prem-btn" id="prem-start-btn" onclick="openPremReport()">✦ 내 청약 전략 리포트 받기</button>
    </div>
    <div class="prem-lock">🆓 지금은 무료로 체험할 수 있어요</div>
  </div>
  <div style="height:100px"></div>
</div>

<!-- ══ 리포트 오버레이 ══ -->
<div id="report-ov" style="display:none;position:fixed;inset:0;background:var(--bg);z-index:600;max-width:430px;margin:0 auto;flex-direction:column;overflow:hidden">
  <!-- 헤더 -->
  <div style="background:linear-gradient(135deg,#0A0E1A,#1A2440);padding:20px 20px 24px;position:relative;overflow:hidden;flex-shrink:0">
    <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,.2) 0%,transparent 70%);top:-60px;right:-40px;pointer-events:none"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1">
      <button onclick="closeReport()" style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:12px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </button>
      <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.7)" id="report-nav-title">AI 청약 전략 리포트</div>
      <div style="width:44px"></div>
    </div>
    <div style="margin-top:16px;position:relative;z-index:1">
      <div style="font-size:22px;font-weight:900;color:white;letter-spacing:-.4px;line-height:1.3" id="report-headline">몇 가지만 더 알려주세요</div>
      <div style="font-size:13px;color:rgba(255,255,255,.55);margin-top:6px" id="report-sub">더 정확한 리포트를 위해 몇 가지 여쭤볼게요</div>
      <!-- 진행 바 -->
      <div style="margin-top:14px;height:3px;background:rgba(255,255,255,.15);border-radius:3px;overflow:hidden" id="report-prog-wrap">
        <div id="report-prog" style="height:100%;background:white;border-radius:3px;transition:width .4s ease;width:0%"></div>
      </div>
    </div>
  </div>
  <!-- 바디 -->
  <div style="flex:1;overflow-y:auto;padding:20px 20px 40px" id="report-body">
    <!-- 인터뷰 단계 -->
    <div id="report-interview" style="display:block"></div>
    <!-- 로딩 상태 -->
    <div id="report-loading" style="display:none;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:16px">
      <div style="width:48px;height:48px;border-radius:16px;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:24px;animation:badgePop .5s cubic-bezier(.34,1.56,.64,1)">✦</div>
      <div style="font-size:15px;font-weight:700;color:var(--ink)">리포트 작성 중이에요</div>
      <div style="font-size:13px;color:var(--ink-4);text-align:center;line-height:1.7" id="report-loading-msg">조건을 꼼꼼히 분석하고 있어요...</div>
      <div style="display:flex;gap:6px;margin-top:4px">
        <div style="width:8px;height:8px;border-radius:50%;background:var(--accent);animation:loadDot 1.2s .0s ease-in-out infinite"></div>
        <div style="width:8px;height:8px;border-radius:50%;background:var(--accent);animation:loadDot 1.2s .2s ease-in-out infinite"></div>
        <div style="width:8px;height:8px;border-radius:50%;background:var(--accent);animation:loadDot 1.2s .4s ease-in-out infinite"></div>
      </div>
    </div>
    <!-- 결과 -->
    <div id="report-content" style="display:none"></div>
  </div>
</div>

<!-- ══ 마이페이지 ══ -->
<div class="screen" id="screen-my">
  <div class="my-hero">
    <div style="position:relative;z-index:1">
      <div class="my-name" id="my-name"></div>
      <div class="my-sub">내 조건을 관리하고 전략을 세워봐요</div>
    </div>
    <div id="kakao-login-area" style="margin-left:auto;position:relative;z-index:1">
      <button class="login-btn" id="kakao-login-btn" onclick="kakaoLogin()">로그인하기</button>
    </div>
  </div>
  <div style="padding:20px 20px 0">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-size:15px;font-weight:800;color:var(--ink)">저장된 내 조건</div>
      <button id="edit-cond-btn" onclick="showScreen('editcond')" style="display:none;font-size:12px;font-weight:700;padding:6px 14px;background:var(--accent-light);color:var(--accent);border:none;border-radius:20px;cursor:pointer">수정</button>
    </div>
    <div class="my-cond-card" id="my-cond-card">
      <div style="font-size:13px;color:var(--ink-4)">아직 설정된 조건이 없어요.</div>
      <button onclick="openWizard()" style="margin-top:14px;width:100%;padding:11px;background:var(--accent-light);color:var(--accent);border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer">조건 설정하기</button>
    </div>
  </div>
  <div class="menu-item" onclick="showScreen('score')"><span class="menu-ico">🏆</span><span class="menu-txt">내 청약 가점 계산하기</span><span class="menu-arr">›</span></div>
  <div class="menu-item" onclick="showScreen('calendar')"><span class="menu-ico">📅</span><span class="menu-txt">청약 일정 캘린더</span><span class="menu-arr">›</span></div>
  <div class="menu-item" onclick="showScreen('glossary')"><span class="menu-ico">📖</span><span class="menu-txt">청약 용어 사전</span><span class="menu-arr">›</span></div>
  <div class="menu-item" onclick="showToast('곧 지원 예정이에요 🔔')"><span class="menu-ico">🔔</span><span class="menu-txt">알림 설정</span><span class="menu-arr">›</span></div>
  <div class="menu-item" onclick="openApiSetup()" style="display:none"><span class="menu-ico">🔌</span><span class="menu-txt">청약홈 API 연동</span><span id="api-menu-badge" class="api-menu-badge-off">미연동</span><span class="menu-arr">›</span></div>
  <div class="menu-section-label">고객센터</div>
  <div style="padding:20px 20px 8px;display:grid;grid-template-columns:1fr 1fr;row-gap:32px">
    <div class="sup-link" onclick="showSupport('notice')">공지사항</div>
    <div class="sup-link" onclick="showSupport('faq')">FAQ</div>
    <div class="sup-link" onclick="showSupport('contact')">서비스 문의하기</div>
    <div class="sup-link" onclick="showSupport('ad')">광고/제휴 문의</div>
    <div class="sup-link" onclick="showSupport('terms')">약관/정책</div>
  </div>
  <div style="height:160px"></div>
</div>

<!-- ══ 고객센터 공통 ══ -->
<div class="screen" id="screen-support">
  <div class="page-header">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="wiz-back" onclick="showScreen('my')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
      <div class="page-title" id="support-title">공지사항</div>
    </div>
  </div>
  <div id="support-body" style="padding:20px 20px 0"></div>
</div>

<!-- ══ 용어사전 ══ -->
<div class="screen" id="screen-glossary">
  <div class="page-header">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="wiz-back" onclick="showScreen('my')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
      <div class="page-title">청약 용어 사전</div>
    </div>
  </div>
  <div class="glo-search">
    <div class="glo-bar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="glo-inp" id="glo-inp" type="text" placeholder="용어를 검색하세요" oninput="filterGlossary()"/>
    </div>
  </div>
  <div id="glo-list" style="margin-top:12px"></div>
</div>

<!-- ══ 당첨률 바텀시트 ══ -->
<div class="nudge-ov" id="nudge-ov" onclick="closeNudge(event)">
  <div class="nudge-sheet">
    <div class="nudge-handle"></div>
    <div class="nudge-title">당첨률 분석하기</div>
    <div class="nudge-sub">내 조건(소득, 무주택 기간, 청약통장 등)을 입력하면<br>이 공고의 예상 당첨률을 바로 알려드려요.</div>
    <button class="nudge-btn" onclick="closeNudge();openWizard()">내 조건 입력하고 당첨 확률 분석하기</button>
    <div class="nudge-cancel" onclick="closeNudge()">나중에 할게요</div>
  </div>
</div>

<!-- ══ 조건 수정 화면 ══ -->
<div class="screen" id="screen-editcond">
  <div class="page-header">
    <div style="display:flex;align-items:center;gap:10px">
      <button class="wiz-back" onclick="showScreen('my')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
      <div class="page-title">내 조건 수정</div>
    </div>
  </div>
  <div id="editcond-body" style="padding:20px"></div>
  <div style="padding:0 20px 40px">
    <button onclick="saveEditCond()" style="width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.35)">저장하기</button>
  </div>
</div>

<!-- ══ 관리자 모달 ══ -->
<div id="admin-ov" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:800;align-items:flex-end;justify-content:center;max-width:430px;margin:0 auto">
  <div style="background:var(--bg-card);border-radius:20px 20px 0 0;width:100%;max-height:90vh;overflow-y:auto;padding-bottom:env(safe-area-inset-bottom)">
    <div style="width:40px;height:4px;background:var(--bg-2);border-radius:20px;margin:12px auto 0"></div>
    <div style="padding:20px 24px 12px;border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-size:18px;font-weight:900;color:var(--ink)">🔧 관리자 모드</div>
        <div style="font-size:12px;color:var(--ink-4);margin-top:3px">공고문 PDF를 업로드하면 자동으로 데이터를 추출해요</div>
      </div>
      <button onclick="closeAdmin()" style="background:var(--bg);border:none;cursor:pointer;width:32px;height:32px;border-radius:50%;font-size:18px;color:var(--ink-4)">×</button>
    </div>

    <!-- 업로드 영역 -->
    <div style="padding:20px 24px">
      <div id="admin-drop" onclick="document.getElementById('admin-file-input').click()"
        style="border:2px dashed var(--accent-mid);border-radius:16px;padding:32px 20px;text-align:center;cursor:pointer;background:var(--accent-light);transition:all .2s">
        <div style="font-size:36px;margin-bottom:10px">📄</div>
        <div style="font-size:15px;font-weight:700;color:var(--accent)">공고문 PDF 업로드</div>
        <div style="font-size:12px;color:var(--ink-4);margin-top:5px">탭해서 파일 선택</div>
      </div>
      <input type="file" id="admin-file-input" accept=".pdf" style="display:none" onchange="onAdminFileSelect(event)"/>

      <!-- 상태 표시 -->
      <div id="admin-status" style="display:none;margin-top:16px;padding:14px 16px;border-radius:12px;font-size:13px;font-weight:600;line-height:1.6"></div>

      <!-- 추출 결과 미리보기 -->
      <div id="admin-preview" style="display:none;margin-top:16px">
        <div style="font-size:14px;font-weight:800;color:var(--ink);margin-bottom:12px">📋 추출된 데이터 확인</div>
        <div id="admin-preview-body" style="background:var(--bg);border-radius:12px;padding:14px;font-size:13px;line-height:1.8;color:var(--ink-3)"></div>
        <div style="display:flex;gap:10px;margin-top:14px">
          <button onclick="confirmAdminData()" style="flex:1;padding:14px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">✓ 공고 추가하기</button>
          <button onclick="resetAdmin()" style="padding:14px 18px;background:var(--bg);color:var(--ink-4);border:1.5px solid rgba(0,0,0,.1);border-radius:12px;font-size:14px;font-weight:600;cursor:pointer">다시</button>
        </div>
      </div>

      <!-- 등록된 공고 목록 (서버 저장) -->
      <div style="margin-top:24px;border-top:1px solid rgba(0,0,0,.06);padding-top:16px">
        <div style="font-size:14px;font-weight:800;color:var(--ink);margin-bottom:10px">PDF 업로드 공고 <span id="admin-count" style="color:var(--accent)">0</span>건</div>
        <div id="admin-list" style="display:flex;flex-direction:column;gap:8px"></div>
      </div>

      <!-- 전체 공고 관리 -->
      <div style="margin-top:24px;border-top:1px solid rgba(0,0,0,.06);padding-top:16px">
        <div style="font-size:14px;font-weight:800;color:var(--ink);margin-bottom:4px">전체 공고 관리</div>
        <div style="font-size:11px;color:var(--ink-4);margin-bottom:10px">앱에 표시되는 모든 공고를 관리할 수 있어요</div>
        <div id="admin-all-list" style="display:flex;flex-direction:column;gap:6px"></div>
      </div>
    </div>
  </div>
</div>

<!-- 하단 네비 -->
<nav class="nav">
  <div class="nav-item active" onclick="showScreen('home')" id="nav-home">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span>홈</span>
  </div>
  <div class="nav-item" onclick="openMyCondition()" id="nav-search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span>내 청약</span>
  </div>
  <div class="nav-item consult" onclick="showScreen('consult')" id="nav-consult">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <span>컨설팅</span>
  </div>
  <div class="nav-item" onclick="showScreen('saved')" id="nav-saved">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    <span>즐겨찾기</span>
  </div>
  <div class="nav-item" onclick="showScreen('my')" id="nav-my">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    <span>더보기</span>
  </div>
</nav>
<div class="toast" id="toast"></div>

<script>
/* ══ 상수 ══ */
const RETRO = ['철수','영수','옥순','순자','복자','덕배','말순','갑돌','분이','점순','갑순','영자','창수','봉수','순희','말희','병철','정자','귀남','복순'];
const CHEER = [
  '오늘도 내 집 마련 파이팅!',
  '청약 고수가 되는 중이에요',
  '당첨까지 같이 달려봐요!',
  '오늘도 한 걸음 더 가까워졌어요.',
  '좋은 공고 같이 찾아봐요',
  '드림 홈을 향해 달려봐요',
];
const RGN = {seoul:'서울',gyeonggi:'경기',incheon:'인천',busan:'부산',daejeon:'대전',sejong:'세종',daegu:'대구',gwangju:'광주',ulsan:'울산',gangwon:'강원',chungnam:'충남',jeonnam:'전남','':`미설정`};
const NAVMAP = {home:'nav-home',consult:'nav-consult',saved:'nav-saved',my:'nav-my',mycond:'nav-search',detail:'nav-home'};

/* ══ 데이터 ══ */
const listings = [
  {id:1,name:'힐스테이트 광교',loc:'경기 수원시 영통구',type:'private',region:'gyeonggi',lotto:false,
   price:'4억 8천~7억 2천만원',minP:48000,mktP:72000,deadline:'2025-03-20',days:6,
   size:'84㎡ / 101㎡',units:320,comp:12,cut:48,
   qual:'무주택세대구성원, 청약통장 24회 이상',inc:'도시근로자 월평균소득 130% 이하',
   sched:'당첨자 발표: 2025.03.28 / 계약: 2025.04.05',
   aS:'2025-03-18',aE:'2025-03-20',aD:'2025-03-28',
   elig:['일반공급','생애최초'],
   ai:{q:'만 19세 이상 무주택세대구성원이면 신청 가능해요. 24회 이상 납입한 분만 1순위예요.',p:'전용 84㎡ 4억 8천, 101㎡ 7억 2천만원부터예요. 중도금 60% 무이자 대출 가능해요.',s:'3월 18~20일 접수, 28일 발표, 4월 5~7일 계약이에요.',d:'신분증, 청약통장 확인서, 무주택확인서, 가족관계증명서가 필요해요.'}},
  {id:2,name:'래미안 원베일리',loc:'서울 서초구 반포동',type:'private',region:'seoul',lotto:false,
   price:'15억~22억원',minP:150000,mktP:220000,deadline:'2025-03-25',days:11,
   size:'59㎡ / 84㎡ / 115㎡',units:180,comp:85,cut:68,
   qual:'서울 2년 이상 거주, 무주택',inc:'소득 제한 없음',
   sched:'당첨자 발표: 2025.04.01 / 계약: 2025.04.10',
   aS:'2025-03-23',aE:'2025-03-25',aD:'2025-04-01',
   elig:['일반공급'],
   ai:{q:'서울 2년 이상 거주 무주택자면 신청 가능해요.',p:'59㎡ 15억~115㎡ 22억이에요. 분양가 상한제 적용 단지예요.',s:'3월 23~25일 접수, 4월 1일 발표, 10~12일 계약이에요.',d:'주민등록등본(2년치), 청약통장 확인서, 무주택세대원 확인서가 필요해요.'}},
  {id:3,name:'검단신도시 공공분양 A3블록',loc:'인천 서구 검단신도시',type:'public',region:'incheon',lotto:false,
   price:'2억 1천~3억 4천만원',minP:21000,mktP:36000,deadline:'2025-03-16',days:2,
   size:'46㎡ / 59㎡ / 74㎡',units:520,comp:5,cut:32,
   qual:'무주택, 청약통장 6회 이상',inc:'도시근로자 월평균소득 100% 이하',
   sched:'당첨자 발표: 2025.03.25 / 계약: 2025.04.02',
   aS:'2025-03-14',aE:'2025-03-16',aD:'2025-03-25',
   elig:['생애최초','신생아특공','일반공급'],
   ai:{q:'공공분양이라 소득 기준이 있어요. 3인 기준 월 590만원 이하여야 해요.',p:'46㎡ 2억 1천만원부터예요. LH 주담대 최대 70% 가능해요.',s:'3월 14~16일 접수, 25일 발표. 마감 2일!',d:'소득확인서류, 청약통장 확인서, 가족관계증명서가 필요해요.'}},
  {id:4,name:'위례 자연앤자이',loc:'경기 하남시 학암동',type:'private',region:'gyeonggi',lotto:false,
   price:'5억 5천~8억원',minP:55000,mktP:75000,deadline:'2025-04-05',days:22,
   size:'74㎡ / 84㎡ / 102㎡',units:440,comp:18,cut:52,
   qual:'무주택 또는 1주택자(84㎡ 이하)',inc:'소득 제한 없음',
   sched:'당첨자 발표: 2025.04.12 / 계약: 2025.04.20',
   aS:'2025-04-03',aE:'2025-04-05',aD:'2025-04-12',
   elig:['일반공급','신생아특공','다자녀특공'],
   ai:{q:'84㎡ 이하는 1주택자도 신청 가능해요.',p:'74㎡ 5억 5천만원부터예요. 위례 시세 대비 약 27% 저렴해요.',s:'4월 3~5일 접수, 12일 발표, 20~22일 계약이에요.',d:'청약통장 확인서, 주민등록등본, 재직확인서가 필요해요.'}},
  {id:5,name:'세종 6-3생활권 공공분양',loc:'세종특별자치시 도담동',type:'public',region:'sejong',lotto:false,
   price:'1억 8천~2억 9천만원',minP:18000,mktP:32000,deadline:'2025-03-18',days:4,
   size:'46㎡ / 59㎡',units:680,comp:4,cut:28,
   qual:'세종 1년 이상 거주, 무주택',inc:'도시근로자 월평균소득 120% 이하',
   sched:'당첨자 발표: 2025.03.27 / 계약: 2025.04.04',
   aS:'2025-03-16',aE:'2025-03-18',aD:'2025-03-27',
   elig:['생애최초','신생아특공','일반공급'],
   ai:{q:'세종 1년 이상 거주 무주택자 우선이에요.',p:'46㎡ 1억 8천만원이에요. 세종 공공분양 최저 수준이에요.',s:'3월 16~18일 접수, 27일 발표. 마감 4일!',d:'세종 거주 주민등록등본(1년치), 소득확인서류, 청약통장 확인서가 필요해요.'}},
  {id:6,name:'마포 프레스티지자이',loc:'서울 마포구 아현동',type:'private',region:'seoul',lotto:false,
   price:'9억~14억원',minP:90000,mktP:130000,deadline:'2025-04-12',days:29,
   size:'59㎡ / 84㎡',units:260,comp:45,cut:60,
   qual:'서울 거주, 무주택',inc:'소득 제한 없음',
   sched:'당첨자 발표: 2025.04.19 / 계약: 2025.04.28',
   aS:'2025-04-10',aE:'2025-04-12',aD:'2025-04-19',
   elig:['일반공급','생애최초'],
   ai:{q:'투기과열지구라 5년 전매제한 있어요.',p:'59㎡ 9억원부터예요.',s:'4월 10~12일 접수, 19일 발표, 28~30일 계약이에요.',d:'청약통장 확인서, 무주택 확인서, 주민등록등본이 필요해요.'}},
  {id:7,name:'동탄2 롯데캐슬 무순위',loc:'경기 화성시 동탄2신도시',type:'lotto',region:'gyeonggi',lotto:true,
   price:'4억 2천만원',minP:42000,mktP:70000,deadline:'2025-03-17',days:3,
   size:'84㎡',units:12,comp:300,cut:0,
   qual:'만 19세 이상 누구나',inc:'소득 제한 없음',
   sched:'당첨자 발표: 2025.03.19 / 계약: 2025.03.22',
   aS:'2025-03-15',aE:'2025-03-17',aD:'2025-03-19',
   elig:['무순위(줍줍)'],
   ai:{q:'만 19세 이상 누구나! 무주택·청약통장 조건 없어요.',p:'분양가 4억 2천 고정. 시세 7억 대비 약 3억 저렴해요.',s:'3월 15~17일 신청, 19일 발표, 22~23일 계약이에요.',d:'신분증만 있으면 돼요.'}},
  {id:8,name:'고덕강일 공공분양 무순위',loc:'서울 강동구 강일동',type:'lotto',region:'seoul',lotto:true,
   price:'5억 8천만원',minP:58000,mktP:105000,deadline:'2025-03-22',days:8,
   size:'59㎡',units:5,comp:500,cut:0,
   qual:'서울 거주 만 19세 이상',inc:'소득 제한 없음',
   sched:'당첨자 발표: 2025.03.25 / 계약: 2025.03.28',
   aS:'2025-03-20',aE:'2025-03-22',aD:'2025-03-25',
   elig:['무순위(줍줍)'],
   ai:{q:'서울 거주 만 19세 이상이면 신청 가능.',p:'분양가 5억 8천. 시세 10억 이상으로 약 4억 시세차익 기대.',s:'3월 20~22일 신청, 25일 발표, 28~29일 계약.',d:'신분증, 서울 거주 주민등록등본이 필요해요.'}}
];


const GLOSSARY = [
  // 청약 자격
  {cat:'청약 자격',term:'무주택세대구성원',short:'집이 없는 세대의 구성원',full:'세대주와 세대원 전원이 주택을 소유하지 않은 경우예요. 분양권이나 입주권도 주택으로 간주해요. 과거 소유했다가 처분한 경우도 이력이 남아요.'},
  {cat:'청약 자격',term:'세대주',short:'세대를 대표하는 구성원',full:'주민등록상 세대를 이끄는 사람이에요. 일부 특별공급은 세대주만 신청 가능해요. 배우자 분리세대도 같은 세대로 보는 경우가 있어요.'},
  {cat:'청약 자격',term:'생애최초 특별공급',short:'처음으로 집을 사는 사람을 위한 전형',full:'세대원 전원이 한 번도 주택을 소유한 적 없는 경우 신청 가능해요. 혼인·출산 무관하게 신청 가능하고, 소득 기준(도시근로자 130% 이하)이 있어요.'},
  {cat:'청약 자격',term:'신혼부부 특별공급',short:'결혼 7년 이내 부부를 위한 전형',full:'혼인신고일 기준 7년 이내이거나, 예비 신혼부부(입주 전 혼인 예정)도 가능해요. 소득 기준은 외벌이 140%, 맞벌이 160% 이하예요.'},
  {cat:'청약 자격',term:'다자녀 특별공급',short:'자녀가 3명 이상인 가정을 위한 전형',full:'미성년 자녀(태아 포함)가 3명 이상인 무주택 세대주를 위한 특별공급이에요. 민영·공공 모두 적용되며 소득 기준 120% 이하예요.'},
  {cat:'청약 자격',term:'신생아 특별공급',short:'최근 2년 이내 출산 가정을 위한 전형',full:'2024년 신설. 입주자 모집공고일 기준 2년 이내 출생한 자녀(임신 포함)가 있는 무주택 가구가 신청할 수 있어요. 소득 기준은 일반 160%, 맞벌이 200% 이하예요.'},
  {cat:'청약 자격',term:'노부모 부양 특별공급',short:'만 65세 이상 부모를 부양하는 가구',full:'만 65세 이상 직계존속(배우자 직계존속 포함)을 3년 이상 부양한 무주택 세대주가 신청할 수 있어요. 공공분양에만 있어요.'},
  {cat:'청약 자격',term:'청년 특별공급',short:'만 19~39세 미혼 청년을 위한 전형',full:'공공분양에만 있어요. 만 19~39세 미혼 무주택자로 소득·자산 기준을 충족해야 해요. 청약통장 1년+12회 이상 납입이 필요해요.'},
  // 청약 순위
  {cat:'청약 순위',term:'1순위',short:'청약통장 납입 기준을 충족한 우선 신청자',full:'투기과열지구·청약과열지역은 가입 2년+24회 이상, 수도권은 1년+12회 이상, 그 외 지역은 6개월+6회 이상 납입 시 1순위예요.'},
  {cat:'청약 순위',term:'2순위',short:'1순위 조건 미충족 신청자',full:'1순위에 미달된 물량에 한해 신청할 수 있어요. 당첨 확률이 매우 낮아요.'},
  {cat:'청약 순위',term:'해당지역',short:'공고 지역 거주자 우선 배정',full:'청약 공고 지역에 일정 기간 이상 거주한 경우 우선 순위를 받아요. 투기과열지구는 2년, 일반지역은 1년이에요.'},
  {cat:'청약 순위',term:'기타지역',short:'해당지역 외 거주자',full:'해당지역 1순위에서 미달된 물량에 한해 기타지역 거주자가 신청할 수 있어요.'},
  // 가점제
  {cat:'가점제',term:'가점제',short:'점수가 높을수록 유리한 당첨 방식',full:'무주택 기간(최대 32점), 부양가족 수(최대 35점), 청약통장 가입 기간(최대 17점) 총 84점 만점이에요. 85㎡ 초과 민영주택은 100% 추첨제예요.'},
  {cat:'가점제',term:'추첨제',short:'점수 관계없이 무작위 추첨',full:'가점제 외 물량 또는 전용 85㎡ 초과 민영주택에 적용돼요. 가점이 낮아도 당첨 가능해서 청년층에게 유리해요.'},
  {cat:'가점제',term:'부양가족',short:'가점 계산에 포함되는 가족',full:'세대원으로 등재된 배우자, 직계존속(부모·조부모), 직계비속(자녀·손자녀)이 포함돼요. 세대 분리된 배우자도 부양가족으로 인정돼요.'},
  {cat:'가점제',term:'무주택 기간',short:'주택을 소유하지 않은 기간',full:'만 30세 또는 혼인 시점부터 산정해요. 과거 주택을 처분한 경우 처분일부터 다시 계산해요. 최대 15년(32점)까지 인정돼요.'},
  {cat:'가점제',term:'청약통장 기간',short:'청약통장 가입 후 경과 기간',full:'가입일부터 입주자 모집공고일까지의 기간이에요. 최대 15년(17점)이에요. 명의변경은 불가하고 해지 후 재가입 시 기간이 초기화돼요.'},
  // 분양가·자금
  {cat:'분양가·자금',term:'분양가 상한제',short:'분양가에 상한선을 두는 제도',full:'적용 지역은 시세보다 저렴하게 분양되는 대신, 최대 10년 전매제한이 붙어요. 투기과열지구 내 공공택지 등에 적용돼요.'},
  {cat:'분양가·자금',term:'계약금',short:'분양 계약 시 최초 납부 금액',full:'통상 분양가의 10%예요. 계약 당일 납부해야 하며 대출이 안 돼요. 현금 보유 여부가 중요해요.'},
  {cat:'분양가·자금',term:'중도금',short:'계약 후 입주 전까지 나눠 내는 금액',full:'분양가의 60%를 보통 6회 나눠 납부해요. 9억 이하 단지는 무이자 집단 대출이 가능해요.'},
  {cat:'분양가·자금',term:'잔금',short:'입주 시 최종 납부 금액',full:'분양가의 30%로 입주 직전에 납부해요. 주택담보대출로 처리하는 경우가 많아요.'},
  {cat:'분양가·자금',term:'LTV',short:'집값 대비 대출 한도 비율',full:'Loan To Value의 약자예요. 9억 이하는 최대 70%, 투기과열지구 내 15억 초과는 대출이 금지돼요.'},
  {cat:'분양가·자금',term:'DTI',short:'소득 대비 연간 대출 상환액 비율',full:'Debt To Income의 약자예요. 연소득 중 대출 원리금 상환액이 차지하는 비율로, 규제지역에서는 40~50% 이하예요.'},
  {cat:'분양가·자금',term:'DSR',short:'모든 대출 원리금 합산 상환비율',full:'총부채원리금상환비율로, 주택담보대출뿐 아니라 신용대출·자동차할부 등 모든 대출을 합산해요. 대출 1억 초과 시 40% 규제가 적용돼요.'},
  {cat:'분양가·자금',term:'중도금 대출',short:'아파트 완공 전 납부하는 집단 대출',full:'분양가의 60%를 건설사가 은행과 협약해 일괄 대출해주는 제도예요. 분양가 9억 초과 단지는 이용 불가예요.'},
  // 청약통장
  {cat:'청약통장',term:'주택청약종합저축',short:'현재 유일하게 판매 중인 청약통장',full:'2009년 이후 출시된 통장으로 공공·민영 모든 주택에 청약 가능해요. 매월 2~50만원을 납입할 수 있어요.'},
  {cat:'청약통장',term:'청약예금',short:'민영주택 전용 구 청약통장',full:'현재는 신규 가입이 불가하고 기존 가입자만 유지해요. 지역별·면적별 예치금 기준이 있어요.'},
  {cat:'청약통장',term:'납입 인정 횟수',short:'가점 및 1순위 계산에 반영되는 납입 횟수',full:'매월 1회, 월 2만원 이상 납입해야 1회로 인정돼요. 선납은 인정되지 않고 월 1회만 인정돼요.'},
  // 지역·규제
  {cat:'지역·규제',term:'투기과열지구',short:'청약·대출·전매가 가장 엄격한 지역',full:'서울 전역이 대표적이에요. 1순위 자격이 강화되고 가점제 비율이 높아지며 전매제한 기간이 최대 10년이에요.'},
  {cat:'지역·규제',term:'조정대상지역',short:'투기과열지구보다 규제 수위가 낮은 지역',full:'다주택자 양도세 중과, LTV·DTI 강화 등이 적용돼요. 지정·해제가 자주 바뀌므로 공고 확인이 필요해요.'},
  {cat:'지역·규제',term:'비규제지역',short:'청약·대출 규제가 적은 지역',full:'지방 소도시 등이 해당해요. 1순위 기준이 완화되고 추첨제 물량이 많아 가점이 낮아도 당첨 가능성이 높아요.'},
  {cat:'지역·규제',term:'전매제한',short:'당첨 후 일정 기간 집을 팔 수 없는 규제',full:'투기과열지구 분양가 상한제 적용 단지는 최대 10년이에요. 전매제한 기간 중 팔면 환수 조치를 받아요.'},
  {cat:'지역·규제',term:'실거주의무',short:'당첨 후 일정 기간 직접 거주해야 하는 의무',full:'분양가 상한제 적용 단지에서 2~5년 실거주 의무가 부여될 수 있어요. 위반 시 주택 환수 대상이 돼요.'},
  // 청약 절차
  {cat:'청약 절차',term:'입주자 모집공고',short:'청약 접수 전 공식 안내문',full:'분양 일정, 자격 조건, 공급 세대수, 분양가 등이 담긴 공식 문서예요. 청약홈에서 확인할 수 있어요.'},
  {cat:'청약 절차',term:'특별공급',short:'일반공급 전 특정 계층에 우선 배정하는 전형',full:'신생아·신혼부부·생애최초·다자녀·노부모 등이 있어요. 전체 물량의 최대 75%까지 특별공급으로 배정될 수 있어요.'},
  {cat:'청약 절차',term:'일반공급',short:'특별공급 이후 남은 물량을 대상으로 한 청약',full:'1·2순위로 나뉘며 가점제 또는 추첨제로 당첨자를 선정해요. 특별공급 미달분이 일반공급으로 넘어오기도 해요.'},
  {cat:'청약 절차',term:'당첨자 발표',short:'청약 접수 후 당첨 여부를 공개하는 날',full:'청약홈 또는 해당 건설사 홈페이지에서 확인할 수 있어요. 발표 당일 확인 후 서류 제출 준비를 바로 시작해야 해요.'},
  {cat:'청약 절차',term:'예비당첨자',short:'당첨자 계약 포기 시 순번대로 계약 기회를 받는 대기자',full:'통상 당첨 세대수의 40~500%를 선정해요. 예비 순번이 빠를수록 계약 기회가 높아요.'},
  {cat:'청약 절차',term:'청약 부적격',short:'자격 미달로 당첨이 취소되는 경우',full:'허위 서류 제출, 중복 청약, 자격 미달 등이 원인이에요. 부적격 처리 시 1년간 청약이 제한돼요.'},
  {cat:'청약 절차',term:'무순위 청약 (줍줍)',short:'통장 없이 누구나 신청 가능한 잔여 물량',full:'미계약·미분양으로 남은 물량 재분양이에요. 만 19세 이상이면 청약통장 없이 누구나 신청 가능해요.'},
];

/* ══ 상태 ══ */
let P = {name:'',byear:'',bmonth:'',bday:'',income:'',cash:'',noHomeYears:'',depCount:'',depAmt:'',children:0,childDates:[],marriage:'미혼',marriageYear:'',household:'',isNoHome:true,region:'',dependents:0,accYears:'',prefSizes:[],elderParent:false};
let savedIds = new Set();
let alarmIds  = new Set(); // 알림 설정된 공고 ID
let curFilter = 'all';
let selectedRegions = new Set(); // 선택된 지역 Set
let selectedSizes = new Set(); // 선택된 관심 평형 Set
let srchQ = '';
let prevScreen = 'home';
const scrollPositions = {};
let wizStep = 1;
let wDep = 0;
let condOpen = false;
let calYear = 2025, calMonth = 2;

/* ══ 위저드 ══ */
function openWizard(){
  wizStep=1;
  document.getElementById('wizard').classList.add('open');
  // 기존값 채우기
  if(P.byear) document.getElementById('w-by').value=P.byear;
  if(P.bmonth) document.getElementById('w-bm').value=P.bmonth;
  if(P.bday) document.getElementById('w-bd').value=P.bday;
  if(P.income) document.getElementById('w-income').value=P.income;
  if(P.cash) document.getElementById('w-cash').value=P.cash;
  if(P.noHomeYears) document.getElementById('w-nohome').value=P.noHomeYears;
  if(P.depCount) document.getElementById('w-dc').value=P.depCount;
  if(P.accYears) document.getElementById('w-accYears').value=P.accYears;
  if(P.depAmt) document.getElementById('w-da').value=P.depAmt;
  if(P.household) document.getElementById('w-household').value=P.household;
  if(P.marriageYear) document.getElementById('w-marriageYear').value=P.marriageYear;
  // 기혼이면 혼인신고 연도 + 맞벌이 필드 표시
  const isMarried = P.marriage==='기혼';
  const myf=document.getElementById('marriage-year-field');
  if(myf) myf.style.display=isMarried?'block':'none';
  const dif=document.getElementById('dual-income-field');
  if(dif) dif.style.display=isMarried?'block':'none';
  // 세대원 2인 이상이면 노부모 부양 필드 표시
  const hh=parseInt(P.household)||0;
  const epf=document.getElementById('elder-parent-field');
  if(epf) epf.style.display=(hh>=2)?'block':'none';
  if(P.elderParent){
    const epGrp=epf?.querySelectorAll('.wiz-radio');
    if(epGrp){epGrp.forEach(r=>r.classList.remove('on'));epGrp[1]?.classList.add('on');}
  }
  wDep = parseInt(P.dependents)||0;
  document.getElementById('sv-dep').textContent=wDep+'명';
  document.getElementById('sv-children').textContent=P.children+'명';
  renderChildDates();
  onBirthChange();
  setTimeout(_updateWizRegionUI, 50);
  setTimeout(_updateWizSizeUI, 50);
  showWizStep(1);
}

const WIZ_LABELS = ['기본 정보','주거 상태','소득·자산','청약통장'];
function showWizStep(n){
  for(let i=1;i<=4;i++) document.getElementById('ws'+i).style.display=i===n?'block':'none';
  document.getElementById('wiz-step-txt').textContent=`${n} / 4단계 · ${WIZ_LABELS[n-1]}`;
  document.getElementById('wiz-fill').style.width=(n/4*100)+'%';
  document.getElementById('wiz-btn').textContent=n===4?'완료':'다음';
}

function wizNext(){
  if(wizStep<4){wizStep++;showWizStep(wizStep);if(wizStep===2)onBirthChange();}
  else saveWizard();
}

function wizBack(){
  if(wizStep>1){wizStep--;showWizStep(wizStep);}
  else document.getElementById('wizard').classList.remove('open');
}

function wRadio(el,group){
  el.closest('.wiz-radio-grp').querySelectorAll('.wiz-radio').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  if(group==='homeowner') P.isNoHome=el.textContent==='무주택자';
  if(group==='marriage'){
    P.marriage=el.textContent;
    const isMarried = el.textContent==='기혼';
    // 기혼이면 혼인신고 연도 + 맞벌이 여부 표시
    const myField=document.getElementById('marriage-year-field');
    if(myField) myField.style.display=isMarried?'block':'none';
    const dualField=document.getElementById('dual-income-field');
    if(dualField) dualField.style.display=isMarried?'block':'none';
    if(!isMarried){ P.isDual=false; P.marriageYear=''; onIncomeChange(); }
  }
  if(group==='elderParent'){
    P.elderParent=el.textContent.startsWith('예');
  }
  if(group==='dualincome'){
    P.isDual=(el.textContent==='맞벌이');
    // 맞벌이면 배우자 소득 필드 표시
    const sf=document.getElementById('spouse-income-field');
    if(sf) sf.style.display=P.isDual?'block':'none';
    // 소득 라벨 업데이트
    const lbl=document.getElementById('income-who-label');
    if(lbl) lbl.textContent=P.isDual?'본인':'본인';
    onIncomeChange();
  }
}

/* ══ 2025년 도시근로자 월평균소득 기준 (100%, 월 단위, 만원) ══
   출처: 통계청 2024년 데이터 기준 (2025.2.27 공고~2026.2 적용)
   3인 이하: 720.5만 / 4인: 857.8만 / 5인: 903.1만
   6인: 973.3만 / 7인: 1043.5만 / 8인: 1113.7만
══ */
const URBAN_INCOME_100 = {
  1: 370,   // 1인
  2: 541,   // 2인 (2023 기준, 별도 고시)
  3: 721,   // 3인 이하
  4: 858,   // 4인
  5: 903,   // 5인
  6: 973,   // 6인
  7: 1044,  // 7인
  8: 1114,  // 8인
};

function getUrbanIncome(household){
  const h = parseInt(household)||3;
  return URBAN_INCOME_100[Math.min(h,8)] || URBAN_INCOME_100[3];
}

/* 신생아 가산: 2023.3.28 이후 출생 자녀
   1명: +10%p / 2명 이상: +20%p */
function getNewbornBonus(){
  if(!P.childDates||!P.childDates.length) return 0;
  const cutoff = new Date('2023-03-28');
  const qualCount = P.childDates.filter(c=>{
    if(!c.year||!c.month) return false;
    return new Date(`${c.year}-${String(c.month).padStart(2,'0')}-01`) >= cutoff;
  }).length;
  return qualCount>=2?20:qualCount===1?10:0;
}

function onHouseholdChange(){
  const h=document.getElementById('w-household').value;
  const ef=document.getElementById('elder-parent-field');
  if(ef) ef.style.display=(parseInt(h)>=2)?'block':'none';
  if(parseInt(h)<2) P.elderParent=false;
  onIncomeChange();
}

/* 소득 입력 시 실시간 % 계산 */
function onIncomeChange(){
  const income = parseInt(document.getElementById('w-income').value)||0;
  const household = document.getElementById('w-household').value;
  const base = getUrbanIncome(household); // 월 100% 기준 (만원)
  const annualBase = base * 12;
  const newbornBonus = getNewbornBonus();

  if(!income || !household){
    document.getElementById('income-pct-box').style.display='none';
    if(document.getElementById('spouse-pct-box'))
      document.getElementById('spouse-pct-box').style.display='none';
    return;
  }

  const pct = Math.round(income/annualBase*100);
  const box = document.getElementById('income-pct-box');
  const main = document.getElementById('income-pct-main');
  const detail = document.getElementById('income-pct-detail');

  // 전형별 소득 기준 판단
  const isDual = P.isDual || false;
  const limits = {
    '일반공급(60㎡이하)': isDual?200:100,
    '생애최초특공': 130,
    '신생아특공': 160,
    '신혼부부특공': isDual?160:140,
    '다자녀특공': 120,
    '노부모부양': 120,
  };

  // 신생아 가산 적용 기준
  const newbornApplied = newbornBonus > 0 && !isDual;
  const effectiveLimitNote = newbornApplied ? ` (+${newbornBonus}%p 신생아 가산 적용)` : '';

  const passItems=[], failItems=[];
  Object.entries(limits).forEach(([name,lim])=>{
    const effectiveLim = (name.includes('생애최초')||name.includes('신혼')||name.includes('신생아'))&&newbornApplied ? lim+newbornBonus : lim;
    if(pct<=effectiveLim) passItems.push(`${name} ${effectiveLim}% ✓`);
    else failItems.push(`${name} ${effectiveLim}% ✗`);
  });

  const color = pct<=100?'#059669':pct<=140?'var(--accent)':'var(--gold)';
  main.innerHTML=`<span style="color:${color}">월평균소득의 ${pct}%</span> <span style="font-size:12px;font-weight:400;color:var(--ink-4)">(기준소득 월 ${base.toLocaleString()}만원)</span>`;
  detail.innerHTML=`✓ 가능: ${passItems.join(', ')||'없음'}${effectiveLimitNote?'<br>'+effectiveLimitNote:''}`;
  // 맞벌이면 본인 소득 기준 박스는 숨김, 부부 합산만 표시
  if(!P.isDual) box.style.display='block';

  // 맞벌이 합산 계산
  if(isDual){
    const spouseIncome = parseInt(document.getElementById('w-spouse-income')?.value)||0;
    if(spouseIncome){
      const totalIncome = income + spouseIncome;
      const totalPct = Math.round(totalIncome/annualBase*100);
      const spouseBox = document.getElementById('spouse-pct-box');
      const spouseColor = totalPct<=140?'#059669':totalPct<=160?'var(--accent)':'var(--gold)';
      document.getElementById('spouse-pct-main').innerHTML=`<span style="color:${spouseColor}">부부 합산 월평균소득의 ${totalPct}%</span>`;
      document.getElementById('spouse-pct-detail').textContent=`합산 연소득 ${totalIncome.toLocaleString()}만원 · 신혼부부특공 기준 160% ${totalPct<=160?'✓ 충족':'✗ 초과'}`;
      spouseBox.style.display='block';
    }
  }
}

function wStep(key,dir){
  if(key==='children'){
    P.children=Math.max(0,P.children+dir);
    document.getElementById('sv-children').textContent=P.children+'명';
    renderChildDates();
  }
  if(key==='dep'){
    wDep=Math.max(0,wDep+dir);
    document.getElementById('sv-dep').textContent=wDep+'명';
  }
}

function renderChildDates(){
  const wrap=document.getElementById('child-dates-wrap');
  if(P.children===0){wrap.innerHTML='';return;}
  // 기존 날짜 데이터 유지하며 배열 크기 맞추기
  while(P.childDates.length<P.children) P.childDates.push({year:'',month:'',day:''});
  P.childDates = P.childDates.slice(0,P.children);

  wrap.innerHTML=`<div class="child-dates"><div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:12px">자녀 출생년월일 <span style="font-weight:400;color:var(--ink-4)">(신생아특공 자격 확인용)</span></div>
  ${P.childDates.map((c,i)=>`<div class="child-date-item">
    <div class="child-date-label">${i+1}번째 자녀</div>
    <div class="wiz-inp-row">
      <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" placeholder="2022" id="cy${i}" value="${c.year}" oninput="updateChild(${i},'year',this.value);if(this.value.length>=4)document.getElementById('cm${i}').focus();"/></div>
      <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" placeholder="01" min="1" max="12" id="cm${i}" value="${c.month}" oninput="updateChild(${i},'month',this.value);if(this.value.length>=2)document.getElementById('cd${i}').focus();"/></div>
      <div class="wiz-inp-wrap"><input type="number" class="wiz-inp" placeholder="01" min="1" max="31" id="cd${i}" value="${c.day}" oninput="updateChild(${i},'day',this.value)"/></div>
    </div>
    <div id="newborn-chip-${i}"></div>
  </div>`).join('')}</div>`;

  P.childDates.forEach((_,i)=>checkNewborn(i));
}

function updateChild(i,key,val){
  P.childDates[i][key]=val;
  checkNewborn(i);
}

function checkNewborn(i){
  const c=P.childDates[i];
  const el=document.getElementById('newborn-chip-'+i);
  if(!el)return;
  if(c.year&&c.month){
    const birth=new Date(parseInt(c.year),parseInt(c.month)-1,parseInt(c.day||1));
    const now=new Date();
    const diffMs=now-birth;
    const diffDays=diffMs/(1000*60*60*24);
    if(diffDays>=0&&diffDays<=730){
      el.innerHTML='<div class="newborn-chip">✓ 신생아특공 해당 가능 (만 2세 이하)</div>';
    } else if(diffDays>730){
      el.innerHTML='<div style="font-size:11px;color:var(--ink-4);margin-top:4px">만 2세 초과 — 신생아특공 미해당</div>';
    } else el.innerHTML='';
  } else el.innerHTML='';
}

function onBirthChange(){
  const yr=parseInt(document.getElementById('w-by').value);
  if(!yr||yr<1900||yr>2010)return;
  // 무주택기간 힌트: 만 30세 되는 날부터
  const age30year=yr+30;
  const bmonth=parseInt(document.getElementById('w-bm').value)||1;
  const hint30=`${age30year}년 ${String(bmonth).padStart(2,'0')}월부터 무주택 기간이에요`;
  const hintEl=document.getElementById('nohome-auto-hint');
  if(hintEl){hintEl.textContent='📅 '+hint30;hintEl.style.display='block';}
  // 나이 자동 계산 (참고용)
  const now=new Date();
  const age=now.getFullYear()-yr;
  P.byear=String(yr);
}

function saveWizard(){
  P.byear   = document.getElementById('w-by').value;
  P.bmonth  = document.getElementById('w-bm').value;
  P.bday    = document.getElementById('w-bd').value;
  P.income  = document.getElementById('w-income').value;
  P.isDual  = P.isDual || false;
  P.spouseIncome = P.isDual ? (document.getElementById('w-spouse-income')?.value||'') : '';
  P.totalIncome = P.isDual
    ? (parseInt(P.income||0) + parseInt(P.spouseIncome||0)) + ''
    : P.income;
  P.cash    = document.getElementById('w-cash').value;
  P.noHomeYears = document.getElementById('w-nohome').value;
  P.depCount= document.getElementById('w-dc').value;
  P.accYears= document.getElementById('w-accYears').value;
  P.depAmt  = document.getElementById('w-da').value;
  P.region  = [...selectedRegions][0] || '';
  P.prefSizes = [...selectedSizes];
  P.household=document.getElementById('w-household').value;
  P.marriageYear=document.getElementById('w-marriageYear')?.value||'';
  P.dependents=wDep;
  if(!P.name) P.name=RETRO[Math.floor(Math.random()*RETRO.length)];
  sbSaveCondition();

  // 완료 화면 표시
  const types = calcTypes(P);
  const regionLabel = RGN[P.region] || '';
  document.getElementById('wiz-done-sub').textContent =
    `${P.name}님은 ${regionLabel?regionLabel+' 지역 ':''} 아래 전형에 신청 가능해요.`;
  document.getElementById('wiz-done-types').innerHTML = types.length
    ? types.map(t=>`<div class="wiz-done-type">${t.l}${t.sub?` <span style="font-size:11px;font-weight:400;opacity:.7">(${t.sub})</span>`:''}</div>`).join('')
    : '<div class="wiz-done-type" style="background:var(--bg-2);color:var(--ink-4);border-color:var(--bg-2)">조건 추가 입력 시 전형 확인 가능</div>';

  // 스텝 영역 숨기고 완료 화면 표시
  for(let i=1;i<=4;i++) document.getElementById('ws'+i).style.display='none';
  document.getElementById('wiz-foot').style.display='none';
  document.getElementById('wiz-done').classList.add('show');
  // 파티클 효과
  const doneEl = document.getElementById('wiz-done');
  const colors=['#00C9A0','#FFE600','#FF4D6D','#0066FF','#F5A623'];
  for(let i=0;i<12;i++){
    const p=document.createElement('div');
    p.className='confetti-piece';
    p.style.cssText=`background:${colors[i%5]};left:${20+Math.random()*60}%;top:40%;animation-delay:${Math.random()*0.3}s;animation-duration:${0.8+Math.random()*0.6}s;position:absolute;`;
    doneEl.appendChild(p);
    setTimeout(()=>p.remove(), 1500);
  }
  document.getElementById('wiz-prog-wrap').style.display='none';
}

function finishWizard(){
  document.getElementById('wizard').classList.remove('open');
  document.getElementById('wiz-done').classList.remove('show');
  document.getElementById('wiz-foot').style.display='';
  document.getElementById('wiz-prog-wrap').style.display='';
  updateHero(); renderListings(); updateConsult(); updateMyCondCard(); updateScoreScreen();
  // 내게 맞는 공고 섹션으로 스크롤
  showScreen('home');
  setTimeout(()=>{
    const el=document.getElementById('rec-section-row');
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }, 300);
}

/* ══ 조건 드롭다운 ══ */
function toggleCond(){
  // 조건이 없으면 드롭다운 대신 위저드로 이동
  const hasConditions = P.noHomeYears||P.depCount||P.income||P.byear;
  if(!hasConditions){ openWizard(); return; }
  condOpen=!condOpen;
  document.getElementById('cond-detail').classList.toggle('open',condOpen);
  document.getElementById('cond-chev').classList.toggle('open',condOpen);
}

/* ══ 유틸 ══ */
/* ★★★ [하드코딩 — 수정 금지] 시세차익 분석: 최고 분양가(maxP) 기준 ★★★ */
function getMaxP(l){
  // price 문자열에서 모든 가격을 파싱하여 최대값 반환 (항상 만원 단위)
  if(l._maxP) return l._maxP;

  // price 문자열 우선 파싱 (가장 신뢰할 수 있는 값)
  const priceStr = l.price || '';
  let maxVal = 0;
  if(priceStr && priceStr !== '공고 확인 필요'){
    const parts = priceStr.split('|');
    parts.forEach(part => {
      const rangeParts = part.split('~');
      rangeParts.forEach(rp => {
        const val = priceToNum(rp);
        if(val > maxVal) maxVal = val;
      });
    });
  }

  // price 파싱 실패 시에만 minP 폴백 (원/억/만원 단위 자동 변환)
  if(maxVal <= 0 && l.minP){
    const n = parseFloat(String(l.minP).replace(/,/g,'')) || 0;
    if(n >= 100000000) maxVal = Math.round(n / 10000); // 원 → 만원
    else if(n < 1000 && n >= 1) maxVal = Math.round(n * 10000); // 억 → 만원
    else maxVal = n; // 만원 그대로
  }

  l._maxP = maxVal;
  return maxVal;
}
function gap(l){const saleP=getMaxP(l);const g=l.mktP-saleP;return{g,pct:l.mktP?Math.round(g/l.mktP*100):0,saleP};}
function fmtManwon(v){
  // 만원 단위 → "X억 Y천" 형식
  const uk=Math.floor(v/10000);const rem=v%10000;const chun=Math.floor(rem/1000);
  if(uk>0&&chun>0)return`${uk}억 ${chun}천`;
  if(uk>0)return`${uk}억`;
  if(chun>0)return`${chun}천만`;
  return`${v}만`;
}
function isLottoListing(l){ return l.lotto || (l.mktP > 0 && !l.noMktP && gap(l).g >= 20000); } // 로또청약 기준: 시세차익 2억 이상
/* ★★★ [하드코딩 끝] ★★★ */
function calcTypes(p){
  if(!p.name&&!p.byear)return[];
  // 맞벌이면 합산소득, 아니면 본인소득
  const inc=parseInt(p.isDual?(p.totalIncome||p.income||0):(p.income||0));
  const nh=parseInt(p.noHomeYears||0);
  const yr=parseInt(p.byear||0);
  const age=yr?new Date().getFullYear()-yr:0;
  const ch=parseInt(p.children||0);

  // 신생아 가산 (+10%p or +20%p, 맞벌이 미적용)
  const cutoff=new Date('2023-03-28');
  const nbCount=(p.childDates||[]).filter(c=>{
    if(!c.year||!c.month)return false;
    return new Date(`${c.year}-${String(c.month).padStart(2,'0')}-01`)>=cutoff;
  }).length;
  const nbBonus=(!p.isDual&&nbCount>=2)?20:(!p.isDual&&nbCount===1)?10:0;

// 도시근로자 100% 기준 (연간 만원)
  const h=parseInt(p.household||3);
  const base100=(URBAN_INCOME_100[Math.min(h,8)]||721)*12;
  const incPct=inc>0?Math.round(inc/base100*100):0;

  const t=[];
  const isDual=!!p.isDual;

  // 생애최초: 우선(100%이하) / 잔여(~130%) + 신생아가산
  if(p.isNoHome&&nh>=1){
    if(incPct===0||incPct<=(100+nbBonus)) t.push({l:'생애최초',c:'fp',sub:'우선공급',subNote:`소득 ${100+nbBonus}% 이하`});
    else if(incPct<=(130+nbBonus)) t.push({l:'생애최초',c:'fp',sub:'잔여공급',subNote:`소득 ${130+nbBonus}% 이하`});
  }

  const hasNewborn=(p.childDates||[]).some(c=>{
    if(!c.year||!c.month)return false;
    const birth=new Date(parseInt(c.year),parseInt(c.month)-1,1);
    return (new Date()-birth)/(86400000)<=730;
  });

  // 신생아특공: 우선(외벌이100%/맞벌이150%) / 잔여(~외벌이150%/맞벌이200%) + 신생아가산
  if(hasNewborn&&p.isNoHome){
    const prLim=isDual?150:100; const remLim=isDual?200:150;
    if(incPct===0||incPct<=(prLim+nbBonus)) t.push({l:'신생아특공',c:'nb',sub:'우선공급',subNote:`소득 ${prLim+nbBonus}% 이하`});
    else if(incPct<=(remLim+nbBonus)) t.push({l:'신생아특공',c:'nb',sub:'잔여공급',subNote:`소득 ${remLim+nbBonus}% 이하`});
  }

  if(ch>=3)t.push({l:'다자녀특공',c:'mc'});

  // 신혼부부특공: 우선(외벌이100%/맞벌이120%) / 잔여(~외벌이140%/맞벌이160%) + 신생아가산
  if(p.marriage==='기혼'&&p.isNoHome&&p.marriageYear){
    const mYr=parseInt(p.marriageYear);
    if(mYr&&(new Date().getFullYear()-mYr)<=7){
      const prLim=isDual?120:100; const remLim=isDual?160:140;
      if(incPct===0||incPct<=(prLim+nbBonus)) t.push({l:'신혼부부특공',c:'nw',sub:'우선공급',subNote:`소득 ${prLim+nbBonus}% 이하`});
      else if(incPct<=(remLim+nbBonus)) t.push({l:'신혼부부특공',c:'nw',sub:'잔여공급',subNote:`소득 ${remLim+nbBonus}% 이하`});
    }
  }

  if(age>0&&age<=39&&p.marriage==='미혼'&&p.isNoHome)t.push({l:'청년특공',c:'yt'});
  // 노부모부양: 무주택 + 만65세이상 부모 3년 이상 부양
  if(p.elderParent&&p.isNoHome)t.push({l:'노부모부양',c:'ep'});
  if(p.isNoHome)t.push({l:'일반공급',c:'gn'});
  return t;
}

/* ★★★ [하드코딩 — 수정 금지] 전형별 상세 자격 진단 ★★★
   PDF에서 추출한 eligDetail과 사용자 조건(P)을 비교하여
   전형별 신청 가능 여부 + 상세 사유를 반환
   반환: [{ type, eligible, reasons:[], warnings:[], desc }]
*/
function calcEligDetail(l, p){
  const results = [];
  const eligList = (l.elig || []).filter(e => !e.includes('기관추천'));
  const details = l.eligDetail || [];
  const inc = parseInt(p.isDual ? (p.totalIncome||p.income||0) : (p.income||0));
  const nh = parseInt(p.noHomeYears||0);
  const yr = parseInt(p.byear||0);
  const age = yr ? new Date().getFullYear() - yr : 0;
  const ch = parseInt(p.children||0);
  const accYr = parseInt(p.accYears||0);
  const depCnt = parseInt(p.depCount||0);
  const h = parseInt(p.household||3);
  const base100 = (URBAN_INCOME_100[Math.min(h,8)]||721) * 12;
  const incPct = inc > 0 ? Math.round(inc/base100*100) : 0;
  const hasNewborn = (p.childDates||[]).some(c => {
    if(!c.year||!c.month) return false;
    const birth = new Date(parseInt(c.year), parseInt(c.month)-1, 1);
    return (new Date()-birth)/(86400000) <= 730;
  });
  // 신생아 가산 계산 (calcTypes와 동일 로직)
  const cutoffElig = new Date('2023-03-28');
  const nbCountElig = (p.childDates||[]).filter(c=>{
    if(!c.year||!c.month) return false;
    return new Date(`${c.year}-${String(c.month).padStart(2,'0')}-01`) >= cutoffElig;
  }).length;
  const nbBonusElig = (!p.isDual && nbCountElig >= 2) ? 20 : (!p.isDual && nbCountElig === 1) ? 10 : 0;
  const myTypes = calcTypes(p).map(t => t.l);

  // 기본 전형 조건 테이블 (PDF에 eligDetail이 없을 때 fallback)
  const defaultRules = {
    '생애최초':    { noHome:true, incPct:130, married:'any', note:'세대원 전원 무주택, 5년 이상 소득세 납부 이력' },
    '신생아특공':  { noHome:true, newborn:true, incPct:160, note:'입주자모집공고일 기준 만 2세 이하 자녀' },
    '다자녀특공':  { noHome:true, children:3, note:'미성년 자녀 3명 이상' },
    '청년특공':    { noHome:true, ageMax:39, married:'excluded', note:'만 19~39세 미혼 무주택자' },
    '신혼부부특공':{ noHome:true, married:'required', incPct:140, note:'혼인 7년 이내, 6세 이하 자녀' },
    '노부모부양':  { noHome:true, noHomeYears:3, elderParent:true, note:'만 65세 이상 직계존속 3년 이상 부양' },
    '일반공급':    { noHome:true, accMonths:24, note:'무주택 세대구성원, 청약통장 가입' },
    '무순위(줍줍)':{ noHome:false, note:'만 19세 이상 누구나 신청 가능' },
  };

  // PDF에서 추출한 단계별 소득구분 (eligTiers)
  const tiers = l.eligTiers || [];

  eligList.forEach(typeName => {
    // 이 전형에 대한 단계별 tiers 가 있는지 확인
    const typeTiers = tiers.filter(t => t.parent === typeName);

    // PDF에서 추출한 상세 조건 또는 기본 조건 사용
    const pdfRule = details.find(d => d.type === typeName) || {};
    const defRule = defaultRules[typeName] || {};
    const rule = { ...defRule, ...Object.fromEntries(Object.entries(pdfRule).filter(([k,v]) => v && v !== 0 && v !== '0' && v !== 'any' && v !== false)) };

    const reasons = []; // 충족 사유
    const fails = [];   // 미충족 사유
    let eligible = true;

    // 무주택 체크
    if(rule.noHome){
      if(p.isNoHome){ reasons.push('무주택 ✓'); }
      else { eligible = false; fails.push('무주택이어야 해요'); }
    }

    // 무주택 기간
    const reqNH = parseInt(rule.noHomeYears) || 0;
    if(reqNH > 0){
      if(nh >= reqNH){ reasons.push(`무주택 ${nh}년 ✓`); }
      else { eligible = false; fails.push(`무주택 기간이 ${reqNH}년 이상이어야 해요 (현재 ${nh}년)`); }
    }

    // 소득 기준 (신생아 가산 반영: 생애최초/신혼부부/신생아특공에 +10%p~+20%p)
    const reqIncPct = parseInt(rule.incPct) || 0;
    if(reqIncPct > 0 && inc > 0){
      const applyNbBonus = nbBonusElig > 0 && (typeName.includes('생애최초') || typeName.includes('신혼') || typeName.includes('신생아'));
      const effIncPct = applyNbBonus ? reqIncPct + nbBonusElig : reqIncPct;
      if(incPct <= effIncPct){
        reasons.push(applyNbBonus ? `소득 ${incPct}% (${reqIncPct}%+${nbBonusElig}%p 신생아가산=${effIncPct}% 이하) ✓` : `소득 ${incPct}% (${reqIncPct}% 이하) ✓`);
      } else {
        eligible = false;
        fails.push(applyNbBonus ? `소득이 기준(${effIncPct}%)을 초과해요 (현재 ${incPct}%)` : `소득이 기준(${reqIncPct}%)을 초과해요 (현재 ${incPct}%)`);
      }
    }
    const reqIncLimit = parseInt(rule.incLimit) || 0;
    if(reqIncLimit > 0 && inc > 0){
      if(inc <= reqIncLimit){ reasons.push(`소득 ${inc}만원 (${reqIncLimit}만원 이하) ✓`); }
      else { eligible = false; fails.push(`소득이 기준(${reqIncLimit}만원)을 초과해요 (현재 ${inc}만원)`); }
    }

    // 혼인 여부
    if(rule.married === 'required'){
      if(p.marriage === '기혼'){ reasons.push('기혼 ✓'); }
      else { eligible = false; fails.push('기혼이어야 해요'); }
    }
    if(rule.married === 'excluded'){
      if(p.marriage === '미혼'){ reasons.push('미혼 ✓'); }
      else { eligible = false; fails.push('미혼이어야 해요'); }
    }

    // 나이 제한
    const ageMax = parseInt(rule.ageMax) || 0;
    const ageMin = parseInt(rule.ageMin) || 0;
    if(ageMax > 0 && age > 0){
      if(age <= ageMax){ reasons.push(`만 ${age}세 (${ageMax}세 이하) ✓`); }
      else { eligible = false; fails.push(`만 ${ageMax}세 이하여야 해요 (현재 만 ${age}세)`); }
    }
    if(ageMin > 0 && age > 0){
      if(age >= ageMin){ reasons.push(`만 ${age}세 (${ageMin}세 이상) ✓`); }
      else { eligible = false; fails.push(`만 ${ageMin}세 이상이어야 해요 (현재 만 ${age}세)`); }
    }

    // 자녀 수
    const reqCh = parseInt(rule.children) || 0;
    if(reqCh > 0){
      if(ch >= reqCh){ reasons.push(`자녀 ${ch}명 (${reqCh}명 이상) ✓`); }
      else { eligible = false; fails.push(`미성년 자녀가 ${reqCh}명 이상이어야 해요 (현재 ${ch}명)`); }
    }

    // 신생아
    if(rule.newborn === true || rule.newborn === 'true'){
      if(hasNewborn){ reasons.push('만 2세 이하 자녀 ✓'); }
      else { eligible = false; fails.push('만 2세 이하 자녀가 있어야 해요'); }
    }

    // 노부모 부양 (노부모부양 전형은 반드시 elderParent 체크)
    if(rule.elderParent === true || rule.elderParent === 'true' || typeName === '노부모부양' || typeName.includes('노부모')){
      if(p.elderParent){ reasons.push('만 65세 이상 부모 부양 ✓'); }
      else { eligible = false; fails.push('만 65세 이상 직계존속을 3년 이상 부양해야 해요'); }
    }

    // 청약통장 납입횟수
    const reqAcc = parseInt(rule.accMonths) || 0;
    if(reqAcc > 0 && depCnt > 0){
      if(depCnt >= reqAcc){ reasons.push(`납입 ${depCnt}회 (${reqAcc}회 이상) ✓`); }
      else { eligible = false; fails.push(`납입 횟수가 ${reqAcc}회 이상이어야 해요 (현재 ${depCnt}회)`); }
    }

    // 청약통장 가입기간
    const reqAccYr = parseInt(rule.accYears) || 0;
    if(reqAccYr > 0 && accYr > 0){
      if(accYr >= reqAccYr){ reasons.push(`통장 ${accYr}년 (${reqAccYr}년 이상) ✓`); }
      else { eligible = false; fails.push(`청약통장 가입기간이 ${reqAccYr}년 이상이어야 해요 (현재 ${accYr}년)`); }
    }

    // 거주지역 요건 (정보 표시만, 자동 판정 어려움)
    if(rule.regionReq && rule.regionReq.length > 0){
      reasons.push(`📍 ${rule.regionReq}`);
    }

    // 세대주 요건 (정보 표시)
    if(rule.isHeadReq === true || rule.isHeadReq === 'true'){
      reasons.push('세대주 요건 있음');
    }

    // 자산 기준
    const reqAssets = parseInt(rule.assets) || 0;
    if(reqAssets > 0){ reasons.push(`자산 ${(reqAssets/10000).toFixed(1)}억 이하`); }

    // 부동산 가액
    const reqRE = parseInt(rule.realEstate) || 0;
    if(reqRE > 0){ reasons.push(`부동산 ${(reqRE/10000).toFixed(1)}억 이하`); }

    // 자동차 가액
    const reqCar = parseInt(rule.carValue) || 0;
    if(reqCar > 0){ reasons.push(`자동차 ${reqCar.toLocaleString()}만원 이하`); }

    // 단계별 소득구분 매칭 (PDF eligTiers 우선, 없으면 calcTypes fallback)
    let matchedTiers = [];
    if(eligible && typeTiers.length > 0 && incPct > 0){
      const userInc = p.isDual ? incPct : incPct; // 소득 %
      typeTiers.forEach(tier => {
        const lim = p.isDual ? (parseInt(tier.incDual)||999) : (parseInt(tier.incSingle)||999);
        // 신생아 가산 적용 여부 (신생아 관련 단계만)
        const isNbTier = (tier.name||'').includes('신생아');
        const effLim = isNbTier ? lim + nbBonusElig : lim;
        if(userInc <= effLim){
          matchedTiers.push({
            step: tier.step,
            name: tier.name,
            pct: tier.pct,
            note: tier.note || '',
            limit: effLim
          });
        }
      });
    }
    // 가장 높은 우선순위(낮은 step) 매칭
    const bestTier = matchedTiers.sort((a,b) => a.step - b.step)[0];

    // fallback: calcTypes의 우선/잔여 구분
    const myTypeMatch = calcTypes(p).find(t => t.l === typeName);
    const subType = bestTier ? bestTier.name : (myTypeMatch?.sub || '');
    const subNote = bestTier ? `${bestTier.step}단계 · 소득 ${bestTier.limit}% 이하${bestTier.pct?` (배정 ${bestTier.pct}%)`:''}`
                             : (myTypeMatch?.subNote || '');

    // calcTypes 기반 교차 검증: 사용자 조건상 해당 전형에 자격이 없으면 ineligible
    if(eligible && !myTypes.includes(typeName)){
      eligible = false;
      if(!fails.length) fails.push('현재 입력된 조건으로는 자격이 충족되지 않아요');
    }

    results.push({
      type: typeName,
      eligible,
      sub: eligible ? subType : '',
      subNote: eligible ? subNote : '',
      tiers: eligible ? typeTiers : [],
      matchedTier: eligible ? bestTier : null,
      reasons: eligible ? reasons : fails,
      desc: rule.note || rule.desc || '',
      fromPdf: !!details.find(d => d.type === typeName)
    });
  });

  // eligible 먼저, 그 다음 ineligible 정렬
  results.sort((a,b) => (b.eligible?1:0) - (a.eligible?1:0));
  return results;
}
/* ★★★ [하드코딩 끝] ★★★ */

function countUp(el, target, duration=600){
  const start = parseInt(el.textContent)||0;
  if(start===target){el.classList.add('num-pop');setTimeout(()=>el.classList.remove('num-pop'),300);return;}
  const step = (target-start)/(duration/16);
  let cur = start;
  const t = setInterval(()=>{
    cur += step;
    if((step>0&&cur>=target)||(step<0&&cur<=target)){
      cur=target; clearInterval(t);
      el.classList.add('num-pop');
      setTimeout(()=>el.classList.remove('num-pop'),300);
    }
    el.textContent = Math.round(cur);
  },16);
}
/* ★★★ [하드코딩 — 수정 금지] 유사단지 데이터 캐시 & 사전 로드 ★★★ */
const _similarCache = {};
async function enrichListingWithHistory(l){
  // PDF 업로드 공고에 경쟁률/커트라인이 없을 때 유사단지 데이터로 보완
  if(l._historyEnriched) return;
  l._historyEnriched = true;
  const cacheKey = l.loc || l.name || '';
  if(!cacheKey) return;
  if(_similarCache[cacheKey]){
    const c = _similarCache[cacheKey];
    if(!l.comp || l.comp <= 1) l.comp = c.avgComp || l.comp;
    if(!l.cut || l.cut <= 0) l.cut = c.avgCut || l.cut;
    l._historySource = c;
    return;
  }
  const hist = await fetchSimilarComp(l);
  if(hist){
    _similarCache[cacheKey] = hist;
    if(!l.comp || l.comp <= 1) l.comp = hist.avgComp || l.comp;
    if(!l.cut || l.cut <= 0) l.cut = hist.avgCut || l.cut;
    l._historySource = hist;
  }
}
/* ★★★ [하드코딩 끝] ★★★ */

/* ★★★ [하드코딩 — 수정 금지] 당첨률 정교화 v2 (6가지 보정 팩터 통합) ★★★ */

// 지역별 보정 계수 테이블
const REGION_FACTOR = {
  seoul:1.35, gyeonggi:1.15, incheon:1.05, sejong:1.10,
  busan:0.95, daejeon:0.90, daegu:0.90, gwangju:0.85,
  ulsan:0.85, gangwon:0.75, chungnam:0.80, jeonnam:0.75
};
// 서울 세부 지역 (강남권 추가 보정)
const SEOUL_HOT = ['강남','서초','송파','용산','성동','마포','영등포','양천'];

function calcProb(l, p, selectedType){
  const hasConditions = p.noHomeYears || p.depCount || p.income || p.byear;
  if(!hasConditions) return null;

  const score = calcScore(p);
  const myScore = score.total;
  const comp = parseFloat(l._selectedComp || l.comp) || 10;
  const cut = parseInt(l._selectedCut || l.cut) || 0;
  const nh = parseInt(p.noHomeYears||0);
  const inc = parseInt(p.income||0);
  const accYr = parseInt(p.accYears||0);
  const depCnt = parseInt(p.depCount||0);
  const units = parseInt(l.units)||0;
  const types = calcTypes(p);
  const myTypes = types.map(t=>t.l);

  const eligMatch = (l.elig||[]).some(e => myTypes.includes(e));
  const isLotto = isLottoListing(l);

  let prob, reasons = [];

  // ── A. 1순위/2순위 판별 (청약통장 가입기간 기반) ──
  let rankPenalty = 1;
  const isHotZone = (l.region==='seoul' || l.region==='gyeonggi' || l.region==='incheon' || l.region==='sejong');
  if(accYr > 0){
    if(isHotZone && accYr < 2){
      rankPenalty = 0.3; // 투기과열지구 2순위 → 확률 대폭 하락
      reasons.push('2순위(가입 2년 미만)');
    } else if(!isHotZone && accYr < 1){
      rankPenalty = 0.4;
      reasons.push('2순위(가입 1년 미만)');
    } else {
      reasons.push('1순위');
    }
  }
  // 납입 횟수 체크도 추가
  if(depCnt > 0 && isHotZone && depCnt < 24){
    rankPenalty = Math.min(rankPenalty, 0.5);
    if(!reasons.includes('2순위(가입 2년 미만)')) reasons.push('납입 24회 미만');
  }

  // ── B. 기본 확률 계산 (유형별) ──
  if(isLotto){
    const base = Math.min(95, Math.round(100 / comp * 10) / 10);
    prob = Math.max(0.5, base);
    reasons.push(`무순위 추첨 경쟁률 ${comp}:1`);

  } else if(selectedType && ['신혼부부특공','생애최초','신생아특공','다자녀특공','청년특공'].includes(selectedType)){
    // ── 특별공급: 소득+자산 기준 (가점제 아님) ──
    let specProb = 50;
    // 소득 기준 충족도
    if(inc > 0){
      if(selectedType==='생애최초' && inc <= 13000) specProb += 15;
      else if(selectedType==='신혼부부특공' && inc <= 14000) specProb += 15;
      else if(selectedType==='신생아특공' && inc <= 14000) specProb += 15;
      else if(inc <= 10000) specProb += 10;
    }
    // 무주택 보너스
    if(nh >= 5) specProb += 10;
    else if(nh >= 3) specProb += 5;
    // 경쟁률 반영
    specProb = specProb * Math.min(1, 8 / comp);
    prob = Math.max(0.5, Math.min(90, specProb));
    reasons.push(`${selectedType} 소득·자산 기준`);

  } else if(l.type === 'public'){
    if(!eligMatch){
      prob = 0.5;
      reasons.push('신청 가능한 전형 없음');
    } else if(cut > 0){
      const diff = myScore - cut;
      const sigmoid = 1 / (1 + Math.exp(-diff / 3));
      const compFactor = Math.min(1, 10 / comp);
      prob = Math.round(sigmoid * compFactor * 95 * 10) / 10;
      prob = Math.max(0.5, Math.min(95, prob));
      reasons.push(`가점 ${myScore}점 vs 커트라인 ${cut}점`);
    } else {
      const estCut = comp >= 30 ? 65 : comp >= 15 ? 55 : comp >= 5 ? 45 : 35;
      const diff = myScore - estCut;
      const sigmoid = 1 / (1 + Math.exp(-diff / 4));
      const compFactor = Math.min(1, 10 / comp);
      prob = Math.round(sigmoid * compFactor * 90 * 10) / 10;
      prob = Math.max(0.5, Math.min(90, prob));
      reasons.push(`가점 ${myScore}점 (추정 커트 ~${estCut}점)`);
      if(l._historySource) reasons.push(`${l._historySource.region} ${l._historySource.sampleCount}개 단지 참고`);
    }
    if(inc > 0 && inc <= 3000){ prob = Math.min(95, prob * 1.15); reasons.push('저소득 가산'); }
    else if(inc > 0 && inc <= 4000){ prob = Math.min(95, prob * 1.05); }

  } else {
    // ── 민간분양: 가점 40% + 추첨 60% ──
    if(!eligMatch){
      prob = 0.5;
      reasons.push('신청 가능한 전형 없음');
    } else {
      const scoreRatio = Math.min(1, myScore / 70);
      const scorePart = scoreRatio * 0.4;
      const lotPart = (1 / comp) * 0.6;
      prob = Math.round((scorePart + lotPart) * 100 * 10) / 10;
      prob = Math.max(0.5, Math.min(95, prob));
      reasons.push(`가점 ${myScore}점(40%) + 추첨(60%)`);
    }
  }

  // ── C. 시세차익 보정: 갭이 클수록 경쟁 치열 ──
  const _maxP = getMaxP(l);
  if(_maxP && l.mktP && l.mktP > _maxP && !isLotto){
    const gapPct = Math.round((l.mktP - _maxP) / l.mktP * 100);
    if(gapPct >= 30){ prob *= 0.75; reasons.push(`시세차익 ${gapPct}% → 고경쟁`); }
    else if(gapPct >= 20){ prob *= 0.85; reasons.push(`시세차익 ${gapPct}%`); }
    else if(gapPct >= 10){ prob *= 0.92; }
  }

  // ── D. 세대수(공급 물량) 보정: 대단지일수록 유리 ──
  if(units > 0 && !isLotto){
    if(units >= 1000){ prob *= 1.15; reasons.push(`대단지 ${units}세대`); }
    else if(units >= 500){ prob *= 1.08; }
    else if(units <= 100){ prob *= 0.90; reasons.push(`소규모 ${units}세대`); }
  }

  // ── E. 지역별 보정 계수 ──
  const rgn = l.region || '';
  const rgnFactor = REGION_FACTOR[rgn] || 1;
  if(rgnFactor !== 1 && !isLotto){
    // 서울 강남권 추가 보정
    let localFactor = rgnFactor;
    if(rgn === 'seoul'){
      const loc = l.loc || '';
      if(SEOUL_HOT.some(g => loc.includes(g))){
        localFactor = 1.50; // 강남권은 더 치열
        reasons.push('서울 강남권 보정');
      } else {
        reasons.push('서울 지역 보정');
      }
    }
    // 보정 방향: 경쟁 치열한 지역 → 확률 하락
    if(localFactor > 1) prob /= localFactor;
    else prob *= (1 / localFactor); // 비수도권 → 확률 상승
  }

  // ── F. 1순위/2순위 반영 ──
  if(rankPenalty < 1 && !isLotto){
    prob *= rankPenalty;
  }

  // ── G. 무주택 기간 보너스 (전 유형 공통) ──
  if(nh >= 10) prob = Math.min(95, prob * 1.08);
  else if(nh >= 5) prob = Math.min(95, prob * 1.04);

  prob = Math.max(0.5, Math.min(95, Math.round(prob * 10) / 10));

  l._probReason = reasons.join(' · ');
  l._probFactors = { rankPenalty, rgnFactor, units, accYr, selectedType };
  return prob;
}
/* ★★★ [하드코딩 끝] ★★★ */
function pClass(v){return v>=20?'hi':v>=5?'mi':'lo';}
function pColor(v){return v>=20?'#059669':v>=5?'#D97706':'#DC2626';}
function typeBadge(l){
  const isLotto = isLottoListing(l);
  const typeBadgeHtml = l.type==='public'
    ? `<span class="badge badge-public">공공분양</span>`
    : `<span class="badge badge-private">민간분양</span>`;
  if(isLotto){
    return`<span class="badge badge-lotto">🎰 로또청약</span> ${typeBadgeHtml}`;
  }
  return typeBadgeHtml;
}
function gapPill(l){
  if(l.noMktP) return`<div class="gap-pill"><div class="gap-nums" style="color:var(--ink-4)">📊 시세 차익 기대가 어려울 수 있어요</div></div>`;
  const{g,pct,saleP}=gap(l);const up=g>0;
  return`<div class="gap-pill"><div class="gap-nums"><b>${(saleP/10000).toFixed(1)}억</b><span>→ 시세 ${(l.mktP/10000).toFixed(1)}억</span></div><div class="gap-badge ${up?'up':'dn'}">${up?`${pct}% 저렴`:`${Math.abs(pct)}% 비쌈`}</div></div>`;
}
function calcScore(p){
  const nh=parseInt(p.noHomeYears||0),dep=parseInt(p.dependents||0),acc=parseInt(p.depCount||0);
  const nhT=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32];
  const nhS=p.isNoHome?nhT[Math.min(nh,16)]:0;
  const dS=Math.min(35,dep*5+5);
  const yr=Math.floor(acc/12);
  const aT=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  const aS=aT[Math.min(yr,15)]||2;
  return{total:nhS+dS+aS,nhS,dS,aS};
}

/* ══ 단지명 정리 ══ */
function cleanName(name){
  if(!name) return name;
  return name.replace(/\s*공공분양주택\s*/g, '').replace(/[\u200B\u200C\u200D\uFEFF]/g,'').trim();
}

/* ══ 가격 문자열 정리 ══ */
function cleanPrice(p){
  if(!p) return p;
  // 천원 단위 숫자 (예: 255,150천원 → 약 2.6억)
  if(/[0-9,]+천원/.test(p)){
    const num = parseInt(p.replace(/,/g,'')) * 1000; // 천원 → 원
    const uk = Math.round(num / 100000000 * 10) / 10; // 억 단위
    return uk + '억';
  }
  return p.replace(/만원/g, '').replace(/원$/g, '').trim();
}

/* ★★★ [하드코딩 — 수정 금지] 가격 문자열 → 숫자(만원) 변환 ★★★ */
function priceToNum(p){
  if(!p) return 0;
  p = p.replace(/,/g,'').trim();
  // 천원 단위: 255150천원
  if(/[0-9]+천원/.test(p)) return Math.round(parseInt(p) * 0.1); // 천원 → 만원
  let result = 0;
  const uk = p.match(/([0-9.]+)억/);
  const chun = p.match(/([0-9]+)천(?!원)/);
  const man = p.match(/([0-9]+)만/);
  if(uk) result += parseFloat(uk[1]) * 10000;
  if(chun){
    const chVal = parseInt(chun[1]);
    if(uk && chVal > 9){
      // "3억920천" → 920천은 AI 추출 오류, 920만원으로 처리
      // (정상: 1천~9천 = 1000만~9000만, 10 이상은 만원 단위 오기)
      result += chVal;
    } else {
      result += chVal * 1000;
    }
  }
  if(man) result += parseInt(man[1]);
  // "3억6613" 처럼 억 뒤에 단위 없는 숫자가 있으면 만원 단위로 처리
  if(uk && !chun && !man){
    const afterUk = p.slice(p.indexOf('억')+1).trim();
    const trailing = afterUk.match(/^(\d{3,})/);
    if(trailing) result += parseInt(trailing[1]);
  }
  return result;
}
/* ★★★ [하드코딩 끝] ★★★ */

/* ★★★ [하드코딩 — 수정 금지] 카드용 가격: 최저~최고, 0억 0천 형식 ★★★ */
function numToUkChun(manwon){
  // 만원 단위 숫자 → "0억 0천" 형식
  if(!manwon || manwon <= 0) return '';
  const uk = Math.floor(manwon / 10000);
  const chun = Math.round((manwon % 10000) / 1000);
  if(uk > 0 && chun > 0) return uk+'억 '+chun+'천';
  if(uk > 0) return uk+'억';
  if(chun > 0) return chun+'천';
  return '';
}
function daysText(d,fmt){
  if(d===null||d===undefined||d>9999){
    if(fmt==='badge') return '선착순';
    if(fmt==='remain') return '선착순 계약';
    if(fmt==='d') return '선착순';
    return '선착순';
  }
  if(d===0){
    if(fmt==='badge') return '오늘';
    if(fmt==='remain') return '오늘 마감';
    if(fmt==='d') return 'D-Day';
    return '오늘';
  }
  if(fmt==='badge') return 'D-'+d;
  if(fmt==='remain') return d+'일 남음';
  if(fmt==='d') return 'D-'+d;
  return d+'일';
}
function cardPrice(price){
  if(!price) return '';

  // 금액 문자열에서 금액 부분만 추출 (평형명, 타입코드 제거)
  const extractAmt = p => {
    p = p.trim();
    // 금액 시작점 찾기: 첫 번째 숫자+억 패턴
    const priceStart = p.search(/\d+억/);
    if(priceStart >= 0) return p.slice(priceStart).trim();
    // 만원/천원 패턴
    const numStart = p.search(/\d+[만천]/);
    if(numStart >= 0) return p.slice(numStart).trim();
    // 평형명 이후 금액
    const spaceIdx = p.indexOf(' ');
    const amt = spaceIdx > 0 ? p.slice(spaceIdx + 1).trim() : p;
    return cleanPrice(amt);
  };

  // 모든 금액 조각 수집 (| 와 ~ 모두 분해)
  let allPrices = [];
  const parts = price.includes('|') ? price.split('|') : [price];
  parts.forEach(part => {
    const amt = extractAmt(part);
    if(amt.includes('~')){
      amt.split('~').forEach(a => { if(a.trim()) allPrices.push(cleanPrice(a.trim())); });
    } else {
      if(amt.trim()) allPrices.push(amt);
    }
  });

  // 유효한 값만 (0이 아닌)
  allPrices = allPrices.filter(p => priceToNum(p) > 0);
  if(!allPrices.length) return cleanPrice(price);

  // 숫자로 변환해서 최저/최고 찾기
  const nums = allPrices.map(p => ({label: p, val: priceToNum(p)}));
  nums.sort((a,b) => a.val - b.val);

  // 0억 0천 형식으로 표시
  const minFmt = numToUkChun(nums[0].val) || nums[0].label;
  const maxFmt = numToUkChun(nums[nums.length-1].val) || nums[nums.length-1].label;

  return minFmt === maxFmt ? minFmt : `${minFmt}~${maxFmt}`;
}
/* ★★★ [하드코딩 끝] ★★★ */

/* ══ 히어로 ══ */
function updateHero(){
  const p=P;
  const hasConditions = p.noHomeYears||p.depCount||p.income||p.byear;
  // 조건 있으면 설정하기 버튼 숨김
  const ctaBtn = document.getElementById('hero-cta');
  if(ctaBtn) ctaBtn.style.display = hasConditions ? 'none' : 'block';
  // 이름 설정
  if(!p.name)p.name=RETRO[Math.floor(Math.random()*RETRO.length)];
  document.getElementById('my-name').textContent=p.name;

  const greetEl = document.getElementById('hero-greeting');
  const cheerEl = document.getElementById('hero-cheer');
  const cheer = CHEER[Math.floor(Math.random()*CHEER.length)];
  if(greetEl) greetEl.textContent = `${p.name}님, 안녕하세요`;
  if(cheerEl) cheerEl.textContent = cheer;

  // 조건값 업데이트
  const setVal=(id,val,unit='')=>{
    const el=document.getElementById(id);
    if(val){el.textContent=val+unit;el.classList.remove('blank');}
    else{el.textContent=unit?'?'+unit:'?';el.classList.add('blank');}
  };
  setVal('cd-income',p.income,'만');
  setVal('cd-cash',p.cash,'만');
  setVal('cd-nohome',p.noHomeYears,'년');
  setVal('cd-dep',p.depCount,'회');
  setVal('cd-children',p.children!==undefined?p.children:null,'명');
  setVal('cd-region',RGN[p.region]&&p.region?RGN[p.region]:'');

  // 전형 뱃지 — 조건 미설정 시 표시 안 함
  const isCondSet = !!(p.byear || p.income || p.accYears || p.region);
  const types = isCondSet ? calcTypes(p) : [];
  document.getElementById('type-pills').innerHTML=types.length
    ?types.map(t=>`<span class="type-pill ${t.c}">${t.l}</span>`).join('')
    :'';

  // 마감임박 배너
  const urgSaved=listings.filter(l=>savedIds.has(l.id)&&l.days<=3);
  const aEl=document.getElementById('alert-area');
  aEl.innerHTML=urgSaved.length?`<div class="alert-banner" onclick="showDetail(${urgSaved[0].id})"><div class="alert-banner-icon">🔔</div><div><div class="alert-banner-title">${urgSaved[0].days===0?'오늘 마감!':'마감 '+urgSaved[0].days+'일 전!'}</div><div class="alert-banner-sub">${urgSaved[0].name} 접수 마감 임박</div></div></div>`:'';

  renderRecommend();
}

function renderRecommend(){
  const c=document.getElementById('rec-container');
  const row=document.getElementById('rec-section-row');
  const hasConditions = P.noHomeYears||P.depCount||P.income||P.byear;

  // 조건 수정 버튼: 조건 있을 때만 표시
  if(row){
    row.innerHTML = `<div class="section-title">내게 맞는 공고</div>`;
  }

  if(!hasConditions){
    c.innerHTML=`<div style="margin:4px 20px 0;padding:24px 20px;background:var(--accent-light);border-radius:18px;text-align:center;cursor:pointer" onclick="openMyCondition()">
  <div style="font-size:32px;margin-bottom:10px">🏠</div>
  <div style="font-size:15px;font-weight:800;color:var(--accent);margin-bottom:6px;letter-spacing:-.3px">내 조건을 설정해보세요</div>
  <div style="font-size:13px;color:var(--ink-4);line-height:1.6">소득·무주택 기간·청약통장만 입력하면
딱 맞는 공고를 추천해드려요</div>
</div>`;
    return;
  }
  const tl=calcTypes(P).map(t=>t.l);
  const matched=listings.filter(l=>!isLottoListing(l)&&l.elig.some(e=>tl.includes(e)));
  if(!matched.length){c.innerHTML='<div class="notice" style="cursor:default">현재 조건에 맞는 진행 중 공고가 없어요. 전체 공고를 확인해보세요.</div>';return;}
  c.innerHTML=`<div class="rec-scroll">${matched.map(l=>{
    const myType=l.elig.find(e=>tl.includes(e))||l.elig[0];
    return`<div class="rec-card" onclick="showDetail('${l.id}')">
      <div class="rec-top"><div style="display:flex;gap:5px;align-items:center">${typeBadge(l)}</div><span class="rec-mytype">✓ ${myType}</span></div>
      <div class="rec-name">${cleanName(l.name)}</div><div class="rec-loc">📍 ${l.loc}</div>
      <div class="rec-bottom"><span class="rec-price">${cardPrice(l.price).split('~')[0]}~</span><span class="rec-d ${l.days<=7?'u':'n'}${l.days!==null&&l.days<=3?' urgent':''}">${daysText(l.days,'remain')}</span></div>
    </div>`;
  }).join('')}</div>`;
}

/* ══ 매물 렌더 ══ */
function renderListings(){
  const cont=document.getElementById('listings');
  const lb=document.getElementById('lotto-banner');
  const lottoTab=document.getElementById('tab-lotto');
  const hasLotto=listings.some(l=>isLottoListing(l));
  if(lottoTab) lottoTab.style.display=hasLotto?'':'none';
  const nb=document.getElementById('api-notice-banner');
  if(nb){
    nb.innerHTML = '';
  }

  const sort=document.getElementById('sort-sel').value;
  const q=srchQ.toLowerCase();

  const activeLotto = listings.filter(l=>isLottoListing(l));
  lb.innerHTML = curFilter==='lotto' && activeLotto.length
    ? `<div style="padding:8px 20px 0"><div style="background:linear-gradient(135deg,#4C1D95,#7C3AED);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px"><span style="font-size:32px">🎰</span><div><div style="font-size:15px;font-weight:800;color:white">로또청약 · 줍줍</div><div style="font-size:12px;color:rgba(255,255,255,.7);margin-top:3px">현재 ${activeLotto.length}건 진행 중 · 누구나 신청 가능</div></div></div></div>`
    : '';
  let fl=listings;
  if(curFilter==='public') fl=listings.filter(l=>l.type==='public' && !isLottoListing(l));
  else if(curFilter==='private') fl=listings.filter(l=>l.type==='private' && !isLottoListing(l));
  else if(curFilter==='lotto') fl=listings.filter(l=>isLottoListing(l));
  // 전체 탭: 로또청약 공고는 한 번만 (중복 제거 — 이미 listings에 하나만 있음)
  if(q) fl=fl.filter(l=>l.name.toLowerCase().includes(q)||l.loc.toLowerCase().includes(q));
  // 지역 필터
  if(selectedRegions.size>0) fl=fl.filter(l=>selectedRegions.has(l.region));

  const tl=calcTypes(P).map(t=>t.l);
  if(sort==='recommend') fl=[...fl].sort((a,b)=>{const am=a.elig.some(e=>tl.includes(e))?1:0,bm=b.elig.some(e=>tl.includes(e))?1:0;return bm-am||a.days-b.days;});
  else if(sort==='winrate') fl=[...fl].sort((a,b)=>(calcProb(b,P)||0)-(calcProb(a,P)||0));
  else if(sort==='profit') fl=[...fl].sort((a,b)=>gap(b).g-gap(a).g);
  else fl=[...fl].sort((a,b)=>{
    const aEnd = a.days <= 0 ? 1 : 0;
    const bEnd = b.days <= 0 ? 1 : 0;
    if(aEnd !== bEnd) return aEnd - bEnd;
    return a.days - b.days;
  });

  if(!fl.length){cont.innerHTML=`<div class="no-res"><div class="no-res-icon">🔍</div><div class="no-res-title">검색 결과가 없어요</div><div class="no-res-sub">다른 키워드로 검색해보세요</div></div>`;return;}

  cont.innerHTML=fl.map((l,idx)=>{
    const myType=tl.length>0?l.elig.find(e=>tl.includes(e)):null;
    const prob=calcProb(l,P);
    const wrHTML=isLottoListing(l)
      ?`<div class="wr-badge lotto">추첨</div>`
      :prob!==null
        ?`<div class="wr-badge known">당첨률 <b>${prob}%</b></div>`
        :`<div class="wr-badge unknown" onclick="event.stopPropagation();openWrSheet()">당첨률 <span style="font-size:15px;font-weight:900;animation:qPulse 1.8s ease-in-out infinite;display:inline-block">?</span><span style="font-size:15px;font-weight:900;animation:qPulse 1.8s ease-in-out infinite 0.15s;display:inline-block">%</span></div>`;
    const bmSVG=`<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
    return`<div class="card card-anim" style="animation-delay:${idx*0.06}s" onclick="showDetail('${l.id}')">
      <div class="card-top">
        <div class="card-badges">

          ${typeBadge(l)}
        </div>
        <button class="bm-btn ${savedIds.has(l.id)?'saved':'unsaved'}" onclick="toggleSave(event,${l.id})">${bmSVG}</button>
      </div>
      <div class="card-name">${cleanName(l.name)}</div>
      <div class="card-loc">📍 ${l.loc}</div>
      ${gapPill(l)}
      <div class="card-sep"></div>
      <div class="card-meta">
        <div><div class="meta-label">분양가</div><div class="meta-val">${cardPrice(l.price)}</div></div>
        <div style="text-align:center"><div class="meta-label">세대수</div><div class="meta-val">${l.units}세대</div></div>
        ${(()=>{
          const isFirstCome = l.sched && (l.sched.includes('선착순') || l.sched.includes('先着順'));
          return isFirstCome ? '' : `<div style="text-align:right"><div class="meta-label">마감</div><div class="meta-val ${l.days!==null&&l.days<=3?'hot urgent':(l.days<=7?'hot':'')}">${daysText(l.days)}</div></div>`;
        })()}
      </div>
      ${wrHTML}
    </div>`;
  }).join('');
}

/* ══ 지역 필터 ══ */
let regionOpen = false;
function toggleRegionFilter(){
  regionOpen = !regionOpen;
  document.getElementById('region-chips-wrap').classList.toggle('open', regionOpen);
  document.getElementById('region-chev').classList.toggle('open', regionOpen);
  document.getElementById('region-toggle').classList.toggle('open', regionOpen);
}

function toggleRegion(code){
  if(selectedRegions.has(code)) selectedRegions.delete(code);
  else selectedRegions.add(code);
  _updateRegionUI();
  _updateWizRegionUI();
  localStorage.setItem('selectedRegions', JSON.stringify([...selectedRegions]));
  P.region = [...selectedRegions][0] || '';
  renderListings();
}

function clearRegions(){
  selectedRegions.clear();
  _updateRegionUI();
  _updateWizRegionUI();
  _updateAllRegionUI();
  localStorage.setItem('selectedRegions', JSON.stringify([]));
  P.region = '';
  renderListings();
}

function clearWizRegions(){
  selectedRegions.clear();
  _updateRegionUI();
  _updateWizRegionUI();
  _updateAllRegionUI();
  localStorage.setItem('selectedRegions', JSON.stringify([]));
}

function _updateAllRegionUI(){
  // 전체 칩 활성화: 선택된 지역 없을 때 전체 칩 checked
  document.querySelectorAll('.region-chip').forEach(chip=>{
    if(chip.textContent.trim()==='전체'){
      chip.classList.toggle('checked', selectedRegions.size===0);
    }
  });
}

function toggleWizRegion(code){
  // 홈 필터와 동일한 selectedRegions Set 공유
  if(selectedRegions.has(code)) selectedRegions.delete(code);
  else selectedRegions.add(code);
  _updateRegionUI();
  _updateWizRegionUI();
  localStorage.setItem('selectedRegions', JSON.stringify([...selectedRegions]));
}

function _updateRegionUI(){
  document.querySelectorAll('.region-chip').forEach(chip=>{
    const label=chip.textContent.trim();
    if(label==='전체'){
      chip.classList.toggle('checked', selectedRegions.size===0);
      return;
    }
    const chipCode=Object.keys(RGN).find(k=>RGN[k]===label);
    if(chipCode) chip.classList.toggle('checked', selectedRegions.has(chipCode));
  });
  const cnt=document.getElementById('region-cnt');
  if(!cnt) return;
  if(selectedRegions.size===0){ cnt.textContent='전체'; cnt.className='cnt none'; }
  else { cnt.textContent=selectedRegions.size+'개 선택'; cnt.className='cnt'; }
}

/* ★★★ [하드코딩 — 수정 금지] 관심 평형 칩 토글 로직 ★★★ */
// 평형(평) → 전용면적(㎡) 매핑 테이블
const SIZE_MAP = {
  '20': {py:20, sqm:59, label:'20평 (59㎡)'},
  '25': {py:25, sqm:74, label:'25평 (74㎡)'},
  '30': {py:30, sqm:84, label:'30평 (84㎡)'},
  '34': {py:34, sqm:102, label:'34평 (102㎡)'},
  '40': {py:40, sqm:115, label:'40평 (115㎡)'}
};

function toggleWizSize(code){
  if(selectedSizes.has(code)) selectedSizes.delete(code);
  else selectedSizes.add(code);
  _updateWizSizeUI();
  localStorage.setItem('selectedSizes', JSON.stringify([...selectedSizes]));
}
function clearWizSizes(){
  selectedSizes.clear();
  _updateWizSizeUI();
  localStorage.setItem('selectedSizes', '[]');
}
function _updateWizSizeUI(){
  document.querySelectorAll('#wiz-size-chips .region-chip').forEach(chip=>{
    const label = chip.textContent.trim();
    if(label === '전체'){
      chip.classList.toggle('checked', selectedSizes.size === 0);
      return;
    }
    const code = Object.keys(SIZE_MAP).find(k => SIZE_MAP[k].label === label);
    if(code) chip.classList.toggle('checked', selectedSizes.has(code));
  });
}
function restoreSizes(){
  try{
    const saved = localStorage.getItem('selectedSizes');
    if(saved) JSON.parse(saved).forEach(c => selectedSizes.add(c));
  }catch(e){}
}

// 공고의 평형 목록에서 사용자 관심 평형과 가장 가까운 면적 찾기
function findClosestSize(listing){
  if(!selectedSizes.size) return null;
  // 사용자가 선택한 평형의 ㎡ 값들
  const prefSqms = [...selectedSizes].map(k => SIZE_MAP[k]?.sqm || 0).filter(v => v > 0);
  if(!prefSqms.length) return null;
  // 공고에서 평형 목록 추출 (compByType, cutByType, 또는 price에서)
  const sources = [x => x.compByType, x => x.cutByType, x => x.price];
  let avail = [];
  for(const fn of sources){
    const val = fn(listing);
    if(!val || !val.includes('|')) continue;
    val.split('|').forEach(s => {
      const m = s.trim().match(/^(\d+[A-Z]?)㎡?/i);
      if(m) avail.push({ label: m[0].replace(/㎡$/,''), sqm: parseInt(m[1]) });
    });
    if(avail.length) break;
  }
  if(!avail.length) return null;
  // 가장 가까운 면적 찾기 (첫 번째 선택 평형 기준)
  const target = prefSqms[0];
  let best = avail[0], bestDiff = Math.abs(avail[0].sqm - target);
  for(const a of avail){
    const diff = Math.abs(a.sqm - target);
    if(diff < bestDiff){ best = a; bestDiff = diff; }
  }
  return best;
}
/* ★★★ [하드코딩 끝] ★★★ */

function _updateWizRegionUI(){
  document.querySelectorAll('#wiz-region-chips .region-chip').forEach(chip=>{
    const label=chip.textContent.trim();
    if(label==='전체'){
      chip.classList.toggle('checked', selectedRegions.size===0);
      return;
    }
    const code=Object.keys(RGN).find(k=>RGN[k]===label);
    if(code) chip.classList.toggle('checked', selectedRegions.has(code));
  });
}

function restoreRegions(){
  try{
    const saved=localStorage.getItem('selectedRegions');
    if(saved){
      JSON.parse(saved).forEach(c=>selectedRegions.add(c));
    }
  }catch(e){}
  _updateRegionUI();
  _updateWizRegionUI();
  _updateAllRegionUI();
  if(selectedRegions.size>=1) P.region=[...selectedRegions][0];
}

function setFilter(f,el){curFilter=f;document.querySelectorAll('.ftab').forEach(t=>t.classList.remove('active'));el.classList.add('active');renderListings();}
function onSearch(){srchQ=document.getElementById('srch-inp').value.trim();document.getElementById('srch-clr').style.display=srchQ?'flex':'none';renderListings();}
function clearSearch(){document.getElementById('srch-inp').value='';srchQ='';document.getElementById('srch-clr').style.display='none';renderListings();}
function toggleSave(e,id){
  e.stopPropagation();
  const btn=e.currentTarget;
  const isSaved=savedIds.has(id);
  if(isSaved){
    savedIds.delete(id);
    showToast('즐겨찾기에서 뺐어요');
    if(btn){ btn.className='bm-btn unsaved'; btn.innerHTML='<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>'; }
    // Supabase 북마크 삭제
    if(kakaoUser?.kakaoId) sbRemoveBookmark(String(kakaoUser.kakaoId), String(id));
  } else {
    savedIds.add(id);
    showToast('즐겨찾기에 저장했어요');
    if(btn){
      btn.className='bm-btn saved just-saved';
      btn.innerHTML='<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
      setTimeout(()=>btn.classList.remove('just-saved'), 400);
    }
    // Supabase 북마크 저장
    if(kakaoUser?.kakaoId) sbAddBookmark(String(kakaoUser.kakaoId), String(id));
  }
  renderSaved();
  updateHero();
}

/* ══ 당첨률 바텀시트 ══ */
/* ══ 내 조건 탭 — 조건 있으면 대시보드, 없으면 위저드 ══ */
function openMyCondition(){
  const hasConditions = P.noHomeYears || P.depCount || P.income || P.byear;
  if(hasConditions){ renderMyCondDashboard(); showScreen('mycond'); }
  else openWizard();
}

function animateDashVal(id, target){
  const el=document.getElementById(id);
  if(!el)return;
  el.classList.remove('dash-val-anim');
  void el.offsetWidth;
  el.classList.add('dash-val-anim');
  countUp(el, target, 500);
}
function renderMyCondDashboard(){
  const p=P, score=calcScore(p), types=calcTypes(p), tl=types.map(t=>t.l);
  const matched=listings.filter(l=>!isLottoListing(l)&&l.elig.some(e=>tl.includes(e)));
  const typeDescs={'생애최초':{desc:'세대원 전원 첫 주택'},'신생아특공':{desc:'만 2세 이하 자녀 보유'},'다자녀특공':{desc:'미성년 자녀 3명 이상'},'신혼부부특공':{desc:'혼인 7년 이내 신혼부부'},'청년특공':{desc:'만 39세 이하 미혼'},'노부모부양':{desc:'만 65세 이상 부모 부양'},'일반공급':{desc:'무주택 세대구성원'}};
  document.getElementById('mycond-body').innerHTML=`
    <div class="dash-hero">
      <div class="dash-name">${p.name}님의 청약 조건</div>
      <div class="dash-sub">${p.byear?`${new Date().getFullYear()-parseInt(p.byear)}세 · `:''}${p.isNoHome?'무주택':'주택 보유'}${p.noHomeYears?' · 무주택 '+p.noHomeYears+'년':''}</div>
      <div class="dash-score-row">
        <div class="dash-score-card" onclick="showScreen('score')" style="cursor:pointer"><div class="dash-score-label">청약 가점</div><div class="dash-score-val" id="dash-val-score">${score.total}</div><div class="dash-score-unit">/ 84점</div></div>
        <div class="dash-score-card" onclick="document.getElementById('dash-matched-section')?.scrollIntoView({behavior:'smooth',block:'start'})" style="cursor:pointer"><div class="dash-score-label">매칭 공고</div><div class="dash-score-val" id="dash-val-match">${matched.length}</div><div class="dash-score-unit">건</div></div>
        <div class="dash-score-card" onclick="showAlarmList()" style="cursor:pointer"><div class="dash-score-label">알림 설정</div><div class="dash-score-val" id="dash-val-alarm">${alarmIds.size}</div><div class="dash-score-unit">건</div></div>
      </div>
      <button class="dash-edit-btn" onclick="openWizard()" style="display:none"></button>
    </div>
    <div class="dash-section">
      <div class="dash-section-title">신청 가능한 전형</div>
      <div class="dash-types">
        ${types.length?types.map(t=>`<div class="dash-type-card"><div class="dash-type-name">${t.l}${t.sub?` <span style="font-size:11px;color:var(--accent);font-weight:600">${t.sub}</span>`:''}</div><div class="dash-type-desc">${t.subNote||(typeDescs[t.l]||{}).desc||''}</div><div class="dash-type-badge">신청 가능</div></div>`).join(''):'<div style="font-size:13px;color:var(--ink-4)">조건을 더 입력하면 전형이 표시돼요</div>'}
      </div>
    </div>
    ${matched.length?`<div class="dash-section" id="dash-matched-section" style="margin-top:20px">
      <div class="dash-section-title">✨ 지금 신청 가능한 공고 ${matched.length}건</div>
      ${matched.slice(0,5).map(l=>{const mt=l.elig.find(e=>tl.includes(e))||l.elig[0];return`<div class="dash-match-card" onclick="showDetail('${l.id}')"><div class="dash-match-name">${cleanName(l.name)}</div><div class="dash-match-loc">📍 ${l.loc}</div><div class="dash-match-bottom"><span class="dash-match-type">✓ ${mt}</span><span class="dash-match-days" style="color:${l.days<=7?'var(--gold)':'var(--ink-4)'}">${daysText(l.days,'d')}</span></div></div>`;}).join('')}
      ${matched.length>5?`<div style="text-align:center;font-size:13px;color:var(--accent);font-weight:600;padding:12px;cursor:pointer" onclick="showScreen('home')">전체 ${matched.length}건 보기 →</div>`:''}
    </div>`:''}
    <div class="dash-section" style="margin-top:20px">
      <div class="dash-section-title">🏆 가점 커트라인 비교</div>
      ${listings.filter(l=>!isLottoListing(l)&&l.cut>0).map(l=>{const d=score.total-l.cut,ok=d>=0;return`<div class="dash-match-card" onclick="showDetail('${l.id}')"><div class="dash-match-name">${cleanName(l.name)}</div><div class="dash-match-loc">📍 ${l.loc}</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span style="font-size:12px;color:var(--ink-4)">커트라인 ${l.cut}점</span><span style="font-size:12px;font-weight:700;padding:2px 9px;border-radius:20px;background:${ok?'var(--public-light)':'var(--red-light)'};color:${ok?'var(--public)':'var(--red)'}">${ok?`+${d}점 통과`:`${d}점 부족`}</span></div></div>`;}).join('')}
    </div>
    <div style="height:120px"></div>`;
  setTimeout(()=>{
    animateDashVal('dash-val-score',score.total);
    animateDashVal('dash-val-match',matched.length);
    animateDashVal('dash-val-alarm',alarmIds.size);
  },200);
}

function showAlarmList(){
  if(alarmIds.size===0){ showToast('설정된 알림 공고가 없어요'); return; }
  const alarmListings = listings.filter(l=>alarmIds.has(l.id));
  // mycond 화면 내에 알림 목록 오버레이 표시
  const existing = document.getElementById('alarm-overlay');
  if(existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'alarm-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;display:flex;align-items:flex-end;justify-content:center;max-width:430px;margin:0 auto';
  overlay.innerHTML = `
    <div style="background:white;border-radius:20px 20px 0 0;width:100%;max-height:70vh;overflow-y:auto;padding-bottom:env(safe-area-inset-bottom)">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 20px 12px">
        <div style="font-size:17px;font-weight:800;color:var(--ink)">알림 설정 공고 ${alarmIds.size}건</div>
        <button onclick="document.getElementById('alarm-overlay').remove()" style="background:var(--bg);border:none;cursor:pointer;width:32px;height:32px;border-radius:50%;font-size:18px;color:var(--ink-4)">×</button>
      </div>
      <div style="padding:0 20px 20px;display:flex;flex-direction:column;gap:10px">
        ${alarmListings.map(l=>`
          <div onclick="document.getElementById('alarm-overlay').remove();showDetail('${l.id}')" style="background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:16px;cursor:pointer">
            <div style="font-size:14px;font-weight:700;color:var(--ink)">${cleanName(l.name)}</div>
            <div style="font-size:12px;color:var(--ink-4);margin-top:3px">📍 ${l.loc}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
              <span style="font-size:12px;font-weight:700;color:var(--accent)">${l.days===null||l.days>9999?'선착순 계약':l.days<=3?(l.days===0?'오늘 마감!':'마감임박!'):'D-'+l.days}</span>
              <span style="font-size:12px;color:var(--ink-4)">${cardPrice(l.price)}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function openNudge(){ document.getElementById('nudge-ov').classList.add('open'); }
function closeNudge(e){ if(!e || e.target===document.getElementById('nudge-ov')) document.getElementById('nudge-ov').classList.remove('open'); }
function openWrSheet(){ openNudge(); }

/* ★★★ [하드코딩 — 수정 금지] 평형/전형 선택 칩 → 확률 재계산 ★★★ */

// compByType/cutByType 파이프 문자열에서 특정 사이즈의 값 추출 (근접 매칭 지원)
function _extractByTypeVal(pipeStr, targetSize, isFloat){
  if(!pipeStr || !targetSize) return null;
  const entries = pipeStr.split('|').map(s => {
    const m = s.trim().match(/^(\d+)[A-Z]?/i);
    const vM = s.trim().match(/[\s]+([\d.]+)/);
    return m ? { sqm: parseInt(m[1]), val: vM ? (isFloat ? parseFloat(vM[1]) : parseInt(vM[1])) : 0 } : null;
  }).filter(Boolean);
  if(!entries.length) return null;
  const targetSqm = parseInt(targetSize) || 0;
  // 1) 정확히 일치하는 면적 먼저
  const exact = entries.find(e => e.sqm === targetSqm);
  if(exact && exact.val > 0) return exact.val;
  // 2) 가장 가까운 면적으로 fallback
  let best = entries[0], bestDiff = Math.abs(entries[0].sqm - targetSqm);
  for(const e of entries){
    const diff = Math.abs(e.sqm - targetSqm);
    if(diff < bestDiff){ best = e; bestDiff = diff; }
  }
  return best.val > 0 ? best.val : null;
}

function togglePriceDetail(uid){
  const el = document.getElementById(uid);
  const fade = document.getElementById(uid+'-fade');
  const btn = document.getElementById(uid+'-btn');
  if(!el) return;
  const COLLAPSED_H = 66; // 2행 기준 (33px * 2)
  const isOpen = parseInt(el.style.maxHeight) > COLLAPSED_H;
  if(isOpen){
    el.style.maxHeight = COLLAPSED_H + 'px';
    if(fade) fade.style.opacity = '1';
    if(btn) btn.textContent = '평형별 상세 ▾';
  } else {
    el.style.maxHeight = el.scrollHeight + 'px';
    if(fade) fade.style.opacity = '0';
    if(btn) btn.textContent = '접기 ▴';
  }
}

function selectSizeChip(el, id, size){
  const wrap = el.parentElement;
  wrap.querySelectorAll('.det-chip').forEach(c => c.classList.remove('det-chip-on'));
  el.classList.add('det-chip-on');
  const l = listings.find(x => String(x.id) === String(id));
  if(!l) return;
  if(size){
    // 근접 매칭으로 경쟁률/커트라인 추출
    const compVal = _extractByTypeVal(l.compByType, size, true);
    const cutVal = _extractByTypeVal(l.cutByType, size, false);
    if(compVal) l._selectedComp = compVal; else delete l._selectedComp;
    if(cutVal) l._selectedCut = cutVal; else delete l._selectedCut;
  } else {
    delete l._selectedComp;
    delete l._selectedCut;
  }
  recalcDetailProb(l);
}

function selectTypeChip(el, id, etype){
  const wrap = el.parentElement;
  wrap.querySelectorAll('.det-chip').forEach(c => c.classList.remove('det-chip-on'));
  el.classList.add('det-chip-on');
  const l = listings.find(x => String(x.id) === String(id));
  if(!l) return;
  l._selectedType = etype || '';
  recalcDetailProb(l);
}

function recalcDetailProb(l){
  const prob = calcProb(l, P, l._selectedType || '');
  if(prob === null) return;
  // 게이지 업데이트
  const numEl = document.getElementById('det-prob-num');
  const fillEl = document.getElementById('det-gauge-fill');
  const reasonEl = document.getElementById('det-prob-reason');
  if(numEl){ numEl.textContent = prob + '%'; numEl.setAttribute('fill', pColor(prob)); }
  if(fillEl){
    fillEl.setAttribute('stroke', pColor(prob));
    const offset = 188.5 * (1 - prob / 100);
    fillEl.style.transition = 'stroke-dashoffset .6s ease';
    fillEl.setAttribute('stroke-dashoffset', offset);
  }
  if(reasonEl && l._probReason){
    reasonEl.textContent = '📐 산출 근거: ' + l._probReason;
  }
}
/* ★★★ [하드코딩 끝] ★★★ */

/* ══ 상세 ══ */
async function showDetail(id, fromSwipe=false){
  _detailCurrentId = id;
  const l=listings.find(x=>String(x.id)===String(id));
  if(!fromSwipe){
    prevScreen=document.querySelector('.screen.active').id.replace('screen-','');
    window._prevScrollY = window.scrollY;
  }
  // ★★★ [하드코딩 — 수정 금지] 유사단지 데이터로 경쟁률/커트라인 보완 ★★★
  await enrichListingWithHistory(l);
  // ★★★ [하드코딩 — 수정 금지] 관심 평형 자동 매칭: 사용자 선택 평형과 가장 가까운 면적 적용 ★★★
  if(selectedSizes.size > 0){
    const closest = findClosestSize(l);
    if(closest){
      const compVal = _extractByTypeVal(l.compByType, String(closest.sqm), true);
      const cutVal = _extractByTypeVal(l.cutByType, String(closest.sqm), false);
      if(compVal) l._selectedComp = compVal;
      if(cutVal) l._selectedCut = cutVal;
      l._autoMatchedSize = closest.label;
    }
  } else {
    // 전체 칩 없으므로 첫 번째 평형을 기본 선택
    const _firstSize = (l.compByType||'').split('|')[0]?.match(/^([^\s]+)/);
    if(_firstSize && _firstSize[1]){
      const compVal = _extractByTypeVal(l.compByType, _firstSize[1], true);
      const cutVal = _extractByTypeVal(l.cutByType, _firstSize[1], false);
      if(compVal) l._selectedComp = compVal;
      if(cutVal) l._selectedCut = cutVal;
    }
  }
  const prob=calcProb(l,P);
  const{g,pct,saleP}=gap(l);
  const price=l.minP,dep=Math.round(price*.1),mid=Math.round(price*.6),rem=price-dep-mid;
  const cash=parseInt(P.cash||0),loan=Math.max(0,price-cash),lr=Math.round(loan/price*100);
  const monthly=Math.round(loan*.04/12),canAfford=cash>=dep;

  // ★★★ [하드코딩 — 수정 금지] 상세 헤더 뱃지: 어두운 배경에서 보이게 흰색 글씨 ★★★
  const detBadgeStyle = 'display:inline-block;margin-bottom:10px;color:white !important;background:rgba(255,255,255,.18) !important;border:1px solid rgba(255,255,255,.3) !important';
  document.getElementById('det-badges').innerHTML=`${typeBadge(l).replace(/<span /,`<span style="${detBadgeStyle}" `)}`;
  // ★★★ [하드코딩 끝] ★★★
  document.getElementById('det-title').textContent=cleanName(l.name);
  document.getElementById('det-loc').textContent='📍 '+l.loc;
  document.getElementById('det-body').innerHTML=`

  <!-- 1. 분양 정보 -->
  <div class="info-card" style="margin-top:14px">
    <div class="info-card-title">📋 분양 정보</div>
    ${(()=>{
      // ★★★ [하드코딩 — 수정 금지] 평형별 분양가 파싱 & 표시 ★★★
      // API/PDF 무관하게 라벨은 평형(㎡)으로, 금액은 0억 0천 형식으로 표시
      function formatToUkChun(str){
        // 금액 문자열을 항상 "0억 0천" 형식으로 통일
        // priceToNum으로 만원 단위 숫자 변환 → numToUkChun으로 포맷
        if(!str) return str;
        const val = priceToNum(str);
        if(val > 0) return numToUkChun(val);
        return str;
      }
      function parsePricePart(raw){
        // "33Am² 84A 3억6,613~3억8,951" 또는 "84A 3억5천" 파싱
        raw = raw.trim();
        // 금액 시작점: 첫 번째 숫자+억 패턴
        const priceStart = raw.search(/\d+억/);
        if(priceStart < 0) return { label: '', amt: formatToUkChun(cleanPrice(raw)), minVal: 0 };
        const labelPart = raw.slice(0, priceStart).trim();
        const amtPart = raw.slice(priceStart).trim();
        // 라벨: 첫 번째 토큰을 사용 (유닛 타입 = 고유 식별자)
        const tokens = labelPart.split(/\s+/).filter(Boolean);
        let bestLabel = '';
        if(tokens.length >= 1){
          // 첫 번째 토큰 정규화: 모든 라벨에 ㎡ 통일
          let first = tokens[0].replace(/m²/g,'').replace(/m2/g,'').replace(/㎡/g,'').trim();
          if(/^\d{2,3}[A-Za-z]?$/.test(first)){
            // "59" → "59㎡", "84A" → "84A㎡", "33A" → "33A㎡"
            bestLabel = first + '㎡';
          } else if(/^[A-Za-z]+\d+$/.test(first)){
            // "A33" → "33A㎡"
            const m = first.match(/^([A-Za-z]+)(\d+)$/);
            if(m) bestLabel = m[2]+m[1]+'㎡';
          } else {
            bestLabel = first.includes('㎡') ? first : first+'㎡';
          }
        }
        // 금액 포맷 + 최소값 계산 (정렬용)
        let formattedAmt, minVal = 0;
        if(amtPart.includes('~')){
          const parts = amtPart.split('~').map(a=>a.trim());
          formattedAmt = parts.map(a=>formatToUkChun(a)).join('~');
          minVal = priceToNum(parts[0]);
        } else {
          formattedAmt = formatToUkChun(amtPart);
          minVal = priceToNum(amtPart);
        }
        return { label: bestLabel, amt: formattedAmt, minVal };
      }
      // ★★★ [하드코딩 끝] ★★★
      const priceParts = l.price ? l.price.split('|') : [];
      if(priceParts.length >= 1 && l.price){
        const parsed = priceParts.map(p => parsePricePart(p));
        parsed.sort((a,b) => a.minVal - b.minVal);
        const minAmt = parsed[0]?.amt || '';
        const maxAmt = parsed[parsed.length-1]?.amt || '';
        const rangeText = parsed.length === 1 ? minAmt : `${minAmt} ~ ${maxAmt}`;
        const detailRows = parsed.map(({label:size, amt}) =>
          `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.04)">
            <span style="font-size:12px;color:var(--ink-4)">${size||'-'}</span>
            <span style="font-size:12px;font-weight:600;color:var(--ink-3)">${amt}</span>
          </div>`).join('');
        const uid = 'price-detail-'+l.id;
        // 타입 1개: 블러/버튼 없이 그냥 표시
        // 타입 2개 이상: 2번째 줄 아래부터 블러 + 펼치기 버튼
        const ROW_H = 33; // 행 1개 높이(px) — padding 포함 추정값
        const showRows = 2; // 접혔을 때 보여줄 행 수
        const collapsedH = ROW_H * showRows;
        return `<div class="info-row" style="flex-direction:column;gap:0;align-items:stretch">
          <span class="info-rl" style="width:auto;margin-bottom:6px">평형별 분양가</span>
          ${parsed.length > 1 ? `
          <div style="margin-top:0">
            <div style="position:relative">
              <div id="${uid}" style="max-height:${collapsedH}px;overflow:hidden;transition:max-height .35s ease">
                ${detailRows}
              </div>
              <div id="${uid}-fade" style="position:absolute;bottom:0;left:0;right:0;height:36px;background:linear-gradient(to bottom,transparent,white);pointer-events:none;transition:opacity .3s"></div>
            </div>
            <div style="text-align:center;padding-top:4px;position:relative;z-index:1">
              <span id="${uid}-btn" style="font-size:12px;color:var(--accent);font-weight:700;cursor:pointer;padding:4px 12px" onclick="togglePriceDetail('${uid}')">평형별 상세 ▾</span>
            </div>
          </div>` : `
          <div style="margin-top:0">${detailRows}</div>`}
        </div>`;
      }
      return `<div class="info-row"><span class="info-rl">분양가</span><span class="info-rv">공고 확인 필요</span></div>`;
    })()}
    <div class="info-row"><span class="info-rl">총 세대수</span><span class="info-rv">${l.units ? l.units+'세대' : '공고 확인 필요'}</span></div>
    ${l.recruitUnits ? `<div class="info-row"><span class="info-rl">모집인원</span><span class="info-rv">${l.recruitUnits}세대</span></div>` : ''}
    ${(()=>{
      const isFirstCome = (l.sched && (l.sched.includes('선착순') || l.sched.includes('先着順'))) || l.days===null || l.days>9999 || (l.deadline && l.deadline.startsWith('9999'));
      const deadlineRow = isFirstCome
        ? `<div class="info-row"><span class="info-rl">청약 마감</span><span class="info-rv" style="font-weight:700;color:var(--ink-3)">선착순 계약</span></div>`
        : `<div class="info-row"><span class="info-rl">청약 마감</span><span class="info-rv" style="color:${l.days!==null&&l.days<=7?'var(--gold)':'inherit'};font-weight:700">${l.deadline} (${daysText(l.days,'remain')})</span></div>`;
      // ★★★ [하드코딩 — 수정 금지] 일정: 계약 제거, 화살표/슬래시 → 줄바꿈 ★★★
      let schedText = (l.sched||'');
      // 9999 날짜 제거
      schedText = schedText.replace(/9999[-.]?12[-.]?31/g,'미정').replace(/9999[^\s,]*/g,'미정');
      // 계약 관련 내용 제거
      schedText = schedText.replace(/\s*[→\/]\s*계약[^→\/]*/gi,'').replace(/계약[^→\/]*/gi,'').trim();
      // 화살표/슬래시 → 줄바꿈
      schedText = schedText.replace(/\s*→\s*/g,'<br>').replace(/\s*\/\s*/g,'<br>');
      const schedRow = isFirstCome ? '' : `<div class="info-row"><span class="info-rl">일정</span><span class="info-rv" style="line-height:1.8">${schedText}</span></div>`;
      // ★★★ [하드코딩 끝] ★★★
      return deadlineRow + schedRow;
    })()}
  </div>

  <!-- 2. 청약 자격 + 🎯 신청 가능한 전형 -->
  <div class="info-card" style="margin-top:14px">
    <div class="info-card-title">📋 청약 자격</div>
    <div class="info-row"><span class="info-rl">신청 자격</span><span class="info-rv">${l.qual}</span></div>
    <div class="info-row" style="border-bottom:none"><span class="info-rl">소득 기준</span><span class="info-rv">${l.inc}</span></div>
    <div class="info-card-title" style="border-top:1px solid rgba(0,0,0,.06)">🎯 신청 가능한 전형</div>
    ${/* ★★★ [하드코딩 — 수정 금지] 전형별 상세 자격 진단 UI ★★★ */
    (()=>{
      const hasConditions = P.noHomeYears || P.depCount || P.income || P.byear;
      const defaultDescs = {
        '생애최초':'세대원 전원 처음 집 사는 분','신생아특공':'만 2세 이하 자녀가 있는 분',
        '다자녀특공':'미성년 자녀 3명 이상인 분','청년특공':'만 39세 이하 미혼 무주택자',
        '신혼부부특공':'혼인 7년 이내 신혼부부','노부모부양':'만 65세 이상 부모 부양',
        '일반공급':'무주택 세대구성원','무순위(줍줍)':'만 19세 이상 누구나'
      };

      if(!hasConditions) return `
        <div style="position:relative;overflow:hidden;min-height:80px">
          <div style="padding:12px 18px;display:flex;flex-direction:column;gap:8px;opacity:.3;pointer-events:none">
            ${l.elig.map(e=>`
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg);border-radius:10px">
                <div style="font-size:13px;font-weight:700;color:var(--ink);flex:1">${e}</div>
                <div style="font-size:11px;color:var(--ink-4)">${defaultDescs[e]||''}</div>
              </div>`).join('')}
          </div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.4);padding:16px;text-align:center">
            <span style="font-size:13px;font-weight:700;color:var(--accent);cursor:pointer" onclick="event.stopPropagation();openWizard()">🔒 조건을 설정하면 확인할 수 있어요</span>
          </div>
        </div>`;

      const eligResults = calcEligDetail(l, P);
      return `
        <div style="padding:12px 18px;display:flex;flex-direction:column;gap:8px">
          ${eligResults.map(r => {
            if(r.eligible){
              const condBadges = r.reasons.filter(s => !s.includes('소득') || s.includes('소득세'));
              return `<div style="padding:10px 14px;background:var(--public-light);border:1.5px solid var(--public);border-radius:12px">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="width:22px;height:22px;border-radius:50%;background:var(--public);display:flex;align-items:center;justify-content:center;font-size:12px;color:white;flex-shrink:0;font-weight:800">✓</div>
                <div style="font-size:13px;font-weight:800;color:var(--public);flex:1">${r.type}${r.sub?` <span style="font-weight:600;color:var(--accent)">${r.sub}</span>`:''}</div>
              </div>
              ${condBadges.length?`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;padding-left:30px">${condBadges.map(b=>`<span style="font-size:10px;padding:2px 7px;background:rgba(5,150,105,.1);border-radius:4px;color:var(--public);font-weight:600">${b}</span>`).join('')}</div>`:''}
            </div>`;}
            else { return `<div style="padding:10px 14px;background:var(--bg);border:1.5px solid rgba(0,0,0,.07);border-radius:12px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:${r.reasons.length?'6px':'0'}">
                <div style="width:22px;height:22px;border-radius:50%;background:var(--bg-2);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--ink-5);flex-shrink:0;font-weight:800">✗</div>
                <div style="font-size:13px;font-weight:700;color:var(--ink-4)">${r.type}</div>
              </div>
              ${r.reasons.length?`<div style="font-size:11px;color:var(--ink-5);line-height:1.7;padding-left:30px">${r.reasons.join(', ')}</div>`:''}
            </div>`;}
          }).join('')}
        </div>`;
    })()}
  </div>

  <!-- 3. 📈 시세 차익 분석 -->
  <div class="info-card" style="margin-top:14px">
    <div class="info-card-title">📈 시세 차익 분석</div>
    ${l.noMktP ? `
      <div style="padding:16px 18px;font-size:13px;color:var(--ink-4);line-height:1.6">시세 차익 기대가 어려울 수 있어요.<br>주변 시세 정보가 아직 없어요.</div>
      <div class="gap-chart" id="det-gap-chart">
        <div class="gap-bar-row">
          <div class="gap-bar-label">분양가</div>
          <div class="gap-bar-track"><div class="gap-bar-fill" id="bar-sale" style="background:var(--accent)"></div></div>
          <div class="gap-bar-val">${(saleP/10000).toFixed(1)}억</div>
        </div>
        <div class="gap-bar-row">
          <div class="gap-bar-label">주변 시세</div>
          <div class="gap-bar-track" style="background:var(--bg-2);display:flex;align-items:center;justify-content:center">
            <span style="font-size:9px;font-weight:600;color:var(--ink-5);text-align:center">시세 정보 없음</span>
          </div>
          <div class="gap-bar-val" style="color:var(--ink-5)">—</div>
        </div>
      </div>
    ` : `
      <div class="gap-chart" id="det-gap-chart">
        <div class="gap-bar-row">
          <div class="gap-bar-label">분양가</div>
          <div class="gap-bar-track"><div class="gap-bar-fill" id="bar-sale" style="background:var(--accent)"></div></div>
          <div class="gap-bar-val">${(saleP/10000).toFixed(1)}억</div>
        </div>
        <div class="gap-bar-row">
          <div class="gap-bar-label">주변 시세</div>
          <div class="gap-bar-track"><div class="gap-bar-fill" id="bar-mkt" style="background:var(--ink-4)"></div></div>
          <div class="gap-bar-val">${(l.mktP/10000).toFixed(1)}억</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px 12px;border-top:1px solid rgba(0,0,0,.06);flex-wrap:wrap;gap:4px">
        <span style="font-size:13px;color:var(--ink-4)">시세 대비 차익</span>
        <span style="font-size:15px;font-weight:800;color:${g>0?'var(--public)':'var(--red)'}">${g>0?`약 ${fmtManwon(Math.abs(g))} 저렴해요 🎉`:`약 ${fmtManwon(Math.abs(g))} 비싸요`}</span>
      </div>
      ${(l._recentDeals&&l._recentDeals.length)?`
      <div style="border-top:1px solid rgba(0,0,0,.06);padding:10px 18px 12px">
        <div style="font-size:11px;font-weight:700;color:var(--ink-5);margin-bottom:6px;letter-spacing:.3px">📋 주변 최근 실거래 ${l._radiusUsed?`(${l._radiusUsed})`:''}</div>
        ${l._recentDeals.map(d=>{
          const p = d.price >= 10000 ? `${Math.floor(d.price/10000)}억${d.price%10000?` ${(d.price%10000).toLocaleString()}`:''}`:`${d.price.toLocaleString()}만`;
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;font-size:11px;color:var(--ink-4)">
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px">${d.name} <span style="color:var(--ink-5)">${d.size?Math.round(d.size)+'㎡':''}</span></span>
            <span style="flex-shrink:0;font-weight:600;color:var(--ink-3)">${p}</span>
            <span style="flex-shrink:0;margin-left:6px;color:var(--ink-5);font-size:10px">${d.date||''}</span>
          </div>`;
        }).join('')}
      </div>
      `:''}
    `}
    ${(l.priceFactors&&l.priceFactors.length)?`
    <div style="margin-top:0;padding:12px 18px 12px;border-top:1px solid rgba(0,0,0,.06)">
      <div style="font-size:12px;font-weight:700;color:var(--ink-4);margin-bottom:8px;letter-spacing:.3px">집값 상승 요인</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${(l.priceFactors||[]).map(f=>`
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:15px;flex-shrink:0;line-height:1">${f.icon}</span>
          <span style="font-size:12px;color:var(--ink-3);line-height:1.55">${f.text}</span>
        </div>`).join('')}
      </div>
    </div>`:''}
  </div>

  <!-- 4. 📊 당첨 예상 확률 + 🏆 가점 커트라인 -->
  ${prob!==null?`
  <div style="margin:14px 0 0;padding:14px 18px;background:linear-gradient(135deg,#EBF2FF,#DCE8FF);border:1.5px solid var(--accent-mid);border-radius:var(--r)">
    <div style="font-size:13px;font-weight:700;color:var(--accent-dark);margin-bottom:4px">내 당첨 예상 확률</div>
    ${/* ★★★ [하드코딩 — 수정 금지] 평형 선택 칩 + 전형 선택 칩 ★★★ */
    (()=>{
      // 평형 칩: compByType 또는 price에서 평형 목록 추출
      const sizeLabels = [];
      if(l.compByType){
        l.compByType.split('|').forEach(s=>{
          const m = s.match(/^([^\s]+)/);
          if(m) sizeLabels.push(m[1]);
        });
      } else if(l.price && l.price.includes('|')){
        l.price.split('|').forEach(s=>{
          const m = s.trim().match(/^([^\s]+)/);
          if(m) sizeLabels.push(m[1]);
        });
      }
      const autoMatch = l._autoMatchedSize || '';
      const defaultSize = autoMatch || (sizeLabels.length ? sizeLabels[0] : '');
      const sizeChips = sizeLabels.length > 1
        ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 8px" id="det-size-chips">`
          + sizeLabels.map(s=>`<span class="det-chip ${s===defaultSize?'det-chip-on':''}" onclick="selectSizeChip(this,'${l.id}','${s}')" data-size="${s}">${s}</span>`).join('')
          + (autoMatch && !sizeLabels.includes(autoMatch) ? '' : '')
          + `</div>`
          + (autoMatch ? `<div style="font-size:10px;color:var(--accent);margin-bottom:4px">📌 관심 평형(${[...selectedSizes].map(k=>SIZE_MAP[k]?.label||'').join(', ')}) 기준 자동 선택</div>` : '')
        : '';
      // 전형 칩: 특공 vs 일반
      const eligList = (l.elig || []).filter(e => !e.includes('기관추천'));
      const specials = eligList.filter(e => e!=='일반공급' && e!=='무순위(줍줍)');
      const typeChips = specials.length > 0
        ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 6px" id="det-type-chips">`
          + `<span class="det-chip det-chip-on" onclick="selectTypeChip(this,'${l.id}','')" data-etype="">일반공급</span>`
          + specials.map(s=>`<span class="det-chip" onclick="selectTypeChip(this,'${l.id}','${s}')" data-etype="${s}">${s}</span>`).join('')
          + `</div>` : '';
      return sizeChips + typeChips;
    })()}
    <div class="prob-gauge-wrap">
      <svg class="prob-gauge-svg" viewBox="0 0 160 100" style="height:96px">
        <path class="prob-gauge-bg" d="M20,80 A60,60 0 0,1 140,80"/>
        <path class="prob-gauge-fill" id="det-gauge-fill" d="M20,80 A60,60 0 0,1 140,80"
          stroke="${pColor(prob)}"
          stroke-dasharray="188.5"
          stroke-dashoffset="188.5"/>
        <text id="det-prob-num" class="prob-gauge-num" x="80" y="72" fill="${pColor(prob)}">${prob}%</text>
        <text x="20" y="96" fill="var(--ink-4)" style="font-size:10px;text-anchor:middle">0%</text>
        <text x="140" y="96" fill="var(--ink-4)" style="font-size:10px;text-anchor:middle">100%</text>
      </svg>
    </div>
    ${/* ★★★ [하드코딩 — 수정 금지] 확률 산출 근거 표시 ★★★ */
    l._probReason ? `<div id="det-prob-reason" style="margin-top:8px;padding:8px 12px;background:rgba(0,102,255,.06);border-radius:8px;font-size:11px;color:var(--ink-3);line-height:1.5">📐 산출 근거: ${l._probReason}</div>` : ''}
    ${(()=>{
      const tips=[];
      const nh=parseInt(P.noHomeYears||0), dep=parseInt(P.dependents||0), acc=parseInt(P.depCount||0);
      const nhPlus=Math.min(95,Math.round(Math.max(0.5,100/l.comp)*(nh+3>=5?1.5:nh+3>=3?1.2:1)*(dep>=24?1.3:dep>=12?1.1:1)*(l.type==='public'&&parseInt(P.income||0)<=4000?1.4:1)*10)/10);
      if(nhPlus>prob) tips.push({label:`지금부터 3년 무주택 유지하면`,val:nhPlus,type:'time'});
      const depScore1=Math.min(95,Math.round(Math.max(0.5,100/l.comp)*(nh>=5?1.5:nh>=3?1.2:1)*((dep+1)>=24?1.3:(dep+1)>=12?1.1:1)*(l.type==='public'&&parseInt(P.income||0)<=4000?1.4:1)*10)/10);
      if(depScore1>prob) tips.push({label:`부양가족 1명 늘어나면`,val:depScore1,type:'action'});
      if(!tips.length) return '';
      return '<div style="margin-top:8px;padding-top:10px;border-top:1px solid rgba(0,102,255,.15);display:flex;flex-direction:column;gap:6px">'
        +tips.map(t=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span style="font-size:12px;color:var(--ink-3);line-height:1.4">${t.type==='action'?'💡':'⏳'} ${t.label}</span><span style="font-size:13px;font-weight:800;color:${pColor(t.val)};white-space:nowrap">${t.val}% 올라가요</span></div>`).join('')
        +'</div>';
    })()}
  </div>`
  :/* ★★★ [하드코딩 — 수정 금지] 당첨률 CTA: 파란색 배경 + '내 당첨률 확인하기' 텍스트 ★★★ */
  `<div style="margin:14px 0 0;padding:18px 18px;background:linear-gradient(135deg,#EBF2FF,#DCE8FF);border:1.5px solid var(--accent-mid);border-radius:var(--r);cursor:pointer" onclick="openWrSheet()"><div style="font-size:14px;font-weight:800;color:var(--accent-dark);margin-bottom:12px">내 당첨률 확인하기</div><div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center"><div style="font-size:56px;font-weight:900;color:var(--accent);line-height:1;animation:qBounce 1.2s cubic-bezier(.36,.07,.19,.97) infinite">?</div><span style="font-size:13px;font-weight:600;color:var(--accent-dark)">내 조건을 입력하면 예상 당첨률을 알려드려요</span><span style="display:inline-block;margin-top:4px;padding:8px 20px;background:var(--accent);color:white;border-radius:10px;font-size:13px;font-weight:700">조건 설정하기</span></div></div>`
  /* ★★★ [하드코딩 끝] ★★★ */}
  ${l.cut?`<div class="info-card" style="margin-top:14px">
    <div class="info-card-title">🏆 가점 커트라인 비교</div>
    <div class="cut-chart" style="padding:12px 18px 12px">
      <div style="font-size:12px;color:var(--ink-4);margin-bottom:8px;line-height:1.6">내 가점 <b style="color:var(--accent)">${calcScore(P).total}점</b> vs 커트라인 <b style="color:var(--red)">${l.cut}점</b></div>
      <div class="cut-chart-bar-wrap">
        <div class="cut-chart-track">
          <div class="cut-chart-my" id="det-cut-my"></div>
          <div class="cut-chart-line" id="det-cut-line"></div>
        </div>
      </div>
      <div class="cut-chart-scores" style="margin-top:4px;flex-wrap:wrap;row-gap:2px">
        <span style="color:var(--accent)">내 가점 ${calcScore(P).total}점</span>
        <span style="color:${calcScore(P).total>=l.cut?'var(--public)':'var(--red)'};font-weight:700">${calcScore(P).total>=l.cut?`+${calcScore(P).total-l.cut}점 통과`:`${calcScore(P).total-l.cut}점 부족`}</span>
        <span style="color:var(--red)">커트라인 ${l.cut}점</span>
      </div>
    </div>
  </div>`:''}

  <!-- 5. 💰 내 자금 계획 -->
  ${P.cash?`<div class="fund-card" style="margin-top:14px">
    <div class="fund-header">💰 내 자금 계획</div>
    <div class="fund-row"><span class="fund-rl">분양가</span><span class="fund-rv">${(price/10000).toFixed(1)}억원</span></div>
    <div class="fund-row"><span class="fund-rl">계약금 (10%)</span><span class="fund-rv ${canAfford?'ok':'no'}">${(dep/10000).toFixed(1)}억 ${canAfford?'✓':'✗ 부족'}</span></div>
    <div class="fund-row"><span class="fund-rl">중도금 (60%)</span><span class="fund-rv">${(mid/10000).toFixed(1)}억 무이자대출</span></div>
    <div class="fund-row"><span class="fund-rl">필요 대출</span><span class="fund-rv ${lr<=70?'':'no'}">${(loan/10000).toFixed(1)}억 (LTV ${lr}%)</span></div>
    <div style="padding:12px 18px;background:${canAfford?'var(--public-light)':'var(--red-light)'}"><span style="font-size:13px;font-weight:700;color:${canAfford?'var(--public)':'var(--red)'}">${canAfford?`✓ 계약금 납부 가능! 월 상환 약 ${monthly.toLocaleString()}만원`:`✗ 계약금 ${Math.max(0,dep-cash).toLocaleString()}만원 부족`}</span></div>
  </div>`:''}

  <!-- 6. 청약홈 버튼 -->
  <a href="https://www.applyhome.co.kr" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:15px;background:linear-gradient(135deg,#0052CC,#0066FF);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;margin-top:14px;box-shadow:0 4px 16px rgba(0,102,255,.3)">청약홈에서 바로 신청하기</a>`;
  showScreen('detail');
  syncDetailAlarmBtn(l.id);
  // 어드민: 삭제 버튼 표시
  const detDelBtn = document.getElementById('det-delete-btn');
  if(detDelBtn) detDelBtn.style.display = isAdmin ? 'flex' : 'none';
  // 당첨률 반원 게이지 애니메이션
  setTimeout(()=>{
    if(prob!==null){
      const fill=document.getElementById('det-gauge-fill');
      if(fill){
        const total=188.5;
        const offset=total-(total*(prob/100));
        fill.style.strokeDashoffset=offset;
      }
      // 숫자 카운트업
      const numEl=document.getElementById('det-prob-num');
      if(numEl){
        let cur=0;
        const t=setInterval(()=>{
          cur+=Math.ceil(prob/20);
          if(cur>=prob){cur=prob;clearInterval(t);}
          numEl.textContent=cur+'%';
          numEl.setAttribute('fill',pColor(cur));
        },30);
      }
    }
    // 시세 바 애니메이션
    const barSale=document.getElementById('bar-sale');
    const barMkt=document.getElementById('bar-mkt');
    if(l.noMktP){
      if(barSale) barSale.style.width='70%'; // 분양가 바만 표시
    } else {
      const gapSaleP=getMaxP(l);
      const maxVal=Math.max(gapSaleP,l.mktP);
      if(barSale) barSale.style.width=(gapSaleP/maxVal*100)+'%';
      if(barMkt) barMkt.style.width=(l.mktP/maxVal*100)+'%';
    }
    // 커트라인 바 애니메이션
    if(l.cut){
      const myScore=calcScore(P).total;
      const maxScore=84;
      const myBar=document.getElementById('det-cut-my');
      const cutLine=document.getElementById('det-cut-line');
      if(myBar) myBar.style.width=(myScore/maxScore*100)+'%';
      if(cutLine) cutLine.style.left=(l.cut/maxScore*100)+'%';
    }
  }, 200);
}
/* toggleSaveFromDetail은 toggleSaveFromDetailIcon으로 대체됨 */
/* ★★★ [하드코딩 끝] ★★★ */

function toggleDetailAlarm(){
  const btn = document.getElementById('det-bell-btn');
  // 현재 보고 있는 공고 id 가져오기
  const title = document.getElementById('det-title').textContent;
  const l = listings.find(x=>x.name===title);
  if(!l) return;
  if(alarmIds.has(l.id)){
    alarmIds.delete(l.id);
    btn.classList.remove('on');
    showToast('알림을 해제했어요');
  } else {
    alarmIds.add(l.id);
    btn.classList.add('on');
    showToast('마감 전 알림을 설정했어요 🔔');
  }
}

function syncDetailAlarmBtn(id){
  const btn = document.getElementById('det-bell-btn');
  if(!btn) return;
  btn.classList.toggle('on', alarmIds.has(id));
  // 즐겨찾기 아이콘 상태 동기화
  const saveBtn = document.getElementById('det-save-btn');
  if(saveBtn){
    const isSaved = savedIds.has(parseInt(id)||id);
    saveBtn.classList.toggle('on', isSaved);
    const svg = saveBtn.querySelector('svg');
    if(svg){
      svg.setAttribute('fill', isSaved ? 'var(--gold)' : 'none');
      svg.setAttribute('stroke', isSaved ? 'var(--gold)' : 'white');
    }
  }
}

/* ★★★ [하드코딩 — 수정 금지] 상세 헤더 즐겨찾기/공유 아이콘 ★★★ */
let _detailCurrentId = null;

function toggleSaveFromDetailIcon(){
  const rawId = _detailCurrentId;
  if(!rawId) return;
  const id = parseInt(rawId) || rawId;
  const isSaved = savedIds.has(id);
  if(isSaved){
    savedIds.delete(id);
    showToast('즐겨찾기에서 뺐어요');
    if(kakaoUser?.kakaoId) sbRemoveBookmark(String(kakaoUser.kakaoId), String(id));
  } else {
    savedIds.add(id);
    showToast('즐겨찾기에 저장했어요');
    if(kakaoUser?.kakaoId) sbAddBookmark(String(kakaoUser.kakaoId), String(id));
  }
  syncDetailAlarmBtn(id);
  renderSaved();
  updateHero();
}

function shareDetail(){
  const id = _detailCurrentId;
  if(!id) return;
  const l = listings.find(x => String(x.id) === String(id));
  if(!l) return;
  const text = `[쉬운청약] ${cleanName(l.name)}\n📍 ${l.loc}\n💰 ${cardPrice(l.price)}\n📅 마감: ${l.deadline}`;
  if(navigator.share) navigator.share({title:l.name,text}).catch(()=>{});
  else if(navigator.clipboard) navigator.clipboard.writeText(text).then(()=>showToast('링크가 복사됐어요'));
}

function deleteFromDetail(){
  if(!isAdmin) return;
  const id = _detailCurrentId;
  if(!id) return;
  const l = listings.find(x => String(x.id) === String(id));
  if(!l) return;
  if(!confirm(`"${cleanName(l.name)}" 공고를 삭제하시겠어요?`)) return;
  const numId = parseInt(id) || id;
  const src = l._src || '';
  // listings에서 제거
  const idx = listings.findIndex(x => String(x.id) === String(id));
  if(idx > -1) listings.splice(idx, 1);
  // PDF 서버 공고면 서버에서도 삭제
  if(src === 'pdf'){
    fetch(LISTINGS_API, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id: numId })
    }).catch(()=>{});
  }
  // 삭제 ID 기억
  const deleted = JSON.parse(localStorage.getItem('deletedListings')||'[]');
  if(!deleted.includes(numId)){ deleted.push(numId); localStorage.setItem('deletedListings', JSON.stringify(deleted)); }
  // 홈으로 돌아가기
  renderListings();
  updateHero();
  goBack();
  showToast('공고를 삭제했어요');
}
/* ★★★ [하드코딩 끝] ★★★ */
/* ══ 상세 스와이프 ══ */
let _touchStartX = 0;
let _touchStartY = 0;

document.addEventListener('touchstart', e => {
  if(!document.getElementById('screen-detail').classList.contains('active')) return;
  _touchStartX = e.touches[0].clientX;
  _touchStartY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener('touchend', e => {
  if(!document.getElementById('screen-detail').classList.contains('active')) return;
  const dx = e.changedTouches[0].clientX - _touchStartX;
  const dy = e.changedTouches[0].clientY - _touchStartY;
  if(Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;

  const currentName = document.getElementById('det-title').textContent;
  const currentIdx = listings.findIndex(x => x.name === currentName);
  if(currentIdx === -1) return;
  if(dx < 0 && currentIdx < listings.length - 1) {
    showDetail(listings[currentIdx + 1].id, true);
  } else if(dx > 0 && currentIdx > 0) {
    showDetail(listings[currentIdx - 1].id, true);
  }
}, {passive: true});

function goBack(){
  showScreen(prevScreen);

  if(window._prevScrollY !== undefined){
    setTimeout(()=>window.scrollTo({top:window._prevScrollY, behavior:'instant'}), 50);
    window._prevScrollY = undefined;
  }
}


/* ══ 가점 ══ */
function updateScoreScreen(){
  const p=P;const{total,nhS,dS,aS}=calcScore(p);
  const hasConditions=p.noHomeYears||p.depCount||p.income||p.byear;
  if(!hasConditions){
    document.getElementById('score-total').textContent='?';
    document.getElementById('score-total').className='score-num unknown';
    document.getElementById('sc-nh').textContent='?';
    document.getElementById('sc-dp').textContent='?';
    document.getElementById('sc-ac').textContent='?';
    document.getElementById('score-grade').innerHTML='<span class="score-grade c">조건 입력 후 계산돼요</span>';
    document.getElementById('score-rows').innerHTML='<div style="padding:20px;text-align:center;color:var(--ink-4);font-size:13px">내 청약 탭에서 조건을 입력하면<br>가점을 바로 계산해드려요<br><br><button onclick="openWizard()" style="margin-top:8px;padding:10px 24px;background:var(--accent);color:white;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;">조건 입력하기</button></div>';
    document.getElementById('cutline-list').innerHTML='';
    document.getElementById('score-tips').innerHTML='<div style="padding:16px 18px;font-size:13px;color:var(--ink-4)">조건을 입력하면 맞춤 팁을 드려요</div>';
    return;
  }
  document.getElementById('score-total').className='score-num';
  countUp(document.getElementById('score-total'), total);
  document.getElementById('sc-nh').textContent=nhS;
  document.getElementById('sc-dp').textContent=dS;
  document.getElementById('sc-ac').textContent=aS;
  // 게이지 바 애니메이션
  setTimeout(()=>{
    const barNh=document.getElementById('bar-nh');
    const barDp=document.getElementById('bar-dp');
    const barAc=document.getElementById('bar-ac');
    if(barNh) barNh.style.width=(nhS/32*100)+'%';
    if(barDp) barDp.style.width=(dS/35*100)+'%';
    if(barAc) barAc.style.width=(aS/17*100)+'%';
  }, 100);
  const g=total>=60?'a':total>=40?'b':'c';
  const gt=total>=60?'🏆 상위권':total>=40?'📈 중위권':'📚 가점 쌓는 중';
  document.getElementById('score-grade').innerHTML=`<span class="score-grade ${g}">${gt}</span>`;
  document.getElementById('score-rows').innerHTML=`
    <div class="score-row"><span class="score-rl">무주택 기간 (${parseInt(p.noHomeYears||0)}년)</span><span class="score-pts">${nhS}</span><span class="score-mx">/ 32점</span></div>
    <div class="score-row"><span class="score-rl">부양가족 수 (${parseInt(p.dependents||0)}명)</span><span class="score-pts">${dS}</span><span class="score-mx">/ 35점</span></div>
    <div class="score-row"><span class="score-rl">청약통장 기간 (약 ${Math.floor(parseInt(p.depCount||0)/12)}년)</span><span class="score-pts">${aS}</span><span class="score-mx">/ 17점</span></div>
    <div class="score-row" style="background:var(--accent-light)"><span class="score-rl" style="font-weight:800;color:var(--accent)">총 가점</span><span class="score-pts" style="font-size:18px">${total}</span><span class="score-mx" style="color:var(--accent-dark)">/ 84점</span></div>`;
  document.getElementById('cutline-list').innerHTML=listings.filter(l=>!isLottoListing(l)&&l.cut>0).map(l=>{const d=total-l.cut;const ok=d>=0;return`<div class="cut-row" onclick="showDetail('${l.id}')"><div class="cut-name">${cleanName(l.name)}</div><div class="cut-score">${l.cut}점</div><div class="cut-diff ${ok?'ok':'no'}">${ok?`+${d}점`:`${d}점`}</div></div>`;}).join('');

  // 가점 올리기 팁 — 현재 점수 기반으로 우선순위 추천
  const nh=parseInt(p.noHomeYears||0), dep=parseInt(p.dependents||0), acc=parseInt(p.depCount||0);
  const nhRemain=32-nhS, dRemain=35-dS, aRemain=17-aS;
  const tips=[];

  // 무주택 기간 팁
  if(nhS<32){
    const nextScore=nhS+2;
    tips.push({
      icon:'🏠', cat:'무주택 기간', remain:`+${nhRemain}점 가능`,
      title: nh===0 ? '무주택 기간을 쌓기 시작하세요' : `${nh+2}년이 되면 +2점 추가돼요`,
      desc: nh===0
        ? '만 30세부터 무주택 기간이 인정돼요. 지금부터 무주택을 유지하면 2년마다 2점씩 올라요.'
        : `현재 ${nh}년 무주택이에요. 무주택을 계속 유지하면 2년마다 2점씩 최대 32점까지 올라가요.`,
      gain: nhRemain
    });
  }

  // 부양가족 팁
  if(dS<35){
    tips.push({
      icon:'👨‍👩‍👧', cat:'부양가족', remain:`+${dRemain}점 가능`,
      title: dep===0 ? '부양가족이 가장 빠른 가점 상승 방법이에요' : `부양가족 1명 추가 시 +5점`,
      desc: dep===0
        ? '배우자, 자녀, 직계존속(부모·조부모)이 부양가족으로 인정돼요. 1명당 5점, 최대 35점(6명 이상)까지 올라가요.'
        : `현재 ${dep}명이에요. 부양가족 1명 추가 시 +5점, ${Math.ceil(dRemain/5)}명 더 늘면 최대점수에 도달해요.`,
      gain: dRemain
    });
  }

  // 청약통장 팁
  if(aS<17){
    const yrsNeeded=15-Math.floor(acc/12);
    tips.push({
      icon:'🏦', cat:'청약통장 기간', remain:`+${aRemain}점 가능`,
      title: acc===0 ? '청약통장을 지금 당장 개설하세요' : `${yrsNeeded}년 후 최고점 17점 달성`,
      desc: acc===0
        ? '청약통장은 가입 기간이 길수록 유리해요. 지금 바로 개설하면 2년 후 +3점, 15년 이상이면 최고 17점이에요.'
        : `현재 납입 ${acc}회(약 ${Math.floor(acc/12)}년)예요. 매월 꾸준히 납입하면 15년(180회) 후 최고 17점이에요. 월 2만원 이상 납입을 유지하세요.`,
      gain: aRemain
    });
  }

  // 가장 올리기 쉬운 순으로 정렬
  tips.sort((a,b)=>b.gain-a.gain);

  document.getElementById('score-tips').innerHTML = tips.length
    ? tips.map(t=>`
      <div style="padding:14px 18px;border-bottom:1px solid rgba(0,0,0,.05)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:18px">${t.icon}</span>
            <span style="font-size:13px;font-weight:700;color:var(--ink)">${t.title}</span>
          </div>
          <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;background:var(--mint-light);color:#00A882;white-space:nowrap">${t.remain}</span>
        </div>
        <div style="font-size:12px;color:var(--ink-4);line-height:1.65;padding-left:26px">${t.desc}</div>
      </div>`).join('')
    : `<div style="padding:16px 18px;font-size:13px;color:var(--ink-4)">🎉 모든 항목 만점이에요!</div>`;
}

/* ══ 캘린더 ══ */
function renderCalendar(){
  const mn=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  document.getElementById('cal-mo').textContent=`${calYear}년 ${mn[calMonth]}`;
  const fd=new Date(calYear,calMonth,1).getDay(),days=new Date(calYear,calMonth+1,0).getDate(),today=new Date();
  const em={};
  listings.forEach(l=>{[[l.aS,'ac'],[l.aE,'ug'],[l.aD,'an']].forEach(([ds,type])=>{if(!ds)return;const d=new Date(ds);if(d.getFullYear()===calYear&&d.getMonth()===calMonth){const k=d.getDate();if(!em[k])em[k]=[];em[k].push({type,l});}});});
  let h='';
  for(let i=0;i<fd;i++)h+='<div class="cal-day empty"></div>';
  for(let d=1;d<=days;d++){
    const isTd=today.getFullYear()===calYear&&today.getMonth()===calMonth&&today.getDate()===d;
    const dow=new Date(calYear,calMonth,d).getDay();
    const ev=em[d]||[];const dots=[...new Set(ev.map(e=>e.type))];
    h+=`<div class="cal-day ${isTd?'today':''} ${dow===0?'sun':dow===6?'sat':''}" onclick="showCalEvs(${d})"><div class="cal-dn">${d}</div>${dots.slice(0,2).map(t=>`<div class="cal-dot ${t}"></div>`).join('')}</div>`;
  }
  document.getElementById('cal-days').innerHTML=h;
  showCalEvs(today.getDate());
}
function showCalEvs(day){
  const evs=[];
  listings.forEach(l=>{[[l.aS,'ac','접수 시작'],[l.aE,'ug','접수 마감'],[l.aD,'an','당첨 발표']].forEach(([ds,type,label])=>{if(!ds)return;const d=new Date(ds);if(d.getFullYear()===calYear&&d.getMonth()===calMonth&&d.getDate()===day)evs.push({type,label,l});});});
  const el=document.getElementById('cal-evs');
  if(!evs.length){el.innerHTML=`<div style="padding:20px;text-align:center;color:var(--ink-5);font-size:13px">${day}일에 예정된 일정이 없어요</div>`;return;}
  el.innerHTML=`<div style="font-size:13px;font-weight:700;color:var(--ink-4);margin-bottom:8px">${calMonth+1}월 ${day}일 일정</div>`+evs.map(e=>`<div class="cal-ev" onclick="showDetail(${e.l.id})"><div class="cal-ev-dot ${e.type}"></div><div><div class="cal-ev-name">${cleanName(e.l.name)}</div><div class="cal-ev-type">${e.label}</div></div><div class="cal-ev-d">${daysText(e.l.days,'remain')}</div></div>`).join('');
}
function changeMonth(d){calMonth+=d;if(calMonth>11){calMonth=0;calYear++;}if(calMonth<0){calMonth=11;calYear--;}renderCalendar();}

/* ══ 즐겨찾기 ══ */
function renderSaved(){
  const c=document.getElementById('saved-container');
  const sv=listings.filter(l=>savedIds.has(l.id));
  if(!sv.length){c.innerHTML=`<div class="empty-state"><div class="empty-icon">🔖</div><div class="empty-title">아직 저장된 공고가 없어요</div><div class="empty-sub">관심 있는 공고의 북마크 버튼을
눌러 저장해보세요</div><button onclick="showScreen('home')" style="margin-top:24px;padding:13px 32px;background:var(--accent);color:white;border:none;border-radius:14px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,102,255,.3);">공고 보러 가기</button></div>`;return;}
  /* ★★★ [하드코딩 — 수정 금지] 즐겨찾기: D-0 뱃지 제거 ★★★ */
  c.innerHTML=`<div class="listings" style="padding:16px 20px 0">${sv.map(l=>{const bmSVG=`<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;return`<div class="card" onclick="showDetail('${l.id}')"><div class="card-top"><div class="card-badges">${typeBadge(l)}</div><button class="bm-btn saved" onclick="toggleSave(event,${l.id})">${bmSVG}</button></div><div class="card-name">${cleanName(l.name)}</div><div class="card-loc">📍 ${l.loc}</div>${gapPill(l)}<div class="card-sep"></div><div class="card-meta"><div><div class="meta-label">분양가</div><div class="meta-val">${cardPrice(l.price)}</div></div><div style="text-align:right"><div class="meta-label">마감</div><div class="meta-val ${l.days!==null&&l.days<=3?'hot urgent':(l.days<=7?'hot':'')}">${daysText(l.days)}</div></div></div></div>`;}).join('')}</div>`;
}

/* ══ 컨설팅 ══ */
function updateConsult(){
  const pl=document.getElementById('prob-list');
  const hasConditions = P.noHomeYears || P.depCount || P.income || P.byear;
  if(!hasConditions){pl.innerHTML='<div style="padding:24px;text-align:center;color:var(--ink-4);font-size:13px">조건을 먼저 설정해주세요</div>';return;}
  pl.innerHTML=listings.filter(l=>!isLottoListing(l)).map(l=>{const prob=calcProb(l,P)||0,pc=pClass(prob);return`<div class="prob-item" onclick="showDetail('${l.id}')"><div class="prob-item-top"><span class="prob-name">${cleanName(l.name)}</span><span class="prob-pct ${pc}">${prob}%</span></div><div class="prob-bar-wrap"><div class="prob-bar ${pc}" style="width:${Math.min(100,prob*2)}%"></div></div><div class="prob-sub">📍 ${l.loc} · 경쟁률 약 ${l.comp}:1</div>${l._probReason?`<div style="font-size:10px;color:var(--ink-5);margin-top:2px;padding-left:2px">📐 ${l._probReason}</div>`:''}</div>`;}).join('');
}

/* ══ 당첨 시뮬레이터 ══ */
function updateSimulator(){
  const nh  = parseInt(document.getElementById('sim-nh')?.value  || 0);
  const dep = parseInt(document.getElementById('sim-dep')?.value || 0);
  const acc = parseInt(document.getElementById('sim-acc')?.value || 0);

  document.getElementById('sim-nh-val').textContent  = nh  + '년';
  document.getElementById('sim-dep-val').textContent = dep + '명';
  document.getElementById('sim-acc-val').textContent = acc + '회';

  // 가점 계산
  const nhT  = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32];
  const nhS  = nhT[Math.min(nh, 16)];
  const dS   = Math.min(35, dep * 5 + 5);
  const yr   = Math.floor(acc / 12);
  const aT   = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  const aS   = aT[Math.min(yr, 15)] || 2;
  const total = nhS + dS + aS;

  const scoreEl = document.getElementById('sim-score');
  if(scoreEl) scoreEl.innerHTML = `${total}<span style="font-size:14px;font-weight:500;color:var(--ink-4)"> / 84점</span>`;

  // 커트라인 통과 공고
  const simP = { noHomeYears: nh, dependents: dep, depCount: acc,
                 isNoHome: true, income: P.income, byear: P.byear,
                 children: P.children, childDates: P.childDates,
                 marriage: P.marriage, marriageYear: P.marriageYear,
                 household: P.household, accYears: Math.floor(acc/12),
                 isDual: P.isDual, prefSizes: P.prefSizes };

  const passing = listings.filter(l => !isLottoListing(l) && l.cut > 0 && total >= l.cut);
  const passEl  = document.getElementById('sim-pass');
  if(passEl) passEl.innerHTML = `${passing.length}<span style="font-size:14px;font-weight:500;color:var(--ink-4)">건</span>`;

  const listEl = document.getElementById('sim-pass-list');
  if(listEl){
    if(passing.length === 0){
      const shortfall = listings.filter(l => !isLottoListing(l) && l.cut > 0)
        .sort((a,b) => (a.cut - total) - (b.cut - total))[0];
      listEl.innerHTML = shortfall
        ? `<div style="font-size:12px;color:var(--ink-4);padding:4px 2px">가장 가까운 공고: <b style="color:var(--ink-3)">${cleanName(shortfall.name)}</b> — ${shortfall.cut - total}점 부족</div>`
        : '';
    } else {
      listEl.innerHTML = passing.slice(0,3).map(l =>
        `<div onclick="showDetail('${l.id}')" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--public-light);border-radius:10px;cursor:pointer">
          <span style="font-size:12px;font-weight:700;color:var(--public)">${cleanName(l.name)}</span>
          <span style="font-size:11px;color:var(--public)">+${total - l.cut}점 여유</span>
        </div>`).join('');
    }
  }
}

function applySimToCondition(){
  const nh  = parseInt(document.getElementById('sim-nh')?.value  || 0);
  const dep = parseInt(document.getElementById('sim-dep')?.value || 0);
  const acc = parseInt(document.getElementById('sim-acc')?.value || 0);
  P.noHomeYears = String(nh);
  P.dependents  = dep;
  P.depCount    = String(acc);
  P.accYears    = String(Math.floor(acc / 12));
  updateHero(); renderListings(); updateConsult(); updateMyCondCard(); updateScoreScreen();
  showToast('조건이 업데이트됐어요 ✓');
  showScreen('my');
}

// 컨설팅 탭 진입 시 슬라이더 현재 조건으로 초기화
function initSimulator(){
  const nhEl  = document.getElementById('sim-nh');
  const depEl = document.getElementById('sim-dep');
  const accEl = document.getElementById('sim-acc');
  if(!nhEl) return;
  nhEl.value  = Math.min(15, parseInt(P.noHomeYears || 0));
  depEl.value = Math.min(6,  parseInt(P.dependents  || 0));
  accEl.value = Math.min(180,parseInt(P.depCount    || 0));
  updateSimulator();
}

/* ══ 프리미엄 리포트 ══ */
/* ══ AI 리포트 인터뷰 + 생성 ══ */
const REPORT_QUESTIONS = [
  {
    id: 'experience',
    q: '청약을 넣어본 적 있어요?',
    sub: '경험에 맞는 전략을 추천해드려요',
    options: [
      { label: '처음이에요', desc: '청약 신청 경험 없음', value: 'first' },
      { label: '낙첨 경험 있어요', desc: '신청했지만 당첨 안 됨', value: 'failed' },
      { label: '당첨 이력 있어요', desc: '이전에 당첨된 적 있음', value: 'won' },
    ]
  },
  {
    id: 'live',
    q: '지금 어디 살고 계세요?',
    sub: '거주지에 따라 1순위 자격이 달라져요',
    options: [
      { label: '서울', desc: '서울 거주', value: 'seoul' },
      { label: '경기 · 인천', desc: '수도권 거주', value: 'gyeonggi' },
      { label: '그 외 지역', desc: '지방 거주', value: 'other' },
    ]
  },
  {
    id: 'risk',
    q: '청약 성향은 어떤 편이에요?',
    sub: '공격적일수록 경쟁률 높은 단지를 추천해요',
    options: [
      { label: '안정적으로', desc: '경쟁률 낮고 확실한 곳', value: 'safe' },
      { label: '어느 정도 도전', desc: '경쟁률 10~30:1 수준', value: 'mid' },
      { label: '공격적으로', desc: '경쟁률 높아도 좋은 곳', value: 'bold' },
    ]
  },
  {
    id: 'loan',
    q: '대출을 얼마나 활용할 수 있어요?',
    sub: '자금 계획과 추천 공고 가격대에 반영돼요',
    options: [
      { label: '최소화', desc: '가급적 대출 없이', value: 'min' },
      { label: '적당히', desc: '분양가 40~50% 이내', value: 'mid' },
      { label: '최대한', desc: '가능한 한 많이', value: 'max' },
    ]
  },
  {
    id: 'wait',
    q: '입주까지 기다릴 수 있는 기간은요?',
    sub: '청약 후 실입주까지 보통 2~3년 걸려요',
    options: [
      { label: '1년 이내', desc: '당장 입주 가능한 곳만', value: '1' },
      { label: '2~3년', desc: '신축 분양도 가능', value: '3' },
      { label: '5년 이상', desc: '장기 투자도 고려', value: '5' },
    ]
  },
  {
    id: 'priority',
    q: '가장 중요한 우선순위는 뭐예요?',
    sub: '이에 맞는 공고를 우선 추천해드려요',
    options: [
      { label: '시세차익', desc: '나중에 팔았을 때 수익', value: 'profit' },
      { label: '실거주', desc: '편하게 오래 살 집', value: 'live' },
      { label: '학군', desc: '자녀 교육 환경', value: 'school' },
      { label: '교통', desc: '출퇴근 편의성', value: 'transit' },
    ]
  },
  {
    id: 'work',
    q: '주요 출퇴근 지역은 어디예요?',
    sub: '통근 거리를 고려한 지역을 추천해요',
    options: [
      { label: '강남 · 서초', value: 'gangnam' },
      { label: '여의도 · 마포', value: 'yeouido' },
      { label: '강북 · 도심', value: 'CBD' },
      { label: '경기 · 기타', value: 'etc' },
    ]
  },
  {
    id: 'unsold',
    q: '미분양 단지도 고려할 수 있어요?',
    sub: '선착순 계약 공고 추천 여부에 반영돼요',
    options: [
      { label: '괜찮아요', desc: '입지 좋으면 고려 가능', value: 'yes' },
      { label: '신중하게', desc: '이유가 있으면 고려', value: 'maybe' },
      { label: '피하고 싶어요', desc: '정식 청약만 선호', value: 'no' },
    ]
  },
];

let _reportAnswers = {};
let _reportStep    = 0;

function openPremReport(){
  const hasConditions = P.noHomeYears || P.depCount || P.income || P.byear;
  if(!hasConditions){
    showToast('먼저 내 조건을 설정해주세요');
    showScreen('my');
    setTimeout(()=>openWizard(), 300);
    return;
  }
  // 하루 1회 제한 — 캐시 있으면 바로 표시
  const today    = new Date().toISOString().slice(0, 10);
  const lastUsed = localStorage.getItem('report_last_used');
  const cached   = localStorage.getItem('report_cached');
  if(lastUsed === today && cached){
    _openReportOv();
    _showReportResult(cached, true);
    return;
  }
  // 인터뷰 시작
  _reportAnswers = {};
  _reportStep    = 0;
  _openReportOv();
  _showIntro();
}

function _openReportOv(){
  const ov = document.getElementById('report-ov');
  ov.style.display = 'flex';
  ov.style.flexDirection = 'column';
  document.getElementById('report-interview').style.display = 'block';
  document.getElementById('report-loading').style.display  = 'none';
  document.getElementById('report-content').style.display  = 'none';
  document.getElementById('report-prog-wrap').style.display = 'none';
  document.getElementById('report-headline').textContent   = '';
  document.getElementById('report-sub').textContent        = '';
  document.getElementById('report-nav-title').textContent  = '';
}

function _showIntro(){
  const name = P.name || '고객';
  const el   = document.getElementById('report-interview');
  // 인트로 라인들 — 순차 페이드인
  const lines = [
    { text: `${name}님을 위한`, delay: 0.1 },
    { text: '맞춤 청약 전략을', delay: 0.55 },
    { text: '분석해드릴게요.', delay: 1.0 },
  ];
  el.innerHTML = `
    <div style="display:flex;flex-direction:column;justify-content:flex-end;min-height:60vh;padding-bottom:40px">
      <div style="margin-bottom:32px">
        ${lines.map(l => `
          <div class="intro-line" style="animation-delay:${l.delay}s;font-size:28px;font-weight:900;color:var(--ink);letter-spacing:-.6px;line-height:1.4;margin-bottom:2px">
            ${l.text}
          </div>`).join('')}
        <div class="intro-line" style="animation-delay:1.5s;margin-top:14px;font-size:14px;color:var(--ink-4);line-height:1.7">
          더 정확한 분석을 위해<br>몇 가지 여쭤볼게요.
        </div>
      </div>
      <button class="intro-btn" onclick="_startInterview()"
        style="animation-delay:2s;width:100%;padding:16px;background:var(--accent);color:white;border:none;border-radius:16px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,102,255,.3);letter-spacing:-.2px">
        시작하기
      </button>
    </div>`;
}

function _startInterview(){
  document.getElementById('report-prog-wrap').style.display = 'block';
  document.getElementById('report-nav-title').textContent   = '1 / ' + REPORT_QUESTIONS.length;
  _renderQuestion(0);
}

function _renderQuestion(step){
  const q      = REPORT_QUESTIONS[step];
  const total  = REPORT_QUESTIONS.length;
  const pct    = Math.round((step / total) * 100);
  document.getElementById('report-prog').style.width = pct + '%';
  document.getElementById('report-nav-title').textContent = `${step + 1} / ${total}`;
  document.getElementById('report-headline').textContent  = q.q;
  document.getElementById('report-sub').textContent       = q.sub;

  const el = document.getElementById('report-interview');
  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;animation:fadeUp .3s cubic-bezier(.22,1,.36,1)">
      ${q.options.map(opt => `
        <button onclick="reportAnswer('${q.id}','${opt.value}')"
          style="display:flex;align-items:center;gap:14px;padding:16px 18px;background:var(--bg-card);border:1.5px solid rgba(0,0,0,.07);border-radius:18px;cursor:pointer;text-align:left;transition:all .18s;box-shadow:0 2px 8px rgba(0,0,0,.06);width:100%">
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-.2px">${opt.label}</div>
            ${opt.desc ? `<div style="font-size:12px;color:var(--ink-4);margin-top:3px">${opt.desc}</div>` : ''}
          </div>
          <svg style="margin-left:auto;flex-shrink:0;color:var(--ink-5)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>`).join('')}
    </div>`;
}

function reportAnswer(qId, value){
  _reportAnswers[qId] = value;
  _reportStep++;
  if(_reportStep < REPORT_QUESTIONS.length){
    _renderQuestion(_reportStep);
  } else {
    // 모든 질문 완료 → 데이터 조회 + 리포트 생성
    document.getElementById('report-prog').style.width = '100%';
    document.getElementById('report-interview').style.display = 'none';
    document.getElementById('report-loading').style.display   = 'flex';
    document.getElementById('report-headline').textContent    = '리포트 작성 중...';
    document.getElementById('report-sub').textContent         = '';
    document.getElementById('report-nav-title').textContent   = 'AI 청약 전략 리포트';
    document.getElementById('report-prog-wrap').style.display = 'none';
    generateReport();
  }
}

function closeReport(){
  document.getElementById('report-ov').style.display = 'none';
}

function _showReportResult(html, fromCache){
  const name  = P.name || '고객';
  const score = calcScore(P);
  document.getElementById('report-headline').textContent = `${name}님의 청약 전략 리포트`;
  document.getElementById('report-sub').textContent      = fromCache
    ? `가점 ${score.total}점 · 오늘 작성된 리포트`
    : `가점 ${score.total}점 · ${new Date().toLocaleDateString('ko-KR')} 기준`;
  document.getElementById('report-nav-title').textContent   = 'AI 청약 전략 리포트';
  document.getElementById('report-prog-wrap').style.display = 'none';
  document.getElementById('report-interview').style.display = 'none';
  document.getElementById('report-loading').style.display   = 'none';
  document.getElementById('report-content').innerHTML       = html;
  document.getElementById('report-content').style.display   = 'block';
}

async function generateReport(){
  const score    = calcScore(P);
  const types    = calcTypes(P).map(t => t.l);
  const age      = P.byear ? new Date().getFullYear() - parseInt(P.byear) : 0;
  const income   = parseInt(P.income  || 0);
  const cash     = parseInt(P.cash    || 0);
  const nh       = parseInt(P.noHomeYears || 0);
  const dep      = parseInt(P.dependents  || 0);
  const acc      = parseInt(P.depCount    || 0);
  const accYr    = parseInt(P.accYears    || 0);
  const ch       = parseInt(P.children   || 0);
  const h        = parseInt(P.household  || 3);
  const RGN_KR   = {seoul:'서울',gyeonggi:'경기',incheon:'인천',busan:'부산',
                    daejeon:'대전',sejong:'세종',daegu:'대구',gwangju:'광주',
                    ulsan:'울산',gangwon:'강원',chungnam:'충남',jeonnam:'전남'};
  const regionLabel = RGN_KR[P.region] || '미설정';
  const base100  = (URBAN_INCOME_100[Math.min(h,8)] || 721) * 12;
  const incPct   = income > 0 ? Math.round(income / base100 * 100) : 0;
  const isHot    = ['seoul','gyeonggi','incheon','sejong'].includes(P.region);
  const rank1    = isHot ? (accYr >= 2 && acc >= 24) : (accYr >= 1 && acc >= 6);
  const a        = _reportAnswers; // 인터뷰 답변

  // 매칭 공고
  const matched  = listings.filter(l =>
    !isLottoListing(l) && l.elig.some(e => types.includes(e))
  ).sort((a,b) => (a.days||999)-(b.days||999));
  const lottos   = listings.filter(l => isLottoListing(l))
    .sort((a,b) => gap(b).g - gap(a).g);

  // 실거래가 API 조회 (희망 지역 기준)
  let mktData = [];
  const msgs = [
    '인터뷰 답변을 반영하고 있어요...',
    '실거래가 데이터를 조회하고 있어요...',
    '공고를 분석하고 있어요...',
    'AI가 전략을 작성하고 있어요...',
  ];
  let mi = 0;
  const msgTimer = setInterval(() => {
    const el = document.getElementById('report-loading-msg');
    if(el) el.textContent = msgs[Math.min(mi++, msgs.length - 1)];
  }, 1800);

  // 실거래가 조회 시도 (매칭 공고 상위 3개)
  try {
    const targets = matched.slice(0, 3);
    const results = await Promise.all(targets.map(async l => {
      try {
        const res = await fetch(`${MARKET_API}?loc=${encodeURIComponent(l.loc)}&size=84&name=${encodeURIComponent(cleanName(l.name))}&radius=0.5`);
        const d   = await res.json();
        return { name: cleanName(l.name), mktP: d.mktP || 0, deals: (d.recentDeals||[]).slice(0,2) };
      } catch(e){ return null; }
    }));
    mktData = results.filter(Boolean);
  } catch(e){}

  // Claude API 프롬프트 구성
  const mktStr = mktData.map(m =>
    `- ${m.name}: 시세 ${m.mktP > 0 ? (m.mktP/10000).toFixed(1)+'억' : '정보없음'}` +
    (m.deals.length ? ` (최근 실거래: ${m.deals.map(d => `${Math.round(d.price/10000*10)/10}억`).join(', ')})` : '')
  ).join('\n');

  const matchedStr = matched.slice(0,5).map(l => {
    const g = gap(l);
    return `- ${cleanName(l.name)} / ${l.loc} / 분양가 ${cardPrice(l.price)} / 마감 ${daysText(l.days,'remain')} / 경쟁률 ${l.comp}:1 / 시세차익 ${g.g>0?fmtManwon(g.g):'정보없음'} / 전형: ${l.elig.join(',')}`;
  }).join('\n');

  const lottoStr = lottos.slice(0,3).map(l => {
    const g = gap(l);
    return `- ${cleanName(l.name)} / ${l.loc} / 분양가 ${cardPrice(l.price)} / 시세차익 ${g.g>0?fmtManwon(g.g):'정보없음'}`;
  }).join('\n');

  const expLabel    = {first:'청약 처음', failed:'낙첨 경험 있음', won:'당첨 이력 있음'}[a.experience] || '미응답';
  const liveLabel   = {seoul:'서울 거주', gyeonggi:'경기·인천 거주', other:'지방 거주'}[a.live || a.region] || '미응답';
  const riskLabel   = {safe:'안정적', mid:'적당히 도전', bold:'공격적'}[a.risk] || '미응답';
  const loanLabel   = {min:'최소화(가급적 대출 없이)', mid:'적당히(분양가 40~50%)', max:'최대한 활용'}[a.loan] || '미응답';
  const waitLabel   = {1:'1년 이내', 3:'2~3년', 5:'5년 이상'}[a.wait] || '미응답';
  const priorLabel  = {profit:'시세차익 우선', live:'실거주 우선', school:'학군 우선', transit:'교통 우선'}[a.priority] || '미응답';
  const workLabel   = {gangnam:'강남·서초', yeouido:'여의도·마포', CBD:'강북·도심', etc:'경기·기타'}[a.work] || '미응답';
  const unsoldLabel = {yes:'미분양 OK', maybe:'신중하게 고려', no:'미분양 제외'}[a.unsold] || '미응답';

  // 저축 목표 계산
  const targetPrice  = matched.length > 0 ? getMaxP(matched[0]) : 50000;
  const depositNeeded = Math.round(targetPrice * 0.1);
  const savingsGap    = Math.max(0, depositNeeded - cash);
  const monthlyNeeded = savingsGap > 0 ? Math.round(savingsGap / 24) : 0; // 2년 목표

  // 대출 시뮬레이션
  const ltvMap = {min: 0.3, mid: 0.5, max: a.loan === 'max' ? (isHot ? 0.5 : 0.7) : 0.5};
  const ltv    = ltvMap[a.loan] || 0.5;
  const maxAffordable = cash > 0 ? Math.round(cash / (1 - ltv) / 10000) * 10000 : 0;

  // 청약 일정 타임라인
  const upcomingSchedule = matched.slice(0,5).map(l =>
    `- ${cleanName(l.name)}: 접수 ${l.aS||'미정'}~${l.aE||'미정'}, 발표 ${l.aD||'미정'}, 마감 ${daysText(l.days,'remain')}`
  ).join('\n');

  const prompt = `청약 전문 컨설턴트예요. 아래 조건으로 맞춤 전략 리포트를 작성해주세요. "~해요" 체로 친근하게, 결론 먼저, 숫자 근거 필수.

[고객] 만 ${age}세 / ${P.marriage||'미혼'} / 가점 ${score.total}점 / ${P.isNoHome?'무주택 '+nh+'년':'유주택'} / 소득 ${income.toLocaleString()}만원(${incPct}%) / 현금 ${cash.toLocaleString()}만원 / 통장 ${acc}회(${rank1?'1순위':'2순위'}) / 전형: ${types.join(',')||'없음'}
[답변] 경험:${expLabel} / 거주:${liveLabel} / 성향:${riskLabel} / 대출:${loanLabel} / 대기:${waitLabel} / 우선:${priorLabel} / 출퇴근:${workLabel} / 미분양:${unsoldLabel}
[공고] ${matchedStr||'없음'}
[로또] ${lottoStr||'없음'}
[자금] 계약금가능:${(cash*10).toLocaleString()}만원이하 / 부족액:${savingsGap.toLocaleString()}만원 / 월${monthlyNeeded.toLocaleString()}만원씩 2년

5개 섹션, [SECTION:제목] 형식:
[SECTION:지금 내 상황 진단] 2~3문장, 솔직하게
[SECTION:이 공고 넣으세요] 매칭 공고 중 1~2개, 추천이유+리스크+결론
[SECTION:로또청약 기회] 무순위 공고, 없으면 "이번 주는 없어요"
[SECTION:대출·저축 전략] 가능 대출 종류+한도, 월 저축 목표액
[SECTION:오늘 할 일] 번호 목록 3~5개`;

  try {
    const res = await fetch('https://chengyak-proxy.vercel.app/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    clearInterval(msgTimer);
    const data = await res.json();
    const text = data.content?.map(c => c.text || '').join('') || '';
    if(!text) throw new Error('응답이 없어요');
    const html = renderReportText(text);
    // 캐시 저장
    const today2 = new Date().toISOString().slice(0, 10);
    localStorage.setItem('report_last_used', today2);
    localStorage.setItem('report_cached', html);
    _showReportResult(html, false);
  } catch(e) {
    clearInterval(msgTimer);
    document.getElementById('report-loading').style.display = 'none';
    document.getElementById('report-content').style.display = 'block';
    document.getElementById('report-content').innerHTML = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:40px;margin-bottom:16px">😥</div>
        <div style="font-size:16px;font-weight:700;color:var(--ink);margin-bottom:8px">리포트 생성에 실패했어요</div>
        <div style="font-size:13px;color:var(--ink-4);margin-bottom:20px">${e.message}</div>
        <button onclick="generateReport()" style="padding:12px 28px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">다시 시도</button>
      </div>`;
  }
}

function renderReportText(text){
  const sections = text.split(/\[SECTION:([^\]]+)\]/).filter(s => s.trim());
  let html = '';
  for(let i = 0; i < sections.length; i += 2){
    const title   = sections[i]?.trim()     || '';
    const body    = sections[i + 1]?.trim() || '';
    if(!title && !body) continue;
    const bodyHtml = body.split('\n').filter(l => l.trim()).map(l => {
      if(/^\d+\./.test(l.trim()))
        return `<div style="display:flex;gap:10px;margin:8px 0;padding:10px 12px;background:var(--accent-light);border-radius:10px"><span style="color:var(--accent);font-weight:800;flex-shrink:0">${l.match(/^\d+/)[0]}.</span><span style="font-size:13px;color:var(--ink-3);line-height:1.65">${l.replace(/^\d+\.\s*/,'')}</span></div>`;
      if(l.trim().startsWith('-'))
        return `<div style="display:flex;gap:8px;margin:6px 0"><span style="color:var(--accent);flex-shrink:0;margin-top:2px">•</span><span style="font-size:13px;color:var(--ink-3);line-height:1.65">${l.replace(/^-\s*/,'')}</span></div>`;
      return `<div style="font-size:13px;color:var(--ink-3);line-height:1.75;margin:4px 0">${l.replace(/\*\*([^*]+)\*\*/g,'<strong style="color:var(--ink)">$1</strong>')}</div>`;
    }).join('');
    html += `<div class="report-section">
      ${title ? `<div class="report-section-title">${title}</div>` : ''}
      <div class="report-section-body">${bodyHtml}</div>
    </div>`;
  }
  return html || `<div class="report-section"><div class="report-section-body">${text.replace(/\n/g,'<br>')}</div></div>`;
}



function buildReportHTML(d){
  const name = P.name || '고객';
  const { score, types, typeNames, age, nh, dep, acc, accYr, income, cash, ch,
          incPct, base100, matched, lottos, maxPrice, isHot, rank1, rank1Msg,
          nhRemain, depRemain, accRemain, potential, regionLabel } = d;

  // ── 헬퍼 ──
  const row = (label, value, color='') =>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(0,0,0,.05)">
      <span style="font-size:13px;color:var(--ink-4)">${label}</span>
      <span style="font-size:13px;font-weight:700;${color?'color:'+color:''}">${value}</span>
    </div>`;

  const tag = (text, color='var(--accent)', bg='var(--accent-light)') =>
    `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;color:${color};background:${bg};margin:3px 3px 3px 0">${text}</span>`;

  const bar = (val, max, color='var(--accent)') => {
    const pct = Math.round(val/max*100);
    return `<div style="margin-top:6px;height:6px;background:var(--bg-2);border-radius:10px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:${color};border-radius:10px;transition:width .8s"></div>
    </div>`;
  };

  const section = (emoji, title, body, delay=0) =>
    `<div class="report-section" style="animation-delay:${delay}s">
      <div class="report-section-title">${emoji} ${title}</div>
      <div class="report-section-body">${body}</div>
    </div>`;

  const card = (body) =>
    `<div style="background:var(--bg);border-radius:14px;padding:14px 16px;margin:10px 0">${body}</div>`;

  const highlight = (text) =>
    `<div style="background:var(--accent-light);border-radius:12px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--accent-dark);font-weight:600;line-height:1.65">${text}</div>`;

  const warn = (text) =>
    `<div style="background:var(--red-light);border-radius:12px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--red);font-weight:600;line-height:1.65">⚠️ ${text}</div>`;

  const good = (text) =>
    `<div style="background:var(--public-light);border-radius:12px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--public);font-weight:600;line-height:1.65">✓ ${text}</div>`;

  // ── 섹션 1: 내 청약 등급 ──────────────────────────
  const grade = score.total >= 60 ? {label:'상위권', color:'#059669', bg:'var(--public-light)', desc:'가점제 당첨 가능 구간이에요. 선호도 높은 단지도 노려볼 수 있어요.'}
              : score.total >= 45 ? {label:'중위권', color:'var(--gold)', bg:'var(--gold-light)', desc:'경쟁이 덜한 지역/단지를 공략하면 당첨 가능성이 높아요.'}
              : score.total >= 30 ? {label:'준비 중', color:'var(--accent)', bg:'var(--accent-light)', desc:'추첨제 비율이 높은 민간분양이나 로또청약을 공략하세요.'}
              : {label:'초기', color:'var(--ink-4)', bg:'var(--bg-2)', desc:'지금부터 통장 납입과 무주택 기간을 꾸준히 쌓는 게 핵심이에요.'};

  const s1 = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
      <div style="width:56px;height:56px;border-radius:18px;background:${grade.bg};display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:${grade.color};flex-shrink:0">${score.total}</div>
      <div>
        <div style="font-size:18px;font-weight:900;color:var(--ink);letter-spacing:-.4px">${grade.label} <span style="font-size:13px;font-weight:500;color:var(--ink-4)">/ 84점 만점</span></div>
        <div style="font-size:13px;color:var(--ink-4);margin-top:3px;line-height:1.5">${grade.desc}</div>
      </div>
    </div>
    ${row('무주택 기간 가점', `${score.nhS}점 / 32점`)}
    ${row('부양가족 가점', `${score.dS}점 / 35점`)}
    ${row('청약통장 가점', `${score.aS}점 / 17점`)}
    ${row('청약 순위', rank1Msg, rank1 ? 'var(--public)' : 'var(--gold)')}
    ${row('신청 가능 전형', typeNames.length ? typeNames.join(', ') : '조건 입력 필요', 'var(--accent)')}
    <div style="margin-top:12px;font-size:12px;color:var(--ink-5)">잠재 최고 가점 <b style="color:var(--ink-3)">${potential}점</b> — 지금부터 꾸준히 쌓으면 도달 가능해요</div>`;

  // ── 섹션 2: 전형별 자격 정밀 진단 ──────────────────
  const typeDetails = {
    '생애최초':    { icon:'🏠', desc:`소득 ${incPct}% — 기준(130%) ${incPct<=130?'✓ 충족':'✗ 초과'}. 세대원 전원 생애 처음 집을 사는 경우.`, ok: incPct<=130 && P.isNoHome },
    '신혼부부특공': { icon:'💑', desc:`혼인 ${P.marriageYear ? new Date().getFullYear()-parseInt(P.marriageYear) : '?'}년차. 7년 이내 ${(P.marriageYear && new Date().getFullYear()-parseInt(P.marriageYear)<=7)?'✓ 해당':'✗ 초과'}. 소득 외벌이 140% / 맞벌이 160% 이하.`, ok: P.marriage==='기혼' && P.marriageYear && (new Date().getFullYear()-parseInt(P.marriageYear))<=7 },
    '신생아특공':  { icon:'👶', desc:`만 2세 이하 자녀 보유 시 신청 가능. 소득 외벌이 150% / 맞벌이 200% 이하.`, ok: ch > 0 },
    '다자녀특공':  { icon:'👨‍👩‍👧‍👦', desc:`미성년 자녀 3명 이상. 현재 ${ch}명 ${ch>=3?'✓ 해당':'— 부족'}.`, ok: ch>=3 },
    '청년특공':    { icon:'🎓', desc:`만 ${age}세 / 만 19~39세 미혼 무주택자. ${age>=19&&age<=39&&P.marriage==='미혼'?'✓ 해당':'✗ 미해당'}.`, ok: age>=19&&age<=39&&P.marriage==='미혼'&&P.isNoHome },
    '노부모부양':  { icon:'👴', desc:`만 65세 이상 부모 3년 이상 부양. ${P.elderParent?'✓ 해당':'조건 확인 필요'}.`, ok: !!P.elderParent },
    '일반공급':    { icon:'🏢', desc:`무주택 세대구성원, 청약통장 보유. ${rank1?'1순위 ✓':'2순위 — 납입 횟수 부족'}.`, ok: P.isNoHome },
    '무순위(줍줍)': { icon:'🎰', desc:'만 19세 이상 누구나 신청 가능. 청약통장·무주택 불필요.', ok: age>=19 },
  };

  const myTypeKeys = typeNames.filter(t => typeDetails[t]);
  const s2 = myTypeKeys.length
    ? myTypeKeys.map(t => {
        const td = typeDetails[t];
        return card(`<div style="display:flex;align-items:flex-start;gap:10px">
          <span style="font-size:20px;flex-shrink:0">${td.icon}</span>
          <div>
            <div style="font-size:13px;font-weight:800;color:var(--ink);margin-bottom:4px">${t}</div>
            <div style="font-size:12px;color:var(--ink-4);line-height:1.65">${td.desc}</div>
          </div>
          <div style="margin-left:auto;flex-shrink:0;width:8px;height:8px;border-radius:50%;background:${td.ok?'var(--public)':'var(--red)'};margin-top:6px"></div>
        </div>`);
      }).join('')
    : '<div style="font-size:13px;color:var(--ink-4)">조건을 더 입력하면 전형별 자격을 진단해드려요</div>';

  // ── 섹션 3: 지금 신청할 공고 ──────────────────────
  const s3 = matched.length
    ? matched.slice(0,3).map(l => {
        const prob = calcProb(l, P) || 0;
        const g    = gap(l);
        const canAfford = cash > 0 && getMaxP(l) > 0 && cash >= getMaxP(l) * 0.1;
        return `<div onclick="closeReport();showDetail('${l.id}')" style="background:var(--bg);border-radius:14px;padding:14px 16px;margin:8px 0;cursor:pointer;border:1.5px solid ${prob>=20?'var(--public)':prob>=10?'var(--accent-mid)':'rgba(0,0,0,.07)'}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div style="font-size:14px;font-weight:800;color:var(--ink);line-height:1.3;flex:1;margin-right:8px">${cleanName(l.name)}</div>
            <div style="font-size:13px;font-weight:900;color:${pColor(prob)};flex-shrink:0">${prob}%</div>
          </div>
          <div style="font-size:12px;color:var(--ink-4);margin-bottom:8px">📍 ${l.loc} · 마감 ${daysText(l.days,'remain')}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${tag(cardPrice(l.price))}
            ${g.g>0?tag('+'+fmtManwon(g.g)+' 시세차익','#00A882','var(--mint-light)'):''}
            ${canAfford?tag('계약금 가능','var(--public)','var(--public-light)'):tag('계약금 부족','var(--red)','var(--red-light)')}
            ${l.elig.find(e=>typeNames.includes(e))?tag(l.elig.find(e=>typeNames.includes(e)),'var(--accent)','var(--accent-light)'):''}
          </div>
        </div>`;
      }).join('')
    : `<div style="font-size:13px;color:var(--ink-4);line-height:1.8;padding:4px 0">현재 ${regionLabel} 지역에 신청 가능한 진행 중 공고가 없어요.<br>희망 지역을 넓히거나 전체 공고를 확인해보세요.</div>`;

  // ── 섹션 4: 로또청약 ──────────────────────────────
  const s4 = lottos.length
    ? lottos.slice(0,3).map(l => {
        const g = gap(l);
        return `<div onclick="closeReport();showDetail('${l.id}')" style="background:var(--lotto-light);border-radius:14px;padding:14px 16px;margin:8px 0;cursor:pointer;border:1px solid rgba(109,40,217,.15)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <div style="font-size:14px;font-weight:800;color:var(--lotto)">${cleanName(l.name)}</div>
            ${g.g>0?`<div style="font-size:13px;font-weight:900;color:var(--lotto)">+${fmtManwon(g.g)}</div>`:''}
          </div>
          <div style="font-size:12px;color:var(--ink-4);margin-bottom:6px">📍 ${l.loc} · ${daysText(l.days,'remain')}</div>
          <div style="font-size:12px;color:var(--lotto);font-weight:600">✓ 누구나 신청 가능 · 청약통장 불필요</div>
        </div>`;
      }).join('')
    : '<div style="font-size:13px;color:var(--ink-4)">현재 진행 중인 로또청약이 없어요. 홈 화면에서 로또청약 탭을 확인해보세요.</div>';

  // ── 섹션 5: 가점 올리기 로드맵 ────────────────────
  const scoreItems = [];
  if(nhRemain > 0){
    const yrsTo32 = 15 - nh;
    scoreItems.push({ label:'무주택 기간', now: score.nhS, max:32, remain: nhRemain,
      tip: nh===0 ? '만 30세 또는 혼인일부터 무주택 기간이 인정돼요. 지금부터 유지하면 2년마다 2점씩 올라요.'
                 : `지금 ${nh}년이에요. ${Math.min(2,yrsTo32)}년 후 +2점, 앞으로 최대 +${nhRemain}점 가능.`,
      color:'var(--accent)' });
  }
  if(depRemain > 0){
    scoreItems.push({ label:'부양가족', now: score.dS, max:35, remain: depRemain,
      tip: dep===0 ? '배우자·직계존속(부모·조부모)·직계비속(자녀)이 인정돼요. 1명당 +5점, 최대 6명(35점)까지.'
                   : `현재 ${dep}명. 1명 추가 시 +5점. ${Math.ceil(depRemain/5)}명 더 늘면 만점 도달.`,
      color:'var(--mint)' });
  }
  if(accRemain > 0){
    scoreItems.push({ label:'청약통장', now: score.aS, max:17, remain: accRemain,
      tip: `현재 ${acc}회 납입. 매월 2만원 이상 납입하면 15년(180회) 후 17점 만점. 지금 당장 자동이체 설정하세요.`,
      color:'var(--gold)' });
  }

  const s5 = scoreItems.length
    ? scoreItems.map(item =>
        `<div style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:13px;font-weight:700;color:var(--ink)">${item.label}</span>
            <span style="font-size:12px;color:var(--ink-4)">${item.now}점 → 최대 ${item.max}점 <b style="color:${item.color}">+${item.remain}점 가능</b></span>
          </div>
          ${bar(item.now, item.max, item.color)}
          <div style="font-size:12px;color:var(--ink-4);margin-top:8px;line-height:1.65">${item.tip}</div>
        </div>`
      ).join('')
    : good('청약 가점 3개 항목 모두 만점이에요! 지금 바로 원하는 공고에 신청해보세요.');

  // ── 섹션 6: 자금 계획 ─────────────────────────────
  const loanRate   = 0.04; // 금리 4% 가정
  const ltvLimit   = isHot ? 0.5 : 0.7;
  const maxLoan    = maxPrice * ltvLimit;
  const monthly    = maxPrice > 0 ? Math.round((maxPrice - cash) * loanRate / 12) : 0;
  const deposit    = maxPrice > 0 ? Math.round(maxPrice * 0.1) : 0;
  const midterm    = maxPrice > 0 ? Math.round(maxPrice * 0.6) : 0;

  let s6 = '';
  if(cash <= 0){
    s6 = warn('보유 현금이 입력되지 않았어요. 내 조건에서 현금을 입력하면 자금 계획을 분석해드려요.');
  } else {
    const affordable = matched.filter(l => cash >= getMaxP(l) * 0.1);
    s6 = `
      ${row('보유 현금', `${cash.toLocaleString()}만원`)}
      ${row('계약금(10%) 납부 가능한 분양가', `${(cash*10).toLocaleString()}만원 이하`)}
      ${row('희망 지역 LTV 한도', `${Math.round(ltvLimit*100)}%`)}
      ${row('중도금 대출', '분양가 60% (9억 이하 무이자)')}
      <div style="margin-top:12px">
        ${affordable.length > 0
          ? good(`현재 현금으로 계약금 납부 가능한 공고 ${affordable.length}건이 있어요.`)
          : warn(`현재 현금(${cash.toLocaleString()}만원)으로 계약금을 낼 수 있는 공고가 없어요. 추가 저축이 필요해요.`)}
      </div>
      <div style="font-size:12px;color:var(--ink-4);margin-top:10px;line-height:1.7">💡 계약금은 대출이 안 돼요. 최소 분양가의 10%는 현금으로 준비해야 해요. 중도금(60%)은 집단대출을 이용할 수 있고, 잔금(30%)은 주택담보대출로 처리해요.</div>`;
  }

  // ── 섹션 7: 이달의 액션 플랜 ──────────────────────
  const actions = [];
  if(!rank1) actions.push({ icon:'🏦', title:'청약통장 자동이체 설정', desc:`매월 ${isHot?'24회':'6회'} 납입이 1순위 조건이에요. 지금 바로 자동이체를 설정하세요. 납입액은 월 2만원 이상이면 돼요.` });
  if(matched.length > 0) actions.push({ icon:'📋', title:`마감 임박 공고 확인`, desc:`${matched[0]?cleanName(matched[0].name):''} 등 ${matched.length}건이 진행 중이에요. 공고문을 직접 확인하고 자격 여부를 체크하세요.` });
  if(lottos.length > 0) actions.push({ icon:'🎰', title:'로또청약 신청', desc:`${cleanName(lottos[0].name)} 등 누구나 신청 가능한 무순위 공고가 있어요. 청약홈에서 간편하게 신청하세요.` });
  if(depRemain > 0 && dep===0) actions.push({ icon:'👨‍👩‍👧', title:'부양가족 등록 검토', desc:'부모님을 세대원으로 등록하면 부양가족 가점이 올라가요. 세대합가 전 조건을 꼭 확인하세요.' });
  if(income===0) actions.push({ icon:'📊', title:'소득 정보 입력', desc:'소득을 입력하면 신청 가능한 전형과 소득 기준 충족 여부를 정확하게 분석해드려요.' });
  actions.push({ icon:'📱', title:'청약홈 앱 설치 & 공인인증서 등록', desc:'청약홈 앱에서 청약 신청이 가능해요. 미리 공인인증서(공동인증서)를 등록해두면 마감일에 여유 있게 신청할 수 있어요.' });

  const s7 = actions.slice(0,4).map((a, i) =>
    `<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.05)">
      <div style="width:32px;height:32px;border-radius:10px;background:var(--accent-light);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${a.icon}</div>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:3px">${a.title}</div>
        <div style="font-size:12px;color:var(--ink-4);line-height:1.65">${a.desc}</div>
      </div>
    </div>`
  ).join('');

  // ── 섹션 8: 유의사항 ──────────────────────────────
  const s8 = `<div style="font-size:11px;color:var(--ink-5);line-height:1.8">
    본 리포트는 입력하신 조건을 기반으로 자동 생성된 참고용 분석이에요. 실제 청약 신청 전에 반드시 청약홈(applyhome.co.kr)의 입주자 모집공고를 확인하시고, 자격 요건은 공고문 기준으로 판단하세요. 분양가·경쟁률 등 일부 정보는 추정치일 수 있어요.
  </div>`;

  return [
    section('📊', '내 청약 등급', s1, 0),
    section('🔍', '전형별 자격 진단', s2, 0.06),
    section('🏠', '지금 신청할 수 있는 공고', s3, 0.12),
    section('🎰', '로또청약 · 무순위', s4, 0.18),
    section('📈', '가점 올리기 로드맵', s5, 0.24),
    section('💰', '자금 계획 분석', s6, 0.30),
    section('⚡', '이달의 액션 플랜', s7, 0.36),
    section('📌', '유의사항', s8, 0.42),
  ].join('');
}

function renderReport(html){
  _showReportResult(html, false);
  // 오늘 날짜 + 리포트 내용 캐시 저장
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem('report_last_used', today);
  localStorage.setItem('report_cached', html);
}

/* ══ 마이페이지 ══ */
function updateMyCondCard(){
  const p=P,el=document.getElementById('my-cond-card');
  const editBtn = document.getElementById('edit-cond-btn');
  const isCondSet = !!(p.byear || p.income || p.accYears || p.noHomeYears);
  if (editBtn) editBtn.style.display = isCondSet ? '' : 'none';
  if(!p.name&&!p.byear){el.innerHTML='<div style="font-size:13px;color:var(--ink-4);line-height:1.6">아직 아직 설정된 조건이 없어요.</div><button onclick="openWizard()" style="margin-top:14px;width:100%;padding:11px;background:var(--accent-light);color:var(--accent);border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer">조건 설정하기</button>';return;}
  const score=calcScore(p).total;
  el.innerHTML=`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${calcTypes(p).map(t=>`<span class="badge badge-public">${t.l}${t.sub?' ('+t.sub+')':''}</span>`).join('')}</div>
    <div class="cond-grid-2">
      <div><div class="cond-label">이름</div><div class="cond-val">${p.name}</div></div>
      <div><div class="cond-label">청약 가점</div><div class="cond-val" style="color:var(--accent)">${score}점</div></div>
      <div><div class="cond-label">연소득</div><div class="cond-val">${p.income?p.income+'만원':'미입력'}</div></div>
      <div><div class="cond-label">무주택 기간</div><div class="cond-val">${p.noHomeYears?p.noHomeYears+'년':'미입력'}</div></div>
    </div>
    <button onclick="openWizard()" style="margin-top:14px;padding:0;background:none;border:none;cursor:pointer;font-size:13px;font-weight:700;color:var(--accent);display:none;align-items:center;gap:4px">조건 수정하기 →</button>`;
}

/* ══ 용어사전 ══ */
function renderGlossary(data){
  const g={};data.forEach(item=>{if(!g[item.cat])g[item.cat]=[];g[item.cat].push(item);});
  return Object.entries(g).map(([cat,items])=>`<div class="glo-cat">${cat}</div>`+items.map(item=>`<div class="glo-item" onclick="this.classList.toggle('open')"><div class="glo-term">${item.term}</div><div class="glo-short">${item.short}</div><div class="glo-full">${item.full}</div></div>`).join('')).join('');
}
function showSupport(type){
  const titles={notice:'공지사항',faq:'FAQ',contact:'서비스 문의하기',ad:'광고/제휴 문의',terms:'약관/정책'};
  document.getElementById('support-title').textContent=titles[type];

  const C={
    notice:`
      <div style="display:flex;flex-direction:column">
        ${[
          {t:'[공지] 청약 공고 실시간 알림 서비스 오픈', d:'2025.03.10', hot:true},
          {t:'[업데이트] 앱 v5.5 업데이트 안내', d:'2025.03.05', hot:false},
          {t:'[안내] 개인정보처리방침 변경 안내', d:'2025.02.20', hot:false},
          {t:'[점검] 서비스 정기 점검 안내 (3/1 새벽 2~4시)', d:'2025.02.28', hot:false},
          {t:'[공지] 희망 지역 다중 선택 기능 추가', d:'2025.02.10', hot:false},
          {t:'[안내] 청약 가점 계산기 업데이트', d:'2025.01.28', hot:false},
        ].map(n=>`
          <div style="padding:16px 0;border-bottom:1px solid rgba(0,0,0,.06);cursor:pointer" onclick="showToast('준비 중이에요')">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
              ${n.hot?'<span style="font-size:11px;font-weight:700;padding:2px 7px;background:var(--accent-light);color:var(--accent);border-radius:20px">NEW</span>':''}
              <div style="font-size:14px;font-weight:600;color:var(--ink)">${n.t}</div>
            </div>
            <div style="font-size:12px;color:var(--ink-4)">${n.d}</div>
          </div>`).join('')}
      </div>
      <div style="height:100px"></div>`,

    faq:`
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[
          {q:'청약통장은 어떻게 개설하나요?', a:'가까운 은행 영업점이나 인터넷뱅킹에서 주택청약종합저축을 개설할 수 있어요. KB국민·신한·우리·하나·농협 등 주요 은행에서 가입 가능해요. 월 2만원 이상 납입하면 납입 횟수가 인정돼요.'},
          {q:'가점은 어떻게 계산되나요?', a:'무주택 기간(최대 32점) + 부양가족 수(최대 35점) + 청약통장 가입 기간(최대 17점)으로 총 84점 만점이에요. 내 청약 탭 > 가점 계산기에서 확인할 수 있어요.'},
          {q:'무순위 청약(줍줍)이란?', a:'기존 당첨자가 계약을 포기한 물량을 재분양하는 방식이에요. 만 19세 이상이면 청약통장 없이 누구나 신청 가능해요.'},
          {q:'예상 당첨률은 어떻게 계산되나요?', a:'내 조건(소득, 무주택 기간, 납입 횟수 등)과 공고의 경쟁률을 함께 분석해서 계산해요. 조건을 더 많이 입력할수록 정확해져요.'},
          {q:'희망 지역은 여러 개 선택할 수 있나요?', a:'네! 홈 화면 전체 공고 위의 희망 지역 버튼을 누르면 여러 지역을 동시에 선택할 수 있어요. 조건 설정에서도 동일하게 적용돼요.'},
        ].map((f,i)=>`
          <div style="background:var(--bg-card);border-radius:12px;border:1px solid rgba(0,0,0,.07);overflow:hidden">
            <div onclick="(function(el){const a=el.nextElementSibling;const c=el.querySelector('.faq-chev');const open=a.style.maxHeight&&a.style.maxHeight!=='0px';a.style.maxHeight=open?'0px':a.scrollHeight+'px';a.style.opacity=open?'0':'1';c.style.transform=open?'rotate(0deg)':'rotate(180deg)';})(this)" style="padding:15px 16px;font-size:14px;font-weight:600;color:var(--ink);display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:12px">
              <span>${f.q}</span>
              <span class="faq-chev" style="color:var(--ink-4);font-size:14px;flex-shrink:0;transition:transform .2s">⌄</span>
            </div>
            <div style="max-height:0;overflow:hidden;transition:max-height .3s ease,opacity .2s;opacity:0">
              <div style="padding:0 16px 15px;font-size:13px;color:var(--ink-4);line-height:1.7;border-top:1px solid rgba(0,0,0,.05)">${f.a}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="height:100px"></div>`,

    contact:`
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:20px">
          <div style="font-size:13px;color:var(--ink-4);line-height:1.8;margin-bottom:16px">서비스 이용 중 불편하신 점이나 개선 사항을 알려주세요.<br>평일 09:00~18:00 내 답변 드려요.</div>
          <div style="margin-bottom:10px">
            <div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:6px">문의 유형</div>
            <select style="width:100%;padding:11px 12px;border:1.5px solid rgba(0,0,0,.1);border-radius:10px;font-size:14px;color:var(--ink);background:var(--bg-card);outline:none">
              <option>버그/오류 신고</option>
              <option>기능 개선 제안</option>
              <option>데이터 오류 신고</option>
              <option>기타 문의</option>
            </select>
          </div>
          <div style="margin-bottom:12px">
            <div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:6px">문의 내용</div>
            <textarea placeholder="문의 내용을 자세히 입력해주세요" style="width:100%;height:130px;border:1.5px solid rgba(0,0,0,.1);border-radius:10px;padding:12px;font-size:14px;font-family:'Noto Sans KR',sans-serif;resize:none;outline:none;color:var(--ink);background:var(--bg-card)"></textarea>
          </div>
          <button onclick="showToast('문의가 접수됐어요! 영업일 기준 1~2일 안에 답변드려요')" style="width:100%;padding:14px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer">문의 보내기</button>
        </div>
        <div style="background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:18px">
          <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px">직접 연락하기</div>
          <div style="font-size:13px;color:var(--ink-4);line-height:2">이메일: support@cheongyak.app<br>운영시간: 평일 09:00 ~ 18:00 (공휴일 제외)</div>
        </div>
      </div>
      <div style="height:100px"></div>`,

    ad:`
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:20px">
          <div style="font-size:15px;font-weight:800;color:var(--ink);margin-bottom:8px">함께 성장할 파트너를 찾고 있어요</div>
          <div style="font-size:13px;color:var(--ink-4);line-height:1.8">쉬운청약은 매월 수만 명의 청약 준비자가 사용하는 서비스예요. 부동산, 금융, 인테리어, 이사 등 관련 브랜드와의 제휴를 환영해요.</div>
        </div>
        <div style="background:var(--bg-card);border-radius:14px;border:1px solid rgba(0,0,0,.07);padding:20px">
          <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:12px">제휴/광고 유형</div>
          ${['앱 내 배너 광고','공고 스폰서십','컨텐츠 제휴','데이터 파트너십'].map(t=>`<div style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,.05);font-size:13px;color:var(--ink-3)">· ${t}</div>`).join('')}
        </div>
        <div style="background:var(--accent-light);border-radius:14px;padding:18px">
          <div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:6px">문의 이메일</div>
          <div style="font-size:15px;font-weight:800;color:var(--accent)">ad@cheongyak.app</div>
        </div>
      </div>
      <div style="height:100px"></div>`,

    terms:`
      <div style="display:flex;flex-direction:column">
        ${[
          {t:'서비스 이용약관', d:'2025.01.01 시행'},
          {t:'개인정보처리방침', d:'2025.02.20 시행'},
          {t:'위치기반서비스 이용약관', d:'2024.06.01 시행'},
          {t:'청소년 보호정책', d:'2024.06.01 시행'},
          {t:'오픈소스 라이선스', d:''},
        ].map(t=>`
          <div style="padding:16px 0;border-bottom:1px solid rgba(0,0,0,.06);display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="showToast('준비 중이에요')">
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--ink)">${t.t}</div>
              ${t.d?`<div style="font-size:12px;color:var(--ink-4);margin-top:3px">${t.d}</div>`:''}
            </div>
            <span style="color:var(--ink-4);font-size:16px">›</span>
          </div>`).join('')}
      </div>
      <div style="height:100px"></div>`
  };

  document.getElementById('support-body').innerHTML = C[type] || '';
  showScreen('support');
}

function filterGlossary(){
  const q=document.getElementById('glo-inp').value.toLowerCase();
  const f=q?GLOSSARY.filter(g=>g.term.includes(q)||g.short.includes(q)):GLOSSARY;
  document.getElementById('glo-list').innerHTML=f.length?renderGlossary(f):'<div style="padding:40px;text-align:center;color:var(--ink-5)">검색 검색 결과가 없어요</div>';
}

/* ══ 화면 전환 ══ */
function showScreen(name){
  if(name==='editcond') renderEditCond();
  // 탭 바운스
  const navMap={home:'nav-home',mycond:'nav-search',consult:'nav-consult',saved:'nav-saved',my:'nav-my'};
  const navId=navMap[name];
  if(navId){
    const el=document.getElementById(navId);
    if(el){el.classList.add('bouncing');setTimeout(()=>el.classList.remove('bouncing'),350);}
  }
  // 현재 화면 스크롤 위치 저장
  const cur=document.querySelector('.screen.active');
  if(cur) scrollPositions[cur.id]=window.scrollY;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(NAVMAP[name])document.getElementById(NAVMAP[name]).classList.add('active');
  if(name==='saved')renderSaved();
  if(name==='consult')updateConsult();
  if(name==='calendar')renderCalendar();
  if(name==='score')updateScoreScreen();
  // 상세 화면 고정 CTA 표시/숨김
  const stickyCta = document.getElementById('det-sticky-cta');
  if(stickyCta) stickyCta.classList.toggle('show', name==='detail');
  if(name==='glossary')document.getElementById('glo-list').innerHTML=renderGlossary(GLOSSARY);
  if(name==='home'){
    const cheerEl=document.getElementById('hero-cheer');
    if(cheerEl) cheerEl.textContent=CHEER[Math.floor(Math.random()*CHEER.length)];
  }
  // 네비 탭 클릭 시 최상단, 상세/복귀는 유지
  const isNavTab = ['home','mycond','consult','saved','my','score','glossary','calendar','editcond'].includes(name);
  if(isNavTab){
    window.scrollTo(0, 0);
  } else {
    const savedY=scrollPositions['screen-'+name]||0;
    window.scrollTo(0, name==='detail'?0:savedY);
  }
}
function renderEditCond(){
  const p = P;
  wDep = parseInt(p.dependents||0);
  const isMarried = p.marriage==='기혼';
  document.getElementById('editcond-body').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:20px">
      <div>
        <div class="wiz-label">출생년도 / 월 / 일</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <input type="number" class="wiz-inp" id="ec-by" placeholder="1990" value="${p.byear||''}" style="flex:2" oninput="if(this.value.length>=4)document.getElementById('ec-bm').focus()"/>
          <input type="number" class="wiz-inp" id="ec-bm" placeholder="01" value="${p.bmonth||''}" style="flex:1" oninput="if(this.value.length>=2)document.getElementById('ec-bd').focus()"/>
          <input type="number" class="wiz-inp" id="ec-bd" placeholder="01" value="${p.bday||''}" style="flex:1"/>
        </div>
      </div>
      <div>
        <div class="wiz-label">혼인 여부</div>
        <div class="wiz-radio-grp" style="margin-top:8px">
          <div class="wiz-radio ${p.marriage==='미혼'?'on':''}" onclick="ecMarriage(this)">미혼</div>
          <div class="wiz-radio ${p.marriage==='기혼'?'on':''}" onclick="ecMarriage(this)">기혼</div>
          <div class="wiz-radio ${p.marriage==='이혼·사별'?'on':''}" onclick="ecMarriage(this)">이혼·사별</div>
        </div>
      </div>
      <div id="ec-marriage-year-wrap" style="display:${isMarried?'block':'none'}">
        <div class="wiz-label">혼인신고 연도</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-marriageYear" value="${p.marriageYear||''}" placeholder="예: 2022"/><span class="unit">년</span></div>
      </div>
      <div id="ec-dual-wrap" style="display:${isMarried?'block':'none'}">
        <div class="wiz-label">맞벌이 여부</div>
        <div class="wiz-radio-grp" style="margin-top:8px">
          <div class="wiz-radio ${!p.isDual?'on':''}" onclick="ecDual(this)">외벌이</div>
          <div class="wiz-radio ${p.isDual?'on':''}" onclick="ecDual(this)">맞벌이</div>
        </div>
      </div>
      <div>
        <div class="wiz-label">현재 주택 소유</div>
        <div class="wiz-radio-grp" style="margin-top:8px">
          <div class="wiz-radio ${p.isNoHome?'on':''}" onclick="wRadio(this,'homeowner')">무주택자</div>
          <div class="wiz-radio ${!p.isNoHome?'on':''}" onclick="wRadio(this,'homeowner')">1주택자</div>
          <div class="wiz-radio" onclick="wRadio(this,'homeowner')">2주택↑</div>
        </div>
      </div>
      <div>
        <div class="wiz-label">무주택 기간</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-nohome" value="${p.noHomeYears||''}" placeholder="예: 3"/><span class="unit">년</span></div>
      </div>
      <div>
        <div class="wiz-label">부양가족 수 <span style="font-size:12px;font-weight:400;color:var(--ink-4)">(본인 제외)</span></div>
        <div class="wiz-stepper" style="margin-top:8px">
          <button class="step-btn" onclick="wDep=Math.max(0,wDep-1);document.getElementById('ec-dep').textContent=wDep+'명'">−</button>
          <div class="step-val" id="ec-dep">${parseInt(p.dependents||0)}명</div>
          <button class="step-btn" onclick="wDep++;document.getElementById('ec-dep').textContent=wDep+'명'">+</button>
        </div>
      </div>
      <div>
        <div class="wiz-label">자녀 수</div>
        <div class="wiz-stepper" style="margin-top:8px">
          <button class="step-btn" onclick="ecChildren(-1)">−</button>
          <div class="step-val" id="ec-ch">${parseInt(p.children||0)}명</div>
          <button class="step-btn" onclick="ecChildren(1)">+</button>
        </div>
        <div id="ec-child-dates" style="margin-top:10px;display:flex;flex-direction:column;gap:8px"></div>
      </div>
      <div>
        <div class="wiz-label">연간 소득</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-income" value="${p.income||''}" placeholder="예: 4500"/><span class="unit">만원</span></div>
      </div>
      <div id="ec-total-income-wrap" style="display:${p.isDual?'block':'none'}">
        <div class="wiz-label">부부 합산 소득</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-totalIncome" value="${p.totalIncome||''}" placeholder="예: 8000"/><span class="unit">만원</span></div>
      </div>
      <div>
        <div class="wiz-label">보유 현금 <span style="font-size:12px;font-weight:400;color:var(--ink-4)">예·적금 포함</span></div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-cash" value="${p.cash||''}" placeholder="예: 5000"/><span class="unit">만원</span></div>
      </div>
      <div>
        <div class="wiz-label">납입 횟수</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-dc" value="${p.depCount||''}" placeholder="예: 24"/><span class="unit">회</span></div>
      </div>
      <div>
        <div class="wiz-label">납입 총액</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-da" value="${p.depAmt||''}" placeholder="예: 1500"/><span class="unit">만원</span></div>
      </div>
      <div>
        <div class="wiz-label">청약통장 가입기간</div>
        <div class="wiz-inp-unit" style="margin-top:8px"><input type="number" class="wiz-inp" id="ec-accYears" value="${p.accYears||''}" placeholder="예: 5"/><span class="unit">년</span></div>
      </div>
      <div>
        <div class="wiz-label">세대원 수</div>
        <select class="wiz-sel" id="ec-household" style="margin-top:8px" onchange="ecHouseholdChange()">
          <option value="">선택하세요</option>
          <option value="1" ${p.household==='1'?'selected':''}>1인</option>
          <option value="2" ${p.household==='2'?'selected':''}>2인</option>
          <option value="3" ${p.household==='3'?'selected':''}>3인</option>
          <option value="4" ${p.household==='4'?'selected':''}>4인</option>
          <option value="5" ${p.household==='5'?'selected':''}>5인 이상</option>
        </select>
      </div>
      <div id="ec-elder-wrap" style="display:${parseInt(p.household||0)>=2?'block':'none'}">
        <div class="wiz-label">만 65세 이상 부모 부양 여부</div>
        <div class="wiz-radio-grp" style="margin-top:8px">
          <div class="wiz-radio ${!p.elderParent?'on':''}" onclick="ecElderParent(this)">아니오</div>
          <div class="wiz-radio ${p.elderParent?'on':''}" onclick="ecElderParent(this)">예 (3년 이상 부양)</div>
        </div>
      </div>
      <div>
        <div class="wiz-label">거주 지역</div>
        <select class="wiz-sel" id="ec-region" style="margin-top:8px">
          <option value="">선택하세요</option>
          <option value="seoul" ${p.region==='seoul'?'selected':''}>서울</option>
          <option value="gyeonggi" ${p.region==='gyeonggi'?'selected':''}>경기</option>
          <option value="incheon" ${p.region==='incheon'?'selected':''}>인천</option>
          <option value="busan" ${p.region==='busan'?'selected':''}>부산</option>
          <option value="daejeon" ${p.region==='daejeon'?'selected':''}>대전</option>
          <option value="sejong" ${p.region==='sejong'?'selected':''}>세종</option>
          <option value="daegu" ${p.region==='daegu'?'selected':''}>대구</option>
          <option value="gwangju" ${p.region==='gwangju'?'selected':''}>광주</option>
          <option value="ulsan" ${p.region==='ulsan'?'selected':''}>울산</option>
          <option value="gangwon" ${p.region==='gangwon'?'selected':''}>강원</option>
          <option value="chungnam" ${p.region==='chungnam'?'selected':''}>충남</option>
          <option value="jeonnam" ${p.region==='jeonnam'?'selected':''}>전남</option>
        </select>
      </div>
    </div>`;
  ecRenderChildDates();
}
let ecChildCount = 0;
let ecChildDates = [];
function ecChildren(dir){
  ecChildCount = Math.max(0, ecChildCount + dir);
  document.getElementById('ec-ch').textContent = ecChildCount + '명';
  while(ecChildDates.length < ecChildCount) ecChildDates.push({year:'',month:''});
  ecChildDates = ecChildDates.slice(0, ecChildCount);
  ecRenderChildDatesUI();
}
function ecRenderChildDates(){
  ecChildCount = parseInt(P.children||0);
  ecChildDates = (P.childDates||[]).map(c=>({year:c.year||'',month:c.month||''})).slice(0, ecChildCount);
  while(ecChildDates.length < ecChildCount) ecChildDates.push({year:'',month:''});
  ecRenderChildDatesUI();
}
function ecRenderChildDatesUI(){
  const wrap = document.getElementById('ec-child-dates');
  if(!wrap) return;
  if(ecChildCount === 0){ wrap.innerHTML=''; return; }
  wrap.innerHTML = ecChildDates.map((c,i) => `
    <div style="display:flex;gap:6px;align-items:center">
      <span style="font-size:12px;color:var(--ink-4);min-width:50px">${i+1}번째</span>
      <input type="number" class="wiz-inp" style="flex:1" placeholder="출생년도" value="${c.year||''}" oninput="ecChildDates[${i}].year=this.value"/>
      <input type="number" class="wiz-inp" style="flex:1" placeholder="월" value="${c.month||''}" oninput="ecChildDates[${i}].month=this.value"/>
    </div>`).join('');
}
function ecMarriage(el){
  el.parentElement.querySelectorAll('.wiz-radio').forEach(r=>r.classList.remove('on'));
  el.classList.add('on');
  const isM = el.textContent==='기혼';
  document.getElementById('ec-marriage-year-wrap').style.display = isM?'block':'none';
  document.getElementById('ec-dual-wrap').style.display = isM?'block':'none';
  if(!isM) document.getElementById('ec-total-income-wrap').style.display='none';
}
function ecDual(el){
  el.parentElement.querySelectorAll('.wiz-radio').forEach(r=>r.classList.remove('on'));
  el.classList.add('on');
  const isDual = el.textContent==='맞벌이';
  document.getElementById('ec-total-income-wrap').style.display = isDual?'block':'none';
}
function ecElderParent(el){
  el.parentElement.querySelectorAll('.wiz-radio').forEach(r=>r.classList.remove('on'));
  el.classList.add('on');
}
function ecHouseholdChange(){
  const h = parseInt(document.getElementById('ec-household').value||0);
  document.getElementById('ec-elder-wrap').style.display = h>=2?'block':'none';
}

function saveEditCond(){
  P.byear      = document.getElementById('ec-by').value;
  P.bmonth     = document.getElementById('ec-bm').value;
  P.bday       = document.getElementById('ec-bd').value;
  P.noHomeYears= document.getElementById('ec-nohome').value;
  P.income     = document.getElementById('ec-income').value;
  P.cash       = document.getElementById('ec-cash').value;
  P.depCount   = document.getElementById('ec-dc').value;
  P.depAmt     = document.getElementById('ec-da').value;
  P.household  = document.getElementById('ec-household').value;
  P.dependents = wDep;
  P.accYears   = document.getElementById('ec-accYears').value;
  P.region     = document.getElementById('ec-region').value;

  // 혼인 관련
  const marriageRadio = document.querySelector('#editcond-body .wiz-radio-grp .wiz-radio.on');
  if(marriageRadio){
    const sections = document.querySelectorAll('#editcond-body .wiz-radio-grp');
    const marriageGrp = sections[0]; // first radio group is marriage
    const selM = marriageGrp.querySelector('.wiz-radio.on');
    if(selM) P.marriage = selM.textContent;
  }
  const myEl = document.getElementById('ec-marriageYear');
  P.marriageYear = myEl ? myEl.value : '';

  // 맞벌이
  const dualGrp = document.getElementById('ec-dual-wrap');
  if(dualGrp){
    const selD = dualGrp.querySelector('.wiz-radio.on');
    P.isDual = selD ? selD.textContent==='맞벌이' : false;
  }
  const totalIncEl = document.getElementById('ec-totalIncome');
  if(totalIncEl) P.totalIncome = totalIncEl.value;

  // 자녀
  P.children = ecChildCount;
  P.childDates = ecChildDates.slice(0, ecChildCount);

  // 노부모 부양
  const elderGrp = document.getElementById('ec-elder-wrap');
  if(elderGrp){
    const selE = elderGrp.querySelector('.wiz-radio.on');
    P.elderParent = selE ? selE.textContent.startsWith('예') : false;
  }

  updateHero(); renderListings(); updateConsult(); updateMyCondCard(); updateScoreScreen();
  sbSaveCondition();
  showScreen('my');
  showToast('조건이 저장됐어요 ✓');
}

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600);}
/* ══════════════════════════════════════
   청약홈 공공데이터 API 연동
   Base URL: api.odcloud.kr/api
   APT 분양정보:         /15098547/v1/uddi:...
   APT 잔여세대(줍줍):   /15098548/v1/uddi:...
   APT 경쟁률:           /15098905/v1/uddi:...

   ※ 브라우저 CORS 우회: chengyak-proxy-okmj.vercel.app
   ※ 실서비스 시 자체 백엔드(Node.js 등)로 교체 필요
   ※ 인증키: Decoding 키 사용 (이미지의 '일반 인증키')
══════════════════════════════════════ */

let apiKey = 'b4584f7c0ecade0209ebced7ab8fd3195c0a0a397fbab62084ceb5c8638b0b51';
let apiConnected = false;
let liveListings = [];
let sheetPrices = {}; // 단지명 → {price, minP, mktP, factors}

// 공식 엔드포인트 (api.odcloud.kr 기반)
const API_APT    = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail';
const API_LOTTO  = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancDetail';
const API_CMPET  = 'https://api.odcloud.kr/api/ApplyhomeInfoCmpetRtSvc/v1/getAPTLttotPblancCmpet'; // 경쟁률
const API_SCORE  = 'https://api.odcloud.kr/api/ApplyhomeInfoCmpetRtSvc/v1/getAptLttotPblancScore'; // 당첨가점
const PROXY = 'https://chengyak-proxy.vercel.app/api/proxy?url=';

/* ── 구글 시트 연동 ── */
async function loadSheetFactors(){
  const SHEET_ID = '1_ertTMrEFvNp83YkKY64XZ325kOUW3RgzcKKcV39ro0';
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet2`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.replace(/^.*?({.*}).*?$/s, '$1'));
    json.table.rows.forEach(row => {
      const name       = row.c[0]?.v ? String(row.c[0].v).trim() : '';
      const price      = row.c[1]?.v?.trim() || '';
      const minP       = parseInt(row.c[2]?.v) || 0;
      const mktPRaw    = row.c[3]?.v;
      const mktP       = (mktPRaw && String(mktPRaw).trim() !== '-') ? (parseInt(mktPRaw) || 0) : 0;
      const factorsRaw = row.c[4]?.v ? String(row.c[4].v).trim() : '';
      const factors    = factorsRaw
        ? factorsRaw.split('|').map(f => {
            const trimmed = f.trim();
            const spaceIdx = trimmed.indexOf(' ');
            if(spaceIdx === -1) return null;
            const icon = trimmed.slice(0, spaceIdx).trim();
            const text = trimmed.slice(spaceIdx + 1).trim();
            return {icon, text};
          }).filter(f => f && f.icon && f.text)
        : [];
      if(!name) return;
      sheetPrices[name] = {price, minP, mktP, factors};
    });
    const keys = Object.keys(sheetPrices);
    console.log('✓ 시트 로드:', keys);
  } catch(e) { console.warn('시트 로드 실패:', e.message); }
}
  
/* ── 국토부 실거래가 시세 자동 조회 ── */
const MARKET_API = 'https://chengyak-proxy.vercel.app/api/market-price';

/* ── 시세 캐시 (localStorage) — 영구 보존, 새 공고만 신규 조회 ── */
const MKTPCACHE_KEY = 'mktPCache_v3';

function loadMktPCache() {
  try {
    const raw = localStorage.getItem(MKTPCACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function saveMktPCache(cache) {
  try { localStorage.setItem(MKTPCACHE_KEY, JSON.stringify(cache)); } catch(e) {}
}

// 캐시에서 시세 즉시 적용 (앱 로드 시 호출) — TTL 없음, 영구 적용
function applyMktPCache() {
  const cache = loadMktPCache();
  let applied = 0;
  listings.forEach(l => {
    const entry = cache[String(l.id)];
    if(entry && entry.mktP > 0) {
      l.mktP = entry.mktP;
      l.noMktP = false;
      l._mktPAuto = true;
      l._recentDeals = entry.recentDeals || [];
      l._radiusUsed = entry.radiusUsed || '';
      l._sampleCount = entry.sampleCount || 0;
      applied++;
    }
  });
  if(applied > 0) {
    console.log(`캐시에서 시세 즉시 적용: ${applied}건`);
    renderListings();
    renderRecommend();
  }
}

async function autoFetchMarketPrices(){
  // 캐시 먼저 즉시 적용
  applyMktPCache();

  // 캐시에 값 있는 공고는 스킵 — 새로 추가된 공고(캐시 없음)만 조회
  const cache = loadMktPCache();
  const targets = listings.filter(l => {
    if(!l.loc) return false;
    const entry = cache[String(l.id)];
    if(entry && entry.mktP > 0) return false; // 캐시 있으면 스킵
    return true;
  });

  if(!targets.length) { console.log('시세 전체 캐시 적용 완료, 신규 조회 없음'); return; }
  console.log(`시세 신규조회: ${targets.length}건 (새 공고만)`);

  // 수도권 여부 판별 → 반경 결정
  const isCapital = loc => /서울|경기|인천|과천|성남|고양|용인|화성|수원|안양|의왕|광명|하남|구리|남양주|김포|파주|시흥|안산|의정부|부천|양주|평택|광주시/.test(loc||'');

  // 병렬 처리 (10건씩 동시)
  const batch = targets.slice(0, 20);
  for(let i = 0; i < batch.length; i += 10){
    const chunk = batch.slice(i, i + 10);
    await Promise.all(chunk.map(async l => {
      try {
        const sizeNums = (l.size||'').match(/\d+/g);
        const size = sizeNums ? Math.max(...sizeNums.map(Number)) : 84;
        const radius = isCapital(l.loc) ? '0.3' : '1';
        const url = `${MARKET_API}?loc=${encodeURIComponent(l.loc)}&size=${size}&name=${encodeURIComponent(cleanName(l.name))}&radius=${radius}`;
        const res = await fetch(url);
        const data = await res.json();
        if(data.mktP && data.mktP > 0){
          l.mktP = data.mktP;
          l.noMktP = false;
          l._mktPAuto = true;
          l._recentDeals = (data.recentDeals||[]).slice(0, 3);
          l._radiusUsed = data.radiusUsed || '';
          l._sampleCount = data.sampleCount || 0;
          console.log(`✓ ${cleanName(l.name)}: 시세 ${(data.mktP/10000).toFixed(1)}억 (${data.sampleCount}건, ${data.radiusUsed})`);
          // 캐시 저장
          const updatedCache = loadMktPCache();
          updatedCache[String(l.id)] = {
            mktP: data.mktP,
            recentDeals: (data.recentDeals||[]).slice(0,3),
            radiusUsed: data.radiusUsed||'',
            sampleCount: data.sampleCount||0,
          };
          saveMktPCache(updatedCache);
        }
      } catch(e){ console.warn(`시세 조회 실패: ${l.name}`, e.message); }
    }));
    // 10건 처리 후 렌더링 (중간중간 업데이트)
    renderListings();
  }
  renderListings();
}

/* API 상태 업데이트 */
function updateApiStatus(){
  // api-indicator는 유저에게 노출하지 않음
  const badge = document.getElementById('api-menu-badge');
  if(badge){
    badge.className = apiConnected ? 'api-menu-badge-on' : 'api-menu-badge-off';
    badge.textContent = apiConnected ? '연동됨' : '미연동';
  }
}

function openApiSetup(){
  const inp = document.getElementById('api-key-input');
  if(inp && apiKey) inp.value = apiKey;
  document.getElementById('api-setup-ov').classList.add('open');
}
function closeApiSetup(){
  document.getElementById('api-setup-ov').classList.remove('open');
}

async function connectApi(){
  const key = document.getElementById('api-key-input').value.trim();
  if(!key){ showStatus('err','서비스키(인증키)를 입력해주세요.'); return; }

  const btn = document.getElementById('api-connect-btn');
  btn.disabled = true;
  showStatus('loading','🔄 API 연결 확인 중...');

  try {
    const data = await fetchAptList(key, 1, 3);
    if(data && data.length > 0){
      apiKey = key;
      localStorage.setItem('cheongyak_api_key', key);
      showStatus('ok', `✓ 연결 성공! 공고 ${data.length}건 확인됐어요.\n잠시 후 실시간 데이터로 전환합니다.`);
      setTimeout(async ()=>{ apiConnected = true; closeApiSetup(); updateApiStatus(); await loadLiveData(); }, 1500);
    } else {
      showStatus('err', '데이터를 가져올 수 없어요.\n인증키(Decoding 키)가 맞는지 확인해주세요.');
    }
  } catch(e){
    console.error('API error:', e);
    showStatus('err',
      '연결에 실패했어요.\n\n' +
      '가능한 원인:\n' +
      '• 인증키가 틀렸거나 아직 승인 전이에요\n' +
      '• 브라우저 CORS 제한 (실서비스 백엔드에서 해결)\n' +
      '• 일일 호출 한도(40,000건) 초과\n\n' +
      'Decoding 키를 사용했는지 확인해주세요.'
    );
  }
  btn.disabled = false;
}

function showStatus(type, msg){
  const el = document.getElementById('api-status-box');
  el.className = 'api-status-box ' + type;
  el.style.whiteSpace = 'pre-line';
  el.textContent = msg;
  el.style.display = 'block';
}

/* ── APT 분양정보 목록 ── */
async function fetchAptList(key, page=1, num=20){
  const url = `${API_APT}?serviceKey=${encodeURIComponent(key)}&page=${page}&perPage=${num}`;
  const res  = await fetch(PROXY + encodeURIComponent(url));
  const body  = await res.json();
  const items = body?.data || body?.response?.body?.items?.item;
  if(!items) return [];
  return Array.isArray(items) ? items : [items];
}

/* ── APT 잔여세대(줍줍) 목록 ── */
async function fetchLottoList(key, page=1, num=10){
  const url = `${API_LOTTO}?serviceKey=${encodeURIComponent(key)}&page=${page}&perPage=${num}`;
  const res  = await fetch(PROXY + encodeURIComponent(url));
  const body  = await res.json();
  const items = body?.data || body?.response?.body?.items?.item;
  if(!items) return [];
  return Array.isArray(items) ? items : [items];
}

/* ── 경쟁률 조회 (공고번호 기준) ──
   응답: { data: [{ PBLANC_NO, HOUSE_TY, CMPET_RATE, REQ_CNT, RESIDE_SECD, ... }] }
   CMPET_RATE: "12.5" 형태 문자열
   RESIDE_SECD: "01"=해당지역, "02"=기타지역, "03"=기타경기
   → 1순위 해당지역(01) 기준 가중평균 경쟁률 계산
── */
async function fetchCmpetRate(key, pblancNo){
  try {
    const url = `${API_CMPET}?serviceKey=${encodeURIComponent(key)}&page=1&perPage=50&cond[PBLANC_NO::EQ]=${pblancNo}`;
    const res  = await fetch(PROXY + encodeURIComponent(url));
    const body  = await res.json();
    const data  = body?.data;
    if(!data || !data.length) return null;

    // 1순위 해당지역(01) 데이터만 추출해서 평균 경쟁률 계산
    const rank1 = data.filter(d => String(d.RESIDE_SECD) === '01' && String(d.SUBSCRPT_RANK_CODE) === '1');
    const target = rank1.length ? rank1 : data;

    const rates = target
      .map(d => parseFloat(d.CMPET_RATE))
      .filter(r => !isNaN(r) && r > 0);

    if(!rates.length) return null;
    const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
    return Math.round(avg * 10) / 10; // 소수점 1자리
  } catch(e) {
    return null;
  }
}

/* ── 당첨가점 조회 (공고번호 기준) ──
   응답 필드: LWET_SCORE(최저), TOP_SCORE(최고), AVRG_SCORE(평균)
   → 평균가점(AVRG_SCORE)을 커트라인으로 사용
   → 없으면 최저가점(LWET_SCORE) 사용
── */
async function fetchCutScore(key, pblancNo){
  try {
    const url = `${API_SCORE}?serviceKey=${encodeURIComponent(key)}&page=1&perPage=20&cond[PBLANC_NO::EQ]=${pblancNo}`;
    const res  = await fetch(PROXY + encodeURIComponent(url));
    const body  = await res.json();
    const data  = body?.data;
    if(!data || !data.length) return null;

    // 해당지역(01) + 전용 84㎡ 우선, 없으면 첫 번째 항목
    const ty84local = data.find(d => String(d.RESIDE_SECD) === '01' && String(d.HOUSE_TY).includes('84'));
    const ty84      = data.find(d => String(d.HOUSE_TY).includes('84'));
    const target    = ty84local || ty84 || data[0];

    // AVRG_SCORE → TOP_SCORE → LWET_SCORE 순으로 fallback
    const score = parseFloat(target.AVRG_SCORE || target.TOP_SCORE || target.LWET_SCORE || 0);
    return score > 0 ? Math.round(score) : null;
  } catch(e) {
    return null;
  }
}

/* ★★★ [하드코딩 — 수정 금지] 유사 단지 경쟁률/커트라인 히스토리 조회 ★★★
   같은 지역(시/구)의 최근 6개월 경쟁률·커트라인을 조회하여 평균값 반환
   → calcProb에서 커트라인/경쟁률 데이터 없는 PDF 공고에 활용
── */
async function fetchSimilarComp(listing){
  if(!apiKey || !apiConnected) return null;
  try {
    // 최근 6개월 범위 날짜 계산
    const now = new Date();
    const sixAgo = new Date(now);
    sixAgo.setMonth(sixAgo.getMonth() - 6);
    const fmtD = d => d.toISOString().slice(0,10);

    // 1) 최근 APT 분양 목록 조회 (50건)
    const listUrl = `${API_APT}?serviceKey=${encodeURIComponent(apiKey)}&page=1&perPage=50`;
    const listRes = await fetch(PROXY + encodeURIComponent(listUrl));
    const listBody = await listRes.json();
    const allItems = listBody?.data || [];
    if(!allItems.length) return null;

    // 2) 같은 지역 필터 (공급지역명에 listing.loc의 시/구 포함)
    const locParts = (listing.loc||'').split(/[\s,/]/);
    const gu = locParts.find(s => s.endsWith('구') || s.endsWith('시') || s.endsWith('군')) || '';
    const si = locParts[0] || '';

    const similar = allItems.filter(item => {
      const rgn = item['공급지역명'] || item.SUBSCRPT_AREA_CODE_NM || '';
      const addr = item['공급위치'] || item.HSSPLY_ADRES || '';
      const combined = rgn + ' ' + addr;
      return gu && combined.includes(gu) || si && combined.includes(si);
    });

    if(!similar.length) return null;

    // 3) 각 유사단지의 공고번호로 경쟁률/커트라인 조회 (최대 5건)
    const results = [];
    const targets = similar.slice(0, 5);
    for(const item of targets){
      const pNo = item['공고번호'] || item.PBLANC_NO || '';
      if(!pNo) continue;
      const [compVal, cutVal] = await Promise.all([
        fetchCmpetRate(apiKey, pNo),
        fetchCutScore(apiKey, pNo)
      ]);
      if(compVal || cutVal) results.push({ comp: compVal, cut: cutVal });
    }

    if(!results.length) return null;

    // 4) 평균 계산
    const comps = results.map(r => r.comp).filter(Boolean);
    const cuts = results.map(r => r.cut).filter(Boolean);
    return {
      avgComp: comps.length ? Math.round(comps.reduce((a,b)=>a+b,0) / comps.length * 10) / 10 : null,
      avgCut: cuts.length ? Math.round(cuts.reduce((a,b)=>a+b,0) / cuts.length) : null,
      sampleCount: results.length,
      region: gu || si
    };
  } catch(e) {
    console.warn('유사단지 조회 실패:', e.message);
    return null;
  }
}
/* ★★★ [하드코딩 끝] ★★★ */

/* ── API 응답 필드 정규화
   odcloud 응답은 camelCase 또는 한글 필드명으로 옴
   예: 주택명, 공급지역명, 청약접수시작일, 청약접수종료일, 당첨자발표일 등
── */
function parseAptItem(item, isLotto=false){
  const today = new Date();

  // 필드명 유연하게 처리 (API 버전 / 오퍼레이션마다 다를 수 있음)
  const name      = item['주택명']       || item.houseNm       || item.HOUSE_NM        || '공고명 확인 필요';
  const addr      = item['공급위치']     || item.hssplyAdres   || item.HSSPLY_ADRES     || '';
  const regionRaw = item['공급지역명']   || item.subscrptAreaCodeNm || item.SUBSCRPT_AREA_CODE_NM || '';
  const rceptBgn  = item['청약접수시작일'] || item.RCEPT_BGNDE || item.GNRL_RCEPT_BGNDE || item.rceptBgnde || '';
  const rceptEnd  = item['청약접수종료일'] || item.RCEPT_ENDDE || item.GNRL_RCEPT_ENDDE || item.rceptEndde || '';
  const pblancDe  = item['당첨자발표일'] || item.przwnerPresnatnDe || item.PRZWNER_PRESNATN_DE || '';
  const houseType = item['주택구분']     || item.houseSecdNm   || item.HOUSE_SECD_NM   || '';
  const unitsRaw  = item['전체세대수'] || item['총세대수'] || item['공급규모'] || item['세대수'] || item.totSuplyHshldco || item.TOT_SUPLY_HSHLDCO || item.houseTotsHhldco || item.HOUSE_TOTS_HSHLDCO || 0;
  const priceRaw  = item['분양가'] || item['최고분양가'] || item['분양가(계)'] || item.lttotTopAmount || item.LTTOT_TOP_AMOUNT || item.suplyAmount || item.SUPLY_AMOUNT || item.houseAmt || item.HOUSE_AMT || 0;

  // 날짜 파싱 (yyyymmdd 또는 yyyy-mm-dd)
  function parseDate(s){
    if(!s) return null;
    const clean = String(s).replace(/[^0-9]/g,'');
    if(clean.length===8) return new Date(`${clean.slice(0,4)}-${clean.slice(4,6)}-${clean.slice(6,8)}`);
    return new Date(s);
  }
  function toStr(s){
    if(!s) return '';
    const clean = String(s).replace(/[^0-9]/g,'');
    if(clean.length===8) return `${clean.slice(0,4)}-${clean.slice(4,6)}-${clean.slice(6,8)}`;
    return String(s);
  }

  const endDate  = parseDate(rceptEnd);
  const isUndetermined = !endDate || endDate.getFullYear() >= 9000;
  const daysLeft = isUndetermined ? null : Math.max(0, Math.ceil((endDate - today) / 86400000));

  // 지역 코드 매핑
  const RGN_KR = {'서울':'seoul','경기':'gyeonggi','인천':'incheon','부산':'busan','대전':'daejeon','세종':'sejong'};
  const region = Object.keys(RGN_KR).find(k => regionRaw.includes(k))
    ? RGN_KR[Object.keys(RGN_KR).find(k => regionRaw.includes(k))]
    : '';

  // 타입 결정
  // isLotto(무순위/잔여) API에서 온 경우에도 houseType으로 공공/민간 구분
  const isPublicType = houseType.includes('국민') || houseType.includes('공공') || houseType.includes('LH') || houseType.includes('공공임대') || houseType.includes('행복주택');
  const type = isLotto
    ? (isPublicType ? 'public' : 'private')
    : (isPublicType ? 'public' : 'private');

  const sheetPrice = sheetPrices[name];

  // lttotTopAmount는 API마다 단위가 다름 (만원/원/억 등)
  // 자릿수 기반으로 단위 추정: 원(9자리↑)→÷10000, 억(1~999)→×10000, 나머지 만원 그대로
  function sanitizePriceRaw(raw) {
    const n = parseFloat(String(raw||0).replace(/,/g,'')) || 0;
    if (n <= 0) return 0;
    if (n >= 1000000000000) return 0;          // 100조 이상 오류
    if (n >= 100000000) return Math.round(n / 10000); // 원 단위 → 만원
    if (n < 1000 && n >= 1) return Math.round(n * 10000); // 억 단위 → 만원
    return n; // 만원 단위 그대로
  }
  const minP  = sheetPrice?.minP || sanitizePriceRaw(priceRaw);
  const units = parseInt(unitsRaw) || 0;
  const loc   = addr || `${regionRaw}`;

  // 전형 추론
  const elig = isLotto
    ? ['무순위(줍줍)']
    : type === 'public'
      ? ['생애최초','신생아특공','일반공급']
      : ['일반공급','생애최초'];

  let priceLabel = '공고 확인 필요';
  if(sheetPrice?.price){
    priceLabel = sheetPrice.price;
  } else if(minP) {
    // 억 단위로 읽기 좋게 변환 (예: 11700 → 1억 1천, 85000 → 8억 5천)
    const eok = Math.floor(minP / 10000);
    const chun = Math.round((minP % 10000) / 1000);
    if(eok > 0 && chun > 0) priceLabel = `${eok}억 ${chun}천~`;
    else if(eok > 0) priceLabel = `${eok}억~`;
    else priceLabel = `${(minP/1000).toFixed(0)}천만원~`;
  }

  return {
    id:       item['공고번호'] || item.houseManageNo || item.HOUSE_MANAGE_NO || String(Math.random()),
    name, loc, type, region, lotto: isLotto,
    price:    priceLabel,
    minP,
    mktP:     (sheetPrice?.mktP && sheetPrice.mktP > 0) ? sheetPrice.mktP : 0,
    deadline: toStr(rceptEnd),
    days:     daysLeft,
    size:     item['주택형'] || item.houseTy || item.HOUSE_TY || '면적 공고 확인',
    recruitUnits: 0, // PDF 파싱 시 채워짐
    units,
    comp:     10,  // 경쟁률은 별도 API (15098905) 필요
    cut:      0,
    qual:     isLotto ? '만 19세 이상 누구나' : '청약통장 보유자 (공고 확인 필요)',
    inc:      type === 'public' ? '도시근로자 월평균소득 기준 이하' : '소득 제한 없음',
    sched:    `접수: ${toStr(rceptBgn)} ~ ${toStr(rceptEnd)}${pblancDe ? ' / 발표: '+toStr(pblancDe) : ''}`,
    aS:       toStr(rceptBgn),
    aE:       toStr(rceptEnd),
    aD:       toStr(pblancDe),
    elig,
    noMktP: !sheetPrice?.mktP || sheetPrice?.mktP === 0 || String(sheetPrice?.mktP).trim() === '-',
    priceFactors: sheetPrice?.factors || [],
    ai:{
      q: isLotto
        ? '만 19세 이상 누구나 신청 가능해요. 청약통장·무주택 조건 없어요.'
        : `청약홈(applyhome.co.kr)에서 ${name} 자격 조건을 확인하세요.`,
      p: minP
        ? `분양가 ${priceLabel}이에요.`
        : '청약홈 공고문에서 분양가를 확인하세요.',
      s: `청약 접수 ${toStr(rceptBgn)} ~ ${toStr(rceptEnd)}${pblancDe ? ', 당첨 발표 '+toStr(pblancDe) : ''}`,
      d: '청약홈(applyhome.co.kr)에서 필요 서류를 확인하세요.'
    }
  };
}

/* ── 실시간 전체 데이터 로드 ── */
async function loadLiveData(){
  if(!apiKey){ updateApiStatus(); return; }

  const ind = document.getElementById('api-indicator');
  if(ind){ ind.className='api-ind-loading'; ind.textContent='불러오는 중...'; }

  try {
    // 1단계: 분양정보 + 줍줍 목록 동시 조회
    const [aptItems, lottoItems] = await Promise.all([
      fetchAptList(apiKey,  1, 20).catch(()=>[]),
      fetchLottoList(apiKey, 1, 10).catch(()=>[])
    ]);

    const allParsed = [
      ...lottoItems.map(i => parseAptItem(i, true)),
      ...aptItems.map(i   => parseAptItem(i, false))
    ];
    const filteredAll = allParsed.filter(l => (l.days === null || l.days > 0) && !l.name.includes('임대'));
    // API 내부 중복 제거 (로또+일반 동시 등장 시 로또 우선)
    const apiNorm = s => (s||'').replace(/[\s\u00A0\u3000\u200B\u200C\u200D\uFEFF]+/g,'').replace(/공공분양주택/g,'').replace(/\(.*?\)/g,'').replace(/[·ㆍ‧・\-]/g,'').normalize('NFC').toLowerCase();
    const apiMap = new Map();
    filteredAll.forEach(l => {
      const key = apiNorm(l.name);
      if(!apiMap.has(key)){
        apiMap.set(key, l);
      } else {
        // 이미 있으면 lotto 플래그 병합
        const ex = apiMap.get(key);
        if(l.lotto) ex.lotto = true;
        // 더 상세한 데이터로 보충
        if(l.minP && !ex.minP) ex.minP = l.minP;
        if(l.price && l.price !== '공고 확인 필요' && (!ex.price || ex.price === '공고 확인 필요')) ex.price = l.price;
        if(l.loc && l.loc.length > (ex.loc||'').length) ex.loc = l.loc;
      }
    });
    const parsed = [...apiMap.values()];
    console.log(`[dedup] API 원본: ${filteredAll.length}건 → 중복제거: ${parsed.length}건`);

    if(parsed.length === 0){

      apiConnected = false;
      updateApiStatus();
      showToast('API 응답이 비어있어요 — 목업 데이터로 표시해요');
      return;
    }

    // 우선 목록 먼저 표시 (경쟁률 로드 전)
    // 관리자 등록 공고 유지 (API 데이터와 중복이면 API 데이터 우선)
    let adminSaved = [];
    try {
      const adminRes = await fetch(LISTINGS_API);
      const adminData = await adminRes.json();
      adminSaved = (adminData.listings||[]).map(l => {
        delete l._maxP; delete l._minPSanitized; // 캐시 완전 초기화
        l.mktP = 0;     // 시세는 autoFetchMarketPrices에서 자동 조회
        l.noMktP = true;
        return {...l, name: cleanName(l.name), _src:'pdf'};
      });
    } catch(e){}
    parsed.forEach(l => l._src = 'api');
    const deleted = JSON.parse(localStorage.getItem('deletedListings')||'[]');
    const norm = s => (s||'').replace(/[\s\u00A0\u3000\u200B\u200C\u200D\uFEFF]+/g,'').replace(/공공분양주택|조합원취소분|취소분|무순위|잔여세대|입주자모집공고/g,'').replace(/\(.*?\)/g,'').replace(/[·ㆍ‧・\-]/g,'').normalize('NFC').toLowerCase();
    // PDF 삭제 적용
    const validAdmin = adminSaved.filter(a => !deleted.includes(a.id));
    // 디버깅: norm 키 + 코드포인트 비교
    const apiKeys = parsed.map(l => norm(l.name));
    const pdfKeys = validAdmin.map(l => norm(l.name));
    console.log('[dedup] API keys:', apiKeys);
    console.log('[dedup] PDF keys:', pdfKeys);
    pdfKeys.forEach(pk => {
      const match = apiKeys.find(ak => ak === pk);
      if(!match){
        const similar = apiKeys.find(ak => ak.includes(pk.slice(0,4)) || pk.includes(ak.slice(0,4)));
        if(similar) console.warn(`[dedup] 불일치! PDF "${pk}" [${[...pk].map(c=>c.codePointAt(0).toString(16)).join(',')}] vs API "${similar}" [${[...similar].map(c=>c.codePointAt(0).toString(16)).join(',')}]`);
      }
    });
    // API + PDF 전체를 이름 기준으로 병합 (API 베이스 + PDF 보충)
    const nameMap = new Map();
    // 1) API 먼저 등록
    parsed.forEach(l => {
      const key = norm(l.name);
      if(!nameMap.has(key)) nameMap.set(key, {...l});
    });
    // 2) PDF 데이터로 보충/추가
    validAdmin.forEach(l => {
      const key = norm(l.name);
      const existing = nameMap.get(key);
      if(!existing){
        // API에 없는 공고 → PDF 데이터 그대로 추가
        nameMap.set(key, {...l});
      } else {
        // API에 있는 공고 → PDF의 더 상세한 데이터로 보충
        if(l.minP) { existing.minP = l.minP; delete existing._maxP; } // PDF minP 항상 우선, 캐시 초기화
        if(l.price && l.price !== '공고 확인 필요') existing.price = l.price; // PDF price 항상 우선
        if(l.loc) existing.loc = l.loc; // PDF 공급위치 항상 우선
        if(l.eligDetail && l.eligDetail.length) existing.eligDetail = l.eligDetail;
        if(l.eligTiers && l.eligTiers.length) existing.eligTiers = l.eligTiers;
        if(l.inc && !existing.inc) existing.inc = l.inc;
        if(l.qual && l.qual !== '공고 확인 필요' && (!existing.qual || existing.qual.includes('확인 필요'))) existing.qual = l.qual;
        if(l.sched && !existing.sched) existing.sched = l.sched;
        if(l.compByType && !existing.compByType) existing.compByType = l.compByType;
        if(l.cutByType && !existing.cutByType) existing.cutByType = l.cutByType;
        if(l.size && !existing.size) existing.size = l.size;
      }
    });
    const deduped = [...nameMap.values()];
    listings.splice(0, listings.length, ...deduped);
    liveListings = parsed;
    apiConnected = true;
    updateApiStatus();
    renderListings();
    renderRecommend();
    showToast(`✓ 공고 ${parsed.length}건 로드 — 경쟁률 업데이트 중...`);

    // 2단계: 공고별 경쟁률 + 커트라인 병렬 조회 (일반분양만)
    const normalListings = parsed.filter(l => !isLottoListing(l) && l.id);
    const enrichPromises = normalListings.map(async (l) => {
      const pblancNo = l.id; // parseAptItem에서 공고번호를 id로 저장
      const [comp, cut] = await Promise.all([
        fetchCmpetRate(apiKey, pblancNo),
        fetchCutScore(apiKey,  pblancNo)
      ]);
      if(comp !== null) l.comp = comp;
      if(cut  !== null) l.cut  = cut;
    });

    // 최대 5개 동시 요청 (API 과부하 방지)
    for(let i = 0; i < enrichPromises.length; i += 5){
      await Promise.all(enrichPromises.slice(i, i + 5));
    }

    // 경쟁률·커트라인 반영 후 재렌더
    renderListings();
    updateConsult();
    updateScoreScreen();
    showToast(`✓ 경쟁률·커트라인 업데이트 완료`);

    // 시세 자동 조회 — loadLiveData 완료 후 실행 (listings가 채워진 상태)
    // 1) 캐시 즉시 적용 (API 응답 기다리지 않고 바로 표시)
    applyMktPCache();
    // 2) 만료된 것만 백그라운드 갱신
    console.log(`loadLiveData 완료: ${listings.length}건, 시세 자동조회 시작`);
    autoFetchMarketPrices(); // await 제거 — 백그라운드 실행

  } catch(e){
    console.error('loadLiveData error:', e);
    apiConnected = false;
    updateApiStatus();
    showToast('API 오류 — 목업 데이터로 표시해요');
  }
}

/* 저장된 키로 앱 시작 시 자동 연결 — 첫 렌더 후 시작 */
P.name = RETRO[Math.floor(Math.random()*RETRO.length)];
document.getElementById('my-name').textContent = P.name;
const _greet = document.getElementById('hero-greeting');
const _cheer = document.getElementById('hero-cheer');
if(_greet) _greet.textContent = `${P.name}님, 안녕하세요`;
const _cheerIdx = Math.floor(Math.random()*CHEER.length);
if(_cheer) _cheer.textContent = CHEER[_cheerIdx];
const _today = new Date();
calYear  = _today.getFullYear();
calMonth = _today.getMonth();

// requestAnimationFrame으로 첫 화면 페인트 후 리스트 렌더

// 스플래시
(function(){
  const s = document.getElementById('splash');
  if (!s) return;
  const isKakaoCallback = new URLSearchParams(window.location.search).get('code');
  if (isKakaoCallback) {
    s.style.display = 'none';
  } else {
    // 2초 후 무조건 숨김 (애니메이션 실패해도 강제 제거)
    setTimeout(()=>{
      s.classList.add('hide');
      setTimeout(()=>{ s.style.display='none'; s.style.visibility='hidden'; }, 600);
    }, 2000);
    // 혹시 모르니 3초 후 강제 제거
    setTimeout(()=>{ s.style.display='none'; s.style.visibility='hidden'; }, 3000);
  }
})();

loadSheetFactors();

// days 계산 즉시 실행
const _initToday = new Date();
listings.forEach(l => {
  if(l.deadline){
    const end = new Date(l.deadline);
    if(end.getFullYear() >= 9000){ l.days = null; }
    else { l.days = Math.ceil((end - _initToday) / 86400000); }
  }
});
restoreRegions();
restoreSizes();
updateHero();
renderListings();
window.scrollTo(0, 0);

// 항상 자동 연동
setTimeout(()=>loadLiveData(), 500);

// 시세 자동 조회는 loadLiveData 완료 후 자동 호출됨 (아래 loadLiveData 내부)

// ══ 애니메이션 1: 카드 스크롤 진입 (Intersection Observer) ══
const _cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      _cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

function observeCards(){
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity .35s ease ${i * 0.06}s, transform .35s ease ${i * 0.06}s`;
    _cardObserver.observe(card);
  });
}

// renderListings 호출 후 자동 관찰
const _origRenderListings = renderListings;
window.renderListings = function(){
  _origRenderListings();
  requestAnimationFrame(observeCards);
};


// ══ 애니메이션 3: 히어로 조건값 카운트업 ══
const _origUpdateHero = updateHero;
window.updateHero = function(){
  _origUpdateHero();
  const numFields = ['cd-income','cd-cash','cd-nohome','cd-dep','cd-children'];
  numFields.forEach(id => {
    const el = document.getElementById(id);
    if(!el || el.classList.contains('blank')) return;
    const num = parseInt(el.textContent);
    if(isNaN(num) || num === 0) return;
    const unit = el.textContent.replace(/[0-9]/g,'');
    let cur = 0;
    const step = Math.ceil(num / 15);
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      el.textContent = cur + unit;
      if(cur >= num) clearInterval(t);
    }, 30);
  });
};

/* ══ 관리자 모드 ══ */
let _adminExtracted = null;
let isAdmin = false;

// URL 파라미터로 관리자 진입
(function checkAdminParam(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('admin') === '1234'){
    isAdmin = true;
    setTimeout(()=>openAdmin(), 500);
  }
})();

function openAdmin(){
  const ov = document.getElementById('admin-ov');
  ov.style.display = 'flex';
  renderAdminList();
}

function closeAdmin(){
  document.getElementById('admin-ov').style.display = 'none';
  resetAdmin();
}

function resetAdmin(){
  _adminExtracted = null;
  document.getElementById('admin-status').style.display = 'none';
  document.getElementById('admin-preview').style.display = 'none';
  document.getElementById('admin-drop').style.display = 'block';
  document.getElementById('admin-file-input').value = '';
}

async function onAdminFileSelect(event){
  const file = event.target.files[0];
  if(!file) return;

  document.getElementById('admin-drop').style.display = 'none';
  const statusEl = document.getElementById('admin-status');
  statusEl.style.display = 'block';
  statusEl.style.background = '#FFF8EC';
  statusEl.style.border = '1px solid rgba(245,166,35,.3)';
  statusEl.style.color = '#92400E';
  statusEl.textContent = '📄 ' + file.name + ' 읽는 중... Claude가 분석하고 있어요';

  // 파일 크기 체크 (5MB 초과 시 경고)
  const MAX_SIZE = 5 * 1024 * 1024;
  if(file.size > MAX_SIZE) {
    const statusEl = document.getElementById('admin-status');
    statusEl.style.display = 'block';
    statusEl.style.background = 'var(--red-light)';
    statusEl.style.border = '1px solid rgba(240,64,64,.3)';
    statusEl.style.color = 'var(--red)';
    statusEl.textContent = `❌ PDF 파일이 너무 커요 (${(file.size/1024/1024).toFixed(1)}MB). 5MB 이하 파일을 사용해주세요. 청약홈에서 모집공고문 요약본을 다운로드해보세요.`;
    document.getElementById('admin-drop').style.display = 'block';
    return;
  }

  try {
    const base64 = await new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result.split(',')[1]);
      reader.onerror = () => rej(new Error('파일 읽기 실패'));
      reader.readAsDataURL(file);
    });

    const prompt = `다음 청약 공고문 PDF를 꼼꼼하게 분석해서 JSON 형식으로만 응답해줘. 마크다운 코드블록 없이 순수 JSON만.

★ 핵심 주의사항 ★

[분양가 파싱 — 가장 중요]
- '공급금액' 또는 '공급금액 및 납부일정' 표를 찾아라
- 표에서 '계' 컬럼(대지비+건축비 합계)의 금액만 사용
- 단위 변환 필수:
  · 숫자가 1,000,000,000 수준(9자리) → 원 단위 → ÷10000 하여 만원으로 변환
    예) 1,222,373,000원 → 122237만원 → 약 12억 2천
  · 숫자가 100,000 수준(6자리) → 만원 단위 → 그대로 사용
  · 단위가 '천원'으로 명시 → ÷10 하여 만원으로 변환
- price 필드: 평형(타입)별 최저층~최고층 범위로 표시. 층별로 다르면 해당 타입의 최저~최고
  예) 44타입: 2층 84252만원 ~ 15층이상 88500만원 → "44㎡ 8억4천~8억8천"
  예) 59A타입: 2층 122237만원 ~ 15층이상 130039만원 → "59A㎡ 12억2천~13억"
- price 구분자: 평형별로 | 로 구분
- minP: 전체 평형 중 계 컬럼 최저값(만원). 위 예시에서는 44타입 최저층 값

[세대수]
- units: '총 N세대' 또는 '지상 N층 N개동 총 N세대' 에서 단지 전체 세대수
- recruitUnits: '일반분양 N세대' 또는 '특별공급 N세대+일반공급 N세대' 합계 (이번 공고 모집인원)

[기타]
- 소득기준: 공고에 명시된 도시근로자 월평균소득 대비 %를 정확히 추출
- 자산기준: 부동산(토지+건물) 가액을 반드시 추출
- 거주지역: 해당 지역 거주 요건(기간 포함) 추출
- 청약통장: 가입기간, 납입횟수 등 요건 추출
- 당첨자 선정방법: 단계별 소득구분(우선/일반/잔여/추첨)을 꼼꼼하게 추출

{
  "name": "단지명",
  "loc": "공급위치 주소. 반드시 공고문의 공급위치 항목에서 정확한 법정동 주소 추출. 절대 임의 추정 금지. 예: 서울특별시 서초구 반포동",
  "region": "지역코드 (seoul/gyeonggi/incheon/busan/daejeon/sejong/daegu/gwangju/ulsan/gangwon/chungnam/jeonnam 중 하나)",
  "type": "public 또는 private (시행사가 LH/SH/지자체면 public, 민간건설사면 private)",
  "price": "평형별 분양가 (| 구분). 타입별 최저~최고 범위로 표시. 예: 44㎡ 8억4천~8억8천|59A㎡ 12억2천~13억|84A㎡ 17억~18억",
  "minP": 전체 평형 중 분양가(계) 최저값 만원 단위 숫자,
  "mktP": 주변 시세 만원 단위 숫자 (없으면 0),
  "deadline": "청약 접수 마감일 YYYY-MM-DD",
  "size": "공급 면적 (예: 59㎡ / 84㎡)",
  "units": 총 세대수 숫자 (단지 전체 세대수),
  "recruitUnits": 이번 공고 모집인원 숫자 (특별공급+일반공급 합산. 총 세대수와 다를 수 있음),
  "qual": "신청 자격 핵심 요약 (거주지역 요건, 세대주 요건, 무주택 요건 포함). 예: 서울 거주 무주택 세대구성원, 청약통장 2년+24회 납입",
  "inc": "소득 기준 핵심 요약. 전형별 소득기준이 다르면 범위로 표시. 예: 특공 100~160% / 일반 100%(60㎡이하)",
  "sched": "접수: YYYY-MM-DD ~ YYYY-MM-DD / 발표: YYYY-MM-DD / 계약: YYYY-MM-DD ~ YYYY-MM-DD",
  "aS": "청약 접수 시작일 YYYY-MM-DD",
  "aE": "청약 접수 종료일 YYYY-MM-DD",
  "aD": "당첨자 발표일 YYYY-MM-DD",
  "elig": ["공고에 명시된 공급유형. 생애최초/신생아특공/다자녀특공/청년특공/신혼부부특공/노부모부양/일반공급/무순위(줍줍) 중 해당하는 것들"],
  "eligDetail": [
    {
      "type": "전형명 (elig 배열의 값과 정확히 동일하게)",
      "incPct": "해당 전형의 최대 소득기준 % (가장 넓은 범위). 예: 신혼부부 잔여까지 포함하면 140. 없으면 0",
      "incLimit": "소득 상한 만원(연간). % 대신 절대금액이 있으면. 없으면 0",
      "ageMin": "최소 나이. 없으면 0",
      "ageMax": "최대 나이. 없으면 0",
      "married": "required(기혼필수)/excluded(미혼필수)/any(무관)",
      "noHome": "무주택 필수 true/false",
      "noHomeYears": "최소 무주택 기간(년). 없으면 0",
      "children": "최소 자녀수. 없으면 0",
      "newborn": "만2세이하 신생아 필수 true/false",
      "accMonths": "최소 청약통장 납입횟수. 없으면 0",
      "accYears": "최소 청약통장 가입기간(년). 없으면 0",
      "assets": "총 자산 상한 만원. 없으면 0",
      "realEstate": "부동산(토지+건물) 가액 상한 만원. 없으면 0",
      "carValue": "자동차 가액 상한 만원. 없으면 0",
      "regionReq": "거주지역 요건 (예: 서울 2년 이상 거주). 없으면 빈 문자열",
      "isHeadReq": "세대주 요건 true/false",
      "note": "기타 추가 조건 (예: 5년 이상 소득세 납부, 혼인 7년 이내 등)"
    }
  ],
  "eligTiersData": [
    {
      "parent": "상위 전형명 (예: 신혼부부특공, 신생아특공, 생애최초)",
      "step": "단계 순번 숫자",
      "name": "단계명 (예: 우선공급, 일반공급, 잔여공급, 추첨공급, 신생아 우선공급 등)",
      "pct": "배정 비율 % 숫자. 없으면 0",
      "incSingle": "외벌이(1인) 소득기준 % 숫자. 예: 100",
      "incDual": "맞벌이 소득기준 % 숫자. 예: 120",
      "assets": "자산기준 만원. 별도 명시 시. 없으면 0",
      "note": "해당 단계의 조건 한줄 요약"
    }
  ],
  "cut": 예상 가점 커트라인 (공고에 과거 데이터가 있으면). 없으면 0,
  "comp": 예상 경쟁률 숫자. 없으면 0,
  "compByType": "평형별 경쟁률 (| 구분). 없으면 빈 문자열",
  "cutByType": "평형별 가점 커트라인 (| 구분). 없으면 빈 문자열",
  "prevComp": "이전 차수 경쟁률 정보. 없으면 빈 문자열",
  "ai": {
    "q": "자격 요건을 쉽게 설명 1~2문장. 거주요건+무주택+통장 조건 포함",
    "p": "분양가를 쉽게 설명 1~2문장. 최저~최고 범위와 평당가 언급",
    "s": "일정 쉽게 설명 1~2문장. 접수일/발표일 포함",
    "d": "필요 서류 1~2문장"
  }
}

★ eligTiersData 추출 가이드 ★
공고의 '당첨자 선정방법' 표를 찾아서 각 특별공급(신혼부부/신생아/생애최초 등)의 단계별 구분을 모두 추출해.
- 각 단계의 소득기준 %를 외벌이/맞벌이 구분해서 추출
- 신혼부부특공 안에 '신생아 우선/일반' 단계가 있으면 반드시 포함
- 추첨공급이 있으면 incSingle/incDual을 999로 설정
- 자산기준(부동산가액)이 별도로 명시되어 있으면 assets에 만원 단위로 기재
- 단계가 없는 전형(다자녀, 노부모 등)은 생략`;

    const response = await fetch('https://chengyak-proxy.vercel.app/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 8192,
        messages: [{
          role: 'user',
          content: [
            { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
            { type: 'text', text: prompt }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok || !data.content) {
      throw new Error(data.error?.message || `서버 오류: ${response.status}`);
    }
    const text = data.content.map(c => c.text||'').join('');
    let clean = text.replace(/```json|```/g, '').trim();
    // JSON 객체만 추출 (앞뒤 불필요한 텍스트 제거)
    const jsonStart = clean.indexOf('{');
    const jsonEnd = clean.lastIndexOf('}');
    if(jsonStart >= 0 && jsonEnd > jsonStart) clean = clean.slice(jsonStart, jsonEnd + 1);
    // 흔한 JSON 오류 수정: 후행 쉼표 제거
    clean = clean.replace(/,\s*([\]}])/g, '$1');
    const parsed = JSON.parse(clean);

    // ★★★ [하드코딩 — 수정 금지] PDF 추출 데이터를 API 형식과 통일 ★★★
    // sched 형식 통일: 화살표(→) → 슬래시(/) 로 변환해서 API 형식에 맞춤
    let normalizedSched = parsed.sched || '';
    normalizedSched = normalizedSched.replace(/\s*→\s*/g, ' / ');
    // aS/aE/aD에서 sched 재생성 (API 형식과 동일)
    if(parsed.aS && parsed.aE){
      normalizedSched = `접수: ${parsed.aS} ~ ${parsed.aE}`;
      if(parsed.aD) normalizedSched += ` / 발표: ${parsed.aD}`;
      // 기존 sched에 계약 정보가 있으면 추가
      const contractMatch = (parsed.sched||'').match(/계약[:\s]*([0-9.\-~\s]+)/);
      if(contractMatch) normalizedSched += ` / 계약: ${contractMatch[1].trim()}`;
    }
    // deadline: API는 마감일 YYYY-MM-DD 형식
    const normalizedDeadline = parsed.deadline || parsed.aE || '';

    // minP 단위 정제 — Claude가 원 단위로 뽑는 경우 만원으로 변환
    function sanitizeMinP(val) {
      const n = parseInt(val) || 0;
      if (n <= 0) return 0;
      if (n >= 1000000000000) return 0;          // 100조 이상 오류
      if (n > 200000) return Math.round(n / 10000); // 20억만원 초과 → 원 단위로 판단, 만원 변환
      return n;
    }
    _adminExtracted = {
      ...parsed,
      id: Date.now(),
      minP: sanitizeMinP(parsed.minP),
      lotto: (parsed.elig||[]).includes('무순위(줍줍)'),
      mktP: 0,
      noMktP: true,
      comp: parseFloat(parsed.comp) || 10,
      compByType: parsed.compByType || '',
      cutByType: parsed.cutByType || '',
      eligDetail: parsed.eligDetail || [],
      eligTiers: parsed.eligTiersData || [],
      days: parsed.aE && !String(parsed.aE).startsWith('9999') ? Math.max(0, Math.ceil((new Date(parsed.aE) - new Date()) / 86400000)) : null,
      priceFactors: [],
      price: parsed.price || '공고 확인 필요',
      sched: normalizedSched,
      deadline: normalizedDeadline
    };
    // ★★★ [하드코딩 끝] ★★★

    statusEl.style.background = 'var(--public-light)';
    statusEl.style.border = '1px solid rgba(5,150,105,.3)';
    statusEl.style.color = 'var(--public)';
    statusEl.textContent = '✓ 추출 완료! 아래 내용을 확인해주세요';

    document.getElementById('admin-preview-body').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[
          ['단지명', parsed.name],
          ['위치', parsed.loc],
          ['분양가', parsed.price],
          ['세대수', (parsed.units||'?') + '세대' + (parsed.recruitUnits ? ` (모집 ${parsed.recruitUnits}세대)` : '')],
          ['마감일', parsed.aE],
          ['신청 전형', (parsed.elig||[]).join(', ')],
          ['소득 기준', parsed.inc],
          ['신청 자격', parsed.qual],
        ].map(([k,v]) => `
          <div style="display:flex;gap:8px;align-items:flex-start">
            <span style="font-size:11px;color:var(--ink-5);width:60px;flex-shrink:0;padding-top:2px">${k}</span>
            <span style="font-size:13px;font-weight:600;color:var(--ink);flex:1">${v||'—'}</span>
          </div>`).join('')}
      </div>`;
    document.getElementById('admin-preview').style.display = 'block';

  } catch(e) {
    console.error(e);
    const statusEl = document.getElementById('admin-status');
    statusEl.style.background = 'var(--red-light)';
    statusEl.style.border = '1px solid rgba(240,64,64,.3)';
    statusEl.style.color = 'var(--red)';
    statusEl.textContent = '❌ 추출 실패: ' + e.message;
    document.getElementById('admin-drop').style.display = 'block';
  }
}

const LISTINGS_API  = 'https://chengyak-proxy.vercel.app/api/listings';
const KAKAO_AUTH_API = 'https://chengyak-proxy.vercel.app/api/kakao-auth';
const KAKAO_CLIENT_ID = '1e18e9aa2270ebaf1d1c1679fdabbb3d'; // 카카오 JavaScript 키

/* ══ Supabase 설정 ══ */
const SUPABASE_URL  = 'https://jmgdljcbbdyttfvmfvzx.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZ2RsamNiYmR5dHRmdm1mdnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzUwNzUsImV4cCI6MjA4OTU1MTA3NX0.Qxd1CLjnQB7etZ1qi6hKuJDElqOuzvLJCpI3p3_Dcuw';

const sb = {
  headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + SUPABASE_ANON, 'Content-Type': 'application/json' },
  async get(table, query='') {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, { headers: this.headers });
    return res.json();
  },
  async upsert(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this.headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(data)
    });
    return res.ok;
  },
  async delete(table, query) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      method: 'DELETE', headers: this.headers
    });
    return res.ok;
  }
};

/* ── Supabase: 프로필 저장 ── */
async function sbSaveProfile(user) {
  if (!user?.kakaoId) return;
  await sb.upsert('profiles', {
    id: String(user.kakaoId),
    kakao_id: String(user.kakaoId),
    nickname: user.nickname,
    avatar: user.avatar || ''
  });
}

/* ── Supabase: 조건 저장 ── */
async function sbSaveCondition() {
  if (!kakaoUser?.kakaoId) return;
  try {
    const condition = {
      name: P.name, byear: P.byear, bmonth: P.bmonth, bday: P.bday,
      income: P.income, cash: P.cash, noHomeYears: P.noHomeYears,
      depCount: P.depCount, depAmt: P.depAmt, children: P.children,
      childDates: P.childDates, marriage: P.marriage, marriageYear: P.marriageYear,
      household: P.household, isNoHome: P.isNoHome, region: P.region,
      dependents: P.dependents, accYears: P.accYears, prefSizes: P.prefSizes,
      elderParent: P.elderParent, isDual: P.isDual, spouseIncome: P.spouseIncome,
      totalIncome: P.totalIncome
    };
    await sb.upsert('profiles', {
      id: String(kakaoUser.kakaoId),
      kakao_id: String(kakaoUser.kakaoId),
      nickname: kakaoUser.nickname,
      avatar: kakaoUser.avatar || '',
      user_condition: condition
    });
  } catch(e) {}
}

/* ── Supabase: 조건 불러오기 ── */
async function sbLoadCondition(userId) {
  try {
    const rows = await sb.get('profiles', `id=eq.${userId}&select=user_condition,nickname`);
    if (Array.isArray(rows) && rows.length > 0 && rows[0].user_condition) {
      const c = rows[0].user_condition;
      Object.keys(c).forEach(k => { if (c[k] !== undefined && c[k] !== '') P[k] = c[k]; });
      if (rows[0].nickname) { P.name = rows[0].nickname; kakaoUser.nickname = rows[0].nickname; }
      updateHero(); renderListings(); updateConsult(); updateMyCondCard();
      const nm = document.getElementById('my-name');
      if (nm && P.name) nm.textContent = P.name + '님';
    }
  } catch(e) {}
}

/* ── Supabase: 북마크 불러오기 ── */
async function sbLoadBookmarks(userId) {
  try {
    const rows = await sb.get('bookmarks', `user_id=eq.${userId}&select=listing_id`);
    if (Array.isArray(rows)) {
      rows.forEach(r => savedIds.add(r.listing_id));
      renderListings();
      renderSaved();
    }
  } catch(e) {}
}

/* ── Supabase: 북마크 추가 ── */
async function sbAddBookmark(userId, listingId) {
  await sb.upsert('bookmarks', { user_id: String(userId), listing_id: String(listingId) });
}

/* ── Supabase: 북마크 삭제 ── */
async function sbRemoveBookmark(userId, listingId) {
  await sb.delete('bookmarks', `user_id=eq.${userId}&listing_id=eq.${listingId}`);
}

async function confirmAdminData(force=false){
  if(!_adminExtracted) return;

  try {
    const res = await fetch(LISTINGS_API, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ listing: _adminExtracted, force })
    });
    const data = await res.json();

    if(res.status === 409 && data.duplicate){
      const existing = document.getElementById('dup-confirm-ov');
      if(existing) existing.remove();
      const ov = document.createElement('div');
      ov.id = 'dup-confirm-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:900;display:flex;align-items:center;justify-content:center;max-width:430px;margin:0 auto;padding:24px';
      ov.innerHTML = `
        <div style="background:white;border-radius:20px;padding:28px 24px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.2)">
          <div style="font-size:22px;text-align:center;margin-bottom:12px">📄</div>
          <div style="font-size:16px;font-weight:800;color:var(--ink);text-align:center;margin-bottom:8px">이미 등록된 공고예요</div>
          <div style="font-size:13px;color:var(--ink-4);text-align:center;line-height:1.6;margin-bottom:24px">
            <b style="color:var(--ink)">${_adminExtracted.name}</b>이<br>이미 등록되어 있어요.<br>PDF 내용으로 <b style="color:var(--accent)">기존 공고를 덮어쓸까요?</b>
          </div>
          <div style="display:flex;gap:10px">
            <button onclick="document.getElementById('dup-confirm-ov').remove()" style="flex:1;padding:14px;background:var(--bg);color:var(--ink-3);border:1.5px solid rgba(0,0,0,.1);border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">취소</button>
            <button onclick="document.getElementById('dup-confirm-ov').remove();confirmAdminData(true)" style="flex:1;padding:14px;background:var(--accent);color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">덮어쓰기</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      return;
    }

    if(data.listings){
      const normN = s => (s||'').replace(/\s|\(|\)|조합원취소분|취소분|무순위|잔여세대/g,'').toLowerCase();
      const adminListings = data.listings.map(l => ({...l, name: cleanName(l.name), _src:'pdf'}));
      adminListings.forEach(l => {
        // id 또는 이름 둘 다 비교해서 중복 제거
        const existIdx = listings.findIndex(x =>
          x.id === l.id || normN(x.name) === normN(l.name)
        );
        if(existIdx > -1) {
          // 기존 공고 자리에서 PDF 데이터로 교체 (mktP 유지)
          const oldMktP = listings[existIdx].mktP;
          listings[existIdx] = { ...l, mktP: l.mktP || oldMktP, _src: 'pdf' };
        } else {
          listings.unshift(l);
        }
      });
    }
    const wasOverwrite = res.status === 200 && data.overwritten;
    showToast(wasOverwrite ? '✓ 기존 공고를 PDF로 업데이트했어요!' : '✓ 공고가 추가됐어요!');
    resetAdmin();
    renderAdminList();
    renderListings();
    renderRecommend();
  } catch(e){
    showToast('❌ 저장 실패: ' + e.message);
  }
}

async function renderAdminList(){
  const el = document.getElementById('admin-list');
  const countEl = document.getElementById('admin-count');
  const deleted = JSON.parse(localStorage.getItem('deletedListings')||'[]');
  try {
    const res = await fetch(LISTINGS_API);
    const data = await res.json();
    const saved = (data.listings||[]).map(l => ({...l, name: cleanName(l.name)})).filter(l => !deleted.includes(l.id));
    countEl.textContent = saved.length;
    if(!saved.length){
      el.innerHTML = '<div style="font-size:13px;color:var(--ink-5);text-align:center;padding:12px">아직 추가된 공고가 없어요</div>';
    } else {
      el.innerHTML = saved.map(l => `
        <div style="background:var(--bg);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:10px">
          <div style="flex:1">
            <div style="font-size:13px;font-weight:700;color:var(--ink)">${cleanName(l.name)}</div>
            <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${l.loc} · ${daysText(l.days,'d')}</div>
          </div>
          <button onclick="removeAdminListing(${l.id})" style="background:var(--red-light);border:none;cursor:pointer;padding:5px 10px;border-radius:8px;font-size:12px;color:var(--red);font-weight:600">삭제</button>
        </div>`).join('');
    }
  } catch(e){
    el.innerHTML = '<div style="font-size:13px;color:var(--red);text-align:center;padding:12px">목록 로드 실패</div>';
  }
  // 전체 공고 관리 목록
  renderAdminAllList();
}
function renderAdminAllList(){
  const el = document.getElementById('admin-all-list');
  if(!el) return;
  if(!listings.length){
    el.innerHTML = '<div style="font-size:13px;color:var(--ink-5);text-align:center;padding:12px">표시할 공고가 없어요</div>';
    return;
  }
  el.innerHTML = listings.map(l => {
    const src = l._src==='api' ? 'API' : l._src==='pdf' ? 'PDF' : '기본';
    const srcColor = l._src==='api' ? 'var(--accent)' : l._src==='pdf' ? 'var(--gold)' : 'var(--ink-4)';
    return `<div style="background:var(--bg);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cleanName(l.name)}</div>
        <div style="font-size:10px;color:var(--ink-4);margin-top:1px">${l.loc||''} <span style="color:${srcColor};font-weight:600">${src}</span></div>
      </div>
      <button onclick="adminDeleteListing(${l.id},'${l._src||''}')" style="background:var(--red-light);border:none;cursor:pointer;padding:4px 8px;border-radius:6px;font-size:11px;color:var(--red);font-weight:600;white-space:nowrap">삭제</button>
    </div>`;
  }).join('');
}

async function removeAdminListing(id){
  if(!confirm('이 공고를 삭제하시겠어요?')) return;
  const idx = listings.findIndex(l => l.id === id);
  if(idx > -1) listings.splice(idx, 1);
  // 삭제 ID 기억
  const deleted = JSON.parse(localStorage.getItem('deletedListings')||'[]');
  if(!deleted.includes(id)){ deleted.push(id); localStorage.setItem('deletedListings', JSON.stringify(deleted)); }
  // 서버 삭제 (응답 기다림)
  try {
    await fetch(LISTINGS_API, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id })
    });
  } catch(e){}
  renderAdminList();
  renderListings();
  updateHero();
  showToast('공고를 삭제했어요');
}

function adminDeleteListing(id, src){
  if(!confirm('이 공고를 삭제하시겠어요?')) return;
  const idx = listings.findIndex(l => l.id === id);
  if(idx > -1) listings.splice(idx, 1);
  // PDF 서버 저장 공고면 서버에서도 삭제
  if(src === 'pdf'){
    fetch(LISTINGS_API, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id })
    }).catch(()=>{});
  }
  // 삭제된 ID 기억 (새로고침 시 다시 로드 방지)
  const deleted = JSON.parse(localStorage.getItem('deletedListings')||'[]');
  if(!deleted.includes(id)){ deleted.push(id); localStorage.setItem('deletedListings', JSON.stringify(deleted)); }
  renderAdminList();
  renderListings();
  updateHero();
  showToast('공고를 삭제했어요');
}

// 관리자 공고는 loadLiveData()에서 이름 기준 병합으로 처리 (중복 방지)

/* ══ 카카오 로그인 ══ */
let kakaoUser = null; // { kakaoId, nickname, avatar, accessToken }

// 앱 시작 시 로그인 상태 복원
(function restoreKakaoSession() {
  // 구버전 오염 키 제거
  localStorage.removeItem('kakaoUser');

  // URL에 code 파라미터 있으면 → 카카오 콜백 처리 (이 기기에서 새로 로그인)
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    // 스플래시 즉시 숨김
    const sp = document.getElementById('splash');
    if (sp) sp.style.display = 'none';
    history.replaceState({}, '', window.location.pathname);
    handleKakaoCallback(code);
    return; // 로컬 복원 건너뜀
  }

  // 이 기기에서 저장한 세션 복원
  try {
    const saved = localStorage.getItem('kakaoUser_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      // kakaoId 있을 때만 복원 (오염 방지)
      if (parsed?.kakaoId) {
        kakaoUser = parsed;
        applyLoginUI();
        sbLoadBookmarks(String(kakaoUser.kakaoId));
        sbLoadCondition(String(kakaoUser.kakaoId));
      } else {
        // 유효하지 않은 데이터면 제거
        localStorage.removeItem('kakaoUser_v2');
      }
    }
  } catch(e) {
    localStorage.removeItem('kakaoUser_v2');
  }
})();

function kakaoLogin() {
  const redirectUri = encodeURIComponent('https://chengyak-proxy.vercel.app/');
  const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}`;
  window.location.replace(url);
}

async function handleKakaoCallback(code) {
  // 스플래시 확실히 숨김
  const sp = document.getElementById('splash');
  if (sp) { sp.classList.add('hide'); setTimeout(() => sp.style.display='none', 300); }
  showToast('카카오 로그인 중...');
  try {
    const res = await fetch(`${KAKAO_AUTH_API}?code=${encodeURIComponent(code)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    kakaoUser = data;
    kakaoUser.appNickname = data.nickname;
    P.name = data.nickname;
    // 기기별 키로 저장 (v2) — 다른 기기 로그인 정보와 충돌 없음
    localStorage.setItem('kakaoUser_v2', JSON.stringify(kakaoUser));
    // 구버전 키 제거
    localStorage.removeItem('kakaoUser');
    // Supabase에 프로필 저장 + 북마크 불러오기
    await sbSaveProfile(kakaoUser);
    await sbLoadBookmarks(String(kakaoUser.kakaoId));
    await sbLoadCondition(String(kakaoUser.kakaoId));
    applyLoginUI();
    showToast(`✓ ${data.nickname}님, 환영해요!`);
  } catch(e) {
    showToast('❌ 로그인 실패: ' + e.message);
  }
}

function kakaoLogout() {
  kakaoUser = null;
  localStorage.removeItem('kakaoUser_v2');
  localStorage.removeItem('kakaoUser');
  savedIds.clear();
  // 조건 초기화
  P.name=''; P.byear=''; P.bmonth=''; P.bday=''; P.income=''; P.cash='';
  P.noHomeYears=''; P.depCount=''; P.depAmt=''; P.children=0; P.childDates=[];
  P.marriage='미혼'; P.marriageYear=''; P.household=''; P.isNoHome=true;
  P.region=''; P.dependents=0; P.accYears=''; P.prefSizes=[];
  P.elderParent=false; P.isDual=false; P.spouseIncome=''; P.totalIncome='';
  applyLoginUI();
  renderListings();
  renderSaved();
  updateHero();
  showToast('로그아웃됐어요');
}

function applyLoginUI() {
  const area = document.getElementById('kakao-login-area');
  const nm = document.getElementById('my-name');
  if (!area) return;
  if (kakaoUser) {
    const displayName = kakaoUser.nickname || P.name;
    if (nm) nm.textContent = displayName + '님';
    if (displayName) P.name = displayName;
    area.innerHTML = `<div style="font-size:11px;color:rgba(255,255,255,.6);cursor:pointer;position:relative;z-index:1;white-space:nowrap" onclick="kakaoLogout()">로그아웃</div>`;
    updateHero();
  } else {
    if (nm) nm.textContent = '';
    area.innerHTML = `<button class="login-btn" onclick="kakaoLogin()">로그인하기</button>`;
  }
}

</script>



</body>
</html>
