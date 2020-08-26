import config from 'App/config';
import largeNumbersNames from './large.number.names';

function limitLoop(fn: Function, fps: number = 60) {
    let then = new Date().getTime();
    let interval = 1000 / fps;

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

    return (function loop(time) {
        requestAnimationFrame(loop);

        let now = new Date().getTime();
        let delta = now - then;

        if (delta > interval) {
            // Update time
            // now - (delta % interval) is an improvement over just 
            // using then = now, which can end up lowering overall fps
            then = now - (delta % interval);

            fn();
        }
    }(0));
}

function secondsToTime(duration: number): string {
    let seconds: string | number = Math.floor(duration % 60);
    let minutes: string | number = Math.floor((duration / 60) % 60);
    let hours: string | number = Math.floor((duration / 3600) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

function roundNum(num: number): number {
    return Math.round((num + Number.EPSILON) * config.ROUND_AMOUNT) / config.ROUND_AMOUNT;
}

function formatAmount(num: number, limit: number = 1000000, fixed: number = 2): string {
    if (num < 1000) {
        return num.toFixed(0);
    }
    if (num < limit) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, '$1' + config.DECIMAL_SEPARATOR);
    }
    let b: any = num.toPrecision(2).split('e');
    let k: any = b.length === 1 ? 0 : Math.floor(b[1].slice(1) / 3);
    let c: any = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed);
    let d: any = c < 0 ? c : Math.abs(c);
    let e: any = `${d} ${(largeNumbersNames[k - 2] || '')}`;
    return e;
}

function toggleClassName(cssClasses: string, condition: boolean, classToToggle: string): string {
    if (condition) {
        cssClasses += ' ' + classToToggle;
    }
    return cssClasses;
}

export {
    limitLoop,
    secondsToTime,
    roundNum,
    formatAmount,
    toggleClassName,
}