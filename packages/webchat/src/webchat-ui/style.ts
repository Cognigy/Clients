import styledOriginal, { CreateStyled } from '@emotion/styled';
import tinycolor from 'tinycolor2';

export interface IWebchatTheme {
    primaryColor: string;
    primaryStrongColor: string;
    primaryWeakColor: string;
    primaryContrastColor: string;

    greyColor: string;
    greyStrongColor: string;
    greyWeakColor: string;
    greyContrastColor: string;

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

const strong = (color: string) =>
    (tinycolor(color).isLight()
        ? tinycolor(color).lighten()
        : tinycolor(color).darken())
        .toHslString()

const weak = (color: string) =>
    (tinycolor(color).isLight()
        ? tinycolor(color).darken()
        : tinycolor(color).lighten())
        .toHslString()

const cognigyBlue = '#3f51b5';


export const createWebchatTheme = (theme: Partial<IWebchatTheme> = {}): IWebchatTheme => {
    if (!theme.primaryColor)
        theme.primaryColor = cognigyBlue;

    if (!theme.primaryWeakColor)
        theme.primaryWeakColor = weak(theme.primaryColor);

    if (!theme.primaryStrongColor)
        theme.primaryStrongColor = strong(theme.primaryColor);

    if (!theme.primaryContrastColor)
        theme.primaryContrastColor = getContrastColor(theme.primaryColor);


    if (!theme.greyColor)
        theme.greyColor = '#e6e6e6';

    if (!theme.greyWeakColor)
        theme.greyWeakColor = weak(theme.greyColor);

    if (!theme.greyStrongColor)
        theme.greyStrongColor = strong(theme.greyColor);

    if (!theme.greyContrastColor)
        theme.greyContrastColor = getContrastColor(theme.greyColor);


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

export interface IColorProps { color?: 'primary' | 'default' };

export const styled = styledOriginal as CreateStyled<IWebchatTheme>;