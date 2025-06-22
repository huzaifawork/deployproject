# 🚀 Frontend Deployment Guide - Vercel

## ✅ Backend Status

Your backend is successfully deployed on Railway at: **https://web-production-3f45.up.railway.app/**

## 📋 Prerequisites

- GitHub repository with your project
- Vercel account (free tier available)
- Node.js installed locally (for testing)

## 🔧 Step 1: Prepare Frontend for Deployment

### 1.1 Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=https://web-production-3f45.up.railway.app
```

### 1.2 Test Locally

```bash
cd frontend
npm install
npm start
```

## 🚀 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**

   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**

   - Click "New Project"
   - Import your GitHub repository
   - Set the following configuration:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Environment Variables**

   - Add environment variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `https://web-production-3f45.up.railway.app`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `your-project-name`
   - In which directory is your code located: `./`
   - Want to override the settings: `N`

## 🔧 Step 3: Configure Environment Variables

After deployment, go to your Vercel project dashboard:

1. **Settings** → **Environment Variables**
2. **Add Variable**:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://web-production-3f45.up.railway.app`
   - **Environment**: Production, Preview, Development
3. **Save** and **Redeploy**

## 🧪 Step 4: Test Your Deployment

### 4.1 Test API Connection

Visit your deployed frontend and check:

- [ ] Homepage loads
- [ ] Menu page loads
- [ ] Room booking works
- [ ] Table reservation works
- [ ] User authentication works

### 4.2 Common Issues & Solutions

#### Issue: API calls failing

**Solution**: Check environment variables are set correctly

#### Issue: Images not loading

**Solution**: Ensure image paths are using the new `getImageUrl` utility

#### Issue: CORS errors

**Solution**: Backend CORS is already configured for production

## 📱 Step 5: Custom Domain (Optional)

1. **Go to Vercel Dashboard** → **Settings** → **Domains**
2. **Add Domain**: Enter your custom domain
3. **Configure DNS**: Follow Vercel's DNS instructions
4. **SSL Certificate**: Automatically provisioned

## 🔄 Step 6: Continuous Deployment

Your project will automatically redeploy when you:

- Push to `main` branch
- Create a pull request
- Manually trigger from Vercel dashboard

## 📊 Step 7: Monitoring

### Vercel Analytics

- **Analytics** tab in Vercel dashboard
- **Performance** monitoring
- **Error tracking**

### Health Checks

- Frontend: Your Vercel URL
- Backend: https://web-production-3f45.up.railway.app/api/health

## 🎯 Final Checklist

- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] API connection working
- [ ] All features tested
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

## 🆘 Troubleshooting

### Build Failures

1. Check `package.json` scripts
2. Verify all dependencies are installed
3. Check for TypeScript errors

### Runtime Errors

1. Check browser console
2. Verify API endpoints
3. Check environment variables

### Performance Issues

1. Enable Vercel Analytics
2. Optimize images
3. Check bundle size

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review browser console errors
3. Test API endpoints directly
4. Verify environment variables

---

**🎉 Congratulations!** Your full-stack application is now deployed and ready for production use!
