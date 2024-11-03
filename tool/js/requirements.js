import { getCategoryClass } from './utils.js';

export class RequirementsPanel {
    constructor(containerId, onRequirementClick) {
        this.container = document.getElementById(containerId);
        this.onRequirementClick = onRequirementClick;
    }

    /**
     * Renders the requirements panel with categorized items
     */
    render(requirements) {
        this.container.innerHTML = '';
        Object.entries(requirements).forEach(([category, items]) => {
            const categoryElement = this.createCategoryElement(category, items);
            this.container.appendChild(categoryElement);
        });
    }

    /**
     * Creates a category element with its requirements
     */
    createCategoryElement(category, items) {
        const categoryElement = document.createElement('div');
        categoryElement.className = `requirement-category ${getCategoryClass(category)}`;
        categoryElement.innerHTML = `<h2>${category}</h2>`;

        Object.entries(items).forEach(([item, details]) => {
            const { itemElement, contentElement } = this.createRequirementElement(item, details, category);
            categoryElement.appendChild(itemElement);
            categoryElement.appendChild(contentElement);
        });

        return categoryElement;
    }

    /**
     * Creates a requirement element with its content
     */
    createRequirementElement(item, details, category) {
        const itemElement = document.createElement('div');
        itemElement.className = 'requirement';
        itemElement.innerHTML = `
            <svg class="requirement-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span>${item}</span>
        `;

        const contentElement = document.createElement('div');
        contentElement.className = 'requirement-content';
        contentElement.textContent = details.content;
        
        itemElement.onclick = (event) => {
            if (event.target.closest('.requirement-content')) return;
            
            const isExpanding = this.toggleRequirement(itemElement, contentElement);
            if (isExpanding && this.onRequirementClick) {
                this.onRequirementClick(details.ref, category);
            }
        };

        return { itemElement, contentElement };
    }

    /**
     * Toggles a requirement's expanded state
     */
    toggleRequirement(requirementElement, contentElement) {
        const arrow = requirementElement.querySelector('.requirement-arrow');
        const isExpanding = !arrow.classList.contains('expanded');
        arrow.classList.toggle('expanded');
        contentElement.classList.toggle('expanded');
        return isExpanding;
    }
}
