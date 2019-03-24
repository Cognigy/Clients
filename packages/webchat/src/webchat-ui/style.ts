import styledOriginal, { CreateStyled } from '@emotion/styled';
import tinycolor from 'tinycolor2';
import { join } from 'path';

export interface IWebchatTheme {
    primaryColor: string;
    primaryStrongColor: string;
    primaryWeakColor: string;
    primaryContrastColor: string;
    primaryGradient: string;

    greyColor: string;
    greyStrongColor: string;
    greyWeakColor: string;
    greyContrastColor: string;

    shadow: string;

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

const getGradient = (color: string) => {

    const base = tinycolor(color);
    const analog = base.analogous(2, .3);

    const amount = 15;
    const left = base.clone().spin(-amount).brighten(1);
    const right = base.clone().spin(amount);

    const gradient = `linear-gradient(190deg, ${left}, ${right})`;

    console.log({ base, analog, gradient });

    return gradient;
}

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

    if (!theme.primaryGradient)
        theme.primaryGradient = getGradient(theme.primaryColor);

    
    if (!theme.shadow)
        theme.shadow = '0 5px 18px 0 rgba(151, 124, 156, 0.2), 0 5px 32px 0 rgba(203, 195, 212, 0.2), 0 8px 58px 0 rgba(216, 212, 221, 0.1)';



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

export interface IColorProps { color?: 'primary' | 'default' | 'grey' };

export const styled = styledOriginal as CreateStyled<IWebchatTheme>;