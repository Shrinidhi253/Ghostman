import normalWordsData from "../dataset/normal_words.json" with {type : "json"}
import hardWordsData from "../dataset/hard_words.json" with {type : "json"}

export class WordGenerator {
    allWords;
    numWords;
    word;
    wordInd;
    guessedWord;

    constructor(difficulty) {
        if (difficulty == "normal") {
            this.allWords = normalWordsData;
        }
        else if (difficulty == "hard") {
            this.allWords = hardWordsData;
        }
        
        this.numWords = Object.keys(this.allWords).length;
    }

    generateRandomWord() {
        this.wordInd = this.generateRandomInteger(0, this.numWords-1);
        this.word = this.allWords[this.wordInd]["word"];
        this.guessedWord = "_".repeat(this.word.length);
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

    buildGuessedWord(letter) {
        let builtWord = "";
        for (let i = 0; i < this.guessedWord.length; i++) {
            if (this.word[i].toLowerCase() == letter.toLowerCase()) {
                builtWord += letter;
            }
            else if (this.guessedWord[i] != "_") {
                builtWord += this.guessedWord[i];
            }
            else {
                builtWord += "_";
            }
        }

        this.guessedWord = builtWord;
    }

    getGuessedWord() {
        return this.guessedWord;
    }

    getHint() {
        let hint = this.allWords[this.wordInd]["definition"];
        return hint;
    }
}