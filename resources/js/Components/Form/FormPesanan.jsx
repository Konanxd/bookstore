import AutocompleteInput from "../AutocompleteInput";
import InputComponent from "../InputComponent";
import { useState } from "react";

export default function FormPesanan({ data, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        id_pelanggan: data?.id_pelanggan || "",
        nama_pelanggan: data?.nama_pelanggan || "",
        tanggal_pesanan: data?.tanggal_pesanan || "",
    });

    const [errors, setErrors] = useState({
        id_pelanggan: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            id_pelanggan: !formData.id_pelanggan,
        };

        setErrors(newErrors);
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
                <h1 className="font-bold uppercase">
                    {data ? "Edit Pesanan" : "Tambah Pesanan"}
                </h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <div className="flex flex-col gap-1">
                        <AutocompleteInput
                            label="Nama Pelanggan"
                            apiUrl="/api/autocomplete/pelanggan"
                            selectedId={formData.id_pelanggan}
                            setSelectedId={(id) => {
                                setFormData({ ...formData, id_pelanggan: id });
                                setErrors((prev) => ({
                                    ...prev,
                                    id_pelanggan: !id,
                                }));
                            }}
                            selectedName={formData.nama_pelanggan}
                            setSelectedName={(nama) =>
                                setFormData({
                                    ...formData,
                                    nama_pelanggan: nama,
                                })
                            }
                        />
                        {errors.id_pelanggan && (
                            <p className="text-red-500">
                                Pelanggan tidak tersedia!
                            </p>
                        )}
                    </div>

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
