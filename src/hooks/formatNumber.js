
const formatNumber = (num) => {
    if (num < 1000) return num.toString();
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    if (remainder === 0) {
        return thousands + 'k';
    }
    else {
        return thousands + 'k+';
    }
}
export default formatNumber;