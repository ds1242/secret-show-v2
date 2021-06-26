module.exports = {

    format_time: time => {
        return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
    },

    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}`;
    },

    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        } else {
            return word;
        }
    },
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    }
}