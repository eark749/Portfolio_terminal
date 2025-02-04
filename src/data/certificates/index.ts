export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link: string;
  category: 'ai' | 'cloud' | 'development';
}

export const certificates: Certificate[] = [
  {
    name: 'AWS Data engineer',
    issuer: 'UDEMY',
    date: '2024',
    link: 'https://www.udemy.com/certificate/UC-0d1d36ff-8511-4dfd-853a-3dcaf8a589a4/',
    category: 'cloud',
  },
  {
    name: 'Machine Learning Engineer',
    issuer: 'Deeplearning.ai',
    date: '2024',
    link: 'https://coursera.org/share/d5d7ea66de585a280cd166d72ae3fedc',
    category: 'ai',
  },
  {
    name: 'Data Processing and Manipulation',
    issuer: 'University of Colorado Boulder',
    date: '2024',
    link: 'https://coursera.org/share/a70adc36236bd13f3ef9f04308a70342',
    category: 'ai',
  },
  {
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    date: '2022',
    link: 'https://www.credly.com/badges/ABCD1234',
    category: 'cloud',
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2023',
    link: 'https://www.tensorflow.org/certificate/ABCD1234',
    category: 'development',
  },
];
