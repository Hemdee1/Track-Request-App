import { Navbar } from "../../components";

const About = () => {
  return (
    <main className="pt-[150px] px-6 font-Inter w-full min-h-[80vh]">
      <div className="w-[800px] mx-auto max-w-full">
        <h1 className="font-bold text-2xl text-[#6B6B6B] text-center mb-10 uppercase">
          About
        </h1>
        <p className="mt-10 text-[#6B6B6B] tracking-wider">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
          repudiandae blanditiis neque voluptates architecto cupiditate deleniti
          vero veniam alias iste nihil sit maiores veritatis doloremque
          reprehenderit culpa dicta, beatae iusto! <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia non
          enim odit ea impedit. Corporis soluta dolor itaque consequatur
          expedita voluptatibus veniam quae in et cumque beatae autem, doloribus
          distinctio!
        </p>
      </div>
    </main>
  );
};

export default About;
