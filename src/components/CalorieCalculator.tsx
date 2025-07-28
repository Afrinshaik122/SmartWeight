import React, { useState } from 'react';
import { Zap, Activity } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<string>('1.2');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<any>(null);

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)' },
    { value: '1.375', label: 'Light activity (light exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderate activity (moderate exercise 3-5 days/week)' },
    { value: '1.725', label: 'Very active (hard exercise 6-7 days/week)' },
    { value: '1.9', label: 'Extremely active (very hard exercise, physical job)' },
  ];

  const calculateCalories = () => {
    if (!height || !weight || !age) return;

    let heightInCm: number;
    let weightInKg: number;

    if (unit === 'metric') {
      heightInCm = parseFloat(height);
      weightInKg = parseFloat(weight);
    } else {
      heightInCm = parseFloat(height) * 2.54;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * parseFloat(age));
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * parseFloat(age));
    }

    const tdee = bmr * parseFloat(activity);

    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      extremeWeightLoss: Math.round(tdee - 1000),
      weightGain: Math.round(tdee + 500),
      extremeWeightGain: Math.round(tdee + 1000),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-black/20 shadow-2xl overflow-hidden" style={{backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.08)'}}>
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-black dark:text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Daily Calorie Calculator
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Calculate your daily calorie needs based on your goals and activity level
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
                <div>
                  <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                    Gender
                  </label>
                  <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 gap-0 relative">
                    <button
                      onClick={() => setGender('male')}
                      className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-500 z-10 ${
                        gender === 'male'
                          ? 'text-white dark:text-black'
                          : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-500 z-10 ${
                        gender === 'female'
                          ? 'text-white dark:text-black'
                          : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Female
                    </button>
                    {/* Sliding background */}
                    <div 
                      className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-xl transition-all duration-500 ease-out shadow-lg"
                      style={{
                        left: gender === 'male' ? '0.25rem' : '50%',
                        width: 'calc(50% - 0.125rem)'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Height ({unit === 'metric' ? 'cm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Height"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Weight"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                    Activity Level
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:bg-white/15 dark:hover:bg-black/15 custom-select"
                  >
                    {activityLevels.map((level) => (
                      <option key={level.value} value={level.value} className="bg-white dark:bg-gray-800 text-black dark:text-white py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {level.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-black/60 dark:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={calculateCalories}
                  disabled={!height || !weight || !age}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 sm:py-4 sm:px-8 rounded-2xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-500 shadow-lg text-sm sm:text-base"
                >
                  {window.innerWidth < 640 ? 'Calculate' : 'Calculate Daily Calories'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {results ? (
                <div className="space-y-6 w-full animate-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-8">
                    <Activity className="w-16 h-16 mx-auto mb-4 text-black dark:text-white opacity-60" />
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                      Your Daily Calorie Needs
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-black/70 dark:text-white/70">Base Metabolic Rate</span>
                        <span className="font-bold text-black dark:text-white">
                          {results.bmr} calories
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/10 dark:bg-white/10 rounded-2xl p-6 border-2 border-black/20 dark:border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-black dark:text-white">Maintenance</span>
                        <span className="font-bold text-xl text-black dark:text-white">
                          {results.maintenance} calories
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
                        <div className="text-center">
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Weight Loss</div>
                          <div className="font-bold text-black dark:text-white">{results.weightLoss}</div>
                        </div>
                      </div>

                      <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
                        <div className="text-center">
                          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Weight Gain</div>
                          <div className="font-bold text-black dark:text-white">{results.weightGain}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-500/20 rounded-2xl p-4 border border-blue-500/30">
                        <div className="text-center">
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Fast Loss</div>
                          <div className="font-bold text-black dark:text-white">{results.extremeWeightLoss}</div>
                        </div>
                      </div>

                      <div className="bg-green-500/20 rounded-2xl p-4 border border-green-500/30">
                        <div className="text-center">
                          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Fast Gain</div>
                          <div className="font-bold text-black dark:text-white">{results.extremeWeightGain}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-black/40 dark:text-white/40">
                  <Zap className="w-24 h-24 mx-auto mb-6 opacity-50" />
                  <p>Enter your details to calculate daily calories</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;