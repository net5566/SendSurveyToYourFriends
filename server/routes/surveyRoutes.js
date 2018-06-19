const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const checkCredits = require('../middlewares/checkCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false })

        res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.chain(req.body)
        .map(({ email, url }) => {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        })
        .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, checkCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        let tempRecipient = recipients.split(',');
        for(let i = 0; i< tempRecipient.length; i++) {
            tempRecipient[i] = tempRecipient[i].trim();
        }
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: tempRecipient.map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // sending mail
        const mailer = new Mailer(survey, surveyTemplate(survey), tempRecipient);
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
           } catch (err) {
            console.log(err);
            res.status(422).send(err);
        }
    });
};