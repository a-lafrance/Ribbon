# Ribbon
Every group chat has an origin story.

## Overview

Ribbon uses Facebook Messenger chat data in order to analyze your group chat's conversations to create a "Spotify Wrapped"-esque profile of your group. By analyzing your individual and collective texting habits, Ribbon calculates cumulative statistics about your group's conversations as a whole, and assigns "roles" to each member of the group signifying their conversational "niche". Every group chat has an origin story, and Ribbon helps you discover yours.

## Using Ribbon

Ribbon is [live](http://ribbon-web.s3-website-us-west-1.amazonaws.com/); travel to that link and follow the instructions on the page to view a profile of your friend group.

## Installation & Local Use

To install & run Ribbon locally, clone this repository into a place you're comfortable keeping it.

To run a local instance of the frontend web app:
* Run `cd frontend` from the root project directory
* Run `npm install` to install dependencies
* Run `npm start` to start the build process; you'll be redirected to the local site shortly.

Note that this will connect to the live production API. To connect to a local instance of the API (provided you're running it), assign `apiUrl = apiUrlDev` on line 4 of `src/analytics/api.js`.

To run a local instance of the backend API:
* Run `cd api` from the root project directory
* Run `python3 -m venv venv` to create a Python virtual environment
* Run `. venv/bin/activate` to activate the virtual environment
* Run `pip install -r requirements.txt` to install Python dependencies
* Finally, run `./runserver` to start an instance of the server at `127.0.0.1:800`
