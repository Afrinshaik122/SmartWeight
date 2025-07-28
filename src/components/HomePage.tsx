import React, { useState, useEffect } from 'react';
import { Scale, Weight, Target, Zap, ArrowRight, Sparkles, Calculator, Users, Flame, BarChart3, Shield, Clock } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-black/10 p-8 cursor-pointer transition-all duration-700 hover:scale-105 hover:bg-white/10 dark:hover:bg-black/10 animate-in slide-in-from-bottom-4`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-black/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 dark:bg-black/20 rounded-full transition-all duration-1000 ${
              isHovered ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center w-16 h-16 bg-white/10 dark:bg-black/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <Icon className="w-8 h-8 text-black dark:text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-black/60 dark:text-white/60 leading-relaxed mb-4 group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors duration-300">
          {description}
        </p>
        
        <div className="flex items-center text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-all duration-300">
          <span className="text-sm font-medium mr-2">Explore</span>
          <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Weight,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index instantly and understand your weight status with personalized health recommendations and insights.',
      action: 'bmi'
    },
    {
      icon: Target,
      title: 'Ideal Weight Calculator',
      description: 'Discover your perfect weight range using multiple scientifically proven formulas including Robinson, Miller, and Devine methods.',
      action: 'ideal'
    },
    {
      icon: Zap,
      title: 'Daily Calorie Calculator',
      description: 'Calculate your daily calorie needs based on your lifestyle, fitness goals, and activity level using advanced metabolic formulas.',
      action: 'calories'
    }
  ];

  type Stat = {
    icon: React.ElementType;
    value: string | number;
    label: string;
    description?: string;
  };

  const stats: Stat[] = [
 
  ];

  const additionalFeatures = [
    {
      icon: Calculator,
      title: 'Advanced Metrics',
      description: 'Multiple calculation methods for comprehensive health analysis',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    },
    {
      icon: Users,
      title: 'Personalized Results',
      description: 'Tailored recommendations based on your individual profile',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    },
    {
      icon: Flame,
      title: 'Goal Tracking',
      description: 'Monitor your progress with detailed insights and analytics',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    },
    {
      icon: BarChart3,
      title: 'Health Analytics',
      description: 'Comprehensive data visualization for better understanding',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data stays private and secure on your device',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get immediate calculations with beautiful animations',
      color: 'from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border-black/20 dark:border-white/20'
    }
  ];

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Main Hero Content */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Floating logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl mb-8 animate-pulse-slow">
              <Scale className="w-12 h-12 text-black dark:text-white animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            
            {/* Main title with gradient text effect - Fixed text cutting issue */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 bg-gradient-to-r from-black via-black/80 to-black/60 dark:from-white dark:via-white/80 dark:to-white/60 bg-clip-text text-transparent animate-in slide-in-from-top-4 duration-1000 leading-[1.1] tracking-tight px-6 py-2 overflow-visible">
              SmartWeight
            </h1>
            
            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              Your intelligent companion for <span className="font-semibold text-black dark:text-white bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text">weight management</span>, 
              <span className="font-semibold text-black dark:text-white bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text"> health tracking</span>, and 
              <span className="font-semibold text-black dark:text-white bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text"> wellness optimization</span>
            </p>
            
            {/* CTA Buttons - Now functional */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-1000 delay-500">
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToTab', { detail: 'bmi' });
                  window.dispatchEvent(event);
                }}
                className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToTab', { detail: 'about' });
                  window.dispatchEvent(event);
                }}
                className="group border-2 border-black/20 dark:border-white/20 text-black dark:text-white px-8 py-4 rounded-2xl font-semibold hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105 transition-all duration-500"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-black/10 hover:scale-105 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-500 group cursor-pointer"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 dark:bg-black/10 rounded-xl mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-black dark:text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl font-bold text-black dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{stat.label}</div>
                <div className="text-xs text-black/40 dark:text-white/40 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Main Features Grid */}
          <div className="mb-20">
            <div className={`text-center mb-12 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                Powerful Health Tools
              </h2>
              <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
                Advanced calculators designed to help you understand your body and achieve your health goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={1200 + index * 200}
                  onClick={() => {
                    const event = new CustomEvent('navigateToTab', { detail: feature.action });
                    window.dispatchEvent(event);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="mb-20">
            <div className={`text-center mb-12 transition-all duration-1000 delay-1600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                Why Choose SmartWeight?
              </h2>
              <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
                Experience the difference with our advanced features and user-centric design
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-lg group cursor-pointer animate-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${1800 + index * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 dark:bg-black/10 rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA - Now functional */}
          <div className={`text-center transition-all duration-1000 delay-2200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-black/10 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                Ready to Transform Your Health?
              </h3>
              <p className="text-black/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already started their wellness journey with our intelligent health tools.
              </p>
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToTab', { detail: 'bmi' });
                  window.dispatchEvent(event);
                }}
                className="group bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-semibold hover:scale-105 transition-all duration-500 shadow-2xl flex items-center space-x-3 mx-auto"
              >
                <Scale className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Get Started Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black/5 dark:bg-white/5 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3000}ms`,
              animationDuration: `${3000 + Math.random() * 2000}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;