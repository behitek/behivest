import { describe, it, expect } from 'vitest';
import { buildAbsoluteUrl, normalizePathWithBase } from '../../src/utils/seo';

describe('normalizePathWithBase', () => {
  it('should add the production base path to a root-relative asset path', () => {
    expect(
      normalizePathWithBase({
        path: '/blog/mutual-funds.png',
        basePath: '/behivest/',
      })
    ).toBe('/behivest/blog/mutual-funds.png');
  });

  it('should not prepend the base path twice', () => {
    expect(
      normalizePathWithBase({
        path: '/behivest/blog/mutual-funds.png',
        basePath: '/behivest/',
      })
    ).toBe('/behivest/blog/mutual-funds.png');
  });

  it('should leave dev paths unchanged when the base path is root', () => {
    expect(
      normalizePathWithBase({
        path: '/blog/mutual-funds.png',
        basePath: '/',
      })
    ).toBe('/blog/mutual-funds.png');
  });
});

describe('buildAbsoluteUrl', () => {
  it('should build an absolute URL for a site-relative image path', () => {
    expect(
      buildAbsoluteUrl({
        pathOrUrl: '/blog/mutual-funds.png',
        basePath: '/behivest/',
        site: 'https://behitek.com',
      })
    ).toBe('https://behitek.com/behivest/blog/mutual-funds.png');
  });

  it('should preserve already-absolute URLs', () => {
    expect(
      buildAbsoluteUrl({
        pathOrUrl: 'https://images.example.com/social.jpg',
        basePath: '/behivest/',
        site: 'https://behitek.com',
      })
    ).toBe('https://images.example.com/social.jpg');
  });
});
