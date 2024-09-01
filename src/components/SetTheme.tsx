import { FC, useEffect, useState } from 'react';

type Theme = 'light' | 'dark'

interface OwnProps {
  defaultTheme?: Theme;
}

const SetTheme: FC<OwnProps> = (props) => {
  const { defaultTheme  = 'light'} = props;

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
};

export default SetTheme;