from transformers import pipeline

classifier = pipeline("sentiment-analysis")

def getEmoji(result):

    if result["label"] == 'NEGATIVE':
        return '😡'
    elif result["label"] == 'NEUTRAL':
        return '😐'
    else:
        return '😊'


def getSentiment(text):
    results = classifier(text) # [{'label': 'NEGATIVE', 'score': 0.9979466795921326}]

    result = results[0]

    return {"emoji": getEmoji(result), "score": result["score"]}