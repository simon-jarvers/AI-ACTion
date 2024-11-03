// process.js
export default {
    init() {
        const section = document.querySelector('#process .section-content');
        if (section) {
            section.innerHTML = `
                <p>Our research process involved analyzing the AI Act...</p>
            `;
        }
    }
};