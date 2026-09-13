# Supabase Setup for Dizanda Frontend

This guide helps you connect the frontend to Supabase and create the starter ecommerce tables.

## 1. Create a Supabase project

1. Go to `https://app.supabase.com/`
2. Create a new project and choose a strong database password.
3. Wait for the project to finish provisioning.

## 2. Get Supabase keys

1. In the Supabase dashboard, open `Settings > API`.
2. Copy the `Project URL`.
3. Copy the `anon public` API key.

## 3. Add your env variables

In your project root, create a `.env` file with:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> Do not commit `.env` to source control.

## 4. Confirm the Supabase client file

The app should already have `src/lib/supabaseClient.js`:

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 5. Create database tables

Open `SQL Editor` in Supabase and run the SQL in `supabase-schema.sql`.

## 6. Set auth redirect URL

In Supabase dashboard:
- Go to `Authentication > Settings`
- Set `Site URL` to `http://localhost:5173`
- Set `Redirect URLs` to `http://localhost:5173`

## 7. Run the app

```bash
npm run dev
```

Then visit:
- `http://localhost:5173/signup`
- `http://localhost:5173/login`

## 8. Enable Google and Facebook sign-in

The Login and Signup pages include "Continue with Google" and "Continue with Facebook" buttons powered by `supabase.auth.signInWithOAuth`. Each provider must be enabled and configured in Supabase before the buttons will work.

### Google

1. In [Google Cloud Console](https://console.cloud.google.com/), create (or reuse) a project, then go to `APIs & Services > Credentials`.
2. Create an `OAuth client ID` of type `Web application`.
3. In Supabase, go to `Authentication > Providers > Google` to find the exact `Redirect URI` Supabase expects (looks like `https://<project-ref>.supabase.co/auth/v1/callback`) and add it under `Authorized redirect URIs` in Google Cloud Console.
4. Copy the generated `Client ID` and `Client Secret` into the Google provider settings in Supabase and enable it.

### Facebook

1. In [Facebook for Developers](https://developers.facebook.com/), create an app with the `Facebook Login` product added.
2. In Supabase, go to `Authentication > Providers > Facebook` to find the `Redirect URI` and add it under `Valid OAuth Redirect URIs` in the Facebook app's Login settings.
3. Copy the `App ID` and `App Secret` into the Facebook provider settings in Supabase and enable it.

### Redirect URLs

Make sure both `http://localhost:5173` (dev) and your production domain are listed under `Authentication > URL Configuration > Redirect URLs` in Supabase, since the app redirects back to `window.location.origin` after a successful login.

## 9. What to do after

- Add product list pages
- Add cart functionality
- Add order creation and checkout
- Secure tables with Row Level Security when you are ready
