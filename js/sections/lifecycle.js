// lifecycle.js
export default {
    init() {
        const section = document.querySelector('#lifecycle .section-content');
        if (section) {
            section.innerHTML = `
                <p>The AI development lifecycle under the AI Act...</p>
            `;
        }
    }
};