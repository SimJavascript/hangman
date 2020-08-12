class Hangman {
    constructor() {
        this.wordsToGuess = ["html", "css", "javascript", "php", "python", "rust", "java", "swift", "ruby", "scala", "scheme"];
        this.word = this.wordsToGuess[Math.floor(Math.random() * this.wordsToGuess.length)];
        this.wordLength = this.word.length;
        this.score = 0
        this.hangmanParts = 0
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.center = this.canvas.width / 2;
    }

    resetGame() {
        document.getElementById("reset").onclick = () => document.location.reload(true);
    }

    myKeyboard() {
        let divKeyboard = document.getElementById("keyboard");
        for (let char = 97; char < 122; char++) {
            let letter = String.fromCharCode(char);
            let btn = document.createElement("button");
            btn.setAttribute("id", "btn" + letter);
            btn.innerHTML = letter;
            divKeyboard.appendChild(btn);
        }
    }

    hiddenWord() {
        let divWord = document.getElementById("wordPrint");
        for (let loop = 0; loop < this.word.length; loop++) {
            let divContainer = document.createElement("span");
            divContainer.setAttribute("id", "wordContainer" + loop);
            divContainer.innerHTML = "_";
            divWord.appendChild(divContainer);
        }
    }

    getLetter() {
        let letter = event.target.innerHTML;
        game.checkLetter(letter);
    }

    checkLetter(letter) {
        let containLetter = false;
        for (let charTest = 0; charTest < this.word.length; charTest++) {
            if (letter == this.word[charTest]) {
                this.goodLetter(letter, charTest);
                document.getElementById("score").innerHTML = "Score: " + this.score;
                containLetter = true;
            } else {
                this.wrongLetter(letter, charTest);
            }
        }
        if (!containLetter) {
            this.hangmanParts += 1;
            document.getElementById("try").innerHTML = "Try: " + (this.hangmanParts + 1) + " out of 6";
            this.draw();
        }
    }

    goodLetter(letter, charTest) {
        this.score += 100
        document.getElementById("wordContainer" + charTest).innerHTML = letter;
        document.getElementById("btn" + letter).setAttribute("disabled", true);
        console.log(this.score);
        this.checkEnd();
    }

    wrongLetter(letter) {
        document.getElementById("btn" + letter).setAttribute("disabled", true);
        this.checkEnd();
    }

    checkEnd() {
        if (this.score == this.word.length * 100) {
            document.getElementById("keyboard").style.visibility = "hidden";
            document.getElementById("try").style.visibility = "hidden";
            document.getElementById("winLoose").innerHTML = "YOU WON!!!!";
            document.getElementById("canvas").style.backgroundColor = "green";
        } else if (this.hangmanParts == 5) {
            document.getElementById("keyboard").style.visibility = "hidden";
            document.getElementById("try").style.visibility = "hidden";
            document.getElementById("winLoose").innerHTML = "YOU LOST!!!!";
            document.getElementById("canvas").style.backgroundColor = "red";

        }
    }

    clickKeyboard() {
        document.getElementById('keyboard').addEventListener('click', this.getLetter);
    }

    // CANVAS

    hang() {
        this.ctx.strokeStyle = "dark brown";
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 75);
        this.ctx.lineTo(this.center, 50);
        this.ctx.lineTo(this.center - 100, 50);
        this.ctx.lineTo(this.center - 150, 400);
        this.ctx.lineTo
        this.ctx.stroke();
    }

    head() {
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.arc(this.center, 100, 25, 0, Math.PI * 2, true);
        this.ctx.stroke();
    }

    body(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 125);
        this.ctx.lineTo(this.center, 220);
        this.ctx.stroke();
    }

    arm1(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 140);
        this.ctx.lineTo(this.center - 50, 180);
        this.ctx.stroke();
    }

    arm2(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 140);
        this.ctx.lineTo(this.center + 50, 180);
        this.ctx.stroke();
    }

    leg1(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 220);
        this.ctx.lineTo(this.center - 50, 280);
        this.ctx.stroke();
    }

    leg2(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.center, 220);
        this.ctx.lineTo(this.center + 50, 280);
        this.ctx.stroke();
    }

    draw(){
        switch (this.hangmanParts) {
            case 1:
                this.head();
                break;

            case 2:
                this.body();
                break;

            case 3:
                this.arm1();
                break;

            case 4:
                this.arm2();
                break;

            case 5:
                this.leg1();
                break;

            case 6:
                this.leg2();
                break;

            default:
                break;
        }
    }
}

let game = new Hangman();
game.hiddenWord();
game.myKeyboard();
game.clickKeyboard();
game.resetGame();
game.hang();