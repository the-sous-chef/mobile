function getPath(
    // eslint-disable-next-line @typescript-eslint/ban-types
    obj: App.Styles.SpacingOptions,
    path: string,
// eslint-disable-next-line @typescript-eslint/ban-types
): App.Styles.SpacingArgument | App.Styles.SpacingArgument[] | null | App.Styles.SpacingFunction {
    if (!path || typeof path !== 'string') {
        return null;
    }

    // @ts-ignore
    return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

function createUnaryUnit(
    theme: { spacing: App.Styles.SpacingOptions },
    themeKey: string,
    defaultValue: number,
    propName: string,
): App.Styles.SpacingFunction | (() => undefined) {
    // @ts-ignore
    const themeSpacing = getPath(theme, themeKey) || defaultValue;

    if (typeof themeSpacing === 'number') {
        return (abs: string | number): string | number => {
            if (typeof abs === 'string') {
                return abs;
            }

            if (process.env.NODE_ENV !== 'production') {
                if (typeof abs !== 'number') {
                    console.error(
                        `Material-UI: Expected ${propName} argument to be a number or a string, got ${abs}.`,
                    );
                }
            }
            return themeSpacing * abs;
        };
    }

    if (Array.isArray(themeSpacing)) {
        return (abs: string | number): string | number => {
            if (typeof abs === 'string') {
                return abs;
            }

            if (process.env.NODE_ENV !== 'production') {
                if (!Number.isInteger(abs)) {
                    console.error(
                        [
                            `The \`theme.${themeKey}\` array type cannot be combined with non integer values.`
                            + `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`,
                        ].join('\n'),
                    );
                } else if (abs > themeSpacing.length - 1) {
                    console.error(
                        [
                            `The value provided (${abs}) overflows.`,
                            `The supported values are: ${JSON.stringify(themeSpacing)}.`,
                            `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`,
                        ].join('\n'),
                    );
                }
            }

            return themeSpacing[abs];
        };
    }

    if (typeof themeSpacing === 'function') {
        return themeSpacing;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error(
            [
                `The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`,
                'It should be a number, an array or a function.',
            ].join('\n'),
        );
    }

    return (): undefined => undefined;
}

const createSpacing = (spacingInput: App.Styles.SpacingOptions = 8): App.Styles.Spacing => {
    // Already transformed.
    if ((spacingInput as any).mui) {
        return spacingInput as App.Styles.Spacing;
    }

    // Material Design layouts are visually balanced. Most measurements align to an 8dp grid,
    // which aligns both spacing and the overall layout.
    // Smaller components, such as icons and type, can align to a 4dp grid.
    // https://material.io/design/layout/understanding-layout.html#usage
    const transform = createUnaryUnit({
        spacing: spacingInput,
    }, 'spacing', 8, 'spacing');

    const spacing = (...args: Array<number | string>): string => {
        if (process.env.NODE_ENV !== 'production') {
            if (!(args.length <= 4)) {
                console.error(
                    `Too many arguments provided, expected between 0 and 4, got ${args.length}`,
                );
            }
        }

        if (args.length === 0) {
            // eslint-disable-next-line no-param-reassign
            args[0] = 1;
        }

        return args
            .map((argument) => {
                const output = transform(argument);

                return typeof output === 'number' ? `${output}px` : output;
            })
            .join(' ');
    };

    return spacing;
};

export const getTheme = (): App.Theme => ({
    direction: 'ltr',
    palette: {
        common: {
            black: '#000',
            white: '#fff',
        },
        type: 'dark',
        error: {
            light: '#f30909',
            main: '#e00808',
            dark: '#a10524',
            contrastText: '#fff',
        },
        primary: {
            light: '#2ba8e0',
            main: '#0099e0',
            dark: '#006196',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e6e6e6',
            main: '#c8cbcc',
            dark: '#919699',
            contrastText: '#00111a',
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)',
            icon: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#d5d5d5',
            A200: '#aaaaaa',
            A400: '#303030',
            A700: '#616161',
        },
        background: {
            paper: '#424242',
            default: '#303030',
        },
        action: {
            active: '#fff',
            hover: 'rgba(255, 255, 255, 0.08)',
            hoverOpacity: 0.0,
            selected: 'rgba(255, 255, 255, 0.16)',
            selectedOpacity: 0.16,
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(255, 255, 255, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.24,
        },
    },
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
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 400,
        fontWeightBold: 600,
        htmlFontSize: 16,
        h1: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 300,
            fontSize: '6rem',
            lineHeight: 1.167,
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 300,
            fontSize: '3.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: 1.167,
            letterSpacing: '0em',
        },
        h4: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
        },
        h5: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '1.5rem',
            lineHeight: 1.334,
            letterSpacing: '0em',
        },
        h6: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
        },
        subtitle1: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.75,
            letterSpacing: '0.00938em',
        },
        subtitle2: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.57,
            letterSpacing: '0.00714em',
        },
        body1: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
        },
        body2: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
        },
        button: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            textTransform: 'uppercase',
        },
        caption: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            letterSpacing: '0.03333em',
        },
        overline: {
            fontFamily: 'open-sans, "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 2.66,
            letterSpacing: '0.08333em',
            textTransform: 'uppercase',
        },
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
    spacing: createSpacing(8),
});
