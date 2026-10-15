const SCRIPT_KEY = 'povforge_script';

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(SCRIPT_KEY);
  if (saved) document.getElementById('scriptEditor').value = saved;

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }
});

document.getElementById('scriptEditor').addEventListener('input', (e) => {
  localStorage.setItem(SCRIPT_KEY, e.target.value);
});

function loadTemplate() {
  const editor = document.getElementById('scriptEditor');
  editor.value = `TITLE
Psychology of [Trait]: [Unfair Advantage or Power Outcome]
or
Psychology of People Who [Specific Private Behavior]

HOOK (0:00–0:25)
You know that person who [exact private behavior]?
The one who [inner translation of the behavior]?
That person is not [common insult].
They are not broken either.

REFRAME (0:25–1:30)
That's not you being [defect].
That's your [nervous system / memory / attachment pattern] doing exactly what it was designed to do.
[One-line thesis.]

MECHANISM (1:30–6:00)
[Research beat 1 — named study + one visualizable finding + so-this-is-why-you]
[Research beat 2]
[Research beat 3]
[Research beat 4 if needed]

STATUS FLIP (6:00–8:30)
What looked like [wound] is actually [rare competence].
[Quiet becomes integrity. Many interests become an unfair learning edge. Rest becomes a weapon. Composure makes other people nervous.]

RULES (8:30–13:30)
1. [Named rule — concrete, doable today]
2. [Named rule]
3. [Named rule]
4. [Named rule]
5. [Named rule]

CLOSE (last 45 seconds)
[Return to the opening person.]
If this felt like someone finally handed you the words for something you have been carrying a long time, stay.
You were watching [channel]. See you in the next one.

[Educational disclaimer if the topic is clinical-adjacent.]`;
  localStorage.setItem(SCRIPT_KEY, editor.value);
}

function clearScript() {
  document.getElementById('scriptEditor').value = '';
  localStorage.removeItem(SCRIPT_KEY);
}

function exportScript() {
  const text = document.getElementById('scriptEditor').value;
  navigator.clipboard.writeText(text).then(() => alert('Script copied'));
}

function generateBeats() {
  const script = document.getElementById('beatInput').value.trim();
  const output = document.getElementById('beatsOutput');
  if (!script) {
    output.innerHTML = '<p class="item">Paste a script first.</p>';
    return;
  }

  // Split into short beats for high-volume output
  const sentences = script
    .replace(/\n+/g, ' ')
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 8);

  const beats = sentences.slice(0, 80).map((sent, i) => {
    const short = sent.slice(0, 140) + (sent.length > 140 ? '…' : '');
    const prompt = `Beat ${i+1}: ${short} — minimalist hand-drawn 2D stick-figure, large round head, thin imperfect ink outlines, beige or olive/charcoal shirt as needed, dark trousers, almost empty paper background or one simple prop, quiet editorial composition, no text`;
    return `<div class="item"><strong>Beat ${i+1}</strong><br>${short}<div class="prompt">${prompt}</div></div>`;
  });

  output.innerHTML = beats.join('') || '<p class="item">No beats found. Try adding more sentences.</p>';
}

function copyStyle() {
  const prompt = document.getElementById('stylePrompt').textContent;
  navigator.clipboard.writeText(prompt).then(() => alert('Style prompt copied'));
}
