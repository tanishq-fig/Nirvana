'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { io } from 'socket.io-client';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Load recent messages
    loadMessages();

    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
      newSocket.emit('user_connected', user.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    });

    newSocket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('user_joined', (data) => {
      console.log('User joined:', data.username);
    });

    newSocket.on('user_left', (data) => {
      console.log('User left');
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/messages`, {
        withCredentials: true
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !socket || !isConnected) return;

    socket.emit('send_message', {
      userId: user.id,
      message: inputMessage.trim(),
    });

    setInputMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-gothic text-gothic-blood dark:text-gothic-blood light:text-gothic-gold glow-effect">
              Guild Chat
            </h1>
            <p className="text-gray-400 dark:text-gray-400 light:text-gothic-warm-grey mt-2">
              {isConnected ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Disconnected
                </span>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl border-2 border-gothic-crimson dark:border-gothic-crimson light:border-gothic-gold overflow-hidden flex flex-col"
        style={{ height: 'calc(100vh - 12rem)' }}
      >
        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-1 bg-black bg-opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        >
          <AnimatePresence>
            {messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const isGrouped = prevMsg && prevMsg.username === msg.username;
              return (
                <MessageBubble 
                  key={msg._id || index} 
                  message={msg} 
                  currentUser={user}
                  isGrouped={isGrouped}
                />
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-3 border-t border-gray-800 bg-gray-900 bg-opacity-50">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="flex-1 px-4 py-2.5 rounded-full bg-gray-800 bg-opacity-60 border border-gray-700 focus:outline-none focus:border-red-800 transition-all duration-300 text-white placeholder-gray-400 disabled:opacity-50 text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!isConnected || !inputMessage.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-red-900 to-red-800 text-white font-medium rounded-full hover:from-red-800 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-sm uppercase tracking-wide"
            >
              Send
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function MessageBubble({ message, currentUser, isGrouped }) {
  const isOwnMessage = message.username === currentUser?.username;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex gap-2 ${isGrouped ? 'mb-0.5' : 'mb-2 mt-3'} ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar - only show for other users on the left and not grouped */}
      {!isOwnMessage && (
        <div className="flex-shrink-0 self-end" style={{ width: '32px' }}>
          {!isGrouped ? (
            <div className="w-8 h-8 rounded-full border border-gothic-crimson overflow-hidden bg-gothic-dark">
              {message.profilePicture && message.profilePicture !== '/uploads/default-avatar.png' ? (
                <img
                  src={`${API_URL}${message.profilePicture}`}
                  alt={message.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg></div>';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Message Bubble */}
      <div className={`flex flex-col max-w-xs ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {/* Username and role - only show if not grouped */}
        {!isOwnMessage && !isGrouped && (
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="font-medium text-xs text-gothic-blood">
              {message.username}
            </span>
            <span className={`role-badge role-${message.role} text-[10px] px-1.5 py-0.5 rounded`}>
              {message.role}
            </span>
          </div>
        )}
        
        {/* Message content */}
        <div
          className={`px-3 py-2 rounded-lg shadow-lg ${
            isOwnMessage
              ? 'bg-gradient-to-br from-red-900 to-red-800 text-white rounded-br-none'
              : 'bg-gray-800 bg-opacity-90 text-gray-100 rounded-bl-none'
          }`}
        >
          <p className="text-sm break-words">{message.message}</p>
          <p className={`text-[10px] mt-1 ${isOwnMessage ? 'text-gray-300' : 'text-gray-400'}`}>
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
