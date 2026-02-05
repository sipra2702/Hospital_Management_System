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
      
      <div className="space-x-4">
        {user ? (
          <Link 
            to="/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmOT5Fy0Sl6hBbJS5RdLUsZOQrnxFk_LH1cw&s" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;