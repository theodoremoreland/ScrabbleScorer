String.prototype.isVowel = function () {
    let vowels = ["a", "e", "i", "o", "u"];
    if (vowels.includes(this[0].toLowerCase())) {
        return 3;
    } else if (this[0] === " ") {
        return 0;
    } else {
        return 1;
    }
};

module.exports = String.prototype.isVowel;