import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from './Header';

const LiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStreamer, setIsStreamer] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const socket = io('http://localhost:3001');
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    socket.on('accessCode', (code: string) => {
      setAccessCode(code);
      console.log('Received Access Code:', code);
    });

    socket.on('watcher', (id: string) => {
      const pc = new RTCPeerConnection();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      }
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };
      pc.createOffer().then((sdp) => {
        pc.setLocalDescription(sdp).then(() => {
          socket.emit('offer', id, pc.localDescription);
        });
      });
    });

    socket.on('answer', (id: string, description: RTCSessionDescriptionInit) => {
      peerConnection.current?.setRemoteDescription(description);
    });

    socket.on('candidate', (id: string, candidate: RTCIceCandidateInit) => {
      peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.disconnect();
    };
  }, []);


const generateAccessCode = () => {
  console.log('Generating Access Code...');
  socket.emit('generateAccessCode');
};

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const endStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsStreaming(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
    }
  };

  return (
    <>
      <Header />
      <div>
        <h2>Live Stream</h2>
        <video ref={videoRef} autoPlay playsInline />
        {isStreamer && (
          <div>
          <button onClick={generateAccessCode}>Generate Access Code</button>
          {accessCode && <p>Access Code: {accessCode}</p>}
          {!isStreaming ? (
            <button onClick={startStream}>Start Stream</button>
          ) : (
            <button onClick={endStream}>End Stream</button>
          )}
        </div>
        )}
        <div>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter a comment"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LiveStream;