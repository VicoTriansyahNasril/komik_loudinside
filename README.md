*Read this in other languages: [English](README.md), [Indonesian](README-id.md).*

# Webtoon Reader Platform 📚✨

**🌍 Live Demo:** [Komik Loud Inside](https://loudinside.vercel.app/)

An interactive, custom-built web application designed to showcase a digital comic/webtoon. This project serves as a dedicated reading platform with features like chapter navigation, immersive audio playback, and responsive design.

## 📖 Project Background & Collaboration

This project is a collaborative effort born out of a university thesis. 

- **The Art & Story**: The illustrations, characters, and storyline were entirely created by my friend as the core deliverable for her final thesis project. (Their work has also been officially published on the Webtoon platform!)
- **The Platform**: I engineered and developed this entire web application from scratch to serve as the interactive, digital exhibition medium for their thesis. 

This separation of concerns allowed us to combine creative storytelling with modern web development, resulting in a seamless reading experience.

## 🚀 Key Features

- **Custom Reader Experience**: A responsive, full-screen webtoon reading interface optimized for both desktop and mobile devices.
- **Immersive Audio**: Integrated background audio/BGM that enhances the storytelling experience, complete with custom audio controls.
- **Smart Navigation**: Intuitive chapter selection menus, floating action buttons (Scroll to Top), and "End of Chapter" navigation flows.
- **Modern UI/UX**: Built with a sleek, dark-mode aesthetic utilizing overlays, blur effects (glassmorphism), and smooth micro-animations.

## 💻 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (for global audio state)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ My Engineering Role

As the sole developer of this platform, my focus was on delivering a production-ready application that adheres to modern front-end best practices:
- **Component-Driven Architecture**: Refactored complex pages into smaller, reusable UI components (`TopOverlay`, `BottomOverlay`, `ChapterListMenu`) adhering to the Single Responsibility Principle.
- **Custom Hooks**: Abstracted DOM event listeners (like scroll tracking) and UI state logic into custom React hooks (`useReaderState`) to keep presentation components clean.
- **Performance**: Utilized Next.js `Image` component for optimized asset loading and implemented custom CSS utilities to manage scrollbars without injecting inline scripts.

## ⚙️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
