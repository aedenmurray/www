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

        this.ws = new WebSocket('wss://ws.aedenmurray.dev');
        this.echo = new LocalEchoController();
        this.loadAddon(this.echo);
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
            this.clear();
            this.readLine();
            return;
        }

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { stdout, stderr, done } = message;

            if (stdout) {
                this.echo.print(stdout);
            }

            if (stderr) {
                this.echo.print(`\x1b[1;31m${stderr}\x1b[37m`);
            }

            if (done) {
                this.readLine();
            }
        };

        this.ws.send(line);
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
