<p align="center">
  <img height=300 src="https://i.imgur.com/MwiRRJB.png" />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/poply"><img src="https://img.shields.io/npm/v/poply.svg?style=for-the-badge"/></a>
  <img src="https://img.shields.io/bundlephobia/minzip/poply?style=for-the-badge"/>
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg?style=for-the-badge" />
</p>

<p align="center">
    <a href="#">https://poply.dev</a><br/>
    <strong>🎉 Lightweight toast component for React 🎉</strong>
</p>

## Installation

```sh
# pnpm (recommended):
pnpm add poply

# npm:
npm install poply

# yarn:
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

### Usage with Next 13 appDir
Import `Toaster` and render it inside of a Client Coponent:
```tsx
// app/toaster-provider.tsx
'use client'

import { Toaster } from 'poply';

export default function ToasterProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```
As your provider has been marked as a Client Component, your Server Component can now directly render it:
```tsx
// app/layout.tsx
import ToasterProvider from './toaster-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ToasterProvider>
          {children}
        </ToasterProvider>
      </body>
    </html>
  );
}
```

## Options

Toaster component accepts following props:

| Prop       | Description                      |
|------------|----------------------------------|
| bgColor | Color of toast background        |
| textColor   | Color of text and close icon     |
| customComponent | Custom component to render toast |
| position | Position of toast container      |
| maxToasts | Maximum number of toasts to show |
| maxToastsPerMessage | Maximum number of toasts per message |

#### Custom component example: 
```tsx
import { Toaster, toast } from 'poply';
import { CustomToast } from './components/custom-toast';

function App() {
    return (
        <div>
          <button onClick={() => toast.info('Hello world!')}>Toast</button>
          <Toaster customComponent={({ message, type }) => <CustomToast message={message} type={type} />} />
        </div>
    )
}
```

## License

Licensed under MIT
