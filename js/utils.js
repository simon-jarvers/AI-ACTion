/**
 * Utility functions for DOM manipulation and scrolling
 */

/**
 * Checks if an element is currently visible in the viewport
 */
export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Scrolls to an element smoothly and returns a promise that resolves when scrolling is complete
 */
export function scrollToElement(element) {
    return new Promise((resolve) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        function checkScrollEnd() {
            const oldScrollTop = document.documentElement.scrollTop;
            
            setTimeout(() => {
                if (oldScrollTop === document.documentElement.scrollTop) {
                    resolve();
                } else {
                    checkScrollEnd();
                }
            }, 100);
        }
        
        checkScrollEnd();
    });
}

/**
 * Gets the CSS class name for a category
 */
export function getCategoryClass(category) {
    const categoryMap = {
        'Technical System Fundamentals': 'technical-system',
        'Deployment Guidelines': 'deployment-guidelines',
        'Data': 'data',
        'Risk Management': 'risk-management',
        'Performance Evaluation': 'performance-evaluation',
        'Human Oversight': 'human-oversight'
    };
    return categoryMap[category] || '';
}

/**
 * Formats a legal text key based on its level
 */
export function formatKey(key, level) {
    if (level === 0) {
        return `${key}.`;
    } else if (level === 1) {
        return `(${key})`;
    } else {
        return `(${key})`;
    }
}

/**
 * Debounces a function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
