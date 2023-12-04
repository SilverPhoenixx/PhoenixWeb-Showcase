import net from 'net';
class ClientSocket {
    constructor(port, host) {
    this.host = host;
    this.port = port;
    }

    sendMessage(message) {
        this.client = net.connect(this.port, this.host);
        this.client.write(message);
        this.client.end();
    }
}

export default ClientSocket;