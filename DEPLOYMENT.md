# Deployment Guide: Anmol Portfolio

Follow these steps to deploy your Next.js portfolio website live.

## 1. Prepare MongoDB Atlas
Before deploying, ensure your MongoDB database is accessible from Vercel.
- Go to [MongoDB Atlas](https://cloud.mongodb.com/).
- Navigate to **Network Access**.
- Ensure `0.0.0.0/0` (Allow Access from Anywhere) is added to the IP Access List. 
  > [!IMPORTANT]
  > This is necessary because Vercel uses dynamic IP addresses.

## 2. Push Code to GitHub
Ensure all your latest changes (including the new database structure and Base64 uploads) are on GitHub.
- Run `git add .`
- Run `git commit -m "Refactored database and added Base64 storage"`
- Run `git push origin main`

## 3. Deploy to Vercel
Vercel is the recommended platform for Next.js apps.
1.  **Sign in**: Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2.  **Add New Project**: Click the **Add New** button and select **Project**.
3.  **Import Repository**: Find your `Portfolio` repository and click **Import**.
4.  **Configure Project**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `./`
5.  **Environment Variables**: 
    - Open the **Environment Variables** section.
    - Copy the keys from your local `.env.local` file:
        - `MONGODB_URI`: (Your connection string)
        - `GMAIL_USER`: (Your email)
        - `GMAIL_PASS`: (Your app password)
    - Click **Add** for each.
6.  **Deploy**: Click the **Deploy** button.

## 4. Final Touches
- Once the deployment is complete, Vercel will provide a live URL (e.g., `anmol-portfolio.vercel.app`).
- Test the Admin Dashboard at the new URL to ensure everything works correctly. 
- You can now safely delete the local `/public/uploads` contents as everything is stored in MongoDB!

---
**Congratulations! Your portfolio is now live.**
