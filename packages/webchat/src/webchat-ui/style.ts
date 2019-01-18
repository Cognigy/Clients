import styledOriginal, { CreateStyled } from '@emotion/styled';
import tinycolor from 'tinycolor2';

export interface IWebchatTheme {
    primaryColor: string;
    primaryContrastColor: string;

    actionColor: string;
    actionContrastColor: string;

    lightGreyColor: string;
    lightGreyContrastColor: string;

    unitSize: number;
    blockSize: number;
    cornerSize: number;
    
    fontFamily: string;
}

export const transformContrastColor = (color: string) => tinycolor(color)
    .setAlpha(.95)
    .toHslString();

export const getContrastColor = (color: string) => transformContrastColor(tinycolor(color).isLight()
    ? 'black'
    : 'white');

export const getActionColor = (color: string) => tinycolor(color).triad()[2].brighten(5).toHslString()

const cognigyBlue = '#3f51b5';

export const createWebchatTheme = (theme: Partial<IWebchatTheme> = {}): IWebchatTheme => {
    if (!theme.primaryColor)
        theme.primaryColor = cognigyBlue;

    if (!theme.primaryContrastColor)
        theme.primaryContrastColor = getContrastColor(theme.primaryColor);


    if (!theme.actionColor)
        theme.actionColor = theme.primaryColor;

    if (!theme.actionContrastColor)
        theme.actionContrastColor = getContrastColor(theme.actionColor);


    if (!theme.lightGreyColor)
        theme.lightGreyColor = '#e6e6e6';

    if (!theme.lightGreyContrastColor)
        theme.lightGreyContrastColor = getContrastColor(theme.lightGreyColor);


    if (!theme.unitSize)
        theme.unitSize = 8;

    if (!theme.blockSize)
        theme.blockSize = theme.unitSize * 7;

    if (!theme.cornerSize)
        theme.cornerSize = theme.unitSize / 2;


    if (!theme.fontFamily)
        theme.fontFamily = 'sans-serif'


    return theme as IWebchatTheme;
}

export interface IColorProps { color?: 'action' | 'primary' };

export const styled = styledOriginal as CreateStyled<IWebchatTheme>;