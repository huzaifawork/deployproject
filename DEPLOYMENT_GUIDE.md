# Complete Deployment Guide for Your Project

This guide provides step-by-step instructions to push your project to GitHub, prepare the backend and frontend for deployment, and deploy them live using Vercel.

---

## 1. Pushing Your Project to GitHub

First, you need to get your project into a GitHub repository.

1.  **Initialize Git**: If you haven't already, open your project's root directory in a terminal and run:

    ```bash
    git init
    git add .
    git commit -m "Initial commit: Full project structure"
    ```

2.  **Create a GitHub Repository**: Go to [GitHub](https://github.com) and create a new repository. Do **not** initialize it with a README or .gitignore.

3.  **Link and Push**: Copy the commands from the "…or push an existing repository from the command line" section on your new GitHub repo page. It will look like this:
    ```bash
    git remote add origin https://github.com/your-username/your-repository-name.git
    git branch -M main
    git push -u origin main
    ```
    Your project is now on GitHub.

---

## 2. Code Changes Required for Deployment

All code has been updated so that **no URLs are hardcoded**. Instead, all API and image URLs are now read from environment variables. You only need to set the correct URLs in your environment variables for both backend and frontend.

### Where to Set URLs

#### Backend

- **CORS Allowed Origin**: Set the `FRONTEND_URL` environment variable in your backend deployment settings (e.g., Vercel dashboard). This should be the full URL of your deployed frontend (e.g., `https://your-frontend.vercel.app`).

#### Frontend

- **API and Image URLs**: Set the following environment variables in your frontend deployment settings (e.g., Vercel dashboard):
  - `REACT_APP_API_BASE_URL` (e.g., `https://your-backend.vercel.app/api`)
  - `REACT_APP_IMAGE_BASE_URL` (e.g., `https://your-backend.vercel.app`)

You can also set these in `.env.development` and `.env.production` files for local development and production builds, respectively.

---

## 3. Environment Variables

Set these in your deployment platform's dashboard (e.g., Vercel) or in your local `.env` files.

### Backend Environment Variables

| Variable               | Description                                 | Example Value                                        |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------- |
| `MONGO_URI`            | Your MongoDB connection string.             | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET`           | A long, random string for signing JWTs.     | `a_very_long_and_secret_string_for_production`       |
| `GOOGLE_CLIENT_ID`     | Your Google OAuth Client ID.                | `12345-abc.apps.googleusercontent.com`               |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret.            | `GOCSPX-secret123`                                   |
| `STRIPE_SECRET_KEY`    | Your Stripe secret key for payments.        | `sk_live_...` or `sk_test_...`                       |
| `FRONTEND_URL`         | The **full URL** of your deployed frontend. | `https://your-frontend.vercel.app`                   |

### Frontend Environment Variables

| Variable                     | Description                                            | Example Value                          |
| ---------------------------- | ------------------------------------------------------ | -------------------------------------- |
| `REACT_APP_API_BASE_URL`     | The **full URL** of your deployed backend API.         | `https://your-backend.vercel.app/api`  |
| `REACT_APP_IMAGE_BASE_URL`   | The **base URL** of your backend for serving images.   | `https://your-backend.vercel.app`      |
| `REACT_APP_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID (must match backend).      | `12345-abc.apps.googleusercontent.com` |
| `GENERATE_SOURCEMAP`         | Set to `false` to hide your source code in production. | `false`                                |

---

## 4. Deployment Steps (Using Vercel)

We will deploy the backend first to get its URL, then deploy the frontend.

### A. Deploying the Backend

1.  **Login to Vercel** with your GitHub account.
2.  **Add New Project**: Select your GitHub repository.
3.  **Configure Project**:
    - **Framework Preset**: Vercel should detect `Vite` or `Other`.
    - **Root Directory**: Set this to `backend`.
    - **Build & Output Settings**: Should be auto-detected from `vercel.json`.
    - **Environment Variables**: Click to expand, and add all the backend variables listed above **except for `FRONTEND_URL` for now**.
4.  **Deploy**: Click the "Deploy" button.
5.  **Get the URL**: Once deployment is successful, Vercel will assign you a domain (e.g., `your-project-backend.vercel.app`). **This is your backend URL.**

### B. Deploying the Frontend

1.  **Add New Project** on Vercel again, selecting the **same repository**.
2.  **Configure Project**:
    - **Framework Preset**: Vercel will detect `Create React App`.
    - **Root Directory**: Set this to `frontend`.
    - **Environment Variables**: Add all the frontend variables. For `REACT_APP_API_BASE_URL`, use the backend URL you just got (e.g., `https://your-project-backend.vercel.app/api`).
3.  **Deploy**: Click "Deploy".
4.  **Get the URL**: Once deployment is successful, you will get a domain for your frontend (e.g., `my-awesome-app.vercel.app`). **This is your `FRONTEND_URL`**.

### C. Final Configuration

1.  Go back to your **backend project settings** on Vercel.
2.  Navigate to the **Environment Variables** section.
3.  Add the `FRONTEND_URL` variable, using the live URL of your frontend.
4.  Go to the "Deployments" tab for your backend project, find the latest deployment, click the triple-dot menu, and select **"Redeploy"** to apply the new `FRONTEND_URL` variable.

Your site is now live and correctly configured!
