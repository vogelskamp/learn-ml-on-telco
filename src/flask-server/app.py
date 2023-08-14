from flask import Flask, Response, request
from flask_cors import CORS
from pet import classifyImage
from PIL import Image
from sentiment import getSentiment
from spam import classifySpam
from transcribe import getTranscription

app = Flask(__name__)

CORS(app)

@app.route("/sentiment/<text>")
def getSentimentAnalysis(text):
    return getSentiment(text)

@app.route("/spam/<text>")
def classifySpam(text):
    return classifySpam(text)

@app.route("/transcribe")
def transcribeAudio():
    print(request)
    if len(request.files) != 1:
        raise Exception("Invalid request", "request.files was empty")
    
    return getTranscription(request.files[0])

@app.route("/classify", methods=["POST"])
def classifyPet():
    print(request)
    if len(request.files) != 1:
        raise Exception("Invalid request", "request.files was empty")

    image = request.files['File']
    return classifyImage(Image.open(image).convert("RGB"))