async function sendPrompt() {
  const promptInput = document.getElementById('prompt');
  const prompt = promptInput.value.trim();
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';

  if (!prompt) {
    errorDiv.textContent = 'Please enter a prompt.';
    return;
  }

  try {
    const chatPromise = fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }).then(res => res.json());

    const bestPromise = fetch('/api/best_prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }).then(res => res.json());

    const [chatRes, bestRes] = await Promise.all([chatPromise, bestPromise]);

    if (chatRes.error) throw new Error(chatRes.error);
    if (bestRes.error) throw new Error(bestRes.error);

    document.getElementById('originalResponse').textContent = chatRes.reply;
    document.getElementById('originalScore').textContent = chatRes.score;

    document.getElementById('optimizedPrompt').textContent = bestRes.optimizedPrompt;
    document.getElementById('optimizedResponse').textContent = bestRes.optimizedResponse;
    document.getElementById('optimizedScore').textContent = bestRes.optimizedScore;
  } catch (err) {
    console.error(err);
    errorDiv.textContent = err.message;
  }
}

document.getElementById('sendBtn').addEventListener('click', sendPrompt);
