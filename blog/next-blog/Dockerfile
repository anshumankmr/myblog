# Dockerfile for Next.js application

# 1. Base image
FROM node:18-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
# First, copy over package.json and package-lock.json (or yarn.lock)
# This takes advantage of Docker layer caching
COPY package*.json ./
# Install dependencies based on the lock file
RUN npm ci

# 4. Copy application code
# Copy the rest of the application code
COPY . .

# 5. Build the Next.js application
# Set NODE_ENV to production for build
ENV NODE_ENV production
RUN npm run build

# 6. Production image
# Use a smaller image for the production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built assets and necessary files from the builder stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public # If you have static assets in public
COPY --from=base /app/package*.json ./
# We need node_modules for runtime (or you can bundle them with the build if using standalone output)
COPY --from=base /app/node_modules ./node_modules 

# If using Next.js standalone output (recommended for smaller images)
# Ensure your next.config.js has output: 'standalone'
# Then, instead of copying .next, public, package.json, node_modules individually:
# COPY --from=base /app/.next/standalone ./ 
# COPY --from=base /app/.next/static ./.next/static # static assets for standalone
# COPY --from=base /app/public ./public # If public assets are not handled by standalone output

# Expose the port the app runs on
EXPOSE 3000

# Environment variable for Next.js port (Cloud Run sets PORT automatically)
ENV PORT 3000 
ENV NODE_ENV production

# Start the Next.js application
# The default start script in Next.js package.json is usually "next start"
CMD ["npm", "start"]
