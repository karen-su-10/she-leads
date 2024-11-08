import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, BubbleController, LinearScale, PointElement, Tooltip, Legend, Title, ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend, Title, ChartDataLabels);

const IndustryHeadCountsChart: React.FC = () => {
    const chartRef = useRef<Chart | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = {
            datasets: [
                { label: 'Financials', data: [{ x: 1.2, y: 15, r: 82, c: 22 }], backgroundColor: '#4CAF50' },
                { label: 'Technology', data: [{ x: 2.4, y: 9, r: 75, c: 20 }], backgroundColor: '#673AB7' },
                { label: 'Energy', data: [{ x: 3.5, y: 15, r: 65, c: 8 }], backgroundColor: '#FFC107' },
                { label: 'Retailing', data: [{ x: 4.8, y: 9, r: 65, c: 9 }], backgroundColor: '#E91E63' },
                { label: 'Healthcare', data: [{ x: 5.6, y: 15, r: 60, c: 7 }], backgroundColor: '#009688' },
                { label: 'Transportation', data: [{ x: 6.4, y: 9, r: 60, c: 8 }], backgroundColor: '#607D8B' },
                { label: 'Media', data: [{ x: 7.4, y: 15, r: 55, c: 3 }], backgroundColor: '#03A9F4' },
                { label: 'Food & Beverage', data: [{ x: 1.2, y: 4.5, r: 52, c: 4 }], backgroundColor: '#FF5722' },
                { label: 'Aerospace & Defense', data: [{ x: 7.5, y: 7, r: 48, c: 3 }], backgroundColor: '#9E9E9E' },
                { label: 'Apparel', data: [{ x: 3.6, y: 8, r: 48, c: 2 }], backgroundColor: '#FFEB3B' },
                { label: 'Telecom', data: [{ x: 3.1, y: 3, r: 48, c: 2}], backgroundColor: '#795548' },
                { label: 'Business Services', data: [{ x: 4.4, y: 2.8, r: 45, c: 2 }], backgroundColor: '#607D8B' },
                { label: 'Hotels, Restaurants & Leisure', data: [{ x: 5.8, y: 3, r: 45, c: 2 }], backgroundColor: '#F44336' },
                { label: 'Automotive', data: [{ x: 6.8, y: 3, r: 35, c: 1 }], backgroundColor: '#00BCD4' }
            ]
        };

        const config: ChartConfiguration<'bubble', { x: number; y: number; r: number; c: number; }[], unknown> = {
            type: 'bubble',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Most Powerful 100 Women in Business',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'Bubble size represents the total headcount of influential women in each industry.',
                        font: {
                            size: 14
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const raw = context.raw as { r: number; c: number };
                                return `${context.dataset.label}: ${raw.c} people`;
                            }
                        }
                    },
                    datalabels: {
                        color: 'white',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function (value, context) {
                            const label = context.dataset.label;
                            if (!label) return ''; // Return an empty string if label is undefined
                            const maxLength = 10; // Maximum length of each line
                            if (label.length > maxLength) {
                                const words = label.split(' ');
                                let lines = [];
                                let currentLine = words[0];

                                for (let i = 1; i < words.length; i++) {
                                    if (currentLine.length + words[i].length + 1 <= maxLength) {
                                        currentLine += ' ' + words[i];
                                    } else {
                                        lines.push(currentLine);
                                        currentLine = words[i];
                                    }
                                }
                                lines.push(currentLine);
                                return lines.join('\n');
                            }
                            return label;
                        }
                    }
                },
                scales: {
                    x: {
                        display: false,
                        min: 0,
                        max: 10
                    },
                    y: {
                        display: false,
                        min: 0,
                        max: 20
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const datasetIndex = element.datasetIndex;
                        const industry = data.datasets[datasetIndex].label;
                        const people = [
                            { name: 'Person 1', jobTitle: 'Job Title 1', companyValue: 'Value 1', companySize: 'Size 1', region: 'Region 1' },
                            // ... other people
                        ];
                        navigate('/industry-list', { state: { industry, people } });
                    }
                }
            }
        };

        const bubbleChartCtx = document.getElementById('bubbleChart') as HTMLCanvasElement;
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new Chart(bubbleChartCtx.getContext('2d')!, config);

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [navigate]);

    return (
        <div style={{ width: '100%', maxWidth: '1000px', marginLeft: '40px'}}>
            <canvas id="bubbleChart"></canvas>
        </div>
    );
};

export default IndustryHeadCountsChart;