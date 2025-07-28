import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import BMICalculator from './components/BMICalculator';
import IdealWeightCalculator from './components/IdealWeightCalculator';
import CalorieCalculator from './components/CalorieCalculator';
import About from './components/About';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Listen for navigation events from HomePage
    const handleNavigateToTab = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('navigateToTab', handleNavigateToTab as EventListener);
    
    return () => {
      window.removeEventListener('navigateToTab', handleNavigateToTab as EventListener);
    };
  }, []);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'bmi':
        return <BMICalculator />;
      case 'ideal':
        return <IdealWeightCalculator />;
      case 'calories':
        return <CalorieCalculator />;
      case 'about':
        return <About />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-all duration-700 ease-in-out">
        <AnimatedBackground />
        
        <div className={`relative z-10 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="pt-24 pb-16 px-4">
            <div className="container mx-auto">
              {renderActiveComponent()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;