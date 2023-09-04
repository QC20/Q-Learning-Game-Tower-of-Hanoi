# Tower of Hanoi Game with Q-learning
The Tower of Hanoi Game Prototype serves as an interactive educational tool designed to intuitively convey the principles of Q-learning and reinforcement learning. It's a hands-on approach to help people understand these complex concepts through gameplay and interaction.

![ToH](https://github.com/QC20/Tower-of-Hanoi-Learning-Game/assets/36644388/a472ee1d-0848-4f00-b57b-32017ce01e23)

## Introduction

Welcome to the Tower of Hanoi game with Q-learning! This project serves as both an engaging game and an educational example of how Q-learning, a fundamental concept in reinforcement learning, can be applied to solve complex problems. This README will walk you through the game and the underlying Q-learning implementation.

## Table of Contents

- [Game Overview](#game-overview)
- [Q-learning Implementation](#q-learning-implementation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Game Overview

The Tower of Hanoi is a classic puzzle consisting of three rods and a number of disks of different sizes, which can be moved between the rods. The puzzle starts with all the disks in a neat stack on one rod, ordered by size, with the smallest at the top. The objective is to move the entire stack to another rod, obeying the following rules:

1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or an empty rod.
3. No disk may be placed on top of a smaller disk.

The game visually demonstrates this problem, making it easy to grasp the concept of Q-learning.

## Q-learning Implementation

Q-learning is a model-free reinforcement learning algorithm used to find the optimal action-selection policy for a given finite Markov decision process. In our Tower of Hanoi game, we've implemented Q-learning to find the shortest sequence of moves to solve the puzzle optimally.

Here's how Q-learning works in this context:

- **States**: Each state represents the configuration of the towers (the position of disks on rods).

- **Actions**: Actions are the moves you can make, such as moving a disk from one rod to another.

- **Rewards**: The objective is to reach the goal state (all disks on another rod). A reward is given for each step closer to the goal, with a higher reward for reaching the goal state quickly.

- **Q-Matrix**: The Q-matrix is updated based on the rewards received. It helps the agent (in this case, the game player) make decisions on which moves to make.

- **Training**: The Q-learning algorithm learns by playing the game many times and updating the Q-matrix until it converges to the optimal policy.

## Usage

To play the Tower of Hanoi game and explore the Q-learning implementation, follow these steps:

1. Clone the repository to your local machine.

2. Open the HTML file (`index.html`) in a web browser.

3. You can interact with the Tower of Hanoi game by selecting disks and dropping them onto other rods. Try to solve the puzzle optimally!

4. Dive into the code (`script.js`) to understand the Q-learning implementation. The comments and code structure are designed to help you grasp the reinforcement learning concepts used in this project.

## Contributing

If you're interested in contributing to this project or have suggestions for improvements, please feel free to submit issues or pull requests. We welcome your input and collaboration in making this educational resource even better!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Enjoy playing the Tower of Hanoi game and exploring the fascinating world of Q-learning and reinforcement learning!
