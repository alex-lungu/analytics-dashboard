import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, ToggleButton, Form, Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './App.css';
import { salesData } from './assets/salesData';
import LineChart from './LineChart';
import BarChart from './BarChart';

const PRODUCTS = ["Smartphone", "Laptop", "Tablet", "Smartwatch"];
const REGIONS = ["North America", "Europe", "Asia", "Latin America"];
const YEARS = [2018, 2019, 2020, 2021, 2022, 2023];

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [selectedYear, setSelectedYear] = useState(YEARS[0]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Filter data for line chart
  const lineChartData = salesData.filter(
    (d) => d.product === selectedProduct && d.region === selectedRegion
  );

  // Filter data for bar chart: sum all quarters for each product/region in selected year
  const barChartData = [];
  PRODUCTS.forEach((product) => {
    REGIONS.forEach((region) => {
      const yearData = salesData.filter(
        (d) => d.year === selectedYear && d.product === product && d.region === region
      );
      const totalSales = yearData.reduce((sum, d) => sum + d.sales, 0);
      barChartData.push({ product, region, year: selectedYear, sales: totalSales });
    });
  });

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm mb-4 navbar-glass">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <span role="img" aria-label="dashboard" style={{fontSize: '1.7rem'}}>📊</span>
            <span className="fw-bold" style={{fontSize: '1.25rem'}}>{t('title')}</span>
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center flex-nowrap">
            <ButtonGroup>
              <ToggleButton
                id="en-toggle"
                type="radio"
                variant="outline-primary"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={() => handleLanguageChange('en')}
                size="sm"
                style={language === 'en' ? { background: '#2563eb', color: '#fff', borderColor: '#2563eb', fontSize: '1.08em', padding: '0.38rem 1.2rem' } : { fontSize: '1.08em', padding: '0.38rem 1.2rem' }}
              >
                {t('english')}
              </ToggleButton>
              <ToggleButton
                id="fr-toggle"
                type="radio"
                variant="outline-primary"
                name="language"
                value="fr"
                checked={language === 'fr'}
                onChange={() => handleLanguageChange('fr')}
                size="sm"
                style={language === 'fr' ? { background: '#2563eb', color: '#fff', borderColor: '#2563eb', fontSize: '1.08em', padding: '0.38rem 1.2rem' } : { fontSize: '1.08em', padding: '0.38rem 1.2rem' }}
              >
                {t('french')}
              </ToggleButton>
            </ButtonGroup>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="py-4">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={10} lg={8} className="text-center dashboard-header">
            {/* Title and language moved to navbar */}
            <p>{t('description').split('\n')[0]}</p>
            <p className="text-muted fst-italic fw-bold" style={{fontSize: '1rem'}}>{t('description').split('\n')[1]}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6} className="mb-4 d-flex align-items-stretch">
            <div className="chart-card w-100">
              <h5 className="mb-3">{t('line_chart_title', { product: t(selectedProduct.toLowerCase()), region: t(selectedRegion.toLowerCase().replace(/ /g, '_')) })}</h5>
              <Form className="mb-3">
                <Form.Group controlId="productSelect" className="mb-2">
                  <Form.Label>{t('product')}</Form.Label>
                  <Form.Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p} value={p}>
                        {t(p.toLowerCase())}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="regionSelect">
                  <Form.Label>{t('region')}</Form.Label>
                  <Form.Select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {t(r.toLowerCase().replace(/ /g, '_'))}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
              <LineChart
                data={lineChartData}
                product={selectedProduct}
                region={selectedRegion}
              />
            </div>
          </Col>
          <Col xs={12} lg={6} className="mb-4 d-flex align-items-stretch">
            <div className="chart-card w-100">
              <h5 className="mb-3">{t('bar_chart_title', { year: selectedYear })}</h5>
              <Form className="mb-3">
                <Form.Group controlId="yearSelect">
                  <Form.Label>{t('year')}</Form.Label>
                  <Form.Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
              <BarChart
                data={barChartData}
                year={selectedYear}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <footer className="dashboard-footer py-3" style={{ width: '100%' }}>
        <div className="text-center text-muted small fw-bold">
          <span>&copy; {new Date().getFullYear()} Global Tech Product Sales Dashboard — SEG 3125</span>
        </div>
      </footer>
    </>
  );
}

export default App;
