module.exports = {
  'plugins': [
    'plugins/markdown',
    'node_modules/jsdoc-mermaid',
    'node_modules/better-docs/category'
  ],
  'opts': {
    'template': 'node_modules/better-docs',
    'encoding': 'utf8',
    'destination': 'docs/',
    'readme': 'readme.md',
    'recurse': true,
    'verbose': true
  },
  'recurseDepth': 10,
  'source': {
    'include': ['./src'],
    'includePattern': '.js$',
    'excludePattern': '(node_modules/|docs|src/assets/)'
  },
  'sourceType': 'module',
  'tags': {
    'allowUnknownTags': true,
    'dictionaries': ['jsdoc','closure']
  },
  'templates': {
    'cleverLinks': false,
    'monospaceLinks': false,
    'name': 'Streamers Edge Front End Documentation',
    'footerText': 'Peerplays Global©'
  }
};