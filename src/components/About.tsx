import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Send, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_pwmtkyw',
        'template_1tlm6di',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        '53IjVEZF7clPONzFH'
      );
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Email failed:', error);
      alert('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-black/20 shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl mb-6">
              <User className="w-8 h-8 text-black dark:text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              About WeightWise
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Your comprehensive weight management companion with advanced calculators and personalized insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-black dark:text-white mb-1">
                      Theme Preference
                    </h4>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Toggle appearance
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Modern Health Tools
                </h3>
                <p className="text-black/70 dark:text-white/70 leading-relaxed">
                  WeightWise provides scientifically-backed calculators to help you understand your body metrics and make informed health decisions. Our tools include BMI calculation, ideal weight estimation, and daily calorie requirements.
                </p>
                <p className="text-black/70 dark:text-white/70 leading-relaxed">
                  Built with modern web technologies and designed with user experience in mind, WeightWise offers a clean, intuitive interface that works seamlessly across all devices.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/afrinshaik05/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-black/5 dark:bg-white/5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500 hover:scale-110 group"
                  >
                    <Linkedin className="w-5 h-5 text-black dark:text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="mailto:afrushaik05@gmail.com"
                    className="flex items-center justify-center w-12 h-12 bg-black/5 dark:bg-white/5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500 hover:scale-110 group"
                  >
                    <Mail className="w-5 h-5 text-black dark:text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Get In Touch
              </h3>

              {submitted ? (
                <div className="text-center py-12 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-black/60 dark:text-white/60">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-2xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-500 shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;