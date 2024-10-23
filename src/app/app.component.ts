import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'nya-games';

  board: string[][] = []; // Matriz que representa el tablero de 3x3. Cada celda será un string: 'X', 'O' o vacío ('')
  currentPlayer: string = 'X'; // Variable que rastrea el jugador actual, comenzando con 'X'
  winner: string = '';
  draw: string = '';

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente (parte del ciclo de vida de Angular)
    this.resetGame(); // Llama a resetGame() para inicializar el tablero vacío cuando la aplicación se carga
  }

  resetGame() {
    // Función que reinicia el juego llenando el tablero con celdas vacías
    this.board = [
      ['', '', ''], // Cada array interno representa una fila del tablero
      ['', '', ''],
      ['', '', ''],
    ];

    this.winner = '';
    this.draw = '';
  }

  makeMove(rowIndex: number, colIndex: number) {
    // Función que maneja los clics en el tablero para realizar movimientos

    if (this.winner === '') {
      if (this.board[rowIndex][colIndex] === '') {
        this.board[rowIndex][colIndex] = this.currentPlayer; // Asigna al tablero la ficha del jugador actual ('X' o 'O') en la celda seleccionada
        this.currentPlayer = this.currentPlayer === 'X' ? '0' : 'X'; // Alterna entre los jugadores 'X' y 'O' para que el siguiente jugador haga su jugada
      }

      this.checkWinner();
    }
  }

  checkWinner() {
    let hasWon = false;
    let lastPlayer = this.currentPlayer === 'X' ? '0' : 'X';

    for (let index = 0; index < this.board.length; index++) {
      if (
        // revisa filas
        (lastPlayer === this.board[0][index] &&
          lastPlayer === this.board[1][index] &&
          lastPlayer === this.board[2][index]) ||
        // revisa columnas
        (lastPlayer === this.board[index][0] &&
          lastPlayer === this.board[index][1] &&
          lastPlayer === this.board[index][2])
      ) {
        hasWon = true;
      }
    }
    if (
      // revisa diagonal desde izquieda
      lastPlayer === this.board[0][0] &&
      lastPlayer === this.board[1][1] &&
      lastPlayer === this.board[2][2]
    ) {
      hasWon = true;
    }

    if (
      // revisa diagonal desde derecho
      lastPlayer === this.board[2][0] &&
      lastPlayer === this.board[1][1] &&
      lastPlayer === this.board[0][2]
    ) {
      hasWon = true;
    }

    this.checkDraw(hasWon);

    if (hasWon) {
      this.winner = lastPlayer;
    }
  }

  checkDraw(hasWon: boolean) {
    let isFull = true;

    for (let i = 0; i < this.board.length; i++) {
      // bucle que recorre las filas
      for (let j = 0; j < this.board[i].length; j++) {
        //bucle que recorre las columnas
        if (this.board[i][j] === '') {
          isFull = false;
        }
      }
    }

    if (hasWon === false && isFull === true) {
      this.draw = 'Draw';
    }
  }
}
