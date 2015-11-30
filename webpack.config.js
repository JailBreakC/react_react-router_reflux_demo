var path = require('path');

// module.exports = {
//   devtool: 'eval',
//   entry: [
//     'webpack-dev-server/client?http://localhost:3000',
//     'webpack/hot/only-dev-server',
//     './src/react/app.jsx'
//   ],
//   output: {
//     path: path.join(__dirname, '/public/js/dev/'),
//     filename: 'bundle.js',
//     publicPath: '/public/js/dev/'
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       loaders: ['react-hot', 'babel'],
//       include: path.join(__dirname, 'src')
//     }]
//   },
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     }
// };


module.exports = {
    devtool: 'eval',
    entry: {
        bundle: './src/react/app.jsx'
    },
    output: {
        path: path.join(__dirname, '/public/js/dev/'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
