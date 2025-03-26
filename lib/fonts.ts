import { 
  Inter, 
  Playfair_Display, 
  Lora, 
  JetBrains_Mono,
  Montserrat
} from 'next/font/google';

// Heading font - elegant, distinctive
export const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Alternative heading font - modern, clean
export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Another heading option - geometric, bold
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Body text font - readable serif for long-form content
export const sourceSerif = Lora({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
});

// Code font - optimized for code readability
export const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

// Font class variables for use in layout
export const fontVariables = [
  playfair.variable,
  inter.variable,
  montserrat.variable,
  sourceSerif.variable,
  jetbrainsMono.variable,
].join(' ');
