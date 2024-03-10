import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const LiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStreamer, setIsStreamer] = useState(true); // Set to true for the streamer, false for viewers

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your server URL

    socket.on('newComment', (comment: string) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} autoPlay playsInline />
      {isStreamer && (
        <div>
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
  );
};

export default LiveStream;