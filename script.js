// Variables for scrolling function
let highlightedElements = [];
let currentHighlightIndex = 0;
let lastClickedRequirement = null;

// Add new variables for touch events
let touchStartX = 0;
let touchEndX = 0;

// Function to check screen size and apply appropriate layout
function checkScreenSize() {
    const container = document.getElementById('container');
    if (window.innerWidth <= 768) {
        container.style.transform = 'translateX(0)';
    } else {
        container.style.transform = 'none';
    }
}

// Function to handle swipe
function handleSwipe() {
    const container = document.getElementById('container');
    if (touchEndX < touchStartX && window.innerWidth <= 768) {
        // Swipe left
        container.style.transform = 'translateX(-100vw)';
    }
    if (touchEndX > touchStartX && window.innerWidth <= 768) {
        // Swipe right
        container.style.transform = 'translateX(0)';
    }
}

// Event listeners for touch events
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Event listener for window resize
window.addEventListener('resize', checkScreenSize);

// Modify the existing event listener for DOMContentLoaded to include checkScreenSize
document.addEventListener('DOMContentLoaded', () => {
    checkScreenSize(); // Add this line at the beginning of the function
    // ... (keep the rest of the existing initialization code)


// Load JSON data
fetch('requirements.json')
    .then(response => response.json())
    .then(requirements => {
        // Render requirements
        const requirementsContainer = document.getElementById('requirements');
        Object.entries(requirements).forEach(([category, items]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = `requirement-category ${getCategoryClass(category)}`;
            categoryElement.innerHTML = `<h2>${category}</h2>`;
            Object.entries(items).forEach(([item, details]) => {
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
                    
                    const isExpanding = toggleRequirement(itemElement, contentElement);
                    
                    if (isExpanding) {
                        highlightLegalText(details.ref, category);
                    }
                };
                
                categoryElement.appendChild(itemElement);
                categoryElement.appendChild(contentElement);
            });
            requirementsContainer.appendChild(categoryElement);
        });

        // Render full legal text
        renderLegalText();
    });
});

    function toggleRequirement(requirementElement, contentElement) {
        const arrow = requirementElement.querySelector('.requirement-arrow');
        const isExpanding = !arrow.classList.contains('expanded');
        arrow.classList.toggle('expanded');
        contentElement.classList.toggle('expanded');
        return isExpanding;
    }

function renderLegalText() {
    fetch('legal_text.json')
        .then(response => response.json())
        .then(legalText => {
            const legalTextContainer = document.getElementById('legalText');
            Object.entries(legalText).forEach(([articleKey, articleContent]) => {
                const articleContainer = document.createElement('div');
                renderLegalTextContent({title: articleContent.title, articles: articleContent.articles}, articleContainer, '', articleKey);
                legalTextContainer.appendChild(articleContainer);
            });
        });
}

function renderLegalTextContent(content, container, prefix = '', articleKey = '', level = 0) {
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
        
        // Update the container reference to the content container
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
                contentElement.style.marginLeft = `${level * 20}px`; // Indent based on level
                articleContainer.appendChild(contentElement);
            }

            if (value.articles && Object.keys(value.articles).length > 0) {
                renderLegalTextContent(value, articleContainer, articleId, articleKey, level + 1);
            }

            container.appendChild(articleContainer);
        });
    }
}

function formatKey(key, level) {
    if (level === 0) {
        return `${key}.`;
    } else if (level === 1) {
        return `(${key})`;
    } else {
        return `(${key})`;
    }
}

function highlightLegalText(refs, category) {
    // Remove previous highlights and active states
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
        el.classList.remove('technical-system-highlight', 'deployment-guidelines-highlight', 'data-highlight', 
                            'risk-management-highlight', 'performance-evaluation-highlight', 'human-oversight-highlight');
    });
    document.querySelectorAll('.requirement.active').forEach(el => el.classList.remove('active'));
    
    // Add active state to clicked requirement
    event.target.closest('.requirement').classList.add('active');

    highlightedElements = [];
    refs.forEach(ref => {
        const element = document.getElementById(ref);
        if (element) {
            // Only highlight the specific element, not its children
            const contentElement = element.querySelector(':scope > p');
            if (contentElement) {
                contentElement.classList.add('highlight');
                contentElement.classList.add(`${getCategoryClass(category)}-highlight`);
                highlightedElements.push(contentElement);
            }
        }
    });

    // Scroll to the first highlighted element
    if (highlightedElements.length > 0) {
        currentHighlightIndex = 0;
        scrollToElement(highlightedElements[currentHighlightIndex])
            .then(() => checkScrollIndicator());
    }
}

function scrollToElement(element) {
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
            }, 1000);
        }
        
        checkScrollEnd();
    });
}

function checkScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const offScreenCount = document.getElementById('offScreenCount');
    const offScreenElements = highlightedElements.filter(el => !isElementInViewport(el));

    if (offScreenElements.length > 0) {
        scrollIndicator.classList.remove('hidden');
        scrollIndicator.onclick = scrollToNextHighlight;
        offScreenCount.textContent = offScreenElements.length;
        
        const nextElement = highlightedElements[(currentHighlightIndex + 1) % highlightedElements.length];
        const isScrollingUp = nextElement.getBoundingClientRect().top < 0;
        scrollIndicator.querySelector('svg').style.transform = isScrollingUp ? 'rotate(0deg)' : 'rotate(180deg)';
    } else {
        scrollIndicator.classList.add('hidden');
    }
}

function scrollToNextHighlight() {
    currentHighlightIndex = (currentHighlightIndex + 1) % highlightedElements.length;
    scrollToElement(highlightedElements[currentHighlightIndex])
        .then(() => checkScrollIndicator());
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollIndicator, 1000);
});

function getCategoryClass(category) {
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

window.addEventListener('scroll', checkScrollIndicator);