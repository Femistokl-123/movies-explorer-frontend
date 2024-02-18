import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Wrapper = ({children, footer = true, isAuth}) => {
    return (
        <>
            <Header isAuth={isAuth}/>
            <main>
                {children}
            </main>
            {footer && <Footer/>}
        </>
    );
};

export default Wrapper;
