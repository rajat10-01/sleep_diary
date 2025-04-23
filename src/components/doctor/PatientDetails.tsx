'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Define types
interface PatientSleepData {
  averageQuality: number;
  averageRested: number;
  sleepTrend: 'improving' | 'declining' | 'stable';
  lastEntry: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  sleepData: PatientSleepData;
}

// Mock sleep diary entries - in production these would come from the API
const MOCK_SLEEP_ENTRIES = [
  {
    id: '1',
    date: '2023-05-20',
    bedtime: '2023-05-20T23:00:00.000Z',
    wakeUpTime: '2023-05-21T07:30:00.000Z',
    timeToFallAsleepMinutes: 25,
    timesWokenUp: 2,
    timeAwakeDuringNightMinutes: 35,
    sleepQualityRating: 3,
    restedRating: 3,
    notes: "Had coffee in the afternoon"
  },
  {
    id: '2',
    date: '2023-05-19',
    bedtime: '2023-05-19T22:15:00.000Z',
    wakeUpTime: '2023-05-20T06:45:00.000Z',
    timeToFallAsleepMinutes: 15,
    timesWokenUp: 1,
    timeAwakeDuringNightMinutes: 10,
    sleepQualityRating: 4,
    restedRating: 4,
    notes: "Exercised during the day"
  },
  {
    id: '3',
    date: '2023-05-18',
    bedtime: '2023-05-18T23:30:00.000Z',
    wakeUpTime: '2023-05-19T07:00:00.000Z',
    timeToFallAsleepMinutes: 40,
    timesWokenUp: 3,
    timeAwakeDuringNightMinutes: 60,
    sleepQualityRating: 2,
    restedRating: 2,
    notes: "Stressful day at work"
  },
  {
    id: '4',
    date: '2023-05-17',
    bedtime: '2023-05-17T22:45:00.000Z',
    wakeUpTime: '2023-05-18T07:15:00.000Z',
    timeToFallAsleepMinutes: 20,
    timesWokenUp: 0,
    timeAwakeDuringNightMinutes: 0,
    sleepQualityRating: 5,
    restedRating: 5,
    notes: "Relaxing evening routine"
  },
  {
    id: '5',
    date: '2023-05-16',
    bedtime: '2023-05-16T23:15:00.000Z',
    wakeUpTime: '2023-05-17T06:30:00.000Z',
    timeToFallAsleepMinutes: 30,
    timesWokenUp: 2,
    timeAwakeDuringNightMinutes: 25,
    sleepQualityRating: 3,
    restedRating: 3,
    notes: ""
  },
];

interface PatientDetailsProps {
  patient: Patient;
  onBack: () => void;
  statsFilter: string;
  setStatsFilter: (filter: string) => void;
}

