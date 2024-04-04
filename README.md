# Convoz
Convoz is a fully-featured social media web application, built with the MERN stack and Tailwind CSS.  

## Features
- Create, Read, Update and Delete Posts (Done)
- Like and Unlike Posts
- Create, Read, Update, and Delete Comments (Done)
- Auth using JWT (Done)
- Realtime Messaging (Done)
- View Profiles and browse their Posts (Done), liked posts, and comments(Done).
- Random Avatar for each user (Done)
- Load More (Done)
- Sort Posts based on attributes such as Most liked, Most comments, Date Created (Oldest or Newest) (Done)
- Profanity Filtering in posts(Done) and comments
- Client Side Rate Limiting using use-cooldown
- Search Posts by title (Done)
- Search Users by username (Done)
- Find Others area on the home screen which features random users (Done)
- Page not found page (Done)
## Installation and usage
1) Clone this repository  
```
git clone https://github.com/adesai1000/Convoz.git
```
2) Install dependencies  
```
cd server
npm install
cd client
npm install
```
3) Create .env in root directory
```
cd ..
touch .env
```
4) Configure environment variables in your new .env file. To acquire your MONGO_URI, create a cluster for free over at https://www.mongodb.com/.
5) Generate a random JWT secret, Run this script in the terminal:
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
```
MONGO_URI=<YOUR_MONGO_URI> 
JWT_TOKEN=<YOUR_TOKEN_KEY>
```
5) Run the server
```
npm run server
```
6) Start a new terminal and run React's development server with Vite.
```
cd server
npm start
cd client
npm start
```
