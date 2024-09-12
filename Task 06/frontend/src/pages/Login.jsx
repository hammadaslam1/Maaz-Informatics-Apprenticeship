import TREES from '../assets/backgrounds/trees.png'

const Login = () => {
  return (
    <div style={{'--image-url': `url(${TREES})`}} className="bg-[image:var(--image-url)] bg-fixed bg-no-repeat bg-cover min-h-screen">
        <div className="h-screen w-full bg-gradient-to-l from-[#000f] via-[#000e] to-[#000b] flex justify-center items-center text-9xl text-slate-100">
            <div className=""></div>
        </div>
    </div>
  );
};

export default Login;
