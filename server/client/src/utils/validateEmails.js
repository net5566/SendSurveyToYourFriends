const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (recipients) => {
    const invalidEmails = recipients
        .split(',')
        .map(email => email.trim())
        .filter(email => email_re.test(email) === false)

    if (invalidEmails.length > 0) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};
