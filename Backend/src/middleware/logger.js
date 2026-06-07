import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGS_DIR = path.join(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Helper to write lines to log files
const appendToLog = (filename, message) => {
    fs.appendFile(path.join(LOGS_DIR, filename), message, (err) => {
        if (err) {
            console.error(`Failed to write to ${filename}:`, err);
        }
    });
};

function getTimestamp() {
    return new Date().toISOString();
}

export const requestLogger = (req, res, next) => {
    const start = process.hrtime();
    const timestamp = getTimestamp();

    res.on('finish', () => {
        const diff = process.hrtime(start);
        const duration = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);
        const { method, originalUrl, ip } = req;
        const statusCode = res.statusCode;
        const userAgent = req.headers['user-agent'] || 'unknown';

        const logMessage = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip} - UA: ${userAgent}\n`;

        // Color codes for console output
        let colorCode = '\x1b[0m'; // Reset
        if (statusCode >= 500) {
            colorCode = '\x1b[31m'; // Red
        } else if (statusCode >= 400) {
            colorCode = '\x1b[33m'; // Yellow
        } else if (statusCode >= 300) {
            colorCode = '\x1b[36m'; // Cyan
        } else if (statusCode >= 200) {
            colorCode = '\x1b[32m'; // Green
        }

        console.log(`${colorCode}${logMessage.trim()}\x1b[0m`);

        // Write to access log file
        appendToLog('access.log', logMessage);

        // Also write to error log file if status indicates a client or server error
        if (statusCode >= 400) {
            appendToLog('error.log', logMessage);
        }
    });

    next();
};

export const errorLogger = (err, req, res, next) => {
    const timestamp = getTimestamp();
    const { method, originalUrl, ip } = req;
    const errorStack = err.stack || err.message || err;

    const logMessage = `[${timestamp}] UNHANDLED ERROR ${method} ${originalUrl} - IP: ${ip}\nMessage: ${err.message}\nStack: ${errorStack}\n\n`;

    console.error(`\x1b[31m[${timestamp}] ERROR: ${err.message}\n${errorStack}\x1b[0m`);

    appendToLog('error.log', logMessage);

    next(err);
};
