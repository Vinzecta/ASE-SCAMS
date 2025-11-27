import CheckIcon from '@mui/icons-material/Check';

export function SuccessMessage({ success }) {
    return (
        <div className="flex gap-2 w-fit">
            <CheckIcon sx={{
                                width: 20,
                                color: "#065F46",
                            }} />
            <p className="font-light text-xs text-[#065F46] !my-auto">{ success }</p>
        </div>
    )
}