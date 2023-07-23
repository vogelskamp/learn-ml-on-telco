from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "mrm8488/bert-tiny-finetuned-sms-spam-detection"
classifier = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

input = tokenizer("Win a free Tesla today! Text 0800-123456789", return_tensors='pt', padding=True)

output = classifier(**input)

predicted_class = output.logits.argmax().item() # 0 => HAM, 1 => SPAM