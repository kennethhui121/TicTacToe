const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(cors());
app.use(express.json());


// Calculate winner
const calculateWinner = (squares) => { 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];  
  for (let i = 0; i < lines.length; i++) {    
    const [a, b, c] = lines[i];    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {      
      return squares[a];    
    }  
  }  
  return null;
};

// Bot moves
const getBotMove = (squares) => {  
  // Check if bot can win  
  for (let i = 0; i < squares.length; i++) {    
    if (!squares[i]) {      
      const botMove = squares.slice();      
      botMove[i] = 'X';       
      if (calculateWinner(botMove) === 'X') {        
        return i;       
      }    
    }  
  }

  // Check if player can win  
  for (let i = 0; i < squares.length; i++) {    
    if (!squares[i]) {      
      const botMove = squares.slice();      
      botMove[i] = 'O';       
      if (calculateWinner(botMove) === 'O') {        
        return i;       
      }    
    }  
  }

  // Take center square if can  
  if (!squares[4]) {    
    return 4;  
  }

  // Bot move if can win or stop a win  
  const availableMoves = squares.reduce((acc, square, index) => {    
    if (!square) {      
      acc.push(index);    
    }    
    return acc;  
  }, []);

  // Pick the move  
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Bot endpoint
app.post('/api/bot-move', (req, res) => {  
  const { squares } = req.body;  
  const move = getBotMove(squares);  
  res.json({ move });
});


server.listen(port, () => {  
  console.log(`Server running at http://localhost:${port}`);
});