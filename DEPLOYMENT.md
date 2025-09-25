# Deployment Guide

This guide covers deploying the AWS Prep Platform to various hosting providers.

## 🌐 Frontend Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides excellent React.js hosting with automatic deployments.

1. **Install Vercel CLI:**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Build and deploy:**
   \`\`\`bash
   cd frontend
   npm run build
   vercel --prod
   \`\`\`

3. **Set environment variables in Vercel dashboard:**
   - `REACT_APP_CLERK_PUBLISHABLE_KEY`
   - `REACT_APP_API_URL`

### Option 2: Netlify

1. **Build the project:**
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Deploy via Netlify CLI:**
   \`\`\`bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   \`\`\`

3. **Set environment variables in Netlify dashboard**

### Option 3: AWS S3 + CloudFront

1. **Build the project:**
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Upload to S3 bucket configured for static hosting**
3. **Configure CloudFront distribution**
4. **Set up custom domain (optional)**

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended)

Railway provides simple Node.js hosting with automatic deployments.

1. **Connect your GitHub repository to Railway**
2. **Set environment variables:**
   \`\`\`
   NODE_ENV=production
   CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   FRONTEND_URL=https://your-frontend-domain.com
   \`\`\`
3. **Deploy automatically on git push**

### Option 2: Heroku

1. **Install Heroku CLI and login:**
   \`\`\`bash
   heroku login
   \`\`\`

2. **Create Heroku app:**
   \`\`\`bash
   cd backend
   heroku create your-app-name
   \`\`\`

3. **Set environment variables:**
   \`\`\`bash
   heroku config:set NODE_ENV=production
   heroku config:set CLERK_PUBLISHABLE_KEY=your_key
   heroku config:set CLERK_SECRET_KEY=your_secret
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   \`\`\`

4. **Deploy:**
   \`\`\`bash
   git push heroku main
   \`\`\`

### Option 3: DigitalOcean App Platform

1. **Connect your GitHub repository**
2. **Configure build settings:**
   - Build command: `npm install`
   - Run command: `npm start`
3. **Set environment variables in the dashboard**

### Option 4: AWS EC2

1. **Launch EC2 instance (Ubuntu recommended)**
2. **Install Node.js and PM2:**
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   \`\`\`

3. **Clone and setup your project:**
   \`\`\`bash
   git clone your-repo-url
   cd aws-prep-platform/backend
   npm install --production
   \`\`\`

4. **Create ecosystem file for PM2:**
   \`\`\`javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'aws-prep-backend',
       script: 'server.js',
       env: {
         NODE_ENV: 'production',
         PORT: 5000,
         CLERK_PUBLISHABLE_KEY: 'your_key',
         CLERK_SECRET_KEY: 'your_secret',
         FRONTEND_URL: 'https://your-frontend-domain.com'
       }
     }]
   }
   \`\`\`

5. **Start with PM2:**
   \`\`\`bash
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   \`\`\`

6. **Configure Nginx as reverse proxy:**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## 🔒 Environment Variables

### Frontend Environment Variables
\`\`\`env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENV=production
\`\`\`

### Backend Environment Variables
\`\`\`env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
\`\`\`

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Test application locally
- [ ] Update Clerk keys for production
- [ ] Set correct API URLs
- [ ] Test authentication flow
- [ ] Verify all JSON data files are included
- [ ] Run production build locally

### Post-deployment
- [ ] Test all pages load correctly
- [ ] Verify authentication works
- [ ] Test API endpoints
- [ ] Check mobile responsiveness
- [ ] Test question loading and submission
- [ ] Verify progress tracking
- [ ] Set up monitoring/logging
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate

## 📊 Monitoring & Maintenance

### Recommended Monitoring Tools
- **Frontend**: Vercel Analytics, Google Analytics
- **Backend**: Railway Metrics, Heroku Metrics, or custom logging
- **Uptime**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry

### Regular Maintenance
- Monitor application performance
- Update dependencies regularly
- Backup question data
- Review and rotate API keys
- Monitor user feedback and issues

## 🔧 CI/CD Pipeline (Optional)

### GitHub Actions Example

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm install
          npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: ${{ secrets.RAILWAY_SERVICE }}
\`\`\`

## 🆘 Troubleshooting Deployment Issues

### Common Deployment Problems

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Check for environment-specific code

2. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable naming (REACT_APP_ prefix for frontend)
   - Verify no spaces or special characters in values

3. **CORS Errors**
   - Update FRONTEND_URL in backend environment
   - Check Clerk domain settings
   - Verify API URL in frontend environment

4. **Authentication Issues**
   - Update Clerk keys for production environment
   - Check Clerk domain configuration
   - Verify redirect URLs in Clerk dashboard

5. **API Connection Issues**
   - Ensure backend is deployed and accessible
   - Check API URL configuration
   - Verify network/firewall settings

### Getting Help

If you encounter issues during deployment:

1. Check deployment logs for specific error messages
2. Verify all environment variables are correctly set
3. Test the application locally with production environment variables
4. Check the hosting provider's documentation
5. Review this guide for missed steps

---

**Successful deployment brings your AWS prep platform to users worldwide! 🌍**
