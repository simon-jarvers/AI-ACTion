// js/explanations.js
export function initContact() {
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

        .utility-buttons {
            display: flex;
            gap: 40px;
        }

        .utility-button {
            color: var(--color-text-primary);
            text-decoration: none;
            font-family: var(--font-display);
            font-weight: var(--font-weight-bold);
            cursor: pointer;
            transition: color 0.3s ease;
            padding: 6px 12px;
            border: 2px solid #2c3e50;
            border-radius: 5px;
        }

        .utility-button:hover {
            color: var(--color-primary);
            border-color: var(--color-primary);
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

        .modal-content p {
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .modal-content ul {
            margin-bottom: 15px;
            padding-left: 20px;
        }

        .modal-content li {
            margin-bottom: 5px;
            line-height: 1.6;
        }

        .modal-content a {
            color: var(--color-primary);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .modal-content a:hover {
            color: var(--color-primary-dark);
            text-decoration: underline;
        }

        .email-link {
            font-weight: var(--font-weight-bold);
        }
    `;
    document.head.appendChild(styleSheet);
}

function injectHTML() {
    const explanationBar = document.createElement('div');
    explanationBar.id = 'explanationBar';
    explanationBar.innerHTML = `
        <div class="utility-buttons">
            <span class="utility-button" onclick="window.showModal('contactModal')">Contact</span>
            <span class="utility-button" onclick="window.showModal('legalModal')">Legal Notice</span>
        </div>
    `;

    const modalsHTML = `
        <div id="contactModal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="window.hideModal('contactModal')"></button>
                <div id="contactContent"></div>
            </div>
        </div>

        <div id="legalModal" class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="window.hideModal('legalModal')"></button>
                <div id="legalContent"></div>
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
    const contactContent = `
        <h1>Contact Information</h1>
        
        <p>Thank you for your interest in AI ACTion! I welcome your feedback, questions, and suggestions for improving this tool. Whether you have:</p>
        <ul>
            <li>Questions about the tool or its methodology</li>
            <li>Ideas for improvements or new features</li>
            <li>Feedback on your experience</li>
            <li>Interest in collaboration or research extensions</li>
        </ul>
        
        <p>Please feel free to reach out to me at: <a href="mailto:simon.jarvers@tum.de" class="email-link">simon.jarvers@tum.de</a></p>
        
        <p>Your input is valuable in helping make AI ACTion more useful for the community working to implement AI Act requirements.</p>
    `;

    const legalContent = `
        <h1>Legal Notice</h1>

        <h2>Project Context</h2>
        <p>AI ACTion was developed as a final project for the <a href="https://aisafetyfundamentals.com/governance/" target="_blank">AI Governance Course by BlueDot Impact</a>, drawing on insights from master's thesis research at the Technical University of Munich about the EU AI Act's impact on SMEs.</p>

        <h2>Important Disclaimers</h2>
        <ul>
            <li>This tool is not intended to provide legal advice. Organizations should consult qualified legal professionals for specific guidance on EU AI Act compliance.</li>
            <li>While thoroughly researched, this interpretation of the EU AI Act's requirements is not guaranteed to be complete or error-free.</li>
            <li>The presented interpretation is one possible way to understand and organize the requirements; other valid interpretations may exist.</li>
            <li>The content reflects my understanding at the time of creation and may not reflect latest regulatory developments. (Latest update: 21/11/2024)</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>The content, design, and methodology of AI ACTion are protected by intellectual property rights. Please cite this website and the underlying research when referencing this work.</p>
    `;

    document.getElementById('contactContent').innerHTML = contactContent;
    document.getElementById('legalContent').innerHTML = legalContent;
}