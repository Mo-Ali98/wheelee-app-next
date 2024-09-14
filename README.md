  <h1 align="center">Wheelee Ad</h1>

## Clone and run locally

1. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in your Supabase project's API settings

2. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   Should now be running on [localhost:3000](http://localhost:3000/).
