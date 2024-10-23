module.exports = {
    plugins: [
        'babel-plugin-transform-typescript-metadata',
    ],
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
};