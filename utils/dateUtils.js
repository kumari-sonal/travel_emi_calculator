exports.addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

exports.isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
};

exports.isDateWithinRange = (date, rangeStart, rangeEnd) => {
    const d = new Date(date);
    return d >= new Date(rangeStart) && d <= new Date(rangeEnd);
};
