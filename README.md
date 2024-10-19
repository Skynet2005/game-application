<!-- markdownlint-disable MD036 -->
<!-- markdownlint-disable MD012 -->
# Battle Simulator

## Overview

The Battle Simulator is a web application that allows users to simulate battles between two players by inputting various troop configurations, levels, stats, and special bonuses. The simulator calculates the battle outcome based on the provided inputs and displays a detailed battle report.

## Features

- **Player Configuration**: Input names, troop counts or percentages, troop levels, and special bonuses for two players.
- **Troop Types**: Supports Infantry, Lancer, and Marksmen troops.
- **Troop Levels**: Choose from T8, T9, T10, or T11 troop levels.
- **Troop Stats**: Customize attack, defense, lethality, and health stats for each troop type.
- **Special Bonuses**: Apply special bonuses that affect troop performance.
- **Battle Simulation**: Calculate battle results including casualties, power loss, survivors, and recommended troop ratios.
- **Battle Report**: View and save detailed battle reports.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework.
- **FileSaver.js**: A library to save files on the client-side.

## Getting Started

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** or **yarn**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/battle-simulator.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd battle-simulator
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Running the Application

**Development Mode**

To start the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

**Production Build**

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

To run the linter and fix issues:

```bash
npm run lint
```

## Usage

1. **Open the Application**

   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

2. **Configure Player 1 and Player 2**

   - **Player Name**: Enter the name for each player.
   - **Troop Input Type**: Choose between entering troop counts or percentages.
     - If using percentages, input the total number of troops.
   - **Troop Configuration**: For each troop type (Infantry, Lancer, Marksmen):
     - Select the troop level (T8, T9, T10, T11).
     - Enter the troop count or percentage.
   - **Troop Stats**: Input the attack, defense, lethality, and health percentages for each troop type.
   - **Special Bonuses**: Input any applicable special bonuses.

3. **Simulate the Battle**

   - Click the **Simulate Battle** button.
   - View the battle report displayed below the button.
   - Click **Save Report** to download the battle report as a text file.

## Project Structure

```Plaintext
battle-simulator/
├── public/
│   └── troop_stats.json          # Base stats for troops at different levels
├── src/
│   ├── app/
│   │   ├── (components)/
│   │   │   ├── BattleResults.tsx # Component to display battle results
│   │   │   ├── BattleSimulator.tsx # Main battle simulator component
│   │   │   └── PlayerInput.tsx   # Component for player input forms
│   │   ├── models/
│   │   │   ├── Battle.ts         # Battle simulation logic
│   │   │   ├── Player.ts         # Player class
│   │   │   └── Troop.ts          # Troop classes
│   │   ├── utils/
│   │   │   └── helpers.ts        # Helper functions
│   │   ├── page.tsx              # Main application page
│   │   └── layout.tsx            # Application layout
├── styles/
│   └── globals.css               # Global CSS styles
├── .eslintrc.json                # ESLint configuration
├── package.json                  # Project metadata and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

## Dependencies

- **next**: Framework for server-rendered React applications.
- **react**: Library for building user interfaces.
- **react-dom**: Entry point to the DOM and server renderers for React.
- **file-saver**: Library to save files on the client-side.

## Dev Dependencies

- **@types/node**: Type definitions for Node.js.
- **@types/react**: Type definitions for React.
- **@types/react-dom**: Type definitions for React DOM.
- **eslint**: JavaScript linter.
- **eslint-config-next**: ESLint configuration used by Next.js.
- **postcss**: Tool for transforming CSS with JavaScript.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Typed superset of JavaScript.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code issues.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/Skynet2005/adv_battle_simulator.git
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

5. **Commit Your Changes**

   ```bash
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

   Go to your fork on GitHub and create a pull request to the original repository.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Open Source Libraries**: Thanks to the creators of Next.js, React, TypeScript, Tailwind CSS, and FileSaver.js.
- **Contributors**: Thank you to everyone who has contributed to this project.

## Contact

For questions or support, please open an issue in the [GitHub repository](https://github.com/Skynet2005/adv_battle_simulator.git/issues).

