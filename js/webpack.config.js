// Again all adapted from https://github.com/jupyter-widgets/widget-cookiecutter/

const path = require("path");
const version = require("./package.json").version;


// I think this tell webpack what to do with css files
const rules = [
    {test: /\.css$/, use: ['style-loader', 'css-loader']}
];

module.exports = [
    {
        // I think here is where we define the Notebook extension in
        // its entireity

        // Here we only put the code required to bootstrap ourselves
        // when the extension is initially loaded
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'topos', 'static'),
            libraryTarget: 'amd'    // ??
        }
    },
    {
        // "Bundle for the notebook containing custom views and models" - Github project
        // How this is different to the above I'm not entirely sure...
        entry: './lib/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'topos', 'static'),
            libraryTarget: 'amd'  // required - ??
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base']
    },
    {
        // The Embeddable bundle
        // I don't understand...
        entry: './lib/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/topos-previewjs@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base']
    }
];
