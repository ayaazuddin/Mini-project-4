# SummarEase - AI Summarization and Accessibility Tool

SummarEase is an AI-powered tool designed for summarizing and organizing notes, with text-to-speech functionality. The application supports multiple languages and offers an accessible user interface for individuals with specific needs.

This README provides step-by-step instructions on how to run both the frontend and backend parts of the project, install the necessary requirements, and create the appropriate environment.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Project](#running-the-project)
5. [Environment Configuration](#environment-configuration)

---

## Prerequisites

Before running the project, ensure you have the following software installed on your machine:
- **Node.js** (v14 or later)
- **Python 3.x** (for the backend)
- **pip** (Python package manager)

Make sure to install all required dependencies in both frontend and backend.

---

## Backend Setup

### 1. Clone the repository
Clone the repository to your local machine:
```bash
cd backend
```

### 2. Set up a Python virtual environment
It is recommended to use a virtual environment to avoid conflicts with other Python packages:
```bash
python3 -m venv venv
```

Activate the virtual environment:
- On Windows:
  ```bash
  venv\Scripts\activate
  ```
- On macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

### 3. Install dependencies
Install the required Python packages using `pip`:
```bash
pip install -r requirements.txt
```

### 4. Run the backend server
Make sure to run the Flask backend:
```bash
python app.py
```
By default, the server will run on `http://127.0.0.1:5000`.

---

## Frontend Setup

### 1. Go into frontend folder
```bash
cd summarEase/frontend
```

### 2. Install Node.js dependencies
Navigate to the frontend directory and install the required Node.js dependencies:
```bash
npm install
```

### 3. Run the frontend development server
Start the React development server:
```bash
npm start
```
The React application will be available at `http://localhost:3000`.

---

## Running the Project

Ensure both the backend and frontend servers are running:

1. **Backend** should be running at `http://127.0.0.1:5000`.
2. **Frontend** should be running at `http://localhost:3000`.

You can access the application by opening `http://localhost:3000` in your browser. The frontend will communicate with the backend via API calls.

---

