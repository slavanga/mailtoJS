(function(window, document, undefined) {
	
	// http://my.opera.com/Rijk/blog/2006/07/11/mailto-to-webmail
	var providers = {
		local: {
			name: 'Mail Client',
			pattern: '',
			url: 'mailto:{t}?subject={s}&body={b}'
		},
		gmail: {
			name: 'Gmail',
			pattern: '@gmail.com',
			url: 'https://mail.google.com/mail/?view=cm&fs=1&shva=1&to={t}&su={s}&body={b}'
		},
		yahoo: {
			name: 'Yahoo! Mail',
			pattern: '@yahoo.com',
			url: 'http://compose.mail.yahoo.com/?to={t}&subj={s}&body={b}'
		},
		hotmail: {
			name: 'Hotmail',
			pattern: '@hotmail.com',
			url: 'http://mail.live.com/mail/EditMessageLight.aspx?n=&to={t}&subject={s}&body={b}'
		}
	};
	
	var Mailto = function(formName, config) {
	
		this.subject = config.subject || '';
		this.body = config.body || '';
		
		this.form = document.forms[formName] || {};
		this.receiver = this.form.elements[0];
		this.sender = this.form.elements[1];
		this.submit = this.form.elements[2];
	
		this.update = function() {
			
			this.provider = 'local';
			this.url = '#';
			
			// Find the provider
			for (var key in providers) {
				var obj = providers[key];

				for (var prop in obj) {

					if (this.sender.value.indexOf(obj.pattern) !== -1) {
						this.provider = key;
						this.name = providers[key].name;
						break;
					}
				}
			}
			
			this.submit.setAttribute('value', 'Send via ' + this.name);
			this.submit.className = 'btn ' + this.provider;

			var url = this.url;
			
			this.url = providers[this.provider].url;
			this.url = this.url.replace('{t}', encodeURIComponent(this.receiver.value));
			this.url = this.url.replace('{s}', encodeURIComponent(this.subject));
			this.url = this.url.replace('{b}', encodeURIComponent(this.body));
		};
		
		this.form.onkeyup = (function(that) {
			
			// prevent event from firing immediately
			return function() {
				that.update();
			}
			
		})(this);
		
		this.form.onsubmit = (function(that) {
			
			return function() {
				
				if(that.provider === 'local') {
					window.location = that.url;
					
				} else {
					window.open(that.url);
				}
				
				return false;
			}
		
		})(this);
		
		// update on reload
		this.update();
	}
	
	window.Mailto = Mailto;
	
})(window, document);