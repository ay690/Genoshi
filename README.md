# Genoshi - AI Assitant

A modern, feature-rich chat application with AI-powered assistance capabilities. Built with React, TypeScript, and Redux Toolkit, Genoshi provides an interactive chat interface with support for various tools and integrations.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## ✨ Features

- **AI-Powered Chat**: Interactive chat interface with streaming responses
- **Smart Assistant**: Ask questions, request calculations, or run tool actions
- **Weather & Data**: Fetch live weather and query structured data
- **Image Generation**: Create images from text prompts
- **Database Queries**: Run safe data lookups with structured responses
- **Built-in Calculator**: Perform instant math and conversions
- **Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Technologies Used

### Frontend
- React 19+ with Hooks
- TypeScript 5.2
- Redux Toolkit & React Redux
- React Query
- React Router
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide Icons
- Sonner Toasts

### Build Tools
- Vite 4.4
- TypeScript
- ESLint
- Prettier

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ay690/Genoshi.git
   cd Genoshi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── ui/          # Shadcn/ui components
│   ├── ChatContainer.tsx  # Main chat interface
│   ├── ChatInput.tsx      # Message input component
│   ├── MessageBubble.tsx  # Individual message component
│   ├── ToolCallCard.tsx   # Tool call visualization
│   └── Spinner.tsx        # Loading spinner
├── pages/           # Page components
│   ├── Chat.tsx     # Main chat page
│   ├── Home.tsx     # Landing page
│   └── NotFound.tsx # 404 page
├── services/        # API services
│   └── chatAPI.ts   # API client for chat functionality
├── store/           # State management
│   ├── slices/      # Redux slices
│   │   └── chatSlice.ts  # Chat state and actions
│   ├── hooks.ts     # Custom Redux hooks
│   └── store.ts     # Redux store configuration
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI Components powered by [Shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- State Management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Data Fetching with [React Query](https://tanstack.com/query/latest)

---

Made with ❤️ by Aniket Yadav
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
