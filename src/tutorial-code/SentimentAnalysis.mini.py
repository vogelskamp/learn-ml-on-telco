from transformers import pipeline

classifier = pipeline("sentiment-analysis")

results = classifier("Du stinkst!")

print(results) # [{'label': 'NEGATIVE', 'score': 0.9979466795921326}]