import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndustryHeadCountsChart from './components/IndustryHeadCountsChart';
import IndustryList from './components/IndustryList';
import PersonProfile from './components/PersonProfile';

const Home: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/industry-list" element={<IndustryList />} />
                <Route path="/person-profile" element={<PersonProfile />} />
                <Route path="/" element={
                    <div>
                        <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '80px' }}>
                            <h1>Empowering Your Journey to Success</h1>
                        </div>
                        <div style={{ textAlign: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                            <h3 style={{ marginBottom: '40px' }}>
                                Discover a path paved by remarkable women who have reached the pinnacle of their careers.
                            </h3>
                            <p>
                                This platform is your gateway to explore the lives of female trailblazers across diverse
                                fields—learning from their experiences at every stage of their lives. See what these icons achieved at different ages,
                                understand the impact they’ve made on the world, and gain insights into the milestones that defined their journeys.
                            </p>
                            <IndustryHeadCountsChart />
                            <p>
                                As you chart your course, let their stories and achievements inspire you to reach your own aspirations.
                                Set your sights on what’s possible in the next 5, 10, or 20 years, and find the guidance to achieve your dreams.
                                Embrace this journey, because with each story, you get closer to realizing your own unique potential.
                                Your goals are within reach—this is the map to guide you there.
                            </p>
                            <h5> Click a bubble above to start your journey...</h5>
                            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#888' }}>
                                Names from Fortune Magazine 2024 MPW list
                            </div>
                        </div>
                    </div>
                } />
            </Routes>
        </Router>
    );
};

export default Home;