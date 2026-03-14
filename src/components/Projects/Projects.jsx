import React from "react";
import styled from "styled-components";
import SliderComp from "./Slider";
import { Zoom } from "react-awesome-reveal";

import Grid from "@mui/material/Grid";

import TRUCK from "../../assets/images/ScreenShots/2dtruck.jpg";
import ARSHOOT1 from "../../assets/images/ScreenShots/arshoot.jpg";
import CASTLEESCAPE from "../../assets/images/ScreenShots/castleescape.jpg";
import MakeMeLaugh from "../../assets/images/ScreenShots/mml.jpg";
import CVAR from "../../assets/images/ScreenShots/cvar.jpg";
import GGJ2k22 from "../../assets/images/ScreenShots/ggj2k22.jpg";
import MAZERUNNER from "../../assets/images/ScreenShots/mazerunner.jpg";
import KITCHEN from "../../assets/images/ScreenShots/Screenshot 2023-10-31 201936.jpg";
import VRSELIM from "../../assets/images/ScreenShots/vrselim.jpg";
import VRSPACE from "../../assets/images/ScreenShots/vrspace.jpg";
import WAR from "../../assets/images/ScreenShots/war.jpg";
import CLOTHSIMULATION from "../../assets/images/ScreenShots/cloth simulation.jpg";
import SKINSIMULATION from "../../assets/images/ScreenShots/skin simulation.jpg";
import AVAXIAOTC from "../../assets/images/ScreenShots/otc avaxia.jpg";
import BLACKHOLESIMULATION from "../../assets/images/ScreenShots/blackhole.jpg";
import GGJ2025 from "../../assets/images/ScreenShots/ggj 2025.jpg";
import CSJAM from "../../assets/images/ScreenShots/Simulate Trading.jpg";
import XPLORE from "../../assets/images/ScreenShots/xplore.jpg";
import TRAIN from "../../assets/images/ScreenShots/TRAINANIM.jpg";
import WH from "../../assets/images/ScreenShots/WritingHackathon.jpg";
import Project from "./Project";

import githubProjects from "../../data/github_projects.json";

let data = [];



// Merge manual data with fetched GitHub data
// Manual data is first (high priority), then GitHub data
data = [...data, ...githubProjects];

const Projects = () => {
  const [showAllProjects, SetshowAllProjects] = React.useState(false);
  let sliderProject = "";
  sliderProject = data.map((item, i) => (
    <Grid key={i}>
      <Project item={item} />
    </Grid>
  ));
  return (
    <Container id="project">
      <Zoom>
        <h1>
          Recent <span className="green">Projects</span>
        </h1>
        <p>Check out my latest work in Cybersecurity, IoT, and Software Development.</p>
      </Zoom>
      {showAllProjects ? (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {data.map((item, i) => (
            // <Grid container>
            //   <Grid item xs={3}>
            //     <Project
            //       style={{ maxWidth: 400, minWidth: 350, margin: 10 }}
            //       item={item}
            //     />
            //   </Grid>
            // </Grid>

            <Grid item>
              <Project
                style={{ maxWidth: 400, minWidth: 350, margin: 10 }}
                item={item}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Slide>
          <SliderComp data={data} />
        </Slide>
      )}
      <br />
      <b
        style={{ cursor: "pointer" }}
        onClick={() => {
          SetshowAllProjects(!showAllProjects);
        }}
      >
        {showAllProjects ? "See less <<" : "See all >>"}
      </b>
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  text-align: center;
  position: relative;
  @media (max-width: 840px) {
    width: 90%;
  }
  h1 {
    font-size: 1.9rem;
  }

  p {
    width: 28rem;
    margin: 0 auto;
    padding: 1rem 0;
    font-size: 0.9rem;
    @media (max-width: 500px) {
      width: 90%;
    }
  }
`;

const Slide = styled.div``;
