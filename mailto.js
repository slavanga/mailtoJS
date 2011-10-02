var MailtoJS = {

    from: '',
    to: '',
    subject: escape('Check this out'),
    body: escape('Hi,\n MailtoJS creates mailto links on the fly as you type.'),

    // http://my.opera.com/Rijk/blog/2006/07/11/mailto-to-webmail
    providers: {
        'gmail': {
            'pattern': "@gmail.com",
            'url': "https://mail.google.com/mail/?view=cm&fs=1&shva=1&to={t}&su={s}&body={b}"
        },
        'yahoo': {
            'pattern': "@yahoo.com",
            'url': "http://compose.mail.yahoo.com/?to={t}&subj={s}&body={b}"
        },
        'hotmail': {
            'pattern': "@hotmail.com",
            'url': "http://mail.live.com/mail/EditMessageLight.aspx?n=&to={t}&subject={s}&body={b}"
        },
        'local': {
            'pattern': "local",
            'url': "mailto:{t}?subject={s}&body={b}"
        }
    },

    init: function () {

        this.from = document.getElementById('mail-from').value;
        this.to = document.getElementById('mail-to').value;

        var send = document.getElementById('mail-send');
        var provider = 'local';
        var url = '#';

        for (var key in this.providers) {
            var obj = this.providers[key];

            for (var prop in obj) {

                if (this.from.indexOf(obj.pattern) !== -1) {
                    provider = key;
                    break;
                }
            }
        }

        send.setAttribute('target', '');
        send.className = 'btn ' + provider;

        if (this.from.length > 0 && this.to.length > 0) {

            if (provider !== 'local') {
                send.setAttribute('target', '_blank');
            }

            url = this.providers[provider].url;
            url = url.replace('{t}', this.to);
            url = url.replace('{s}', this.subject);
            url = url.replace('{b}', this.body);
        }

        send.href = url;
    }
};