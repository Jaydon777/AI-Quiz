import Hero from "@/components/home-page/hero";
import Features from "@/components/home-page/features";
import HowItWorks from "@/components/home-page/how-it-works";
import UseCases from "@/components/home-page/use-case";
import CTASection from "@/components/home-page/cta-section";
import Header from "../components/header";
import Footer from "../components/footer";

export default function HomePage() {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <UseCases />
            <CTASection />
            <Footer />
        </>
    );
}
