import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function SupportWall() {
  const { language } = useLanguage();
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const messages = dataService.getMessages(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim().length === 0) {
      alert('Please enter a message');
      return;
    }

    if (message.length > 250) {
      alert('Maximum 250 characters');
      return;
    }

    dataService.createMessage({
      display_name: displayName.trim() || 'Anonymous',
      message: message.trim(),
      language
    });

    setDisplayName('');
    setMessage('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 mb-6">
            <Heart className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hope Wall</h1>
          <p className="text-gray-600 text-lg mb-4">
            Leave a short, anonymous message of encouragement for women and children rebuilding their lives.
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Thank you for your message of support</span>
            </div>
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              Share Your Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (optional)
                </label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Anonymous"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a few words of hope and support..."
                  maxLength={250}
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {message.length}/250
                </div>
              </div>

              <Button
                type="submit"
                disabled={message.trim().length === 0}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Share Your Support
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages of Hope</h2>

          {messages.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No messages yet. Be the first to share your support!</p>
              </CardContent>
            </Card>
          ) : (
            messages.map((msg) => (
              <Card key={msg.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full p-3 flex-shrink-0">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{msg.display_name}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(msg.created_date), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

