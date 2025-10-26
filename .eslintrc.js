module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // нам нужны обычные <img>, не хотим next/image
    '@next/next/no-img-element': 'off',

    // не ломать билд за неиспользуемые переменные
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // разрешаем any, потому что sdk в рантайме и у него странные типы
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
