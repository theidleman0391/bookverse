import React from 'react';

export interface Book {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}