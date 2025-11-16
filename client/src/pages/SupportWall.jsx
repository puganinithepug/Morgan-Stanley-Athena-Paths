import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Soft “sticky note” gradients for Padlet-style cards
const CARD_GRADIENTS = [
  'from-rose-50 to-pink-100',
  'from-amber-50 to-yellow-100',
  'from-blue-50 to-sky-100',
  'from-emerald-50 to-green-100',
  'from-violet-50 to-purple-100',
];

// Slight rotation variations so cards feel hand-placed
const CARD_ROTATIONS = ['-rotate-1', 'rotate-1', 'rotate-2', '-rotate-2', ''];

export default function SupportWall() {
  const { language } = useLanguage();
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const messages = dataService.getMessages(50);

  // ref so we can scroll to the messages section after submit
  const messagesSectionRef = useRef(null);

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
      language,
    });

    setDisplayName('');
    setMessage('');
    setShowSuccess(true);

    // Smoothly scroll to the messages so the user sees their note
    if (messagesSectionRef.current) {
      messagesSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-highlight/10 px-6 py-10 sm:px-10 shadow-sm">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-highlight/20 blur-3xl" />
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative text-center">
            <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-2xl bg-white/70 p-3 shadow-sm">
              <Heart className="h-9 w-9 text-highlight" />
            </div>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Hope Wall
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-foreground/75">
              Leave a short, anonymous message of encouragement for women and
              children rebuilding their lives. Every note is a reminder: you are
              not alone.
            </p>
          </div>
        </section>

        {/* Success banner */}
        {showSuccess && (
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-accent to-primary px-6 py-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5" />
              <span className="font-medium">
                Thank you for your message of support.
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <Card className="mb-10 rounded-3xl border-none bg-white/80 shadow-xl backdrop-blur">
          <CardHeader className="border-b border-foreground/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-4 w-4 text-primary" />
              </span>
              Share Your Support
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-7 pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground/90">
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
                <label className="mb-2 block text-sm font-medium text-foreground/90">
                  Your Message *
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a few words of hope and support..."
                  maxLength={250}
                  rows={4}
                />
                <div className="mt-1 text-right text-xs text-foreground/60">
                  {message.length}/250
                </div>
              </div>

              <Button
                type="submit"
                disabled={message.trim().length === 0}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-highlight to-primary text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="mr-2 h-4 w-4" />
                Share Your Support
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Messages / Padlet-style wall */}
        <section ref={messagesSectionRef}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground">
              Messages of Hope
            </h2>
            {messages.length > 0 && (
              <p className="text-sm text-foreground/60">
                {messages.length} message
                {messages.length !== 1 && 's'}
              </p>
            )}
          </div>
          {messages.length > 0 && (
            <p className="mb-4 text-xs text-foreground/50">
              Newest messages appear first.
            </p>
          )}

          {messages.length === 0 ? (
            <Card className="rounded-3xl border-dashed border-2 border-foreground/10 bg-white/70 py-12 text-center shadow-sm">
              <CardContent className="px-6 pb-6 pt-7">
                <Heart className="mx-auto mb-4 h-10 w-10 text-foreground/30" />
                <p className="text-foreground/70">
                  No messages yet. Be the first to share your support!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {messages.map((msg, index) => {
                const gradient =
                  CARD_GRADIENTS[index % CARD_GRADIENTS.length];
                const rotation =
                  CARD_ROTATIONS[index % CARD_ROTATIONS.length];

                return (
                  <Card
                    key={msg.id}
                    tabIndex={0}
                    role="article"
                    aria-label={`Message of hope from ${msg.display_name}`}
                    className={`relative bg-gradient-to-br ${gradient} ${rotation} rounded-2xl border-none shadow-md transition-transform transition-shadow hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/60`}
                  >
                    <CardContent className="px-5 pb-5 pt-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/80 shadow-sm">
                          <Heart className="h-4 w-4 text-highlight" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {msg.display_name}
                            </span>
                            <span className="text-[11px] uppercase tracking-wide text-foreground/60">
                              {formatDistanceToNow(
                                new Date(msg.created_date),
                                { addSuffix: true }
                              )}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/80">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}