import { RequirementsPanel } from './requirements.js';
import { LegalTextPanel } from './legalText.js';
import { ScrollIndicator } from './scrollIndicator.js';
import { initExplanationSystem } from './explanations.js';
import { getCategoryClass } from './utils.js';

class AIActionApp {
    constructor() {
        this.requirementsPanel = new RequirementsPanel('requirements', this.handleRequirementClick.bind(this));
        this.legalTextPanel = new LegalTextPanel('legalText');
        this.scrollIndicator = new ScrollIndicator();
    }

    /**
     * Initializes the application
     */
    async initialize() {
        // Initialize explanation system
        initExplanationSystem();

        try {
            // Load data
            const [requirements, legalText] = await Promise.all([
                fetch('data/requirements.json').then(response => response.json()),
                fetch('data/legal_text.json').then(response => response.json())
            ]);

            // Render panels
            this.requirementsPanel.render(requirements);
            this.legalTextPanel.render(legalText);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    /**
     * Handles requirement click events
     */
    async handleRequirementClick(refs, category) {
        const categoryClass = getCategoryClass(category);
        
        // Highlight text and scroll to first element
        const highlightedElements = await this.legalTextPanel.highlightText(refs, categoryClass);
        
        // Update scroll indicator with new elements
        this.scrollIndicator.updateHighlightedElements(highlightedElements);
        
        // Sync the current index between components
        this.scrollIndicator.setCurrentIndex(this.legalTextPanel.getCurrentIndex());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new AIActionApp();
    app.initialize();
});