import { Server } from 'socket.io';
import { promises as fs } from 'fs';

export function startSocketIo(server) {
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:4001/"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
    
        socket.on('request-all-messages', async () => {
            try {
                const data = await fs.readFile('./messageLog.json', 'utf8');
                const messages = JSON.parse(data).messages;
                
                console.log('Sending all messages to the client');
                socket.emit('send-all-messages', messages);
            } catch (error) {
                console.log(error);
            }
        });
    
        socket.on('send-message', async (message) => {
            try {
                const data = await fs.readFile('./messageLog.json', 'utf8');
                const messagesJson = JSON.parse(data);
    
                messagesJson.messages.push(message);
    
                await fs.writeFile('./messageLog.json', JSON.stringify(messagesJson, null, 2));
                
                socket.broadcast.emit('broadcast-message', message);
            } catch (error) {
                console.log(error);
            }
        });
    
        socket.on('delete-message', async (indexToDelete) => {
            try {
                const data = await fs.readFile('./messageLog.json', 'utf8');
                const messagesJson = JSON.parse(data);
    
                messagesJson.messages.splice(indexToDelete.index, 1);
    
                await fs.writeFile('./messageLog.json', JSON.stringify(messagesJson, null, 2));
            } catch (error) {
                console.log(error);
            }
        });
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}