import { useState, useRef, useEffect } from "react";
import './sample.css'
import video from './video.mp4'

function App() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );
    console.log(isIntersecting);
    console.log(ref.current)
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting){
        console.log(ref.current)
        ref.current.play();
    //     ref.current.querySelectorAll("child-one").forEach((el) => {
    //    el.pause();
    //   });
    } else {
    // ref.current.querySelectorAll("child-one").forEach((el) => {
    //         el.play();
    //   });
    ref.current.pause();
    }
  }, [isIntersecting]);

  return (
    <div className="App">
      <header>This is the Header</header>
      <main  class="flex-col ">
       <video
       loop
       controls
       ref={ref}
       src={video}
       className="child-one"
       class="h-[73vh] object-cover w-[800px]"
       ></video>
        <video
       loop
       controls
       src={video}
       className="child-one"
       class="h-[73vh] object-cover w-[800px]"
       ></video>
      </main>
      <footer>This is the Footer</footer>
    </div>
  );
}

export default App;