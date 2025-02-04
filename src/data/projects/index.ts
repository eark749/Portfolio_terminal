export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  details: string;
  image?: string;
}

export const projects: Project[] = [
  {
    name: 'Recurrent_Neural_Network_Text_Generator',
    description:
      'Text generation system that generates 300 text samples with randomness factor of 0.2',
    technologies: [
      'Python',
      'TensorFlow',
      'Neural Networks',
      'NLP',
      'Deep Learning',
    ],
    link: 'https://github.com/eark749/RNN',
    details: `A sophisticated RNN-based text generation system featuring:
      • Implementation of RNN architecture for text generation
      • Customizable randomness factor for output diversity
      • Training pipeline for custom datasets
      • Capability to generate multiple text samples
      • Performance optimization for text generation`,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80'
  },
  {
    name: 'Drug_Discovery_Analysis',
    description:
      'Jupyter notebook-based analysis for drug discovery and molecular properties',
    technologies: [
      'Python',
      'Jupyter Notebook',
      'Pandas',
      'Scikit-learn',
      'Molecular Analysis',
    ],
    link: 'https://github.com/eark749/drug-discovery',
    details: `A comprehensive drug discovery analysis project including:
      • Molecular property analysis and prediction
      • Data preprocessing and feature engineering
      • Statistical analysis of drug compounds
      • Machine learning models for property prediction
      • Visualization of molecular properties`,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
  },
  {
    name: 'Customer_Segmentation_Analysis',
    description: 'R-based customer segmentation system for business analytics',
    technologies: ['R', 'ggplot2', 'dplyr', 'cluster', 'Statistical Analysis'],
    link: 'https://github.com/eark749/customer-segmentation',
    details: `Advanced customer segmentation analysis system featuring:
      • Customer behavior analysis
      • Clustering algorithms implementation
      • Demographic analysis
      • Purchase pattern recognition
      • Actionable business insights generation`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80'
  },
  {
    name: 'Gravitational_Slingshot_Simulator',
    description: 'Physics simulation of gravitational slingshot effect',
    technologies: [
      'Physics Simulation',
      'Mathematical Modeling',
      'Data Visualization',
      'Numerical Analysis',
    ],
    link: 'https://github.com/eark749/Gravitational-sligshot',
    details: `A physics-based simulation project that includes:
      • Accurate gravitational calculations
      • Orbital mechanics simulation
      • Interactive visualization of trajectories
      • Parameter customization
      • Energy transfer analysis`,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80'
  },
  {
    name: 'Chat_and_VoiceBot_API_Server',
    description: 'Python-based API server for chat and voice bot functionality',
    technologies: [
      'Python',
      'FastAPI',
      'Natural Language Processing',
      'Speech Recognition',
      'API Development',
    ],
    link: 'https://github.com/eark749/server',
    details: `A comprehensive API server implementation featuring:
      • Real-time chat processing
      • Voice recognition integration
      • Natural language understanding
      • Response generation
      • API endpoint management`,
    image: 'https://images.unsplash.com/photo-1611746869696-d09bce200020?auto=format&fit=crop&q=80'
  },
];