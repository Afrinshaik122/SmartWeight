import React, { useState } from 'react';
import { Target, Users } from 'lucide-react';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<any>(null);

  const calculateIdealWeight = () => {
    if (!height || !age) return;

    let heightInCm: number;
    if (unit === 'metric') {
      heightInCm = parseFloat(height);
    } else {
      heightInCm = parseFloat(height) * 2.54;
    }

    // Various formulas for ideal weight
    const robinson = gender === 'male' 
      ? 52 + 1.9 * ((heightInCm - 152.4) / 2.54)
      : 49 + 1.7 * ((heightInCm - 152.4) / 2.54);

    const miller = gender === 'male'
      ? 56.2 + 1.41 * ((heightInCm - 152.4) / 2.54)
      : 53.1 + 1.36 * ((heightInCm - 152.4) / 2.54);

    const devine = gender === 'male'
      ? 50 + 2.3 * ((heightInCm - 152.4) / 2.54)
      : 45.5 + 2.3 * ((heightInCm - 152.4) / 2.54);

    const average = (robinson + miller + devine) / 3;

    setResults({
      robinson: unit === 'imperial' ? robinson * 2.205 : robinson,
      miller: unit === 'imperial' ? miller * 2.205 : miller,
      devine: unit === 'imperial' ? devine * 2.205 : devine,
      average: unit === 'imperial' ? average * 2.205 : average,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-black/20 shadow-2xl overflow-hidden" style={{backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.08)'}}>
        <div className="p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl mb-6">
              <Target className="w-8 h-8 text-black dark:text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Ideal Weight Calculator
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Discover your ideal weight range using scientifically proven formulas
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

                <div>
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

                <div>
                  <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-3">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 dark:bg-black/10 border border-black/20 dark:border-white/20 rounded-2xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-transparent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter your age"
                  />
                </div>

                <button
                  onClick={calculateIdealWeight}
                  disabled={!height || !age}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 sm:py-4 sm:px-8 rounded-2xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-500 shadow-lg text-sm sm:text-base"
                >
                  {window.innerWidth < 640 ? 'Calculate' : 'Calculate Ideal Weight'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {results ? (
                <div className="space-y-6 w-full animate-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-8">
                    <Users className="w-16 h-16 mx-auto mb-4 text-black dark:text-white opacity-60" />
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                      Your Ideal Weight Range
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-black/70 dark:text-white/70">Robinson Formula</span>
                        <span className="font-bold text-black dark:text-white">
                          {results.robinson.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-black/70 dark:text-white/70">Miller Formula</span>
                        <span className="font-bold text-black dark:text-white">
                          {results.miller.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 dark:bg-black/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-black/70 dark:text-white/70">Devine Formula</span>
                        <span className="font-bold text-black dark:text-white">
                          {results.devine.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/10 dark:bg-white/10 rounded-2xl p-6 border-2 border-black/20 dark:border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-black dark:text-white">Average</span>
                        <span className="font-bold text-xl text-black dark:text-white">
                          {results.average.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-black/40 dark:text-white/40">
                  <Target className="w-24 h-24 mx-auto mb-6 opacity-50" />
                  <p>Enter your details to calculate ideal weight</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculator;