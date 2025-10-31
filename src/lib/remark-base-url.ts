/**
 * Remark plugin to automatically prepend BASE_URL to image paths
 * This allows blog authors to use simple paths like /blog/image.jpg
 * which will automatically become /behivest/blog/image.jpg on GitHub Pages
 *
 * Usage in astro.config.mjs:
 * remarkPlugins: [[remarkBaseUrl, { baseUrl: '/behivest/' }]]
 */

import type { Image, Root } from 'mdast'
import { visit } from 'unist-util-visit'

interface RemarkBaseUrlOptions {
  baseUrl?: string
}

export function remarkBaseUrl(options: RemarkBaseUrlOptions = {}) {
  const baseUrl = options.baseUrl || '/'

  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      // Only transform absolute paths that don't start with http
      if (node.url.startsWith('/') && !node.url.startsWith('http')) {
        // Prepend BASE_URL and normalize double slashes
        node.url = `${baseUrl}${node.url}`.replace(/\/+/g, '/')
      }
    })
  }
}

export default remarkBaseUrl
