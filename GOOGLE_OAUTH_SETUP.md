# Google OAuth Setup Guide

## 🔧 **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Wait for it to be ready (2-3 minutes)

## 🔧 **Step 2: Get Supabase Credentials**

1. In your Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 🔧 **Step 3: Set Environment Variables**

Create a file called `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

## 🔧 **Step 4: Create Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client IDs**
5. Set **Application type** to "Web application"
6. Add **Authorized redirect URIs**:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
   (Replace `your-project-id` with your actual Supabase project ID)
7. Copy the **Client ID** and **Client Secret**

## 🔧 **Step 5: Configure Supabase Google Provider**

1. Go back to your Supabase dashboard
2. Navigate to **Authentication → Providers**
3. Find **Google** and click **Enable**
4. Add your Google credentials:
   - **Client ID**: From Step 4
   - **Client Secret**: From Step 4
5. Click **Save**

## 🔧 **Step 6: Test the Setup**

1. Restart your development server: `npm run dev`
2. Check your navigation bar - you should see:
   - ✅ SUPABASE_URL: ✅
   - ✅ SUPABASE_ANON_KEY: ✅
   - ✅ Supabase connection working
3. Click "Sign in with Google"
4. You should be redirected to Google (not 404)

## 🐛 **Common Issues**

### **Issue: Still getting "No code received"**

- Check that your Google redirect URI exactly matches: `https://your-project-id.supabase.co/auth/v1/callback`
- Make sure you copied the Client ID and Secret correctly
- Verify Google OAuth is enabled in Supabase

### **Issue: Environment variables not loading**

- Make sure `.env.local` is in your project root (same folder as `package.json`)
- Restart your development server after adding environment variables

### **Issue: Supabase connection failing**

- Check that your project URL and anon key are correct
- Make sure your Supabase project is active (not paused)
