import React from 'react';
import { useTranslation } from 'react-i18next';

const LOCALIZED_ATTRIBUTES = new Set([
  'aria-label',
  'aria-description',
  'alt',
  'placeholder',
  'title',
]);

const localizedStringLookups = new Map<string, Map<string, string>>();

const collectLocalizedStrings = (
  source: unknown,
  translated: unknown,
  lookup: Map<string, string>,
): void => {
  if (typeof source === 'string' && typeof translated === 'string') {
    if (!lookup.has(source)) lookup.set(source, translated);
    return;
  }

  if (!source || !translated || typeof source !== 'object' || typeof translated !== 'object') return;

  for (const [key, value] of Object.entries(source)) {
    collectLocalizedStrings(value, (translated as Record<string, unknown>)[key], lookup);
  }
};

const copyFor = (text: string, language: string, i18n: ReturnType<typeof useTranslation>['i18n']): string => {
  const languageCode = language.split('-')[0];
  const copy = i18n.getResource(languageCode, 'translation', 'copy') as Record<string, string> | undefined;
  if (copy?.[text]) return copy[text];

  let lookup = localizedStringLookups.get(languageCode);
  if (!lookup) {
    lookup = new Map<string, string>();
    collectLocalizedStrings(
      i18n.getResourceBundle('en', 'translation'),
      i18n.getResourceBundle(languageCode, 'translation'),
      lookup,
    );
    localizedStringLookups.set(languageCode, lookup);
  }

  return lookup.get(text) || text;
};

const localizeTree = (
  node: React.ReactNode,
  language: string,
  i18n: ReturnType<typeof useTranslation>['i18n'],
): React.ReactNode => {
  if (typeof node === 'string') return copyFor(node, language, i18n);
  if (Array.isArray(node)) return node.map((child) => localizeTree(child, language, i18n));
  if (!React.isValidElement<{ children?: React.ReactNode }>(node)) return node;

  const props: Record<string, unknown> = { ...node.props };
  for (const [name, value] of Object.entries(node.props)) {
    if (name === 'children') {
      props.children = localizeTree(value as React.ReactNode, language, i18n);
    } else if (LOCALIZED_ATTRIBUTES.has(name) && typeof value === 'string') {
      props[name] = copyFor(value, language, i18n);
    }
  }
  return React.cloneElement(node, props);
};

export const LocalizedCopy: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  return <>{localizeTree(children, i18n.resolvedLanguage || i18n.language || 'en', i18n)}</>;
};
