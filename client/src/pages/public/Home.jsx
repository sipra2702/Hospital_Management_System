import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
        True Healthcare For Your Family <span className="text-blue-600"></span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Efficient • Secure • Smart Healthcare Solutions
      </p>

      <img className='h-106' src="https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg" alt="" />

      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">Caring for life <br /> Trusted Healthcare </h2>

      </div>
    </div>

  );
};

export default Home;