import io

import librosa
import soundfile as sf
from transformers import WhisperForConditionalGeneration, WhisperProcessor

TARGET_SR = 16000

processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
model.config.forced_decoder_ids = processor.get_decoder_prompt_ids(
    language="german", task="transcribe")

def getTranscription(file):
    tmp = io.BytesIO(file.read())
    tmp.name = file.filename

    data, sr = sf.read(tmp)

    if sr != TARGET_SR:
        data = librosa.resample(y=data, orig_sr=sr, target_sr=TARGET_SR)

    input_features = processor(
        data, sampling_rate=TARGET_SR, return_tensors="pt").input_features

    predicted_ids = model.generate(input_features)

    return processor.batch_decode(predicted_ids, skip_special_tokens=True)