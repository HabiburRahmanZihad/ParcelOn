import { Link } from 'react-router';
import LogoImage from '../../../assets/logo.png';

const Logo = () => {
    return (
        <Link to='/'>
            <div className="flex items-end">

                <img className='md:mb-3 mb-1' src={LogoImage} alt="Logo Image" />

                <p className="text-[24px] md:text-[32px] font-extrabold -ml-3">ParcelOn</p>
            </div>
        </Link>
    );
};

export default Logo;