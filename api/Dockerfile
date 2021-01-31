FROM python:3.7

# Copy the Django project into the container
COPY ./ribbon_api /api
WORKDIR /api

# Install Python dependencies
RUN pip install -r requirements.txt

# Run Django setup
RUN python manage.py makemigrations
RUN python manage.py migrate

# Launch server
EXPOSE 8000
CMD ["gunicorn", "--env", "DJANGO_SETTINGS_MODULE=ribbon_api.settings", "ribbon_api.wsgi:application", "-b", ":8000"]
