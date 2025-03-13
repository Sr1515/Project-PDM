export const isValidFutureDate = (dateStr: string): boolean => {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    const currentDate = new Date();

    if (
        date.getFullYear() < currentDate.getFullYear() ||
        (date.getFullYear() === currentDate.getFullYear() &&
            (date.getMonth() < currentDate.getMonth() ||
                (date.getMonth() === currentDate.getMonth() && date.getDate() < currentDate.getDate())))
    ) {
        return false;
    }

    return true;
};

export const isValidDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
        return date;
    }

    return null;
};


export const isIdentificadorValidVerification = (identificador: string): boolean => {
    return (
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(identificador) ||
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(identificador)
    );
};