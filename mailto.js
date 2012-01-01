(function(window, document, undefined) {
	
	// http://my.opera.com/Rijk/blog/2006/07/11/mailto-to-webmail
	var providers = {
		'gmail': {
			'pattern': '@gmail.com',
			'url': 'https://mail.google.com/mail/?view=cm&fs=1&shva=1&to={t}&su={s}&body={b}'
		},
		'yahoo': {
			'pattern': '@yahoo.com',
			'url': 'http://compose.mail.yahoo.com/?to={t}&subj={s}&body={b}'
		},
		'hotmail': {
			'pattern': '@hotmail.com',
			'url': 'http://mail.live.com/mail/EditMessageLight.aspx?n=&to={t}&subject={s}&body={b}'
		},
		'local': {
			'pattern': 'local',
			'url': 'mailto:{t}?subject={s}&body={b}'
		}
	};
	
	var Mailto = function(formName, config) {
	
		this.form = document.forms[formName] || {};
		
		if(typeof config !== 'undefined') {
			this.receiver = document.getElementById(config.receiver);
			this.sender = document.getElementById(config.sender);
			this.subject = config.subject;
			this.body = document.getElementById(config.body);
			this.send = document.getElementById(config.send);
			
		} else {
			this.receiver = this.form.elements[0];
			this.sender = this.form.elements[1];
			this.subject = formName;
			this.body = this.form.elements[2];
			this.send = this.form.getElementsByTagName('a')[0];
		}
	
		this.form.onkeyup = (function(that) {
			
			// prevent event from firing immediately
			return function() {
				
				var sender = that.sender.value,
					receiver = that.receiver.value,
					provider = 'local',
					url = '#';
				
				// Find the provider
				for (var key in providers) {
					var obj = providers[key];
		
					for (var prop in obj) {
		
						if (sender.indexOf(obj.pattern) !== -1) {
							provider = key;
							break;
						}
					}
				}
				
				that.send.setAttribute('target', '');
				that.send.className = 'btn ' + provider;
		
				if (sender.length > 0 && receiver.length > 0) {
					
					if (provider !== 'local') {
						that.send.setAttribute('target', '_blank');
					}
		
					url = providers[provider].url;
					url = url.replace('{t}', encodeURIComponent(receiver));
					url = url.replace('{s}', encodeURIComponent(that.subject));
					url = url.replace('{b}', encodeURIComponent(that.body.value));
				}
		
				that.send.href = url;
			}
			
		})(this);
	}
	
	window.Mailto = Mailto;
	
})(window, document);