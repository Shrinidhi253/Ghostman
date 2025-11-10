# Ghostman

This project is a halloween version of the classic hangman game. <br>
<a href="https://ghostman-halloween.netlify.app/">Click here</a> to try the game.

1. <a href="#introduction">Introduction</a>
2. <a href="#scoring-system">Scoring system</a>

## Introduction
You own a pumpkin patch, and there are 10 ghosts, each locked in a cage beside your patch.

![pumpkin patch and ghosts :)](/images/demo/start_window.png)<br><br>

You take turns guessing an unknown word.<br>

![unknown word](/images/demo/unknown_word.png) <br><br>

1. If you guess the whole word or a letter correctly, you free <em>"happy ghosts"</em> which water your patch and grow pumpkins. <br><br>

![happy ghost](/images/demo/happy_ghost.png) <br><br>

2. If you guess a letter or the word incorrectly, <em>"angry ghosts"</em> break out of their cages, and eat the pumpkins from your patch.<br><br>

![angry ghost](/images/demo/angry_ghost.png)

3. You can choose to use a hint or give up, in which case you will free the <em>"neutral ghosts"</em> which will neither grow pumpkins nor eat the ones in your patch.<br><br>

![neutral ghost](/images/demo/neutral_ghost.png) <br><br>

NOTE: You will also free a neutral ghost if you guess the same letter twice

![neutral ghost for repeated guess](/images/demo/repeated_guess.png)

4. NOTE: Your patch is small, so you can only grow a maximum of 100 pumpkins at a time. Once you have filled the patch, you can harvest all 100 pumpkins, and restart the game.<br><br>


## Scoring system

### Normal mode:
1. base increase (correct letter): +1 pumpkin <br><br>

2. base decrease (incorrect letter): -1 pumpkin <br><br>


### Hard mode:

1. base increase (correct letter): +2 pumpkins <br><br>

2. base decrease (incorrect letter): -2 pumpkins <br><br>


### Guessing word:

1. correct word: <b>base increase + 1</b> for each remaining ghost <br><br>

2. incorrect word: <b>base decrease - 1</b> for each remaining ghost <br><br>