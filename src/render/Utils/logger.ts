const LABEL_STYLE = 'padding: 4px 8px; border-radius: 4px; background: #36cfc9; color: #fff;'
const LEVEL_STYLE = {
    VERBOSE: 'margin: 0 4px; padding: 2px 4px; border-radius: 4px; background: #59595933; color: #595959',
    INFO: 'margin: 0 4px; padding: 2px 4px; border-radius: 4px; background: #23780433; color: #237804',
    WARN: 'margin: 0 4px; padding: 2px 4px; border-radius: 4px; background: #ad680033; color: #ad6800',
    ERROR: 'margin: 0 4px; padding: 2px 4px; border-radius: 4px; background: #a8071a33; color: #a8071a',
}

type Level = 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR' | 0 | 1 | 2 | 3

const LEVEL_MAP: { [k in Level]: number } = {
    VERBOSE: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    0: 0,
    1: 1,
    2: 2,
    3: 3
}

class Logger {
    #level: number

    /**
     * @param level 0: VERBOSE, 1: INFO, 2: WARN, 3: ERROR (both string and number are supported, if not match, default to VERBOSE)
     */
    constructor(level: Level = 'VERBOSE') {
        this.#level = LEVEL_MAP[level] ?? 0
    }

    public setLevel(level: Level): void {
        this.#level = LEVEL_MAP[level]
    }

    public debug(...message: unknown[]): void {
        console.log(...message)
    }

    public verbose(message: unknown): void {
        if(this.#level > 0) return
        console.log(`%cCATALYSTPLUS%cVERBOSE%c${ message }`, LABEL_STYLE, LEVEL_STYLE.VERBOSE, 'color: #595959cc')
    }

    public info(message: unknown): void {
        if(this.#level > 1) return
        console.log(`%cCATALYSTPLUS%c INFO %c${ message }`, LABEL_STYLE, LEVEL_STYLE.INFO, 'color: #237804cc')
    }

    /**
     * @param message -- custom warning message
     * @param causeBy -- indicate what causes the warning. or just use `true` for trace log
     */
    public warn(message: unknown, causeBy?: any): void {
        if(this.#level > 2) return
        console.log(`%cCATALYSTPLUS%cWARNING%c${ message }`, LABEL_STYLE, LEVEL_STYLE.WARN, 'color: #ad6800cc')

        if(!causeBy) return
        console.trace('👇 trace of this warn\n', causeBy)
    }

    /**
     * @param message -- custom error message
     * @param causeBy -- indicate what causes the error. or just use `true` for trace log
     */
    public error(message: unknown, causeBy?: any): void {
        if(this.#level > 3) return
        console.log(`%cCATALYSTPLUS%c ERROR %c${ message }`, LABEL_STYLE, LEVEL_STYLE.ERROR, 'color: #a8071acc')

        if(!causeBy) return
        console.trace('👇 trace of this error\n', causeBy)
    }
}

/**
 * default logger
 */
const logger = new Logger()


export { logger }
