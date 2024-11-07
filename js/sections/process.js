// process.js
export default {
    init() {
        const section = document.querySelector('#process .section-content');
        if (section) {
            this.renderContent(section);
            this.initializeExpandables(section);
        }
    },

    renderContent(section) {
        section.innerHTML = `
            <div class="process-intro">
                <p>This visualization tool is the result of a systematic qualitative analysis of the essential requirements for high-risk AI systems in the EU AI Act, specifically focusing on Articles 9 (Risk Management), 10 (Data Governance), 12 (Record-Keeping), 13 (Transparency), 14 (Human Oversight), 15 (Accuracy & Robustness), 72 (Post-Market Monitoring), and Annex IV (Technical Documentation). The analysis followed a rigorous four-phase coding process to transform these legal requirements into structured, actionable summaries.</p>
            </div>

            <div class="process-grid">
                <div class="expandable process-phase">
                    <div class="expandable-header">
                        <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span class="expandable-title">Phase 1: In Vivo Coding</span>
                    </div>
                    <div class="expandable-content">
                        <p>The initial analysis preserved the original legal language through extraction of key terms and phrases directly from the EU AI Act.</p>
                        <ul>
                            <li>Maintained regulatory intent and precise language</li>
                            <li>Identified recurring themes and patterns</li>
                            <li>Created a foundation for systematic categorization</li>
                        </ul>
                    </div>
                </div>

                <div class="expandable process-phase">
                    <div class="expandable-header">
                        <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span class="expandable-title">Phase 2: Structural Coding</span>
                    </div>
                    <div class="expandable-content">
                        <p>Analysis of the In Vivo codes revealed six primary structural categories that organize the requirements on a high level:</p>
                        <ul>
                            <li>Technical System Fundamentals</li>
                            <li>Deployment Guidelines</li>
                            <li>Data</li>
                            <li>Risk Management</li>
                            <li>Performance Evaluation</li>
                            <li>Human Oversight</li>
                        </ul>
                    </div>
                </div>

                <div class="expandable process-phase">
                    <div class="expandable-header">
                        <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span class="expandable-title">Phase 3: Focused Coding</span>
                    </div>
                    <div class="expandable-content">
                        <p>Each structural category was further analyzed to identify specific, actionable requirements:</p>
                        <ul>
                            <li>Generated 25 focused codes across the 6 structural categories</li>
                            <li>Assigned each paragraph to upto 2 focused codes</li>
                            <li>Maintained traceability to source material</li>
                        </ul>
                    </div>
                </div>

                <div class="expandable process-phase">
                    <div class="expandable-header">
                        <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span class="expandable-title">Phase 4: Requirement Summary</span>
                    </div>
                    <div class="expandable-content">
                        <p>The final phase synthesized the coded material into clear, actionable summaries for each focused code:</p>
                        <ul>
                            <li>Extracted and synthesized key requirements</li>
                            <li>Wording as close to the legal text as possible</li>
                            <li>Standardized language for consistency</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="safety-layers">
                <h3>Regulatory Theory: A Three-Layered Safety Approach</h3>
                <p>While analyzing the essential requirements through the coding process, I observed a layered approach to AI safety. This layered interpretation offers one way to think about how different requirements in the AI Act might work together to create a comprehensive safety framework. While this is not an official categorization from the legislation itself, it provides a helpful mental model for understanding the interplay between various safety mechanisms in the Act.</p>
                <p>This interpretation is inspired by James Reason's "Swiss Cheese Model" of accident prevention, where multiple layers of defense work together to prevent failures. It is also used in the context of AI safety at the <a href="https://www.safe.ai/ai-risk#organizational-risks" target="_blank">Center for AI safety</a>. Applied to the AI Act's requirements, this conceptual model suggests three complementary layers of safety measures:</p>
                
                <div class="safety-visualization">
                    <img src="./assets/3_layered_safety.png" alt="Three layered safety approach visualization showing Transparency, Risk Reduction, and Monitoring layers" />
                </div>

                <div class="safety-explanation">
                    <div class="safety-layer">
                        <h4>1. Transparency</h4>
                        <p>The first conceptual layer involves requirements for transparency about data usage, model training, system architecture, and deployed algorithms. Like the first slice in the Swiss cheese model, transparency creates an initial barrier by enabling deployers, auditors, and authorities to verify claims about AI system capabilities and safety.</p>
                    </div>

                    <div class="safety-layer">
                        <h4>2. Risk Reduction</h4>
                        <p>The second layer consists of requirements focused on active risk management. These provisions add another safety barrier by requiring systematic identification, evaluation, and minimization of risks to health, safety, and fundamental rights.</p>
                    </div>

                    <div class="safety-layer">
                        <h4>3. Monitoring</h4>
                        <p>The final conceptual layer represents ongoing safety measures through mandatory human oversight and continuous performance evaluation. Like the last slice in the Swiss cheese model, these requirements provide a final barrier to help ensure AI systems remain aligned with human values and catch potential issues that may have passed through earlier layers.</p>
                    </div>
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