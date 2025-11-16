# TEAM 9 – CodeToGive 2025

## Shield of Athena

This repository contains the frontend (React + TailwindCSS) and the backend (FastAPI) for the Athena Paths project.
The backend uses CSV files as its data source.

---

### Frontend Setup

To run the frontend (from root):

```bash
cd client
npm install
npm start
```

The development server will start at:

```bash
http://localhost:3000
```

### Backend Setup

Install dependencies (from root):

```bash
cd backend
pip install -r requirements.txt
```

Run backend server (from root):

```bash
cd backend
python -m uvicorn main:app --reload
```

The API server will start at:

```bash
http://localhost:8000
```
