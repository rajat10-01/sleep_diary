'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

type PatientCardProps = {
  patient: {
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
  onClick?: () => void;
};

export default function PatientCard({ patient, onClick }: PatientCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return '📈';
      case 'declining':
        return '📉';
      default:
        return '📊';
    }
  };

  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={patient.image || undefined} sx={{ mr: 2 }}>
            {patient.name ? patient.name[0] : 'P'}
          </Avatar>
          <Typography variant="h6">{patient.name || 'Anonymous Patient'}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Sleep Quality</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>
              {patient.sleepData.entryCount > 0 ? patient.sleepData.averageQuality.toFixed(1) : 'N/A'}
            </Typography>
            {patient.sleepData.entryCount > 0 && 
              <span>{getTrendIcon(patient.sleepData.sleepTrend)}</span>
            }
          </Box>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Last Entry</Typography>
          <Typography variant="body1">
            {patient.sleepData.lastEntry 
              ? formatDistanceToNow(new Date(patient.sleepData.lastEntry), { addSuffix: true }) 
              : 'No entries yet'}
          </Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Total Entries</Typography>
          <Typography variant="body1">
            {patient.sleepData.entryCount}
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            // Implement view details action
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
} 