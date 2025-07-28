import React, { useState } from 'react';
import { Scale, Zap, Target, Weight, User, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', shortLabel: 'Home', mobileLabel: 'Home', icon: Scale },
    { id: 'bmi', label: 'BMI', shortLabel: 'BMI', mobileLabel: 'BMI Calculator', icon: Weight },
    { id: 'ideal', label: 'Weight', shortLabel: 'Weight', mobileLabel: 'Ideal Weight Calculator', icon: Target },
    { id: 'calories', label: 'Calories', shortLabel: 'Calories', mobileLabel: 'Daily Calorie Calculator', icon: Zap },
    { id: 'about', label: 'About', shortLabel: 'About', mobileLabel: 'About', icon: User },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group flex items-center space-x-2 sm:space-x-3 transition-all duration-500 hover:scale-102"
          >
            <Scale className="w-5 h-5 sm:w-7 sm:h-7 transition-all duration-500 group-hover:rotate-12 text-black dark:text-white" />
            <h1 className="text-lg sm:text-2xl font-bold text-black dark:text-white relative overflow-hidden">
              <span className="relative z-10">SmartWeight</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-500 group-hover:w-full"></span>
            </h1>
          </div>

          {/* Desktop Navigation */} 
          <div className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 rounded-2xl p-1 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-500 hover:scale-102 z-10 w-[110px] ${
                    activeTab === item.id
                      ? 'text-white dark:text-black'
                      : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
            {/* Sliding background */}
            <div 
              className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-xl transition-all duration-500 ease-out shadow-lg"
              style={{
                left: `calc(${navItems.findIndex(item => item.id === activeTab) * 110}px + 0.25rem)`,
                width: '110px'
              }}
            />
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center bg-black/5 dark:bg-white/5 rounded-2xl p-1 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl transition-all duration-500 hover:scale-102 z-10 w-[90px] ${
                    activeTab === item.id
                      ? 'text-white dark:text-black'
                      : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.shortLabel}</span>
                </button>
              );
            })}
            {/* Sliding background */}
            <div 
              className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-xl transition-all duration-500 ease-out shadow-lg"
              style={{
                left: `calc(${navItems.findIndex(item => item.id === activeTab) * 90}px + 0.25rem)`,
                width: '90px'
              }}
            />
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-black dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-lg animate-in slide-in-from-top-4 duration-300">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;