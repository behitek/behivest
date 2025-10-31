/**
 * Remark plugin to automatically prepend BASE_URL to image and link paths
 * This allows blog authors to use simple paths like /blog/image.jpg or /blog/post
 * which will automatically become /behivest/blog/image.jpg on GitHub Pages
 *
 * Usage in astro.config.mjs:
 * remarkPlugins: [[remarkBaseUrl, { baseUrl: '/behivest/' }]]
 */

import type { Image, Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface RemarkBaseUrlOptions {
  baseUrl?: string;
}

export function remarkBaseUrl(options: RemarkBaseUrlOptions = {}) {
  const baseUrl = options.baseUrl || '/';

  return (tree: Root) => {
    // Transform image paths
    visit(tree, 'image', (node: Image) => {
      if (node.url.startsWith('/') && !node.url.startsWith('http')) {
        node.url = `${baseUrl}${node.url}`.replace(/\/+/g, '/');
      }
    });

    // Transform internal link paths
    visit(tree, 'link', (node: Link) => {
      // Only transform absolute paths that don't start with http or #
      if (node.url.startsWith('/') && !node.url.startsWith('http')) {
        node.url = `${baseUrl}${node.url}`.replace(/\/+/g, '/');
      }
    });
  };
}

export default remarkBaseUrl;
