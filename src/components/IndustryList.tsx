import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

interface Person {
    name: string;
    jobTitle: string;
    company: string;
    country: string;
    industry: string;
    rank: number;
    list: string;
}

const IndustryList: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { industry } = location.state as { industry: string };
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        fetch('/peopleMPW2024.json')
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredPeople = people.filter(person => person.industry === industry);

    const handleTileClick = (name: string, company: string, title: string) => {
        console.log('Tile clicked:', name, company, title);
        navigate('/person-profile', { state: { name, company, title } });
    };

    return (
        <Container style={{ paddingBottom: '40px' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 style={{ marginTop: '40px', marginBottom: '30px' }}>{industry}</h1>
                <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
            </div>
            <Row>
                {filteredPeople.map((person: Person, index: number) => (
                    <Col md={4} className="mb-4" key={index}>
                        <Card className="h-100" onClick={() => handleTileClick(person.name, person.company, person.jobTitle)}>
                            <Card.Body>
                                <Card.Title><h4><strong>{person.name}</strong></h4></Card.Title>
                                <Card.Text className="text-end" ><strong>{person.jobTitle}</strong></Card.Text>
                                <Card.Text className="text-center">
                                    <h5>{person.company}</h5>
                                </Card.Text>
                                <Card.Text><strong>{person.country}</strong></Card.Text>
                                <Card.Text>Rank: <strong>{person.rank}</strong></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default IndustryList;