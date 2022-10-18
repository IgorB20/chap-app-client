import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Home() {

    const [name, setName] = useState('');

    function handleInputChange(ev){
        setName(ev.target.value);
    }

    return (
        <section style={{height: '100vh'}} className='d-flex justify-content-center align-items-center'>
            <Form style={{width: '500px'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Informe seu nome</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        value={name}
                        type="text"
                        placeholder="Ex: Matheus"
                    />
                </Form.Group>

                <Button variant="primary">
                    <a href={`/conversation-room/${name}`} className='text-white text-decoration-none'>ENTRAR NA SALA</a>
                </Button>
            </Form>
        </section>
    );
}