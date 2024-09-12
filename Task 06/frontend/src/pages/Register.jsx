import TREES from "../assets/backgrounds/trees.png";

const Register = () => {
  return (
    <div
      style={{ "--image-url": `url(${TREES})` }}
      className="bg-[image:var(--image-url)] bg-fixed bg-no-repeat bg-cover min-h-screen"
    >
      <div className="min-h-screen w-full bg-gradient-to-r from-[#000f] via-[#000e] to-[#000b] flex justify-center items-center text-slate-100">
        <div className="min-h-screen w-full flex items-center p-14">
            <div className="flex-1 flex flex-col justify-center">
                <span className="text-left uppercase text-slate-200 ">start for free</span>
            </div>
            <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
