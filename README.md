# team-pumpkin-assignment

## Deployed frontend and backend
### Frontend: https://team-pumpkin-assignment.vercel.app/
### Backend: https://team-pumpkin-assignment.onrender.com

## Note
### In case the deployed url didn't work well go with the below instructions to local setup.

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Abhaysingh77/team-pumpkin-assignment.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd team-pumpkin-assignment
    ```

3. **Navigate to backend and frontend directory separately**:
    ```sh
    cd frontend
    cd backend
    ```

4. **Install dependencies separately**:
    ```sh
    npm install
    ```

5. **Run the frontedn and backend both**:
    ```sh
    npm run dev
    ```


## Folder structure

📦 chat-app  
├── 📂 backend  
│   ├── 📂 config             # Configuration files (e.g., database)  
│   ├── 📂 controllers        # API request handlers  
│   ├── 📂 models             # Database models (User, Chat, Message)  
│   ├── 📂 routes             # Express routes for API endpoints  
│   ├── 📂 middleware         # Authentication, validation, and other middleware   
│   ├── 📂 sockets            # Socket.io event handlers  
│   ├── 📜 index.js           # Main entry point for the backend  
│   ├── 📜 package.json       # Backend dependencies  
│   ├── 📜 .env               # Environment variables
│   ├── 📜 .env.example       # Environment variables example for pushing over github
│   ├── 📜 package.json       # Backend dependencies  

├── 📂 frontend  
│   ├── 📂 public             # Static assets (favicons, images, etc.)  
│   ├── 📂 src  
│   │   ├── 📂 components     # Reusable UI components  
│   │   ├── 📂 pages          # Application pages (Login, Chat, etc.)  
│   │   ├── 📂 services       # API calls (Axios requests)  
│   │   ├── 📂 utils          # Utility functions   
│   │   ├── 📜 App.js         # Main application component  
│   │   ├── 📜 main.jsx       # React entry file (if using Vite)  
│   │   ├── 📜 index.js       # React entry file (if using CRA)  
│   │   ├── 📜 package.json   # Frontend dependencies   
│   ├── 📜 vite.config.js     # Vite configuration (if using Vite)  

├── 📜 README.md              # Main project documentation  


