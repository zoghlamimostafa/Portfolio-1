import React from "react";
import { MdSecurity } from "react-icons/md";
import { AiOutlineCloud } from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          My <span className="green">services</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={MdSecurity}
            title={"Cybersecurity Engineer"}
            disc={`Implementing robust security measures, vulnerability assessments, and penetration testing to protect systems and data.`}
          />
        </Slide>
        <Slide direction="up">
          <Card
            Icon={AiOutlineCloud}
            title={"Cloud Security"}
            disc={`Designing and securing cloud-native architectures, ensuring compliance and data protection in the cloud.`}
          />
        </Slide>
        <Slide direction="right">
          <Card
            Icon={FaTools}
            title={"DevSecOps"}
            disc={`Integrating security into CI/CD pipelines, automating security checks, and ensuring secure infrastructure as code.`}
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
