const sendgrid = require('@sendgrid/mail');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer {
    constructor({ subject, recipients }, content, tr) {
        this.msg = {
            to: tr,
            from: 'no-reply@net5566.com',
            subject,
            html: content
        };
        //this.from = new helper.Email('no-reply@net5566.com');
        //this.subject = subject;
        //this.body = new helper.Content('text/html', content);
        // this.recipients = this.formatAddresses(recipients);

        //this.addContent(this.body);
        // may depreacated
 //       this.addClickTracking();
        //this.addRecipients();
    }

    settingRecipients(recipients) {
        if (recipients.indexOf(',') > 0) {
            return recipients;
        }
        else {
            return recipients;
        }
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    };
/*
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    };
*/
    async send() {
        sendgrid.setApiKey(keys.sendGridKey);
        
        return sendgrid.send(this.msg);
    };
}

module.exports= Mailer;