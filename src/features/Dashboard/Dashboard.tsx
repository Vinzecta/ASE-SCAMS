import Header from "../../components/common/Header";
import { Hero } from "./Hero";
import Feature from "./Feature";
import About from "./About";
import Contact from "./Contact";
import Footer from "../../components/common/Footer";

export default function Dashboard() {
    return (
        <section>
            <Header />
            <Hero />
            <Feature />
            <About />
            <Contact />
            <Footer />
        </section>
    );
}