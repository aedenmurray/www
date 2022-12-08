import { useEffect, useRef } from 'react';
import LocalEchoController from 'local-echo';
import { Terminal } from 'xterm';

import '@fontsource/jetbrains-mono';
import 'xterm/css/xterm.css';
import './style.css';

const banner = `
██╗    ██╗███████╗██████╗ ███████╗██╗  ██╗███████╗██╗     ██╗     
██║    ██║██╔════╝██╔══██╗██╔════╝██║  ██║██╔════╝██║     ██║     
██║ █╗ ██║█████╗  ██████╔╝███████╗███████║█████╗  ██║     ██║     
██║███╗██║██╔══╝  ██╔══██╗╚════██║██╔══██║██╔══╝  ██║     ██║     
╚███╔███╔╝███████╗██████╔╝███████║██║  ██║███████╗███████╗███████╗
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 \r\n
 \r\n
`;

class WebShell extends Terminal {
    constructor() {
        super({
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            rows: 30,
        });

        this.localEcho = new LocalEchoController();
        this.loadAddon(this.localEcho);

        this.localEcho.println(banner);

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

const Shell = () => {
    const webTerminalElement = useRef(null);
    const webTerminal = useRef(new WebShell());

    useEffect(() => {
        // prettier-ignore
        webTerminal.current.open(
            webTerminalElement.current
        );
    }, []);

    return <div ref={webTerminalElement} />;
};

export default Shell;
