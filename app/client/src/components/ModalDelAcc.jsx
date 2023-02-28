import { VscClose } from 'react-icons/vsc';

export function ModalDelAcc({ show, setShow, handleDelete }) {
    return (
        <div className="bg-Magnolia text-SmokyBlack absolute top-[200px] left-0 w-64 rounded-xl flex flex-col p-6 justify-between gap-2 shadow-xl">
            <a className="text-SmokyBlack text-center self-end"
                onClick={() => { setShow(!show) }}>
                <VscClose />
            </a>
            Are you sur you want to delete your account?
            <div className="flex gap-2">
                <button
                    onClick={() => { handleDelete() }}>
                    Yes
                </button>
                <button onClick={() => { setShow(!show) }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}