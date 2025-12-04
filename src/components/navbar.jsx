"use client"

const Navbar_comp = () => {
    const navbarItems = ["About","Features","Pricing","Platforms","Connect"]
  return (
    <>
      {/* < div className="background-grey navbar  h-1/5 p-5 flex align-middle">
        <div className="app-name flex  text-2xl h-full">
            <span className="tracking-widest" >Post<span className="text-black ml-1 px-1 tracking-widest bg-yellow-600 rounded ">Hub</span></span>
        </div>
        <div className="nav-items align-middle h-full">
            {navbarItems.map((item,index)=>{
              return(  <span className="cursor-pointer text-white hover:text-yellow-600">{item}</span>
            )})}

        </div>
      </div> */}
    <div className="navbar background-grey h-20 px-8 flex items-center justify-between">

      {/* Logo */}
      <div className="app-name text-2xl font-semibold">
        <span className="tracking-widest text-white">
          Post
          <span className="text-black ml-1 px-1 tracking-widest bg-yellow-600 rounded">
            Hub
          </span>
        </span>
      </div>

      {/* Navbar Items + Get Started */}
      <div className="flex items-center gap-8">

        {/* Map navbar items */}
        {navbarItems.map((item, index) => (
          // <span
          //   key={index}
          //   className="cursor-pointer text-white hover:text-yellow-600 transition"
          // >
          <a
            key={index}
            href={`#${item.toLowerCase().replace(" ", "")}`}
            className="cursor-pointer text-white hover:text-yellow-600 transition" >
            {item}
           </a>
        ))}

        {/* GET STARTED BUTTON */}
        <a href="#signup" className="bg-yellow-600 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition">
          Get Started
        </a>

      </div>
    </div>
  </>
  )
}

export default Navbar_comp