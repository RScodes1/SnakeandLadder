import { Snake } from './snake';
import { Ladder } from './Ladder';
import { Player } from  './Player';

export class SnakeandLadderGame{
    private  WINNING_POSITION = 100;
    private  DICE_SIDES = 6;
    private snakes : Snake[] = [];
    private ladders : Ladder[] = [];
    private players : Player[] = [];
    private currentPlayerIndex: number = 0;
    private gameWon: boolean = false;
    constructor() {
        
    }

    public addSnake(head: number, tail: number): void {
        this.snakes.push(new Snake(head, tail));
    }

    public addLadder(start: number, end: number): void {
        this.ladders.push(new Ladder(start, end));
    }

    public addPlayer(name: string): void {
        this.players.push(new Player(name));
    }
 public play(): void {
        while (!this.gameWon) {
            const diceValue = this.rollDice();
            const currentPlayer = this.players[this.currentPlayerIndex];
            const currentPosition = currentPlayer.position;
            let newPosition = currentPosition + diceValue;

            if (newPosition > this.WINNING_POSITION) {
                newPosition = currentPosition;
            }

            newPosition = this.adjustPositionForSnakeOrLadder(newPosition);

            currentPlayer.position = newPosition;

            console.log(`${currentPlayer.name} rolled a ${diceValue} and moved from ${currentPosition} to ${newPosition}`);

            if (newPosition === this.WINNING_POSITION) {
                console.log(`${currentPlayer.name} wins the game`);
                this.gameWon = true;
            }

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
    }

    private rollDice(): number {
        return Math.floor(Math.random() * this.DICE_SIDES) + 1;
    }

    private adjustPositionForSnakeOrLadder(position: number): number {
        for (const snake of this.snakes) {
            if (position === snake.headPOS) {
                return snake.tailPOS;
            }
        }

        for (const ladder of this.ladders) {
            if (position === ladder.start) {
                return ladder.end;
            }
        }

        return position;
    }
}

 
// const game = new SnakeandLadderGame();

//game.addSnake(62, 5);
// game.addSnake(33, 6);
// game.addSnake(49, 9);
// game.addSnake(88, 16);
// game.addSnake(41, 20);
// game.addSnake(56, 53);
// game.addSnake(98, 64);
// game.addSnake(93, 73);
// game.addSnake(95, 75);

// game.addLadder(2, 37);
// game.addLadder(27, 46);
// game.addLadder(10, 32);
// game.addLadder(51, 68);
// game.addLadder(61, 79);
// game.addLadder(65, 84);
// game.addLadder(71, 91);
// game.addLadder(81, 100);

// game.addPlayer('Gaurav');
// game.addPlayer('Sagar');

// game.play();