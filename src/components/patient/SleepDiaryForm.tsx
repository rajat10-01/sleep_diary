'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Slider, 
  FormHelperText, 
  CircularProgress,
  Alert,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { 
  AccessTime, 
  Bedtime, 
  WbSunny, 
  Star, 
  SentimentSatisfiedAlt, 
  NoteAdd,
  Check,
  Info
} from '@mui/icons-material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isValid, set } from 'date-fns';

interface SleepDiaryFormProps {
  onSubmitSuccess?: () => void;
}

const SleepDiaryForm: React.FC<SleepDiaryFormProps> = ({ onSubmitSuccess }) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [bedtime, setBedtime] = useState<Date | null>(null);
  const [wakeUpTime, setWakeUpTime] = useState<Date | null>(null);
  const [sleepQuality, setSleepQuality] = useState<number>(5);
  const [restedRating, setRestedRating] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState({
    date: false,
    bedtime: false,
    wakeUpTime: false
  });

  useEffect(() => {
    // Set mounted state to true
    setMounted(true);
    
    // Initialize time pickers with reasonable default times
    const today = new Date();
    const defaultBedtime = set(today, { hours: 22, minutes: 0, seconds: 0 });
    const defaultWakeup = set(today, { hours: 7, minutes: 0, seconds: 0 });
    
    setBedtime(defaultBedtime);
    setWakeUpTime(defaultWakeup);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if not mounted or no session
    if (!mounted || !session) {
      setError('Please sign in to save sleep entries');
      return;
    }
    
    // Mark all fields as touched for validation
    setTouched({
      date: true,
      bedtime: true,
      wakeUpTime: true
    });
    
    // Validate required fields
    if (!date || !bedtime || !wakeUpTime) {
      setError('Please fill out all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formattedBedtime = format(bedtime, 'HH:mm:ss');
      const formattedWakeUpTime = format(wakeUpTime, 'HH:mm:ss');
      
      const response = await fetch('/api/sleep-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          bedtime: formattedBedtime,
          wakeUpTime: formattedWakeUpTime,
          sleepQuality,
          restedRating,
          notes: notes.trim() || null,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save sleep entry');
      }
      
      // Reset form
      setDate(format(new Date(), 'yyyy-MM-dd'));
      const today = new Date();
      setBedtime(set(today, { hours: 22, minutes: 0, seconds: 0 }));
      setWakeUpTime(set(today, { hours: 7, minutes: 0, seconds: 0 }));
      setSleepQuality(5);
      setRestedRating(5);
      setNotes('');
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error('Error saving sleep entry:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getValueText = (value: number) => {
    return `${value}`;
  };

  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];

  const getSliderLabelText = (value: number, max: number) => {
    if (value === 1) return 'Very Poor';
    if (value <= 3) return 'Poor';
    if (value <= 5) return 'Average';
    if (value <= 8) return 'Good';
    if (value <= max) return 'Excellent';
    return '';
  };

  // Form validation helpers
  const getDateError = () => {
    if (touched.date && !date) return 'Date is required';
    return '';
  };
  
  const getBedtimeError = () => {
    if (touched.bedtime && !bedtime) return 'Bedtime is required';
    if (touched.bedtime && bedtime && !isValid(bedtime)) return 'Invalid time';
    return '';
  };
  
  const getWakeUpTimeError = () => {
    if (touched.wakeUpTime && !wakeUpTime) return 'Wake up time is required';
    if (touched.wakeUpTime && wakeUpTime && !isValid(wakeUpTime)) return 'Invalid time';
    return '';
  };

  // Don't render form content until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        Log Your Sleep
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          icon={<Check fontSize="inherit" />} 
          severity="success" 
          sx={{ mb: 3 }}
        >
          Sleep entry saved successfully!
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Date Selector */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onBlur={() => setTouched({ ...touched, date: true })}
              error={!!getDateError()}
              helperText={getDateError() || 'Select the date you went to sleep'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WbSunny color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* Bedtime Picker */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Bedtime"
                value={bedtime}
                onChange={(newValue) => {
                  setBedtime(newValue);
                  setTouched({ ...touched, bedtime: true });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!getBedtimeError(),
                    helperText: getBedtimeError() || 'What time did you go to bed?',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Bedtime color="primary" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Wake Up Time Picker */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Wake Up Time"
                value={wakeUpTime}
                onChange={(newValue) => {
                  setWakeUpTime(newValue);
                  setTouched({ ...touched, wakeUpTime: true });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!getWakeUpTimeError(),
                    helperText: getWakeUpTimeError() || 'What time did you wake up?',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTime color="primary" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          {/* Sleep Quality Slider */}
          <Grid item xs={12} sm={6}>
            <Typography id="sleep-quality-slider" gutterBottom>
              Sleep Quality
              <Tooltip title="How would you rate your overall sleep quality?">
                <Info fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', opacity: 0.7 }} />
              </Tooltip>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star color="primary" />
              <Slider
                value={sleepQuality}
                onChange={(_, value) => setSleepQuality(value as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                aria-labelledby="sleep-quality-slider"
              />
            </Box>
            <FormHelperText>Rate from 1 (poor) to 10 (excellent)</FormHelperText>
          </Grid>
          
          {/* Rested Rating Slider */}
          <Grid item xs={12} sm={6}>
            <Typography id="rested-rating-slider" gutterBottom>
              How Rested Do You Feel?
              <Tooltip title="How refreshed and energized do you feel after waking up?">
                <Info fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', opacity: 0.7 }} />
              </Tooltip>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SentimentSatisfiedAlt color="primary" />
              <Slider
                value={restedRating}
                onChange={(_, value) => setRestedRating(value as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                aria-labelledby="rested-rating-slider"
              />
            </Box>
            <FormHelperText>Rate from 1 (tired) to 10 (fully rested)</FormHelperText>
          </Grid>
          
          {/* Notes TextField */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="notes"
              label="Notes"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any observations about your sleep (dreams, interruptions, etc.)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <NoteAdd color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Save Sleep Entry'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SleepDiaryForm; 