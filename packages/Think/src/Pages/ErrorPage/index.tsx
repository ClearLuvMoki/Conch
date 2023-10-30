import {useRouteError, isRouteErrorResponse, useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react";

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }


    return (
        <div id="error-page"
             className={"w-full h-full bg-[#fff] flex flex-col justify-center items-center gap-3 select-none"}>
            <h1 className={"text-3xl font-semibold"}>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
            <Button
                onClick={() => {
                    navigate("/", {replace: true})
                }}
            >
                Back
            </Button>
        </div>
    );
};

export default ErrorPage;
