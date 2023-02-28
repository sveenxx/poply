<p align="center">
  <img height=100 src="https://i.imgur.com/kbtT9Ak.png" />
</p>
<p align="center">
  <img src="https://img.shields.io/npm/v/poply.svg?style=for-the-badge"/>
  <img src="https://img.shields.io/bundlephobia/minzip/poply?style=for-the-badge"/>
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg?style=for-the-badge" />
</p>

<p align="center">
    <a href="#">https://poply.dev</a><br/>
    <strong>🎉 Lightweight toast component for React 🎉</strong>
</p>

## Installation

pnpm (recommended):
```bash
pnpm add poply
```
npm:
```bash
npm install poply
```
yarn:
```bash
yarn add poply
```

## Usage

Add `<Toaster />` to your app component:
```tsx
    import { Toaster, toast } from 'poply';

    function App() {
        return (
            <div>
              <button onClick={() => toast.info('Hello world!')}>Toast</button>
              <Toaster />
            </div>
        )
    }
```

## License

Licensed under MIT
