import React from 'react';

import Hro2img from '../assets/images/Hro2img.png';
import gymEqu from '../assets/images/gymEqu.png';

import storyimg from '../assets/images/storyimg.png';
import mission from '../assets/images/mission.png';
import about from '../assets/images/about.png';
import sustainability from '../assets/images/sustainability.png';
import athletic from '../assets/images/athletic.png';


function About() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Hero Section  */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={Hro2img} 
          alt="About Us" 
          className="object-cover w-full h-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold tracking-wider">Meet Us !</h1>
        </div>
      </div>

     

           {/* About Us Content */}
           <div className="max-w-6xl mx-auto p-8 bg-white mt-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Who we are</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Fit Factory was born out of a commitment to redefine activewear with a fresh blend of style, innovation, and resilience. Our journey started with a question: why should fitness wear be purely functional or purely fashionable? We envisioned a brand that could deliver both—high-performance gear with cutting-edge style that adapts to your pace, elevates your performance, and makes you feel unstoppable.

Our mission is to empower everyone, from the early morning runner to the seasoned athlete, to move with confidence and ease. Every stitch, fabric, and design choice reflects our belief that fitness is for everyone. We bring together the best materials and the latest technologies to craft apparel that supports your goals, whether you're conquering a marathon or simply embracing an active lifestyle.        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
        At Fit Factory, we are driven by values that go beyond fitness. We believe in the power of community and strive to foster a space where every person feels represented, inspired, and motivated. Our collections are crafted to celebrate diversity, resilience, and individuality. We know that fitness is as much a personal journey as it is a shared experience, and we’re here to be a part of both.

We are also deeply committed to the future of our planet. Sustainable practices are woven into our production process—from eco-friendly materials to responsible sourcing, we are on a journey toward a greener future. Because we believe that taking care of our bodies and taking care of the Earth go hand in hand.

Join us at Fit Factory and discover more than a brand. Discover a community, a lifestyle, and a movement dedicated to helping you feel your best, every day, in every way.

        </p>
      </div>

      {/* Sections Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 mt-8">
        {/* Our Story */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={storyimg} alt="Our Story" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
          <p className="text-gray-600">
            Our journey began with the belief in high-quality activewear. We cater to athletes of all types, bringing style, comfort, and durability to each product.
          </p>
        </div>

        {/*  Mission */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={gymEqu} alt="Our Mission" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            We inspire confidence and encourage everyone to push beyond limits, creating products that align with these values.
          </p>
        </div>

        {/* Sustainability */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={sustainability} alt="Sustainability" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-semibold mb-2">Sustainability</h2>
          <p className="text-gray-600">
            We believe in a sustainable future and implement eco-friendly practices in every part of our production.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
