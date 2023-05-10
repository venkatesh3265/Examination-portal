import Wrapper from "../assets/wrapper/Navbar";
import { FaAlignLeft} from 'react-icons/fa';
const Navbar = () => {
    return (
        <Wrapper>
            <div className='nav-center'>
                <button
                    className='toggle-btn'

                >
                    <FaAlignLeft />

                </button>

                <div>

                    <h3 className='logo-text'>Online Examination</h3>
                </div>

                <div className='btn-container'>
                    <button className='btn' >

                    </button>

                </div>
            </div>

        </Wrapper>
    )
}

export default Navbar