import { useParams } from "react-router";

const File = () => {
    const { "*": splat } = useParams();
    return (
        <div>
            <h1>File</h1>
            <p>File Path: {splat}</p>
        </div>
    );
}

export default File;