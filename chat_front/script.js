document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceButton = document.getElementById('voice-button');
    const loadingIndicator = document.getElementById('loading');
    
    // Chat elements
    const originalPrompt = document.getElementById('original-prompt');
    const originalResponse = document.getElementById('original-response');
    const originalScore = document.getElementById('original-score');
    
    const optimizedPrompt = document.getElementById('optimized-prompt');
    const optimizedResponse = document.getElementById('optimized-response');
    const optimizedScore = document.getElementById('optimized-score');
    
    // API endpoint - adjust if your backend runs on a different port/host
    const API_URL = 'http://localhost:3000';
    
    // Initially hide loading indicator
    loadingIndicator.style.display = 'none';
    
    // Send button click handler
    sendButton.addEventListener('click', async function() {
        const prompt = userInput.value.trim();
        
        if (!prompt) {
            alert("Veuillez entrer un message.");
            return;
        }
        
        // Show loading and disable input
        loadingIndicator.style.display = 'flex';
        sendButton.disabled = true;
        voiceButton.disabled = true;
        
        // Update the original prompt immediately
        originalPrompt.textContent = prompt;
        originalResponse.textContent = 'Chargement...';
        originalScore.textContent = 'Score Qualité : --';
        originalScore.className = 'score score-pending';
        
        // Clear optimization section and mark as loading
        optimizedPrompt.textContent = 'Optimisation en cours...';
        optimizedResponse.textContent = 'Chargement...';
        optimizedScore.textContent = 'Score Qualité : --';
        optimizedScore.className = 'score score-pending';
        
        try {
            // Call the best prompt API to get both original and optimized results
            const response = await fetch(`${API_URL}/api/best_prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update original content
            originalPrompt.textContent = data.original.prompt;
            originalResponse.textContent = data.original.response;
            originalScore.textContent = `Score Qualité : ${data.original.score}`;
            originalScore.className = `score ${getScoreClass(data.original.score)}`;
            
            // Update optimized content
            optimizedPrompt.textContent = data.optimized.prompt;
            optimizedResponse.textContent = data.optimized.response;
            optimizedScore.textContent = `Score Qualité : ${data.optimized.score}`;
            optimizedScore.className = `score ${getScoreClass(data.optimized.score)}`;
            
        } catch (error) {
            console.error('Error:', error);
            originalResponse.textContent = `Erreur: ${error.message}`;
            optimizedResponse.textContent = 'Une erreur est survenue lors de l\'optimisation';
        } finally {
            // Hide loading and enable input
            loadingIndicator.style.display = 'none';
            sendButton.disabled = false;
            voiceButton.disabled = false;
        }
    });
    
    // Voice button click handler (placeholder - would require Web Speech API implementation)
    voiceButton.addEventListener('click', function() {
        alert('Fonctionnalité de reconnaissance vocale en développement.');
    });
    
    // Keyboard shortcut for sending
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    // Helper function to determine score class
    function getScoreClass(score) {
        const scoreNum = parseFloat(score);
        if (scoreNum >= 0.8) return 'score-high';
        if (scoreNum >= 0.5) return 'score-medium';
        return 'score-low';
    }
});