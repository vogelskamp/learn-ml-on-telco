from transformers import pipeline

classifier = pipeline(model="nlptown/bert-base-multilingual-uncased-sentiment")

def getEmoji(result):

    if result["label"] == '1 star':
        return 'sehr negativ 😡'
    elif result["label"] == '2 stars':
        return 'etwas negativ 😠'
    elif result["label"] == '3 stars':
        return 'neutral 😐'
    elif result["label"] == '4 stars':
        return 'etwas positiv 😃'
    else:
        return 'sehr positiv 😊'


def getSentiment(text):
    results = classifier(text)

    result = results[0]

    return {"emoji": getEmoji(result), "score": result["score"]}