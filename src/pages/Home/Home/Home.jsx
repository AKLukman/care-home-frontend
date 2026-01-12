import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import LogoSlider from '../LogoSlider/LogoSlider'
import HowItWorks from '../HowItWorks/HowItWorks'
import Benefits from '../Benefits/Benefits'
import BeMerchant from '../BeMerchant/BeMerchant'
import CustomerSaying from '../CustomerSaying/CustomerSaying'
import FAQ from '../FAQ/FAQ'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <LogoSlider></LogoSlider>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
            <CustomerSaying></CustomerSaying>
            <FAQ></FAQ>
        </div>
    )
}

export default Home
