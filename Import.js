// Native Es module import

// `/js/tryModule.js`
// const Import = (m) => import(/*webpackIgnore:true*/m).then(mod => {
// importShim(m)
// const Import = async (m) => await importShim(m).then(mod => {
const Import = async (m) => {
	const importShim = window.importShim;
	if(importShim){
		return await importShim(m).then(mod => mod).catch(e => {
			console.warn(e);
			return e;
		});
	}
	else{
		return await import(/*webpackIgnore:true*/m).then(mod => mod).catch(e => {
			console.warn(e);
			return e;
		});
	}
}

export default Import;

/* 
const Import = async (m) => await importShim(m).then(mod => {
	return mod;
}).catch(e => {
	console.log(e);
	return e;
});

const Import = (m) => {
	try{
		// const cekImport = new Function('import("' + m + '")')();
		// console.log(cekImport);
		// if(new Function('import("' + m + '")')()){
			return import(// webpackIgnore:true m).then(mod => {
				// console.log(m);
				return mod;
			}).catch(e => {
				// console.log(e);
				// return m + "Not Found";
				return e;
			});
		// }
	}catch(e){
		
	}
}; */

