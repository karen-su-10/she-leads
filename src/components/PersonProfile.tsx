import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Spinner, Alert, Button, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { getGeminiData, sendChatMessage } from '../api/geminiApi';

const PersonProfile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, company, title } = location.state as { name: string, company: string, title: string };
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chatInput, setChatInput] = useState<string>('');
    const [chatResponse, setChatResponse] = useState<string>('');

    useEffect(() => {
        console.log('useEffect triggered');
        console.log('Fetching data for:', company, name, title);

        const fetchData = async () => {
            try {
                const result = await getGeminiData(company, name, title);
                console.log('Data received:', result);
                const cleanedResult = result.replace(/```json/g, '').replace(/```/g, ''); // Remove backticks and json tag
                console.log('Cleaned data:', cleanedResult);
                setData(JSON.parse(cleanedResult));
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data from Google Gemini API');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [company, name, title]);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await sendChatMessage(chatInput, company, name);
            setChatResponse(response);
        } catch (err) {
            console.error('Error sending chat message:', err);
            setChatResponse('Failed to get response from chatbot');
        }
    };

    if (loading) {
        return (
            <Container className="text-center" style={{ marginTop: '40px' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center" style={{ marginTop: '40px' }}>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!data) {
        return (
            <Container className="text-center" style={{ marginTop: '40px' }}>
                <Alert variant="warning">No data available</Alert>
            </Container>
        );
    }

    return (
        <Container style={{ marginTop: '40px', marginBottom: '40px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0"><strong>{name}</strong></h1>
                <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
            </div>
            <Row className="mb-4">
                <Col>
                    <h2><strong>Company Info</strong></h2>
                    <hr />
                    <ReactMarkdown>{data.company}</ReactMarkdown>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2><strong>Career Journey</strong></h2>
                    <hr />
                    <ReactMarkdown>{data.career_path}</ReactMarkdown>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h2>Tell me more</h2>
                    <hr />
                    <Form onSubmit={handleChatSubmit}>
                        <Form.Group controlId="chatInput">
                            <Form.Label>Ask if you have any more questions...</Form.Label>
                            <Form.Control
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Type your question here"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Send
                        </Button>
                    </Form>
                    {chatResponse && (
                        <ReactMarkdown className="mt-3">
                            {chatResponse}
                        </ReactMarkdown>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PersonProfile;