import { useEffect, useRef } from 'react';
import WebShell from './WebShell';
import 'xterm/css/xterm.css';
import './style.css';

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
