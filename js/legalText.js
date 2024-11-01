import { formatKey, scrollToElement } from './utils.js';

export class LegalTextPanel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.highlightedElements = [];
        this.currentHighlightIndex = 0;
    }

    /**
     * Renders the legal text panel
     */
    render(legalText) {
        this.container.innerHTML = '';
        Object.entries(legalText).forEach(([articleKey, articleContent]) => {
            const articleContainer = document.createElement('div');
            this.renderLegalTextContent(
                {title: articleContent.title, articles: articleContent.articles}, 
                articleContainer, 
                '', 
                articleKey
            );
            this.container.appendChild(articleContainer);
        });
    }

    /**
     * Recursively renders legal text content
     */
    renderLegalTextContent(content, container, prefix = '', articleKey = '', level = 0) {
        if (content.title) {
            const articleContainer = document.createElement('div');
            articleContainer.className = 'article-container';
            
            const titleElement = document.createElement('h2');
            titleElement.className = 'article-headline';
            titleElement.textContent = articleKey ? `${articleKey}: ${content.title}` : content.title;
            articleContainer.appendChild(titleElement);
            
            const contentContainer = document.createElement('div');
            contentContainer.className = 'article-content';
            articleContainer.appendChild(contentContainer);
            
            container.appendChild(articleContainer);
            container = contentContainer;
        }

        if (content.articles) {
            Object.entries(content.articles).forEach(([key, value]) => {
                const articleContainer = document.createElement('div');
                const articleId = prefix ? `${prefix}.${key}` : `${articleKey}.${key}`;
                articleContainer.id = articleId;

                if (value.content) {
                    const contentElement = document.createElement('p');
                    const formattedKey = formatKey(key, level);
                    contentElement.textContent = `${formattedKey} ${value.content}`;
                    contentElement.style.marginLeft = `${level * 20}px`;
                    articleContainer.appendChild(contentElement);
                }

                if (value.articles && Object.keys(value.articles).length > 0) {
                    this.renderLegalTextContent(value, articleContainer, articleId, articleKey, level + 1);
                }

                container.appendChild(articleContainer);
            });
        }
    }

    /**
     * Highlights legal text references and scrolls to first highlighted element
     */
    async highlightText(refs, categoryClass) {
        // Remove previous highlights and active states
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('highlight');
            el.classList.remove('technical-system-highlight', 'deployment-guidelines-highlight', 
                              'data-highlight', 'risk-management-highlight', 
                              'performance-evaluation-highlight', 'human-oversight-highlight');
        });

        this.highlightedElements = [];
        refs.forEach(ref => {
            const element = document.getElementById(ref);
            if (element) {
                const contentElement = element.querySelector(':scope > p');
                if (contentElement) {
                    contentElement.classList.add('highlight');
                    contentElement.classList.add(`${categoryClass}-highlight`);
                    this.highlightedElements.push(contentElement);
                }
            }
        });

        // Reset index and scroll to first highlighted element
        if (this.highlightedElements.length > 0) {
            this.currentHighlightIndex = 0;
            await scrollToElement(this.highlightedElements[0]);
        }

        return this.highlightedElements;
    }

    /**
     * Gets currently highlighted elements
     */
    getHighlightedElements() {
        return this.highlightedElements;
    }

    /**
     * Gets current highlight index
     */
    getCurrentIndex() {
        return this.currentHighlightIndex;
    }

    /**
     * Sets current highlight index
     */
    setCurrentIndex(index) {
        this.currentHighlightIndex = index;
    }
}