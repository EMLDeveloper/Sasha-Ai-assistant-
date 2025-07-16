# Under the Hood of Sasha:
# Meet Your AI Assistant:
Sasha AI is a versatile virtual assistant built to adapt to roles like interviewer, educator, and sales assistant. Utilizing OpenAI’s conversational intelligence, Sasha AI provides insightful and natural responses, making interactions feel engaging and personalized. The assistant’s voice capabilities are powered by Eleven Labs, delivering high-quality, lifelike audio that enhances the user experience. Built with Python and FastAPI for robust backend performance, and React with Tailwind CSS for a seamless, responsive interface, Sasha AI brings reliable, real-time support across a range of professional settings

<img width="1727" height="959" alt="Screenshot 2025-07-15 at 11 01 17 PM" src="https://github.com/user-attachments/assets/68fedd1c-cd08-4633-a14e-e3e86495dd97" />


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js




// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
