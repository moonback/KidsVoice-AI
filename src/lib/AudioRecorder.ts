import { IAudioRecorder } from "./AudioService";

export class AudioRecorder implements IAudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private workletNode: AudioWorkletNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  async start(
    onAudioData: (base64Data: string) => void,
    onAudioLevel?: (level: number) => void,
  ) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.audioContext = new AudioContext({ sampleRate: 16000 });
      this.source = this.audioContext.createMediaStreamSource(this.stream);

      await this.audioContext.audioWorklet.addModule("/audio-recorder-processor.js");
      this.workletNode = new AudioWorkletNode(this.audioContext, "audio-recorder-processor");

      this.workletNode.port.onmessage = (event: MessageEvent<Float32Array>) => {
        const inputData = event.data;
        if (!inputData || inputData.length === 0) return;

        if (onAudioLevel) {
          let sum = 0;
          for (let i = 0; i < inputData.length; i++) {
            sum += inputData[i] * inputData[i];
          }
          const rms = Math.sqrt(sum / inputData.length);
          const level = Number.isFinite(rms) ? Math.min(1, Math.max(0, rms * 3)) : 0;
          onAudioLevel(level);
        }

        const pcm16 = this.floatTo16BitPCM(inputData);
        const base64 = this.arrayBufferToBase64(pcm16.buffer);
        onAudioData(base64);
      };

      this.source.connect(this.workletNode);
      this.workletNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Error starting audio recording:", error);
      throw error;
    }
  }

  stop() {
    if (this.workletNode) {
      this.workletNode.disconnect();
      this.workletNode.port.onmessage = null;
      this.workletNode = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  private floatTo16BitPCM(float32Array: Float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return new Int16Array(buffer);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
