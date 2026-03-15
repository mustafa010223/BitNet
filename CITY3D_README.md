# BitNet City3D Intelligence Platform

AI-powered urban planning and simulation platform combining BitNet's efficient 1.58-bit LLM inference with interactive 3D city visualization.

## Features

### 🏙️ Interactive 3D City Visualization
- Real-time 3D rendering using Three.js and React Three Fiber
- Dynamic building layouts with lighting and shadows
- Orbit controls for full camera interaction
- Responsive design for all screen sizes

### 🤖 AI Assistant
- BitNet-powered chatbot for urban planning insights
- Real-time inference via Supabase Edge Functions
- City optimization recommendations
- Traffic flow and energy efficiency analysis

### 📊 Performance Analytics Dashboard
- Live performance metrics comparison (BitNet vs FP16 vs INT8)
- Energy efficiency tracking
- Inference speed and latency monitoring
- Interactive charts with Recharts

### 💾 Supabase Backend
- Database schema for simulations and metrics
- Edge Functions for AI inference
- Row Level Security policies
- Automatic timestamp management

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **UI**: Lucide React icons, Recharts
- **Backend**: Supabase (Database + Edge Functions)
- **AI Model**: BitNet 1.58-bit architecture simulation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Environment variables are already configured in `.env`

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── AIAssistant.tsx      # AI chatbot interface
│   │   ├── City3DViewer.tsx     # 3D canvas wrapper
│   │   ├── CityScene.tsx        # 3D city geometry
│   │   ├── Dashboard.tsx        # Analytics dashboard
│   │   └── Header.tsx           # Navigation header
│   ├── lib/
│   │   └── supabase.ts          # Supabase client
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── supabase/
│   ├── functions/
│   │   └── bitnet-inference/    # Edge Function for AI
│   └── migrations/
│       └── ...                  # Database migrations
└── gpu/                         # Original BitNet implementation
```

## Database Schema

### Tables

- **simulations**: City simulation configurations and state
- **ai_interactions**: AI assistant conversation history
- **performance_metrics**: BitNet inference performance data

## BitNet Integration

This platform demonstrates BitNet's capabilities:

- **1.58-bit Quantization**: Ternary weights (-1, 0, +1) for extreme efficiency
- **Fast Inference**: 1.37x to 6.17x speedup vs traditional models
- **Energy Efficient**: 55-82% reduction in power consumption
- **Memory Optimized**: Minimal memory footprint

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT
