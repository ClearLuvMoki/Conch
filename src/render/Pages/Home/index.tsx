import HomeHeader from "@/Pages/Home/components/Header";
import Scaffold from "@/Components/Scaffold";
import SystemGridCard from "@/Components/GridCard/SystemGridCard";

// interface ItemType {
//     id: number;
//     name: string;
//     width: number,
//     height: number
// }

const BaseList = [
    {componentId: "systemCard", component: <SystemGridCard/>},
]

const Home = () => {

    return (
        <div className={"w-full h-full p-[20px] flex flex-col"}>
            <HomeHeader/>
            <Scaffold
                componentsList={BaseList}
            />
        </div>
    );
};

export default Home;
