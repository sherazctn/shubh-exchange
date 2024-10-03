import { ClipLoader } from "react-spinners"

const Loader = ({ color, size }: { color: string; size: number }) => {
    return (
        <ClipLoader
            color={color}
            loading={true}
            size={size}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Loader;