import PlayBAE from './playbae.js';

const TYPE_TO_CMD={
	'wav':'-w',
	'aif':'-a',
	'rmf':'-r',
	'mid':'-m'
};

class MiniBAEAudio extends HTMLAudioElement{
	constructor(){
		super();
		this._handleError();
		this.addEventListener('error',function(){this._handleError();});
	}
	async _handleError(){
		if(this?.error?.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED){
			let playbaeOptions={};
			playbaeOptions.arguments=['-q'];
			playbaeOptions.preRun=[(Module) => {
				Module.FS.createPreloadedFile('/home/web_user/','audio',this.currentSrc,true,true);
				if(this.dataset.minibaePatches) {
					playbaeOptions.arguments.push('-p','/home/web_user/patches.hsb');
					Module.FS.createPreloadedFile('/home/web_user/','patches.hsb',this.dataset.minibaePatches,true,true);
				}
			}];
			if(this.dataset.minibaeType) {playbaeOptions.arguments.push(TYPE_TO_CMD[this.dataset.minibaeType]);}
			else{playbaeOptions.arguments.push('-f');}
			playbaeOptions.arguments.push('/home/web_user/audio');
			playbaeOptions.arguments.push('-o','/home/web_user/audio.wav');
			let playbae=await PlayBAE(playbaeOptions);
			let uint8array=playbae.FS.readFile('/home/web_user/audio.wav');
			let blob=new Blob([uint8array],{type: 'audio/wav'});
			let url=URL.createObjectURL(blob);
			this.src=url;
			this.addEventListener('load',function(){URL.revokeObjectURL(url);},{once: true});
		}
	}
}
customElements.define('minibae-audio',MiniBAEAudio,{extends:'audio'});