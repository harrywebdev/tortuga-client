import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FacebookLoginComponent extends Component {
    @service facebookLogin;

    classNames = ['facebook-login'];

    disabled = false;

    onFinish() {
        //
    }

    @action
    login() {
        this.facebookLogin.login().then(
            accessToken => {
                this.onFinish(accessToken);
            },
            () => {
                // we don't probably care here for now
                // TODO: show error message if it's not "user cancelled"
            }
        );
    }
}
