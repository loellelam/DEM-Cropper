@REM cd server
@REM ./setup.bat

@echo off

echo === Setting up Python environment ===
python -m venv venv
call venv\Scripts\activate

echo === Installing dependencies ===
pip install -r requirements.txt

echo === Starting Flask backend ===
python app.py

pause
