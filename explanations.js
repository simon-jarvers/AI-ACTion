// explanations.js
export function initExplanationSystem() {
    // Create and inject CSS
    injectStyles();
    
    // Create and inject HTML elements
    injectHTML();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load explanation content
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
            gap: 20px;
            padding: 0 20px;
            z-index: 1000;
        }

        .explanation-button {
            padding: 8px 16px;
            border: 2px solid #2c3e50;
            border-radius: 5px;
            background-color: #ffffff;
            color: #2c3e50;
            font-family: 'Red Hat Display', sans-serif;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .explanation-button:hover {
            background-color: #2c3e50;
            color: #ffffff;
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

        /* Modal content styles */
        .modal-content h1 {
            font-family: 'Red Hat Display', sans-serif;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .modal-content h2 {
            font-family: 'Red Hat Display', sans-serif;
            font-weight: 700;
            color: #2c3e50;
            margin-top: 30px;
            margin-bottom: 15px;
        }

        .modal-content h3 {
            font-family: 'Red Hat Display', sans-serif;
            font-weight: 700;
            color: #2c3e50;
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
    // Create bottom bar
    const explanationBar = document.createElement('div');
    explanationBar.id = 'explanationBar';
    explanationBar.innerHTML = `
        <button class="explanation-button" onclick="window.showModal('guideModal')">What am I looking at?</button>
        <button class="explanation-button" onclick="window.showModal('methodologyModal')">Research Methodology</button>
    `;

    // Create modals
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

    // Append elements to body
    document.body.appendChild(explanationBar);
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
}

function initializeEventListeners() {
    // Add global modal functions
    window.showModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.hideModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close on escape key
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
        <h1>Systematic Coding Methodology</h1>
        <p>This visualization tool is the result of a systematic qualitative analysis of the EU AI Act, following a rigorous four-phase coding process to transform legal requirements into structured, actionable summaries.</p>

        <h2>Research Process</h2>

        <h3>Phase 1: In Vivo Coding</h3>
        <p>The initial analysis preserved the original regulatory language through careful extraction of key terms and phrases directly from the EU AI Act. This phase:</p>
        <ul>
            <li>Maintained regulatory intent and precise language</li>
            <li>Captured essential requirements and obligations</li>
            <li>Identified recurring themes and patterns</li>
            <li>Created a foundation for systematic categorization</li>
        </ul>

        <h3>Phase 2: Structural Coding</h3>
        <p>Analysis of the In Vivo codes revealed six primary structural categories that organize the high-level requirements:</p>
        <ol>
            <li>Technical System Fundamentals</li>
            <li>Deployment Guidelines</li>
            <li>Data</li>
            <li>Risk Management</li>
            <li>Performance Evaluation</li>
            <li>Human Oversight</li>
        </ol>

        <h3>Phase 3: Focused Coding</h3>
        <p>Each structural category was further analyzed to identify specific requirement categories:</p>
        <ul>
            <li>Generated 25 focused codes across the 6 structural categories</li>
            <li>Assigned articles to relevant focused codes</li>
            <li>Identified cross-category relationships</li>
            <li>Maintained traceability to source material</li>
        </ul>

        <h3>Phase 4: Requirement Summary Generation</h3>
        <p>The final phase synthesized the coded material into clear, actionable summaries:</p>
        <ul>
            <li>Aggregated related articles within each focused code</li>
            <li>Extracted and synthesized key requirements</li>
            <li>Standardized language for consistency</li>
            <li>Maintained cross-references between requirements</li>
            <li>Preserved links to original legal text</li>
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
            <li>Click requirements to:
                <ul>
                    <li>Read detailed explanations</li>
                    <li>See related legal text highlighted</li>
                    <li>Understand practical implications</li>
                </ul>
            </li>
        </ul>

        <h3>Legal Text View (Right)</h3>
        <ul>
            <li>Original EU AI Act articles</li>
            <li>Interactive highlighting shows relevant sections</li>
            <li>Scroll indicator helps navigate between connected elements</li>
        </ul>

        <h2>Who is the intended audience?</h2>

        <p>This tool helps both legal and technical teams:</p>
        <ul>
            <li>Understand concrete requirements for AI system development</li>
            <li>Find relevant legal references quickly</li>
            <li>Transform legal obligations into actionable tasks</li>
            <li>Maintain legal precision while gaining practical clarity</li>
        </ul>

        <p>Whether you're planning compliance strategies or implementing technical requirements, this tool provides a structured approach to understanding and acting on the EU AI Act's requirements.</p>
    `;

    document.getElementById('methodologyContent').innerHTML = methodologyContent;
    document.getElementById('guideContent').innerHTML = guideContent;
}
