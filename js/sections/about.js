// about.js
export default {
    init() {
        const section = document.querySelector('#about .section-content');
        if (section) {
            section.innerHTML = `
                <p>The EU AI Act is the world's first comprehensive legislation...</p>
            `;
        }
    }
};