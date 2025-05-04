# Planta 🌿

Planta is a modern, full-featured web application designed to help users care for their plants with ease. It offers an intuitive experience for plant discovery, tracking, and personalized care tips — with a seamless authentication process and a beautiful UI.


## Demo 🎥

Check out the live demo of Planta!

[Try it live →](https://acme-commerce-beta.vercel.app/)

## Tech-stack ⚡

Planta is built with a modern stack to deliver an exceptional user experience:

- React & Next.js ⚛️: Dynamic, server-side rendered UIs.
- [Tailwind CSS](https://tailwindcss.com/) 🌈: Utility-first styling for fast development.
- [Storybook](https://storybook.js.org/) 📖: Develop and test UI components in isolation.
- [Supabase](https://supabase.com/) 🔒: Authentication and backend services.
- [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) 🧪: For reliable testing and bug-free code.
- TypeScript 💻: Type safety for smoother development.
- [HeroUI](https://www.heroui.com/) 🎨: A design system for consistent UI components.
- [Next-Intl](https://next-intl.dev/) 🌍: For internationalization and localization support.
- [React Hook Form](https://react-hook-form.com/) 📝: For easy and performant form handling.

## Prerequisites 🛠️

Before setting up the project, ensure you have the following installed and configured:

### Required Tools

- Node.js version 18.20.4 or higher. Check your Node.js version:

```bash
node --version
```

- pnpm package manager. Verify installation:

```bash
pnpm --version
```

If pnpm is not installed, you can install it globally by running:

```bash
npm install -g pnpm
```

### External Services

- Supabase Account: Sign up for a free-tier account at [Supabase](https://supabase.com/) and create a project.
- reCAPTCHA v3: Obtain API keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin/site/716490403).

## Supabase Setup ⚡

### Create a Supabase Project

Sign up for a free-tier account at Supabase and create a new project.

### Get API Keys

Once your project is created, go to Project Settings > API and retrieve the following keys:

- Supabase URL → `NEXT_PUBLIC_SUPABASE_URL`
- Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Add these to your .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Getting Started ⚙️

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/anilkaraabali/planta.git
cd planta
```

Then, install the project dependencies:

```bash
pnpm install
```

### Start the development server 🚀

Now, you can start the development server:

```bash
pnpm dev
```

## Running Tests 🧪

This project uses Vitest for running unit tests.

To run the tests, use the following command:

```bash
pnpm test
```

This will run all the tests in the project and output the results in the terminal.

### Running Tests in Watch Mode 👀

If you want to run the tests continuously as you make changes, you can use the following command:

```bash
pnpm test:watch
```

This will watch for changes to your test files and automatically rerun the tests.

### Running Tests with Coverage 📊

To run the tests with coverage reports, use:

```bash
pnpm test:coverage
```

This will generate a code coverage report that shows how much of your code is covered by tests.

## TypeScript Validation 🛠️

To check for TypeScript errors in your project, you can run:

```bash
pnpm validate-types
```

This will use the TypeScript compiler to validate your types and show any errors or warnings related to type issues in your code.

## Storybook 📚

To start Storybook for viewing UI components, run the following command:

```bash
pnpm storybook
```

This will start Storybook, allowing you to interact with the components in isolation.
