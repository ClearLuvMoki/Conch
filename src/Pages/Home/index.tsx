import React, {useState} from 'react';
import HomeHeader from "@/Pages/Home/components/Header";

interface ItemType {
    id: number;
    name: string;
    width: number,
    height: number
}

const Home = () => {
    const [state, setState] = useState<ItemType[]>([
        {id: 1, name: "shrek", width: 100, height: 100},
        {id: 2, name: "fiona", width: 200, height: 200},
        {id: 3, name: "shrek", width: 100, height: 100},
        {id: 4, name: "fiona", width: 200, height: 200},
        {id: 5, name: "shrek", width: 100, height: 100},
        {id: 6, name: "fiona", width: 200, height: 200},
        {id: 7, name: "shrek", width: 100, height: 100},
        {id: 8, name: "fiona", width: 200, height: 200},
        {id: 9, name: "shrek", width: 100, height: 100},
        {id: 0, name: "fiona", width: 200, height: 200},
    ]);
    return (
        <div className={"w-full h-full p-[20px] flex flex-col"}>
            <HomeHeader/>
            {/*<Scaffold*/}
            {/*    componentsList={[*/}
            {/*        {id: "demo", size: "1x1", componentRender: <SystemInfoCard/>}*/}
            {/*    ]}*/}
            {/*/>*/}
        </div>
    );
};

export default Home;
