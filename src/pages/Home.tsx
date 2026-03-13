import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="min-h-full -mt-4 md:mt-0">
                    Hello World!
                </div>
                <Footer />
            </div>
        </div>
    );
};
export default Home;
