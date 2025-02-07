import InputComponent from "../InputComponent";

export default function FormPengiriman({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        id_pembayaran: data?.id_pembayaran || "",
        id_pesanan: data?.id_pesanan || "",
        tanggal_pengiriman: data?.tanggal_pengiriman || "",
        status_pengiriman: data?.status_pengiriman || "",
        no_resi: data?.no_resi || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">tambah pengiriman</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="id_pembayaran"
                        title="id pembayaran"
                        type="text"
                        value={formData.id_pembayaran}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="tanggal_pengiriman"
                        title="tanggal pengiriman"
                        type="text"
                        value={formData.tanggal_pengiriman}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="status_pengiriman"
                        title="status pengiriman"
                        type="text"
                        value={formData.status_pengiriman}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="no_resi"
                        title="no resi"
                        type="text"
                        value={formData.no_resi}
                        onChange={handleChange}
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
                        onClick={onCancel}
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
