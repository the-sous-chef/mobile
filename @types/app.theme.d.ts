declare namespace App {

    export namespace Styles {
        export type Variant =
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6'
            | 'subtitle1'
            | 'subtitle2'
            | 'body1'
            | 'body2'
            | 'caption'
            | 'button'
            | 'overline';

        export interface Color {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            A100: string;
            A200: string;
            A400: string;
            A700: string;
        }

        export type ColorPartial = Partial<Color>;

        export interface SimplePaletteColorOptions {
            light?: string;
            main: string;
            dark?: string;
            contrastText?: string;
        }

        export interface PaletteColor {
            light: string;
            main: string;
            dark: string;
            contrastText: string;
        }

        export type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

        export interface PaletteAugmentColorOptions {
            color: PaletteColorOptions;
            mainShade?: number | string;
            lightShade?: number | string;
            darkShade?: number | string;
            name?: number | string;
        }

        export interface Palette {
            common: {
                black: string,
                white: string,
            },
            type: string,
            primary: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            secondary: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            error: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            warning: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            info: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            success: {
                light: string,
                main: string,
                dark: string,
                contrastText: string,
            },
            grey: {
                50: string,
                100: string,
                200: string,
                300: string,
                400: string,
                500: string,
                600: string,
                700: string,
                800: string,
                900: string,
                A100: string,
                A200: string,
                A400: string,
                A700: string,
            },
            text: {
                primary: string,
                secondary: string,
                disabled: string,
                hint: string,
                icon: string,
            },
            divider: string,
            background: {
                paper: string,
                default: string,
            },
            action: {
                active: string,
                hover: string,
                hoverOpacity: number,
                selected: string,
                selectedOpacity: number,
                disabled: string,
                disabledBackground: string,
                disabledOpacity: number,
                focus: string,
                focusOpacity: number,
                activatedOpacity: number,
            },
        }

        export interface Spacing {
            (): string;
            (value: number): string;
            (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
            (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): string;
            (
                top: SpacingArgument,
                right: SpacingArgument,
                bottom: SpacingArgument,
                left: SpacingArgument,
            ): string;
        }

        export type SpacingArgument = number | string;

        export type SpacingFunction = (abs: number | string) => number | string;

        export type SpacingOptions =
            | number
            | Spacing
            | ((abs: number) => number | string)
            | ((abs: number | string) => number | string)
            | Array<string | number>;
    }

    export interface Theme {
        direction: string,
        palette: Styles.Palette,
        shadows: [
            'none',
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
            '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
            '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
            '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
            '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
            '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
            '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
            '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
            '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
            '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
            '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
            '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
            '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
        ],
        typography: {
            htmlFontSize: number,
            fontFamily: string,
            fontSize: number,
            fontWeightLight: number,
            fontWeightRegular: number,
            fontWeightMedium: number,
            fontWeightBold: number,
            h1: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            h2: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            h3: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            h4: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            h5: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            h6: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            subtitle1: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            subtitle2: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            body1: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            body2: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            button: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
                textTransform: string,
            },
            caption: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
            },
            overline: {
                fontFamily: string,
                fontWeight: number,
                fontSize: string,
                lineHeight: number,
                letterSpacing: string,
                textTransform: string,
            },
        },
        spacing: Styles.Spacing,
        shape: {
            borderRadius: number,
        },
        zIndex: {
            mobileStepper: number,
            speedDial: number,
            appBar: number,
            drawer: number,
            modal: number,
            snackbar: number,
            tooltip: number,
        },
    }
}
