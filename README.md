## Prerequisites

- Node.js (v20 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Grandiada/design-patterns.git
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
src/
├── creators/     # Factory pattern implementations
├── entities/     # Core domain entities
├── input/        # Input handling
├── logger/       # Logging functionality
├── managers/     # Manager classes
├── parsers/      # Data parsing
├── services/     # Service layer
└── tests/        # Test files
```

## Available Scripts

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run build` - Build the project
- `npm start` - Run the compiled project

## Dependencies

### Main Dependencies
- TypeScript
- Pino (for logging)
- Vector Math

### Development Dependencies
- Jest (for testing)
- ESLint (for code linting)
- TypeScript ESLint plugins
