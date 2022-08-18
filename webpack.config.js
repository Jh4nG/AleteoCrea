const path = require("path");
module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, 'public'), filename: 'bundle.js'
    }, module: { 
        rules: [
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: "file"
            }
        ] 
    }, 
    devtool: 'cheap-module-eval-source-map', 
    devServer: { 
        contentBase: path.join(__dirname, 'public') 
    }
}
