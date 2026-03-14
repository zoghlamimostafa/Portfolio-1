# LinkedIn Scraper Setup

This project includes a custom script to automatically fetch your latest LinkedIn post and display it on your portfolio.

## Setup

1. **Credentials**: 
   - Rename `.env.example` to `.env` in the root directory.
   - Add your LinkedIn email and password:
     ```
     LINKEDIN_EMAIL=your_email@example.com
     LINKEDIN_PASSWORD=your_password
     ```

2. **Dependencies**:
   - Ensure you have installed the project dependencies:
     ```bash
     npm install
     ```

## Usage

### Manual Update
To fetch the latest post and update your portfolio immediately, run:

```bash
npm run scrape
```

This will:
1. Launch a hidden browser.
2. Log in to your LinkedIn account.
3. Find your latest post URL.
4. Save it to `src/data/latest_post.json`.
5. Your portfolio will automatically reflect the change (if running locally, you might need to refresh).

### Automatic Scheduling (Linux/Mac)
To run this daily, you can add a cron job.

1. Open your crontab:
   ```bash
   crontab -e
   ```

2. Add the following line to run it every day at 9 AM (replace `/path/to/project` with your actual project path):
   ```bash
   0 9 * * * cd /path/to/your/portfolio && npm run scrape >> /path/to/your/portfolio/scrape.log 2>&1
   ```

## Troubleshooting
- **Login Challenges**: If LinkedIn asks for a captcha or security code, the script might fail. You may need to run it continuously or check the `error_screenshot.png` if generated.
- **2FA**: If you have 2FA enabled, automation is much harder. You might need to disable it or use a session cookie approach (advanced).
