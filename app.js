// Local storage keys
const SCRIPT_KEY = 'povforge_script';

// Load saved script
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(SCRIPT_KEY);
  if (saved) document.getElementById('scriptEditor').value = saved;
});

// Auto-save script
document.getElementById('scriptEditor').addEventListener('input', (e) => {
  localStorage.setItem(SCRIPT_KEY, e.target.value);
});

function generateIdeas() {
  const topic = document.getElementById('topicInput').value.trim() || 'the psychology of solitude';
  const format = document.getElementById('formatSelect').value;
  const output = document.getElementById('ideasOutput');
  let ideas = [];

  if (format === 'rank') {
    ideas = [
      `Your Life at Every Level of ${capitalize(topic)}`,
      `What It’s Like to Be Every Rank in ${capitalize(topic)}`,
      `Your Life as Every Level of a ${topic} Expert`,
      `POV: Climbing Every Rank in ${capitalize(topic)}`,
      `From Zero to Master: Your Life at Every Stage of ${capitalize(topic)}`
    ];
  } else if (format === 'pov') {
    ideas = [
      `POV: You Finally Understand ${capitalize(topic)}`,
      `POV: You’re Living Inside ${capitalize(topic)}`,
      `POV: Your Mind When ${capitalize(topic)} Takes Over`,
      `POV: You Stop Fighting ${capitalize(topic)}`,
      `POV: ${capitalize(topic)} From the Inside`
    ];
  } else if (format === 'psych') {
    ideas = [
      `Psychology of People Who ${topic}`,
      `The Hidden Psychology Behind ${capitalize(topic)}`,
      `Why Your Brain Does This When You ${topic}`,
      `Psychology of ${capitalize(topic)} (And Why It’s Not What You Think)`,
      `The Psychology of People Who Master ${capitalize(topic)}`
    ];
  } else {
    ideas = [
      `What It’s Like to Experience ${capitalize(topic)}`,
      `A Day in the Life of ${capitalize(topic)}`,
      `The Real Experience of ${capitalize(topic)}`,
      `Inside the Mind of Someone Dealing With ${capitalize(topic)}`,
      `${capitalize(topic)} Explained From Your Perspective`
    ];
  }

  output.innerHTML = ideas.map(i => `<div class="idea">${i}</div>`).join('');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadTemplate(type) {
  const editor = document.getElementById('scriptEditor');
  if (type === 'rank') {
    editor.value = `Level 1: The Beginning

You are...

[Describe the starting reality in second person. Sensory details. Small daily friction.]

Level 2: The First Shift

You notice...

[Progress, new skill, new pressure.]

Level 3–8: The Climb

[Continue the progression. Each level raises stakes, reveals hidden costs, deepens the psychology.]

Final Level: The Realization

You finally understand that...

[Emotional or psychological close. Leave the viewer with a lasting insight.]`;
  } else {
    editor.value = `Hook

You smile and say you're fine.

But under the table, your fist is clenched.

The Metaphor

Your mind has built a quiet room where no one else is allowed.

[Describe the internal landscape with visual metaphor.]

The Pattern

Every time someone offers help, you step back.

Not because you don't need it — because accepting it would mean the room isn't fully yours.

The Reframe

What looks like strength is often the longest form of self-protection.

Close

The next time the hands appear, notice how close you let them get.`;
  }
  localStorage.setItem(SCRIPT_KEY, editor.value);
}

function clearScript() {
  document.getElementById('scriptEditor').value = '';
  localStorage.removeItem(SCRIPT_KEY);
}

function exportScript() {
  const text = document.getElementById('scriptEditor').value;
  navigator.clipboard.writeText(text).then(() => {
    alert('Script copied to clipboard');
  });
}

function generateScenes() {
  const script = document.getElementById('sceneInput').value.trim();
  const output = document.getElementById('scenesOutput');
  if (!script) {
    output.innerHTML = '<p>Paste a script first.</p>';
    return;
  }

  // Simple split by double newlines or numbered levels
  const paragraphs = script.split(/\n\s*\n/).filter(p => p.trim().length > 20);
  const scenes = paragraphs.slice(0, 12).map((para, i) => {
    const short = para.slice(0, 180).replace(/\n/g, ' ') + '...';
    const prompt = `Scene ${i+1}: ${short} — hand-drawn 2D stick-figure illustration, large round-headed young adult character in light beige shirt and dark trousers, thin imperfect ink outlines, warm muted earth-tone palette, subtle paper grain, expressive body language matching the emotion, soft atmospheric lighting, cinematic composition, no text`;
    return `<div class="scene"><strong>Scene ${i+1}</strong><br>${short}<br><br><em>Visual Prompt:</em><br>${prompt}</div>`;
  });

  output.innerHTML = scenes.join('') || '<p>Could not split into scenes. Try adding blank lines between sections.</p>';
}

function copyStyle() {
  const prompt = document.getElementById('stylePrompt').textContent;
  navigator.clipboard.writeText(prompt).then(() => {
    alert('Style prompt copied');
  });
}
