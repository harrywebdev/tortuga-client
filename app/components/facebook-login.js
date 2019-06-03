import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    facebookLogin: service(),

    classNames: ['facebook-login'],

    disabled: false,

    onFinish() {
        //
    },

    actions: {
        facebookLogin() {
            this.facebookLogin.login().then(
                accessToken => {
                    this.onFinish(accessToken);
                },
                () => {
                    // we don't probably care here for now
                    // TODO: show error message if it's not "user cancelled"
                }
            );
        },
    },
});
