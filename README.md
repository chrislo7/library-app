# Library App 

A basic library application built with Django as the backend server and React as the frontend framework.
SQLite is used to store data.

## Requirements

- Data stored on SQLite3.
- Minimal CSS added to better navigate through the site.
- Backend serves data through a single API endpoint.
- Must list all books in inventory (by default)
- Allow searching of books by title
- Allow reservation of books
- View books currently reserved

## Instructions:

Initial Setup:
- Download & Install Python 3: `https://www.python.org/downloads/`
- pip3 should come installed with Python 3. Ensure it is installed via `pip3 --version`

Backend Setup:
1. `cd backend`
2. Install Django: `pip3 install django`
3. Install required modules: `pip3 install djangorestframework django-cors-headers django-filter`
4. Create superuser account to access the admin interface: `python3 manage.py createsuperuser`
5. Run migration: `python3 manage.py migrate`
6. Run fixture: `python3 manage.py loaddata library/fixtures/library-data-source.json`
7. Run server: `python3 manage.py runserver`
8. You can verify backend server is running by logging into: `localhost:8000/admin` with your superuser account.

Frontend Setup
In a seperate terminal tab, run the following commands
1. `cd frontend`
2. Install required modules: `npm install`
3. Start frontend app: `npm start`
4. Frontend is served on `localhost:3000`
