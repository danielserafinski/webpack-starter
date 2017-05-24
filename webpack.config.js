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
                use: 'source-map-loader'
            },            
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },            
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']            
                })
            }, 
            {
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
				  { loader: 'file-loader', options: { context: 'src/images', name: 'images/[path][name].[ext]'} },
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
            template: './src/index.html',
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