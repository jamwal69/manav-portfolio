'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-green-300">{statusMessage}</p>
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
        >
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300">{statusMessage}</p>
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-blue-400 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-800/50 border ${
              errors.name ? 'border-red-500' : 'border-slate-600'
            } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors`}
            placeholder="Your Name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-blue-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-800/50 border ${
              errors.email ? 'border-red-500' : 'border-slate-600'
            } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-blue-400 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-slate-800/50 border ${
            errors.message ? 'border-red-500' : 'border-slate-600'
          } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none transition-colors`}
          placeholder="Tell me about your project or inquiry..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 ${
          isSubmitting
            ? 'bg-slate-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
      
      <p className="text-sm text-slate-400 text-center">
        I typically respond within 24-48 hours. For urgent matters, reach out directly at{' '}
        <a href="mailto:jamwalmanav69@gmail.com" className="text-blue-400 hover:text-blue-300">
          jamwalmanav69@gmail.com
        </a>
      </p>
    </form>
  );
}
