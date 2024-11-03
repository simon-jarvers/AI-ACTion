// tool.js
export default {
    init() {
        const section = document.querySelector('#tool .section-content');
        if (section) {
            section.innerHTML = `
                <p>The Requirements Explorer Tool helps you navigate the AI Act...</p>
            `;
        }
    }
};