// в хроме из-за расширений могут некорекктно работать console.log
// кастомный console.log

export const debugLog = (...args) => {
    try {
        console.log(...args);
    } catch (e) {
        alert(args.map(a => JSON.stringify(a)).join(' '));
    }
};

