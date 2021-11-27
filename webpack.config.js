const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin');
const OptimizeCssAssetswebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Analyer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        'next-page': './src/next-page.js' 
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle@[chunkhash].js',
        chunkFilename: 'async-plugin@[chunkhash].js',
        publicPath: './dist/'
    },
    mode: 'development',
    devServer: {
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /.\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:{
                            sourceMap: true,
                            modules:true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options:{
                            sourceMap: true,
                        }
                    },
                
            ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 102400,
                        name: '[name].[ext]',
                        publicPath: './assets/'
                    }
                }
            },
            {
                test: /.\js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets:[
                            [
                                'env',
                                {
                                    modules: false,
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'id.css'
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin(),
        // new Analyer()
    ],
    optimization:{ 
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new  TerserPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /excludes/
            }),
            new OptimizeCssAssetswebpackPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canprint: true
            })
        ]
    }
}