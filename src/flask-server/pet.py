import numpy as np
import torch
from datasets import load_dataset
from PIL import Image
from transformers import AutoImageProcessor, ViTForImageClassification

base_model = "google/vit-base-patch16-224-in21k"
model_name = "nateraw/vit-base-cats-vs-dogs"
processor = AutoImageProcessor.from_pretrained(base_model)
model = ViTForImageClassification.from_pretrained(model_name)

def classifyImage(image):

    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    def sigmoid(logit):
        return 1 / (1 + np.exp(-logit))

    probabilities = sigmoid(logits[0]).tolist()

    return { "cat": probabilities[0], "dog": probabilities[1]}