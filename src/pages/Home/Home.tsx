import HeroSection from "../../components/Home/HeroSection"
import WhyChooseUs from "../../components/Home/WhyChooseUs"
import ServicesSection from "../../components/Home/ServicesSection"
import TestimonialsSection from "../../components/Home/TestimonialsSection"
import GallerySection from "../../components/Home/GallerySection"
import CTASection from "../../components/Home/CTASection"
import FAQSection from "../../components/Home/FAQSection"


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <WhyChooseUs></WhyChooseUs>
            <ServicesSection></ServicesSection>
            <TestimonialsSection></TestimonialsSection>
            <GallerySection></GallerySection>
            <CTASection></CTASection>
            <div className="mb-20">
                <FAQSection></FAQSection>
            </div>
        </div>
    )
}

export default Home
