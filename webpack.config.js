module.exports = {
	entry : './www/index.js',
	output:{
		path:'./www',
		filename:'bundle.js',
		publicPath:'/'
	},
	module:{
		loaders : [
			{
				test: /\.js$/,  //Rejex match between '/../'. it is match the file of postfix .js and perdorm below loader on it
				loader : 'babel-loader', //{babel is compiler tool, compiler plugin. it is compiler jsx, ES6 in javascript}
				exclude : /node_module/, //exculude node modules folder(it is the rejex)
				//query tells the babel what to do for every  the .js file
				query : {
					presets : ['react', 'es2015']
				}		
			}
		]
	}
} 