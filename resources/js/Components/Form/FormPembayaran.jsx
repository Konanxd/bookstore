import InputComponent from "../InputComponent";
import { useState } from "react";

export default function FormPembayaran({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        id_pesanan: data?.id_pesanan || "",
        tanggal_pembayaran: data?.tanggal_pembayaran || "",
        total_pembayaran: data?.total_pembayaran || "",
        stat_pembayaran: data?.stat_pembayaran || "",
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
                <h1 className="font-bold uppercase">tambah pembayaran</h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="id_pesanan"
                        title="ID Pesanan"
                        type="text"
                        value={formData.id_pesanan}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="tanggal_pembayaran"
                        title="Tanggal Pembayaran"
                        type="date"
                        value={formData.tanggal_pembayaran}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="total_pembayaran"
                        title="Total Pembayaran"
                        type="number"
                        value={formData.total_pembayaran}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="stat_pembayaran"
                        title="Status Pembayaran"
                        type="text"
                        value={formData.stat_pembayaran}
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
