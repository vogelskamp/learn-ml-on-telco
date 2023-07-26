import evaluate
import numpy as np
from datasets import load_dataset
from transformers import AutoModelForSequenceClassification, AutoTokenizer

def tokenize_function(examples):
    return tokenizer(examples["sms"], padding="max_length", truncation=True)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

model_name = "nlptown/bert-base-multilingual-uncased-sentiment"

model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2, ignore_mismatched_sizes=True)
tokenizer = AutoTokenizer.from_pretrained(model_name)

dataset = load_dataset("sms_spam")
tokenized_datasets = dataset.map(tokenize_function, batched=True)

# dataset only has "train" so we need to split into train/test
split_dataset = tokenized_datasets["train"].train_test_split(test_size=0.2)

from transformers import TrainingArguments

metric = evaluate.load("accuracy")

training_args = TrainingArguments(output_dir="test_trainer", evaluation_strategy="epoch", per_device_train_batch_size=3)

from transformers import Trainer

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=split_dataset["train"],
    eval_dataset=split_dataset["test"],
    compute_metrics=compute_metrics
)

trainer.train()