# Convoz
Convoz is a full-fledged social media web application, built with the MERN stack and Tailwind CSS.  


https://github.com/user-attachments/assets/d9768cc9-605e-4d72-be3b-b34b1ef484aa


## Features
- Create, Read, Update, and Delete Posts
- Like and Unlike Posts
- Create, Read, Update, and Delete Comments
- Auth using JWT
- Realtime Messaging
- View Profiles and browse their Posts and comments
- Random Avatar for each user
- Load More Pagination
- Sort Posts based on attributes such as Most liked, Most comments, and Date Created (Oldest or Newest)
- Profanity Filtering in posts and comments
- Search Posts by title
- Search Users by username
- Find Others area on the home screen which features random users
- 404 Page not found error page
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
3) Create .env in the root directory
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
