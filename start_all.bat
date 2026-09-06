@echo off
echo ========================================================
echo Memulai HomeValuer AI (FastAPI Backend + React Frontend)
echo ========================================================
start "FastAPI Backend (Port 8000)" cmd /k ".\.venv\Scripts\python.exe backend\run.py"
timeout /t 2 /nobreak >nul
start "React Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"
echo Aplikasi sedang dibuka...
timeout /t 3 /nobreak >nul
start http://localhost:5173
