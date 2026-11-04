

import Hero from "../components/Hero";
import Title from "../components/Title";
import FrameInfo from "../components/Frame-info";
import heroImage from "../assets/images/hero-image.png";
import Cards from "../components/Cards";
import Slider from "../components/Slider";
import Map from "../components/Map";
import PropertyCards from "../components/PropertyCards";
// import Counter from "./Counter";

export default function Home() {
  return (
    <>
      {/* <Counter /> */}
    <Hero
      backgroundImage={heroImage}
      title="Redefining the Horizon of Modern Luxury Living"
      description="We believe a home should be a sanctuary of innovation and an extension of your personal brand. By combining cutting-edge market data with a keen eye for world-class design, we help you navigate the complexities of the luxury market to find a space that inspires your best work and your deepest rest."
      showButton={true}
      buttonText="Explore Now"
    />
    {/* <Counter /> */}
    <Title title="Benchmarks of Success" titleMarginTop="mt-16 sm:mt-30.75" />
    <Cards />
    <Title title="About Grand Atlas" titleMarginTop="mt-16 sm:mt-45" /> 
    <FrameInfo />
    <Title title="Hand-Selected Masterpieces" titleMarginTop="mt-16 sm:mt-45" />
    <Slider />
    <Title title="Strategic Locations" titleMarginTop="mt-16 sm:mt-45" />
    <Map/>
    <Title title="Future Landmarks" titleMarginTop="mt-16 sm:mt-45" />
    <PropertyCards />
    </>
  );
}