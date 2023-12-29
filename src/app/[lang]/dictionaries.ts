import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => {
    return module.default;
  }),
  de: () => import('./dictionaries/de').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  switch (locale) {
  case 'en':
    return await dictionaries.en();
  case 'de':
    return await dictionaries.de();
  default:
    return await dictionaries.en();
  }
};
