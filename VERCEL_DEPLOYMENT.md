# Vercel Deployment Guide

This project is configured to be deployed on Vercel. Follow these steps to deploy:

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A PostgreSQL database (recommended options: Vercel Postgres, Neon, Supabase, or Railway)

## Environment Variables

Set up the following environment variables in your Vercel project:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: A random string for NextAuth.js security (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: This will be automatically set to your deployment URL by Vercel

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in the Vercel dashboard
3. Deploy your project

## Important Notes

- The deployment will automatically run `prisma generate` before the build process
- After the first deployment, you need to run the database migrations manually:
  - Use Vercel CLI and run: `vercel env pull && npx prisma migrate deploy`
  - Or set up the project locally with the production database URL and run: `npx prisma migrate deploy`
- For future database schema changes, create migrations locally and deploy them to production

## Local Development

To develop locally with a setup matching production:

1. Create a `.env` file with your PostgreSQL database URL
2. Run `npx prisma migrate dev` to create the database tables
3. Run `npm run dev` to start the development server 