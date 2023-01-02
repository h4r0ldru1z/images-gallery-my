import os
import requests
from flask import Flask, request
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL="https://api.unsplash.com/photos/random"
UNSPLASH_KEY=os.environ.get("UNSPLASH_KEY", "")
DEBUG=bool(os.environ.get("DEBUG",True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)

app.config["DEBUG"]= DEBUG

@app.route("/new-image") #single image and only get method
def new_image(): #function definition
    word = request.args.get("query") #we request a parameter from query
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    
    data = response.json()
    return data #flask sets content type to JSON

#decorator is used for a view in an URL
#executed each time client executes the URL

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050) #if condition is true we run app in all ip addresses of the PC, run flask app directly in the module
