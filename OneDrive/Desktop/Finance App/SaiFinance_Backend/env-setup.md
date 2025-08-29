# Environment Variables Setup

You need to create a `.env` file in the root directory of your backend project with the following variables:

## Required Environment Variables

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/saifinance

# JWT Secret
ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3001
NODE_ENV=development

# Salt Rounds for Password Hashing
SALT_ROUNDS=10

# Email Configuration (if needed)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Redis Configuration (if using Bull queue)
REDIS_URL=redis://localhost:6379
```

## Steps to Setup:

1. **Create `.env` file** in the root directory of `SaiFinance_Backend`
2. **Copy the above content** into the `.env` file
3. **Update the values** according to your setup:
   - `MONGO_URL`: Your MongoDB connection string
   - `ACCESS_TOKEN_SECRET`: A secure random string for JWT signing
   - `EMAIL_USER` and `EMAIL_PASS`: Your email credentials (if using email features)

## MongoDB Setup Options:

### Option 1: Local MongoDB
If you have MongoDB installed locally:
```env
MONGO_URL=mongodb://localhost:27017/saifinance
```

### Option 2: MongoDB Atlas (Cloud)
If you're using MongoDB Atlas:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/saifinance
```

### Option 3: Docker MongoDB
If you're using Docker:
```env
MONGO_URL=mongodb://localhost:27017/saifinance
```

## After Setup:

1. Save the `.env` file
2. Restart your backend server
3. The server should now connect to MongoDB successfully
