import numpy as np
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "mrm8488/bert-tiny-finetuned-sms-spam-detection"
classifier = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

def classifySpam(text):
    input = tokenizer(text, return_tensors='pt', padding=True)

    output = classifier(**input)

    with torch.no_grad():
        logits = classifier(**input).logits

    def sigmoid(logit):
        return 1 / (1 + np.exp(-logit))

    prediction = output.logits.argmax().item()
    
    probabilities = sigmoid(logits[0]).tolist()
    
    return { "prediction": "HAM" if prediction == 0 else "SPAM", "score": probabilities[prediction]} # 0 => HAM, 1 => SPAM