import Icon from "@/resources/desktop-icon.png"
import {Image} from "@nextui-org/react";


const Login = () => {
    return (
        <div
            className={"w-full h-full overflow-hidden bg-[#fff] drag-window"}
        >
            <div>
                <Image
                    width={100}
                    src={Icon}
                    className={""}
                />
            </div>
        </div>
    );
};

export default Login;
