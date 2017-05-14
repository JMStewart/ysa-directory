module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname,
        filename: "dist/app.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};