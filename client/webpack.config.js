module.exports = {
    entry: "./client/ts/main.ts",
    mode: 'production', // development

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    output: {
        filename: "scripts.js",
        path: __dirname + "/js/",
    },
};