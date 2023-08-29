
import cls from './ThemeSwitcher.module.scss';
import LightIcon from '../../../../shared/assets/icons/theme-dark 1.svg';
import DarkIcon from '../../../../shared/assets/icons/theme-light 1.svg';
import { useTheme } from '../../../../app/providers/ThemeProvider/lib/useTheme';
import Button, { ThemeButton } from '../../button/button';
import { classNames } from '../../../lib/classNames/classNames';
import { Theme } from '../../../../app/providers/ThemeProvider/lib/ThemeContext';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();


    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className ||''])}
            onClick={toggleTheme}
        >
            {theme === Theme.NORMAL ? <DarkIcon  /> : <LightIcon />}
        </Button>
    );
};

