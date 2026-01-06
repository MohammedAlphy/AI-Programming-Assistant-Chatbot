// Chatbot Class
class AIChatbot {
    constructor() {
        this.intents = [];
        this.chatHistory = [];
        this.messageCount = 0;
        this.isTyping = false;
        this.loadIntents();
        this.initEventListeners();
        this.loadTheme();
        this.updateMessageCounter();
    }

    // Load intents from JSON file
    async loadIntents() {
        try {
            const response = await fetch('intents.json');
            const data = await response.json();
            this.intents = data.intents;
            console.log(`Loaded ${this.intents.length} intents`);
        } catch (error) {
            console.error('Error loading intents:', error);
            this.showErrorMessage('Failed to load chatbot data. Please refresh the page.');
        }
    }

    // Initialize event listeners
    initEventListeners() {
        // Send button
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        
        // Enter key in input
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Clear chat button
        document.getElementById('clear-chat').addEventListener('click', () => this.clearChat());
        
        // Theme toggle
        document.getElementById('theme-icon').addEventListener('click', () => this.toggleTheme());
        
        // Topic items
        document.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const question = e.currentTarget.getAttribute('data-question');
                this.sendUserMessage(question);
            });
        });
        
        // Hint tags
        document.querySelectorAll('.hint-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const question = e.currentTarget.getAttribute('data-question');
                this.sendUserMessage(question);
            });
        });
        
        // Footer buttons
        document.getElementById('export-chat').addEventListener('click', (e) => {
            e.preventDefault();
            this.exportChat();
        });
        
        document.getElementById('reset-bot').addEventListener('click', (e) => {
            e.preventDefault();
            this.resetBot();
        });
        
        document.getElementById('about-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showAboutModal();
        });
        
        document.getElementById('help-btn').addEventListener('click', () => {
            this.showHelpMessage();
        });
        
        // Voice button (placeholder)
        document.getElementById('voice-btn').addEventListener('click', () => {
            this.showVoiceMessage('Voice input is coming soon!');
        });
    }

    // Send message from user input
    sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.sendUserMessage(message);
        input.value = '';
        input.focus();
    }

    // Send user message and get bot response
    sendUserMessage(message) {
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Find matching intent
        const response = this.findIntentResponse(message);
        
        // Simulate typing delay
        this.showTypingIndicator();
        
        // Send response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.updateMessageCounter();
        }, 800 + Math.random() * 800); // Random delay for realism
    }

    // Find matching intent using simple pattern matching
    findIntentResponse(userMessage) {
        if (!this.intents || this.intents.length === 0) {
            return "I'm still loading my knowledge base. Please wait a moment...";
        }
        
        const message = userMessage.toLowerCase();
        
        // Check for exact tag matches from quick questions
        const quickQuestionMap = {
            'what is ai?': 'what_is_ai',
            'ai vs ml vs dl': 'ai_ml_dl_difference',
            'neural networks': 'neural_networks',
            'how to start?': 'study_path',
            'python libraries': 'python_libraries',
            'learning time': 'learning_time',
            'tensorflow vs pytorch': 'tensorflow_pytorch',
            'beginner projects': 'beginner_projects',
            'model deployment': 'model_deployment'
        };
        
        // Check if it's a quick question
        for (const [quickQ, tag] of Object.entries(quickQuestionMap)) {
            if (message.includes(quickQ.toLowerCase().replace('?', ''))) {
                const intent = this.intents.find(i => i.tag === tag);
                if (intent) {
                    return this.getRandomResponse(intent.responses);
                }
            }
        }
        
        // Check all intents for pattern matches
        for (const intent of this.intents) {
            for (const pattern of intent.patterns) {
                if (message.includes(pattern.toLowerCase())) {
                    return this.getRandomResponse(intent.responses);
                }
            }
        }
        
        // Check for keyword matches
        const keywordMap = {
            'python': 'python_libraries',
            'tensorflow': 'tensorflow_pytorch',
            'pytorch': 'tensorflow_pytorch',
            'math': 'ai_math',
            'dataset': 'datasets',
            'project': 'beginner_projects',
            'deploy': 'model_deployment',
            'nlp': 'nlp',
            'computer vision': 'computer_vision',
            'ethics': 'ai_ethics',
            'career': 'ai_careers',
            'job': 'ai_careers',
            'learn': 'study_path',
            'study': 'study_path',
            'library': 'python_libraries',
            'neural': 'neural_networks',
            'machine learning': 'ai_ml_dl_difference',
            'deep learning': 'ai_ml_dl_difference'
        };
        
        for (const [keyword, tag] of Object.entries(keywordMap)) {
            if (message.includes(keyword.toLowerCase())) {
                const intent = this.intents.find(i => i.tag === tag);
                if (intent) {
                    return this.getRandomResponse(intent.responses);
                }
            }
        }
        
        // Fallback response
        const fallbackIntent = this.intents.find(i => i.tag === 'fallback');
        if (fallbackIntent) {
            return this.getRandomResponse(fallbackIntent.responses);
        }
        
        return "I'm not sure how to answer that. Could you rephrase your question about AI programming?";
    }

    // Get random response from array
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Add message to chat UI
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chat-messages');
        
        // Remove typing indicator if present
        this.hideTypingIndicator();
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                    <span class="message-sender">${sender === 'user' ? 'You' : 'AI Assistant'}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">
                    ${this.formatMessageText(text)}
                </div>
            </div>
        `;
        
        // Add to chat
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Store in history
        this.chatHistory.push({
            text,
            sender,
            time: new Date().toISOString()
        });
        
        this.messageCount++;
    }

    // Format message text with line breaks and lists
    formatMessageText(text) {
        // Convert markdown-like lists to HTML
        let formatted = text
            .replace(/\n/g, '<br>')
            .replace(/\d\.\s/g, '<br>$&') // Numbered lists
            .replace(/-\s/g, '<br>• ');   // Bullet lists
        
        // Wrap in paragraphs for longer texts
        if (formatted.split('<br>').length > 3) {
            formatted = formatted.split('<br>')
                .map(line => line.trim() ? `<p>${line}</p>` : '')
                .join('');
        }
        
        return formatted;
    }

    // Show typing indicator
    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const chatMessages = document.getElementById('chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <i class="fas fa-robot"></i>
                    <span class="message-sender">AI Assistant</span>
                </div>
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Clear chat history
    clearChat() {
        if (confirm('Are you sure you want to clear the chat?')) {
            const chatMessages = document.getElementById('chat-messages');
            
            // Keep only the welcome message
            const welcomeMessage = chatMessages.querySelector('.bot-message');
            chatMessages.innerHTML = '';
            chatMessages.appendChild(welcomeMessage);
            
            // Clear history
            this.chatHistory = [];
            this.messageCount = 0;
            this.updateMessageCounter();
            
            // Add confirmation message
            this.addMessage("Chat cleared! Ask me anything about AI programming.", 'bot');
        }
    }

    // Toggle dark/light theme
    toggleTheme() {
        const icon = document.getElementById('theme-icon');
        const body = document.body;
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    }

    // Load saved theme
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const icon = document.getElementById('theme-icon');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Update message counter
    updateMessageCounter() {
        const counter = document.getElementById('message-counter');
        counter.textContent = `${this.messageCount} ${this.messageCount === 1 ? 'message' : 'messages'}`;
    }

    // Export chat to text file
    exportChat() {
        if (this.chatHistory.length === 0) {
            this.addMessage("No chat history to export.", 'bot');
            return;
        }
        
        let exportText = "AI Programming Chatbot - Chat History\n";
        exportText += "=".repeat(50) + "\n\n";
        
        this.chatHistory.forEach(msg => {
            const time = new Date(msg.time).toLocaleString();
            exportText += `[${time}] ${msg.sender.toUpperCase()}: ${msg.text}\n\n`;
        });
        
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-chatbot-history-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.addMessage("Chat history exported successfully!", 'bot');
    }

    // Reset bot to initial state
    resetBot() {
        if (confirm('Reset bot to initial state? This will clear chat and reload intents.')) {
            this.clearChat();
            this.loadIntents();
            this.addMessage("Bot has been reset. Ready to answer your AI questions!", 'bot');
        }
    }

    // Show about modal
    showAboutModal() {
        const aboutText = `
            <strong>AI Programming Chatbot v1.0</strong><br><br>
            This chatbot is powered by your intents.json data and provides answers to questions about:
            <ul>
                <li>Artificial Intelligence concepts</li>
                <li>Machine Learning and Deep Learning</li>
                <li>Learning paths and resources</li>
                <li>Programming tools and libraries</li>
                <li>AI project ideas and deployment</li>
            </ul>
            Built with HTML, CSS, and JavaScript.
        `;
        
        this.addMessage(aboutText, 'bot');
    }

    // Show help message
    showHelpMessage() {
        const helpText = `
            <strong>How to use this chatbot:</strong><br><br>
            1. <strong>Ask questions</strong> about AI programming in the input box<br>
            2. <strong>Click quick questions</strong> on the left for instant answers<br>
            3. <strong>Use hint tags</strong> below the input for common questions<br><br>
            <strong>Features:</strong>
            <ul>
                <li>🌙 Dark/Light theme toggle</li>
                <li>📥 Export chat history</li>
                <li>🗑️ Clear chat</li>
                <li>🔄 Reset bot</li>
            </ul>
            Try asking about TensorFlow, Python libraries, or AI career paths!
        `;
        
        this.addMessage(helpText, 'bot');
    }

    // Show error message
    showErrorMessage(text) {
        const chatMessages = document.getElementById('chat-messages');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message bot-message';
        
        errorDiv.innerHTML = `
            <div class="message-content" style="background: rgba(239, 68, 68, 0.1); border-color: #ef4444;">
                <div class="message-header">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                    <span class="message-sender">System Error</span>
                </div>
                <div class="message-text">
                    ${text}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show voice input message
    showVoiceMessage(text) {
        this.addMessage(text, 'bot');
    }
}

// Add typing dots CSS
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px 0;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--text-muted);
        animation: typing 1.4s infinite both;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-6px); }
    }
`;
document.head.appendChild(style);

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new AIChatbot();
    
    // Auto-focus input
    setTimeout(() => {
        document.getElementById('user-input').focus();
    }, 500);
});