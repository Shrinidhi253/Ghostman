import commonWordsData from "./dataset/common_words.json" with {type : "json"}
import strangeWordsData from "./dataset/strange_words.json" with {type : "json"}

export class WordGenerator {
    allWords;
    numWords;
    word;
    wordInd;

    constructor(difficulty) {
        if (difficulty == "normal") {
            this.allWords = commonWordsData;
        }
        else if (difficulty == "hard") {
            this.allWords = strangeWordsData;
        }
        
        this.numWords = Object.keys(this.allWords).length;
    }

    generateRandomWord() {
        this.wordInd = this.generateRandomInteger(0, this.numWords);
        this.word = this.allWords[this.wordInd]["word"];
        return this.word;
    }

    getWordDefinition() {
        let wordDef = this.allWords[this.wordInd]["definition"];
        return wordDef; 
    }

    generateRandomInteger(min, max, inclusive=true) {
        let randomInt;
        if (inclusive == true) {
            randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else {
            randomInt = Math.floor(Math.random() * (max - min)) + min;
        }
        return randomInt;
    }
}