import { useEffect, useRef } from 'react';
import LocalEchoController from 'local-echo';
import { FitAddon } from 'xterm-addon-fit';
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
        });

        this.ws = new WebSocket('wss://ws.aedenmurray.dev');
        this.echo = new LocalEchoController(this);
        this.init();
    }

    init = async () => {
        let connected = false;
        this.echo.println(banner);

        this.ws.onopen = () => {
            connected = true;
        };

        await async function animateConnecting() {
            const animation = ['-', '\\', '|', '/'];
            let counter = 0;

            while (!connected) {
                const animationCharacter = animation[counter];
                this.write(`\r[${animationCharacter}] Connecting`);
                await new Promise((resolve) => setTimeout(resolve, 100));
                counter = counter === 3 ? 0 : counter + 1;
            }

            this.write('\r[*] Connected!\r\n\r\n');
        }.bind(this)();

        this.readLine();
    };

    readLine = async () => {
        const line = await this.echo.read('webshell~$ ');

        if (!line.length) {
            this.readLine();
            return;
        }

        if (line === 'clear') {
            this.reset();
            this.readLine();
            return;
        }

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { stdout, stderr, done } = message;

            if (stdout) {
                this.echo.println(stdout);
                return;
            }

            if (stderr) {
                this.echo.print(`\x1b[1;31m${stderr}\x1b[37m`);
                return;
            }

            if (done) {
                this.readLine();
                return;
            }
        };

        this.ws.send(line);
    };
}

const Shell = () => {
    const webTerminalElement = useRef(null);
    const webTerminal = useRef(new WebShell());
    const fit = useRef(new FitAddon());

    useEffect(() => {
        // prettier-ignore
        webTerminal.current.loadAddon(fit.current)
        webTerminal.current.open(webTerminalElement.current);
        fit.current.fit();
    }, []);

    return <div ref={webTerminalElement} />;
};

export default Shell;
