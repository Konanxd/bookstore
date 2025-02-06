import InputComponent from '../InputComponent';

export default function FormBuku({ ...props }) {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                action="POST"
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">tambah buku</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent id="id_buku" title="id" type="text" />
                    <InputComponent id="judul" title="judul" type="text" />
                    <InputComponent id="penulis" title="penulis" type="text" />
                    <InputComponent id="isbn" title="isbn" type="text" />
                    <InputComponent
                        id="penerbit"
                        title="penerbit"
                        type="text"
                    />
                    <InputComponent
                        id="tahunTerbit"
                        title="tahun terbit"
                        type="text"
                    />
                    <InputComponent id="genre" title="genre" type="text" />
                    <InputComponent id="harga" title="harga" type="number" />
                    <InputComponent id="stok" title="stok" type="number" />
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
