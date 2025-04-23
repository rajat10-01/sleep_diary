'use client';

import React, { useState, useEffect } from 'react';
import { type Session } from 'next-auth';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Paper, Tabs, Tab, Divider } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat, NightsStay, Alarm, Timer, SentimentSatisfiedAlt } from '@mui/icons-material';
import SleepDiaryForm from './SleepDiaryForm';
import { format, parseISO, differenceInHours, differenceInMinutes } from 'date-fns';

// Dummy data for sleep history visualization
const DUMMY_SLEEP_DATA = [
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

interface PatientDashboardProps {
  user: Session['user'];
}

export default function PatientDashboard({ user }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState('diary'); // 'diary', 'history', 'insights'
  const [sleepData, setSleepData] = useState(DUMMY_SLEEP_DATA);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sleepStats, setSleepStats] = useState({
    averageQuality: 0,
    averageRested: 0,
    averageSleepDuration: 0,
    sleepTrend: 'neutral',
    totalEntries: 0
  });

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only fetch data when component is mounted
    if (!mounted) return;
    
    const fetchSleepData = async () => {
      try {
        const response = await fetch('/api/sleep-entries');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sleep data');
        }
        
        const data = await response.json();
        setSleepData(data);
        
        if (data.length > 0) {
          // Calculate stats
          const avgQuality = data.reduce((sum: number, entry: any) => sum + entry.sleepQualityRating, 0) / data.length;
          const avgRested = data.reduce((sum: number, entry: any) => sum + entry.restedRating, 0) / data.length;
          
          // Calculate average sleep duration
          const avgDuration = data.reduce((sum: number, entry: any) => {
            const bedtime = new Date(`2000-01-01T${entry.bedtime}`);
            const wakeup = new Date(`2000-01-01T${entry.wakeUpTime}`);
            // Handle case where wake up is on next day
            let hours = differenceInHours(wakeup, bedtime);
            if (hours < 0) {
              hours += 24;
            }
            return sum + hours;
          }, 0) / data.length;
          
          // Determine sleep quality trend based on last 3 entries
          let trend = 'neutral';
          if (data.length >= 3) {
            const recent = data.slice(0, 3).map(e => e.sleepQualityRating);
            if (recent[0] > recent[1] && recent[1] > recent[2]) {
              trend = 'improving';
            } else if (recent[0] < recent[1] && recent[1] < recent[2]) {
              trend = 'declining';
            }
          }
          
          setSleepStats({
            averageQuality: avgQuality,
            averageRested: avgRested,
            averageSleepDuration: avgDuration,
            sleepTrend: trend,
            totalEntries: data.length
          });
        }
      } catch (err) {
        console.error('Error fetching sleep data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSleepData();
  }, [mounted]);

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

  // Calculate average sleep quality
  const averageSleepQuality = sleepData.reduce((sum, entry) => sum + entry.sleepQualityRating, 0) / sleepData.length;

  // Calculate average time to fall asleep
  const averageTimeToFallAsleep = sleepData.reduce((sum, entry) => sum + entry.timeToFallAsleepMinutes, 0) / sleepData.length;

  // Calculate average sleep duration
  const averageSleepDuration = sleepData.reduce((sum, entry) => {
    const duration = parseFloat(calculateSleepDuration(entry.bedtime, entry.wakeUpTime));
    return sum + duration;
  }, 0) / sleepData.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(`tab${newValue}`);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp style={{ color: 'green' }} />;
      case 'declining':
        return <TrendingDown style={{ color: 'red' }} />;
      default:
        return <TrendingFlat style={{ color: 'gray' }} />;
    }
  };

  const formatSleepDuration = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  if (!mounted || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Sleep Diary</h1>
              <p className="text-lg text-gray-600">Welcome back, {user?.name || user?.email}!</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className="bg-indigo-50 p-2 rounded-lg">
                {/* Sleeping moon icon */}
                <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <nav className="flex border-b">
            {[
              { id: 'diary', label: 'Sleep Diary', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
              { id: 'history', label: 'Sleep History', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'insights', label: 'Insights', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-6 focus:outline-none ${
                  activeTab === tab.id 
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' 
                    : 'text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon}></path>
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 'diary' && (
            <SleepDiaryForm />
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Sleep History</h2>
              
              {sleepData.length === 0 ? (
                <div className="py-20 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <p className="mt-4 text-lg text-gray-600">No sleep entries yet</p>
                  <p className="text-gray-500">Start tracking your sleep by filling out the diary!</p>
                </div>
              ) : (
                <div>
                  {/* Visualization placeholder */}
                  <div className="p-4 bg-indigo-50 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Sleep Quality Trend</h3>
                    <div className="h-48 bg-white rounded-lg p-4 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4m0 10v-4m0 4h-4"></path>
                        </svg>
                        <p className="mt-2 text-gray-500">Sleep quality chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sleep entry list */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Sleep Entries</h3>
                    
                    <div className="space-y-4">
                      {sleepData.map(entry => (
                        <div 
                          key={entry.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedEntry === entry.id 
                              ? 'border-indigo-500 bg-indigo-50' 
                              : 'border-gray-200 hover:border-indigo-300'
                          }`}
                          onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">{formatDate(entry.date)}</h4>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <span>{formatTime(entry.bedtime)}</span>
                                <span className="mx-2">→</span>
                                <span>{formatTime(entry.wakeUpTime)}</span>
                                <span className="ml-2 text-indigo-600 font-medium">
                                  ({calculateSleepDuration(entry.bedtime, entry.wakeUpTime)}h)
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {/* Sleep quality stars */}
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`w-5 h-5 ${i < entry.sleepQualityRating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              
                              {/* Expand/collapse icon */}
                              <svg 
                                className={`w-5 h-5 text-gray-400 transform transition-transform ${selectedEntry === entry.id ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Expanded details */}
                          {selectedEntry === entry.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500">Time to Fall Asleep</p>
                                  <p className="font-medium text-gray-800">{entry.timeToFallAsleepMinutes} minutes</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Times Woken Up</p>
                                  <p className="font-medium text-gray-800">{entry.timesWokenUp} times</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Time Awake During Night</p>
                                  <p className="font-medium text-gray-800">{entry.timeAwakeDuringNightMinutes} minutes</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">How Rested (1-5)</p>
                                  <p className="font-medium text-gray-800">{entry.restedRating}/5</p>
                                </div>
                              </div>
                              
                              {entry.notes && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                                  <p className="text-gray-700">{entry.notes}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'insights' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sleep Insights</h2>
              
              {sleepData.length < 3 ? (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">Not enough data for insights</p>
                      <p className="text-xs text-blue-600 mt-1">Keep logging your sleep for at least 3 days to see personalized insights</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Sleep statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={1}>
                            <NightsStay color="primary" className="mr-2" />
                            <Typography variant="h6" color="textSecondary">Sleep Quality</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Typography variant="h3" className="mr-2">
                              {sleepStats.averageQuality.toFixed(1)}
                            </Typography>
                            {getTrendIcon(sleepStats.sleepTrend)}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={1}>
                            <SentimentSatisfiedAlt color="primary" className="mr-2" />
                            <Typography variant="h6" color="textSecondary">Rested Rating</Typography>
                          </Box>
                          <Typography variant="h3">
                            {sleepStats.averageRested.toFixed(1)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Timer color="primary" className="mr-2" />
                            <Typography variant="h6" color="textSecondary">Avg Sleep</Typography>
                          </Box>
                          <Typography variant="h3">
                            {formatSleepDuration(sleepStats.averageSleepDuration)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Card>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Alarm color="primary" className="mr-2" />
                            <Typography variant="h6" color="textSecondary">Entries</Typography>
                          </Box>
                          <Typography variant="h3">
                            {sleepStats.totalEntries}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </div>
                  
                  {/* Insights and recommendations */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Insights</h3>
                  
                  <div className="space-y-4">
                    {/* Example insights - in a real app, these would be generated dynamically */}
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700 font-semibold">You sleep best on days you exercise</p>
                          <p className="text-xs text-green-600 mt-1">Your sleep quality rating is 30% higher on days you mentioned exercise in your notes.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700 font-semibold">Caffeine may be affecting your sleep</p>
                          <p className="text-xs text-yellow-600 mt-1">On days you mentioned coffee, it took you 45% longer to fall asleep on average.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-indigo-700 font-semibold">Your optimal bedtime appears to be around 10:30 PM</p>
                          <p className="text-xs text-indigo-600 mt-1">You reported higher sleep quality and feeling more rested when going to bed between 10:15 PM and 10:45 PM.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 