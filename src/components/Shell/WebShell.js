import LocalEchoController from 'local-echo';
import { Terminal } from 'xterm';

export default class WebShell extends Terminal {
    constructor() {
        super({
            fontFamily: 'Fira Code, monospace',
            fontSize: 12,
            rows: 30,
        });

        this.localEcho = new LocalEchoController();
        this.loadAddon(this.localEcho);

        (function readLines() {
            this.localEcho.read('webshell~$ ').then((data) => {
                this.processInput(data);
                readLines.bind(this)();
            });
        }.bind(this)());
    }

    processInput = (data) => {
        try {
            // eslint-disable-next-line no-eval
            const output = eval(data);
            if (output !== undefined) {
                this.localEcho.println(output);
                return;
            }
        } catch (error) {
            const { message } = error;
            this.localEcho.println(message);
        }
    };
}
