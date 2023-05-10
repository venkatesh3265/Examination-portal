import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrapper/LandingPage';
const Landing = () => {
    return (
        <Wrapper>
            <nav>

            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                       Online Examination portal
                    </h1>
                    <Link to='/exam' className='btn btn-hero'>
                       Procced

                    </Link>
                </div>
                


            </div>
        </Wrapper>

    )
}


export default Landing