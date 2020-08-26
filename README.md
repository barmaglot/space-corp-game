# Space Corp Game

[Online demo](https://space-corp-game.herokuapp.com/ "Online demo")

Terminal command to run game locally:
```
npm start
```

The goal was to create copy of **Adventure Capitalist** game for for coding challenge. Solution includes
- Buy and upgrade businesses feature.
- Make money from a business.
- Businesses continue to make progress while you’re away.
- Hire managers

I've decided to make Managers feature a bit different from original. Player can assign any manager to any business (of course if it's affordable). And each manager has his own stats (speed and income multipliers) that affect bussiness that it's assigned.

My initial thoughts was to use [Pixijs](https://www.pixijs.com/ "Pixijs") engine so the game be fully build using canvas. But then I realized that I will not fit into given timeframes of 8-16 hours, as even though I know how canvas works, I'm not familiar with the library itself and so it will take more time to me to study it and complete the solution.

Thus I decided to use tools that I'm familliar with just to be in time.
I choosed **React** as UI for the game, and **MobX** for managing application state.

In the begining I also thought to implement backend part for storing game progress. Idea was to create simple node.js app with MongoDB database or use Firebase, but I ended with only front-end solution with saving game state in `localStorage` for the sake of development speed.

### What would I improve if I had more time

1. First of all it's **graphics**. I've created only background image and UI controls design. Icons I had to take from the [internet](https://goodstuffnononsense.com/ "internet")
2. **Tests**. I hate to write them, but those needed at least for Utils functions
3. **Localization**.
4. **Events**. Original idea was to create random events that fire from time to time and affect businesses, in a Monopoly manner. E.g. "Your Transport ships are broken, you need $1Million to fix!", and after that you can't earn income from your business. Managers should have additional parameter "Risk management" wich influences event probability.
5. **Performance** optimization.
6. **Game Settings** like reset progress and so on.
7. **Sounds**.
8. **Balance** updates. Currently game is not balanced at all :)
9. **Mobile device** optimization. Even though you can run game on mobile device, interface will float a bit.