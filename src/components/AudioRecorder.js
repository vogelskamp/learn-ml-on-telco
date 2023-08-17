import { useRef, useState } from "react";
import RecordRTC from "recordrtc";
import { MIC_ICON } from "../graphics";
import Button from "./Button";

const mimeType = "audio/wav";

function AudioRecorder({ onFinishRecording }) {
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);

  const startRecording = async () => {
    const _stream = await getMicrophonePermission();
    setStream(_stream);

    const media = new RecordRTC(_stream, {
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
    });

    mediaRecorder.current = media;
    mediaRecorder.current.startRecording();

    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    //stops the recording instance
    mediaRecorder.current.stopRecording(async function () {
      const blob = mediaRecorder.current.getBlob();

      const audioFile = new File([blob], "recording.wav", {
        type: mimeType,
      });
      await onFinishRecording(audioFile);
    });

    stream.getTracks().forEach((track) => track.stop());
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        return streamData;
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  return isRecording ? (
    <Button text="stop" icon={MIC_ICON} onClick={stopRecording} />
  ) : (
    <Button text="aufnehmen" icon={MIC_ICON} onClick={startRecording} />
  );
}

export default AudioRecorder;
