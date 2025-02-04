export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social: {
    linkedin: string;
    github: string;
  };
  availability: {
    status: 'available' | 'busy' | 'not available';
    message: string;
  };
}

export const contact: ContactInfo = {
  email: 'vanshsoniofficial@gmail.com',
  phone: '+91 9104039861',
  location: 'Bangalore, INDIA',
  social: {
    linkedin: 'https://www.linkedin.com/in/vansh-soni-7b918524a/',
    github: 'https://github.com/eark749',
  },
  availability: {
    status: 'available',
    message: 'Open to collaboration and new opportunities',
  },
};