export default function PatientDetails({ patient, onBack, statsFilter, setStatsFilter }: PatientDetailsProps) {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  // Get a specific sleep entry by ID
  const getEntryById = (id: string) => {
    return MOCK_SLEEP_ENTRIES.find(entry => entry.id === id);
  };

  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time string from ISO string
  const formatTime = (isoString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(isoString).toLocaleTimeString(undefined, options);
  };

  // Calculate total sleep time in hours
  const calculateSleepDuration = (bedtime: string, wakeupTime: string) => {
    const start = new Date(bedtime);
    const end = new Date(wakeupTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    return diffHrs.toFixed(1);
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
                <p className="text-gray-600">{patient.email}</p>
              </div>
            </div>
            
            <div className="flex mt-4 md:mt-0 space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Message
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Notes
              </button>
            </div>
          </div>
        </div>

        {/* Sleep analytics dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left column - Sleep summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Sleep Summary</h2>
                
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['week', 'month', 'year'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setStatsFilter(filter)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        statsFilter === filter 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Chart placeholder */}
              <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <p className="mt-2 text-gray-600">Sleep quality chart would display here</p>
                  <p className="text-sm text-gray-500">Showing data for the last {statsFilter}</p>
                </div>
              </div>
              
              {/* Sleep metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { 
                    label: 'Avg. Sleep Duration', 
                    value: '7.2h',
                    change: '+0.5h',
                    changeType: 'positive'
                  },
                  { 
                    label: 'Avg. Sleep Quality', 
                    value: patient.sleepData.averageQuality.toFixed(1),
                    change: patient.sleepData.sleepTrend === 'improving' ? '+0.4' : 
                           patient.sleepData.sleepTrend === 'declining' ? '-0.3' : '0.0',
                    changeType: patient.sleepData.sleepTrend === 'improving' ? 'positive' : 
                               patient.sleepData.sleepTrend === 'declining' ? 'negative' : 'neutral'
                  },
                  { 
                    label: 'Avg. Time to Fall Asleep', 
                    value: '25m',
                    change: '-5m',
                    changeType: 'positive'
                  },
                  { 
                    label: 'Avg. Night Awakenings',
                    value: '1.6',
                    change: '+0.2',
                    changeType: 'negative'
                  }
                ].map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                    <p className={`text-xs ${
                      metric.changeType === 'positive' ? 'text-green-600' : 
                      metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {metric.change} from previous {statsFilter}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sleep Entry Details */}
            {selectedEntry && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Entry Details - {formatDate(getEntryById(selectedEntry)?.date || '')}
                  </h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {selectedEntry && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <p className="text-sm text-indigo-700">Bedtime</p>
                          <p className="text-lg font-medium text-gray-800">
                            {formatTime(getEntryById(selectedEntry)?.bedtime || '')}
                          </p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <p className="text-sm text-amber-700">Wake-up Time</p>
                          <p className="text-lg font-medium text-gray-800">
                            {formatTime(getEntryById(selectedEntry)?.wakeUpTime || '')}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-700">Sleep Duration</p>
                          <p className="text-lg font-medium text-gray-800">
                            {calculateSleepDuration(
                              getEntryById(selectedEntry)?.bedtime || '',
                              getEntryById(selectedEntry)?.wakeUpTime || ''
                            )} hours
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-700">Time to Fall Asleep</p>
                          <p className="text-lg font-medium text-gray-800">
                            {getEntryById(selectedEntry)?.timeToFallAsleepMinutes || 0} mins
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-700">Times Woken Up</p>
                          <p className="text-lg font-medium text-gray-800">
                            {getEntryById(selectedEntry)?.timesWokenUp || 0} times
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm text-orange-700">Time Awake at Night</p>
                          <p className="text-lg font-medium text-gray-800">
                            {getEntryById(selectedEntry)?.timeAwakeDuringNightMinutes || 0} mins
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Sleep Quality Rating</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-yellow-400 h-4 rounded-full"
                              style={{ width: `${(getEntryById(selectedEntry)?.sleepQualityRating || 0) * 20}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 font-medium text-gray-800">
                            {getEntryById(selectedEntry)?.sleepQualityRating || 0}/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Rested Rating</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-purple-500 h-4 rounded-full"
                              style={{ width: `${(getEntryById(selectedEntry)?.restedRating || 0) * 20}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 font-medium text-gray-800">
                            {getEntryById(selectedEntry)?.restedRating || 0}/5
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Notes</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-800">
                            {getEntryById(selectedEntry)?.notes || 'No notes provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Additional insights */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sleep Insights</h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">Exercise correlation detected</p>
                      <p className="text-xs text-green-600 mt-1">Patient reports better sleep quality on days with physical activity</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">Caffeine sensitivity identified</p>
                      <p className="text-xs text-red-600 mt-1">Afternoon caffeine intake correlates with longer time to fall asleep</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">Recommendation</p>
                      <p className="text-xs text-blue-600 mt-1">Suggest implementing a consistent bedtime routine to improve sleep quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Sleep entries list */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 h-[calc(100vh-160px)] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sleep Diary Entries</h2>
              
              {MOCK_SLEEP_ENTRIES.length === 0 ? (
                <div className="text-center py-10">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="mt-2 text-gray-600">No sleep entries yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {MOCK_SLEEP_ENTRIES.map(entry => (
                    <div 
                      key={entry.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedEntry === entry.id 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                      onClick={() => setSelectedEntry(entry.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{formatDate(entry.date)}</h4>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{formatTime(entry.bedtime)}</span>
                            <span className="mx-2">→</span>
                            <span>{formatTime(entry.wakeUpTime)}</span>
                            <span className="ml-2 text-indigo-600 font-medium">
                              ({calculateSleepDuration(entry.bedtime, entry.wakeUpTime)}h)
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < entry.sleepQualityRating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Condensed metrics */}
                      <div className="mt-3 flex justify-between text-xs text-gray-500">
                        <span>Fall asleep: {entry.timeToFallAsleepMinutes}m</span>
                        <span>Awakenings: {entry.timesWokenUp}</span>
                        <span>Awake time: {entry.timeAwakeDuringNightMinutes}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 