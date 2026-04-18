---
theme: default
title: "Building a Scalable Test Automation Framework in the Age of AI"
info: |
  WeTest Conference 2025 – Athens, Greece
  TypeScript + Playwright + AI
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  mono: 'JetBrains Mono'
layout: cover
background: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80
---

# Building a Scalable Test Automation Framework
## in the Age of AI

<div class="mt-6 flex items-center gap-3 flex-wrap">
  <span class="font-mono text-sm bg-[#161b22] border border-[#3fb950]/50 text-[#3fb950] rounded px-3 py-1">TypeScript</span>
  <span class="font-mono text-sm bg-[#161b22] border border-[#58a6ff]/50 text-[#58a6ff] rounded px-3 py-1">Playwright</span>
  <span class="font-mono text-sm bg-[#161b22] border border-[#d2a8ff]/50 text-[#d2a8ff] rounded px-3 py-1">AI</span>
</div>

<div class="mt-8 font-mono text-gray-400 text-sm">
  <span class="text-[#3fb950]">$</span> wetest-conference --year 2026 --location athens 🇬🇷
</div>

---
layout: center
---

# Meet the Speakers

<div class="grid grid-cols-2 gap-12 mt-10">

<div class="bg-gradient-to-br from-blue-900/40 to-blue-700/20 border border-blue-500/30 rounded-2xl p-8 text-center">
  <div class="text-6xl mb-4">👨‍💻</div>
  <div class="text-2xl font-bold mb-1">Lars de Bruijn</div>
  <div class="text-blue-400 font-medium mb-4">Test Automation Engineer</div>
  <div class="grid grid-cols-2 gap-3 text-sm text-left">
    <div class="bg-white/5 rounded-lg px-3 py-2">🗓️ ~5 years in QA</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">⌨️ TypeScript · Playwright</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">🤖 AI-assisted testing</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">🌍 TechChamps</div>
  </div>
  <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-sm text-left">
    <div class="bg-blue-500/10 rounded-lg px-3 py-2">🎸 Guitar</div>
    <div class="bg-blue-500/10 rounded-lg px-3 py-2">🖥️ Homelab</div>
  </div>
</div>

<div class="bg-gradient-to-br from-purple-900/40 to-purple-700/20 border border-purple-500/30 rounded-2xl p-8 text-center">
  <div class="text-6xl mb-4">🧑‍🔬</div>
  <div class="text-2xl font-bold mb-1">Marco Maes</div>
  <div class="text-purple-400 font-medium mb-4">Test Automation Architect</div>
  <div class="grid grid-cols-2 gap-3 text-sm text-left">
    <div class="bg-white/5 rounded-lg px-3 py-2">🗓️ ~10 years in QA</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">⌨️ TypeScript · Playwright</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">🎤 Trainer</div>
    <div class="bg-white/5 rounded-lg px-3 py-2">🤝 Polteq</div>
  </div>
  <div class="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-sm text-left">
    <div class="bg-purple-500/10 rounded-lg px-3 py-2">🏃 Runner</div>
    <div class="bg-purple-500/10 rounded-lg px-3 py-2">📚 Sci-fi reader</div>
  </div>
</div>

</div>

---
layout: center
---

<div class="text-center mb-8">
  <span class="text-sm uppercase tracking-widest text-gray-500 font-semibold">The Problem</span>
</div>

<div class="bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-2xl p-10 text-center max-w-3xl mx-auto mb-8">
  <div class="text-4xl font-bold leading-relaxed mb-4">
    Most test suites don't fail<br>
    because of missing tests.
  </div>
  <div class="text-lg text-gray-400 mt-4">
    They fail because there's no scalable foundation to build on.<br>
    <strong class="text-red-300">AI accelerates output, but it also accelerates technical debt.</strong>
  </div>
</div>

<div class="border-l-4 border-yellow-500/60 bg-yellow-900/10 rounded-r-xl px-6 py-4 max-w-3xl mx-auto text-left">
  <p class="text-lg italic text-gray-300 leading-relaxed">
    "If you think good architecture is expensive, try bad architecture."
  </p>
  <p class="text-sm text-yellow-400/80 mt-2 font-medium">— Brian Foote &amp; Joseph Yoder</p>
</div>

---
layout: center
class: text-center
---

# The Goal

<div class="grid grid-cols-3 gap-8 mt-10 text-center">

<div class="relative rounded-xl p-8 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.06)); border: 1px solid rgba(63,185,80,0.35); box-shadow: 0 0 24px rgba(63,185,80,0.08);">
  <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
  <div class="text-5xl mb-5">🏗️</div>
  <div class="text-xl font-bold mb-3 text-[#3fb950]">Maintainable</div>
  <div class="text-gray-400 text-sm leading-relaxed">Change one thing,<br>break nothing</div>
</div>

<div class="relative rounded-xl p-8 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.06)); border: 1px solid rgba(88,166,255,0.35); box-shadow: 0 0 24px rgba(88,166,255,0.08);">
  <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
  <div class="text-5xl mb-5">⚡</div>
  <div class="text-xl font-bold mb-3 text-[#58a6ff]">Scalable</div>
  <div class="text-gray-400 text-sm leading-relaxed">100 tests or 10,000 —<br>same confidence</div>
</div>

<div class="relative rounded-xl p-8 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(210,168,255,0.06)); border: 1px solid rgba(210,168,255,0.35); box-shadow: 0 0 24px rgba(210,168,255,0.08);">
  <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style="background: linear-gradient(90deg, transparent, #d2a8ff, transparent);"></div>
  <div class="text-5xl mb-5">🤖</div>
  <div class="text-xl font-bold mb-3 text-[#d2a8ff]">AI-Ready</div>
  <div class="text-gray-400 text-sm leading-relaxed">Patterns AI can follow<br>and extend correctly</div>
</div>

</div>

---
layout: center
---

<div class="text-center mb-7">
  <h1 class="text-3xl font-bold text-white tracking-tight">What We'll Cover</h1>
  <div class="mt-2 mx-auto w-16 h-[2px] rounded-full" style="background: linear-gradient(90deg, #3fb950, #58a6ff, #d2a8ff);"></div>
</div>

