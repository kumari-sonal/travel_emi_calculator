const { addDays, isDateWithinRange, isValidDate } = require('../utils/dateUtils');

exports.calculateEmi = ({ booking_date, checkin_date, down_payment, amount, instalment_type, no_of_emi }) => {
    if (!isValidDate(booking_date) || !isValidDate(checkin_date)) {
        throw new Error('Invalid date format');
    }

    const daysToCheckin = Math.ceil((new Date(checkin_date) - new Date(booking_date)) / (1000 * 60 * 60 * 24));

    // Rule 2: If Check-In date is within 30 days, EMI is not available
    if (daysToCheckin <= 30) {
        return {
            emi_available: false,
            data: [],
            message: 'EMI is not available as the check-in date is within 30 days.'
        };
    }

    // Rule 1: All EMIs must complete 14 days before check-in
    const finalEmiDate = addDays(new Date(checkin_date), -14);

    // Determine down payment
    const firstEmi = down_payment ? parseFloat(down_payment) : amount * 0.25;

    // Handle case where down payment exceeds or equals the total amount
    if (firstEmi >= amount) {
        return {
            emi_available: false,
            data: [],
            message: 'No EMIs required as the down payment covers the total amount.'
        };
    }

    const remainingAmount = amount - firstEmi;

    // Calculate installment frequency and number of installments
    const installmentFrequencyDays = instalment_type === 'weekly' ? 7 : instalment_type === 'biweekly' ? 14 : 30;

    // Ensure minimum $5 per installment
    const minInstallmentAmount = 5;
    const maxEmiCount = Math.floor((daysToCheckin - 14) / installmentFrequencyDays);
    no_of_emi = no_of_emi || Math.min(Math.ceil(remainingAmount / minInstallmentAmount), maxEmiCount);

    // Adjust installment amount based on recalculated EMI count
    const installmentAmount = remainingAmount / no_of_emi;

    if (installmentAmount < minInstallmentAmount) {
        throw new Error('Installment amount cannot be less than $5');
    }

    // Generate EMI schedule
    const emiData = [];
    let nextEmiDate = new Date(booking_date);

    // Add first EMI
    emiData.push({ emi_date: booking_date, amount: parseFloat(firstEmi.toFixed(2)) });

    // Add remaining EMIs
    for (let i = 1; i <= no_of_emi; i++) {
        nextEmiDate = addDays(nextEmiDate, installmentFrequencyDays);

        if (nextEmiDate > finalEmiDate) {
            throw new Error('EMI schedule exceeds the allowed timeline before check-in.');
        }

        emiData.push({
            emi_date: nextEmiDate.toISOString().split('T')[0],
            amount: parseFloat(installmentAmount.toFixed(2)),
        });
    }

    return {
        emi_available: true,
        data: emiData,
    };
};
