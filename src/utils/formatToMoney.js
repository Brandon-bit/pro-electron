export const formatToMoney = (value, locale = 'es-MX', currency = 'MXN') => {
    return value.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    });
};
//# sourceMappingURL=formatToMoney.js.map