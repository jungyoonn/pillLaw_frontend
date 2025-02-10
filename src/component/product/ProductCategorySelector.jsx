import React from "react";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import '../../resources/css/style.css';

const ProductCategorySelector = () => {
  const categories = [
    {
      title: "생리활성",
      options: [
        "기억력", "혈행", "간건강", "체지방", "갱년기 남", "갱년기 여",
        "혈당", "눈", "면역", "관절, 뼈", "전립선", "피로", "피부",
        "콜레스테롤", "혈압", "긴장", "장", "칼슘", "요로", "소화", "항산화",
        "혈중중성지방", "인지능력", "운동수행, 지구력", "치아", "배뇨",
        "면역과민 피부", "월경", "정자", "질 유산균", "유아 성장"
      ]
    },
    {
      title: "영양소",
      options: [
        "비타민 A", "비타민 B", "비타민 D", "비타민 E", "비타민 K",
        "비타민 B1", "비타민 B2", "비타민 B6", "비타민 B12", "비타민 C",
        "나이아신", "엽산", "비오틴", "칼슘", "마그네슘", "철", "아연", "구리",
        "셀레늄", "요오드", "망간", "몰리브덴", "칼륨", "크롬", "식이섬유",
        "단백질", "필수 지방산"
      ]
    }
  ];

  return (
    <Accordion>
      {categories.map((category, index) => (
        <Accordion.Item key={index} eventKey={index.toString()} className="fw-bold">
          <Accordion.Header className="border-pilllaw-secondary ">{category.title}</Accordion.Header>
          <Accordion.Body className="border-pilllaw-secondary custum-accordian">
            <Row>
              {category.options.map((option, idx) => (
                <Col key={idx} xs={6} sm={3} className="mb-2 fs-12">
                  <Form.Check type="checkbox" label={option} style={{opacity:1}}/>
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ProductCategorySelector;
