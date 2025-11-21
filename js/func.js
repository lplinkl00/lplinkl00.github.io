// Portfolio JavaScript Functions

// Sample projects data - replace with your actual projects
const projectsData = [
    {
        title: "MyGreenlight",
        description: "Created and maintained the website & IT infrastructure for MyGreenlight. Also performed business development & marketing tasks",
        technologies: ["Google Workspace", "Webflow", "ESG"],
        demoLink: "https://mygreenlight.com.my",
        codeLink: "N/A"
    },
    {
        title: "Earth Observation",
        description: "Another project description. Highlight key features and your role in the development process.",
        technologies: ["Python", "API", "CARTO", "SQL", "QGIS"],
        demoLink: "N/A",
        codeLink: "https://github.com/lplinkl00/earthobservation"
    },
    {
        title: "Other Personal Projects",
        description: "Describe your third project here. Showcase different skills and technologies you've worked with.",
        technologies: ["HTML", "CSS", "JavaScript", "UI/UX"],
        demoLink: "https://example.com",
        codeLink: "https://github.com/yourusername/project-three"
    }
];

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';

    const techTags = project.technologies.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    card.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${techTags}
        </div>
        <div class="project-links">
            ${project.demoLink ? `<a href="${project.demoLink}" class="project-link" target="_blank">Live Demo</a>` : ''}
            ${project.codeLink ? `<a href="${project.codeLink}" class="project-link" target="_blank">View Code</a>` : ''}
        </div>
    `;

    return card;
}

// Function to render all projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }

    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Function to initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    initSmoothScrolling();
    initScrollAnimations();

    // Add active state to navigation on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
