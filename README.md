# Library App 
A very basic todo application built with Django as backend server and React as the frontend framework.

## Instructions:

Basic Requirement Setup:
- Download & Install Python 3: `https://www.python.org/downloads/`
- pip3 should come installed with Python 3. Ensure it is installed via `pip3 --version`

Backend Setup:
1. `cd backend`
2. Install Django: `pip3 install django`
3. Install required modules: `pip3 install djangorestframework django-cors-headers`
4. Create superuser account to access the admin interface: `python3 manage.py createsuperuser`
5. Run migration: `python3 manage.py migrate`
6. Run fixture: `python3 manage.py loaddata library/fixtures/library-data-source.json`
7. Run server: `python3 manage.py runserver`
8. Verify backend server is running by logging into: `localhost:8000/admin` with your superuser account.