import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import ContactusImage from "../assets/images/contactus-image.png";

export default function Contactus() {
  return (
    <>
    <Hero
                      backgroundImage={ContactusImage}
                      title="Connected Globally. Available Locally."
                      description="With experts positioned in the world’s most influential markets, we are never more than a conversation away. Reach out to our team to experience a new standard of real estate advisory."
                      showButton={false}
                      buttonText="Explore Now"
                    />
    <ContactSection />
    </>
  );
}