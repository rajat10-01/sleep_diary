'use client';

import React from 'react';

const SleepDiaryForm: React.FC = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sleep Diary Form</h2>
      <p className="text-gray-700 mb-8">
        The Sleep Diary form is being redesigned to be more user-friendly and efficient.
        It will be available in the upcoming update.
      </p>
      
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="font-medium text-indigo-800 mb-2">New Form Features Coming Soon</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Intuitive time selection</li>
          <li>Quick rating sliders</li>
          <li>Mood and energy tracking</li>
          <li>Factors affecting sleep (caffeine, exercise, stress)</li>
          <li>Smart suggestions based on your patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default SleepDiaryForm; 