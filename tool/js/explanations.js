// explanations.js
export function initExplanationSystem() {
    injectStyles();
    injectHTML();
    initializeEventListeners();
    loadExplanationContent();
}

function injectStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        #explanationBar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background-color: #ffffff;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 40px;
            z-index: 1000;
        }

        .explanation-buttons {
            display: flex;
            gap: 40px;
        }

        .explanation-button {
            padding: 8px 16px;
            height: 40px;
            border: 2px solid #2c3e50;
            border-radius: 5px;
            background-color: #ffffff;
            color: #2c3e50;
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .explanation-button:hover {
            background-color: #2c3e50;
            color: #ffffff;
        }

        .return-button {
            position: absolute;
            left: 40px;
            color: var(--color-text-primary);
            text-decoration: none;
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .return-button svg {
            width: 20px;
            height: 20px;
        }

        .return-button:hover {
            color: var(--color-primary);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2000;
        }

        .modal-content {
            position: relative;
            background-color: #ffffff;
            margin: 50px auto;
            padding: 40px;
            width: 80%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 30px;
            height: 30px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .close-button::before,
        .close-button::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background-color: #2c3e50;
            transform-origin: center;
        }

        .close-button::before {
            transform: rotate(45deg);
        }

        .close-button::after {
            transform: rotate(-45deg);
        }

        .close-button:hover::before,
        .close-button:hover::after {
            background-color: #000000;
        }

        .modal-content h1 {
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            color: var(--color-text-secondary);
            margin-bottom: 20px;
        }

        .modal-content h2 {
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            color: var(--color-text-secondary);
            margin-top: 30px;
            margin-bottom: 15px;
        }

        .modal-content h3 {
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            color: var(--color-text-secondary);
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .modal-content p {
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .modal-content ul, 
        .modal-content ol {
            margin-bottom: 15px;
            padding-left: 20px;
        }

        .modal-content li {
            margin-bottom: 5px;
            line-height: 1.6;
        }

        #requirements,
        #legalText {
            height: calc(100vh - 50px) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

function injectHTML() {
    const explanationBar = document.createElement('div');
    explanationBar.id = 'explanationBar';
    explanationBar.innerHTML = `
        <a href="../" class="return-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Return to Overview
        </a>
        <div class="explanation-buttons">
            <button class="explanation-button" onclick="window.showModal('guideModal')">What am I looking at?</button>
            <button class="explanation-button" onclick="window.showModal('methodologyModal')">Research Methodology</button>
        </div>
    `;

    const modalsHTML = `
        <div id="methodologyModal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="window.hideModal('methodologyModal')"></button>
                <div id="methodologyContent"></div>
            </div>
        </div>

        <div id="guideModal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="window.hideModal('guideModal')"></button>
                <div id="guideContent"></div>
            </div>
        </div>
    `;

    document.body.appendChild(explanationBar);
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
}

function initializeEventListeners() {
    window.showModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.hideModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
}

function loadExplanationContent() {
    const methodologyContent = `
        <h1>Research Methodology</h1>
        <p>The requirements displayed in this tool are the result of a systematic qualitative analysis of the EU AI Act's essential requirements for high-risk AI systems. The analysis followed a four-phase coding process:</p>

        <h3>Phase 1: In Vivo Coding</h3>
        <ul>
            <li>Maintained regulatory intent and precise language</li>
            <li>Identified recurring themes and patterns</li>
            <li>Created a foundation for systematic categorization</li>
        </ul>

        <h3>Phase 2: Structural Coding</h3>
        <p>Analysis revealed six primary structural categories:</p>
        <ul>
            <li>Technical System Fundamentals</li>
            <li>Deployment Guidelines</li>
            <li>Data</li>
            <li>Risk Management</li>
            <li>Performance Evaluation</li>
            <li>Human Oversight</li>
        </ul>

        <h3>Phase 3: Focused Coding</h3>
        <ul>
            <li>Generated 25 focused codes across the 6 structural categories</li>
            <li>Assigned each paragraph to relevant focused codes</li>
            <li>Maintained traceability to source material</li>
        </ul>

        <h3>Phase 4: Requirement Summary</h3>
        <ul>
            <li>Extracted and synthesized key requirements</li>
            <li>Wording as close to the legal text as possible</li>
            <li>Standardized language for consistency</li>
        </ul>
    `;

    const guideContent = `
        <h1>Understanding 'AI ACTion'</h1>

        <h2>What am I looking at?</h2>
        <p>This tool transforms the European Union's AI Act legal requirements into practical, actionable insights. It helps organizations understand and implement AI compliance requirements by connecting clear requirement summaries with their legal foundations.</p>

        <h2>Why does this tool exist?</h2>
        <p>While there's extensive discussion about the EU AI Act, many organizations struggle to translate legal text into concrete actions. This tool bridges the gap between legal requirements and practical implementation by providing:</p>
        <ul>
            <li>Clear summaries of essential requirements</li>
            <li>Direct connections to relevant legal text</li>
            <li>Structured organization of compliance topics</li>
        </ul>

        <h2>How do I use this tool?</h2>

        <h3>Requirements Panel (Left)</h3>
        <ul>
            <li>Browse categorized essential requirements</li>
            <li>Click requirements to read detailed explanations</li>
            <li>See related legal text highlighted automatically</li>
            <li>Understand practical implications through clear summaries</li>
        </ul>

        <h3>Legal Text View (Right)</h3>
        <ul>
            <li>Access original EU AI Act articles</li>
            <li>Follow interactive highlighting of relevant sections</li>
            <li>Use scroll indicator for easy navigation</li>
            <li>Track connections between requirements and legal text</li>
        </ul>

        <h2>Who is the intended audience?</h2>
        <p>The tool serves both legal and technical teams:</p>
        <ul>
            <li>Legal teams can quickly find relevant references and understand technical implications</li>
            <li>Technical teams can transform legal obligations into actionable development tasks</li>
            <li>Compliance officers can develop comprehensive implementation strategies</li>
            <li>Project managers can plan and track compliance-related activities</li>
        </ul>
    `;

    document.getElementById('methodologyContent').innerHTML = methodologyContent;
    document.getElementById('guideContent').innerHTML = guideContent;
}