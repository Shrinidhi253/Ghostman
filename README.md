# Hangman

**Rules:**
- Take turns guessing the letters in a word
- If you get a letter right, all occurrences of the letter will be revealed
- If you get it wrong, you hang a body part :)
- You have 6 body parts to hang (6 chances) - head, torso, left arm, right arm, left leg, right leg
- You can choose to guess a letter or the entire word on every chance
- You have only one chance to guess the entire word. So if you guess the word wrong, you will be hanged (entirely).
- You can have 1 hint, which will reveal the definition of the word.

- If you guess a word without hints, you get 1 point for each body part not hanged, i.e.
  - guess it on the first try - 6 points,
  - head hanged - 5 points,
  - head and torso hanged - 4 points
  - head, torso and one arm hung - 3 points,
  - head, torso and both arms hung - 2 points,
  - head, torso, both arms, and one leg hanged - 1 point
  - entire body hanged - 0 points
  
 - If you used a hint and guessed the word correctly, you only get 0.5 points regardless of how many body parts have been hung.
 - This goes without saying, but if you used a hint and did not guess the word correctly, you get 0 points.
   
 - For words that are longer than 6 characters, you get 50% bonus points for guessing correctly, i.e.
   - If you guessed it on the first try, you will get 6 + 3 = 9 points
   - Second try, you will get 5 + 2.5 = 7.5 points
   - Third try, you will get 4 + 2 = 6 points and so on
