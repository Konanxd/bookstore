import InputComponent from "../InputComponent";
import { useState } from "react";

export default function FormPesanan({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        id_pelanggan: data?.id_pelanggan || "",
        id_buku: data?.id_buku || "",
        jumlah_pesanan: data?.jumlah_pesanan || "",
        tanggal_pesanan: data?.tanggal_pesanan || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate foreign keys
        const newErrors = {
            id_penulis: !formData.id_penulis,
            id_penerbit: !formData.id_penerbit,
            id_genre: !formData.id_genre,
        };

        setErrors(newErrors);
        // Prevent submission if any required foreign key is missing
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">tambah buku</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="id_pelanggan"
                        title="id pelanggan"
                        type="text"
                        value={formData.id_pelanggan}
                        onChange={handleChange}
                    />

                    <InputComponent
                        id="id_buku"
                        title="id buku"
                        type="text"
                        value={formData.id_buku}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="jumlah_pesanan"
                        title="jumlah pesanan"
                        type="text"
                        value={formData.jumlah_pesanan}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="tanggal_pesanan"
                        title="tanggal pesanan"
                        type="text"
                        value={formData.tanggal_pesanan}
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
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                        onClick={onCancel}
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
