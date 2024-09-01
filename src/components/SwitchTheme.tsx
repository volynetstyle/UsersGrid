import { FC,  useEffect, useState } from 'react';
import useLastCallback from '../lib/hooks/useLastCallback';
import s from './SwitchTheme.module.scss';

type Theme = 'light' | 'dark';

interface OwnProps {
  defaultTheme?: Theme;
}

const SwitchTheme: FC<OwnProps> = ({ defaultTheme = 'light' }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useLastCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  });

  return (
    <div className={s.container}>
      <button className={s.button}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default SwitchTheme;
