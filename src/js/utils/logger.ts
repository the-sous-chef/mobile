// import Logger, { consoleTransporter } from '@vp/js-logger';

// const config = {
//     level: 'debug',
//     threaded: false,
// };
// const transports: Logger.Transport[] = [consoleTransporter];

// const logger = new Logger({
//     ...config,
//     transports,
// } as Logger.LoggerConfig);

export default function getLogger(): Console {
    return console;
}
