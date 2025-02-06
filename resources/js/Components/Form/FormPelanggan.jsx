import InputComponent from '../InputComponent';

export default function FormPelanggan({ ...props }) {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                action="POST"
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">tambah pelanggan</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent id="id_pelanggan" title="id" type="text" />
                    <InputComponent
                        id="nama_pelanggan"
                        title="nama pelanggan"
                        type="text"
                    />
                    <InputComponent id="no_hp" title="no hp" type="text" />
                    <InputComponent id="alamat" title="alamat" type="text" />
                </div>
                <div className="flex w-full flex-row justify-end gap-4">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-2 uppercase text-white"
                        type="submit"
                    >
                        submit
                    </button>
                    <button
                        {...props}
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
