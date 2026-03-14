const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'zoghlamimostafa';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const OUTPUT_FILE = path.join(__dirname, '../src/data/github_projects.json');

// Helper to get a random gradient or image
const getRandomImage = (id) => {
    // consistently return the same image for the same repo ID
    const seed = id % 5;
    // Using a reliable placeholder service for tech/code related images or abstract patterns
    // Or we could use a local asset if we had one. Let's use a nice abstract pattern from a reliable source or just a color
    return `https://picsum.photos/seed/${id}/400/300`;
};

(async () => {
    try {
        console.log(`Fetching repos for ${GITHUB_USERNAME}...`);
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();
        console.log(`Found ${repos.length} repositories.`);

        const projects = repos
            .filter(repo => !repo.fork) // Optionally filter out forks, let's keep original work
            .map(repo => ({
                img: getRandomImage(repo.id), // Dynamic placeholder based on ID
                disc: repo.description ? `${repo.description} (${repo.language || 'Code'})` : `GitHub Repository (${repo.language || 'Code'})`,
                demo: repo.html_url,
                title: repo.name // Storing title just in case we want to use it later, though Project component might not use it explicitly yet
            }));

        // Ensure dir exists
        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
        console.log(`Saved ${projects.length} projects to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error fetching GitHub repos:', error.message);
        process.exit(1);
    }
})();
