# Blog Website

This is a fully functional blog website built using React and Vite, with Appwrite as the backend service. The project incorporates modern web technologies like Redux Toolkit, React Router, TinyMCE Editor, React Hook Form, HTML Parser, Tailwind CSS, and React Redux for a seamless development experience.

# Live Link : https://blog-website-react-app-write.vercel.app/  


## Features

- **React + Vite**: Fast development environment with Vite's instant server start and lightning-fast HMR.
- **Appwrite Backend**: Secure and scalable backend with Appwrite for user authentication, database, and storage.
- **Redux Toolkit**: Simplified state management with Redux Toolkit.
- **React Router**: Dynamic routing for navigating between different pages.
- **TinyMCE Editor**: Rich text editor for creating and editing blog posts.
- **React Hook Form**: Easy-to-use form management with validation.
- **HTML Parser**: Safely parse and display HTML content.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Redux**: Integrates React with Redux for managing application state.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- Appwrite instance (self-hosted or cloud)

### Installation

1. **Clone the repository**

   git clone https://github.com/Adeel-Haider-03/BlogWebsite-React-AppWrite.git  
   cd BlogWebsite-React-AppWrite  

2. **Install dependencies**

   npm install

3. **Configure the environment variables**

   Create a `.env` file in the root directory and add the following environment variables:  
   
VITE_APPWRITE_URL=""  
VITE_APPWRITE_PROJECT_ID=""  
VITE_APPWRITE_DATABASE_ID=""  
VITE_APPWRITE_COLLECTION_ID=""  
VITE_APPWRITE_BUCKET_ID=""  
VITE_TINYMCE_KEY=""  
 

5. **Start the development server**

   npm run dev  

   The website will be available at `http://localhost:3000`.  

## Usage

- **Creating Posts**: Use the TinyMCE Editor to create and edit blog posts.   
- **Form Handling**: Manage forms easily with React Hook Form.  
- **Routing**: Navigate between different pages using React Router.  
- **State Management**: Handle global state with Redux Toolkit.  

## Folder Structure  


├── public              # logos  
├── src  
│   ├── assets          # Image and other asset files  
│   ├── components      # Reusable components  
│   ├── pages           # Page components  
│   ├── appwrite        appwrite services  
│   ├── App.js          # Main app component  
│   └── index.js        # Entry point of the application  
├── tailwind.config.js  # Tailwind CSS configuration  
├── vite.config.js      # Vite configuration  
└── package.json        # Project metadata and dependencies  
