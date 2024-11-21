// tool.js
export default {
    init() {
        const section = document.querySelector('#tool .section-content');
        if (section) {
            this.renderContent(section);
            this.initializeExpandables(section);
        }
    },

    renderContent(section) {
        section.innerHTML = `
            <div class="tool-intro">
                <p>The AI ACTion tool bridges the gap between legal requirements and practical implementation, transforming complex EU AI Act regulations into actionable insights. By mapping the "legal requirement space" to "implementable action space", it helps organizations navigate compliance while maintaining legal precision. As specified in the <a href="./#process" target="_blank">Section Research Process</a>, please note that the tool only focuses on the AI Act's essential requirements for high-risk AI systems. It does not (yet) represent a complete compliance procedure.</p>

                <h3>Tool Overview</h3>
                <p>Understanding and implementing AI compliance requirements can be challenging due to extensive cross-references and duplications in legal text. Our tool untangles this "requirement web" by eliminating repetitions and providing clear, structured guidance.</p>
            </div>

            <div class="expandable tool-feature">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">Key Features & Benefits</span>
                </div>
                <div class="expandable-content">
                    <ul>
                        <li>Clear summaries of essential requirements</li>
                        <li>Direct connections to relevant legal text</li>
                        <li>Structured organization of compliance topics</li>
                        <li>Interactive highlighting of connected elements</li>
                        <li>Practical insights for implementation</li>
                    </ul>
                </div>
            </div>

            <div class="expandable tool-usage">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">How to Use the Tool</span>
                </div>
                <div class="expandable-content">
                    <h4>Requirements Panel (Left)</h4>
                    <ul>
                        <li>Browse categorized essential requirements</li>
                        <li>Click requirements to read detailed explanations</li>
                        <li>See related legal text highlighted automatically</li>
                        <li>Understand practical implications through clear summaries</li>
                    </ul>
                    
                    <h4>Legal Text View (Right)</h4>
                    <ul>
                        <li>Access original EU AI Act articles</li>
                        <li>Follow interactive highlighting of relevant sections</li>
                        <li>Use scroll indicator for easy navigation</li>
                        <li>Track connections between requirements and legal text</li>
                    </ul>
                </div>
            </div>

            <div class="expandable tool-audience">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">Target Audience & Use Cases</span>
                </div>
                <div class="expandable-content">
                    <p>The tool serves both legal and technical teams:</p>
                    <ul>
                        <li>Legal teams can quickly find relevant references and understand technical implications</li>
                        <li>Technical teams can transform legal obligations into actionable development tasks</li>
                        <li>Compliance officers can develop comprehensive implementation strategies</li>
                        <li>Project managers can plan and track compliance-related activities</li>
                    </ul>
                </div>
            </div>
        `;
    },

    initializeExpandables(section) {
        section.querySelectorAll('.expandable-header').forEach(header => {
            header.addEventListener('click', () => {
                const arrow = header.querySelector('.expandable-arrow');
                const content = header.nextElementSibling;
                
                arrow.classList.toggle('expanded');
                content.classList.toggle('expanded');
            });
        });
    }
};