import styled from "styled-components";

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.2em 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 0.7em;
`;

const TextParagraph = styled.p`
  display: flex;
  margin-bottom: 2.2em;
`;

const Story = () => {
  return (
    <StoryWrapper>
      <Title>Story time</Title>
      <SectionTitle>Intro</SectionTitle>
      <TextParagraph>
        My name is Adam Belko, I'm 32 years old, originally born and raised in
        Slovakia, a small European country, then moving to Sydney, Australia in
        2015 where I currently reside.
      </TextParagraph>
      <SectionTitle>Where it all started</SectionTitle>
      <TextParagraph>
        My interest in web and computers started right around the year 2000 when
        my parents bought a family computer equiped with legendary Windows XP
        and a rather sluggish internet connection. Shortly after, I became
        curious how the web actually works and put together some basic wordpress
        sites, dabbled into Python and dip my fingers into the realm of
        vulnerability testing on other people's websites.
      </TextParagraph>
      <SectionTitle>A bit of sideways</SectionTitle>
      <TextParagraph>
        "As I grew older and started to experience an adult life, my interested
        into tech slowly but surely shifted away. I got my first real job as a
        car technician and stuck with it for the next five years. Eventually I
        decided to make a big move and headed to Australia to work and study.
        All by myself, a broken english, a backpack and 2 travel bags in pursuit
        of a new life. After arrival I hopped into a construction industry where
        I learned how to renovate houses, build timber frames and decks, bend
        and fix reinforcement steel or cut down trees and maintain gardens. Even
        though I liked being a tradie, I realised I can't imagine myself doing
        this in 10 or 20 years. And so the idea of going back to tech emerged...
      </TextParagraph>
      <SectionTitle>The comeback</SectionTitle>
      <TextParagraph>
        In May 2022 I've bought a new Apple M1 and kickstarted the journey of
        becoming a web dev. My skills and interest lies in full-stack
        development. HTML, CSS/SASS, JavaScript and React for client side and
        Express.js with MongoDB for server side. My approach to learning new
        technologies is mostly the same: read docs, experiment (build projects),
        hit issue, solve it, hit another issue again, solve it again. In other
        words I believe reading books or watching YouTube tutorials only get you
        so far. Experimentation with whichever technology and active problem
        solving is in my opinion a way to go.
      </TextParagraph>
      <SectionTitle>Get in touch</SectionTitle>
      <TextParagraph>Email: belkoadam@gmail.com</TextParagraph>
    </StoryWrapper>
  );
};

export default Story;
