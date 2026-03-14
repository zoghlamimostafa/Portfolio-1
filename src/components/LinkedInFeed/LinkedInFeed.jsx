import React from "react";
import styled from "styled-components";
import { LinkedInEmbed } from "react-social-media-embed";
import { Slide } from "react-awesome-reveal";
import Slider from "react-slick";
import linkedinPosts from "../../data/linkedin_posts.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LinkedInFeed = () => {
  // Basic settings for react-slick
  const settings = {
    dots: true,
    infinite: false, // Don't loop if few posts
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true, /* Force arrows */
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  // If no posts, hide section or show message
  if (!linkedinPosts || linkedinPosts.length === 0) {
    return null;
  }

  return (
    <Container id="linkedin">
      <Slide direction="left">
        <h1>Recent LinkedIn Posts</h1>
      </Slide>
      <FeedContainer>
        <Slider {...settings}>
          {linkedinPosts.map((post, index) => {
            let postUrl = post.url;
            // URL patch for CSP
            if (postUrl && !postUrl.includes('/embed/')) {
              postUrl = postUrl.replace('linkedin.com/feed/update', 'linkedin.com/embed/feed/update');
            }

            return (
              <SlideWrapper key={index}>
                <EmbedWrapper>
                  <LinkedInEmbed
                    url={postUrl}
                    width="100%"
                    height={500}
                  />
                </EmbedWrapper>
              </SlideWrapper>
            );
          })}
        </Slider>
      </FeedContainer>
    </Container>
  );
};

export default LinkedInFeed;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    font-size: 1.9rem;
  }
`;

const FeedContainer = styled.div`
  margin-top: 2rem;
  
  /* Override slick styles if needed to make embeds visible */
  .slick-slide {
    padding: 0 10px; /* Gap between slides */
  }
  .slick-list {
    margin: 0 -10px;
  }
  .slick-track {
    display: flex; /* Fix height issues sometimes */
  }
`;

const SlideWrapper = styled.div`
    /* Wrapper for each slide content */
    display: flex !important; 
    justify-content: center;
`;

const EmbedWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
  background: white; /* Fallback */
`;
