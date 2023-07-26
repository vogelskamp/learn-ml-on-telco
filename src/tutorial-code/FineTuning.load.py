from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "nlptown/bert-base-multilingual-uncased-sentiment"

model = AutoModelForSequenceClassification.from_pretrained(r".\test_trainer\checkpoint-4000")
tokenizer = AutoTokenizer.from_pretrained(model_name)

input_text = "Jackpot! Text your CC information to claim our biggest prize pool ever!"

input = tokenizer(input_text, return_tensors='pt', padding=True)

output = model(**input)

predicted_class = output.logits.argmax().item() # 1 --> SPAM