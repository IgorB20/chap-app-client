import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

const socket = io('ws://192.168.179.107:8080');



export default function ConversationRoom() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const { username } = useParams();

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (msg) => {
            console.log("Mensagem recebida do servidor! -->", msg);
            setMessages(msgs => [msg, ...msgs]);
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    }, []);

    function handleInputChange(ev){
        setMessage(ev.target.value);
    }

    function sendMessage(){
        socket.emit('message', {
            username,
            message
        });
        setMessage('');
    }

    return (
        <section style={{ height: '100vh', overflow: 'hidden' }} className='d-flex justify-content-center'>
             <p>Connected: {'' + isConnected}</p>
            <div
                className="d-flex position-relative w-50 border py-3"
                style={{overflow: 'auto', marginBottom: '80px', flexDirection: 'column-reverse'}}>

                {
                    messages.map((msg, index) => msg.username === username ? <MessageOwnerBox key={index} msg={msg}/> : <MessageReceivedBox key={index} msg={msg}/>)
                }
              
                <div className='d-flex position-fixed bottom-0 border w-50 py-3 px-3' style={{marginTop: '100px'}}>
                    <Form.Control
                        value={message}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Ex: Matheus"
                        />
                    <Button onClick={sendMessage} variant="primary">
                       Enviar
                    </Button>
                </div>
            </div>
        </section>
    );
}

function formatDate(date){
    
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yyyy = date.getFullYear(); 
    const hh = date.getHours();
    const minutes = date.getMinutes();

    return `${dd}/${mm}/${yyyy} ${hh}:${minutes}`
}

function MessageOwnerBox({ msg }){
    return (
        <div className='d-flex flex-column align-items-end px-3 my-1'>
        <div style={{fontSize: '0.7em'}}>{msg.username} {formatDate(new Date(msg.createdAt))}</div>
        <div 
            style={{
                background: '#8cbcff',
                color: '#2e2e2e'
            }}
            className='px-3 py-1 rounded'
        >
            {msg.message}
        </div>
    </div>
    );
}

function MessageReceivedBox({ msg }){
    return (
        <div className='d-flex flex-column align-items-start px-3 my-1'>
            <div style={{fontSize: '0.7em'}}>{ msg.username } {formatDate(new Date(msg.createdAt))}</div>
            <div 
                style={{
                    background: '#d4d4d4',
                    color: '#2e2e2e'
                }}
                className='px-3 py-1 rounded'
            >
                {msg.message}
            </div>
        </div>
    );
}