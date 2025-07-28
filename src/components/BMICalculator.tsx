import React, { useState, useEffect } from 'react';
import { Weight, TrendingUp, AlertCircle } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
}

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const getBMICategory = (bmi: number): Omit<BMIResult, 'bmi'> => {
    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        description: 'Consider consulting a healthcare provider for guidance on healthy weight gain.',
        color: 'text-blue-600 dark:text-blue-400'
      };
    } else if (bmi < 25) {
      return {
        category: 'Normal Weight',
        description: 'Great! Maintain your current lifestyle with balanced diet and regular exercise.',
        color: 'text-green-600 dark:text-green-400'
      };
    } else if (bmi < 30) {
      return {
        category: 'Overweight',
        description: 'Consider incorporating more physical activity and reviewing your diet.',
        color: 'text-yellow-600 dark:text-yellow-400'
      };
    } else {
      return {
        category: 'Obese',
        description: 'Consult with a healthcare provider for a comprehensive weight management plan.',
        color: 'text-red-600 dark:text-red-400'
      };
    }
  };

  const calculateBMI = async () => {
    if (!height || !weight) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for animation
    await new Promise(resolve => setTimeout(resolve, 800));

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      heightInMeters = parseFloat(height) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const category = getBMICategory(bmi);

    setResult({
      bmi,
      ...category
    });
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setIsCalculating(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-black/20 shadow-2xl overflow-hidden" style={{backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.08)'}}>
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Weight className="w-8 h-8 text-black dark:text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              BMI Calculator
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Calculate your Body Mass Index to understand your weight status and get personalized recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex justify-center"> 
                <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 gap-0 relative">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-500 z-10 ${
                      unit === 'metric'
                        ? 'text-white dark:text-black'
                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-500 z-10 ${
                      unit === 'imperial'
                        ? 'text-white dark:text-black'
                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Imperial
                  </button>
                  {/* Sliding background */}
                  <div 
                    className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-xl transition-all duration-500 ease-out shadow-lg"
                    style={{
                      left: unit === 'metric' ? '0.25rem' : '50%',
                      width: 'calc(50% - 0.125rem)'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={calculateBMI}
                    disabled={!height || !weight || isCalculating}
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-4 sm:py-4 sm:px-8 rounded-2xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-500 shadow-lg text-sm sm:text-base"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate'}
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="px-4 sm:px-8 py-3 sm:py-4 border border-black/20 dark:border-white/20 rounded-2xl font-semibold text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105 transition-all duration-500 text-sm sm:text-base"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {isCalculating ? (
                <div className="text-center">
                  <div className="w-32 h-32 border-4 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-black/70 dark:text-white/70">Calculating your BMI...</p>
                </div>
              ) : result ? (
                <div className="text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="relative">
                    <div className="w-40 h-40 border-8 border-black/10 dark:border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-black dark:text-white">
                          {result.bmi.toFixed(1)}
                        </div>
                        <div className="text-sm text-black/60 dark:text-white/60">BMI</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-bold ${result.color}`}>
                      {result.category}
                    </h3>
                    <p className="text-black/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-black/50 dark:text-white/50">
                    <AlertCircle className="w-4 h-4" />
                    <span>Consult a healthcare provider for personalized advice</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-black/40 dark:text-white/40">
                  <TrendingUp className="w-24 h-24 mx-auto mb-6 opacity-50" />
                  <p>Enter your height and weight to calculate BMI</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;