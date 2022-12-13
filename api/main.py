from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello(): #function definition
    return "Hello, World!" #returns text

#decorator is used for a view in an URL
#executed each time client executes the URL

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050) #if condition is true we run app in all ip addresses of the PC, run flask app directly in the module
