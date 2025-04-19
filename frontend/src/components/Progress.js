import React, { useContext } from 'react';
import AppContext from "../contexts/AppContext";

const Progress = () => {
  const { evaluation } = useContext(AppContext);

  if (!evaluation) return null;

  const {
    overall_score,
    detailed_scores = {},
    missing_key_points = [],
    incorrect_statements = [],
    strengths = [],
    suggestions = []
  } = evaluation;

  // Create circular progress components for each score
  const ScoreCircle = ({ value, label, size = "md" }) => {
    const sizes = {
      sm: { outer: 80, inner: 30, stroke: 6 },
      md: { outer: 100, inner: 40, stroke: 8 },
      lg: { outer: 120, inner: 50, stroke: 10 }
    };
    
    const { outer, inner, stroke } = sizes[size];
    const radius = (outer - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: outer, height: outer }}>
          <svg className="w-full h-full" viewBox={`0 0 ${outer} ${outer}`}>
            {/* Background circle */}
            <circle
              cx={outer / 2}
              cy={outer / 2}
              r={radius}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth={stroke}
            />
            {/* Progress circle */}
            <circle
              cx={outer / 2}
              cy={outer / 2}
              r={radius}
              fill="none"
              stroke={
                value >= 80 ? "#4CAF50" :
                value >= 60 ? "#FFC107" : "#F44336"
              }
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${outer / 2} ${outer / 2})`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold ${
              size === 'sm' ? 'text-lg' : 
              size === 'md' ? 'text-xl' : 'text-2xl'
            }`}>
              {value}%
            </span>
          </div>
        </div>
        <span className="mt-2 text-sm font-medium text-gray-600 capitalize">
          {label.replace('_', ' ')}
        </span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Performance Evaluation</h2>
        <div className="flex justify-center">
          <ScoreCircle 
            value={overall_score} 
            label="Overall Score" 
            size="lg" 
          />
        </div>
      </div>

      {/* Detailed Scores Grid */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-center">Detailed Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(detailed_scores).map(([key, value]) => (
            <ScoreCircle 
              key={key}
              value={value}
              label={key}
              size="md"
            />
          ))}
        </div>
      </div>

      {/* Feedback Sections */}
      <div className="space-y-6">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Strengths
            </h3>
            <ul className="space-y-2">
              {strengths.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-green-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Suggestions for Improvement
            </h3>
            <ul className="space-y-2">
              {suggestions.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-blue-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Points */}
        {missing_key_points.length > 0 && (
          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Missing Key Points
            </h3>
            <ul className="space-y-2">
              {missing_key_points.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-500 mr-2">!</span>
                  <span className="text-yellow-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Incorrect Statements */}
        {incorrect_statements.length > 0 && (
          <div className="bg-red-50 p-5 rounded-xl border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Incorrect Statements
            </h3>
            <ul className="space-y-2">
              {incorrect_statements.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-red-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;