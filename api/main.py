from flask import Flask, request

app = Flask(__name__)

@app.route("/new-image")
def new_image(): #function definition
    word = request.args.get("query")
    return {"word": word}

#decorator is used for a view in an URL
#executed each time client executes the URL

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050) #if condition is true we run app in all ip addresses of the PC, run flask app directly in the module
