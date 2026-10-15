import Hero from "./Hero";
import SelectedWork from "./SelectedWork";
import Divisor from "./Divisor";

export default function Main(){
    return (
        <main>
           <Hero />
            <Divisor 
                title="01 / SELECTED WORK"
                short="MY PROJECTS"
            />
           <SelectedWork />
        </main>
    );
}