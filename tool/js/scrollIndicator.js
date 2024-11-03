import { isElementInViewport, scrollToElement, debounce } from './utils.js';

export class ScrollIndicator {
    constructor() {
        this.indicator = document.getElementById('scrollIndicator');
        this.offScreenCount = document.getElementById('offScreenCount');
        this.highlightedElements = [];
        this.currentHighlightIndex = 0;
        
        // Initialize scroll handling
        this.initializeScrollHandling();
    }

    /**
     * Initializes scroll event handling
     */
    initializeScrollHandling() {
        const debouncedCheck = debounce(() => this.checkVisibility(), 100);
        window.addEventListener('scroll', debouncedCheck);
        
        if (this.indicator) {
            this.indicator.onclick = () => this.scrollToNextHighlight();
        }
    }

    /**
     * Updates the highlighted elements being tracked
     */
    updateHighlightedElements(elements) {
        this.highlightedElements = elements;
        // Don't reset currentHighlightIndex here anymore
        this.checkVisibility();
    }

    /**
     * Sets current highlight index
     */
    setCurrentIndex(index) {
        this.currentHighlightIndex = index;
        this.checkVisibility();
    }

    /**
     * Checks visibility of highlighted elements and updates indicator
     */
    checkVisibility() {
        if (!this.indicator || !this.offScreenCount || this.highlightedElements.length === 0) {
            if (this.indicator) {
                this.indicator.classList.add('hidden');
            }
            return;
        }

        const offScreenElements = this.highlightedElements.filter(el => !isElementInViewport(el));

        if (offScreenElements.length > 0) {
            this.indicator.classList.remove('hidden');
            this.offScreenCount.textContent = offScreenElements.length;
            
            const nextElement = this.highlightedElements[
                (this.currentHighlightIndex + 1) % this.highlightedElements.length
            ];
            const isScrollingUp = nextElement.getBoundingClientRect().top < 0;
            this.indicator.querySelector('svg').style.transform = isScrollingUp ? 'rotate(0deg)' : 'rotate(180deg)';
        } else {
            this.indicator.classList.add('hidden');
        }
    }

    /**
     * Scrolls to the next highlighted element
     */
    async scrollToNextHighlight() {
        if (this.highlightedElements.length === 0) return;
        
        this.currentHighlightIndex = (this.currentHighlightIndex + 1) % this.highlightedElements.length;
        await scrollToElement(this.highlightedElements[this.currentHighlightIndex]);
        this.checkVisibility();
    }
}