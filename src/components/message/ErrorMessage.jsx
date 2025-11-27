import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';

export function ErrorMessage({error}) {
    return (
        <div className="flex gap-2 w-fit bg-[#fee2e2] rounded-3xl !py-1 !px-2">
            <HighlightOffIcon sx={{
                                    width: 20,
                                    color: "#b91c1c",
                                 }} />
            <p className="font-bold text-xs text-[#b91c1c] !my-auto">{error}</p>
        </div>
    )
}

export function ErrorMessage2({error}) {
    return (
        <div className='flex gap-2 w-fit'>
            <CloseIcon sx={{
                                    width: 20,
                                    color: "#b91c1c",
                                 }} />
            <p className="font-light text-xs text-[#b91c1c] !my-auto">{error}</p>
        </div>
    )
}