<div class="grid grid-cols-5 gap-3 max-w-4xl mx-auto">

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.07)); border: 1px solid rgba(63,185,80,0.4); box-shadow: 0 0 16px rgba(63,185,80,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
  <div class="text-2xl mb-2">📁</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Folder<br>Structure</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#3fb950] bg-[#3fb950]/10 rounded px-1 inline-block">#1</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.07)); border: 1px solid rgba(63,185,80,0.4); box-shadow: 0 0 16px rgba(63,185,80,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
  <div class="text-2xl mb-2">⚙️</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Playwright<br>Config</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#3fb950] bg-[#3fb950]/10 rounded px-1 inline-block">#2</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.07)); border: 1px solid rgba(63,185,80,0.4); box-shadow: 0 0 16px rgba(63,185,80,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
  <div class="text-2xl mb-2">🏛️</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Page Object<br>Model</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#3fb950] bg-[#3fb950]/10 rounded px-1 inline-block">#3</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.07)); border: 1px solid rgba(88,166,255,0.4); box-shadow: 0 0 16px rgba(88,166,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
  <div class="text-2xl mb-2">⚡</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Parallel<br>Workers</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#58a6ff] bg-[#58a6ff]/10 rounded px-1 inline-block">#4</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.07)); border: 1px solid rgba(88,166,255,0.4); box-shadow: 0 0 16px rgba(88,166,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
  <div class="text-2xl mb-2">💾</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Storage<br>State</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#58a6ff] bg-[#58a6ff]/10 rounded px-1 inline-block">#5</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.07)); border: 1px solid rgba(88,166,255,0.4); box-shadow: 0 0 16px rgba(88,166,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
  <div class="text-2xl mb-2">🪝</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Hooks &amp;<br>Fixtures</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#58a6ff] bg-[#58a6ff]/10 rounded px-1 inline-block">#6</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(210,168,255,0.07)); border: 1px solid rgba(210,168,255,0.4); box-shadow: 0 0 16px rgba(210,168,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #d2a8ff, transparent);"></div>
  <div class="text-2xl mb-2">🌍</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Global Setup<br>&amp; Teardown</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#d2a8ff] bg-[#d2a8ff]/10 rounded px-1 inline-block">#7</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(210,168,255,0.07)); border: 1px solid rgba(210,168,255,0.4); box-shadow: 0 0 16px rgba(210,168,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #d2a8ff, transparent);"></div>
  <div class="text-2xl mb-2">🔀</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Sharding</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#d2a8ff] bg-[#d2a8ff]/10 rounded px-1 inline-block">#8</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(210,168,255,0.07)); border: 1px solid rgba(210,168,255,0.4); box-shadow: 0 0 16px rgba(210,168,255,0.07);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #d2a8ff, transparent);"></div>
  <div class="text-2xl mb-2">🎨</div>
  <div class="text-xs font-mono font-semibold text-gray-300 leading-tight">Design<br>Patterns</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-[#d2a8ff] bg-[#d2a8ff]/10 rounded px-1 inline-block">#9</div>
</div>

<div class="relative rounded-xl p-4 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(251,191,36,0.09)); border: 1px solid rgba(251,191,36,0.45); box-shadow: 0 0 20px rgba(251,191,36,0.1);">
  <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #fbbf24, transparent);"></div>
  <div class="text-2xl mb-2">🤖</div>
  <div class="text-xs font-mono font-semibold text-yellow-300 leading-tight">AI Tips<br>&amp; Agents</div>
  <div class="mt-2 text-[10px] font-mono font-bold text-yellow-400 bg-yellow-400/10 rounded px-1 inline-block">#10</div>
</div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ ls ./framework --topic</div>

# 📁 Folder Structure

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"A Folder Layout that Shields Tests from Internal Complexity"</span>
</div>

---
layout: default
---

# Two Worlds, One Repo

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="relative rounded-xl p-8 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.06)); border: 1px solid rgba(63,185,80,0.35); box-shadow: 0 0 24px rgba(63,185,80,0.08);">
  <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
  <div class="text-5xl mb-4">🧪</div>
  <div class="text-xl font-bold font-mono mb-1 text-[#3fb950]">tests/</div>
  <div class="text-sm text-gray-500 uppercase tracking-widest mb-4">What to test</div>
  <div class="text-gray-300 text-sm leading-relaxed">The intent. The business flows.<br>A new team member reads this<br>and understands the product.</div>
  <div class="mt-6 text-gray-500 text-xs font-mono tracking-wide">ui/ · api/ · e2e/</div>
</div>

<div class="relative rounded-xl p-8 text-center overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.06)); border: 1px solid rgba(88,166,255,0.35); box-shadow: 0 0 24px rgba(88,166,255,0.08);">
  <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
  <div class="text-5xl mb-4">🔧</div>
  <div class="text-xl font-bold font-mono mb-1 text-[#58a6ff]">support/</div>
  <div class="text-sm text-gray-500 uppercase tracking-widest mb-4">How to test it</div>
  <div class="text-gray-300 text-sm leading-relaxed">The mechanics. Selectors, helpers,<br>config, page objects, utilities.<br>The engine under the hood.</div>
  <div class="mt-6 text-gray-500 text-xs font-mono tracking-wide">pages/ · utils/ · config/ · environment/</div>
</div>

</div>

<div class="text-center mt-8 text-base text-yellow-400/90 py-3 rounded-lg" style="background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.2);">
  Tests should read like specifications. Support handles the rest.
</div>

---
layout: default
---

# Folder Structure at a Glance

<div class="grid grid-cols-2 gap-10 mt-6">

<div>

<div class="font-mono text-sm leading-8 text-gray-300">
<span class="text-blue-400">tests/</span><br>
&nbsp;&nbsp;<span class="text-green-400">ui/</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;auth/<br>
&nbsp;&nbsp;&nbsp;&nbsp;checkout/<br>
&nbsp;&nbsp;&nbsp;&nbsp;dashboard/<br>
&nbsp;&nbsp;<span class="text-green-400">api/</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;users/<br>
&nbsp;&nbsp;&nbsp;&nbsp;orders/<br>
&nbsp;&nbsp;<span class="text-yellow-400">.auth/</span> ← saved login state
</div>

</div>

<div>

<div class="font-mono text-sm leading-8 text-gray-300">
<span class="text-blue-400">support/</span><br>
&nbsp;&nbsp;<span class="text-purple-400">pages/</span> ← Page Objects<br>
&nbsp;&nbsp;<span class="text-purple-400">utils/</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;fixtures/ ← custom test fixtures<br>
&nbsp;&nbsp;&nbsp;&nbsp;helpers/<br>
&nbsp;&nbsp;<span class="text-orange-400">config/</span><br>
&nbsp;&nbsp;<span class="text-orange-400">environment/</span> ← .env files<br>
&nbsp;&nbsp;<span class="text-orange-400">test-data/</span><br>
&nbsp;&nbsp;<span class="text-red-400">globalSetup.ts</span><br>
&nbsp;&nbsp;<span class="text-red-400">globalTeardown.ts</span>
</div>

</div>

</div>

<div class="mt-8 text-center text-gray-400">
Predictable structure → any team member (or AI) knows exactly where to look
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">ls tests/ support/</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 📁 Folder Structure
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ cat playwright.config.ts</div>

# ⚙️ Playwright Config

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Centralized Config for Multi-Project Scaling"</span>
</div>

---
layout: default
---

# The Config is the Contract

<div class="font-mono text-center text-gray-500 text-sm mt-4 mb-10">
<span class="text-[#3fb950]">// </span>one file defines the rules every test plays by
</div>

<div class="grid grid-cols-3 gap-6">

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6 text-center">
  <div class="text-4xl mb-3">🎯</div>
  <div class="font-bold mb-2">Test Behaviour</div>
  <div class="text-sm text-gray-400">Timeouts · Retries<br>Parallelism · Reporters</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6 text-center">
  <div class="text-4xl mb-3">🌐</div>
  <div class="font-bold mb-2">Browser & App</div>
  <div class="text-sm text-gray-400">Base URL · Devices<br>Selectors · Tracing</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6 text-center">
  <div class="text-4xl mb-3">📦</div>
  <div class="font-bold mb-2">Projects</div>
  <div class="text-sm text-gray-400">Auth setup → Chrome<br>Multi-browser · Roles</div>
</div>

</div>

<div class="mt-10 grid grid-cols-2 gap-8">

<div class="bg-[#0d1117] border border-[#3fb950]/30 rounded-lg p-4">
  <div class="text-sm font-mono font-bold text-[#3fb950] mb-2">// key decisions made here</div>
  <div class="text-sm font-mono text-gray-300 space-y-1">
    <div><span class="text-[#ffa657]">testIdAttribute</span>: <span class="text-[#a5d6ff]">'data-test'</span></div>
    <div><span class="text-[#ffa657]">trace</span>: <span class="text-[#a5d6ff]">'on'</span></div>
    <div><span class="text-[#ffa657]">retries</span>: <span class="text-[#d2a8ff]">CI</span> ? <span class="text-[#79c0ff]">2</span> : <span class="text-[#79c0ff]">1</span></div>
  </div>
</div>

<div class="bg-[#0d1117] border border-[#ffa657]/30 rounded-lg p-4">
  <div class="text-sm font-mono font-bold text-[#ffa657] mb-2">// project dependency chain</div>
  <div class="text-sm text-gray-300 space-y-1">
    <div>· <code>setup</code> project runs first</div>
    <div>· Saves auth state to disk</div>
    <div>· Browser projects depend on it</div>
  </div>
</div>

</div>
---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code playwright.config.ts</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // ⚙️ Playwright Config
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ tsc --pattern "support/pages/**/*.ts"</div>

# 🏛️ Page Object Model

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Reusable Page Classes for Scalable UI Tests"</span>
</div>

---
layout: default
---

# What is the Page Object Model?

<div class="grid grid-cols-2 gap-12 mt-6">

<div class="text-center">

<div class="text-5xl mb-4">📄</div>

## Without POM

<div class="mt-4 text-gray-300 text-sm">
Tests contain selectors directly.<br>
The same locator appears in 20 files.<br>
One UI change → update 20 tests.
</div>

<div class="mt-6 bg-red-900/20 border border-red-800 rounded-lg p-4 text-sm text-gray-400">
  Fragile · Duplicated · Hard to read
</div>

</div>

<div class="text-center">

<div class="text-5xl mb-4">🏛️</div>

## With POM

<div class="mt-4 text-gray-300 text-sm">
Each page/component = one class.<br>
Selectors live in one place.<br>
Tests call methods, not locators.
</div>

<div class="mt-6 bg-green-900/20 border border-green-800 rounded-lg p-4 text-sm text-gray-400">
  Maintainable · Reusable · Readable
</div>

</div>

</div>

<div class="mt-10 text-center text-lg">
UI changes → update <strong class="text-green-400">one class</strong>, not dozens of tests
</div>

---
layout: default
---

# POM Structure

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6">
  <div class="text-3xl mb-3 text-center">📝</div>
  <div class="font-bold text-center mb-4">Page Class</div>
  <div class="text-sm text-gray-400 space-y-2">
    <div>· Constructor receives <code>page</code></div>
    <div>· Locators as class properties</div>
    <div>· Actions as methods</div>
    <div>· No assertions inside</div>
  </div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6">
  <div class="text-3xl mb-3 text-center">🧩</div>
  <div class="font-bold text-center mb-4">Shared Components</div>
  <div class="text-sm text-gray-400 space-y-2">
    <div>· Navbar, modals, toasts</div>
    <div>· Used across page objects</div>
    <div>· Composed, not duplicated</div>
    <div>· One place to maintain</div>
  </div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-6">
  <div class="text-3xl mb-3 text-center">🔌</div>
  <div class="font-bold text-center mb-4">Fixtures</div>
  <div class="text-sm text-gray-400 space-y-2">
    <div>· Inject page objects into tests</div>
    <div>· Declare once, use everywhere</div>
    <div>· Auto teardown after test</div>
    <div>· Fully typed</div>
  </div>
</div>

</div>

<div class="mt-8 text-center text-gray-400">
The test says <strong class="text-white">"what"</strong> happens. The Page Object knows <strong class="text-white">"how"</strong> to do it.
</div>


---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 space-y-2 leading-7">
      <div><span class="text-[#3fb950]">$</span> <span class="text-gray-400">cd</span> <span class="text-[#58a6ff]">support/pages/</span></div>
      <div><span class="text-[#3fb950]">$</span> <span class="text-[#d2a8ff]">ls</span></div>
      <div class="pl-4 text-gray-500">
        <span class="text-[#58a6ff]">login.page.ts</span>
        <span class="mx-3 text-gray-700">·</span>
        <span class="text-[#58a6ff]">dashboard.page.ts</span>
        <span class="mx-3 text-gray-700">·</span>
        <span class="text-[#58a6ff]">base.page.ts</span>
      </div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // Page Object Model
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ npx playwright test --workers=auto</div>

# ⚡ Parallel Tests & Workers

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"More Workers, Less Waiting — Scale Without Chaos"</span>
</div>

---
layout: default
---

# Parallelism — Speed With Control

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="flex flex-col gap-4">

  <div class="rounded-xl overflow-hidden" style="border: 1px solid #30363d;">
    <div class="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
      <span class="ml-2 text-xs text-gray-500 font-mono">playwright.config.ts</span>
    </div>
    <div class="bg-[#0d1117] px-5 py-4 font-mono text-sm leading-7">
      <div><span class="text-[#d2a8ff]">export default</span> <span class="text-[#58a6ff]">defineConfig</span><span class="text-gray-400">({"{"}</span></div>
      <div class="pl-4"><span class="text-[#79c0ff]">workers</span><span class="text-gray-400">:</span> <span class="text-[#3fb950]">process.env.CI</span> <span class="text-gray-400">?</span> <span class="text-[#ffa657]">4</span> <span class="text-gray-400">:</span> <span class="text-[#ffa657]">2</span><span class="text-gray-400">,</span></div>
      <div class="pl-4"><span class="text-[#79c0ff]">fullyParallel</span><span class="text-gray-400">:</span> <span class="text-[#3fb950]">true</span><span class="text-gray-400">,</span></div>
      <div class="pl-4"><span class="text-[#79c0ff]">retries</span><span class="text-gray-400">:</span> <span class="text-[#3fb950]">process.env.CI</span> <span class="text-gray-400">?</span> <span class="text-[#ffa657]">2</span> <span class="text-gray-400">:</span> <span class="text-[#ffa657]">0</span><span class="text-gray-400">,</span></div>
      <div><span class="text-gray-400">{"}"}</span><span class="text-gray-400">)</span></div>
    </div>
  </div>

  <div class="rounded-xl p-4 font-mono text-xs" style="background: rgba(63,185,80,0.05); border: 1px solid rgba(63,185,80,0.25);">
    <div class="text-[#3fb950]/60 mb-2 uppercase tracking-widest text-[10px]">tip</div>
    <span class="text-gray-300">Each worker gets its own </span><span class="text-[#58a6ff]">BrowserContext</span><span class="text-gray-300"> — fully isolated, no shared state.</span>
  </div>

</div>

<div class="flex flex-col gap-3">

  <div class="relative rounded-xl p-4 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(63,185,80,0.06)); border: 1px solid rgba(63,185,80,0.35);">
    <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #3fb950, transparent);"></div>
    <div class="flex items-center gap-3">
      <span class="text-xl">⚡</span>
      <div>
        <div class="text-sm font-bold text-[#3fb950]">fullyParallel</div>
        <div class="text-xs text-gray-400 mt-0.5">Tests within a file run in parallel too — not just file-by-file</div>
      </div>
    </div>
  </div>

  <div class="relative rounded-xl p-4 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(88,166,255,0.06)); border: 1px solid rgba(88,166,255,0.35);">
    <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #58a6ff, transparent);"></div>
    <div class="flex items-center gap-3">
      <span class="text-xl">🔢</span>
      <div>
        <div class="text-sm font-bold text-[#58a6ff]">workers: 'auto'</div>
        <div class="text-xs text-gray-400 mt-0.5">Playwright picks the count — half your CPU cores by default</div>
      </div>
    </div>
  </div>

  <div class="relative rounded-xl p-4 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(210,168,255,0.06)); border: 1px solid rgba(210,168,255,0.35);">
    <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #d2a8ff, transparent);"></div>
    <div class="flex items-center gap-3">
      <span class="text-xl">🔒</span>
      <div>
        <div class="text-sm font-bold text-[#d2a8ff]">test.describe.serial()</div>
        <div class="text-xs text-gray-400 mt-0.5">Force sequential execution when order truly matters</div>
      </div>
    </div>
  </div>

  <div class="relative rounded-xl p-4 overflow-hidden" style="background: linear-gradient(145deg, #0d1117 60%, rgba(251,191,36,0.06)); border: 1px solid rgba(251,191,36,0.3);">
    <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: linear-gradient(90deg, transparent, #fbbf24, transparent);"></div>
    <div class="flex items-center gap-3">
      <span class="text-xl">🔁</span>
      <div>
        <div class="text-sm font-bold text-yellow-300">retries on CI</div>
        <div class="text-xs text-gray-400 mt-0.5">Network flakiness is real — retry on CI, fail fast locally</div>
      </div>
    </div>
  </div>

</div>
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">npx playwright test --workers=auto</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // ⚡ Parallel Tests &amp; Workers
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ cat tests/.auth/user.json | jq '.cookies | length'</div>

# 💾 Storage State

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Log In Once. Test Everything."</span>
</div>

---
layout: default
---

# The Login Tax

<div class="grid grid-cols-2 gap-12 mt-6">

<div class="text-center">

<div class="text-6xl mb-4">😓</div>

## Without Storage State

<div class="mt-4 text-gray-300">
Every test logs in.<br>
Every test waits for auth.<br>
Every test hits the auth server.
</div>

<div class="mt-6 bg-red-900/30 border border-red-700 rounded-lg p-4">
  <div class="text-2xl font-bold text-red-400">100 tests × 3s login</div>
  <div class="text-gray-400 mt-1">= 5 minutes wasted, every run</div>
</div>

</div>

<div class="text-center">

<div class="text-6xl mb-4">🚀</div>

## With Storage State

<div class="mt-4 text-gray-300">
Login runs <strong>once</strong> before the suite.<br>
Auth state saved to a JSON file.<br>
All tests load it instantly.
</div>

<div class="mt-6 bg-green-900/30 border border-green-700 rounded-lg p-4">
  <div class="text-2xl font-bold text-green-400">1 login, 100 tests benefit</div>
  <div class="text-gray-400 mt-1">Setup project → all browser projects</div>
</div>

</div>

</div>

---
layout: default
---

# Multiple Roles, Multiple States

<div class="text-center text-gray-400 mb-8">
Real apps have multiple user types — your framework should too
</div>

<div class="flex justify-center gap-6 mt-6">

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 text-center w-40">
  <div class="text-4xl mb-3">👑</div>
  <div class="font-bold">Admin</div>
  <div class="text-xs text-gray-400 mt-2">admin.json</div>
</div>

<div class="flex items-center text-2xl text-gray-600">→</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 text-center w-40">
  <div class="text-4xl mb-3">🛒</div>
  <div class="font-bold">Buyer</div>
  <div class="text-xs text-gray-400 mt-2">buyer.json</div>
</div>

<div class="flex items-center text-2xl text-gray-600">→</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 text-center w-40">
  <div class="text-4xl mb-3">👀</div>
  <div class="font-bold">Read-only</div>
  <div class="text-xs text-gray-400 mt-2">viewer.json</div>
</div>

</div>

<div class="mt-10 grid grid-cols-3 gap-4 text-center text-sm">

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
  <div class="font-bold mb-2">setup project</div>
  <div class="text-gray-400">Runs once.<br>Authenticates all roles.<br>Saves state files.</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
  <div class="font-bold mb-2">admin-tests project</div>
  <div class="text-gray-400">Loads admin.json.<br>All tests start<br>already authenticated.</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
  <div class="font-bold mb-2">buyer-tests project</div>
  <div class="text-gray-400">Loads buyer.json.<br>Same pattern,<br>different permissions.</div>
</div>

</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code tests/.auth/</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 💾 Storage State
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ grep -r "beforeAll\|beforeEach\|test.extend" support/</div>

# 🪝 Hooks & Fixtures

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Stop Repeating Setup — Inject What Tests Need"</span>
</div>

---
layout: default
---

# Hooks — The Lifecycle of a Test

<div class="mt-6">

<div class="flex items-center gap-4 mb-3">
  <div class="w-32 text-right text-sm text-gray-400">Suite starts</div>
  <div class="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
  <div class="bg-blue-900/30 border border-blue-700 rounded px-4 py-2 text-sm flex-1"><strong>beforeAll</strong> — run once. Expensive setup: seed data, start services, create shared resources that are specific to that test suite.</div>
</div>

<div class="flex items-center gap-4 mb-3 ml-12">
  <div class="w-20 text-right text-sm text-gray-400">Each test</div>
  <div class="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
  <div class="bg-green-900/30 border border-green-700 rounded px-4 py-2 text-sm flex-1"><strong>beforeEach</strong> — reset state, navigate to starting page, prepare fresh context.</div>
</div>

<div class="flex items-center gap-4 mb-3 ml-24">
  <div class="w-8 text-right text-sm text-gray-400"></div>
  <div class="w-4 h-4 rounded-full bg-white flex-shrink-0"></div>
  <div class="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-sm flex-1 font-bold">🧪 TEST RUNS</div>
</div>

<div class="flex items-center gap-4 mb-3 ml-12">
  <div class="w-20 text-right text-sm text-gray-400">Each test</div>
  <div class="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
  <div class="bg-yellow-900/30 border border-yellow-700 rounded px-4 py-2 text-sm flex-1"><strong>afterEach</strong> — clear cookies, reset local storage, capture screenshots on failure.</div>
</div>

<div class="flex items-center gap-4 ml-0">
  <div class="w-32 text-right text-sm text-gray-400">Suite ends</div>
  <div class="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
  <div class="bg-red-900/30 border border-red-700 rounded px-4 py-2 text-sm flex-1"><strong>afterAll</strong> — cleanup: delete test data, close connections, remove created resources that are specific to that test suite.</div>
</div>

<div class="mt-8 text-center px-4">
  <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Design principle</div>
  <div class="text-sm text-gray-400 italic bg-gray-900/40 border border-gray-700 rounded px-4 py-2">
    “Good hooks keep your tests clean, fast, and independent.”
  </div>
</div>

</div>

---
layout: default
---

# Fixtures — How They Work

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="space-y-4">

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
  <div class="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-4">Under the hood</div>
  <div class="space-y-3 text-sm">
    <div class="flex gap-3 items-start">
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">1</div>
      <div class="text-gray-300">A test <strong class="text-white">declares what it needs</strong> by name in its arguments</div>
    </div>
    <div class="flex gap-3 items-start">
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">2</div>
      <div class="text-gray-300">Playwright runs the fixture's <strong class="text-white">setup logic</strong> before the test body</div>
    </div>
    <div class="flex gap-3 items-start">
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">3</div>
      <div class="text-gray-300">The ready object is <strong class="text-white">injected into the test</strong> — no manual instantiation</div>
    </div>
    <div class="flex gap-3 items-start">
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0 mt-0.5">4</div>
      <div class="text-gray-300">After the test completes, Playwright runs <strong class="text-white">teardown automatically</strong> — no matter if the test passed or failed</div>
    </div>
  </div>
</div>

<div class="bg-[#0d1117] border border-yellow-500/30 rounded-xl p-5">
  <div class="text-xs font-bold text-yellow-400 uppercase tracking-wide mb-3">Fixtures compose</div>
  <div class="text-sm text-gray-400">
    A fixture can depend on other fixtures. Playwright resolves the full dependency graph — setup and teardown in the right order, every time.
  </div>
  <div class="mt-3 flex items-center gap-2 text-sm">
    <span class="text-blue-300">page</span>
    <span class="text-gray-500">→</span>
    <span class="text-emerald-300">loginPage</span>
    <span class="text-gray-500">→</span>
    <span class="text-purple-300">cartPage</span>
  </div>
</div>

</div>

<div class="space-y-4">

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
  <div class="text-xs font-bold text-blue-400 uppercase tracking-wide mb-4">Why this scales</div>
  <div class="space-y-3 text-sm text-gray-300">
    <div class="flex gap-3 items-start">
      <span class="text-blue-400 mt-1">▸</span>
      <div><strong class="text-white">Define once</strong> — every test file in the project can use it by just declaring the name</div>
    </div>
    <div class="flex gap-3 items-start">
      <span class="text-blue-400 mt-1">▸</span>
      <div><strong class="text-white">No copy-paste setup</strong> — adding a new test never means duplicating boilerplate</div>
    </div>
    <div class="flex gap-3 items-start">
      <span class="text-blue-400 mt-1">▸</span>
      <div><strong class="text-white">Teardown is guaranteed</strong> — cleanup can't be forgotten, state can't leak between tests</div>
    </div>
    <div class="flex gap-3 items-start">
      <span class="text-blue-400 mt-1">▸</span>
      <div><strong class="text-white">Fully typed</strong> — TypeScript knows exactly what each fixture provides, across the whole codebase</div>
    </div>
  </div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-sm text-center">
  <div class="text-gray-400 mb-2">A fixture can be anything your tests need</div>
  <div class="flex flex-wrap justify-center gap-2">
    <span class="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-emerald-300">Page Object</span>
    <span class="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-blue-300">API Client</span>
    <span class="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-purple-300">Auth Context</span>
    <span class="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-yellow-300">Test Data</span>
    <span class="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-orange-300">DB Connection</span>
  </div>
</div>

</div>

</div>

---
layout: default
---

# Hooks vs Fixtures — When to Use Which

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="p-5 bg-[#0d1117] border border-blue-500/30 rounded-xl">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-400 text-lg">🪝</div>
    <div class="font-bold">Hooks</div>
  </div>
  <div class="space-y-2 text-xs text-gray-300">
    <div class="flex gap-2"><span class="text-blue-400">·</span> Scoped to a single <code>describe</code> block</div>
    <div class="flex gap-2"><span class="text-blue-400">·</span> You write both setup <em>and</em> cleanup</div>
    <div class="flex gap-2"><span class="text-blue-400">·</span> Not reusable across files</div>
  </div>
  <div class="mt-4 bg-blue-900/20 border border-blue-800 rounded-lg p-3 text-xs">
    <div class="font-bold text-blue-300 mb-1">Best for</div>
    <div class="text-gray-400">Quick, one-off setup that only one test group needs — e.g. navigate to a specific page before each test in a suite</div>
  </div>
</div>

<div class="p-5 bg-[#0d1117] border border-emerald-500/30 rounded-xl">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-400 text-lg">🔌</div>
    <div class="font-bold">Fixtures</div>
  </div>
  <div class="space-y-2 text-xs text-gray-300">
    <div class="flex gap-2"><span class="text-emerald-400">·</span> Defined once, injected anywhere by name</div>
    <div class="flex gap-2"><span class="text-emerald-400">·</span> Playwright guarantees teardown. No leaks</div>
    <div class="flex gap-2"><span class="text-emerald-400">·</span> Composable: fixtures can use other fixtures</div>

  </div>
  <div class="mt-4 bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 text-xs">
    <div class="font-bold text-emerald-300 mb-1">Best for</div>
    <div class="text-gray-400">Page objects, API clients, authenticated contexts — anything shared across multiple test files or the whole team</div>
  </div>
</div>

</div>

<div class="mt-5 grid grid-cols-3 gap-3 text-center text-xs">

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
  <div class="text-xl mb-1">📦</div>
  <div class="font-bold text-white mb-1">Reusability</div>
  <div class="text-gray-400">Hooks: file-local<br><span class="text-emerald-400">Fixtures: project-wide</span></div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
  <div class="text-xl mb-1">🧹</div>
  <div class="font-bold text-white mb-1">Cleanup safety</div>
  <div class="text-gray-400">Hooks: manual<br><span class="text-emerald-400">Fixtures: guaranteed</span></div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-3">
  <div class="text-xl mb-1">📈</div>
  <div class="font-bold text-white mb-1">At scale</div>
  <div class="text-gray-400">Hooks: get messy<br><span class="text-emerald-400">Fixtures: stay clean</span></div>
</div>

</div>

<div class="mt-4 text-center text-xs font-semibold text-yellow-400">
Default to fixtures. Reach for hooks only when the setup truly belongs to one test group.
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code support/utils/fixtures/</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 🪝 Hooks &amp; Fixtures
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ node support/globalSetup.ts && node support/globalTeardown.ts</div>

# 🌍 Global Setup & Teardown

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Prepare the World Once — Then Let Tests Focus on Tests"</span>
</div>

---
layout: default
---

# Before Any Test Runs

<div class="text-center text-gray-400 mb-8">
Global setup runs once — before the first test, before any browser opens
</div>

<div class="grid grid-cols-4 gap-4 mt-4">

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-5 text-center">
  <div class="text-3xl mb-3">🌿</div>
  <div class="font-bold text-sm mb-2">Load Environment</div>
  <div class="text-xs text-gray-400">Read .env files<br>Set process.env<br>Global then env-specific</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-5 text-center">
  <div class="text-3xl mb-3">🐳</div>
  <div class="font-bold text-sm mb-2">Check Infrastructure</div>
  <div class="text-xs text-gray-400">Is Docker running?<br>Is the app reachable?<br>Start if needed</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-5 text-center">
  <div class="text-3xl mb-3">🗄️</div>
  <div class="font-bold text-sm mb-2">Reset Database</div>
  <div class="text-xs text-gray-400">Fresh migrations<br>Seed test data<br>Known starting state</div>
</div>

<div class="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-colors rounded-xl p-5 text-center">
  <div class="text-3xl mb-3">🧹</div>
  <div class="font-bold text-sm mb-2">Clean Stale State</div>
  <div class="text-xs text-gray-400">Remove old auth files<br>Clear temp data<br>Start clean</div>
</div>

</div>

<div class="mt-8 grid grid-cols-2 gap-6">

<div class="bg-green-900/20 border border-green-800 rounded-lg p-4 text-sm">
  <div class="font-bold text-green-400 mb-1">Global Setup</div>
  <div class="text-gray-400">Environment-level, not test-level · Setup test data · Runs once before all tests</div>
</div>

<div class="bg-red-900/20 border border-red-800 rounded-lg p-4 text-sm">
  <div class="font-bold text-red-400 mb-1">Global Teardown</div>
  <div class="text-gray-400">Restores environment to baseline · Clean test data · Runs once after all tests</div>
</div>

</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code support/globalSetup.ts</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 🌍 Global Setup &amp; Teardown
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ npx playwright test --shard=1/4</div>

# 🔀 Sharding

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Split the Suite, Multiply the Speed"</span>
</div>

---
layout: default
---

# What is a Shard?

<div class="mt-4 mb-4 text-center">
  <span class="bg-[#161b22] border border-[#3fb950]/40 text-[#3fb950] font-mono text-sm rounded-lg px-4 py-1.5">A shard = one isolated slice of your test suite running on its own machine</span>
</div>

<div class="grid grid-cols-3 gap-4 mt-2">

<div class="col-span-2">

<!-- What it is -->
<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 mb-3">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">What a shard is</div>
  <div class="space-y-2 text-sm text-gray-300">
    <div class="flex items-start gap-2">
      <span class="text-[#3fb950] font-bold mt-0.5">1</span>
      <span>Playwright divides all test files into <strong class="text-white">N equal buckets</strong> by file order</span>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-[#58a6ff] font-bold mt-0.5">2</span>
      <span>Each bucket is assigned an index: <code class="bg-white/10 px-1 rounded text-xs">--shard=2/4</code> means bucket 2 of 4</span>
    </div>
    <div class="flex items-start gap-2">
      <span class="text-[#d2a8ff] font-bold mt-0.5">3</span>
      <span>Only the tests in that bucket run — the rest are <strong class="text-white">skipped entirely</strong></span>
    </div>
  </div>
</div>

<!-- Where it lives -->
<div class="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Where a shard lives</div>
  <div class="flex gap-3">
    <div class="flex-1 bg-[#161b22] border border-[#58a6ff]/30 rounded-lg px-3 py-2 text-center">
      <div class="text-lg mb-1">🐳</div>
      <div class="text-xs font-bold text-[#58a6ff]">Docker</div>
      <div class="text-[10px] text-gray-500 mt-0.5">Container per shard</div>
    </div>
    <div class="flex-1 bg-[#161b22] border border-[#3fb950]/30 rounded-lg px-3 py-2 text-center">
      <div class="text-lg mb-1">⚙️</div>
      <div class="text-xs font-bold text-[#3fb950]">GitHub Actions</div>
      <div class="text-[10px] text-gray-500 mt-0.5">Runner per shard</div>
    </div>
    <div class="flex-1 bg-[#161b22] border border-[#d2a8ff]/30 rounded-lg px-3 py-2 text-center">
      <div class="text-lg mb-1">☁️</div>
      <div class="text-xs font-bold text-[#d2a8ff]">Cloud VM</div>
      <div class="text-[10px] text-gray-500 mt-0.5">Ephemeral machine</div>
    </div>
  </div>
</div>

</div>

<!-- Visual diagram -->
<div class="flex flex-col gap-2">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">4 shards in CI</div>

  <div v-for="i in 4" class="bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2.5 flex items-center gap-2">
    <div class="w-5 h-5 rounded-full bg-[#3fb950]/20 border border-[#3fb950]/50 flex items-center justify-center text-[10px] font-bold text-[#3fb950]">{{ i }}</div>
    <div class="flex-1">
      <div class="text-[10px] font-mono text-gray-400">--shard={{ i }}/4</div>
      <div class="flex gap-0.5 mt-1">
        <div v-for="j in 4" class="h-1.5 flex-1 rounded-sm" :class="j <= i ? 'bg-[#3fb950]/60' : 'bg-[#30363d]'"></div>
      </div>
    </div>
    <div class="text-[9px] text-gray-600">runner</div>
  </div>

  <div class="bg-yellow-900/15 border border-yellow-500/30 rounded-lg px-3 py-2 mt-1">
    <div class="text-[10px] text-yellow-200/80 leading-relaxed">Each runner boots a <strong>full environment</strong> — browsers, deps, app</div>
  </div>
</div>

</div>

---
layout: default
---

# Why Sharding?

<div class="text-center text-gray-400 text-sm mb-3">Your suite grows. CI gets slower. Developers wait. Feedback loops break.</div>

<div class="grid grid-cols-2 gap-4 mb-3">

<div class="bg-[#0d1117] border border-red-500/40 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2">
    <div class="text-2xl">🐌</div>
    <div class="font-bold text-base text-red-400">Without Sharding</div>
  </div>
  <div class="text-xs text-gray-400 mb-2">1 machine · all tests · sequential</div>
  <div class="space-y-1 font-mono text-xs text-gray-500 mb-2">
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">0 min</span>
      <div class="flex-1 bg-red-500/70 rounded h-3 flex items-center px-2 text-white text-[9px]">500 tests</div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">40 min</span>
      <span class="text-red-400">✗ done</span>
    </div>
  </div>
  <div class="text-center">
    <span class="text-2xl font-bold text-red-400">~40 min</span>
    <div class="text-xs text-gray-500">blocking your PR</div>
  </div>
</div>

<div class="bg-[#0d1117] border border-[#3fb950]/40 rounded-xl p-4">
  <div class="flex items-center gap-2 mb-2">
    <div class="text-2xl">⚡</div>
    <div class="font-bold text-base text-[#3fb950]">With Sharding (4×)</div>
  </div>
  <div class="text-xs text-gray-400 mb-2">4 machines · parallel · same tests</div>
  <div class="space-y-1 font-mono text-xs text-gray-500 mb-2">
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">shard 1/4</span>
      <div class="w-1/4 bg-[#3fb950]/70 rounded h-3 flex items-center px-1 text-white text-[9px]">125</div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">shard 2/4</span>
      <div class="w-1/4 bg-[#3fb950]/70 rounded h-3 flex items-center px-1 text-white text-[9px]">125</div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">shard 3/4</span>
      <div class="w-1/4 bg-[#3fb950]/70 rounded h-3 flex items-center px-1 text-white text-[9px]">125</div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-gray-600 w-14">shard 4/4</span>
      <div class="w-1/4 bg-[#3fb950]/70 rounded h-3 flex items-center px-1 text-white text-[9px]">125</div>
      </div>
  </div>
  <div class="text-center">
    <span class="text-2xl font-bold text-[#3fb950]">~10 min</span>
    <div class="text-xs text-gray-500">same confidence · 4× faster</div>
  </div>
</div>

</div>

<div class="grid grid-cols-4 gap-2 text-center text-xs">
  <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-2">
    <div class="text-gray-500 mb-1">1 shard</div>
    <div class="font-bold text-red-400 text-sm">~40 min</div>
    <div class="text-gray-600 text-[10px]">baseline</div>
  </div>
  <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-2">
    <div class="text-gray-500 mb-1">2 shards</div>
    <div class="font-bold text-orange-400 text-sm">~20 min</div>
    <div class="text-[#3fb950] text-[10px]">2× faster</div>
  </div>
  <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-2">
    <div class="text-gray-500 mb-1">4 shards</div>
    <div class="font-bold text-yellow-400 text-sm">~10 min</div>
    <div class="text-[#3fb950] text-[10px]">4× faster</div>
  </div>
  <div class="bg-[#0d1117] border border-[#30363d] rounded-lg p-2">
    <div class="text-gray-500 mb-1">8 shards</div>
    <div class="font-bold text-[#3fb950] text-sm">~5 min</div>
    <div class="text-[#3fb950] text-[10px]">8× faster</div>
  </div>
</div>

---
layout: default
---

# Sharding in Practice

<div class="grid grid-cols-3 gap-5 mt-5">

<!-- Formula -->
<div class="bg-[#0d1117] border border-[#d2a8ff]/40 rounded-xl p-5 flex flex-col items-center justify-center text-center">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Wall-clock time</div>
  <div class="text-3xl font-bold text-[#d2a8ff] mb-1">T / N</div>
  <div class="text-xs text-gray-500 mt-1"><span class="text-white">T</span> = total duration &nbsp;·&nbsp; <span class="text-white">N</span> = shards</div>
  <div class="mt-4 w-full border-t border-[#30363d] pt-4 text-xs text-gray-400 leading-relaxed">
    500 tests · 40 min serial<br>
    <span class="text-[#d2a8ff] font-bold">÷ 4 shards = ~10 min</span>
  </div>
</div>

<!-- Shard index formula -->
<div class="bg-[#0d1117] border border-[#ffa657]/40 rounded-xl p-5 flex flex-col items-center justify-center text-center">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Shard index range</div>
  <div class="font-mono text-sm text-[#ffa657] leading-loose">
    <div>start = ⌊(i−1)·T/N⌋</div>
    <div>end &nbsp;= ⌊i·T/N⌋ − 1</div>
  </div>
  <div class="mt-4 w-full border-t border-[#30363d] pt-4 text-xs text-gray-400 leading-relaxed">
    Playwright assigns by <span class="text-white">file order</span><br>
    <span class="text-[#ffa657]">no overlap, no gaps</span>
  </div>
</div>

<!-- Scaling table -->
<div class="bg-[#0d1117] border border-[#3fb950]/40 rounded-xl p-5">
  <div class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4 text-center">Speedup curve</div>
  <div class="space-y-2.5">
    <div v-for="row in [{n:1,t:'40 min',w:'w-full',c:'text-red-400',bc:'bg-red-500/40'},{n:2,t:'20 min',w:'w-1/2',c:'text-orange-400',bc:'bg-orange-500/40'},{n:4,t:'10 min',w:'w-1/4',c:'text-yellow-400',bc:'bg-yellow-500/40'},{n:8,t:'5 min',w:'w-1/8',c:'text-[#3fb950]',bc:'bg-[#3fb950]/50'}]" class="flex items-center gap-2">
      <div class="text-[10px] text-gray-500 w-10 text-right shrink-0">{{ row.n }}×</div>
      <div class="flex-1 bg-[#161b22] rounded h-3 overflow-hidden">
        <div class="h-full rounded" :class="[row.w, row.bc]"></div>
      </div>
      <div class="text-xs font-bold shrink-0" :class="row.c">{{ row.t }}</div>
    </div>
  </div>
  <div class="mt-4 text-[10px] text-gray-600 text-center">linear speedup — ideal conditions</div>
</div>

</div>

<!-- Bottom note -->
<div class="mt-4 flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-xs text-gray-400">
  <span class="text-yellow-400 text-base">⚠</span>
  <span>Speedup is <strong class="text-white">linear only when tests are evenly distributed</strong> — large test files skew shard duration. Keep files small.</span>
</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code .github/workflows/</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 🔀 Sharding
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ grep -r "Builder\|Factory\|Facade\|Strategy" support/</div>

# 🎨 Design Patterns

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Proven Solutions to Problems Every Test Suite Eventually Hits"</span>
</div>

---
layout: default
---

# Why Design Patterns in Tests?

<div class="text-center text-gray-500 text-sm mb-6 tracking-wide uppercase font-semibold">Test code is production code. It deserves the same respect.</div>

<div class="grid grid-cols-4 gap-4 mt-2">

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#58a6ff]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#58a6ff]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-2xl mb-4">🏗️</div>
  <div class="font-bold text-[#58a6ff] mb-2">Builder</div>
  <div class="text-xs text-gray-400 leading-relaxed">Construct test data step by step — readable, no copy-paste objects</div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">new UserBuilder()<br>.withRole('admin')<br>.build()</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#3fb950]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#3fb950]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-2xl mb-4">🏭</div>
  <div class="font-bold text-[#3fb950] mb-2">Factory</div>
  <div class="text-xs text-gray-400 leading-relaxed">Centralize resource creation — one place to create, one place to clean up</div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">UserFactory.create()<br>OrderFactory.create()<br>// auto-teardown</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#ffa657]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#ffa657]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#ffa657]/10 border border-[#ffa657]/30 flex items-center justify-center text-2xl mb-4">🔀</div>
  <div class="font-bold text-[#ffa657] mb-2">Strategy</div>
  <div class="text-xs text-gray-400 leading-relaxed">Swap behavior per environment — same tests run on tst, acc, prd</div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">AuthStrategy.for(env)<br>// config drives<br>// the difference</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#d2a8ff]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#d2a8ff]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 flex items-center justify-center text-2xl mb-4">🎭</div>
  <div class="font-bold text-[#d2a8ff] mb-2">Facade</div>
  <div class="text-xs text-gray-400 leading-relaxed">Wrap Playwright behind a clean interface — hide complexity from tests</div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">api.createUser()<br>db.seedProduct()<br>// no raw client</div>
</div>

</div>

<div class="mt-5 flex items-center justify-center gap-2 bg-yellow-900/10 border border-yellow-500/25 rounded-xl px-5 py-3 text-xs text-yellow-200/80">
  <span class="text-yellow-400 text-base">✦</span>
  Consistent patterns let AI generate code that <strong class="text-white">fits your framework on the first try</strong>
</div>

---
layout: default
---

# Patterns in Context

<div class="text-center text-gray-500 text-sm mb-6 tracking-wide uppercase font-semibold">When to reach for each pattern</div>

<div class="grid grid-cols-3 gap-4 mt-2">

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#58a6ff]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#58a6ff]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-2xl mb-4">🏗️</div>
  <div class="font-bold text-[#58a6ff] mb-3">Builder</div>
  <div class="space-y-2 w-full text-left">
    <div class="bg-[#58a6ff]/5 border border-[#58a6ff]/15 rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-[#58a6ff]/60 font-semibold mb-0.5">Use when</div>
      <div class="text-xs text-gray-300">Test data has many optional fields</div>
    </div>
    <div class="bg-white/3 border border-[#30363d] rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-0.5">Benefit</div>
      <div class="text-xs text-gray-400">Defaults for everything, override only what matters</div>
    </div>
  </div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">new UserBuilder()<br>.asAdmin().build()</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#3fb950]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#3fb950]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-2xl mb-4">🏭</div>
  <div class="font-bold text-[#3fb950] mb-3">Factory</div>
  <div class="space-y-2 w-full text-left">
    <div class="bg-[#3fb950]/5 border border-[#3fb950]/15 rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-[#3fb950]/60 font-semibold mb-0.5">Use when</div>
      <div class="text-xs text-gray-300">Creating resources via API for preconditions</div>
    </div>
    <div class="bg-white/3 border border-[#30363d] rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-0.5">Benefit</div>
      <div class="text-xs text-gray-400">Fast setup, clean teardown, no UI dependency</div>
    </div>
  </div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">factory.createOrder(userId)<br>// auto-teardown</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#d2a8ff]/30 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#d2a8ff]/60 transition-colors">
  <div class="w-12 h-12 rounded-xl bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 flex items-center justify-center text-2xl mb-4">🎭</div>
  <div class="font-bold text-[#d2a8ff] mb-3">Facade</div>
  <div class="space-y-2 w-full text-left">
    <div class="bg-[#d2a8ff]/5 border border-[#d2a8ff]/15 rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-[#d2a8ff]/60 font-semibold mb-0.5">Use when</div>
      <div class="text-xs text-gray-300">Wrapping Playwright API or external services</div>
    </div>
    <div class="bg-white/3 border border-[#30363d] rounded-lg px-3 py-2">
      <div class="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-0.5">Benefit</div>
      <div class="text-xs text-gray-400">Tests stay clean, complexity stays hidden</div>
    </div>
  </div>
  <div class="mt-4 pt-3 border-t border-[#30363d] w-full text-[10px] font-mono text-gray-600">userApi.create(data)<br>// no raw client</div>
</div>

</div>

---
layout: center
---

<div class="flex flex-col items-center justify-center gap-10 h-full">

  <div class="text-center">
    <div class="text-6xl mb-5 drop-shadow-[0_0_24px_rgba(63,185,80,0.5)]">💻</div>
    <div class="text-5xl font-bold tracking-tight bg-gradient-to-r from-[#58a6ff] via-white to-[#3fb950] bg-clip-text text-transparent">
      Let's see the code
    </div>
    <div class="text-base text-gray-400 mt-3 tracking-widest uppercase font-mono">
      Switching to the IDE
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden border border-[#30363d] font-mono text-sm w-full max-w-xl shadow-[0_0_40px_rgba(63,185,80,0.12)]">
    <div class="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-[#30363d]">
      <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
      <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
      <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      <span class="ml-auto text-xs text-gray-500 tracking-wide">bash — wetest-slidev</span>
    </div>
    <div class="bg-[#0d1117] px-6 py-5 leading-8">
      <div><span class="text-[#3fb950]">$</span> <span class="text-white">code support/utils/builders/</span></div>
    </div>
  </div>

  <div class="font-mono text-xs text-[#3fb950]/50 tracking-widest uppercase">
    // 🎨 Design Patterns
  </div>

</div>

---
layout: section
---

<div class="font-mono text-[#3fb950] text-sm mb-4">$ cat CLAUDE.md | grep -i "pattern\|fixture\|page-object"</div>

# 🤖 AI Tips & Agents

<div class="font-mono text-sm mt-8 bg-[#0d1117] border border-[#30363d] rounded-lg px-6 py-4 max-w-2xl mx-auto text-left">
  <span class="text-[#3fb950]">#</span> <span class="text-gray-300 italic">"Teach the AI Your Patterns — It Will Follow Them at Scale"</span>
</div>

---
layout: default
---

# Teaching AI Your Framework

<div class="text-center text-gray-500 text-xs mb-3 tracking-wide uppercase font-semibold">Give AI the right files and it generates code that fits on the first try</div>

<div class="grid grid-cols-3 gap-8">

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#ffa657]/30 rounded-xl p-3.5 flex flex-col hover:border-[#ffa657]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#ffa657]/10 border border-[#ffa657]/30 flex items-center justify-center text-sm">📡</div>
    <div class="font-mono font-bold text-[#ffa657] text-xs">openapi.json</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">API contract schema. AI reads endpoint shapes and response types to generate correct tests without hallucinating field names.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">ground truth for API test generation</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#58a6ff]/30 rounded-xl p-3.5 flex flex-col hover:border-[#58a6ff]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center text-sm">🧠</div>
    <div class="font-mono font-bold text-[#58a6ff] text-xs">skills.md</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">Defines what the agent can do. Reusable task templates, domain knowledge, and capability boundaries.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">scope + capability contract for agents</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#3fb950]/30 rounded-xl p-3.5 flex flex-col hover:border-[#3fb950]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-sm">⚡</div>
    <div class="font-mono font-bold text-[#3fb950] text-xs">agent.md</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">Configures agent runtime including autonomy level, tool access, decision rules, and escalation triggers.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">runtime behaviour of the AI agent</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#d2a8ff]/30 rounded-xl p-3.5 flex flex-col hover:border-[#d2a8ff]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 flex items-center justify-center text-sm">📋</div>
    <div class="font-mono font-bold text-[#d2a8ff] text-xs">instructions.md</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">Task-level guidance. How to write a POM, name a fixture, or structure a test file.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">task-level rules AI must follow</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#e3b341]/30 rounded-xl p-3.5 flex flex-col hover:border-[#e3b341]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#e3b341]/10 border border-[#e3b341]/30 flex items-center justify-center text-sm">⚙️</div>
    <div class="font-mono font-bold text-[#e3b341] text-xs">apm.yml</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">Agent Package Manager manifest. Declares skills, plugins, and instructions so every dev gets the same reproducible agent setup.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">npm install, but for AI agents</div>
</div>

<div class="bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#f78166]/30 rounded-xl p-3.5 flex flex-col hover:border-[#f78166]/60 transition-colors">
  <div class="flex items-center gap-2 mb-2">
    <div class="w-7 h-7 rounded-md bg-[#f78166]/10 border border-[#f78166]/30 flex items-center justify-center text-sm">📦</div>
    <div class="font-mono font-bold text-[#f78166] text-xs">monorepo/</div>
  </div>
  <div class="text-[11px] text-gray-400 leading-relaxed flex-1">Shared packages across apps. AI has access to the development source code for test generation.</div>
  <div class="mt-2 pt-2 border-t border-[#30363d] text-[9px] text-gray-600 font-mono">workspace structure AI must respect</div>
</div>

</div>

---
layout: default
---

# The Full Picture

<div class="mt-6">

<div class="grid grid-cols-2 gap-4 text-sm">

<div class="space-y-3">
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">📁</span>
    <div><strong>Folder structure</strong> <span class="text-gray-400 ml-2">→ AI knows where to put new tests</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">⚙️</span>
    <div><strong>Config</strong> <span class="text-gray-400 ml-2">→ AI generates config-aware tests</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">💾</span>
    <div><strong>Storage state</strong> <span class="text-gray-400 ml-2">→ AI skips writing login boilerplate</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🏛️</span>
    <div><strong>Page Objects</strong> <span class="text-gray-400 ml-2">→ AI extends existing classes</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🔌</span>
    <div><strong>Fixtures</strong> <span class="text-gray-400 ml-2">→ AI reuses declared fixtures by name</span></div>
  </div>
</div>

<div class="space-y-3">
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🪝</span>
    <div><strong>Hooks</strong> <span class="text-gray-400 ml-2">→ AI uses lifecycle hooks correctly</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🌍</span>
    <div><strong>Global setup</strong> <span class="text-gray-400 ml-2">→ AI doesn't touch infrastructure code</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🎨</span>
    <div><strong>Design patterns</strong> <span class="text-gray-400 ml-2">→ AI follows Builder, Factory, Facade</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">🔀</span>
    <div><strong>Sharding</strong> <span class="text-gray-400 ml-2">→ AI-generated tests run in parallel</span></div>
  </div>
  <div class="flex gap-4 items-center p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
    <span class="text-xl">📄</span>
    <div><strong>CLAUDE.md</strong> <span class="text-gray-400 ml-2">→ AI follows your rules by default</span></div>
  </div>
</div>

</div>

</div>

<div class="text-center text-xl font-bold mt-6 text-green-400">
Build the foundation. Let AI multiply it.
</div>

---
layout: center
class: text-center
---

# Key Takeaways

<div class="grid grid-cols-3 gap-8 mt-10">

<div class="bg-[#0d1117] border border-[#3fb950]/40 rounded-xl p-6">
  <div class="text-4xl mb-4">🏗️</div>
  <div class="font-bold mb-3 text-[#3fb950]">Foundation first</div>
  <div class="text-sm text-gray-400">Invest in structure, patterns, and conventions before scaling test count</div>
</div>

<div class="bg-[#0d1117] border border-[#58a6ff]/40 rounded-xl p-6">
  <div class="text-4xl mb-4">🔒</div>
  <div class="font-bold mb-3 text-[#58a6ff]">Isolation always</div>
  <div class="text-sm text-gray-400">Storage state, fixtures, and clean setup eliminate 80% of flakiness</div>
</div>

<div class="bg-[#0d1117] border border-[#d2a8ff]/40 rounded-xl p-6">
  <div class="text-4xl mb-4">🤖</div>
  <div class="font-bold mb-3 text-[#d2a8ff]">AI needs context</div>
  <div class="text-sm text-gray-400">agent.md and consistent patterns turn AI into a multiplier</div>
</div>

</div>

---
layout: center
class: text-center
---

<div class="flex flex-col items-center gap-2 mb-6">
  <div class="font-mono text-[#3fb950] text-sm tracking-widest uppercase">WeTest Conference 2026 · Athens, Greece 🇬🇷</div>
  <h1 class="text-5xl font-bold bg-gradient-to-r from-[#58a6ff] via-[#d2a8ff] to-[#3fb950] bg-clip-text text-transparent">Thank You!</h1>
  <div class="text-gray-500 text-sm font-mono mt-1">Building a Scalable Test Automation Framework in the Age of AI</div>
</div>

<div class="grid grid-cols-2 gap-8 mt-4 text-left max-w-2xl mx-auto">

<div class="relative bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-all duration-300 rounded-2xl p-6 group">
  <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#58a6ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  <div class="font-bold text-lg mb-3 text-white">Lars de Bruijn</div>
  <div class="space-y-2">
    <div class="flex items-center gap-2 text-sm text-gray-400">
      <span class="text-[#3fb950] font-mono">$</span>
      <span>Github: <code class="text-[#58a6ff]">@Lars-db</code></span>
    </div>
    <div class="flex items-center gap-2 text-sm text-gray-400">
      <span class="text-[#3fb950] font-mono">$</span>
      <span>LinkedIn: <code class="text-[#58a6ff]">/in/lars-de-bruijn-/</code></span>
    </div>
  </div>
</div>

<div class="relative bg-[#0d1117] border border-[#30363d] hover:border-[#d2a8ff] transition-all duration-300 rounded-2xl p-6 group">
  <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d2a8ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  <div class="font-bold text-lg mb-3 text-white">Marco Maes</div>
  <div class="space-y-2">
    <div class="flex items-center gap-2 text-sm text-gray-400">
      <span class="text-[#3fb950] font-mono">$</span>
      <span>Github: <code class="text-[#d2a8ff]">@marcomaes</code></span>
    </div>
    <div class="flex items-center gap-2 text-sm text-gray-400">
      <span class="text-[#3fb950] font-mono">$</span>
      <span>LinkedIn: <code class="text-[#d2a8ff]">/in/marcomaes/</code></span>
    </div>
  </div>
</div>

</div>

<div class="flex items-center justify-center gap-6 mt-8">
  <span class="font-mono text-xs bg-[#161b22] border border-[#3fb950]/50 text-[#3fb950] rounded px-3 py-1">TypeScript</span>
  <span class="font-mono text-xs bg-[#161b22] border border-[#58a6ff]/50 text-[#58a6ff] rounded px-3 py-1">Playwright</span>
  <span class="font-mono text-xs bg-[#161b22] border border-[#d2a8ff]/50 text-[#d2a8ff] rounded px-3 py-1">AI</span>
</div>

<div class="mt-6 text-gray-600 text-xs font-mono">Questions? → find us after the talk</div>
