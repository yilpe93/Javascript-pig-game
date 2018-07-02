/*
GAME RULES: 

- 두명의 플레이어가 필요하다.
- 매 턴마다 플레이어는 자신이 원하는 만큼 주사위를 굴린다. 각 결과는 ROUND 점수에 추가된다.
- 플레이어가 주사위를 굴려 1이 나오면 해당 턴의 ROUND 점수가 사라지며 다음 선수의 턴으로 넘어간다.
- 플레이어는 'HOLD'를 선택할 수 있다. ROUND 점수가 GLOBAL 점수에 추가되고 다음 선수의 턴으로 넘어간다.
- GLOBAL 점수가 100점에 먼저 도달한 플레이어가 승리한다.

/*
  1. 기본 게임 변수 만들기
  2. 난수 생성 방법
  3. DOM 조작 방법
  4. DOM 읽는 방법
  5. CSS 변환 방법
*/

// 각 플레이어의 점수를 정의한다.
/*
좀 더 깔끔한 표현을 위해 하나의 변수로 지정하려 한다. 배열을 사용하자
var score1 = 0;
var score2 = 0;
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// 주사위 만들기
/* 
// Math()
Math.random() : 0 ~ 1 사이의 난수
Math.floor() : 가장 가까운 정수로 내림한다. 소숫점 이하의 값을 제거한 정수를 취득
*/

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// document.querySelector('.btn-roll').addEventListener('click', btn)
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score If the rolled number was Not a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }  
  }  
})

// addEventListener(events, callback)

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  // reset
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // toggle
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}