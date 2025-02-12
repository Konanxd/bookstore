import InputComponent from "../InputComponent";
import { useState } from "react";

export default function FormPublisher({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nama_penerbit: data?.nama_penerbit || "",
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
                <h1 className="font-bold uppercase">
                    {data ? "Edit Penerbit" : "Tambah Penerbit"}
                </h1>
                <div className="grid w-[400px] grid-cols-1 gap-4 rounded">
                    <InputComponent
                        id="nama_penerbit"
                        title="nama penerbit"
                        type="text"
                        value={formData.nama_penerbit}
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
