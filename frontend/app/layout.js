import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import AudioPlayer from '../components/AudioPlayer';

export const metadata = {
  title: 'Nirvana Guild - Gothic Gaming Community',
  description: 'A dark fantasy guild website with real-time chat and member management',
  keywords: 'guild, gaming, gothic, community, nirvana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AudioPlayer />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
