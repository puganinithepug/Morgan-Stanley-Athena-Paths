# TEAM 9 – CodeToGive 2025
## Shield of Athena

This repository contains the frontend (React + TailwindCSS) and the backend (FastAPI) for the Athena Paths project.  
The backend uses CSV files as its data source.

---

### Frontend Setup

To run the frontend:
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

Install dependencies:
```bash
cd client/backend
pip install -r requirements.txt
```

Run backend server
```bash
cd client/backend
python -m uvicorn main:app --reload
```

The API server will start at:
```bash
http://localhost:8000
```
