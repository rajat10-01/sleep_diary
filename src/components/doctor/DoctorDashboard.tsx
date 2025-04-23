'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, Typography, Grid, Avatar, Chip, Button, CircularProgress, Box, Paper, Divider } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat, Person, CalendarToday, Timer } from '@mui/icons-material';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

type Patient = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  sleepData: {
    averageQuality: number;
    averageRested: number;
    sleepTrend: 'improving' | 'declining' | 'neutral';
    lastEntry: string | null;
    entryCount: number;
  };
};

const DoctorDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before doing anything with the session
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only fetch data when component is mounted and session is available
    if (!mounted) return;

    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [mounted]);

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

  // Show loading state for both data fetching and initial component mounting
  if (loading || !mounted) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Doctor Dashboard
      </Typography>
      
      <Grid container spacing={4} className="mb-4">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Patients</Typography>
              <Typography variant="h3">{patients.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Patients With Recent Entries</Typography>
              <Typography variant="h3">
                {patients.filter(p => p.sleepData.lastEntry).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Average Sleep Quality</Typography>
              <Typography variant="h3">
                {patients.length > 0 
                  ? (patients.reduce((sum, p) => sum + p.sleepData.averageQuality, 0) / patients.length).toFixed(1)
                  : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom className="mt-8 mb-4">
        Patient List
      </Typography>

      {patients.length === 0 ? (
        <Paper className="p-6 text-center">
          <Typography variant="body1">No patients assigned to you yet.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} md={6} lg={4} key={patient.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={patient.image || undefined} className="mr-3">
                      {patient.name ? patient.name[0] : 'P'}
                    </Avatar>
                    <Typography variant="h6">{patient.name || 'Anonymous Patient'}</Typography>
                  </Box>
                  
                  <Divider className="my-2" />
                  
                  <Grid container spacing={2} className="my-2">
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Sleep Quality</Typography>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" className="mr-1">
                          {patient.sleepData.entryCount > 0 ? patient.sleepData.averageQuality : 'N/A'}
                        </Typography>
                        {patient.sleepData.entryCount > 0 && getTrendIcon(patient.sleepData.sleepTrend)}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Rested Rating</Typography>
                      <Typography variant="body1">
                        {patient.sleepData.entryCount > 0 ? patient.sleepData.averageRested : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box display="flex" alignItems="center" className="my-2">
                    <CalendarToday fontSize="small" className="mr-1" />
                    <Typography variant="body2">
                      {patient.sleepData.lastEntry 
                        ? `Last entry: ${formatDistanceToNow(new Date(patient.sleepData.lastEntry), { addSuffix: true })}` 
                        : 'No entries yet'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" className="my-2">
                    <Timer fontSize="small" className="mr-1" />
                    <Typography variant="body2">
                      {patient.sleepData.entryCount} sleep {patient.sleepData.entryCount === 1 ? 'entry' : 'entries'}
                    </Typography>
                  </Box>
                  
                  <Box mt={2}>
                    <Link href={`/patient/${patient.id}`} passHref>
                      <Button variant="contained" color="primary" fullWidth>
                        View Sleep Data
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default DoctorDashboard; 