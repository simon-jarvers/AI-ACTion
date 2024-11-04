// about.js
export default {
    init() {
        const section = document.querySelector('#about .section-content');
        if (section) {
            this.renderContent(section);
            this.initializeExpandables(section);
        }
    },

    renderContent(section) {
        section.innerHTML = `
            <div class="about-intro">
                <p>The EU AI Act entered into force on August 1 2024. It establishes the world's first comprehensive regulatory framework for artificial intelligence, setting binding rules for the development, deployment, and use of AI systems in the European Union.</p>

                <h3>Risk-Based Approach</h3>
                <p>The Act introduces a tiered, risk-based framework that categorizes AI systems based on their potential impact on citizens' rights and safety. The categories and their implications are detailed in the expandable sections below. For comprehensive information, visit the <a href="https://artificialintelligenceact.eu/" target="_blank">Artificial Intelligence Act</a> website, which provides both the <a href="https://artificialintelligenceact.eu/ai-act-explorer/" target="_blank">AI Act Explorer</a> for navigating the full legal text and a <a href="https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/" target="_blank">Compliance Checker</a> to assess your AI system's risk level.</p>

                <h3>Challenges</h3>
                <p>While the AI Act marks a crucial step toward responsible AI development, its implementation presents notable challenges. The current lack of technical standards and clear operational guidelines creates uncertainties that are challenging, particularly for small and medium-sized enterprises developing AI systems. The complexity of compliance requirements and unclear liability frameworks may impact investment decisions in the EU's AI sector. Our research acknowledges these challenges and, through the <a href="/tool" target="_blank">AI ACTion tool</a>, aims to support AI practitioners and policy makers by making the essential requirements for high-risk AI systems more approachable and actionable, while recognizing that comprehensive compliance will require ongoing effort as the regulatory landscape evolves.</p>
            </div>

            <div class="expandable unacceptable">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">Unacceptable Risk AI Systems (Prohibited)</span>
                </div>
                <div class="expandable-content">
                    <p>Systems that are banned due to unacceptable risks to fundamental rights, including:</p>
                    <ul>
                        <li>Manipulative or exploitative AI systems</li>
                        <li>Social scoring systems</li>
                        <li>Biometric categorization systems inferring sensitive attributes</li>
                        <li>Untargeted facial recognition databases</li>
                        <li>Emotion recognition in workplaces/educational institutions</li>
                        <li>Real-time remote biometric identification (with specific exceptions)</li>
                    </ul>
                </div>
            </div>

            <div class="expandable high-risk">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">High-Risk AI Systems</span>
                </div>
                <div class="expandable-content">
                    <p>Systems that pose significant risks to health, safety, or fundamental rights, including:</p>
                    <ul>
                        <li>Critical infrastructure management</li>
                        <li>Educational and vocational training</li>
                        <li>Employment and worker management</li>
                        <li>Access to essential services</li>
                        <li>Law enforcement systems</li>
                        <li>Migration and border control</li>
                        <li>Administration of justice</li>
                    </ul>
                    <p>These systems must meet strict requirements for risk management, data quality, documentation, transparency, and human oversight.</p>
                </div>
            </div>

            <div class="expandable minimal-risk">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">Minimal Risk AI Systems</span>
                </div>
                <div class="expandable-content">
                    <p>The majority of AI applications that pose minimal or no risk are unregulated, including:</p>
                    <ul>
                        <li>AI-enabled video games</li>
                        <li>Spam filters</li>
                        <li>Basic chatbots</li>
                        <li>Other common AI applications with minimal impact</li>
                    </ul>
                </div>
            </div>

            <div class="expandable limited-risk">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">Transparency Requirements</span>
                </div>
                <div class="expandable-content">
                    <p>Systems with specific transparency obligations:</p>
                    <ul>
                        <li>Chatbots</li>
                        <li>Deepfakes</li>
                        <li>Emotion recognition systems</li>
                        <li>Biometric categorization systems</li>
                    </ul>
                    <p>Users must be informed when they are interacting with these AI systems.</p>
                </div>
            </div>

            <div class="expandable gpai">
                <div class="expandable-header">
                    <svg class="expandable-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span class="expandable-title">General Purpose AI Models</span>
                </div>
                <div class="expandable-content">
                    <p>Special provisions for general-purpose AI models:</p>
                    <ul>
                        <li>Basic requirements for all GPAI providers (documentation, instructions, copyright compliance)</li>
                        <li>Additional requirements for models presenting systemic risks</li>
                        <li>Special considerations for open-source models</li>
                        <li>Cooperation requirements with high-risk AI system providers</li>
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