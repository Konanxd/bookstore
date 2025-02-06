import InputComponent from "../InputComponent";

export default function FormPembayaran({ ...props }) {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                action="POST"
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">tambah pembayaran</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="id_pembayaran"
                        title="ID Pembayaran"
                        type="text"
                    />
                    <InputComponent
                        id="tanggal_pembayaran"
                        title="Tanggal Pembayaran"
                        type="date"
                    />
                    <InputComponent
                        id="total_pembayaran"
                        title="Total Pembayaran"
                        type="number"
                    />
                    <InputComponent
                        id="stat_pembayaran"
                        title="Status Pembayaran"
                        type="text"
                    />
                    <InputComponent
                        id="created_at"
                        title="Dibuat Pada"
                        type="datetime-local"
                    />
                    <InputComponent
                        id="updated_at"
                        title="Diperbarui Pada"
                        type="datetime-local"
                    />
                    <InputComponent
                        id="id_pesanan"
                        title="ID Pesanan"
                        type="text"
                    />
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
