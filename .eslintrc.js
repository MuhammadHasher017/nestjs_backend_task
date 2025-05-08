module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import', // Add import plugin for sorting imports
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    
    // Prevent using relative paths when an alias exists
    'no-restricted-imports': [
      'error',
      {
        'patterns': [
          {
            'group': ['../*'],
            'message': 'Use @/* path alias instead of relative imports',
          },
          {
            'group': ['../../*'],
            'message': 'Use @/* path alias instead of relative imports',
          },
        ],
      },
    ],
    
    // Import sorting rules
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index']
        ],
        'pathGroups': [
          {
            'pattern': '@/**',
            'group': 'internal',
            'position': 'after'
          },
          {
            'pattern': '@config/**',
            'group': 'internal',
            'position': 'after'
          },
          {
            'pattern': '@tasks/**',
            'group': 'internal',
            'position': 'after'
          },
          {
            'pattern': '@interceptors/**',
            'group': 'internal',
            'position': 'after'
          }
        ],
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'newlines-between': 'always'
      }
    ],
    'sort-imports': [
      'error',
      {
        'ignoreCase': true,
        'ignoreDeclarationSort': true, // We use import/order for sorting declarations
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
        'allowSeparatedGroups': true
      }
    ]
  },
  settings: {
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        'project': './tsconfig.json'
      },
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};