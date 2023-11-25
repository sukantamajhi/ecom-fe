import pino from "pino"

const logger = pino({
    level: "error",
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

export default logger