import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const GuestLiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [accessCode, setAccessCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const socket = io('http://localhost:3001');
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    socket.on('broadcaster', () => {
      socket.emit('watcher');
      console.log("got here");
    });

    socket.on('disconnectPeer', () => {
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
  };

  const handleAccessCodeSubmit = () => {
    socket.emit('validateAccessCode', accessCode, (isValid: boolean) => {
      setIsValidCode(isValid);
      if (isValid) {
        socket.emit('watcher');
        console.log("valid");

        socket.on('offer', async (id: string, description: RTCSessionDescriptionInit) => {
          const pc = new RTCPeerConnection();
          peerConnection.current = pc;
          if (videoRef.current) {
            pc.ontrack = (event) => {
              if (videoRef.current) {
                videoRef.current.srcObject = event.streams[0];
              }
            };
          }
          await pc.setRemoteDescription(description);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit('answer', id, pc.localDescription);
        });

        socket.on('candidate', (id: string, candidate: RTCIceCandidateInit) => {
          if (peerConnection.current) {
            console.log("123");
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
          }
        });
      }
    });
  };

  return (
    <div>
      <h2>Guest Live Stream</h2>
      <video ref={videoRef} autoPlay playsInline />
      {!isValidCode && (
        <div>
          <input
            type="text"
            value={accessCode}
            onChange={handleAccessCodeChange}
            placeholder="Enter access code"
          />
          <button onClick={handleAccessCodeSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default GuestLiveStream;