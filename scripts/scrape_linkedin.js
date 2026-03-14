require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LINKEDIN_EMAIL = process.env.LINKEDIN_EMAIL;
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD;

if (!LINKEDIN_EMAIL || !LINKEDIN_PASSWORD) {
    console.error('Error: LINKEDIN_EMAIL and LINKEDIN_PASSWORD must be set in .env file');
    process.exit(1);
}

const IS_HEADLESS = process.env.HEADLESS !== 'false';
const USER_DATA_DIR = path.join(__dirname, 'user_data');

(async () => {
    console.log(`Launching browser (Headless: ${IS_HEADLESS})...`);
    console.log(`User data dir: ${USER_DATA_DIR}`);

    const browser = await puppeteer.launch({
        headless: IS_HEADLESS ? "new" : false,
        userDataDir: USER_DATA_DIR,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let page;
    try {
        page = await browser.newPage();

        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });

        console.log('Navigating to LinkedIn feed...');
        // Go straight to feed. If we have cookies, it works. If not, it redirects to login.
        try {
            await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        } catch (navError) {
            console.log('Navigation to feed took too long or failed, checking URL...');
        }

        // Check login state
        if (page.url().includes('login') || page.url().includes('guest')) {
            console.log('Not logged in. Performing login...');
            await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });

            console.log('Waiting for login form...');
            try {
                await page.waitForSelector('#username, input[name="session_key"]', { timeout: 10000 });
                console.log('Typing credentials...');

                // Try to type in whichever selector we found
                const emailField = await page.$('#username') || await page.$('input[name="session_key"]');
                const passwordField = await page.$('#password') || await page.$('input[name="session_password"]');

                if (emailField && passwordField) {
                    await emailField.type(LINKEDIN_EMAIL);
                    await passwordField.type(LINKEDIN_PASSWORD);

                    await Promise.all([
                        page.click('.btn__primary--large, button[type="submit"]'),
                        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                    ]);
                } else {
                    throw new Error('Could not find email or password fields');
                }
            } catch (loginError) {
                console.error('Could not find login fields. URL is: ' + page.url());
                throw loginError;
            }
        } else {
            console.log('Session cookies valid! Already logged in.');
        }

        // 2FA / Security Check
        if (page.url().includes('checkpoint') || page.url().includes('challenge')) {
            console.log('⚠️ 2FA / Security Challenge detected!');
            if (IS_HEADLESS) {
                throw new Error('Cannot handle 2FA in headless mode. Please run "npm run scrape:login" first.');
            } else {
                console.log('Waiting 3 minutes for you to manually complete 2FA...');
                // Long timeout for manual entry
                await page.waitForNavigation({ timeout: 180000, waitUntil: 'domcontentloaded' });
                console.log('2FA passed (hopefully). Continuing...');
            }
        }

        // Verification we are actually on feed
        if (!page.url().includes('/feed')) {
            console.log('Redirecting to feed to ensure clean state...');
            await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded' });
        }

        console.log('Navigating to user recent posts (via direct URL construction)...');
        // We need the profile URN or vanilla ID.
        // Let's try to extract the profile URL from the "Me" dropdown or sidebar

        // Wait for the mini-profile in sidebar
        try {
            console.log('Looking for profile link in sidebar...');
            await page.waitForSelector('.feed-identity-module__actor-meta a', { timeout: 5000 });
            const profileLink = await page.$eval('.feed-identity-module__actor-meta a', el => el.href);
            console.log(`Found profile link: ${profileLink}`);

            const cleanProfileUrl = profileLink.split('?')[0];
            const postsUrl = `${cleanProfileUrl.replace(/\/$/, '')}/recent-activity/all/`;
            console.log(`Going to posts URL: ${postsUrl}`);
            await page.goto(postsUrl, { waitUntil: 'domcontentloaded' });

        } catch (e) {
            console.log('Sidebar profile link not found. Trying Global Nav "Me" button...');
            try {
                // Try finding the 'Me' icon in global nav
                // Usually #global-nav-icon--mvp-me or similar, but generic approach:
                // Look for the image with alt text containing "Photo of" or similar inside global nav

                await page.waitForSelector('.global-nav__me-photo', { timeout: 5000 });
                // The parent of the photo usually has the link or is inside a button that opens a menu
                // Actually, the "Me" nav item link usually goes to /in/username/ or opens a menu.
                // Let's try to get the link from the "Me" button directly if it's an anchor, otherwise we might need to click it.

                // Strategy: The 'Me' button usually opens a dropdown. Inside that dropdown is a "View Profile" button.
                console.log('Clicking "Me" dropdown...');
                await page.click('.global-nav__me-photo');

                console.log('Waiting for "View Profile" link...');
                // The "View Profile" button usually has href to profile
                await page.waitForSelector('.artdeco-dropdown__content a[href*="/in/"]', { timeout: 5000 });
                const profileLink = await page.$eval('.artdeco-dropdown__content a[href*="/in/"]', el => el.href);

                console.log(`Found profile link from menu: ${profileLink}`);
                const cleanProfileUrl = profileLink.split('?')[0];
                const postsUrl = `${cleanProfileUrl.replace(/\/$/, '')}/recent-activity/all/`;

                console.log(`Going to posts URL: ${postsUrl}`);
                await page.goto(postsUrl, { waitUntil: 'domcontentloaded' });

            } catch (navError) {
                console.error('Could not find profile URL via sidebar OR nav menu.');
                throw navError;
            }
        }

        console.log('Waiting for posts to load...');
        try {
            // Wait for update containers
            await page.waitForSelector('.feed-shared-update-v2', { timeout: 10000 });

            // Scroll down a bit to trigger lazy loading of more posts
            console.log('Scrolling to load more posts...');
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight * 2);
            });
            await new Promise(r => setTimeout(r, 2000)); // Wait for render

            const newPosts = await page.evaluate(() => {
                const posts = document.querySelectorAll('.feed-shared-update-v2');
                if (!posts || posts.length === 0) return [];

                const results = [];
                posts.forEach(post => {
                    const urn = post.getAttribute('data-urn'); // e.g., urn:li:activity:12345

                    // Blacklist approach: Skip if it explicitly says "Connections only"
                    const textContent = (post.innerText || "").toLowerCase();
                    const isPrivate = textContent.includes("connections only");

                    // Debugging (optional, remove later if too noisy)
                    // console.log(`Post ${urn} text snippet: ${textContent.substring(0, 50)}... Private? ${isPrivate}`);

                    if (urn) {
                        if (!isPrivate) {
                            results.push({
                                url: `https://www.linkedin.com/feed/update/${urn}`,
                                urn: urn,
                                date: new Date().toISOString()
                            });
                        } else {
                            console.log(`Skipping private post: ${urn}`);
                        }
                    }
                });
                return results;
            });

            if (newPosts.length > 0) {
                console.log(`Found ${newPosts.length} posts on page.`);

                // Helper to read existing posts
                const DATA_FILE = path.join(__dirname, '../src/data/linkedin_posts.json');
                let existingPosts = [];
                if (fs.existsSync(DATA_FILE)) {
                    try {
                        existingPosts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
                        if (!Array.isArray(existingPosts)) existingPosts = [];
                    } catch (e) {
                        console.log('Could not parse existing posts, starting fresh.');
                    }
                }

                // Merge and Deduplicate
                // We put new posts at the top, then existing ones.
                // We use a Map to keep unique URLs.
                const allPosts = [...newPosts, ...existingPosts];
                const uniquePostsMap = new Map();

                allPosts.forEach(post => {
                    if (!uniquePostsMap.has(post.url)) {
                        uniquePostsMap.set(post.url, post);
                    }
                });

                const uniquePosts = Array.from(uniquePostsMap.values());
                console.log(`Total unique posts after merge: ${uniquePosts.length}`);

                // Ensure dir exists
                const dir = path.dirname(DATA_FILE);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                fs.writeFileSync(DATA_FILE, JSON.stringify(uniquePosts, null, 2));
                console.log(`Saved ${uniquePosts.length} posts to src/data/linkedin_posts.json`);
            } else {
                console.log('No posts found via selector.');
            }

        } catch (err) {
            console.log('Error extracting posts: ' + err.message);
        }

    } catch (error) {
        console.error('Scraping Error:', error.message);
        if (page && !error.message.includes('target closed')) {
            try {
                await page.screenshot({ path: 'error_screenshot.png' });
                console.log('Saved error_screenshot.png');
            } catch (e) {
                console.log('Could not capture screenshot.');
            }
        }
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
})();
