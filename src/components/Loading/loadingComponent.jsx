import BeatLoader from "react-spinners/BeatLoader"

const LoadingComponent = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <>
            <BeatLoader style={style} color="#F8BFD4" />
        </>
    )
}

export default LoadingComponent;