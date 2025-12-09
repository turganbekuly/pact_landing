import React from 'react';

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}