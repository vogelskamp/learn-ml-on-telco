from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "mrm8488/bert-tiny-finetuned-sms-spam-detection"
classifier = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

def classifySpam(text):
    input = tokenizer(text, return_tensors='pt', padding=True)

    output = classifier(**input)

    return "HAM" if output.logits.argmax().item() == 0 else "SPAM" # 0 => HAM, 1 => SPAM