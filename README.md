# Ghostman

This project is a halloween twist on the classic Hangman game where your goal is to not hang a man, but to free as many ghosts as you can.

**Rules:**
- There are 10 ghosts trapped in a cage near your pumpkin patch.
![alt text](/images/demo/game_beginning.png)

- When YOU free a ghost, it will thank you by watering your pumpkin patch, growing 1 pumpkin.
![alt text](/images/demo/grow_pumpkin.png)

- If a ghost breaks out of the cage by itself, then it will eat a pumpkin from your patch.
![alt text](/images/demo/eat_pumpkin.png)

You can free a ghost by:
- taking turns to guess an unknown word.
- In every turn you can choose to guess a letter or the entire word.
![alt text](/images/demo/unknown_word.png)

- If you guess a letter correctly, all occurrences of the letter will be revealed. and you will free one of the ghosts.
![alt text](/images/demo/guessing_letter.png)

    ![alt text](/images/demo/correct_letter.png)

- You can use HINT and get the dictionary definition of the unknown word. This will free a "neutral" ghost. This ghost will neither water your patch, nor eat your pumpkins.
![alt text](/images/demo/hint_used.png)
![alt text](/images/demo/neutral_ghost.png)

- When you guess the entire word correctly, all the remaining ghosts are freed and all of them will water your patch. These ghosts are extra-grateful and will grow <em><b>twice</b></em> the number of pumpkins than the one you released by guessing a letter.
![alt text](/images/demo/guessing_word.png)
![alt text](/images/demo/correct_word.png)

A ghost breaks out of the cage by itself when:
- you guess a letter incorrectly
![alt text](/images/demo/incorrect_letter.png)
- all the remaining ghosts break out of their cages when guess the entire word incorrectly.
![alt text](/images/demo/incorrect_word.png)
- Each of these ghosts eat one pumpkin from your patch.


Also, your pumpkin patch is not so big. So you can only grow a maximum of 100 pumpkins :(