import React from 'react';
import Import from './Import';

export default function ImportEsm({module, children}){ // ...etc
  const [Module, setModule] = React.useState();
	const [Err, setErr] = React.useState(false);
	
	React.useEffect(() => {
		// console.log('%cuseEffect in ImportEsm','color:yellow;');
		async function getMod(){
      try {
				// File name to function name & store to window
				const fileName = 'Esm_' + module.split('/').pop().replace(/.js|.jsx|.ts|.tsx|.mjs/,'');
				let exist = window[fileName];
				
				if(exist){// Use from window if available
					setModule(exist);// setModule(window[fileName]);
				}else{// Use from import module file & store to window
					const m = await Import(module);
					const modName = Object.keys(m);
					// console.log(modName);// JSON.stringify(m) | .includes('TypeError:')
					// console.log('fileName: ', fileName);
					
					if(modName && modName.length > 0){
						if(m.default && (!modName || modName.length < 1)){// if(m.default){
							// console.log('if modName: ', modName);
							// console.log('if m: ', m);
							window[fileName] = m.default;
							setModule(m.default);
						}
						else if(m.default && modName.length > 0){
							let mods = {...m}
							window[fileName] = mods;
							setModule(mods);
						}	
						else{
							// console.log('else modName: ', modName);
							// console.log('else m: ', m);
							window[fileName] = m[modName[0]];
							setModule(m[modName[0]]);
						}
					}else{
						// console.warn(module + ' Not Found');
						setErr('Not Found Module in: ' + module);
					}
				}
      }catch(e){
        console.warn(e.message);
				setErr(e.message);
      }
		}
		getMod()
		// eslint-disable-next-line
	}, [module]);
	
	return (
		<React.Suspense fallback={<div>Loading</div>}>
			{Module ? 
				children({Module}) : 
					Err ? 
						children({Err})
						: 
						null
			}
		</React.Suspense>
	)
}
