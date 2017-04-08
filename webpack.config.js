var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            },            
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },            
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions','sass-loader'],
                    //publicPath: '/dist'
                })
            }, 
            {
                test: /\.(gif|png|jpe?g|jpg|svg)$/i,
                loaders: [
                  'file-loader?context=src/images&name=images/[path][name].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                          progressive: true,
                        },
                        gifsicle: {
                          interlaced: false,
                        },
                        optipng: {
                          optimizationLevel: 4,
                        },
                        pngquant: {
                          quality: '75-90',
                          speed: 3,
                        },
                    }
                  }
                ]
            },             
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
           { from: 'src/static', to: 'static' }  
        ])
    ]
};